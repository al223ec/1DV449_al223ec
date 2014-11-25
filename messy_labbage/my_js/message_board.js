var MessageBoard = {

    messages: [],
    textField: null,
    messageArea: null,
    latestRequest: null,

    init : function(e) {
	    MessageBoard.textField     =   document.getElementById("inputText");
	    MessageBoard.nameField     =   document.getElementById("inputName");
        MessageBoard.messageArea   =   document.getElementById("messagearea");

        // Add eventhandlers    
        document.getElementById("inputText").onfocus = function(e){ 
            this.className = "focus"; 
        };
        document.getElementById("inputText").onblur = function(e){ 
            this.className = "blur"; 
        };
        document.getElementById("buttonSend").onclick = function(e) {
            MessageBoard.sendMessage(); return false;
        };
        document.getElementById("buttonLogout").onclick = function(e) {
            MessageBoard.logout(); return false;
        };

        MessageBoard.textField.onkeypress = function(e){ 
            if(!e){ var e = window.event; }
            
            if(e.keyCode === 13 && !e.shiftKey){
                MessageBoard.sendMessage();
                return false;
            }
        };    
    },
    getMessages : function() {
        $.ajax(
            {
    			type: "GET",
    			url: "index.php",
                async: true,

    			data: {
                    action: "getMessages",
                    latestRequest: MessageBoard.latestRequest
                },
                success : function(response) {
                    MessageBoard.latestRequest =  new Date().getTime() / 1000;
                    console.log(response);
                    messages = JSON.parse(response);

                    for(var i in messages) { 
                        var text = messages[i].name +" said:\n" + messages[i].message;
                        var mess = new Message(text, new Date(messages[i].time * 1000));
                        MessageBoard.messages.push(mess);
                        MessageBoard.renderMessage(mess); 
                    }
                    document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                    //Vad händer om det blir ett error? 
                },
                complete : function (){
                    //Sker efter success och error  
                    MessageBoard.getMessages();
                }
            }
        );
    },
    sendMessage : function(){
        console.log("sendMessage pressed"); 
        if(MessageBoard.textField.value === "") {
            return;
        }
        
        $.ajax(
            {
    			type: "POST",
    		  	url: "index.php",
                async: true,
    		  	data: {
                    action: "addMessage", 
                    name: MessageBoard.nameField.value, 
                    message: MessageBoard.textField.value,
                    CSRFPreventionString: document.getElementById("CSRFPreventionString").value
                }, 
                success : function(response) {
                    //window.location = "index.php";
                    console.log(response); 
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){

                },
                complete : function (){
                }
    		}
        );
    
    },
   /* renderMessages : function(){
        // Remove all messages
        MessageBoard.messageArea.innerHTML = "";
     
        // Renders all messages.
        for(var i=0; i < MessageBoard.messages.length; ++i){
            MessageBoard.renderMessage(MessageBoard.messages[i]);
        }        
        
        document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
    },*/
    renderMessage : function(message){
        // Message div
        var div = document.createElement("div");
        div.className = "message";
       
        // Clock button
        aTag = document.createElement("a");
        aTag.href="#";
        aTag.onclick = function(){
			MessageBoard.showTime(message);
			return false;			
		}
        
        var imgClock = document.createElement("img");
        imgClock.src="pic/clock.png";
        imgClock.alt="Show creation time";
        
        aTag.appendChild(imgClock);
        div.appendChild(aTag);
       
        // Message text
        var text = document.createElement("p");
        text.innerHTML = message.getHTMLText();        
        div.appendChild(text);
            
        // Time - Should fix on server!
        var spanDate = document.createElement("span");
        spanDate.appendChild(document.createTextNode(message.getDateText()));

        div.appendChild(spanDate);        
        
        var spanClear = document.createElement("span");
        spanClear.className = "clear";

        div.appendChild(spanClear);        
        
        MessageBoard.messageArea.appendChild(div);       
    },/* 
    removeMessage: function(messageID){
		if(window.confirm("Vill du verkligen radera meddelandet?")){
        
			MessageBoard.messages.splice(messageID,1); // Removes the message from the array.
        
			MessageBoard.renderMessages();
        }
    },*/
    showTime : function(message){
         var time = message.getDate();
         var showTime = "Created " + time.toLocaleDateString() + " at " + time.toLocaleTimeString();
         alert(showTime);
    }
};

$(function() {
    MessageBoard.init();
    MessageBoard.getMessages();
});