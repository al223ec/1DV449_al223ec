<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />


<title> Messy Labbage </title>
</head>
<body>
	<div class="container">
		<?php 
			echo $pageContent;
		?>
	</div>
	<?php 
	if(isset($userIsLoggedIn) && $userIsLoggedIn) { ?>
	    <script type="text/javascript" src="js/jquery-1.10.2.min.js" ></script>
	    <script type="text/javascript" src="my_js/message.js" ></script>
	    <script type="text/javascript" src="my_js/message_board.js" ></script>
	<?php
	}
	?>
</body>
</html>
