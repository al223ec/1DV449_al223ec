<?php 

abstract class Controller{

	protected $viewVars = array("action" => "action"); 

	protected function getAction(){
		return isset($_GET["action"]) ? $_GET["action"] : ""; 
	}
	protected function getCleanInput($inputName) {
		return isset($_POST[$inputName]) ? $this->sanitize($_POST[$inputName]) : '';
	}
	protected function sanitize($input) {
        $temp = trim($input);
        return filter_var($temp, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_LOW);
    }	

    protected function render($file){
		if($this->viewVars !== null){ 
			extract($this->viewVars);
		}
		ob_start();

		$pageContent = SRC_DIR . "view" . DS . "$file.php";
		if (file_exists($pageContent)){
			include_once($pageContent);
		} else {
			throw new \Exception("View pageContent file '$file' is not found");
		}

		$pageContent = ob_get_clean();
		
		$layoutFile = SRC_DIR . "view" . DS . "shared" . DS . "_layout.php";
		if (file_exists($layoutFile)){
			include_once($layoutFile);
		} else {
			throw new \Exception("View 'layoutFile' is not found.");
		}
	}

	protected function redirect(){
		header('Location:' ."/messyLabbage/index.php");
		die(); 
	}

	public abstract function controll(); 
}