<?
//-----------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////
/*//-- MySQL wrapper class ----------------------------------------------------------

This class provides an interface to mysqli. You should always use this class instead
of the mysql/mysqli functions, because this class provides debugging features and a
bunch of other cool stuff.

Everything returned by this class is automatically escaped for output. This can be
turned off by setting $Escape to false in next_record or to_array.

//--------- Basic usage -------------------------------------------------------------

* Creating the object.

require(SERVER_ROOT.'/classes/mysql.class.php');
$DB=NEW DB_MYSQL;
-----

* Making a query

$DB->query("SELECT * FROM table...");
	Is functionally equivalent to using mysqli_query("SELECT * FROM table...")
	Stores the result set in $this->QueryID
	Returns the result set, so you can save it for later (see set_query_id())
-----

* Getting data from a query

$array = $DB->next_record();
	Is functionally equivalent to using mysqli_fetch_array($ResultSet)
	You do not need to specify a result set - it uses $this-QueryID
-----

* Escaping a string

db_string($str);
	Is a wrapper for $DB->escape_str(), which is a wrapper for
	mysqli_real_escape_string(). The db_string() function exists so that you
	don't have to keep calling $DB->escape_str().

	USE THIS FUNCTION EVERY TIME YOU USE AN UNVALIDATED USER-SUPPLIED VALUE IN
	A DATABASE QUERY!


//--------- Advanced usage ---------------------------------------------------------

* The conventional way of retrieving a row from a result set is as follows:

list($All,$Columns,$That,$You,$Select)=$DB->next_record();
-----

* This is how you loop over the result set:

while(list($All,$Columns,$That,$You,$Select)=$DB->next_record()){
	echo "Do stuff with ".$All." of the ".$Columns.$That.$You.$Select;
}
-----

* There are also a couple more mysqli functions that have been wrapped. They are:

record_count()
	Wrapper to mysqli_num_rows()

affected_rows()
	Wrapper to mysqli_affected_rows()

inserted_id()
	Wrapper to mysqli_insert_id()

close
	Wrapper to mysqli_close()
-----

* And, of course, a few handy custom functions.

to_array($Key = false)
	Transforms an entire result set into an array (useful in situations where you
	can't order the rows properly in the query).

	If $Key is set, the function uses $Key as the index (good for looking up a
	field). Otherwise, it uses an iterator.

	For an example of this function in action, check out forum.php.

collect($Key)
	Loops over the result set, creating an array from one of the fields ($Key).
	For an example, see forum.php.

set_query_id($ResultSet)
	This class can only hold one result set at a time. Using set_query_id allows
	you to set the result set that the class is using to the result set in
	$ResultSet. This result set should have been obtained earlier by using
	$DB-query().

	Example:

	$FoodRS = $DB->query("SELECT * FROM food");
	$DB->query("SELECT * FROM drink");
	$Drinks = $DB->next_record();
	$DB->set_query_id($FoodRS);
	$Food = $DB->next_record();

	Of course, this example is contrived, but you get the point.


-------------------------------------------------------------------------------------
*///---------------------------------------------------------------------------------

if (!extension_loaded('mysqli')) {
	die('Mysqli Extension not loaded.');
}

//Handles escaping
function db_string($String,$DisableWildcards=false) {
	global $DB;
	//Escape
	$String = $DB->escape_str($String);
	//Remove user input wildcards
	if ($DisableWildcards) {
		$String = str_replace(array('%','_'), array('\%','\_'), $String);
	}
	return $String;
}

function db_array($Array, $DontEscape = array(), $Quote = false) {
	foreach ($Array as $Key => $Val) {
		if(!in_array($Key, $DontEscape)) {
			if($Quote) {
				$Array[$Key] = '\''.db_string(trim($Val)).'\'';
			} else {
				$Array[$Key] = db_string(trim($Val));
			}
		}
	}
	return $Array;
}

/**
 * HTML-escape a string for output.
 * This is preferable to htmlspecialchars because it doesn't screw up upon a double escape.
 *
 * @param string $Str
 * @return string escaped string.
 */
function display_str($Str) {
	if ($Str === NULL || $Str === FALSE || is_array($Str)) {
		return '';
	}
	if ($Str!='' && !is_number($Str)) {
		$Str = make_utf8($Str);
		$Str = mb_convert_encoding($Str,"HTML-ENTITIES","UTF-8");
		$Str = preg_replace("/&(?![A-Za-z]{0,4}\w{2,3};|#[0-9]{2,5};)/m","&amp;",$Str);

		$Replace = array(
				"'",'"',"<",">",
				'&#128;','&#130;','&#131;','&#132;','&#133;','&#134;','&#135;','&#136;',
				'&#137;','&#138;','&#139;','&#140;','&#142;','&#145;','&#146;','&#147;',
				'&#148;','&#149;','&#150;','&#151;','&#152;','&#153;','&#154;','&#155;',
				'&#156;','&#158;','&#159;'
		);

		$With = array(
				'&#39;','&quot;','&lt;','&gt;',
				'&#8364;','&#8218;','&#402;','&#8222;','&#8230;','&#8224;','&#8225;','&#710;',
				'&#8240;','&#352;','&#8249;','&#338;','&#381;','&#8216;','&#8217;','&#8220;',
				'&#8221;','&#8226;','&#8211;','&#8212;','&#732;','&#8482;','&#353;','&#8250;',
				'&#339;','&#382;','&#376;'
		);

		$Str = str_replace($Replace, $With, $Str);
	}
	return $Str;
}

/**
 * Return true if the given string is numeric.
 *
 * @param string $Str
 * @return true if $Str numeric
 */
if (PHP_INT_SIZE === 4) {
	function is_number($Str) {
		if ($Str[0] == '-' || $Str[0] == '+') { // Leading plus/minus signs are ok
			$Str[0] = 0;
		}
		return ltrim($Str, "0..9") === '';
	}
} else {
	function is_number($Str) {
		return $Str == strval(intval($Str));
	}
}

/**
 * Detect the encoding of a string and transform it to UTF-8.
 *
 * @param string $Str
 * @return UTF-8 encoded version of $Str
 */
function make_utf8($Str) {
	if ($Str!="") {
		if (is_utf8($Str)) { $Encoding="UTF-8"; }
		if (empty($Encoding)) { $Encoding=mb_detect_encoding($Str,'UTF-8, ISO-8859-1'); }
		if (empty($Encoding)) { $Encoding="ISO-8859-1"; }
		if ($Encoding=="UTF-8") { return $Str; }
		else { return @mb_convert_encoding($Str,"UTF-8",$Encoding); }
	}
}

/**
 * Magical function.
 *
 * @param string $Str function to detect encoding on.
 * @return true if the string is in UTF-8.
 */
function is_utf8($Str) {
	return preg_match('%^(?:
			[\x09\x0A\x0D\x20-\x7E]			 // ASCII
			| [\xC2-\xDF][\x80-\xBF]			// non-overlong 2-byte
			| \xE0[\xA0-\xBF][\x80-\xBF]		// excluding overlongs
			| [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2} // straight 3-byte
			| \xED[\x80-\x9F][\x80-\xBF]		// excluding surrogates
			| \xF0[\x90-\xBF][\x80-\xBF]{2}	 // planes 1-3
			| [\xF1-\xF3][\x80-\xBF]{3}		 // planes 4-15
			| \xF4[\x80-\x8F][\x80-\xBF]{2}	 // plane 16
			)*$%xs', $Str
	);
}


/**
 * HTML escape an entire array for output.
 * @param array $Array, what we want to escape
 * @param boolean/array $Escape
 *	if true, all keys escaped
 *	if false, no escaping.
 *	If array, it's a list of array keys not to escape.
 * @return mutated version of $Array with values escaped.
 */
function display_array($Array, $Escape = array()) {
	foreach ($Array as $Key => $Val) {
		if((!is_array($Escape) && $Escape == true) || !in_array($Key, $Escape)) {
			$Array[$Key] = display_str($Val);
		}
	}
	return $Array;
}


//TODO: revisit access levels once Drone is replaced by ZeRobot
class DB_MYSQL {
	public $LinkID = false;
	protected $QueryID = false;
	protected $Record = array();
	protected $Row;
	protected $Errno = 0;
	protected $Error = '';

	public $Queries = array();
	public $Time = 0.0;

	protected $Database = '';
	protected $Server = '';
	protected $User = '';
	protected $Pass = '';
	protected $Port = 0;
	protected $Socket = '';

	function __construct($Database = SQLDB, $User = SQLLOGIN, $Pass = SQLPASS, $Server = SQLHOST, $Port = SQLPORT, $Socket = SQLSOCK) {
		$this->Database = $Database;
		$this->Server = $Server;
		$this->User = $User;
		$this->Pass = $Pass;
		$this->Port = $Port;
		$this->Socket = $Socket;
	}

	function halt($Msg) {
		global $LoggedUser, $Cache, $Debug, $argv;
		$DBError='MySQL: '.strval($Msg).' SQL error: '.strval($this->Errno).' ('.strval($this->Error).')';
		if ($this->Errno == 1194) { send_irc('PRIVMSG '.ADMIN_CHAN.' :'.$this->Error); }
		/*if ($this->Errno == 1194) {
			preg_match("Table '(\S+)' is marked as crashed and should be repaired", $this->Error, $Matches);
		} */
		//$Debug->analysis('!dev DB Error',$DBError,3600*24);
		echo $DBError;
		if (DEBUG_MODE || check_perms('site_debug') || isset($argv[1])) {
			echo '<pre>'.display_str($DBError).'</pre>';
			if(DEBUG_MODE || check_perms('site_debug')) {
				print_r($this->Queries);
			}
			die();
		} else {
			error('-1');
		}
	}

	function connect() {
		if(!$this->LinkID) {
			$this->LinkID = mysqli_connect($this->Server, $this->User, $this->Pass, $this->Database, $this->Port, $this->Socket); // defined in config.php
			if (!$this->LinkID) {
				$this->Errno = mysqli_connect_errno();
				$this->Error = mysqli_connect_error();
				$this->halt('Connection failed (host:'.$this->Server.':'.$this->Port.')');
			}
		}
	}

   	function query($Query,$AutoHandle=1) {
   		global $LoggedUser, $Debug;
		$QueryStartTime=microtime(true);
		$this->connect();
		//In the event of a mysql deadlock, we sleep allowing mysql time to unlock then attempt again for a maximum of 5 tries
		for($i=1; $i<6; $i++) {
			$this->QueryID = mysqli_query($this->LinkID,$Query);
			if(!in_array(mysqli_errno($this->LinkID), array(1213, 1205))) {
				break;
			}
			$Debug->analysis('Non-Fatal Deadlock:',$Query,3600*24);
			trigger_error("Database deadlock, attempt $i");

			sleep($i*rand(2, 5)); // Wait longer as attempts increase
		}
		$QueryEndTime=microtime(true);
		$this->Queries[]=array(display_str($Query),($QueryEndTime-$QueryStartTime)*1000);
		$this->Time+=($QueryEndTime-$QueryStartTime)*1000;

		if (!$this->QueryID) {
			$this->Errno = mysqli_errno($this->LinkID);
			$this->Error = mysqli_error($this->LinkID);

			if ($AutoHandle) {
				$this->halt('Invalid Query: '.$Query);
			} else {
				return $this->Errno;
			}
		}

		$QueryType = substr($Query,0, 6);
		/*
		if ($QueryType == 'DELETE' || $QueryType == 'UPDATE') {
			if ($this->affected_rows() > 50) {
				$Debug->analysis($this->affected_rows().' rows altered:',$Query,3600*24);
			}
		}
		*/
		$this->Row = 0;
		if ($AutoHandle) { return $this->QueryID; }
	}

	function query_unb($Query) {
		$this->connect();
		mysqli_real_query($this->LinkID,$Query);
	}

	function inserted_id() {
		if($this->LinkID) {
			return mysqli_insert_id($this->LinkID);
		}
	}

	function next_record($Type=MYSQLI_BOTH, $Escape = true) { // $Escape can be true, false, or an array of keys to not escape
		if($this->LinkID) {
			$this->Record = mysqli_fetch_array($this->QueryID,$Type);
			$this->Row++;
			if (!is_array($this->Record)) {
				$this->QueryID = FALSE;
			} elseif($Escape !== FALSE){
				$this->Record = display_array($this->Record, $Escape);
			}
			return $this->Record;
		}
	}

	function close() {
		if($this->LinkID) {
			if(!mysqli_close($this->LinkID)) {
				$this->halt('Cannot close connection or connection did not open.');
			}
			$this->LinkID = FALSE;
		}
	}

	function record_count() {
		if ($this->QueryID) {
			return mysqli_num_rows($this->QueryID);
		}
	}

	function affected_rows() {
		if($this->LinkID) {
			return mysqli_affected_rows($this->LinkID);
		}
	}

	function info() {
		return mysqli_get_host_info($this->LinkID);
	}

	// You should use db_string() instead.
	function escape_str($Str) {
		$this->connect(0);
		if (is_array($Str)) {
			trigger_error('Attempted to escape array.');
			return '';
		}
		return mysqli_real_escape_string($this->LinkID,$Str);
	}

	// Creates an array from a result set
	// If $Key is set, use the $Key column in the result set as the array key
	// Otherwise, use an integer
	function to_array($Key = false, $Type = MYSQLI_BOTH, $Escape = true) {
		$Return = array();
		while($Row = mysqli_fetch_array($this->QueryID,$Type)){
			if($Escape!==FALSE) {
				$Row = display_array($Row, $Escape);
			}
			if($Key !== false) {
				$Return[$Row[$Key]] = $Row;
			} else {
				$Return[]=$Row;
			}
		}
		mysqli_data_seek($this->QueryID, 0);
		return $Return;
	}

	//  Loops through the result set, collecting the $ValField column into an array with $KeyField as keys
	function to_pair($KeyField, $ValField, $Escape = true) {
		$Return = array();
		while ($Row = mysqli_fetch_array($this->QueryID)) {
			if ($Escape) {
				$Key = display_str($Row[$KeyField]);
				$Val = display_str($Row[$ValField]);
			} else {
				$Key = $Row[$KeyField];
				$Val = $Row[$ValField];
			}
			$Return[$Key] = $Val;
		}
		mysqli_data_seek($this->QueryID, 0);
		return $Return;
	}

	//  Loops through the result set, collecting the $Key column into an array
	function collect($Key, $Escape = true) {
		$Return = array();
		while($Row = mysqli_fetch_array($this->QueryID)){
			$Return[] = $Escape ? display_str($Row[$Key]) : $Row[$Key];
		}
		mysqli_data_seek($this->QueryID, 0);
		return $Return;
	}

	function set_query_id(&$ResultSet){
		$this->QueryID = $ResultSet;
		$this->Row = 0;
	}

	function get_query_id() {
		return $this->QueryID;
	}

	function beginning() {
		mysqli_data_seek($this->QueryID, 0);
		$this->Row = 0;
	}
}
?>
