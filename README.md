# Ventiler

Intern webbapp för att identifiera en ventil på plats: bläddra bland bilder, tryck på den som liknar ventilen du står vid och se ventilens produktblad (PDF) direkt i appen. Byggd för mobilen, i ren HTML, CSS och JavaScript – inget byggsteg, inga npm-paket.

Publiceras via GitHub Pages: https://maishayrapetian-lab.github.io/Ventiler/

## Så fungerar den

- Startvyn är ett bildgalleri med flikarna **Alla**, **Radiatorventiler** och **Reglerventiler**. Under varje bild står fabrikat och modell.
- Tryck på ett kort så öppnas ventilvyn: kv-tabell överst, sedan foton (om fler än ett) och produktbladet (renderas med PDF.js, sida för sida när den kommer nära synfältet). Använd knappen **Tillbaka** eller telefonens bakåtgest för att komma tillbaka till galleriet; vald flik behålls.
- Adressen blir `#ventil/<id>`, så en ventil kan länkas direkt.
- PDF.js hämtas från cdnjs (version 3.11.174), så internetuppkoppling krävs för PDF-visningen.

## Struktur

- `index.html` – sidans markup (galleri- och visarvy)
- `style.css` – stilar (ljust/mörkt tema via färgvariabler)
- `app.js` – logik: galleri, flikar, PDF-visare, hash-routing
- `data/ventiler.json` – lista över alla ventiler
- `data/kv.json` – kv-tabeller per ventil-id (valfri)
- `bilder/` – ventilfoton (JPEG, max 1200 px)
- `produktblad/` – produktblad som PDF
- `docs/BESLUT.md` – beslutslogg

Alla sökvägar är relativa, så appen fungerar under underkatalogen `/Ventiler/` på GitHub Pages.

## Lägga till en ny ventil

1. Konvertera fotona till JPEG, max 1200 px på längsta sidan, kvalitet ca 82, och lägg dem i `bilder/` som `<id>.jpg`, `<id>-2.jpg`, `<id>-3.jpg` ... (första bilden är huvudbild i galleriet). TIF/PNG/GIF ska alltså konverteras och förminskas innan de checkas in.
2. Lägg produktbladet i `produktblad/` (t.ex. `produktblad/<id>.pdf`; flera ventiler får peka på samma PDF).
3. Lägg till en post i `data/ventiler.json` (ordningen i filen är ordningen i galleriet):

```json
{
  "id": "ta-tbv-c",
  "kategori": "radiator",
  "fabrikat": "TA",
  "modell": "TBV-C",
  "bilder": ["bilder/ta-tbv-c.jpg", "bilder/ta-tbv-c-2.jpg"],
  "produktblad": "produktblad/ta-tbv-c.pdf"
}
```

- `id` ska vara unikt och helst bara innehålla små bokstäver, siffror och bindestreck.
- `kategori` är antingen `radiator` eller `regler`.
- `bilder` är en lista och får vara tom (`[]`); då visas en platshållare "Bild saknas".
- `produktblad` får vara `null`; då visas "Produktblad saknas" i ventilvyn.
- Tänk på att allt i repot blir publikt via GitHub Pages.

### kv-tabeller (`data/kv.json`)

kv-värdena per förinställning ligger separat i `data/kv.json`, nycklade på ventilens `id`. Filen är valfri: saknas den, eller saknas ett id, visas "kv-tabell saknas" och appen fungerar som vanligt.

```json
{
  "ta-tbv-c": {
    "granskad": false,
    "kalla": "Produktblad s. 3, tabell kv-värden",
    "notering": "Valfri kommentar",
    "tabeller": [
      {
        "rubrik": "DN15, P-band 2K",
        "kolumner": ["Förinställning", "kv (m³/h)"],
        "rader": [["1", "0,04"], ["2", "0,07"]]
      }
    ]
  }
}
```

- Alla värden är strängar (svenskt decimalkomma). En tabell kan ha fler kolumner (t.ex. flera DN-storlekar); första kolumnen hålls fast vid sidscroll.
- `granskad: false` ger en gul varning "Ej granskad – kontrollera mot produktbladet". Sätt `true` först när värdena kontrollerats mot produktbladet.
- `kalla` och `notering` visas som liten text under tabellerna.
## Testa lokalt

Att öppna `index.html` direkt (file://) fungerar **inte**, eftersom webbläsaren blockerar `fetch()` av JSON-filen. Starta i stället en lokal server i projektmappen:

```powershell
python -m http.server 8000
```

och öppna http://localhost:8000/. På den här datorn finns Python (`python` och `py`), så kommandot ovan fungerar (alternativt `py -m http.server 8000`). Stoppa servern med Ctrl+C.