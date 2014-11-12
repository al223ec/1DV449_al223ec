<?php
set_time_limit(0); // to infinity

include_once('course_scraper.php'); 
include_once('web_scraper.php'); 

$jsonFilePath = "data.json"; 
$scraper = new WebScraper(); 
/*
$scraper->scrapeCourses();
$courses = $scraper->getCourses(); 
$scraper->scrapeLatestpost();

$arrayJson = array_merge($scraper->getScraperInformation(), $courses); 

//echo "antalet anrop: " . $scraper->getNumberOfRequests() . " tid: " . $scraper->getRequestTime(); 
file_put_contents($jsonFilePath, json_encode($arrayJson, JSON_PRETTY_PRINT)); //, JSON_PRETTY_PRINT)
*/

//*[@id="sidebar-user-login"]
//*[@id="sidebar-user-pass"]

$action = "a"; 
$actionScrapeCoursePage = "WebScraper::actionScrapeCoursePage"; 
$actionScrapeLoginPage = "WebScraper::actionScrapeLoginPage"; 
$numberOfCourses = "WebScraper::numberOfCourses"; 
$message = ""; 


if(isset($_GET[$action]) && $_GET[$action] == $actionScrapeCoursePage){

	$scraper->scrapeCourses(intval($_POST[$numberOfCourses]));
	$scraper->scrapeLatestpost();

	$message = "antalet anrop: " . $scraper->getNumberOfRequests() . " tid: " . $scraper->getRequestTime(); 
	file_put_contents($jsonFilePath, json_encode($scraper, JSON_PRETTY_PRINT)); //, JSON_PRETTY_PRINT)
}

/*
 <legend>Un och PW </legend>
      <div class="form-group">
        <label for="oauth_access_token" class="col-sm-2 control-label">Oauth access token:</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="oauth_access_token" name="oauthAccessToken" 
          placeholder="Användarnamn" value="">
        </div>
      </div>
      <div class="form-group">
        <label for="oauth_access_token_secret" class="col-sm-2 control-label">Oauth access secret:</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="oauth_access_token_secret" name="oauthAccessTokenSecret" 
          placeholder="Lösenord" value="">
        </div>
      </div>
*/

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
    <p><?php echo $message; ?></p>
    <form class="form-horizontal" action="?<?php echo $action; ?>=<?php echo $actionScrapeCoursePage; ?>" method="post" enctype="multipart/form-data" role="form">
      <div class="form-group">
        <label class="col-sm-2 control-label">Antalet kurser som läses in:</label>
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
  </div>
</section> 

