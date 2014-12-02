<h2>Problem - Mashup</h2>

<p>I denna laboration det meningen att du ska skriva en Mashup-applikation som kombinerar två stycken olika tjänster. Tjänsterna du ska jobba med är:</p>

<ul>
<li><a href="http://sverigesradio.se/api/documentation/v2/index.html">Sveriges radios öppna API</a> </li>
<li><a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google Map</a>. </li>
</ul>

<p>Tanken är att du ska bygga en javascript-applikation som ska visa trafikinformation som Sveriges Radio ger dig och presentera dessa via en karta från Google.</p>

<h3>API:ernas dokumentation</h3>

<p>Som en del i uppgiften ingår det att läsa dokumentation av de API:er som nämns ovan och därifrån förstå hur man implementerar dessa en snyggt utformad webbapplikation. I dokumentationen hittar du hur du anropar API:et, hur du får den data du vill i det format du vill. Googles kart-API är ett javascript-API och det finns gott om guider på deras sida för att se hur man använder detta. Observera också vad som gäller för att använda API:et</p>

<p>Vill du byta ut google maps mot ett annat kart-API går det också bra så länge applikationen får samma funktion.</p>

<h2>Krav</h2>

<ul>
<li>Mashupapplikationen ska hämta de senaste 100 posterna (finns det färre ta alla) av trafikinfo från SR:s API. Dessa ska presenteras på lämpligt sätt på sidan i en lista samt även på en karta med en "marker" som representerar platsen för den aktuella händelsen. </li>
<li>När man klickar på en marker ska mer information om den aktuella händelsen komma upp (titel, datum, beskrivning och kategori - Se API-dokumentationen för mer information) via ett infowindow (se google maps dokumentation). </li>
<li>Man ska inte kunna klicka upp flera noteringsrutor så att man döljer information.</li>
<li>Användaren ska kunna filtrera trafikhändelserna genom att på något sätt ge användaren möjlighet bara visa en specifik kategori: Vägtrafik, Kollektivtrafik, Planerad störning, Övrigt eller Alla kategorier. Se API-dokumentationen för mer information.</li>
<li>Applikationen ska också ha en lista med alla aktuella händelser (sorterad efter tidpunkt - senast högst upp). När användaren klickar på en händelse ska man på något sätt se detta i kartan (markören hoppar eller liknande)</li>
<li>Naturligtvis ska applikationen se bra ut. Använd gärna ett front-end ramverk för att förenkla detta t.ex. <a href="http://getbootstrap.com/">bootstrap</a> eller <a href="http://foundation.zurb.com/">Foundation</a>.</li>
<li>Din applikation ska inte fråga efter data mot API:et i onödan. Implementera en cachningsstrategi som du reflekterar kring i rapporten. </li>
<li>Du ska använda JSON som returformat</li>
<li>Det är inte tillåtet att använda JSONP</li>
<li>Applikationen ska självklart vara buggfri, säker och optimerad.</li>
</ul>

<h2>Reflektion</h2>

<ul>
<li>Vad finns det för krav du måste anpassa dig efter i de olika API:erna?</li>
<li>Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?</li>
<li>Vad finns det för risker med din applikation?</li>
<li>Hur har du tänkt kring säkerheten i din applikation?</li>
<li>Hur har du tänkt kring optimeringen i din applikation?</li>
</ul>

<h2>Extrauppgift</h2>

<ol>
<li>Trafikinformationen har olika prioritet. Visa detta genom att ge olika utseende på kartans olika markers för de olika prioriteringarna som finns (Mycket allvarlig händelse, Stor händelse, Störning, Information, Mindre störning)</li>
<li>Gör en ytterligare funktion i applikationen där man använder SR.s trafikområden. Presentera dessa i en lista. När användaren väljer ett område zommas detta in och trafikhändelserna presenteras där.</li>
</ol>

<h2>Redovisning</h2>

<p>Redovisning av denna uppgift sker muntligen på de schemalagda redovisningstiderna. Man kommer dock få boka en egen redovisningstid.</p>