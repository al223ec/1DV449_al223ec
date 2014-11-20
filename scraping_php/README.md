1DV449_al223ec
==============

Webbteknik 2 

<h2>Krav</h2>
<ol>
<li>Scriptet ska vara helt automatiserat och börja sin skrapning på URL:en http://coursepress.lnu.se/kurser</li>
<li>Du ska göra regelbundna commits av din kod och synkronisera denna till GitHub.</li>
<li><p>Informationen som ska skrapas är: </p>

<ul>
<li>Kursens namn</li>
<li>Den URL kurswebbplatsen har</li>
<li>Kurskod</li>
<li>URL till kursplanen</li>
<li>Den inledande texten om varje kurs</li>
<li>Senaste inläggets rubrik, författare samt datum/klockslag för detta inlägg (på formatet YYYY-MM-DD HH:MM)</li>
<li>Finns inte den aktuella informationen på något av fälten ska de ersättat med texten "no information". T.ex. "coursecode" : "no information". </li>
<li>Du ska också låta ditt skript ta reda på viss statistik kring skrapningen genom att att i ditt JSON-dokument inkludera även hur många kurser som skrapats ner samt en timestamp om när senaste skrapningen gjordes (bör användas vid din cachningsstrategi). </li>
</ul></li>
<li><p>All data ska sparas på disk i en fil i korrekt JSON-format som man ska kunna komma åt via en URL efter skrapningen är gjord. Fundera över hur du strukturerar upp din JSON på ett bra sätt! 
Använd jsonlint.org eller lämpligt plugin till din editor för att validera json-strukturen du skapar.</p></li>
<li>Du ska bara skrapa kurser! (dock ej för extrauppgiften) observera att visa sidor hör till ett projekt, ämne, blogg eller t.ex. är coursepress startsida. Hitta ett enkelt sätt att särskilja dem!</li>
<li>Du ska implementera en enklare cachingsstategi som gör att om man anropar sidan som kör ditt script ska bara själva skrapningen göras ifall fem minuter har passerat sedan sista gången. Det ska dock vara enkelt att kicka igång skrapan vid redovisning genom en enkel ändring i koden eller borttagning av JSON-filen.</li>
<li>Din webbskrapas alla HTTP-anrop mot coursepress webbserver ska identifiera dig på lämpligt sätt.</li>
<li>Du ska skriva ner dina reflektioner (se nedan) i ett dokument i md-format som ska vara enkelt åtkommligt från ditt GitHub-repo.</li>
<li>När du anser dig klar med uppgiften gör du en release/tag på GitHub. Döp den liknande L01-v.1.0. Vid eventuella kompletteringar gör du en ny release L01-v.1.1 o.s.v.</li>
</ol>

<h2>Reflektion</h2>

<p>Du ska i ditt repositorie skapa en fil (reflektion_lab1.md) <strong>i <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown-format</a></strong> där du reflekterar över följande saker:</p>

<ol>
<li>Vad tror Du vi har för skäl till att spara det skrapade datat i JSON-format?</li>
<li>Olika jämförelsesiter är flitiga användare av webbskrapor. Kan du komma på fler typer av tillämplingar där webbskrapor förekommer? </li>
<li>Hur har du i din skrapning underlättat för serverägaren?</li>
<li>Vilka etiska aspekter bör man fundera kring vid webbskrapning?</li>
<li>Vad finns det för risker med applikationer som innefattar automatisk skrapning av webbsidor? Nämn minst ett par stycken!</li>
<li>Tänk dig att du skulle skrapa en sida gjord i ASP.NET WebForms. Vad för extra problem skulle man kunna få då?</li>
<li>Välj ut två punkter kring din kod du tycker är värd att diskutera vid redovisningen. Det kan röra val du gjort, tekniska lösningar eller lösningar du inte är riktigt nöjd med.</li>
<li>Hitta ett rättsfall som handlar om webbskrapning. Redogör kort för detta.</li>
<li>Känner du att du lärt dig något av denna uppgift? </li>
</ol>

<h2>Extrauppgifter</h2>

<p>För er som satsar på högre betyg i kursen finns här ett par extra funktioner för din applikation. Du väljer själv hur många du implementerar.</p>

<ol>
<li>Implementera algoritmen för skrapningen via rekursiva anrop.</li>
<li>Skrapa även de andra typer av sidorna (project, subject, blogg, program) och skapa en JSON-fil för varje.</li>
<li>När man är inloggad på coursepress kan man även komma åt "mina kurser" Skrapa även ner dessa i en egen JSON-fil. Det kan kräva att scriptet du skriver måste logga in på coursepress för att komma åt sidan.
<strong>STOR VARNING</strong> Tänk efter hur du gö rmed ditt lösenord. LDet får unde ringa omständigheter spridas genom att t.ex. läggas på GitHub. Om du råkar göra det byt genast lösenordet!</li>
<li>Sortera så att kurserna sparas i bokstavsordning på kursnamn i din JSON-fil.</li>
</ol>

<h2>Redovisning</h2>

<p>Redovisning sker muntligen på de schemalagda redovisningspassen som finns i schemat. Du kommer dock få boka ett redovisningstillfälle. Se kurshemsidan för denna bokningsmöjlighet!</p>
