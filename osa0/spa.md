sequenceDiagram
participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server->>browser: html-dokumentti
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server->>browser: css-tiedosto
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
activate server
server->>browser: spa.js-tiedosto
deactivate server

Note right of browser: spa.js-tiedoston suorittaminen selaimessa aiheuttaa seuraavan pyynnön

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server->>browser: data.json-tiedosto
deactivate server
