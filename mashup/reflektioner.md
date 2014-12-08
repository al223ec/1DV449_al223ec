<h2>Reflektion</h2>
<ul>
<li>
	<h4>Vad finns det för krav du måste anpassa dig efter i de olika API:erna?</h4>
	<p></p>
</li>
<li>
	<h4>Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?</h4>
	<p>
		
	</p>
</li>
<li>
	<h4>Vad finns det för risker med din applikation?</h4>
	<p>
		stort beroende till apierna. Dessutom har man ingen kontroll över datan man får från apierna. Det skulla kunna komma in farlig data i form av skript. 
		Har försökt att motverka detta genom flaggor och json encode och decod i php. 
	</p>
</li>
<li>
	<h4>Hur har du tänkt kring säkerheten i din applikation?</h4>
	<p>Största riskerna med applikationen är att det kommer in manipulerat data till applikationen från framförallt srs api</p>
</li>
<li>
	<h4>Hur har du tänkt kring optimeringen i din applikation?</h4>
	<p>
		Skulle kunna implementera någon sorts longpolling eller websocket lösning. Jag litar på att google har ordnat med att kartan levereras och cachas på ett snabbt sätt. med cdn etc. 

	</p>
</li>
</ul>
