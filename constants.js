global.__appbase = require('path').resolve(__dirname) + '/app/';

global.FANDOM_API_URL = 'https://gameofthrones.fandom.com/api.php';
global.WESTEROS_API_URL = 'https://awoiaf.westeros.org/api.php';

global.FILLER_POLICY_REFILL = 1;
global.FILLER_POLICY_UPDATE = 2;
global.FILLER_POLICY_SAFE_UPDATE = 3;

global.STORE_RESPONSE_SUCCESS = 1;
global.STORE_RESPONSE_ERROR = 0;
global.STORE_RESPONSE_EMPTY = -1;