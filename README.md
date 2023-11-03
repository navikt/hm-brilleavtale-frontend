# hm-brilleavtale-frontend

Front-end for inngåelse av avtale om direkte oppgjør av briller til barn for optikebutikker.
Back-end for appen er [hm-brille-api](https://github.com/navikt/hm-brille-api)

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

## Lokal kjøring

Installer alle avhengigheter:
```bash
$ npm install
```

Kjør app:
```bash
$ npm run dev
```
