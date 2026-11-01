# Ventiler

Intern webbapp för att identifiera en ventil på plats: bläddra bland bilder, tryck på den som liknar ventilen du står vid och se ventilens produktblad (PDF) direkt i appen. Byggd för mobilen, i ren HTML, CSS och JavaScript – inget byggsteg, inga npm-paket.

Publiceras via GitHub Pages: https://maishayrapetian-lab.github.io/Ventiler/

## Så fungerar den

- Startvyn är ett bildgalleri med flikarna **Alla**, **Radiatorventiler** och **Reglerventiler**. Under varje bild står fabrikat och modell.
- Tryck på ett kort så öppnas produktbladet i appen (renderas med PDF.js). Använd knappen **Tillbaka** eller telefonens bakåtgest för att komma tillbaka till galleriet; vald flik behålls.
- Adressen blir `#ventil/<id>`, så en ventil kan länkas direkt.
- PDF.js hämtas från cdnjs (version 3.11.174), så internetuppkoppling krävs för PDF-visningen.

## Struktur

- `index.html` – sidans markup (galleri- och visarvy)
- `style.css` – stilar (ljust/mörkt tema via färgvariabler)
- `app.js` – logik: galleri, flikar, PDF-visare, hash-routing
- `data/ventiler.json` – lista över alla ventiler
- `bilder/` – en bild per ventil
- `produktblad/` – produktblad som PDF
- `docs/BESLUT.md` – beslutslogg

Alla sökvägar är relativa, så appen fungerar under underkatalogen `/Ventiler/` på GitHub Pages.

## Lägga till en ny ventil

1. Lägg bilden i `bilder/` (t.ex. `bilder/ta-tbv-c.jpg`).
2. Lägg produktbladet i `produktblad/` (t.ex. `produktblad/ta-tbv-c.pdf`).
3. Lägg till en post i `data/ventiler.json`:

```json
{
  "id": "ta-tbv-c",
  "kategori": "radiator",
  "fabrikat": "TA",
  "modell": "TBV-C",
  "bild": "bilder/ta-tbv-c.jpg",
  "produktblad": "produktblad/ta-tbv-c.pdf"
}
```

- `id` ska vara unikt och helst bara innehålla små bokstäver, siffror och bindestreck.
- `kategori` är antingen `radiator` eller `regler`.
- Tänk på att allt i repot blir publikt via GitHub Pages.

De fyra befintliga posterna ("Exempel AB", "Provföretaget") är fiktiva platshållare och ersätts med riktiga ventiler.

## Testa lokalt

Att öppna `index.html` direkt (file://) fungerar **inte**, eftersom webbläsaren blockerar `fetch()` av JSON-filen. Starta i stället en lokal server i projektmappen:

```powershell
python -m http.server 8000
```

och öppna http://localhost:8000/. På den här datorn finns Python (`python` och `py`), så kommandot ovan fungerar (alternativt `py -m http.server 8000`). Stoppa servern med Ctrl+C.