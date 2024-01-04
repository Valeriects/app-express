import express from 'express';
import path from "path";
//j'import la bibliotheque de jsonfile :
import jsonfile from "jsonfile";
//on stock dans une variable l'emplacement du fichier:
const fileJson = path.join(process.cwd(), "public/assets/datas.json");

//importer les autres fichiers routes:
import characterRoutes from "./character.routes.js";
import userRoutes from "./user.routes.js";


//on défini la constante pour le Router() d'express, on peut définir la même constante pour un fichier d'une route enfant, express sait de quel fichier il proviendra
const router = express.Router();


//ici on peut donc mettre que /ejs au lieu de home.ejs
router.get('/', (req, res) => {
    console.log("bienvenue : " + res.locals.username);

    const arrayRandom = [];
    let random = null;
    
    jsonfile.readFile(fileJson, (err, datas) => {
        if (err) console.log(err);
        // console.log(datas);

        
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        

        //version avec boucle while avec pour condition, tant que mon tableau arrayRandom n'a pas atteint 3 entrées, alors je continue
        // while (arrayRandom.length < 3) {
        //     random = getRandom(0, datas.length);

        //      if (!arrayRandom.includes(random)) {

        //         arrayRandom.push(random);
        //     }
        // }

        //veersion ave boucle for :
        for (let i = 0; i <= 2; i++) {
            let random;
            
            do {
                random = getRandom(0, datas.length);
                //si le chiffre est déjà dans mon tableau, alors je re-rentre dans la boucle pour générer un nouveau chiffre
            } while (arrayRandom.includes(random));

            arrayRandom.push(random);
        }

        console.log(arrayRandom);
        

        // et on retourne la page home
        res.render("layout/main", {
            template: "../pages/home",
            title: "EJS-character-list",
            arrayRandom,
            datas
        });

    });
});


//todo les middlewares:
//la route pour la liste des perso et pour l'affichage d'un perso:
router.use("/list-character", characterRoutes);


//la route pour la connexion et deconnexion des users:
router.use("/authentification", userRoutes);


//route de déconnexion:
router.get('/deconnexion', (req, res) => {

    req.session.destroy(); // destruction de la session dans la requête (coté serveur)
    res.clearCookie("connect.sid"); // destruction du cookie de session (coté client)
    res.render("layout/main", {
            template: "../pages/deconnexion",
    });

});


//l'erreur 404
router.get("*", (req, res) => {
    res.status(404).render("layout/main", { template: "../pages/404" });
});


export default router;