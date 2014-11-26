var MessageBoard = {

    messages: [],
    textField: null,
    messageArea: null,
    latestRequest: null,
    timeout: null,

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
            }
        ).done(function(response){
            MessageBoard.latestRequest =  new Date().getTime() / 1000;
            console.log(response);
            messages = JSON.parse(response);

            for(var i in messages) { 
                var text = messages[i].name +" said:\n" + messages[i].message;
                var mess = new Message(text, new Date(messages[i].time * 1000));
                for(var j = 0; j < MessageBoard.messages.length; j++) { 
                    var add = MessageBoard.messages[j].getDate().getTime() === mess.getDate().getTime() && 
                                MessageBoard.messages[j].getText() === mess.getText(); 
                }
                if(!add){ 
                    MessageBoard.messages.push(mess); 
                    MessageBoard.renderMessage(mess);
                }          
            }
            document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
           
            clearInterval(MessageBoard.timeout);
            MessageBoard.timeout = setTimeout( function(){
                MessageBoard.getMessages();
            }, 1000 );
        });
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
                    MessageBoard.textField.value = "";
                    //console.log(response); 
                },
    		}
        );
    
    },
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
    },
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