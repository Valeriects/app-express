//on fait toujours de la même manière
// en premier les imports, ici en javascript
import express from "express";
//pour les cookies:
import session from "express-session";

//importation des routes via un router.js
import router from "./router/index.routes.js";

import path from "path";
import favicon from "serve-favicon";

// import bcrypt from "bcrypt";

// //j'import la bibliotheque de jsonfile :
// import jsonfile from "jsonfile";
// //on stock dans une variable l'emplacement du fichier:
// const fileJson = path.join(process.cwd(), "public/assets/datas.json");
// //je stock mon fichier datasUsers.json dans une nouvelle variable:
// const fileUsersJson = path.join(process.cwd(), "public/assets/datasUsers.json");

//les variables
const app  = express();
const PORT = 8000;

//todo les set()
//permet de ne pas ecrire home.ejs par la suite
app.set("view engine", "ejs"); //le view engine est mot clef natif de express
//et ici le premier paramètre "views" est aussi mot clef natif de express:
app.set("views", path.join(process.cwd(), "/src/views"));


//todo les use()
//pour le favicon
app.use(favicon(path.join(process.cwd(), 'public/assets/img', 'favicon.png')));

//pour le css:
app.use("/css", express.static(path.join(process.cwd(), "/public/assets/stylesheets/css/")));

//on lui dit que pour les images, dès qu'il a un lien ver une images il met le chemin complet
app.use("/img", express.static(path.join(process.cwd(), "/public/assets/img/")));
//le chemin pour les scripts
app.use("/js", express.static(path.join(process.cwd(), "/public/assets/js/")));

//pour récupérer et convertir les données récupérées par le formulaire, afin de les manipuler en js sous forme d'objet
app.use(express.urlencoded({ extended: true })); //avec true, la librairie utilisée est "qs" plus lourd, plus complet (gère tableaux et objets)
// app.use(express.urlencoded({ extended: false })); //avec false, la librairie utilisée est "querystring" plus légère, moins complète (gère chaine de caractères et tableaux)


// *** DEBUT le middleware des cookies: ***
app.use(
    session({
        //clef de chiffrement est inckus à la chaine des données du user dans le connect.sid, donc doublement chiffré
        secret: "GO76BIIMPJgeulhnalU9OCH9QCa365rS", //attention la clef de chiffrement si on la change comme ça, les utilisateurs riquent de ne pas pouvoir se connecter ou de perdre la connexion, car la clef sera différente.
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, //pour une durée max de 1 semaine
            secure: false, //true pour la mise en production (https), et false pour le localhost (http)
            httpOnly: true, //pour empecher accès au cookie depuis injection javascript du client avec "document.cookie", aide contre les attaques XSS
            sameSite: "lax" //'lax' permet certaines requetes GET cross site , en gardant une protection contre les attaques CSRF
            //si on met 'strict' au lieu de 'lax', on dit que le cookie ne sera jamais utilisé

        },
        rolling: true, //permet de rafraichir le maxAge à chaque requête, chaque action du User
    })
);


app.use((req, res, next) => {
    if (req.session?.name) { //si il y a une session et un nom d'utilisateur
        //alors en reponse, 
        res.locals.username = req.session.name;
    }
    next(); //pour dire à express de ne pas laisser le navigateur boucler et de passer à la suite
})

// *** Fin middleware des cookies ***


//fonction middleware pour protéger certaines routes elle sera appelée avant chaque fonction de middleware de route voir route ci-dessous
const protectedRoute = (req,res,next) => {
    // récupérer la donnée (role) de la session
    // ...
    // si permission de role validée on continue (next())
    // sinon redirect/error
}

app.get("/dashboard", protectedRoute, (req, res) => {
    res.render("layout/main", { template: "../pages/dashboard" });
});


//devient app.use middleware qui va chercher le router pour trouver la bonne route
app.use(router);



//ecouteur de port:
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
