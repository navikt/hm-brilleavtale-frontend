```json
{
  "data": {
    "finnArbeidsforholdPrArbeidstaker": {
      "arbeidsforhold": [
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
            "startdato": "2018-01-01",
            "sluttdato": "2018-11-30",
            "sluttaarsak": null,
            "varsling": {
              "kode": "IBARBG",
              "beskrivelse": "Sluttdato satt av NAV. Arbeidsforholdet har ikke blitt bekreftet. Sluttdato er siste dato i kalendermåneden som arbeidsforholdet er bekreftet."
            }
          },
          "ansettelsesdetaljer": [
            {
              "type": "Ordinaer",
              "arbeidstidsordning": {
                "kode": "ikkeSkift",
                "beskrivelse": "Ikke skift"
              },
              "ansettelsesform": null,
              "yrke": {
                "kode": "1210160",
                "beskrivelse": "STYREMEDLEM"
              },
              "antallTimerPrUke": 37.5,
              "avtaltStillingsprosent": 100.0,
              "sisteStillingsprosentendring": "2018-01-01",
              "sisteLoennsendring": "2018-01-01",
              "rapporteringsmaaneder": {
                "fra": "2018-01",
                "til": null
              }
            }
          ],
          "permisjoner": null,
          "permitteringer": null,
          "timerMedTimeloenn": null,
          "utenlandsopphold": null,
          "idHistorikk": [
            {
              "id": "HISTORISK_ARBEIDSFORHOLD_ID"
            }
          ],
          "varsler": [
            {
              "entitet": "Arbeidsforhold",
              "varsling": {
                "kode": "MATCH",
                "beskrivelse": "Arbeidsforholdet er matchet av NAV og har en historikk for arbeidsforhold-id"
              }
            },
            {
              "entitet": "Ansettelsesperiode",
              "varsling": {
                "kode": "IBARBG",
                "beskrivelse": "Sluttdato satt av NAV. Arbeidsforholdet har ikke blitt bekreftet. Sluttdato er siste dato i kalendermåneden som arbeidsforholdet er bekreftet."
              }
            }
          ],
          "rapporteringsordning": {
            "kode": "FOER_A_ORDNINGEN",
            "beskrivelse": "Rapportert før a-ordningen (1978-2014)"
          },
          "uuid": "a1c61883-bfb9-4cc8-a875-398402317da6",
          "opprettet": "2019-02-27T13:02:30.970",
          "sistBekreftet": "2019-03-06T14:56:29",
          "sistEndret": "2019-03-09T18:12:06"
        }
      ]
    }
  }
}
```