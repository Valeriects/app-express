<!-- Documenter l'installation d'un projet sous node/express/ejs, depuis l'initialisation du serveur jusqu'à l'affichage d'une page home.
Détailler chaque étape, les lignes de commandes, les instructions .. -->
> Insertion, d'un bloc de citation

# Introduction au projet : 
Création d'un petit projet en Node.js, Express et ejs.

## Initier le projet : 
Dans le terminal git bash du VSCode, taper les lignes de commandes suivantes : 
- Pour initaliser le projet :   
  * D'abord, créer un dossier (manuellement ou en ligne de commande avec mkdir suivit du nom du dossier)
  * Ensuite dans le terminal, on entre dans le dossier que l'on vient de créer afin de faire la commande suivant qui initialise le projet:
```bash
    cd nom-dossier
    npm init -y
```
- Pour installer les dépendances nodemon en mode développer, express, ejs, il faut faire la commande suivante dans le terminal : 
```bash
    npm install nodemon -D && npm install express ejs
```

## Modifier le script de package.json : 
On change quelques lignes du package.json, afin de faire des commandes personnalisées pour le terminal.
```json
"version" : "0.1.0", //au lieu de "1.0.0"
"type" : "module", //comme express est un module, je dois le mettre ici pour qu'il puisse fonctionnner et ne pas avoir de plantage de mon système de module
"scripts" : {
    "start" : node src/app.js, //on met le chemin où on aura notre serveur
    "dev" : nodemon src/app.js -e je, ejs
},
```
Pour démarrer le serveur, on fera en ligne de commande : 
```bash
npm run dev
```
Pour rafraîchir le serveur, on pourra faire la ligne de commande gràace à nodemon :
```bash
rs
```
au lieu de devoir faire ```ctrl + c``` et de redémarrer le serveur à chaque fois avec ```npm start```

## Création des fichiers dans l'arborescence du projet:
Dans le dossier src du projet, on créé un fichier 
```app.js```, et un dossier ```views```.
Dans ce dernier on créé deux dossiers : ```pages``` et ```layout```.
Puis dans le dossier pages, on créé le fichier ```home.ejs```.
on peut le faire avec les commandes suivants dans le terminal : 
```bash
cd src
mkdir -p views/{pages,layout}
 #faire soit en 2 lignes
touch -p views/pages/home.ejs
touch -p views/layout/main.js
# ou en une seule ligne
touch views/{pages/home.ejs,layout/main.js}
```
A la racine du projet, on créé un dossier ```public```, à l'intérieur on créé le dossier ```assets``` encore de dans, un dossier ```img```.   
On peut le faire via la commande dans le terminal : 
   - bien se mettre à la racine du projet et faire la commande suivante : 
```bash
    mkdir -p public/assets/img 
```
On y mettra nos images.

Le ```-p``` veut dire qu'on créé s'il n'existe pas déjà.

### 1- Le fichier app.js : 
Dans ce fichier, on va retrouver la création du serveur ```node``` avec le module ```express```.   
Pour cela, on doit mettre dans cet ordre dans le fichier : 
  - Faire nos imports à la manière de javaSript: 
   ```js
    import express from "express"; //on importe le module
    import path from "path"; //on importe une méthode de node

   ```
  - Création des constantes dont on a absolument besoin : 
  ```js
  const app = express(); //on stocke la methode express dans la constante app
  const POST = 8000; //en majuscule, car on ne la change pas du tout
  ```
  - Création des set() qui sont les méthodes de configurations : 
  ```js
  app.set("view engine", "ejs"); // view engine est un mot clef d'express, il permet de définir le moteur de template à utiliser
  //ensuite, "express" nous permet de ne pas avoir à écrire l'extension de fichier ejs, pour notre home.ejs par exemple
  app.set("views", path.join(process.cwd(), "/src/views")); //cela nous permet de dire que chaque fois qu'on fait appel à "views", express s'occupe d'ajouter le chemin qu'on lui aura dit de mettre
  ```

  - Creation des use() qui sont les middelware d'express :
  ```js
  app.use("/img", express.static(path.join(process.cwd(), "public/assets/img"))); //on utilise la methode static de express, pour  indiquer le chemin des medias
  //à chaque fois qu'on appelle "/img"pour un chemin, express nous donne le chemin entier

  ```

  - Création des get() qui sont les routes: 
  ```js
  app.get('/', function(req, res) => { //on dit que pour la première page, on veut afficher la page home.ejs
  //on entre dans le cycle de requête et de réponse
    res.render('layout/main', { //la réponse de la requête passée nous renvoit la vue, ici, il cherche le fichier main.ejs
        template: '../pages/home'; //ici, on lui dit qu'on veut afficher la page home.ejs dans la variable "template" qui est appelée dans le fichier main.ejs 
    });
  });
  ```

  - Ecoute du port:
  ```js
  app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT); //on console log le lien localhost du serveur qu'on vient de créer, il s'affichera dans le terminal du VSCode et on pourra directement cliquer sur le lien pour ouvrir notre application dans le navigateur
  });
  ```


### 2- Le fichier main.ejs : 
Je ne sais plus la différence entre ```ejs``` et ```js```.   
Ici, je mets ma page HTML.
Et pour insérer le template de la page home.ejs il faut faire un include : 
```ejs
    <body>
        <%- include(template) %> 
        
        <%# ici, le template n'est pas un chemin relatif, amis une variable utilisée dans le render du chemin dans le fichier app.js %>
    </body> 

```



### 3- Le fichier home.ejs : 
Ici, on mettra notre code HTML, faisons simple et mettons uniquement du code HTML.        
On pourra par exemple mettre le ```header``` et le ```footer```, ainsi que notre ```main```.








