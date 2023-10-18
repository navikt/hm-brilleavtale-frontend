# Guide for publisering til github

## Fra Visual Studio (Code) / Intellij / o.l

Spør en venn om hjelp :)

---


## Fra terminalen:

### Steg 1: 
Hent branchen med dokumentasjonen.
```
git checkout develop
```

Dersom du nå skriver:
```
git status
```
Skal du få:
```
On branch develop
```

### Steg 2:
Hent siste versjon av branchen
```
git pull
```

### Steg 3:
Utfør endringene

### Steg 4:
Lagre endringene
```
git commit -am "FORNUFTIG BESKRIVELSE"
```

### Steg 5:
Last opp endringene
```
git push
```

---

## Opprette nye sider

La oss si at vi vil opprette et menyvalg for oppskrifter i navigasjonen.

1. Vi starter med å opprette mappen `oppskrifter` under `docs` -> `docs/oppskrifter`
2. Lag fila `index.md` under `docs/oppskrifter`
3. Legg inn følgende i toppen av `index.md`:
```
---
layout: page
title: Oppskrifter
nav_order: 3
has_children: true
---
```

- La `layout` til `page`
- `title` er Overskriften som dukker opp i sidemenyen
- `nav_order` er rekkefølgen i sidemenyen
- `has_children` settes til `true` dersom den har undersider, settes til `false` eller fjernes dersom ikke.

4. Skriv en liten introduksjon om oppskrifter
5. opprett dokumentet `cupcakes.md` under `docs/oppskrifter`
6. legg følgende i toppen av `cupcakes.md`:
```
---
layout: page
title: Cupcakes
parent: Oppskrifter
nav_order: 1
---
```

7. Skriv noe relevant om cupcakes.
8. opprett dokumentet `kaker.md` under `docs/oppskrifter`
9. legg følgende i toppen av `kaker.md`:
```
---
layout: page
title: Kaker
parent: Oppskrifter
nav_order: 2
has_children: true
---
```

10. Skriv noe relevant om kaker.

11. Opprett fila `sjokoladekake.md` under `docs/oppskrifter`
12. Skriv følgende i toppen av fila:
```
---
layout: page
title: Sjokoladekake
nav_order: 1
parent: Kaker
grand_parent: Oppskrifter
---
```

13. Skriv noe relevant om sjokoladekake

**Resultat:**

Når siden publiseres vil sidemenyen ha et valg som heter `Oppskrifter`, med undersidene `Kaker` og `Cupcakes`. `Kaker` vil igjen ha en underside som heter `Sjokoladekake`

---

## Hvordan opprette lenker:
Vanlig nettside:
```
[NAV](https://www.nav.no/)
```

=> [NAV](https://www.nav.no/)

Til et annet dokument:
```
[Mitt dokument](sti/til/dokumentet/mitt_dokument.md)
```

=> [Mitt dokument](sti/til/dokumentet/mitt_dokument.md)

Eksempelvis dersom du har fila ```/docs/mitt_dokument1.md``` og skal lenge til ```/docs/arbeidsdokumenter/mitt_dokument_2.md```
```
[Mitt dokument 2](arbeidsdokumenter/mitt_dokument_2.md)
```

=> [Mitt dokument 2](arbeidsdokumenter/mitt_dokument_2.md)

Merk at du ikke kan navigere bakover, mao kan du ikke lenke til ```docs/mitt_dokument_1.md``` fra ```docs/arbeidsdokumenter/mitt_dokument_2.md```:
```
[Mitt dokument](../mitt_dokument.md)
```

=> [Mitt dokument](../mitt_dokument.md)

Dersom du vil publisere filer for nedlasting gjøres det på følgende måte:

1. Last opp fila du vil tilgjengeliggjøre i mappen ```/docs/filer```

Eksempel:
- Legger fila ```kakeoppskrifter.txt``` i mappen ```/docs/filer```
- Fila vil da bli tilgjengelig fra denne adressen: ```https://navikt.github.io/aareg/files/kakeoppskrifter.txt```
- For å lage en klikkbar lenke til denne fila skriver du følgende:
```
Kakeoppskrifter er tilgengelig for nedlasting [her](https://navikt.github.io/aareg/files/kakeoppskrifter.txt).
```
=> Kakeoppskrifter er tilgengelig for nedlasting [her](https://navikt.github.io/aareg/files/kakeoppskrifter.txt).


## Publisere nyheter og varsler
Alle filer som legges i ```docs/_posts/``` vil bli publisert til rss feed og på siden som genereres av ```docs/om_tjenestene/nyheter_og_varlser.md```

Det ligger 2 eksempler på der, en for nyhet og en for driftsvarsel. Disse blir ikke publisert da filnavnet starter med `_`

Korrekt format for navn på fila er:
`yyyy-mm-dd-BESKRIVELSE.md`

I toppen av fila må det stå følgende:
```
---
layout:     post
title:      "TITTEL PÅ NYHET/VARSEL"
date:       yyyy-mm-dd
category:   driftsvarsler
---
```

Merk `category`, denne settes til enten `driftsvarsler` eller `nyheter`.

Hele date feltet publiseres "som det er" i varselet, så om du skriver `2021-06-01 eller i går` vil det stå akkurat det i meldingen.

De som abonerer på varsler vil da få melding et par minutter etter at varselet er publisert på github.


