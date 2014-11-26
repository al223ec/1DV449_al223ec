Laborationsrapport
--------------------- 
Nästan ingen funktionalitet är på plats, fel i koden på väldigt många ställen. Det är mycket buggar, koden är ganska dåligt skriven vilket ur både ett säkerhetsperspektiv och ett "bugg"perspektiv är väldigt dåligt.

Säkerhetsproblem
-----------------------
Inloggning saknas man kan komma in på sidan genom att endast ange URL:en till den sida man önskar. Man behöver inte ens ange UN eller PW, det går att ta bort html required attributen och logga in. 

Ingen server side autentisering finns. 

<h4>SQL injections</h4> 
---------------
Applikationen är helt öppen för sql injections. Inga prepare statements, eller då dessa finns används de fel. 

<h4>Databas</h4> 
---------
Användarens lösenord hashas inte. Databasfilen ligger dessutom helt öppet och kan nås genom att man endast anger en url till filen.
Detta speler iofs ingen roll när inte inloggningen fungerar. 

<h4>XSS </h4> 
-------
Är fullt möjligt, ingen indata eller utdata saniteras. 

<h4>CSRF</h4> 
----------
Det finns heller inget skydd mot Cross-site request forgery. 

<h4>Övrigt</h4> 
----------
Använder get för att posta data, vilket innebär att webskrapor och spindlar skulle kunna posta data. 


<h4>Åtgärder</h4> 
-----------
Jag har helt förändrat server side strukturen på applikationen och implementerat ett MVC mönster. Jag har implementerat en fungerande inlogg och hashat lösenorden i databasen. 

Man kan nu endast get:ta data om man är inloggad. 
Tvingar också användaren att besöka sidan med https

<h4>SQL injections</h4>  
---------------
Jag förhindrar sql injections genom att prepara alla mina sql satser. Har dessutom gjort så att jag kör alla databas frågor i samma funktion, har dolt databasförbinndelsen i klassen Db och exponerar aldrig denna utan tvingar programmeraren att använda funktionerna findBy eller query för att ställa frågor till databasen. 

<h4>Databas</h4> 
---------
För att hasha lösenord använder jag php:s funktion crypt och ett genererat salt. Hash_equals bör användas när man sedan gämför användarens givna lösen med hashen som finns i databasen, men detta kan jag inte göra pga den php versionen som jag har på mitt webbhotell är 5.5 och denna funktion kommer i 5.6. 

Databasfilen ligger numera mer dolt, och har försökt att skriva en .htaccess fil som förhindrar att man laddar ner den. 

<h4>XSS </h4> 
-------
All data till och från databasen saniteras numera.

<h4>CSRF</h4> 
----------
Har implementerat Synchronizer Token Pattern via ett dolt fällt som skickas till användaren. Om man försöker posta med ett ogiltigt värde i detta fält loggas man ut. 

<h4>Sessionen</h4> 
-------------------
Det som spontant saknas är lite mer sessionshantering jag bör namnge sessionen för att försvåra sessionsstölder, nu kontrollerar jag endast att användaren använder samma webbläsare vid alla inloggade request, detta skulle kunna utökas så att fler variablar måste stämma överens. 
Jag har också satt att sessionen blir ogiltig efter 30 minuters inaktivitet, jag genererar om session var tredje minut. 


Optimering
------------------------
Koden är väldigt dåligt strukturerad och filer laddas in flera gånger. CSS skrivs på flera platser. Script filer laddas också in hur som helst. 
Det finns dessutom flera bilder i css som inte används, eller de syns iallafall inte. 

Jag har främst fokuserat på att få till bättre struktur så att man mycket lättare ser vad det är som laddas in och vad det är som måste laddas in. Jag har följt flera rekomendationer från boken: High Performance Web Sites, Steve Sounders, O’Reilly. 

<h4>Utförd optimering</h4>
-------------
<ul>
<li>Rule 5: Put Stylesheets at the To s37</li>
<li>Rule 6: Put Scripts at the Bottom  s45</li>
<li>Rule 8: Make JavaScript and CSS External s55</li>
<li>Rule 10: Minify JavaScript s69</li>
<li>Rule 12: Remove Duplicate Scripts s85</li>
</ul>
<h4>Optimering resultat</h4>
-------------------
Man har ganska mycket att tjäna på hur servern är konfigurerad och att servern komprimerar filerna. Stört förändring har skett i hur mycket data som skickas. Dessutom har jag kunnat ta bort 4 request. 

<h4>Lokalt</h4>
--------------------
Innan förändring<br>
login 3 request 192 kb | 77ms (load: 88ms DOMContentloaded: 88ms)
start 14 request 785 kb | 320ms (load: 288ms DOMContentloaded: 281ms)

Efter förändring<br>
login 3 request 115 kb | 64ms (load: 103ms DOMContentloaded: 57ms)
start 10 request 257 kb | 180ms (load: 158ms DOMContentloaded: 131ms)

<h4>Server</h4>
-------
Innan förändring
login 3 request 32,9 kb | 379ms (load: 409ms DOMContentloaded: 408ms)
start 14 request 314 kb | 530ms (load: 535ms DOMContentloaded: 376ms)

Efter förändring
login 3 request 20,6 kb | 231ms (load: 240ms DOMContentloaded: 106ms)
start 10 request 97 kb | 447ms (load: 158ms DOMContentloaded: 131ms)


Long-polling
-------------------------
Verkar vara nästan omöjligt att få till ordentlig long polling med php när man använder sig av session start. Lyckades dock till slut lösa detta i samarbete, genom att kalla på session_write_close(); innan jag börjar while loopen

Läser från fil, detta pga sessionshanteringen inte fungerar i samband med long polling 


ht access fil, saknas 404 sida och liknande
har inte fullt implementerat htaaccess filen på webbservern. Just nu går det iaf inte att komma åt sqlite filen och därigenom databasen på ett lätt sätt. 
Skulle man implementera detta live ska man naturligtvis inte ha en sqlite databas.

Felhantering
------------
Det saknas mycket felhantering speciellt på klientsidan, inga felmeddelanden eller successmeddelanden skrivs ut. 
Cache
------------
Ligger på servern har inte styrt så mycket i detta. Dessutom har jag valt att köra med https på servern, detta innebär också begränsningar i cachningsmöjligheter. 

Kod
Skulle vilja implementera lite routing men applikationen är så liten så känns lite overkill. 
Bör också bryta ut min sessionshantering och hantera allt med sessioner från samma klass, den implmeneterade lösningnen är ganska rörig. 

övrigt
Jag valde att bortse från att visa nya meddelanden överst, dessa vissas istället där man skriver sitt meddelande i botten av sidan. Detta skulle kunna fixas enkelt med en array reverse.

sqllite
http://www.if-not-true-then-false.com/2012/php-pdo-sqlite3-example/