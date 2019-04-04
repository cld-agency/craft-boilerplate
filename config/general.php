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
        'siteUrl' => getenv('SITE_URL'),
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
        'usePathInfo' => true,
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
    ],

    // Local (development) environment
    'local' => [
        'allowUpdates' => true,
        'backupOnUpdate' => true,
        'devMode' => true,
        'enableTemplateCaching' => false,
    ],
];