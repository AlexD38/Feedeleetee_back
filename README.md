# Feedeleetee

## TODO :

- **rajouter table user pour l'auth !**

- **AUTHENTIF**
  - sign in mw
  - ~~login mw~~
    <!-- - rajotuer useri_id foreign key dans la table clients pour rendre la vue des rdv du client lors de l'auth -->
    <!-- - rajouter le crud user daans les controllers et les models et routes -->

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

Si il crée une entreprise :

- le user se voit attribué l'id de l'entreprise et aura accés à son dashboard.
  - sur son dashbord, il peut créer modifier, supprimer etc ...
  - n'a pas de droit sur les clients. seulement la lecture, et il peut voir ses rendez-vous avec le client qui l'a pris, pour pouvoir acceder à son tel son mail et son nom afin de le contacter.
  - l'entreprise peut modifier, ses rendez vous :
    - la date,
    - l'heure,
    - la durée,
    - supprimer ou ajouter le client id du rdv.

Si il choisi client :

- doit définir sonnom, pseudo, nom de famille, mail et tel
- peut voir les entreprises inscrites
- clique dessus et peut voir ses services, ses offres et ses rdv
- peut cliquer sur une date pour prendre rdv, confirmation par mail.
  - Si le rdv n'a pas de client_id, le client peut clqiuer dessus pour y inseérer son client_id afin que le rdv soit pris
