# Application de démonstration — Déploiement & CI/CD

Petite application volontairement imparfaite utilisée comme support pédagogique.

Elle contient :

- un frontend Angular ;
- un backend Node.js / Express ;
- un faux système de connexion ;
- une "base de données" sous forme de fichier JSON ;
- une route `/api/info` reposant sur une fonction métier ;
- un test unitaire de cette fonction.

> Cette application est destinée à un exercice de formation. Elle n'est pas conçue pour être sécurisée ni utilisée en production.

## Prérequis

- Node.js 22 ou 24 recommandé
- npm

## Démarrer le backend

```bash
cd backend
npm install
npm start
```

Le backend écoute sur : `http://localhost:3000`

Pour lancer les tests :

```bash
npm test
```

## Démarrer le frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm start
```

Ouvrir ensuite : `http://localhost:4200`

## Comptes de démonstration

- `alice` / `password`
- `bob` / `1234`
- `admin` / `admin`

## Github

cloner le repo git 

```bash
https://github.com/mmorkos-cyber/app-test-deploiement-cicd.git
```
## Docker

Créer un .env dans le dossier backend en se basant sur .env.exemple, puis lancer :
```powershell
docker compose up
```
## Déploiement
Pour le déploiement:
- Création d'un dossier **workflows** .github.
- Création d'un fichier **ci.yml**, qui décrit les étapes du déploiement.
- Création des **secrets** sur github (variable environnements + connextion repo dockerhub).
- Test lors du push sur dev du script
- Configuration de la VM d'Azure :
  - Dans le dossier où se trouve le compose, nous avons créé un fichier **deploy.sh**.
  - Dans ce fichier script on lance la récupération des images docker (pull), puis démarrage de contenaires (up).
  - Autorisation d'accès au groupe d'execution (x) du fichier **deploy.sh**
  - Configuration de la **crontab** à 5 minutes pour le test.
  - Test réussi 

## Fonctionnement de la CI
A chaque push le runner github execute les actions présente dans le fichier **ci.yml**, qui ordonne de faire le test du backend, puis de recréer les images docker et les pousser dans dockerhub. Si une erreur est identifiée lors de l'execution du script le pipeline s'arrête et empêche l'intégration.
