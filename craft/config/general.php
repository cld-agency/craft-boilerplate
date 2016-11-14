<?php

// --------------------------------------------
// Adapted from https://github.com/BarrelStrength/Craft-Master.
//
// General Configuration
// All of your system's general configuration settings go in here.
// You can see a list of the default settings in craft/app/etc/config/defaults/general.php
//
// Environment Variables (in the environmentVariables arrays)
// are accessible in templates or CP fields as simply {varName},
// while other config settings are accessed as {craft.config.varName}
// --------------------------------------------

//define('URI_SCHEME', ( isset($_SERVER['HTTPS'] ) ) ? "https://" : "http://" );
//define('SITE_URL', URI_SCHEME . $_SERVER['SERVER_NAME']);

if ( CRAFT_ENVIRONMENT === 'local' )
{
	require(CRAFT_CONFIG_PATH . 'local/general.php');
}

define('BASEPATH', realpath(CRAFT_BASE_PATH . '/../') . '/');

$customConfig = array(

	// --------------------------------------------
	// Environment: All
	// --------------------------------------------

	'*' => array(
		'siteUrl' => SITE_URL,
		'env' => CRAFT_ENVIRONMENT, // Set in index.php
		'cpTrigger' => 'admin',
		'enableCsrfProtection' => true,
		'addTrailingSlashesToUrls' => false,
		'omitScriptNameInUrls' => true,
		'defaultImageQuality' => 95,
		'cacheElementQueries' => true,
		'errorTemplatePrefix' => "errors/",
		'environmentVariables' => array(
			'baseUrl'  => SITE_URL,
			'basePath' => BASEPATH
		),
		'devMode' => false,
		'enableTemplateCaching' => false
	),

	// --------------------------------------------
	// Environment: Live
	// --------------------------------------------

	'live' => array(
		'allowAutoUpdates' => false,
		'devMode' => false,
		'enableTemplateCaching' => true
	),


	// --------------------------------------------
	// Environment: Dev
	// --------------------------------------------

	'dev' => array(
		'allowAutoUpdates' => false,
		'devMode' => true,
		'enableTemplateCaching' => true
	)
);

// --------------------------------------------
// MERGE IN LOCAL CONFIG FILE IF IT EXISTS
// --------------------------------------------

if (is_array($customLocalConfig = @include(CRAFT_CONFIG_PATH . 'local/general.php')))
{
	$customGlobalConfig = array_merge($customConfig['*'], $customLocalConfig);
	$customConfig['*'] = $customGlobalConfig;
}

return $customConfig;
