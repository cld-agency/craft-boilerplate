<?php
/**
 * Craft 3 Multi-Environment
 * Efficient and flexible multi-environment config for Craft 3 CMS
 *
 * $_ENV constants are loaded by craft3-multi-environment from .env.php via
 * ./public_html/index.php for web requests, and ./craft for console requests

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

return [

    // All environments
    '*' => [
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
        'securityKey' => getenv('CRAFTENV_SECURITY_KEY'),
        'useEmailAsUsername' => true,
        'usePathInfo' => true,

        // Our own custom stuff...
        'env' => CRAFT_ENVIRONMENT, // set in index.php (via .env.php)
    ],

    // Live (production) environment
    'live' => [
        'allowUpdates' => false,
        'backupOnUpdate' => false,
        'devMode' => false,
        'enableTemplateCaching' => true,
        'isSystemOn' => true,
    ],

    // dev (pre-production) environment
    'dev' => [
        'allowUpdates' => false,
        'backupOnUpdate' => false,
        'devMode' => false,
        'enableTemplateCaching' => true,
        'isSystemOn' => true,
    ],

    // Local (development) environment
    'local' => [
        'allowUpdates' => true,
        'backupOnUpdate' => true,
        'devMode' => true,
        'enableTemplateCaching' => false,
        'isSystemOn' => true,
    ],
];