<?php

namespace VisualComposer\Helpers;

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Helper;

class Localizations extends Container implements Helper
{
    /**
     * @param $locale array
     *
     * @return array
     */
    public function getLocalizations()
    {
        $locale = [
            'addElement' => __('Add Element', 'vcwb'),
            'addTemplate' => __('Add Template', 'vcwb'),
            'treeView' => __('Tree View', 'vcwb'),
            'undo' => __('Undo', 'vcwb'),
            'redo' => __('Redo', 'vcwb'),
            'responsiveView' => __('Responsive View', 'vcwb'),
            'desktop' => __('Desktop', 'vcwb'),
            'tabletLandscape' => __('Tablet Landscape', 'vcwb'),
            'tabletPortrait' => __('Tablet Portrait', 'vcwb'),
            'mobileLandscape' => __('Mobile Landscape', 'vcwb'),
            'mobilePortrait' => __('Mobile Portrait', 'vcwb'),
            'settings' => __('Settings', 'vcwb'),
            'update' => __('Update', 'vcwb'),
            'menu' => __('Menu', 'vcwb'),
            'viewPage' => __('View Page', 'vcwb'),
            'backendEditor' => __('Backend Editor', 'vcwb'),
            'editInBackendEditor' => __('Edit in Backend Editor', 'vcwb'),
            'wordPressDashboard' => __('WordPress Dashboard', 'vcwb'),
            'publish' => __('Publish', 'vcwb'),
            'submitForReview' => __('Submit for Review', 'vcwb'),
            'saveDraft' => __('Save Draft', 'vcwb'),
            'close' => __('Close', 'vcwb'),
            'premiumElementsButton' => __('Premium Elements - Coming Soon', 'vcwb'),
            'premiumTemplatesButton' => __('Premium Templates - Coming Soon', 'vcwb'),
            // @codingStandardsIgnoreLine
            'emptyTreeView' => __('There are no elements on your canvas - start by adding element or template', 'vcwb'),
            'customCSS' => __('Custom CSS', 'vcwb'),
            'localCSS' => __('Local CSS', 'vcwb'),
            'localCSSLabel' => __('Local CSS will be applied to this particular page only', 'vcwb'),
            'globalCSS' => __('Global CSS', 'vcwb'),
            'globalCSSLabel' => __('Global CSS will be applied site wide', 'vcwb'),
            'save' => __('Save', 'vcwb'),
            'templateName' => __('Template Name', 'vcwb'),
            'saveTemplate' => __('Save Template', 'vcwb'),
            'templateSaveFailed' => __('Template save failed.', 'vcwb'),
            'downloadMoreTemplates' => __('Download More Templates', 'vcwb'),
            'noTemplatesFound' => __(
            // @codingStandardsIgnoreLine
                'You don\'t have any templates yet. Try to save your current layout as a template or download templates from Visual Composer Hub.',
                'vcwb'
            ),
            'notRightTemplatesFound' => __(
                'Didn\'t find the right template? Check out Visual Composer Hub for more layout templates.',
                'vcwb'
            ),
            'removeTemplateWarning' => __('Do you want to remove this template?', 'vcwb'),
            'templateRemoveFailed' => __('Template remove failed.', 'vcwb'),
            'blankPageHeadingPart1' => __('Select Blank Canvas', 'vcwb'),
            'blankPageHeadingPart2' => __('or Start With a Template', 'vcwb'),
            'blankPageHelperText' => __(
                // @codingStandardsIgnoreLine
                'Visual Composer Hub will offer you unlimited download of premium quality templates, elements, extensions and more.',
                'vcwb'
            ),
            'add' => __('Add', 'vcwb'),
            'rowLayout' => __('Row Layout', 'vcwb'),
            'edit' => __('Edit', 'vcwb'),
            'clone' => __('Clone', 'vcwb'),
            'remove' => __('Remove', 'vcwb'),
            'move' => __('Move', 'vcwb'),
            'searchContentElements' => __('Search content elements', 'vcwb'),
            // @codingStandardsIgnoreLine
            'templateAlreadyExists' => __(
                'Template with this name already exist. Please specify another name.',
                'vcwb'
            ),
            'templateContentEmpty' => __('Template content is empty.', 'vcwb'),
            'specifyTemplateName' => __('Please specify template name.', 'vcwb'),
            'addOneColumn' => __('Add one column', 'vcwb'),
            'addTwoColumns' => __('Add two columns', 'vcwb'),
            'addThreeColumns' => __('Add three columns', 'vcwb'),
            'addFourColumns' => __('Add four columns', 'vcwb'),
            'addFiveColumns' => __('Add five columns', 'vcwb'),
            'addCustomRowLayout' => __('Add custom row layout', 'vcwb'),
            'addTextBlock' => __('Add Text block', 'vcwb'),
            'frontendEditor' => __('Frontend Editor', 'vcwb'),
            'blankPage' => __('Blank Page', 'vcwb'),
            'searchTemplates' => __('Search templates by name and description', 'vcwb'),
            'noResultOpenHub' => __('No Results. Open Visual Composer Hub', 'vcwb'),
            'notRightElementsFound' => __(
                'Didn\'t find the right element? Check out Visual Composer Hub for more content elements.',
                'vcwb'
            ),
            'readAndAgreeTerms' => __(
            // @codingStandardsIgnoreLine
                'Please make sure to read and agree to our terms of service in order to activate and use Visual Composer.',
                'vcwb'
            ),
            'incorrectEmailFormat' => __(
            // @codingStandardsIgnoreLine
                'Your activation request failed due to the e-mail address format. Please check your e-mail address and try again.',
                'vcwb'
            ),
            'mustAgreeToActivate' => __(
                'To activate and use Visual Composer, you must read and agree to the terms of service.',
                'vcwb'
            ),
            'activationFailed' => __('Your activation request failed. Please try again.', 'vcwb'),
            'provideCorrectEmail' => __('Please provide correct E-Mail', 'vcwb'),
        ];

        return $locale;
    }
}
