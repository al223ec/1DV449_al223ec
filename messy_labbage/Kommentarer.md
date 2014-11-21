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

Optimering
------------------------
Frågan om man ska fokusera på kod optimering eller snabbhet. 
javascripten verkar laddas in flera ggr och i head taggen

Valdigt rörigt strukturerad applikation, css överallt dock är ju inline css snabbast. NJa 
Inline css kan inte cachas vilket sker med css filer. 
Background image och css som inte används

Sprites??  
Scriptfiler laddas in i slutet på sidan


Long-polling
-------------------------



sqllite
http://www.if-not-true-then-false.com/2012/php-pdo-sqlite3-example/