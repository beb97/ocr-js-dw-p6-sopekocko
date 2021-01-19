# Orinoco #

This is the back end server for Project 5 of the Junior Web Developer path.

### Prerequisites ###

You will need to have Node and `npm` installed locally on your machine.

### Installation ###

Clone this repo. From within the project folder, run `npm install`. You 
can then run the server with `node server`. 
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

### OWASP TOP 10 ###
Source : https://owasp.org/www-project-top-ten

1 Injection. 
    => mongo sanitize
2 Broken Authentication. 
    => JWT
3 Sensitive Data Exposure. 
    => masquage / bcrypt mdp
4 XML External Entities (XXE). 
    => pas de xml
5 Broken Access Control. 
    => !!! risque !!! suppression sauces des autres 
6 Security Misconfiguration. 
    => configuration express de base
7 Cross-Site Scripting (XSS). 
    => helmet
8 Insecure Deserialization. 
    => pas de deserialisation
9 Using Components with Known Vulnerabilities. 
    => npm audit
10 Insufficient Logging & Monitoring. 
    => pas de logs