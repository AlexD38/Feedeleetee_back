# Feedeleetee

## TODO :

- **rajouter table user pour l'auth !**

- **AUTHENTIF**

  rattacher le user à son client ou l'enttrrepise : fait !
  -sign up fait ! 
  -log in fait ! 
  -**token à implémenter** 

---

### BACK :

- ~~refaire les user stories~~

  - décider des routes à garder ou pas, et lesquelles seront protégées

  - (**fonctions pour update les prix suivant les offres**)

- authMW

- login mw

- routes protégées

---

### FRONT

---

## Définition du projet :

Le user se connecter / créer un compte.


- une fois connecté il peut choisir si il veut devenir client ou créer une entreprise.
Si il crée une **entreprise** :

- le user se voit attribué l'id de l'entreprise et aura accés à son dashboard.
    - *(route : get "home/enterprise/isconnected=true" , authentication.logIn, Controller.checkIfConnected)*
    - sur son dashbord, il peut créer modifier, supprimer etc ...
    - *(route : post "enterprise/:id/appointments", checkIfEnterprise, checkifLogged)*
    - *(route : post "enterprise/:id/offers", checkIfEnterprise, checkifLogged)*
    - *(route : post "enterprise/:id/services", checkIfEnterprise, checkifLogged)*
    -*(route : patch "enterprise/:id/appointments/:id"", checkIfEnterprise, checkifLogged)*
    - *(route : patch "enterprise/:id/offers/:id", checkIfEnterprise, checkifLogged)*
    - *(route : patch "enterprise/:id/services/:id"", checkIfEnterprise, checkifLogged)*
    - *(route : delete "enterprise/:id/appointments/:id", checkIfEnterprise, checkifLogged)*
    - *(route : delete "enterprise/:id/offers/:id"", checkIfEnterprise, checkifLogged)*
    - *(route : delete "enterprise/:id/services/:id"", checkIfEnterprise, checkifLogged)*
    - *(route : get "enterprise/:id/clients", checkIfEnterprise, checkifLogged)*
    - *(route : get "enterprises/:id",)*
    - *(route : get "enterprises/:id",checkIfEnterprise, checkifLogged)*
    - *(route : get "enterprise/:id/offers, checkIfEnterprise, checkifLogged)*
    - *(route : get "enterprise/:id/services, checkIfEnterprise, checkifLogged)*
    - *(route : get "enterprise/:id/appointments", checkIfEnterprise, checkifLogged)*
- n'a pas de droit sur les clients. seulement la lecture, et il peut voir ses rendez-vous avec le client qui l'a pris, pour pouvoir acceder à son tel son mail et son nom afin de le contacter.
- l'entreprise peut modifier, ses rendez vous :
    - la date,
    - l'heure,
    - la durée,
    - supprimer ou ajouter le client id du rdv.

Si il choisi **client** :

- doit définir sonnom, pseudo, nom de famille, mail et tel
    -*(route : get "enterprises", checkIfCLient,checkifLogged)*
    - *(route : get "enterprises/:id"), checkIfCLient,checkifLogged*
    - *(route : get "enterprises/:id/appointments/:id", checkIfCLient,checkifLogged)*
    - *(route : get "enterprises/:id/appointments",, checkIfCLient,checkifLogged)*
    - *(route : get "enterprises/:id/appointments",checkIfCLient,checkifLogged)*
    - *(route : get "enterprises/:id/offers", checkIfCLient,checkifLogged)*
    - *(route : get "enterprises/:id/services", checkIfCLient,checkifLogged)*
    - *(route : patch "enterprises/:id/appointments/:id", checkIfCLient,checkifLogged, checkIfAppointmentIsAvailable)*


- peut voir les entreprises inscrites
- clique dessus et peut voir ses services, ses offres et ses rdv
- peut cliquer sur une date pour prendre rdv, confirmation par mail.
  - Si le rdv n'a pas de client_id, le client peut clqiuer dessus pour y inseérer son client_id afin que le rdv soit pris
