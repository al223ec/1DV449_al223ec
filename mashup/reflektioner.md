<h2>Reflektion</h2>
<ul>
	<li>
		<h4>Vad finns det för krav du måste anpassa dig efter i de olika API:erna?</h4>
		<p>
			Spontant så bör man gå igenom dokumentationen noga innan man börjar använda api:erna. Gör man inte detta missar man funktionalitet som finns i apiet.
		</p>
		<h5>Google Maps</h5>
		<p>
			För att kunna hantera antalet anrop och identifiera anropen till google maps bör man använda en api nyckel i url:en. Detta verkar dock inte vara ett måste för att få tillgång till maps. 
		</p>

		Saxat från http://sverigesradio.se/api/documentation/v2/index.html
		<h5>Sveriges Radios öppna API </h5>
			Användarvillkor
		<p>
			Materialet som tillhandahålls via API får inte användas på ett sådant sätt att det skulle kunna skada Sveriges Radios oberoende eller trovärdighet.
		</p>
		<p>
			Det finns inga begränsningar på antalet anrop eller dylikt, men var snäll mot APIet och gör så få anrop som möjligt. Användare av APIet behöver inte registrera sig, även om det rekommenderas att alla användare är delaktiga i APIets öppna forum för att utbyta erfarenheter. Alla som använder APIet antas ha tagit del av och följa ovan nämnda användarvillkor.
		</p>
	</li>
	<li>
		<h4>Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?</h4>
		<p>
			Jag cachar all data i 3 minuter, detta gör jag genom att spara tidsstämpel på när jag gör en request mot sr:s api. Min implementerade caching skulle behöva förbättras, mest med felhantering men man borde också kunna implementera smaratre querys, istället för att be om allt varje gång. 
		</p>
	</li>
	<li>
		<h4>Vad finns det för risker med din applikation?</h4>
		<p>
			Det finns ett stort beroende till apierna tex. skulle det ske små förändringar i json strukturen från sr skulle stora delar av aplikationen sluta fungera på ett korrekt sätt. 
		</p>
		<p>
			Skulle sr:s api gå ner eller bli överbelastat skulle detta innebära att också min cachade data försvinner, jag saknar kontroller på datat på serversidan och räknar med att jag alltid får ett korrekt svar.
		</p>
		<p>  
			Dessutom har man ingen kontroll över datan man får från apierna. Det skulla kunna komma in farlig data. 
			Har försökt att motverka detta genom flaggor och json encode och decode i php. 
		</p>
	</li>
	<li>
		<h4>Hur har du tänkt kring säkerheten i din applikation?</h4>
		<p>
			Största riskerna med applikationen är att det kommer in manipulerat data till applikationen, det finns alltid risker med att hantera data man inte har full kontroll över. 
		</p>
		<p>
			För undvika xss har jag implementerat filter på servern som förvandlar tecken som innebär en risk till dess hex representation. 
			Detta med de innbyggda konstaterna JSON_HEX_QUOT | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS. Jag använder också json encode och decode i php som kräver att det man hanterar är korrekt json.
		</p>
	</li>
	<li>
		<h4>Hur har du tänkt kring optimeringen i din applikation?</h4>
		<p>
			Man borde implementera någon sorts longpolling eller websocket lösning. Detta dels för att undvika onödiga request och också för att se till att applikationen alltid är uppdaterad med korrekt information. 

			Jag litar på att google har ordnat med att kartan levereras och cachas och levereras på ett snabbt sätt, med hjälp av cdn etc. Jag laddar också in jquery med hjälp av google.  
		</p>
		<p>
			Jag använder mig av knockout i min applikation, detta är mest för att testa på inför mitt projekt. Detta känns lite overkill i en så här liten applikation. 
		</p>
		<p>
			Vidare borde jag ha minifierat mina egna javascript filer, men det är endast 140 rader kod. Vilket är ganska överkommligt.
		</p>
	</li>
</ul>
