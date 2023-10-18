---
layout: page
title: API
nav_order: 2
parent: Integrasjon
grand_parent: Tjenester
---

# API
{:.no_toc}

API utviklet for å gi maskinell tilgang til informasjon i AA-registeret.

1. TOC 
{:toc}

# Hvordan bruke APIet

APIet er tilgjengelig via NAV sin API-portal:

[NAV API Portal - Prod](https://api-portal.nav.no/docs/services/nav-aareg-v1-arbeidsforhold)

Testmiljø med syntetiske data (_"preprod"_) er også tilgjengelig:

[NAV API Portal - Preprod](https://api-portal-preprod.nav.no/docs/services/nav-aareg-v1-arbeidsforhold)

**MERK:** _preprod_ er et test- og utviklingsmiljø og det kan forekomme nedetid eller ustabilitet.

## Hvordan få tilgang

1. Din virksomhet må **søke om tilgang til Aa-registeret**. [Les mer om dette på nav.no sine sider](https://www.nav.no/no/nav-og-samfunn/samarbeid/tilgang-til-arbeidsgiver-og-arbeidstakerregisteret-aa-registeret).
2. API-brukere (utviklere) må **abonnere på Aareg sine tjenester i API-portalen**. [Les mer her](https://navikt.github.io/aareg/om_tjenestene/registrere_seg_i_api_portalen.html). 

Dette gir de nødvendige rettighetene til å
1. opprette et gyldig Maskinporten-token (`Authorization`-headeren)
2. opprette en gyldig API-nøkkel (`Ocp-Apim-Subscription-Key`-headeren).

Les mer om bruk av Maskinporten generelt [her](https://www.digdir.no/digitale-felleslosninger/maskinporten/869).

Hvis man skal bruke APIet på vegne av en annen virksomhet (delegert tilgang), må rettigheter innvilges i Altinn. [Les mer om hvordan man gir tilgang via Altinn her](https://navikt.github.io/aareg/om_tjenestene/delegere_api_tilgang.html).

Maskinporten-scope som brukes for dette APIet er: `nav:aareg/v1/arbeidsforhold`

## Testdata

Testdata fra Aa-registeret kan nå søkes opp i Tenor. Les mer om Tenor på Skatteetatens github-sider [her](https://skatteetaten.github.io/datasamarbeid-api-dokumentasjon/data_testdatasok.html)

Teestdata som også er tilgjengelig, men som ikke er basert på syntetisk Folkeregister og Enhetsregister:

|Opplysningspliktig|Arbeidsgiver|Arbeidstakere|Beskrivelse|
:----|:----|:----|:---------------|
|811010022|911010054|27025700991 <br> 02036101175 <br> 02035700369 <br> 06047100427 <br>  20085802152 <br>  11055600521 <br>  26036900821 <br> 19046501597 <br>  31036300992 <br>  27036901220 <br>  24036901647 <br> 27010100017 |Ordinære og maritime arbeidsforhold <br><br> 10 åpne og 1 avsluttet arbeidsforhold   <br><br> 1 arbeidstaker med adressesperre (27010100017) |


## Skjema

GraphQL-skjema er tilgengelig for nedlasting [her](https://navikt.github.io/aareg/files/aareg-dist-api-v1.graphqls).

Det kan også inspiseres ved bruk av [Introspection](https://navikt.github.io/aareg/appendix/graphql.html#introspection).

MERK: Skjemaet er under arbeid, og det kan forekomme endringer.

## Tjenester

### Ping og helsesjekk

Send et kall med `HttpMethod.OPTIONS` og `authorization` til `/graphql` endepunket.
Forventet resultat er `HttpStatus.OK`

### Arbeidsforhold

Tjeneste for å hente en liste med arbeidsforholdsinformasjon for angitt arbeidstaker og/eller arbeidssted og/eller opplysningspliktig.

#### Spørring (komplett)
{:.no_toc}

{% include_relative eksempler/query/finnArbeidsforhold.md %}

MERK:

- Minst 1 id må være angitt, dvs. arbeidstakerId og/eller arbeidsstedId og/eller opplysningspliktigId
- Det må oppgis minst 1 verdi for følgende filterparametere:
    - arbeidsforholdtype: [_ordinaertArbeidsforhold_, _maritimtArbeidsforhold_, _frilanserOppdragstakerHonorarPersonerMm_, _forenkletOppgjoersordning_]
    - rapporteringsordning: [_A_ORDNINGEN_, _FOER_A_ORDNINGEN_]
    - arbeidsforholdstatus: [_AKTIV_, _FREMTIDIG_, _AVSLUTTET_]
- JSON støtter ikke en streng over flere linjer og _query_- må derfor ligge på 1 linje.

#### Eksempler (spørring)
{:.no_toc}

##### Eksempel #1
{:.no_toc}

- Alle ordinære arbeidsforhold som er rapportert via A-Ordningen med alle dataelementer og arbeidsforholdstatuser for gitt arbeidstaker og arbeidssted og opplysningspliktig

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { id uuid type { kode beskrivelse } arbeidstaker { ident } arbeidssted { type ident } opplysningspliktig { type ident } ansettelsesperiode { startdato sluttdato sluttaarsak { kode beskrivelse } varsling { kode beskrivelse } } ansettelsesdetaljer { type arbeidstidsordning { kode beskrivelse } ansettelsesform { kode beskrivelse } yrke { kode beskrivelse } ... on MaritimAnsettelsesdetaljer { fartsomraade { kode beskrivelse } skipsregister { kode beskrivelse } fartoeystype { kode beskrivelse } } antallTimerPrUke avtaltStillingsprosent sisteStillingsprosentendring sisteLoennsendring rapporteringsmaaneder { fra til } } permisjoner { id type { kode beskrivelse } startdato sluttdato prosent varsling { kode beskrivelse } } permitteringer { id type { kode beskrivelse } startdato sluttdato prosent varsling { kode beskrivelse } } timerMedTimeloenn { antall startdato sluttdato rapporteringsmaaned } utenlandsopphold { land { kode beskrivelse } startdato sluttdato rapporteringsmaaned } idHistorikk { id } varsler { entitet varsling { kode beskrivelse } } rapporteringsordning { kode beskrivelse } opprettet sistBekreftet sistEndret } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "opplysningspliktigId": "987654321",
      "arbeidsstedId": "876543210",
      "arbeidstakerId": "31120154321",
      "arbeidsforholdtype": [
        "ordinaertArbeidsforhold"
      ],
      "rapporteringsordning": [
        "A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AKTIV",
        "FREMTIDIG",
        "AVSLUTTET"
      ],
      "ansettelsesdetaljerhistorikk": false
    }
  }
}
```

Respons:

- ordinært arbeidsforhold
- ansettelsesperiode uten varsling
- ansettelsesdetaljer (1)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (0)
- utenlandsopphold (0)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-1.md %}

##### Eksempel #2
{:.no_toc}

- Alle aktive og avsluttede ordinære og maritime arbeidsforhold som er rapportert via A-Ordningen med startdato, sluttdato og evt. sluttårsak eller varsling for gitt arbeidstaker

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { id uuid type { kode beskrivelse } arbeidssted { type ident } opplysningspliktig { type ident } ansettelsesperiode { startdato sluttdato sluttaarsak { kode beskrivelse } varsling { kode beskrivelse } } } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "arbeidstakerId": "31120154321",
      "arbeidsforholdtype": [
        "ordinaertArbeidsforhold",
        "maritimtArbeidsforhold"
      ],
      "rapporteringsordning": [
        "A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AKTIV",
        "AVSLUTTET"
      ],
      "ansettelsesdetaljerhistorikk": false
    }
  }
}
```

Respons:

- ordinært arbeidsforhold
- ansettelsesperiode med sluttårsak
- ansettelsesdetaljer (2)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (0)
- utenlandsopphold (0)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-2.md %}

##### Eksempel #3
{:.no_toc}

- Arbeidstakere for aktive ordinære arbeidsforhold som er rapportert via A-Ordningen for gitt arbeidssted og opplysningspliktig

> **NB:** Kan gi duplikater siden en arbeidstaker kan ha flere arbeidsforhold med ulike ansettelsesperioder på gitt arbeidssted og opplysningspliktig

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { arbeidstaker { ident } } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "opplysningspliktigId": "987654321",
      "arbeidsstedId": "876543210",
      "arbeidsforholdtype": [
        "ordinaertArbeidsforhold"
      ],
      "rapporteringsordning": [
        "A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AKTIV"
      ],
      "ansettelsesdetaljerhistorikk": false
    }
  }
}
```

Respons:

- ordinært arbeidsforhold
- ansettelsesperiode uten varsling
- ansettelsesdetaljer (1)
- permisjoner (1)
- permitteringer (1)
- timer-med-timelønn (0)
- utenlandsopphold (0)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-3.md %}

##### Eksempel #4

{:.no_toc}

- Arbeidstakere for avsluttede ordinære arbeidsforhold som er rapportert før A-Ordningen for gitt opplysningspliktig

> **NB:** Kan gi duplikater siden en arbeidstaker kan ha flere arbeidsforhold med ulike ansettelsesperioder på gitt arbeidssted og opplysningspliktig

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { arbeidstaker { ident } } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "opplysningspliktigId": "987654321",
      "arbeidsforholdtype": [
        "ordinaertArbeidsforhold"
      ],
      "rapporteringsordning": [
        "FOER_A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AVSLUTTET"
      ],
      "ansettelsesdetaljerhistorikk": false
    }
  }
}
```

Respons:

- ordinært arbeidsforhold
- ansettelsesperiode med varsling
- ansettelsesdetaljer (1)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (0)
- utenlandsopphold (0)
- arbeidsforhold-id-historikk (1)
- varsler (2)

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-4.md %}

##### Eksempel #5
{:.no_toc}

- Alle ordinære arbeidsforhold som er rapportert via A-Ordningen med historikk på stillingsprosent for gitt arbeidssted

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { id uuid arbeidstaker { ident } opplysningspliktig { type ident } ansettelsesdetaljer { avtaltStillingsprosent rapporteringsmaaneder { fra til } } } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "arbeidsstedId": "876543210",
      "arbeidsforholdtype": [
        "ordinaertArbeidsforhold"
      ],
      "rapporteringsordning": [
        "A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AKTIV",
        "FREMTIDIG",
        "AVSLUTTET"
      ],
      "ansettelsesdetaljerhistorikk": true
    }
  }
}
```

Respons:

- maritimt arbeidsforhold
- ansettelsesperiode uten varsling
- ansettelsesdetaljer (1)
- permisjoner (0)
- permitteringer (0)
- timer-med-timelønn (3)
- utenlandsopphold (2)
- arbeidsforhold-id-historikk (0)
- varsler (0)

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-5.md %}

##### Eksempel #6
{:.no_toc}

- Frilanser arbeidsforhold som er rapportert via A-Ordningen med startdato, sluttdato og evt. sluttårsak eller varsling for gitt arbeidstaker

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { id uuid type { kode beskrivelse } arbeidssted { type ident } opplysningspliktig { type ident } ansettelsesperiode { startdato sluttdato sluttaarsak { kode beskrivelse } varsling { kode beskrivelse } } } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "arbeidstakerId": "31120154321",
      "arbeidsforholdtype": [
        "frilanserOppdragstakerHonorarPersonerMm"
      ],
      "rapporteringsordning": [
        "A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AKTIV",
        "AVSLUTTET"
      ],
      "ansettelsesdetaljerhistorikk": false
    }
  }
}
```

Respons:

- frilanser arbeidsforhold

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-6.md %}

##### Eksempel #7
{:.no_toc}

- Forenklet oppgjørsordning arbeidsforhold som er rapportert via A-Ordningen med startdato, sluttdato og evt. sluttårsak eller varsling for gitt arbeidstaker

Spørring:

```json
{
  "query": "query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) { finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) { arbeidsforhold { id uuid type { kode beskrivelse } arbeidssted { type ident } opplysningspliktig { type ident } ansettelsesperiode { startdato sluttdato sluttaarsak { kode beskrivelse } varsling { kode beskrivelse } } } } }",
  "variables": {
    "finnArbeidsforholdVariabler": {
      "arbeidstakerId": "31120154321",
      "arbeidsforholdtype": [
        "forenkletOppgjoersordning"
      ],
      "rapporteringsordning": [
        "A_ORDNINGEN"
      ],
      "arbeidsforholdstatus": [
        "AKTIV",
        "AVSLUTTET"
      ],
      "ansettelsesdetaljerhistorikk": false
    }
  }
}
```

Respons:

- forenklet oppgjørsordning arbeidsforhold
- opplysningspliktig og arbeidssted er (samme) person

{% include_relative eksempler/response/finnArbeidsforhold-eksempel-7.md %}

## Korrelasjon-id'er

### Forespørsel

Alle forespørsler som blir behandlet i tjenesten får sin egen unike ID (_UUID_) - korrelasjon-id - som blir returnert til konsumenten. Korrelasjon-id'en settes i HTTP-response-header'en (_correlation-id_) for alle
HTTP-response 200 OK (inkl. responser med feil).

Hvis ønskelig kan konsumenter benytte sin egen korrelasjon-id ved å spesifisere _correlation-id_ i HTTP-request-header'en. Konsumenter står fritt til å sende inn hva de vil, men vi anbefaler at det genereres en unik
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

| Feilkode | Forklaring | Klassifisering |
|:----|:----|:----|
| AA-000 | Det oppsto en feil under behandlingen av forespøselen | ExecutionAborted
| AA-001 | Spørringen inneholder ugyldige variabler/verdier, eller er på et ugyldig format | ValidationError
| AA-002 | Arbeidsforholdet er ikke komplett. Ta kontakt med brukerstøtte, og bruk korrelasjons-id som referanse | ExecutionAborted
| AA-200 | Spørring må inneholde minst 1 av variablene opplysningspliktigId, arbeidsstedId og arbeidstakerId | ValidationError
| AA-201 | Spørring må inneholde minst 1 verdi for arbeidsforholdtype | ValidationError
| AA-202 | Spørring må inneholde minst 1 verdi for rapporteringsordning | ValidationError
| AA-203 | Spørring må inneholde minst 1 verdi for arbeidsforholdstatus | ValidationError
| AA-204 | Validering av opplysningspliktigId feilet | ValidationError
| AA-205 | Validering av arbeidsstedId feilet | ValidationError
| AA-206 | Validering av arbeidstakerId feilet | ValidationError
| AA-207 | Validering av arbeidsforholdtype, rapporteringsordning eller arbeidsforholdstatus feilet | ValidationError

### Eksempler (feilmeldinger)

#### AA-000
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-AA-000.md %}

#### AA-001
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-AA-001.md %}

#### AA-002
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-AA-002.md %}

#### AA-200
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-AA-200.md %}

#### AA-204
{:.no_toc}

{% include_relative eksempler/response/errors-eksempel-AA-204.md %}
