<?

class G {
	public static $DB;

	public static function initialize() {
		global $DB;
		self::$DB = $DB;
	}


}