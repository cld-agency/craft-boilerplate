<?php
/**
 * nystudio107 Craft 3 Multi-Environment, as simplifed by James Smith
 * ... May need to add back the BASE_PATH and BASE_URL vars here if
 * the site ever starts using a CDN for static assets.
 *
 * This file should be renamed to '.env.php' and it should reside in your root
 * project directory.  Add '/.env.php' to your .gitignore.
 */

// --------------------------------------------
// The $craftEnvVars are all auto-prefixed with CRAFTENV_ -- you can add
// whatever you want here and access them via getenv() using the prefixed name
// --------------------------------------------

$craftEnvVars = [
    'CRAFT_ENVIRONMENT' => 'local',
    'SECURITY_KEY' => 'REPLACE_ME_WITH_WHATEVER',

    'DB_SERVER' => 'localhost',
    'DB_DATABASE' => 'REPLACE_ME',
    'DB_USER' => 'root',
    'DB_PASSWORD' => 'root',
    'DB_TABLE_PREFIX' => 'craft',

    'DB_DRIVER' => 'mysql',
    'DB_SCHEMA' => 'public',
];

// Set all of the .env values, auto-prefixed with `CRAFTENV_`
foreach ($craftEnvVars as $key => $value) {
    putenv("CRAFTENV_{$key}={$value}");
}

/**
 * For production environments, this .env.php file can be used, or preferably,
 * (for security & speed), set the $_ENV variables directly from the server config.

 * Nginx - inside the server {} or location ~ \.php$ {} block:

fastcgi_param CRAFTENV_CRAFT_ENVIRONMENT "REPLACE_ME_CRAFT_ENVIRONMENT";
fastcgi_param CRAFTENV_DB_DRIVER "REPLACE_ME_DB_DRIVER";
fastcgi_param CRAFTENV_DB_SERVER "REPLACE_ME_DB_SERVER";
fastcgi_param CRAFTENV_DB_USER "REPLACE_ME_DB_USER";
fastcgi_param CRAFTENV_DB_PASSWORD "REPLACE_ME_DB_PASSWORD";
fastcgi_param CRAFTENV_DB_DATABASE "REPLACE_ME_DB_DATABASE";
fastcgi_param CRAFTENV_DB_SCHEMA "REPLACE_ME_DB_SCHEMA";
fastcgi_param CRAFTENV_SECURITY_KEY "REPLACE_ME_SECURITY_KEY";

 */