sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
server->>browser: redirect /exampleapp/notes
deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server->>browser: html-dokumentti hakemistosta /notes
deactivate server

Note right of browser: Tästä eteenpäin css-, javascript-, ja json-tiedostojen nouto tapahtuu täsmälleen samoin kuin mallikaaviossa.
