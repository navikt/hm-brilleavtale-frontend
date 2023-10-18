---
layout: page
title: OTP-API
nav_order: 2
parent: Integrasjon
grand_parent: Tjenester
---

# OTP-API
{:.no_toc}

API utviklet for å gi pensjonsinnretninger tilgang til informasjon i AA-registeret.

Generell informasjon om onboarding er tilgjengelig her: [DSOP dokumentasjon](https://bitsnorge.github.io/dsop-documentation/dsop_ajourhold_onboarding.html)

1. TOC
{:toc}

## Testdata

Testdata fra Aa-registeret kan nå søkes opp i Tenor. Les mer om Tenor på Skatteetatens github-sider [her](https://skatteetaten.github.io/datasamarbeid-api-dokumentasjon/data_testdatasok.html)

## Miljøer

API'et er tilgjengelig i _preprod_ med syntetiske data og i _prod_ med skarpe data.

MERK: _preprod_ er et test- og utviklingsmiljø og det kan forekomme nedetid eller ustabilitet.

[NAV API Portal - Preprod](https://api-portal-preprod.nav.no/docs/services/nav-aareg-v1-arbeidsforhold-otp)

[NAV API Portal - Prod](https://api-portal.nav.no/docs/services/nav-aareg-v1-arbeidsforhold-otp)

## Skjema

GraphQL-skjema er tilgengelig for nedlasting [her](https://navikt.github.io/aareg/files/aareg-otp-api-v1.graphqls).

Det kan også inspiseres ved bruk av [Introspection](https://navikt.github.io/aareg/appendix/graphql.html#introspection).

## Tilgang

For å benytte API'et må konsumenten være registrert hos [Maskinporten](https://difi.github.io/felleslosninger/maskinporten_overordnet.html).

Maskinporten-scope: ```nav:aareg/v1/arbeidsforhold/otp```

Konsumenten må også registrere seg i NAV sin [API-portal](https://api-portal.nav.no/).

MERK: _preprod_ har en egen [API-portal](https://api-portal-preprod.nav.no/).

Vi sjekker også avtalen i [Tjenestepensjonsavtale API'et](https://skatteetaten.github.io/datasamarbeid-api-dokumentasjon/reference_tjenestepensjonsavtale.html)

Se for øvrig [nav.no](https://www.nav.no/no/nav-og-samfunn/samarbeid/tilgang-til-arbeidsgiver-og-arbeidstakerregisteret-aa-registeret) for søknad om tilgang til AA-registeret.

## Tjenester

### Ping og helsesjekk

Send et kall med `HttpMethod.OPTIONS` og `authorization` til `/graphql` endepunket.

Forventet resultat er `HttpStatus.OK`

### Arbeidsforholdoversikter pr opplysningspliktig

Tjeneste for å hente arbeidsforholdoversikter tilhørende en gitt opplysningspliktig og periode.

Denne returnerer et minimum av opplysninger tilknyttet et arbeidsforhold:

- Arbeidsforholdets ID
- Arbeidstakers ID
- Yrke (gjeldende)
- Hisoriske IDer for arbeidsforholdet
- Når arbeidsforholdet sist ble endret

#### Spørring (request)
{:.no_toc}

{% include_relative eksempler/query/finnArbeidsforholdoversikterPrOpplysningspliktig.md %}

#### Variabler
{:.no_toc}

| Navn | Beskrivelse | Type | Valgfri | Eksempelverdi |
|:----|:----|:----|:----|:----|
|opplysningspliktigId |Organisasjonsnummeret til den opplysningspliktige (hovedenheten)|String |Nei |81549300
|ansattFraMaaned |Angir tidligste dato hvor det foreligger et ansettelsesforhold |String |Nei |2020-01
|ansattTilMaaned |Angir seneste dato hvor det foreligger et ansettelsesforhold |String |Ja |2020-01

#### Eksempel (request: spørring med variabler)
{:.no_toc}

Merk:

- _opplysningspliktigId_ er maskert.
- JSON støtter ikke en streng over flere linjer og _query_ feltet må derfor ligge i en linje.

```json
{
  "query": "query($opplysningspliktigId: ID!, $ansattFraMaaned: String!, $ansattTilMaaned: String) {finnArbeidsforholdoversikterPrOpplysningspliktig(opplysningspliktigId: $opplysningspliktigId, ansattFraMaaned: $ansattFraMaaned, ansattTilMaaned: $ansattTilMaaned){arbeidsforholdoversikter{id arbeidstaker{ident} idHistorikk{id} sistEndret}}}",
  "variables": {
    "opplysningspliktigId": "123456789",
    "ansattFraMaaned": "2020-01",
    "ansattTilMaaned": "2020-02"
  }
}
```

#### Eksempler (response)
{:.no_toc}

##### Eksempel #1
{:.no_toc}

- arbeidstaker (1)
- arbeidsforholdoversikt (2)
- arbeidssted (2) - implisitt

{% include_relative eksempler/response/finnArbeidsforholdoversikterPrOpplysningspliktig-eksempel-1.md %}

##### Eksempel #2
{:.no_toc}

- arbeidstaker (1)
- arbeidsforholdoversikt (2)
- arbeidssted (1) - implisitt
- ansettelsesperiode (2, ikke-overlappende) - implisitt

{% include_relative eksempler/response/finnArbeidsforholdoversikterPrOpplysningspliktig-eksempel-2.md %}

---

### Arbeidsforhold pr Arbeidstaker

Tjeneste for å hente detaljer for arbeidsforholdene til en gitt arbeidstaker, opplysningspliktig og periode.

#### Spørring (request)
{:.no_toc}

{% include_relative eksempler/query/finnArbeidsforholdPrArbeidstaker.md %}

#### Eksempler (response)
{:.no_toc}

##### Eksempel #1
{:.no_toc}

- ordinært arbeidsforhold
- ansettelsesperiode uten varsling
- ansettelsesdetaljer (1)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (0)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforholdPrArbeidstaker-eksempel-1.md %}

##### Eksempel #2
{:.no_toc}

- ordinært arbeidsforhold
- ansettelsesperiode med sluttårsak
- ansettelsesdetaljer (2)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (0)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforholdPrArbeidstaker-eksempel-2.md %}

##### Eksempel #3
{:.no_toc}

- ordinært arbeidsforhold
- ansettelsesperiode uten varsling
- ansettelsesdetaljer (1)
- permisjoner (1)
- permitteringer (1)
- timer-med-timelønn (0)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforholdPrArbeidstaker-eksempel-3.md %}

##### Eksempel #4
{:.no_toc}

- ordinært arbeidsforhold
- ansettelsesperiode med varsling
- ansettelsesdetaljer (1)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (0)
- arbeidsforhold-id-historikk (1)
- varsler (2)

{% include_relative eksempler/response/finnArbeidsforholdPrArbeidstaker-eksempel-4.md %}

##### Eksempel #5
{:.no_toc}

- maritimt arbeidsforhold
- ansettelsesperiode uten varsling
- ansettelsesdetaljer (1)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (3)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforholdPrArbeidstaker-eksempel-5.md %}

---

### Ubehandlede arbeidstakere pr opplysningspliktig

Tjeneste for å hente ubehandlede arbeidstakere for en gitt opplysningspliktig og innrapporteringsperiode.

#### Spørring (request)
{:.no_toc}

{% include_relative eksempler/query/finnUbehandledeArbeidstakerePrOpplysningspliktig.md %}

#### Eksempler (response)
{:.no_toc}

##### Eksempel #1
{:.no_toc}

- Arbeidstaker(e) med ubehandlede arbeidsforhold (1)
- Rapporteringsmåneder med innapporteringsavvik (1)
- Rapporteringsmåneder med behandlingsfeil (1)

{% include_relative eksempler/response/finnUbehandledeArbeidstakerePrOpplysningspliktig-eksempel.md %}

---

### Ubehandlede arbeidsforholdinnrapporteringer pr arbeidstaker

Tjeneste for å hente ubehandlede arbeidsforholdinnrapporteringer for en gitt arbeidstaker, opplysningspliktig og innrapporteringsperiode.

#### Spørring (request)
{:.no_toc}

{% include_relative eksempler/query/finnUbehandledeArbeidsforholdPrArbeidstaker.md %}

#### Eksempler (response)
{:.no_toc}

##### Eksempel #1
{:.no_toc}

- Ubehandlede arbeidsforhold pga. innrapporteringsavvik (2)
- Ubehandlede arbeidsforhold pga. behandlingsfeil (1)

{% include_relative eksempler/response/finnUbehandledeArbeidsforholdPrArbeidstaker-eksempel.md %}

## Filtrering

For å ikke utlevere data som er utenfor perioden det spørres på utfører vi filtrering på resultatsettet.

Vi benytter _ansattFraMaaned_ og _ansattTilMaaned_ i GraphQL-spørringen som grunnlag for filtreringen. Egne regler gjelder for filtrering av Ansettelsesdetaljer, se detaljer nedenfor.

Dersom _ansattTilMaaned_ ikke er oppgitt settes denne til nåværende måned.

### Arbeidsforhold

For at et arbeidsforhold skal være en del av resultatsettet må det være overlapp mellom søkeperioden og _ansettelsesperiodens_ start- og sluttdato.

Dersom sluttdato for ansettelsesperioden ikke er satt er arbeidsforholdet aktivt og alle spørringer som har intervall etter ansettelsesperiodens startdato inkluderes.

#### Ansettelsesdetaljer
{:.no_toc}

Et arbeidsforhold kan bestå av en rekke ansettelsesdetaljer.

Eksempelvis vil det legges til nytt objekt dersom stillingsprosenten endres.

Tjenesten returnerer alle ansettelsesdetaljer som er rapportert fra og med  _ansattFraMaaned_. Ansettelseasdetaljer for rapporteringsmåneder forut for  _ansattFraMaaned_ returneres ikke (se eksempel i tabell). 

> Det kan oppstå situasjoner hvor _ansettelsesperioden_ har startdato før rapporteringsmånedenes _fra-dato_. I disse situasjonene returnerer vi de tidligste rapporterte ansettelsesdetaljene.

#### Permisjoner og Permitteringer
{:.no_toc}

Filtreres basert på start- og sluttdato.

Dersom sluttdato er null er permisjonen/permitteringen aktiv og vil inkluderes i alle spørringer som har intervall etter startdato for permisjonen/permitteringen.

#### Timer med timelønn
{:.no_toc}

Siden start- og sluttdato er ikke pålagt å oppgi ved rapportering utføres filtrering basert på rapporteringsmåned.

---

### Eksempler
{:.no_toc}

#### Eksempel 1
{:.no_toc}

##### Datagrunnlag
{:.no_toc}

I AA-registeret har vi registrert følgende opplysninger om et arbeidsforhold:

```json
{
  "id": "ARBEIDSFORHOLD_ID",
  "type": {
    "kode": "ordinaertArbeidsforhold",
    "beskrivelse": "Ordinært arbeidsforhold"
  },
  "arbeidstaker": {
    "ident": "ARBEIDSTAKER_FNR"
  },
  "arbeidssted": {
    "type": "Underenhet",
    "ident": "UNDERENHET_ORG_NR"
  },
  "opplysningspliktig": {
    "type": "Hovedenhet",
    "ident": "HOVEDENHET_ORG_NR"
  },
  "ansettelsesperiode": {
    "startdato": "2019-11-01",
    "sluttdato": null,
    "sluttaarsak": null,
    "varsling": null
  },
  "ansettelsesdetaljer": [
    {
      "type": "Ordinaer",
      "arbeidstidsordning": {
        "kode": "ikkeSkift",
        "beskrivelse": "Ikke skift"
      },
      "ansettelsesform": {
        "kode": "fast",
        "beskrivelse": "Fast ansettelse"
      },
      "yrke": {
        "kode": "1228103",
        "beskrivelse": "SJEFSYKEPLEIER"
      },
      "antallTimerPrUke": 37.5,
      "avtaltStillingsprosent": 100.0,
      "sisteStillingsprosentendring": "2020-01-01",
      "sisteLoennsendring": "2019-11-01",
      "rapporteringsmaaneder": {
        "fra": "2020-02",
        "til": null
      }
    },
    {
      "type": "Ordinaer",
      "arbeidstidsordning": {
        "kode": "ikkeSkift",
        "beskrivelse": "Ikke skift"
      },
      "ansettelsesform": {
        "kode": "fast",
        "beskrivelse": "Fast ansettelse"
      },
      "yrke": {
        "kode": "1228103",
        "beskrivelse": "SJEFSYKEPLEIER"
      },
      "antallTimerPrUke": 37.5,
      "avtaltStillingsprosent": 50.0,
      "sisteStillingsprosentendring": null,
      "sisteLoennsendring": "2019-11-01",
      "rapporteringsmaaneder": {
        "fra": "2019-11",
        "til": "2020-01"
      }
    }
  ],
  "permisjoner": [
    {
      "id": "PERMISJON_ID",
      "type": {
        "kode": "permisjonMedForeldrepenger",
        "beskrivelse": "Permisjon med foreldrepenger"
      },
      "startdato": "2020-01-20",
      "sluttdato": "2020-01-31",
      "prosent": 100.0,
      "varsling": null
    },
    {
      "id": "PERMISJON_ID",
      "type": {
        "kode": "velferdspermisjon",
        "beskrivelse": "Velferdspermisjon"
      },
      "startdato": "2020-02-20",
      "sluttdato": "2020-03-01",
      "prosent": 100.0,
      "varsling": null
    }
  ],
  "permitteringer": [
    {
      "id": "PERMITTERING_ID",
      "type": {
        "kode": "permittering",
        "beskrivelse": "Permittering"
      },
      "startdato": "2020-03-15",
      "sluttdato": null,
      "prosent": 100.0,
      "varsling": null
    }
  ],
  "timerMedTimeloenn": [
    {
      "antall": 35.0,
      "startdato": null,
      "sluttdato": null,
      "rapporteringsmaaned": "2019-11"
    },
    {
      "antall": 40.0,
      "startdato": null,
      "sluttdato": null,
      "rapporteringsmaaned": "2019-12"
    }
  ],
  "idHistorikk": [],
  "varsler": [],
  "opprettet": "2019-11-16T16:21:27.213",
  "sistBekreftet": "2020-09-22T16:22",
  "sistEndret": "2020-04-02T16:34:58"
}
```

For å enklere illustrere eksemplene viser tabellen under elementene som inngår i arbeidsforholdet.

|Objekt |Startdato |Sluttdato |Rapporteringsmåned |Rapportert-fra |Rapportert-til
|:----|:----|:----|:----|:----|:----|
|Ansettelsesperiode|01.11.2019|null|-|-|-
|Ansettelsesdetaljer (1)|-|-|-|2019-11|2020-01
|Ansettelsesdetaljer (2)|-|-|-|2020-02|null
|Permisjon (1)|10.01.2020|20.01.2020|-|-|-
|Permisjon (2)|20.02.2020|01.03.2020|-|-|-
|Permittering (1)|15.03.2020|null|-|-|-
|Timer-med-timelønn (1)|null|null|2019-11|-|-
|Timer-med-timelønn (2)|null|null|2019-12|-|-

---

##### Scenario 1
{:.no_toc}

###### Formål
{:.no_toc}

Ønsker å hente data fra første måned.

###### Parametre i query
{:.no_toc}

|ansattFraMaaned (yyyy-MM)|ansattTilMaaned (yyyy-MM)
|:----|:----|
|2019-11|2019-11

###### Svar fra tjenesten
{:.no_toc}

|Objekt |Inkluderes |Forklaring
|:----|:----|:----|
|Ansettelsesperiode |Ja |_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er *null* og dermed etter _ansattFraMaaned_
|Ansettelsesdetaljer (1) |Ja |_rapportert-fra_ er lik _ansattTilMaaned_ og _rapportert-til_ er *null* og dermed etter _ansattFraMaaned_
|Ansettelsesdetaljer (2) |Nei |_rapportert-fra_ er etter _ansattTilMaaned_
|Permisjon (1) |Nei |_startdato_ er etter _ansattTilMaaned_
|Permisjon (2) |Nei |_startdato_ er etter _ansattTilMaaned_
|Permittering (1) |Nei |_startdato_ er etter _ansattTilMaaned_
|Timer-med-timelønn (1) |Ja |_rapporteringsmåned_ er lik _ansattTilMaaned_ og _ansattFraMaaned_
|Timer-med-timelønn (2) |Nei |_rapporteringsmåned_ er etter _ansattTilMaaned_

---

##### Scenario 2
{:.no_toc}

###### Formål
{:.no_toc}

Ønsker å hente data fra nåværende måned.

###### Parametre i query
{:.no_toc}

|ansattFraMaaned |ansattTilMaaned
|:----|:----|
|2020-10|2020-10

###### Svar fra tjenesten
{:.no_toc}

|Objekt |Inkluderes |Forklaring
|:----|:----|:----|
|Ansettelsesperiode|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er *null* og dermed etter _ansattFraMaaned_
|Ansettelsesdetaljer (1)|Nei|_rapportert-til_ er før _ansattFraMaaned_
|Ansettelsesdetaljer (2)|Ja|_rapportert-fra_ er før _ansattFraMaaned_ og _rapportert-til_ er *null* og dermed etter _ansattFraMaaned_
|Permisjon (1)|Nei|_sluttdato_ er før _ansattFraMaaned_
|Permisjon (2)|Nei|_sluttdato_ er før _ansattFraMaaned_
|Permittering (1)|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er *null* og dermed etter _ansattFraMaaned_
|Timer-med-timelønn (1)|Nei|_rapporteringsmåned_ er før _ansattFraMaaned_
|Timer-med-timelønn (2)|Nei|_rapporteringsmåned_ er før _ansattFraMaaned_

---

##### Scenario 3
{:.no_toc}

###### Formål
{:.no_toc}

Ønsker å hente all informasjon etter stillingsprosenten ble endret

> Siden _ansattTilMaaned_ er *null* blir den satt til nåværende måned (2020-10 i dette scenarioet)

###### Parametre i query
{:.no_toc}

|ansattFraMaaned |ansattTilMaaned
|:----|:----|
|2020-01|null

###### Svar fra tjenesten
{:.no_toc}

|Objekt |Inkluderes |Forklaring
|:----|:----|:----|
|Ansettelsesperiode|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er *null* og dermed etter _ansattFraMaaned_
|Ansettelsesdetaljer (1)|Ja|_rapportert-fra_ er før _ansattTilMaaned_ og _rapportert-til_ er lik _ansattFraMaaned_
|Ansettelsesdetaljer (2)|Ja|_rapportert-fra_ er før _ansattTilMaaned_ og _rapportert-til_ er *null* og dermed etter _ansattFraMaaned_
|Permisjon (1)|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er etter _ansattFraMaaned_
|Permisjon (2)|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er etter _ansattFraMaaned_
|Permittering (1)|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er *null* og dermed etter _ansattFraMaaned_
|Timer-med-timelønn (1)|Nei|_rapporteringsmaaned_ er før _ansattFraMaaned_
|Timer-med-timelønn (2)|Nei|_rapporteringsmaaned_ er før _ansattFraMaaned_

---

#### Eksempel 2
{:.no_toc}

##### Datagrunnlag
{:.no_toc}

I AA-registeret har vi registrert følgende opplysninger om et arbeidsforhold:

```json
{
  "id": "ARBEIDSFORHOLD_ID",
  "type": {
    "kode": "ordinaertArbeidsforhold",
    "beskrivelse": "Ordinært arbeidsforhold"
  },
  "arbeidstaker": {
    "ident": "ARBEIDSTAKER_FNR"
  },
  "arbeidssted": {
    "type": "Underenhet",
    "ident": "UNDERENHET_ORG_NR"
  },
  "opplysningspliktig": {
    "type": "Hovedenhet",
    "ident": "HOVEDENHET_ORG_NR"
  },
  "ansettelsesperiode": {
    "startdato": "2016-08-01",
    "sluttdato": "2016-10-31",
    "sluttaarsak": null,
    "varsling": null
  },
  "ansettelsesdetaljer": [
    {
      "type": "Ordinaer",
      "arbeidstidsordning": {
        "kode": "ikkeSkift",
        "beskrivelse": "Ikke skift"
      },
      "ansettelsesform": {
        "kode": "fast",
        "beskrivelse": "Fast ansettelse"
      },
      "yrke": {
        "kode": "1228103",
        "beskrivelse": "SJEFSYKEPLEIER"
      },
      "antallTimerPrUke": 37.5,
      "avtaltStillingsprosent": 100.0,
      "sisteStillingsprosentendring": null,
      "sisteLoennsendring": "2016-08-01",
      "rapporteringsmaaneder": {
        "fra": "2016-09",
        "til": null
      }
    }
  ],
  "permisjoner": [],
  "permitteringer": [],
  "timerMedTimeloenn": [
    {
      "antall": 35.0,
      "startdato": "2016-08-01",
      "sluttdato": "2016-08-31",
      "rapporteringsmaaned": "2016-09"
    },
    {
      "antall": 35.0,
      "startdato": "2016-09-01",
      "sluttdato": "2016-09-30",
      "rapporteringsmaaned": "2016-10"
    },
    {
      "antall": 35.0,
      "startdato": "2016-10-01",
      "sluttdato": "2016-10-31",
      "rapporteringsmaaned": "2016-11"
    }
  ],
  "idHistorikk": [],
  "varsler": [],
  "opprettet": "2016-09-06T16:21:27.213",
  "sistBekreftet": "2016-11-02T16:34:58",
  "sistEndret": "2016-11-02T16:34:58"
}
```

For å enklere illustrere eksemplene viser tabellen under elementene som inngår i arbeidsforholdet.

|Objekt |Startdato |Sluttdato |Rapporteringsmåned |Rapportert-fra |Rapportert-til
|:----|:----|:----|:----|:----|:----|
|Ansettelsesperiode|2016-08-01|2016-10-31|-|-|-
|Ansettelsesdetaljer (1)|-|-|-|2016-09|null
|Timer-med-timelønn (1)|2016-08-01|2016-08-31|2016-09|-|-
|Timer-med-timelønn (2)|2016-09-01|2016-09-30|2016-10|-|-
|Timer-med-timelønn (3)|2016-10-01|2016-10-31|2016-11|-|-

---

##### Scenario 1
{:.no_toc}

###### Formål
{:.no_toc}

Ønsker å hente data fra første måned.

###### Parametre i query
{:.no_toc}

|ansattFraMaaned (yyyy-MM)|ansattTilMaaned (yyyy-MM)
|:----|:----|
|2016-08|2016-08

###### Svar fra tjenesten
{:.no_toc}

|Objekt |Inkluderes |Forklaring
|:----|:----|:----|
|Ansettelsesperiode|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er etter _ansattFraMaaned_
|Ansettelsesdetaljer (1)|Ja|**UNNTAK:**<br>_rapportert-fra_ er etter _ansattTilMaaned_, og resulterer i ingen overlapp. Siden dette resulterer i ingen ansettelsesdetaljer så returnerer vi første rapporterte ansettelsesdetaljer.
|Timer-med-timelønn (1)|Nei|_rapporteringsmåned_ er etter _ansattTilMaaned_<br>*NB*: Selv om _start-_ og _sluttdato_ for timene er innenfor søkeperioden baserer ikke filtreringen seg på disse.
|Timer-med-timelønn (2)|Nei|_rapporteringsmåned_ er etter _ansattTilMaaned_
|Timer-med-timelønn (3)|Nei|_rapporteringsmåned_ er etter _ansattTilMaaned_

---

#### Eksempel 3
{:.no_toc}

##### Datagrunnlag
{:.no_toc}

I AA-registeret har vi registrert følgende opplysninger om et arbeidsforhold:

```json
{
  "id": "ARBEIDSFORHOLD_ID",
  "type": {
    "kode": "ordinaertArbeidsforhold",
    "beskrivelse": "Ordinært arbeidsforhold"
  },
  "arbeidstaker": {
    "ident": "ARBEIDSTAKER_FNR"
  },
  "arbeidssted": {
    "type": "Underenhet",
    "ident": "UNDERENHET_ORG_NR"
  },
  "opplysningspliktig": {
    "type": "Hovedenhet",
    "ident": "HOVEDENHET_ORG_NR"
  },
  "ansettelsesperiode": {
    "startdato": "2016-08-01",
    "sluttdato": "2016-10-31",
    "sluttaarsak": null,
    "varsling": null
  },
  "ansettelsesdetaljer": [
    {
      "type": "Ordinaer",
      "arbeidstidsordning": {
        "kode": "ikkeSkift",
        "beskrivelse": "Ikke skift"
      },
      "ansettelsesform": {
        "kode": "fast",
        "beskrivelse": "Fast ansettelse"
      },
      "yrke": {
        "kode": "1228103",
        "beskrivelse": "SJEFSYKEPLEIER"
      },
      "antallTimerPrUke": 37.5,
      "avtaltStillingsprosent": 100.0,
      "sisteStillingsprosentendring": null,
      "sisteLoennsendring": "2016-08-01",
      "rapporteringsmaaneder": {
        "fra": "2016-09",
        "til": null
      }
    }
  ],
  "permisjoner": [],
  "permitteringer": [],
  "timerMedTimeloenn": [
    {
      "antall": 35.0,
      "startdato": "2016-08-01",
      "sluttdato": "2016-08-31",
      "rapporteringsmaaned": "2016-09"
    },
    {
      "antall": 35.0,
      "startdato": "2016-09-01",
      "sluttdato": "2016-09-30",
      "rapporteringsmaaned": "2016-10"
    },
    {
      "antall": 35.0,
      "startdato": "2016-10-01",
      "sluttdato": "2016-10-31",
      "rapporteringsmaaned": "2016-11"
    }
  ],
  "idHistorikk": [],
  "varsler": [],
  "opprettet": "2016-09-06T16:21:27.213",
  "sistBekreftet": "2016-11-02T16:34:58",
  "sistEndret": "2016-11-02T16:34:58"
}
```

For å enklere illustrere eksemplene viser tabellen under elementene som inngår i arbeidsforholdet.

|Objekt |Startdato |Sluttdato |Rapporteringsmåned |Rapportert-fra |Rapportert-til
|:----|:----|:----|:----|:----|:----|
|Ansettelsesperiode|2016-08-01|2016-10-31|-|-|-
|Ansettelsesdetaljer (1)|-|-|-|2016-09|null
|Timer-med-timelønn (1)|2016-08-01|2016-08-31|2016-09|-|-
|Timer-med-timelønn (2)|2016-09-01|2016-09-30|2016-10|-|-
|Timer-med-timelønn (3)|2016-10-01|2016-10-31|2016-11|-|-

---

##### Scenario 1
{:.no_toc}

###### Formål
{:.no_toc}

Ønsker å hente data fra første måned.

###### Parametre i query
{:.no_toc}

|ansattFraMaaned (yyyy-MM)|ansattTilMaaned (yyyy-MM)
|:----|:----|
|2016-08|2016-08

###### Svar fra tjenesten
{:.no_toc}

|Objekt |Inkluderes |Forklaring
|:----|:----|:----|
|Ansettelsesperiode|Ja|_startdato_ er før _ansattTilMaaned_ og _sluttdato_ er etter _ansattFraMaaned_
|Ansettelsesdetaljer (1)|Ja|**UNNTAK:**<br>_rapportert-fra_ er etter _ansattTilMaaned_ å resulterer i ingen overlapp. Men siden dette resulterer i ingen ansettelsesdetaljer returnerer vi første rapporterte ansettelsesdetaljer.
|Timer-med-timelønn (1)|Nei|_rapporteringsmåned_ er etter _ansattTilMaaned_<br>*NB*: Selv om _start-_ og _sluttdato_ for timene er innenfor søkeperioden baserer ikke filtreringen seg på disse.
|Timer-med-timelønn (2)|Nei|_rapporteringsmåned_ er etter _ansattTilMaaned_
|Timer-med-timelønn (3)|Nei|_rapporteringsmåned_ er etter _ansattTilMaaned_

---

##### Scenario 2
{:.no_toc}

###### Formål
{:.no_toc}

Ønsker å hente data fra nåværende måned.

###### Parametre i query
{:.no_toc}

|ansattFraMaaned (yyyy-MM)|ansattTilMaaned (yyyy-MM)
|:----|:----|
|2020-10|2020-10

###### Svar fra tjenesten
{:.no_toc}

|Objekt |Inkluderes |Forklaring
|:----|:----|:----|
|Arbeidsforhold|Nei|_sluttdato_ er før _ansattFraMaaned_ og arbeidsforholdet og alle underelementer ekskluderes fra resultatsettet

## Korrelasjon-id'er

### Forespørsel

Alle forespørsler som blir behandlet i tjenesten får sin egen unike ID (_UUID_) - korrelasjon-id - som blir returnert til konsumenten. Korrelasjon-id'en settes i HTTP-response-header'en (_correlation-id_) for alle HTTP-response 200 OK (inkl. responser med feil).

Korrelasjon-id har også vært angitt i response-objektet som en del av _extensions_, men dette er deprekert og vil bli fjernet (etter nærmere avtale med eksisterende konsumenter).

Hvis ønskelig kan konsumenter benytte sin egen korrelasjon-id ved å spesifisere _correlation-id_ i HTTP-request-header'en.

Konsumenter står fritt til å sende inn hva de vil, men vi anbefaler at det genereres en unik
ID (_UUID_).

Ved henvendelser bør korrelasjon-id'en oppgis - det letter behandling av henvendelsen.

### Arbeidsforhold

Alle arbeidsforhold har sin egen unike ID - _uuid_.

Dersom det er behov for å se nærmere på et bestemt arbeidsforhold, enten det er spørsmål om data eller rapportering av feil er det ønskelig at feltet _uuid_ benyttes i kommunikasjonen for å identifisere
arbeidsforholdet.

Denne ID'en returneres dersom konsumenten ber feltet _uuid_ i tjenesten _finnArbeidsforholdPrArbeidstaker_

```json
{
  "data": {
    "finnArbeidsforholdPrArbeidstaker": {
      "arbeidsforhold": [
        {
          "uuid": "unik-arbeidsforhold-uuid"
        }
      ]
    }
  }
}
```

## Feilmeldinger

Spørringer som feiler vil respondere med en 200 HTTP-status og en json-body med en errors-liste, samt et felt som angir typen feil under "classification".

### Feilkoder og forklaring

|Feilkode |Forklaring |Classification|
|:----|:----|:----|
|AA-051 |Ugyldig verdi for "opplysningspliktidId"|ValidationError
|AA-052 |Ugyldig verdi for "arbeidstakerId"|ValidationError
|AA-053 |Ugyldig verdi for "ansattFraMaaned"|ValidationError
|AA-054 |Ugyldig verdi for "ansattTilMaaned"|ValidationError
|AA-055 |"ansattTilMaaned" er før "ansattFraMaaned"|ValidationError
|AA-056 |Ugyldig verdi for "rapporteringFraMaaned"|ValidationError
|AA-057 |Ugyldig verdi for "rapporteringTilMaaned"|ValidationError
|AA-058 |"rapporteringTilMaaned" er før "rapporteringFraMaaned"|ValidationError
|AA-101 |Mangler tilgang for en eller flere perioder |ExecutionAborted
|AA-102 |Ingen tilgang grunnet skjerming |ExecutionAborted
|AA-201 |En ukjent feil oppstod |ExecutionAborted

### Eksempler (feilmeldinger)

#### Tilgang(er) mangler for periode(r)
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-1.md %}

#### Valideringsfeil for variabelverdi(er)
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-2.md %}

#### Valideringsfeil for variabelnavn
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-3.md %}

#### Ingen tilgang grunnet skjerming
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-4.md %}
