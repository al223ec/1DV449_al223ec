<?php

class MessageDb extends Db{

	public function __construct(){
		parent::__construct("messages.db"); 
	}
}