# Ventiler – instruktioner för Claude

## Arbetssätt (gäller alltid i detta repo)

1. **Huvudmodellen skriver ingen kod själv.** All kod skrivs av subagenter på enklare modeller:
   - `haiku` – små, mekaniska ändringar (textbyten, enkla stilar, filflyttar).
   - `sonnet` – nya funktioner, layout/design, logik, felsökning.
   Huvudmodellen planerar, skriver tydliga uppdrag till agenterna, granskar resultatet och håller dokumentationen uppdaterad.
2. **Intervju, en fråga i taget.** Nya delar av sidan tas fram genom att fråga användaren en fråga åt gången (på svenska) innan något byggs.
3. **Dokumentera besluten.** Varje beslut förs in i [docs/BESLUT.md](docs/BESLUT.md) direkt efter att det fattats. Läs den filen först i varje ny session.

## Teknik

- Ren HTML, CSS och JavaScript, inget byggsteg (se BESLUT.md för ändringar).
- `git` finns inte i PATH – använd GitHub Desktops git:
  `%LOCALAPPDATA%\GitHubDesktop\app-*\resources\app\git\cmd\git.exe`
- Remote: https://github.com/maishayrapetian-lab/Ventiler.git, gren `main`.
