# Instructions

Amélioration de wiki-character

- Ajout d'express-session
- Gérer l'authentification (en fichier JSON)
- Séparation des routes
- Mise en place d'une structure `router / controller`

pour l'authentification
- création de compte
    - vérifier que l'utilisateur n'existe pas déjà
    - si pas d'utilisateur avec ce nom permettre la création du compte
- connexion
    - vérifier si un utilisateur existe avec ce nom
    - s'il existe on va comparer le mot de passe
    - si la comparaison est correcte on procède à la mise à jour de la session avec un status de connexion et son nom


## PLUS TARD
- Ajout d'un role aux utilisateurs ( admin ou membre)
- Création d'une page Dashboard (profil) utilisateur (contenu placeholder)
    - uniquement si connecté !

- création d'un back office (page d'administration) et de sa route
    - uniquement disponible pour le role admin
