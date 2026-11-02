# Beslutslogg – Ventiler

Varje beslut får ett nummer, datum, vad som bestämdes och varför. Ändras ett beslut senare markeras det gamla som *ersatt av B-nn*.

| # | Datum | Beslut | Motivering |
|---|-------|--------|------------|
| B-01 | 2026-11-01 | Ren HTML/CSS/JS utan byggsteg som startpunkt. | Enkelt att komma igång; kan ändras när kraven är kända. |
| B-02 | 2026-11-01 | Kod skrivs av Sonnet/Haiku-agenter, huvudmodellen orkestrerar och dokumenterar. | Användarens önskemål: lägre kostnad, tydlig rollfördelning. |
| B-03 | 2026-11-01 | Sidan tas fram genom intervju, en fråga i taget; svar loggas här. | Spårbarhet så att framtida sessioner kan fortsätta smidigt. |
| B-04 | 2026-11-01 | Ventiler är en **intern app** för eget/teamets bruk (inte en publik sida). | Svar på fråga 1. |
| B-05 | 2026-11-01 | Kärnfunktion: **visuell identifiering**. Användaren står vid en ventil, bläddrar bland bilder, trycker på den som ser likadan ut och får upp ventilens produktblad. | Svar på fråga 2. Innebär bildgalleri som startvy och mobilanpassning i första hand (används på plats). |
| B-06 | 2026-11-01 | Användaren har redan **produktblad som PDF och bilder** på ventilerna. Appen bygger på dessa egna filer. | Svar på fråga 3. |
| B-07 | 2026-11-01 | Omfång **20–100 ventiler**: ett galleri med enkel indelning i kategorier (t.ex. ventiltyp). Ingen databas behövs; data kan ligga i en JSON-fil. | Svar på fråga 4. |
| B-08 | 2026-11-01 | Två kategorier: **Radiatorventiler** och **Reglerventiler**. | Svar på fråga 5: det finns bara dessa två typer. |
| B-09 | 2026-11-01 | Publiceras via **GitHub Pages** (publik webbadress, nås från mobilen). Bilder och PDF:er läggs i repot och blir därmed publika. | Svar på fråga 6. |
| B-10 | 2026-11-01 | Tryck på bild → **produktbladet visas inbäddat i appen** med tillbaka-knapp. Rendreras med **PDF.js** (via CDN). | Svar på fråga 7. Mobilwebbläsare (särskilt Android Chrome) visar inte PDF i `<iframe>`, därav PDF.js. |
| B-11 | 2026-11-01 | Under varje bild visas **fabrikat + modell** (t.ex. "TA – TBV-C"). | Svar på fråga 8. Hjälper att skilja snarlika ventiler åt. |
| B-12 | 2026-11-01 | Nya ventiler läggs in **av Claude**: användaren lämnar bild + PDF, Claude (via agent) lägger filerna i `bilder/` och `produktblad/` och lägger till en post i `data/ventiler.json`. | Svar på fråga 9. Enklast för användaren. |
| B-13 | 2026-11-01 | Källmaterial: `C:\Users\mais_\OneDrive\ventiler\Radiatorventiler och injusteringsventiler` (bilder i roten, PDF:er i `Produktdatablad\`). Filerna kopieras in i repot, och bilderna konverteras och förminskas för webben (t.ex. TIF → JPG). | Användaren pekade ut mappen. Webbläsare kan inte visa TIF, och flera bilder är 1–6 MB. |
| B-14 | 2026-11-01 | Version 1 (galleri, flikar, PDF.js-visare, hash-routing) byggd av en Sonnet-agent och testad i mobilvy: galleriet visas och PDF:en renderas. | Grundfunktionen fungerar. |
| B-15 | 2026-11-01 | Fliken heter fortsatt **Reglerventiler** (även om källmappen säger "injusteringsventiler"). | Svar på fråga 10. |
| B-16 | 2026-11-01 | **Appens egentliga mål:** hitta kv-värdet för varje förinställningsläge så att ventilen kan injusteras till rätt kv. Domänkunskap samlas i `docs/DOMAN.md`. | Användaren förklarade syftet. |
| B-17 | 2026-11-01 | Ventilvyn visar en **kv-tabell (förinställningsläge → kv) överst** och produktbladet (PDF) under. Ingen kalkylator. kv-tabellerna läggs som data i `data/ventiler.json`. | Svar på fråga 11. |
| B-18 | 2026-11-01 | Utlästa kv-tabeller visas direkt men märks **"Ej granskad – kontrollera mot PDF"** tills användaren godkänt dem (fält `kvGranskad: false/true` per ventil). | Svar på fråga 12. Fel kv ger fel injustering, så status måste synas. |
| B-19 | 2026-11-01 | TA Trim (båda bilderna/bladen) ligger under **Radiatorventiler**. | Svar på fråga 13. |
| B-20 | 2026-11-01 | Även produktblad utan foto tas med, med platshållarbild: **Siemens VD** under Reglerventiler, **Purmo radiatorkatalog (PROD_212_6738700)** under Radiatorventiler. | Svar på fråga 14. Purmo-katalogen kan innehålla kv-data för radiatorer med inbyggd ventil. |
| B-21 | 2026-11-01 | **MMA FV** får en egen post utan produktblad: ventilvyn visar bilderna (en visar kv-skalan) och texten "Produktblad saknas". `produktblad` får alltså vara tomt. | Svar på fråga 15. |
| B-22 | 2026-11-01 | Bilden "Flamingo vit plast runt piggen" kopplas till **FLA V2-bladet**. Det äldre `Flamingo.pdf` (rev 7) blir då utan foto och tas med med platshållarbild, enligt principen i B-20. | Svar på fråga 16; "allt i mappen ska vara med". |
| B-23 | 2026-11-01 | **Ett kort per ventil** i galleriet (huvudbild = första bilden). Övriga bilder visas i ventilvyn. `bild` blir en lista `bilder`. | Svar på fråga 17. |
| B-24 | 2026-11-01 | MMA FV ligger under **Radiatorventiler**. | Svar på fråga 18. |
| B-25 | 2026-11-01 | Datamodell: `data/ventiler.json` (en post per ventil, id enligt `docs/KALLMATERIAL.md`) och `data/kv.json` (kv-tabeller per ventil-id, med `granskad`, `kalla` och en eller flera tabeller läge → kv). Exempelposterna tas bort. `.gitattributes` markerar PDF/bilder som binära. | Håller kv-data (som granskas separat) isär från ventillistan; git på Windows skulle annars kunna ändra radslut i PDF:er. |
| B-26 | 2026-11-02 | Version 2 klar: 19 ventiler importerade (bilder → JPEG ≤1200 px), kv-tabeller utlästa för 18 av 19 (alla `granskad: false`), testad i mobilvy (kv-tabell, varning, lazy PDF). MMA FV saknar kv – skalan på fotot är oläslig; kräver skarpare foto eller produktblad. | Agentrapport; granskningsordning: FLA V2 (diagramvärden), V2000LX (0,016 vs 0,16), IMI 4340 (intervall), TA Trim (kvs-avvikelser). |

## Intervju – frågor och svar

1. **Vad är syftet med webbsidan?** → Intern app (för eget/teamets bruk, t.ex. registrera eller hålla koll på ventiler).
2. **Vad ska appen främst hjälpa till med?** → "Kunna hitta rätt produktblad från att identifiera på plats, sen trycka på bilden med samma ventil för att produktbladet ska dyka upp."
3. **Hur ser materialet ut idag?** → Har PDF:er och bilder.
4. **Hur många ventiler/produktblad?** → 20–100.
5. **Hur dela in galleriet?** → "Det är endast radiatorventiler och reglerventiler."
6. **Hur nås appen på plats?** → GitHub Pages.
7. **Vad händer vid tryck på en bild?** → PDF inbäddad i appen.
8. **Text under bilderna?** → Fabrikat + modell.
9. **Hur läggs nya ventiler till?** → Be Claude.
10. **Namn på andra fliken?** → Reglerventiler.
11. **Hur få fram kv-värdet?** → kv-tabell + PDF (ingen beräkning).
12. **Hur säkra utlästa kv-tabeller?** → Visa direkt, märkta som ogranskade tills godkända.
13. **TA Trim – vilken flik?** → Radiatorventiler.
14. **PDF:er utan bild (Siemens VD, Purmo-katalog)?** → Båda med.
15. **MMA FV utan produktblad?** → Egen post, bara bild.
16. **Flamingo vit – vilket blad?** → FLA V2-bladet.
17. **Flera bilder per ventil?** → Ett kort per ventil, övriga bilder i ventilvyn.
18. **MMA FV – vilken flik?** → Radiatorventiler.
