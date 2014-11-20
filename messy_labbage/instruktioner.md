<h2>Problem - Messy Labbage</h2>

<p>Denna laboration består av tre delar. Du kommer få en webbapplikation som kanske inte riktigt är uppbyggd på det sätt du skulle vilja. Det är ganska vanligt att man kommer få "mindre bra" kod i sitt knä som man sedan tvingas jobba vidare med. Tanken med denna uppgift är att du med din kunskap ska analysera och förbättra denna applikation både ur ett prestanda- och ett säkerhetsperspektiv. Applikationen är ganska liten så vi kanske inte kommer se jättestora förändringar i prestandan men vi får i alla fall ett tillfälle att studera de teorier och tips som finns.</p>

<ul>
<li>I första delen ska du identifiera och rätta till eventuella säkerhetsrisker med applikationen.</li>
<li>I andra delen av laborationen ska du försöka identifiera prestandaproblem i applikationen och försöka rätta till dessa.</li>
<li>I tredje delen ska du implementera lösning för meddelande-hantering i applikationen med en Comet-lösning (long-polling). Som extrauppgift kan man också göra en lösning med WebSockets.</li>
</ul>

<p>Du har ganska stora friheter att ändra i applikationen så länge funktion och utseende inte ändras. </p>

<h2>Redovisning</h2>

<p>Redovisning av denna laboration sker muntligen, i form av en laborationsrapport samt i form av publicering av kod på GitHub. </p>

<p>Laborationsrapporten <strong>ska</strong> vara i md-format och finnas publicerad tillsammans med koden i ditt repositorie. Där ska också en URL till en körbar version av din omarbetade applikation tydligt framgå så vi kan testköra den.</p>

<h2>Om applikationen</h2>

<p>Applikationen tankar du ner från följande adress: 
<a href="http://orion.lnu.se/pub/education/course/1DV449/ht14/zips/1DV449_L02.zip">http://orion.lnu.se/pub/education/course/1DV449/ht14/zips/1DV449_L02.zip</a></p>

<p>Applikationen är skriven i PHP och kräver stöd för SQLite3 och PDO.</p>

<p>Applikationen ska ha samma funktion när du är färdig med den men förhoppningsvis vara bättre, säkrare och snabbare. Fokus på denna laboration ligger som sagt på optimering och säkerhet men kliar det i fingrarna får du helt eller delvis vill strukturera/skriva om applikationen men i laborationsrapporten måste det <strong>tydligt</strong> framgå vilka prestanda- och säkerhetsförbättringar som du gjort.</p>

<p>Applikationen har en inloggningssida på sin startsida index.php. Just nu finns två användarkonton; <em>admin:admin och user:user</em>.
Efter inloggning kommer man till en enkel applikation där man kan skriva meddelanden som dyker upp i en lista. Ni känner nog igen applikationen :) </p>

<p>Applikationen använder några javascriptbiblotek samt css-ramverk. Dessa ska finnas kvar men det kan vara på sin plats att strukturera eller omarbeta dessa dessa ur optimeringssynpunkt. </p>

<h2>Del 1 - Säkerhetsproblem</h2>

<p>Applikationen är inte speciellt säker och det finns gott om säkerhetshål att täppa till. Din uppgift blir såklart att identifiera och i koden fixa till dessa säkerhetshål. Vi kan dock i denna laboration bortse från HTTPS som man såklart bör implementera på servern i en skarp applikation.</p>

<p>Du redogör för dina åtgärder i din laborationsrapport.
Dela upp varje säkerhetsrisk du hittar i följande punkter:</p>

<ul>
<li>Redogör för det säkerhetshål du hittat.</li>
<li>Redogör för hur säkerhetshålet kan utnyttjas.</li>
<li>Vad för skada kan säkerhetsbristen göra?</li>
<li>Hur du har åtgärdat säkerhetshålet i applikationskoden?</li>
</ul>

<p>Säkerheten tas upp under vecka 3 i självstudier och peer-instructions</p>

<h2>Del 2 - Optimering</h2>

<p>Applikationen bör främst kunna optimeras i både front- och till kasnke någon mindre del i backend (vi bortser från val av databashanterare som såklart också påverkar prestandan). Din uppgift blir att analysera applikationen och identifiera eventuella delar som går att optimera bättre. Du beskriver vilka delar du förändrar i din laborationsrapport och berättar också varför. Använd något verktyg som kan mäta laddning av sidan, förslagsvis någon webbläsares "web inspector".
<strong>Utgå här ifrån kurslitteraturen kapitel 1-12 för att hitta optimeringar</strong></p>

<p>Dela upp <strong>varje olika del</strong> i följande punkter:</p>

<ul>
<li>Namn på åtgärd Du gjort för att försöka förbättra prestandan</li>
<li>Teori kring åtgärden (förklara varför du implementerar den och vad säger teorin om vad denna åtgärd gör). Referens till vart du hittat denna teori ska anges!</li>
<li>Observation (laddningstid, storlekar av resurser, anrop m.m.) <strong>innan</strong> åtgård (utan webläsar-cache - gärna ett medeltal av ett antal testningar)</li>
<li>Observation (laddningstid, storlekar av resurser, anrop m.m.) <strong>efter</strong> åtgärd (utan webläsar-cache - gärna ett medeltal av ett antal testningar)</li>
<li>Reflektion kring att testresultatet blev som det blev.</li>
</ul>

<p>Optimeringen tas upp under vecka 4 i självstudier och peer-instructions</p>

<h4>Tänk på följande angående mätningen</h4>

<p>HTTP-caching och gzip kan vara svårt att implementera på servrar man inte har full kontroll över (kan styras via php.ini / .htaccess i apache:s fall). I de flesta fall är redan webbservern förinställd. Därför kan dessa bortses ifrån i denna laboration men vill man får man gärna hantera dessa också.</p>

<p>Även om din åtgärd <strong>inte</strong> förbättrar resultatet kan den vara intressant att ta med i laborationsrapporten om åtgärden enligt teorin borde förbättrat prestandan men av någon nämnd anledning inte gör detta.</p>

<p>Tänk på att om du kör applikationen lokalt går det väldigt fort och kan vara svårt att upptäcka verkliga förändringar. Testa gärna dina förändringar på en extern server t.ex. ditt webbhotell eller varför inte någon molnbaserad tjänst.</p>

<p>Mindre kodoptimeringar så som att ++variable eventuellt anses snabbare än variable++ räknas inte i denna laboration utan vi letar efter saker som tas upp i kurslitteraturen så som t.ex. antalet requests, hur man hanterar statiska resurser o.s.v.</p>

<h2>Del 3 - Long-polling</h2>

<p>Att HTTP-protokellet i sitt orginalutförande har lite begränsningar vet vi om. Kommunikationen mellan webbläsare och webbserverar är oftast byggda för att följa en request/response-modell. I och med en webb där vissa tjänster ställer högre krav på realtidsdata finner man ibland denna metod otillräcklig. Man efterfrågan en mer push-baserad metod där servern skickar ut data till kienten när ny data finns.</p>

<p>Applikationen använder i grundutförande någon underlig variant på AJAX-förfrågan. Du ska nu implementera en äldre variant av realtidslöning som vi kallar för long-polling. I dagsläget kanske man föredrar<a href="http://en.wikipedia.org/wiki/WebSocket">web sockets</a> och <a href="https://developer.mozilla.org/en-US/docs/Server-sent_events/Using_server-sent_events">server-sent events</a> (se extrauppgiften) men i många fall har man mer klassisk Long-polling-teknik som fallback.</p>

<p>Det finns ett antal olika varianter för så kallade Comet-tekniker men du ska implementera en lösning som stödjer sig på metoden som kallas för <strong>XMLHttpRequest long polling</strong> alternativt <strong>XHR streaming</strong>.</p>

<p>anken är att du ska skriva om meddelande-hanteringen till en comet-lösning där servern meddelar klienten när ett nytt meddelande har skrivits. Du ska alltså kunna ha två webbläsarfönster öppna och när du skriver ett meddelande i det ena ska det dyka upp i båda webbläsarfönstren.</p>

<p>Long-polling tas upp under vecka 4 i självstudier och peer-instructions</p>

<h4>Krav</h4>

<ul>
<li>Sista skrivna meddelandet ska hamna högst upp i meddelandelistan </li>
<li>Bara de nya meddelanden som inte tidigare skickas ut till klienten ska skickas ut vid en uppdatering.</li>
<li>Du förklarar din implementation i din laborationsrapport samt reflekterar över de för- och nackdelar som finns med en denna lösning.</li>
<li>Koden ska såklart redovisas på ditt github-konto tillsammans med en URL till en körbar version</li>
</ul>

<h2>Del 4 - Extrauppgift 1</h2>

<p>För er som vill och/eller satsar på högre betyg finns ytterligare en extrauppgift. Gör en implementation med Web Socket som pushar ut nya meddelanden. Implementera applikationen så att long-pollingtekniken automatiskt körs som fallback för eventuella webbläsare som inte stödjer Web Sockets.</p>

<p>Jämför med long polling-tekniken och beskriv skillnaderna i din laborationsrapport tillsammans med en URL till en körbar version.</p>
</div>
<h2>Redovisning och handledning</h2>
<p>Handledning och redovisning enligt schemat</p>
