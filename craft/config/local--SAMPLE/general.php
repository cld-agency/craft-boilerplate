<?php

// --------------------------------------------
// Local Config Override
//
// Overrides added here will get appended to the end of the
// custom config array for all environments: '*'
// --------------------------------------------

return array(
	'devMode'	=> true,
	'testToEmailAddress' => 'yourname@cld.agency',

	// Make member login settings nice and trusting
	// http://www.php.net/manual/en/dateinterval.construct.php

	'userSessionDuration'           => 'P101Y',
	'rememberedUserSessionDuration' => 'P101Y',
	'rememberUsernameDuration'      => 'P101Y',
	'invalidLoginWindowDuration'    => 'P101Y',
	'cooldownDuration'              => 'PT1S',
	'maxInvalidLogins'              => 101,
);