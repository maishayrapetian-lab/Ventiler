# Domänkunskap – kv-värden och injustering

Målet med appen: på plats identifiera ventilen → få fram produktbladet → läsa av **kv-värdet för varje förinställningsläge** → ställa in ventilen så att den ger rätt kv (rätt flöde). Detta kallas **injustering** av värmesystemet.

## Begrepp

- **kv** – flöde i m³/h genom ventilen vid 1 bar tryckfall (vatten). Ju högre kv, desto mer släpper ventilen igenom.
- **kvs** – kv vid fullt öppen ventil (t.ex. läge N på Danfoss RA-N).
- **Förinställning** – ett läge på ventilen (t.ex. 1–7 + N, eller en skala/nyckelvarv) som stryper till ett visst kv. Varje produktblad har en tabell eller ett diagram: *läge → kv*.
- **P-band (Xp), 2K** – termostatventilers kv anges enligt EN 215 vid Xp = 2K, dvs. ventilen är helt stängd när rummet är 2 °C över börvärdet. Det är normalt det kv-värde man injusterar efter.
- **Injusteringsventil / reglerventil** (t.ex. TA, Ventim 5950) – sitter på stam/retur; ställs in i varv/läge mot ett kv, ofta med mätuttag för att kontrollmäta flödet.

## Formler

Q i m³/h, Δp i bar (1 bar = 100 kPa):

- kv = Q / √Δp
- Q = kv · √Δp
- Δp = (Q / kv)²

Flöde ur effekt: Q [l/h] ≈ P [W] · 0,86 / ΔT [K].
Exempel (Danfoss): 1500 W, ΔT 20 K → 75 l/h = 0,075 m³/h; Δp 0,1 bar → kv = 0,075/√0,1 ≈ 0,24 → läs av förinställning i diagrammet (≈ läge 3).

Riktvärden: tryckfall över radiatorventilen ca 5–10 kPa (0,05–0,1 bar); över ca 30 kPa riskerar ljud.

## Fallgropar

- Samma ventilmodell finns i flera storlekar (DN10/15/20) och utföranden (rak/vinkel, normal-/lågflöde) – kv-tabellen skiljer sig. Rätt rad i produktbladet måste väljas.
- Insatser (t.ex. IMI 4360/4361) kan sitta i olika ventilhus – det är insatsen som bestämmer kv.
- Fjärrgivare/fjärrinställning ger lägre kv vid samma P-band.

## Källor

- Danfoss RA-N/RA-U datablad (kv-definition, EN 215 Xp 2K, räkneexempel): https://assets.danfoss.com/documents/70006/AI081086403162en-010101.pdf
- IMI Hydronic, Handbok 3 (injustering): https://assets.imi-hydronic.com/Complementary%20documents/Sweden/Handbok%203%20se.pdf
- Byggtjänst, *Injustering av värmesystem* (provläsning): https://byggtjanstcms.byggtjanst.se/globalassets/bokhandeln/provlas/injustering-av-varmesystem_6267101.pdf
