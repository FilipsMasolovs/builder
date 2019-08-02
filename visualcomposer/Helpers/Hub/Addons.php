<?php

namespace VisualComposer\Helpers\Hub;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Illuminate\Support\Helper;

class Addons implements Helper
{
    public function getAddons()
    {
        $optionHelper = vchelper('Options');

        $addons = $optionHelper->get('hubAddons', []);

        $outputAddons = [];
        foreach ($addons as $key => $addon) {
            $data = $addon;
            // Clean secure variables
            unset($data['elementRealPath']);
            unset($data['phpFiles']);
            $outputAddons[ $key ] = $data;
        }

        return $outputAddons;
    }

    public function setAddons($addons = [])
    {
        $optionHelper = vchelper('Options');

        return $optionHelper->set('hubAddons', $addons);
    }

    public function updateAddon($key, $prev, $new, $merged)
    {
        $hubBundleHelper = vchelper('HubActionsAddonsBundle');
        $fileHelper = vchelper('File');
        $result = $fileHelper->copyDirectory(
            $hubBundleHelper->getTempBundleFolder('addons/' . $key),
            $this->getAddonPath($key)
        );
        if (!is_wp_error($result)) {
            $merged = $this->updateAddonData($key, $merged, $prev, $new);
        }

        return $merged;
    }

    protected function updateAddonData($key, $merged, $prev, $new)
    {
        unset($merged['addonRealPath']); // Never save it, load dynamically
        unset($merged['phpFiles']); // Never save it, load dynamically
        array_walk_recursive($merged, [$this, 'fixDoubleSlash']);

        return $merged;
    }

    public function fixDoubleSlash(&$value)
    {
        $value = preg_replace('/([^:])(\/{2,})/', '$1/', $value);
    }

    public function getAddonPath($key = '')
    {
        if (vcvenv('VCV_ENV_DEV_ADDONS')) {
            return VCV_PLUGIN_DIR_PATH . 'devAddons/' . ltrim($key, '\\/');
        }

        return VCV_PLUGIN_ASSETS_DIR_PATH . '/addons/' . ltrim($key, '\\/');
    }

    public function checkAbsUrl($url)
    {
        if (preg_match('/^http/', $url)) {
            return true;
        }

        $pattern = '/' . VCV_PLUGIN_ASSETS_DIRNAME . '\//';
        if (preg_match($pattern, $url)) {
            return true;
        }

        if (vcvenv('VCV_ENV_DEV_ADDONS')) {
            if (preg_match('/devAddons\//', $url)) {
                return true;
            }

            return false;
        }

        return false;
    }

    public function getAddonUrl($urlPart = '')
    {
        if (vcvenv('VCV_ENV_DEV_ADDONS')) {
            if ($this->checkAbsUrl($urlPart)) {
                return $urlPart;
            }

            return VCV_PLUGIN_URL . 'devAddons/' . $urlPart;
        }
        $assetsHelper = vchelper('Assets');

        return $assetsHelper->getAssetUrl('/addons/' . ltrim($urlPart, '\\/'));
    }

    /**
     * @param $addonKey
     *
     * @return false|string
     */
    public function getAddonRealPath($addonKey)
    {
        $addonPath = $this->getAddonPath($addonKey);
        $addonRealPath = $addonPath . '/' . $addonKey . '/';

        return $addonRealPath;
    }

    public function getAddonPhpFiles($addonKey)
    {
        $fileHelper = vchelper('File');
        $addonPath = $this->getAddonPath($addonKey);
        $manifestPath = $addonPath . '/manifest.json';
        $addonRealPath = $addonPath . '/' . $addonKey . '/';
        $phpFiles = [];
        if ($fileHelper->isFile($manifestPath)) {
            $manifest = json_decode($fileHelper->getContents($manifestPath), true);
            if (isset($manifest['addons'])) {
                if (isset($manifest['addons'], $manifest['addons'][ $addonKey ], $manifest['addons'][ $addonKey ]['phpFiles'])) {
                    $files = $manifest['addons'][ $addonKey ]['phpFiles'];
                    foreach ($files as $index => $filePath) {
                        $rtrim = rtrim(
                            $addonRealPath,
                            '\\/'
                        );
                        $phpFiles[] = $rtrim . '/' . $filePath;
                    }
                    unset($index, $filePath);
                }
            }
        }

        return $phpFiles;
    }
}
