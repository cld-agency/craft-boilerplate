<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

return [

    // All environments
    '*' => [
        'env' => getenv('ENVIRONMENT'),

        'siteUrl' => getenv('SITE_URL'),
        // if multi-site, do it like this...
        // 'siteUrl' => [
        //     'siteOneHandle' => getenv('SITE1_URL'),
        //     'siteTwoHandle' => getenv('SITE2_URL'),
        // ],

        'useProjectConfigFile' => true,
        'isSystemLive' => true,
        'cpTrigger' => 'admin',
        'defaultWeekStartDay' => 1,
        'cacheDuration' => false,
        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),
        'enableCsrfProtection' => true,
        'generateTransformsBeforePageLoad' => true,
        'omitScriptNameInUrls' => true,
        'securityKey' => getenv('SECURITY_KEY'),
        'useEmailAsUsername' => true,
        'errorTemplatePrefix' => "_errors/",
    ],

    // Live (production) environment
    'live' => [
        'allowUpdates' => false,
        'backupOnUpdate' => false,
        'devMode' => false,
        'enableTemplateCaching' => true,

    ],

    // dev (pre-production) environment
    'dev' => [
        'allowUpdates' => false,
        'backupOnUpdate' => false,
        'devMode' => false,
        'enableTemplateCaching' => true,
        'userSessionDuration' => false,
    ],

    // Local (development) environment
    'local' => [
        'allowUpdates' => true,
        'backupOnUpdate' => false,
        'devMode' => true,
        'enableTemplateCaching' => false,
        'userSessionDuration' => false,
    ],
];