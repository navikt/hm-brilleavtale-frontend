```graphql
query($finnArbeidsforholdVariabler: FinnArbeidsforholdVariabler) {
    finnArbeidsforhold(finnArbeidsforholdVariabler: $finnArbeidsforholdVariabler) {
        arbeidsforhold {
            id
            type {
                kode
                beskrivelse
            }
            arbeidstaker {
                ident
            }
            arbeidssted {
                type
                ident
            }
            opplysningspliktig {
                type
                ident
            }
            ansettelsesperiode {
                startdato
                sluttdato
                sluttaarsak {
                    kode
                    beskrivelse
                }
                varsling {
                    kode
                    beskrivelse
                }
            }
            ansettelsesdetaljer {
                type
                arbeidstidsordning {
                    kode
                    beskrivelse
                }
                ansettelsesform {
                    kode
                    beskrivelse
                }
                yrke {
                    kode
                    beskrivelse
                }
                ... on MaritimAnsettelsesdetaljer {
                    fartsomraade {
                        kode
                        beskrivelse
                    }
                    skipsregister {
                        kode
                        beskrivelse
                    }
                    fartoeystype {
                        kode
                        beskrivelse
                    }
                }
                antallTimerPrUke
                avtaltStillingsprosent
                sisteStillingsprosentendring
                sisteLoennsendring
                rapporteringsmaaneder {
                    fra
                    til
                }
            }
            permisjoner {
                id
                type {
                    kode
                    beskrivelse
                }
                startdato
                sluttdato
                prosent
                varsling {
                    kode
                    beskrivelse
                }
            }
            permitteringer {
                id
                type {
                    kode
                    beskrivelse
                }
                startdato
                sluttdato
                prosent
                varsling {
                    kode
                    beskrivelse
                }
            }
            timerMedTimeloenn {
                antall
                startdato
                sluttdato
                rapporteringsmaaned
            }
            utenlandsopphold {
                land {
                    kode
                    beskrivelse
                }
                startdato
                sluttdato
                rapporteringsmaaned
            }
            idHistorikk {
                id
            }
            varsler {
                entitet
                varsling {
                    kode
                    beskrivelse
                }
            }
            rapporteringsordning {
                kode
                beskrivelse
            }
            uuid
            opprettet
            sistBekreftet
            sistEndret
        }
    }
}
```