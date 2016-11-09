<?php

// --------------------------------------------
// Database Configuration
// All of your system's database configuration settings go in here.
// You can see a list of the default settings in craft/app/etc/config/defaults/db.php
// --------------------------------------------

$customDbConfig = array(

	// --------------------------------------------
	// Live Database Info. Shared with dev site most of the time.
	// Override below if necessary.
	// --------------------------------------------

	'*' => array(
		'tablePrefix' => 'craft',
		'database' => '',
		'server' => '',
		'user' => '_dbu',
		'password' => '',
	),

	// --------------------------------------------
	// Dev Database Info.
	// --------------------------------------------

	// 'dev' => array(
	// 	'database' => '',
	// 	'server' => '',
	// 	'user' => '',
	// 	'password' => '',
	// )
);

// --------------------------------------------
// MERGE IN LOCAL CONFIG FILE IF IT EXISTS
// --------------------------------------------

if (is_array($customLocalDbConfig = @include(CRAFT_CONFIG_PATH . 'local/db.php')))
{
	$customGlobalDbConfig = array_merge($customDbConfig['*'], $customLocalDbConfig);
	$customDbConfig['*'] = $customGlobalDbConfig;
}

return $customDbConfig;