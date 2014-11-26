<div class="container messageboard-container">
    <div id="messageboard">
        <form action="?<?php echo $action; ?>=<?php echo $logoutAction; ?>" method="POST">
            <input class="btn btn-danger" type="submit" id="buttonLogout" value="Logout" />
        </form>
        <input type="hidden" id="CSRFPreventionString" value="<?php echo $CSRFPreventionString; ?>" />

        <div id="messagearea"></div>

        <p id="numberOfMess">Antal meddelanden: <span id="nrOfMessages">0</span></p>
        Name:<br /> <input id="inputName" type="text" name="name" /><br />
        Message: <br />
        <textarea name="mess" id="inputText" cols="55" rows="6"></textarea>
        <input class="btn btn-primary" type="button" id="buttonSend" value="Write your message" />
        <span class="clear">&nbsp;</span>
    </div>
</div>