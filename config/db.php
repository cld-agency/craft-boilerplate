<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in vendor/craftcms/cms/src/config/DbConfig.php.
 */

return [
    'database' => getenv('CRAFTENV_DB_DATABASE'),
    'driver' => getenv('CRAFTENV_DB_DRIVER'),
    'server' => getenv('CRAFTENV_DB_SERVER'),
    'user' => getenv('CRAFTENV_DB_USER'),
    'password' => getenv('CRAFTENV_DB_PASSWORD'),
    'schema' => getenv('CRAFTENV_DB_SCHEMA'),
    'tablePrefix' => getenv('CRAFTENV_DB_TABLE_PREFIX'),
    'port' => getenv('CRAFTENV_DB_PORT'),
];