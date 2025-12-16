# hm-brilleavtale-frontend

Front-end for inngåelse av avtale om direkte oppgjør av briller til barn for optikebutikker.
Back-end for appen er [hm-brille-api](https://github.com/navikt/hm-brille-api)

Koden er delt i to separate moduler:

- `server` – Go-backend
- `client` – React-frontend


## Om Appen

Appen krever at bruker er innlogget via ID-Porten. 

Innlogget person får opp en liste av alle bedrifter vedkommende har rettigheten "Avtale om direkte oppgjør av briller for barn" 
for i Altinn. I utgangspunktet gjelder dette daglig leder, men den kan delegeres til andre. 

Bedrifter må også tilhøre enn gitt kategori som har med briller å gjøre:
- Butikkhandel med optiske artikler
- Butikkhandel med gull og sølvvarer
- Butikkhandel med ur og klokker
- Butikkhandel med helsekost
- Andre helsetjenester
- Engroshandel med optiske artikler
- Spesialisert legetjeneste unntatt psykiatrisk legetjeneste

Innlogget person registrerer også hvilket kontonummer evt. utbetalinger skal gå til 
og en e-postadresse som kan kontaktes ved spørsmål.

## Kom i gang

### Forutsetninger

- Node ≥ 20
- Go (for serveren)

### PNPM

Prosjektet bruker **pnpm** som pakkehåndterer. Hvis du:

- aldri har brukt pnpm før, eller
- har klonet repoet tidligere da det brukte npm

gjør følgende først:

```bash
corepack enable
```

Deretter, én gang etter at du har hentet ned pnpm-endringene:

```bash
# i prosjektroten
rm -rf node_modules package-lock.json
pnpm install

# i client
cd client
rm -rf node_modules package-lock.json
pnpm install
```

Etter dette holder det med:

- `pnpm install` i rot når du får nye root-avhengigheter
- `cd client && pnpm install` når `client/package.json` endrer seg

### Client

For å kjøre frontend lokalt:

```bash
cd client
pnpm run dev
```

MSW brukes da for å interecepte request-er til API-et.

### Server

Installer Go:

```bash
brew install go
```

Legg til støtte for Go i Visual Studio Code [https://marketplace.visualstudio.com/items?itemName=golang.Go](https://marketplace.visualstudio.com/items?itemName=golang.Go).