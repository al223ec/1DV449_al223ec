<h2>Reflektion</h2>

Vad tror Du vi har för skäl till att spara det skrapade datat i JSON-format?
--------------
För att kunna använda datat till andra applikationer, just json format är också tacksamt för de väldigt många spåk har stödjer att läsa in detta formatet till objekt direkt. Json kan dessutom mer eller mindre läsas av en människa direkt, iaf om det är formaterat på ett bra sätt. 

Olika jämförelsesiter är flitiga användare av webbskrapor. Kan du komma på fler typer av tillämplingar där webbskrapor förekommer?
--------------
Google och andra sökmotorer som försöker indexera information på webben användar flitigt en typ av webbskrapor. 
Sidor som sammanställer data från flera källor.

Hur har du i din skrapning underlättat för serverägaren?
------------------
Försökt begränsa antalet anrop. Jag har också under utvecklingen och testingen försökkt begränsat antalet request jag skickat. För att testa att hitta rätt element på en sida har jag endast skrapat den aktuella sidan. 

Har inte implementerat någon direkt caching, hade inte riktigt tid till detta och som skrapan fungerar nu kontrollerar användaren när ett "skrap" ska genomföras via ett formulär.

Jag har också lagt till möjlighet att begränsa hur många kurser som man vill skrapa ner, dessutom har jag försökt att identifiera mig via mitt anrops header. 


Vilka etiska aspekter bör man fundera kring vid webbskrapning?
------------------
All data kanske inte är tänkt att den ska spridas vidare. Får jag överhuvudtaget skrapa det jag vill skrapa, jag tycker det också är viktigt vad man ska använda den skrapade datan till. 

Allmänt om skrapningspolicies 
Be Accountable - If your actions cause problems, be available to take prompt action in response.
Test Locally - ...and expand the scope gradually before you unleash your crawler on others.
Don't hog resources.
Stay with it - "It's vital to know what your robot is doing, and that it remains under control."

https://www.cs.washington.edu/lab/webcrawler-policy

Vad finns det för risker med applikationer som innefattar automatisk skrapning av webbsidor? Nämn minst ett par stycken!
--------------
Applikationen måste ofta uppdateras för att reflektera förändrig på den sidan man vill skrapa, små förändringar i strukturen kan lätt leda till att man inte hittar den informationen man vill eller att den information som man hittar inte är korrekt. 
Skrapning kan ta tid och göra både applikationen och sidan man skrapar seg, datan bör mellanlagras i en datakälla och skrapningar bör ske vid bestämmda eller efterfrågade intervaller.

Tänk dig att du skulle skrapa en sida gjord i ASP.NET WebForms. Vad för extra problem skulle man kunna få då?
------------------
Främsta problemet bör vara viewstaten. Sen har webforms ofta en väldigt rörig HTML, och det känns som det skulle vara svårt att hatera eventuell postdata som man kanske behöver skicka. 

Välj ut två punkter kring din kod du tycker är värd att diskutera vid redovisningen. Det kan röra val du gjort, tekniska lösningar eller lösningar du inte är riktigt nöjd med.
------------------
Har haft mycket en del problem med webbhotellet, främst att CURLOPT_FOLLOWLOCATION inte kan sättas på mitt hotell. Sen har jag inte möjlighet att ändra inställningar i httpd eller php.ini fil vilket också har försvårat. Sen har den serverinställda timeouten också varit problematisk. 

Hela koden känns skör, en liten förändring i kurshemsidan och skrapan funkar inte överhuvudtaget. Det kryllar av platsberoenden och olika strängberoenden. Jag skulle gärna ha utvecklat skrapan mer och kommit fram till smartare och bättre lösningar på de problem jag ställts inför. Nästan hela koden skulle behöva struktureras om och ett vettigare designmönster implemeteras. 

Hitta ett rättsfall som handlar om webbskrapning. Redogör kort för detta.
------------------
Jag har hittat ett rättsfall där ett företag har skrapat data från en bostadsida till sin egna utan att detta ledde till åtal. Detta enligt EUs databas direktiv(http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:31996L0009:SV:HTML)

Din data i din databas är inte skyddad såvida inte databasen skapare, definerat som den som har tagit initiativet och riskerat investeringar, kan visa att det har skett en betydande finansiell, teknisk eller arbetsmässig investering.

Från källan:
The French Supreme Court has dismissed a claim that an aggregation service that extracted real estate advertisements from websites infringed database right.  This illustrates the narrow scope of database rights after the 2004 decision of the European Court of Justice in BHB v William Hill.

The French Intellectual Property Code (which implements the European Database Directive 96/9/EC) states that:

The producer of a database, understood as the person who takes the initiative and the risk of the corresponding investments, benefits from protection of the contents of the database when its constitution, verification or presentation shows that there has been a substantial financial, technical or human investment.

http://www.twobirds.com/en/news/articles/2009/french-supreme-court-decision-website-scraping-case

Känner du att du lärt dig något av denna uppgift?
------------------
Jag har lärt mig en hel del, hur man praktiskt går till väga för att skrapa en sida. Har också lärt mig en hel del kring http headers och hur man skickar postdata via kod. 
Tidigare har jag inte reflekterat mycket över webbskrapning, men jag upplever det än så länge som ett ganska trubbigt och svårhanterligt verktyg. Öppna api:er är för alla parter betydligt vettigar och lättare att hantera.
