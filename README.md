# Billogram Export

Vi ville exportera våra kunder från Billogram men det finns inte stöd för det i deras programvara eller via deras support. Konstigt. 

Antar att fler har samma problem så vi släpper det open source.

## Support
- Export av kunder


## Instruktioner

Se till att senaste LTS-version av Node är installerat.

1. `npm install`
1. Kopiera `.env.sample` och döp om den till `.env` i projektet
2. Navigera in på `Företagsinställning > API` i Billogram
3. Klicka på `Lägg till API-använadare` 
    
    :rotating_light: Vi har bara testat med behörighet `Administratör` men fungerar säkert med andra
4. Tryck Spara och notera ner `API-användare ID` och `Lösenord`.
5. Öppna upp filen `.env` i textredigerare.

    `API_USER` ska fyllas i med `API-användare ID`

    `API_PASSWORD` ska fyllas i med `Lösenord`

    Exempel när ifyllt

    ```env
    API_USER=11111-ABCDEFGh
    API_PASSWORD=0000111122222333334444455556666
    ```
6. Kör programmet med `npm run export`
7. CSV-filen ligger i `export/`

`With <3 from Uppsala`

