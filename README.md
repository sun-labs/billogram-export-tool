# Billogram Export

För vi fick det här som svar från Billogram när vi ville exporta vår data från Billogram.

```
Vi kan tyvärr inte hjälpa till med att exportera register ur tjänsten via något gränssnitt, utan vill man ta ut sina artiklar och kunder så måste man göra det via vårt öppna API. 

Du hittar dokumentationen här och skulle det vara så att du inte själv har utvecklarkompetens inom företaget så skulle du kunna se om vår samarbetspartner ****** kan hjälpa till med detta. 
```

Vi tror att fler har detta problemet och anlita konsulter för detta känns löjligt.

## Instruktioner

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

