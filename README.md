 <a href="https://www.sunlabs.se">    <img src="https://img.shields.io/badge/%20-Developed%20at%20Sun%20Labs-black?labelColor=ffe601&style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGKSURBVHgB7Zi/SgNBEMZnxFpTC4J9BNPaWVpa2VrZi3kAkzc4a4maMjZJaWkndjaCnQHF1j8vsO6czQ63d3uXZGAS5oOB5Hbmu/vtLnPsoftEByugNVgRGYg2GYg2GYg2GYg2GYg2GYg2GYg2GYg2rTdJ/v718fN/oGxtIrQ2YKGaxz8JQuaXVw5u7wCm7+GIg04boLMLcHGOsLMNM2lh/nRmL4teF5yfFZe7JoJyq7yk/aMgX6/oDvbr3SAMP4N5bQpAwj8KcnRYbuaXOI+ycXrAFIiEP8SWO2ae9ZHNBv2+yTB606wPldtJwp+BvD0VC1PbhWooJ6yhfR+rkfRn75GHR8c6B3WK8XV1G4zlUCcajorf/ST9GchwxE163XptlXLOTvm1yX0xT9KfgTy/8MG9NtTWyTGy/9OPYo6kP4bffnGLL5cfgyZK1Uv6sxUJl3mWN3WqXtKfgYwHCL5P5zEZNJutOvWS/mxrLbPsPKJNBqJNBqJNBqJNBqJNBqJNBqJNBqJNBqJNf0F+WMETxwNrAAAAAElFTkSuQmCC"></a>

# Billogram Export

Vi ville exportera våra kunder från Billogram men det finns inte stöd för det i deras programvara eller via deras support. Konstigt. 

Antar att fler har samma problem så here you go!

## Support
- :white_check_mark: Export av kunder
- :white_check_mark: Export av fakturainformation
- :white_check_mark: Export av PDFer


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
7. Din data ligger i `export/`

---

With <3 from Uppsala

