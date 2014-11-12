<?php
set_time_limit(0); // to infinity

include_once('course_scraper.php'); 
include_once('web_scraper.php'); 
include_once('course_page_scraper.php'); 
include_once('my_page_scraper.php'); 

$jsonFilePath = "data.json"; 
$jsonFilePathMyPage = "myPageData.json"; 


$action = "a"; 
$actionScrapeCoursePage = "WebScraper::actionScrapeCoursePage"; 
$actionScrapeLoginPage = "WebScraper::actionScrapeLoginPage";

$password = "WebScraper::password"; 
$userName = "WebScraper::userName";

$numberOfCourses = "WebScraper::numberOfCourses"; 
$message = ""; 

if(isset($_GET[$action]) && $_GET[$action] == $actionScrapeCoursePage){
	$scraper = new CoursePageScraper(); 
	$scraper->scrapeCourses(intval($_POST[$numberOfCourses]));
	$scraper->scrapeLatestpost(); 
	file_put_contents($jsonFilePath, json_encode($scraper, JSON_PRETTY_PRINT));

}else if(isset($_GET[$action]) && $_GET[$action] == $actionScrapeLoginPage){
	$myScraper = new MyPageScraper(); 
	$myScraper->scrapeMyPage($_POST[$userName], $_POST[$password], intval($_POST[$numberOfCourses])); 
	
	file_put_contents($jsonFilePathMyPage, json_encode($myScraper, JSON_PRETTY_PRINT));
}



function getScrapingInformation($jsonFilePath){
	@$string = file_get_contents($jsonFilePath);
	if($string){
		$jsonObjects = json_decode($string, true);

		return '<ul>
					<li> Senaste skrapningen gjordes '. date("F j, Y, g:i a", $jsonObjects['info']['time']) .  '</li>
					<li> Skrapningen tog '. $jsonObjects['info']['totalTime'] . ' sekunder</li>
					<li> Skrapade kurser '. $jsonObjects['info']['coursesScraped'] .'</li>
					<li> Antalet request '. $jsonObjects['info']['numberOfReqests'] .'</li>
				</ul>';
	}
}

?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="css/bootstrap.min.css" rel="stylesheet" />
	<title> Webbskrapning </title>
</head>
<body>
<section>
  <div class="container">    
    <h3> Webbskrapning webbteknik 2 al223ec </h3>
    <?php  echo getScrapingInformation($jsonFilePath); ?>
    <p><a href="<?php echo $jsonFilePath; ?>"> Json fil </a></p>

    <form class="form-horizontal" action="?<?php echo $action; ?>=<?php echo $actionScrapeCoursePage; ?>" method="post" enctype="multipart/form-data" role="form">
      <div class="form-group">
        <label class="col-sm-2 control-label">Antalet kurser som skrapas:</label>
        <div class="col-sm-2">
        <select class="form-control" name="<?php echo $numberOfCourses; ?>">
           <?php for ($i=5; $i < 90; $i+=5) { ?>
              <option value="<?php  echo $i; ?>" >
              <?php  echo $i; ?>
              </option> 
           	<?php } ?>
		</select>
        </div>
      </div>
       <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <p>Detta kan ta lite tid</p>
          <button type="submit" class="btn btn-default">Skrapa</button> 
        </div>
      </div>
    </form>
	<form class="form-horizontal" action="?<?php echo $action; ?>=<?php echo $actionScrapeLoginPage; ?>" method="post" enctype="multipart/form-data" role="form">
     <legend>Skrapa mina sidor </legend>
     <?php  echo getScrapingInformation($jsonFilePathMyPage); ?>
	<p><a href="<?php echo $jsonFilePathMyPage; ?>"> Json fil </a></p>

      <div class="form-group">
        <label for="<?php echo $userName ?>" class="col-sm-2 control-label">Användarnamn:</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="<?php echo $userName ?>" name="<?php echo $userName ?>" 
          placeholder="Användarnamn" value="">
        </div>
      </div>
      <div class="form-group">
        <label for="<?php echo $password ?>" class="col-sm-2 control-label">Lösenord:</label>
        <div class="col-sm-6">
          <input type="password" class="form-control" id="<?php echo $password ?>" name="<?php echo $password ?>" 
          placeholder="Lösenord" value="">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">Antalet kurser som skrapas:</label>
        <div class="col-sm-2">
        <select class="form-control" name="<?php echo $numberOfCourses; ?>">
           <?php for ($i=5; $i < 90; $i+=5) { ?>
              <option value="<?php  echo $i; ?>" >
              <?php  echo $i; ?>
              </option> 
           	<?php } ?>
		</select>
        </div>
      </div>
     <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <p>Detta kan ta lite tid</p>
          <button type="submit" class="btn btn-default">Skrapa mina sidor</button> 
        </div>
      </div>
    </form>
  </div>
</section> 

