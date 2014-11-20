<?php 

abstract class Db {
	private $table = "users"; 
	
	public function __construct($table){
		$this->table = $table;
	}

	protected function connection(){
		try{
			// Create (connect to) SQLite database in file
			$db = new \PDO('sqlite:messaging.sqlite');
			// Set errormode to exceptions
			$db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
		}catch(PDOException $e) {
			$db = null; 
			die($e->getMessage());
		}
		return $db; 
	}

	protected function findBy($column, $value){
		$sql = "
			SELECT " . $this->table . ".*
			FROM " . $this->table . "
			WHERE ". $this->table ."." . $column . " = :value
		";
		$params = array(":value" => $value);
		$result = $this->query($sql, $params);
		return ($result !== null) ? $result[0] : null;
	}
	 
	protected function query($sql, $params = null){
		$db = $this->connection();
		$query = $db->prepare($sql); 
		
		if ($params !== null) {
			if (!is_array($params)) {
				$params = array($params);
			}
			$query->execute($params);
		} else {
			$query->execute(); 
		}
		
		if($response = $query->fetchAll()){
			return $response; 
		}
		return null;
	}

}