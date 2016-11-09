<?php

// Path to your craft/ folder
$craftPath = '../craft';

// Setup environment-friendly configs

define('URI_SCHEME', ( isset($_SERVER['HTTPS'] ) ) ? "https://" : "http://" );

switch ($_SERVER['SERVER_NAME']) {
	case 'example.com' :
	case 'www.example.com' :
		define('CRAFT_ENVIRONMENT', 'live');
		define('SITE_URL', URI_SCHEME . $_SERVER['SERVER_NAME']);
		break;

	case 'dev.example.com' :
		define('CRAFT_ENVIRONMENT', 'dev');
		define('SITE_URL', URI_SCHEME . $_SERVER['SERVER_NAME']);
		break;

	default :
		define('CRAFT_ENVIRONMENT', 'local');
		define('SITE_URL', URI_SCHEME . $_SERVER['SERVER_NAME']);
		break;
}

// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------- Do not edit below this line ------------------------------
// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
	if (function_exists('http_response_code'))
	{
		http_response_code(503);
	}

	exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
