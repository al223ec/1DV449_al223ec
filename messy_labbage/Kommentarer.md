Nästan ingen funktionalitet är på plats, fel i koden på väldigt många ställen. Det är mycket buggar, koden är ganska dåligt skriven vilket ur både ett säkerhetsperspektiv "bugg"perspektiv är väldigt dåligt.

Säkerhetsproblem
-----------------------
Inloggning saknas, kan komma in på sidan genom att endast ange URL:en
Behöver inte ange UN eller PW

Ingen server side authentisering, möjligt att ta bort required attributen på fälten och logga in. 

SQL injections 
Inga prepare statements, eller då dessa finns används de fel

XSS 
Är fullt möjligt, ingen indata saniteras. 

CSRF
Är också möjlig

Använder get för att posta data

Implementera
Synchronizer Token Pattern

Printar ut felmeddelande direkt

För att förhindra att obehöriga ska kunna getta sidan kan man endast hämta data om man är inloggad. Tidigare skulle man bara kunna göra en get förfrågan och kringå inloggningskravet.


Optimering
------------------------
Frågan om man ska fokusera på kod optimering eller snabbhet. 
javascripten verkar laddas in flera ggr och i head taggen

Valdigt rörigt strukturerad applikation, css överallt dock är ju inline css snabbast. NJa 
Inline css kan inte cachas vilket sker med css filer. 
Background image och css som inte används

Sprites??  
Scriptfiler laddas in i slutet på sidan
Rule 5: Put Stylesheets at the To s37
Rule 6: Put Scripts at the Bottom  s45
Rule 8: Make JavaScript and CSS External s55
Rule 10: Minify JavaScript s69
Rule 12: Remove Duplicate Scripts s85

Long-polling
-------------------------
Verkar vara nästan omöjligt att få till ordentlig long polling med php när man använder sig av session start. Lyckades dock till slut lösa detta i samarbete, genom att kalla på session_write_close(); innan jag börjar while loopen



ht access fil, saknas 404 sida och liknande
Kod
Skulle vilja implementera lite routing men applikationen är så liten så känns lite overkill. 


sqllite
http://www.if-not-true-then-false.com/2012/php-pdo-sqlite3-example/