sequenceDiagram
participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server
server->>browser: Redirectausta ei tapahdu, vaan sivulle mentäessä ladattu spa.js-koodi lisää uuden muistiinpanon palvelimelle ja piirtää muistiinpanolistan lataamatta sivua uudelleen.
deactivate server
