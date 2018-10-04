<?php

namespace VisualComposer\Modules\Assets;

if (!defined('ABSPATH')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit;
}

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Assets;
use VisualComposer\Helpers\AssetsShared;
use VisualComposer\Helpers\Frontend;
use VisualComposer\Helpers\Options;
use VisualComposer\Helpers\Str;
use VisualComposer\Helpers\Traits\WpFiltersActions;

class EnqueueController extends Container implements Module
{
    use WpFiltersActions;

    protected $lastEnqueueIdSourceAssets = null;

    protected $lastEnqueueIdAssets = null;

    public function __construct(Frontend $frontendHelper)
    {
        $actionPriority = 50;
        $this->wpAddAction('wp_enqueue_scripts', 'enqueueGlobalAssets', $actionPriority);
        $this->wpAddAction('wp_enqueue_scripts', 'enqueueAssets', $actionPriority);
        $this->wpAddAction('wp_enqueue_scripts', 'enqueueSourceAssets', $actionPriority);
        $this->wpAddAction('enqueueAssetsListener', 'enqueueAssetsListener', $actionPriority);
        $this->wpAddAction('enqueueSourceAssetsListener', 'enqueueSourceAssetsListener', $actionPriority);
    }

    public function enqueueAssetsListener(Str $strHelper, Assets $assetsHelper, AssetsShared $assetsSharedHelper, Options $optionsHelper, $sourceIds)
    {
        if (empty($sourceIds)) {
            return;
        }
        foreach ($sourceIds as $sourceId) {
            $this->enqueueAssetsBySourceId($strHelper, $assetsHelper, $assetsSharedHelper, $optionsHelper, $sourceId);
        }
    }

    public function enqueueSourceAssetsListener(Str $strHelper, Assets $assetsHelper, $sourceIds)
    {
        if (empty($sourceIds)) {
            return;
        }
        foreach ($sourceIds as $sourceId) {
            $this->enqueueSourceAssetsBySourceId($strHelper, $assetsHelper, $sourceId);
        }
    }

    /**
     * @param \VisualComposer\Helpers\Options $optionsHelper
     * @param \VisualComposer\Helpers\Str $strHelper
     * @param \VisualComposer\Helpers\Assets $assetsHelper
     */
    protected function enqueueGlobalAssets(
        Options $optionsHelper,
        Str $strHelper,
        Assets $assetsHelper
    ) {
        $bundleUrl = $optionsHelper->get('globalElementsCssFileUrl');
        if ($bundleUrl) {
            $version = $optionsHelper->get('globalElementsChecksum', VCV_VERSION);
            if (!preg_match('/^http/', $bundleUrl)) {
                if (!preg_match('/assets-bundles/', $bundleUrl)) {
                    $bundleUrl = '/assets-bundles/' . $bundleUrl;
                }
            }
            wp_enqueue_style(
                'vcv:assets:global:styles:' . $strHelper->slugify($bundleUrl),
                $assetsHelper->getAssetUrl($bundleUrl),
                [],
                VCV_VERSION . '.' . $version
            );
        }
    }

    /**
     * @param \VisualComposer\Helpers\Str $strHelper
     * @param \VisualComposer\Helpers\Frontend $frontendHelper
     * @param \VisualComposer\Helpers\Assets $assetsHelper
     */
    protected function enqueueSourceAssets(Str $strHelper, Frontend $frontendHelper, Assets $assetsHelper)
    {
        if ($frontendHelper->isPageEditable() && !vcvenv('VCV_FT_INITIAL_CSS_LOAD')) {
            return;
        }
        if ($frontendHelper->isPreview()
            && (!$this->lastEnqueueIdSourceAssets
                || ($this->lastEnqueueIdSourceAssets === get_the_ID()))) {
            $this->lastEnqueueIdSourceAssets = get_the_ID();

            return;
        } elseif (is_home() || is_archive() || is_category() || is_tag()) {
            // @codingStandardsIgnoreStart
            global $wp_query;
            $wpQuery = $wp_query;
            // @codingStandardsIgnoreEnd
            foreach ($wpQuery->posts as $post) {
                $this->enqueueSourceAssetsBySourceId($strHelper, $assetsHelper, $post->ID);
            }

            return;
        }
        vcevent('vcv:assets:enqueueSourceAssets');
        $this->enqueueSourceAssetsBySourceId($strHelper, $assetsHelper, get_the_ID());
    }

    /**
     * @param $sourceId
     */
    protected function enqueueSourceAssetsBySourceId(Str $strHelper, Assets $assetsHelper, $sourceId = null)
    {
        if ($sourceId==null) {
            $sourceId = get_the_ID();
        }
        $this->lastEnqueueIdSourceAssets = $sourceId;
        $bundleUrl = get_post_meta($sourceId, 'vcvSourceCssFileUrl', true);
        if ($bundleUrl) {
            if (vcvenv('VCV_TF_SOURCE_CSS_CHECKSUM')) {
                $version = get_post_meta($sourceId, '_' . VCV_PREFIX . 'sourceChecksum', true);
            } else {
                $version = get_post_meta($sourceId, 'vcvSourceCssFileHash', true);
            }

            if (!preg_match('/^http/', $bundleUrl)) {
                if (!preg_match('/assets-bundles/', $bundleUrl)) {
                    $bundleUrl = '/assets-bundles/' . $bundleUrl;
                }
            }

            wp_enqueue_style(
                'vcv:assets:source:main:styles:' . $strHelper->slugify($bundleUrl),
                $assetsHelper->getAssetUrl($bundleUrl),
                [],
                VCV_VERSION . '.' . $version
            );
        }
    }

    /**
     * @param \VisualComposer\Helpers\Str $strHelper
     * @param \VisualComposer\Helpers\Frontend $frontendHelper
     * @param \VisualComposer\Helpers\Assets $assetsHelper
     *
     * @param \VisualComposer\Helpers\AssetsShared $assetsSharedHelper
     *
     * @param \VisualComposer\Helpers\Options $optionsHelper
     */
    protected function enqueueAssets(
        Str $strHelper,
        Frontend $frontendHelper,
        Assets $assetsHelper,
        AssetsShared $assetsSharedHelper,
        Options $optionsHelper
    ) {
        if ($frontendHelper->isPageEditable() && !vcvenv('VCV_FT_INITIAL_CSS_LOAD')) {
            return;
        }
        if ($frontendHelper->isPreview()
            && (!$this->lastEnqueueIdAssets
                || ($this->lastEnqueueIdAssets === get_the_ID()))) {
            $this->lastEnqueueIdAssets = get_the_ID();

            return;
        }
        vcevent('vcv:assets:enqueueAssets');
        $this->enqueueAssetsBySourceId($strHelper, $assetsHelper, $assetsSharedHelper, $optionsHelper, get_the_ID());
    }

    /**
     * @param $sourceId
     */
    protected function enqueueAssetsBySourceId(Str $strHelper, Assets $assetsHelper, AssetsShared $assetsSharedHelper, Options $optionsHelper, $sourceId = null)
    {
        if ($sourceId==null) {
            $sourceId = get_the_ID();
        }
        $this->lastEnqueueIdAssets = $sourceId;
        $assetsFiles = get_post_meta($sourceId, 'vcvSourceAssetsFiles', true);
        $assetsVersion = $optionsHelper->get('hubAction:assets', '0');
        if (!is_array($assetsFiles)) {
            return;
        }

        if (isset($assetsFiles['cssBundles']) && is_array($assetsFiles['cssBundles'])) {
            foreach ($assetsFiles['cssBundles'] as $asset) {
                wp_enqueue_style(
                    'vcv:assets:source:styles:' . $strHelper->slugify($asset),
                    $assetsHelper->getAssetUrl($asset),
                    [],
                    $assetsVersion
                );
            }
            unset($asset);
        }

        if (isset($assetsFiles['jsBundles']) && is_array($assetsFiles['jsBundles'])) {
            foreach ($assetsFiles['jsBundles'] as $asset) {
                $asset = $assetsSharedHelper->findLocalAssetsPath($asset);
                foreach ((array)$asset as $single) {
                    wp_enqueue_script(
                        'vcv:assets:source:scripts:' . $strHelper->slugify($single),
                        $assetsHelper->getAssetUrl($single),
                        [],
                        $assetsVersion,
                        true
                    );
                }
            }
            unset($asset);
        }
    }
}
