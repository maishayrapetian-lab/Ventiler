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
