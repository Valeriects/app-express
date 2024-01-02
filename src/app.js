//on fait toujours de la même manière
// en premier les imports, ici en javascript
import express from "express";
import path from "path";
import favicon from "serve-favicon";

import bcrypt from "bcrypt";

//j'import la bibliotheque de jsonfile :
import jsonfile from "jsonfile";
//on stock dans une variable l'emplacement du fichier:
const fileJson = path.join(process.cwd(), "public/assets/datas.json");
//je stock mon fichier datasUsers.json dans une nouvelle variable:
const fileUsersJson = path.join(process.cwd(), "public/assets/datasUsers.json");

//les variables
const app  = express();
const PORT = 3000;

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

//pour récupérer et convertir les données récupérées par le formulaire, afin de les manipuler en js sous forme d'objet
app.use(express.urlencoded({ extended: true })); //avec true, la librairie utilisée est "qs" plus lourd, plus complet (gère tableaux et objets)
// app.use(express.urlencoded({ extended: false })); //avec false, la librairie utilisée est "querystring" plus légère, moins complète (gère chaine de caractères et tableaux)






//todo les get()
//à la page d'accueil de l'application on lui dit d'afficher
// app.get("/", (req, res) => {
//     res.send("<h1>hello world</h1>");
// });


// app.get("/index", (req, res) => {
//     // res.sendFile(path.join(process.cwd(), 'src/index.html'));
//     res.sendFile(path.join(path.resolve() + "/src/index.html"));
// });

// app.get("/hello/:name", (req, res) => {
//     res.send(`Hello ${req.params.name} !`);
// });


//ici on peut donc mettre que /ejs au lieu de home.ejs
app.get("/", (req, res) => {

    //onglet actif
    // const home = document.querySelector('#home');
    // home.classList.toggle('.active');

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


//à l'affichage de layout
// app.get("/layout", (req, res) => {
//      const datas = [ //on doit définir les datas si je veux voir hom qui est dans un template qui est dans le main.ejs 
//         {
//             title: "EXPRESS",
//             src: "batman.jpg",
//         },
//         {
//             title: "EJS",
//             src: "superman.jpg",
//         },
//      ];
    
//     res.render("layout/main", {
//         template: "../pages/home",
//         title: "EJS",
//         message: "Hello EJS !",
//         datas
//     });
// });



//pour que l'appli attrape le json:
app.get("/list-character", (req, res) => {
    //pour lire le json
    jsonfile.readFile(fileJson, (error, datas) => {
        if (error) {
            //j'affiche mon erreur en consolge
            console.error(error);
        }

        const datasTrie = datas.sort((a, b) => a.title.localeCompare(b.title));
        //j'affiche mes datas du json
        // console.log(datas);
        function searchCharacter(e) {
        
             const newList = datasTrie.filter((data) =>
            data.title //les titres
                .toLowerCase() //mettre en minuscule
                .trim() //on enlève les espaces avatn et après
                .includes(e.target.value.toLowerCase().trim()) 
        );

        // on met à jour l'affichage de la liste (afficheList), avec la constante qui filtre les datas triées
        setAfficheList(newList);

    }

        //je fais le rendu:
        res.render("layout/main", {
            template: "../pages/list",
            datas
        });
    });
});

//page detail perso
app.get("/list-character/:id", (req, res) => {
    res.send(`Hello ${req.params.id} !`);
});


//la page connexion
app.get("/authentification", (req, res) => {
    res.render("layout/main", {
        template: "../pages/login",

    })
})


//la page inscription
app.get("/authentification/creation-de-compte", (req, res) => {
    // jsonfile.readFile(fileUsersJson, (err, datas) => {
    //     if (err) console.log.error(err);
   
        //todo ca met undifined
        // console.log('read ' + datas.nom);
    
        res.render("layout/main", {
            template: "../pages/register",
            // datas,
        
        });
        
        

    // });
});

//todo les post() :
//pour réceptionner les données envoyé par le formulaire d'inscription on fait :
app.post("/authentification/creation-de-compte", (req, res) => {
    //il nous faut un middleware fournit par "express", afin de récupérer et convertir les données en un format manipulable en js donc en un objet
    
    //lire le json pou récupérer les donées dedans afin de pouvoir ajouter d'autres données par la suite:
    jsonfile.readFile(fileUsersJson, (err, datasUsers) => {
        if (err) console.log.error(err);
        console.log('read ' + datasUsers);

    
        const datas = [];
    

        bcrypt.hash(req.body.password, 10, function (err, hash) {
        
            datas.push({ nom: req.body.nom, password: hash });
            // datas.push({ nom: req.body.nom, password: req.body.password });
            //pour garder les données déjà mise dans le json, avant de manipuler et de faire une concaténation on doit
        
    
        
            //je veux enregistrer mes données dans un fichier json:
            jsonfile.writeFile(fileUsersJson, datas, (err) => {
                if (err) console.error(err);
            
                //todo comment faire pour que les données json ne soient pas écrasées par la dernière entrée ?
                // datas.nom += req.body.nom;
                // datas.password += req.body.password;
                // console.log(datasUsers);
            
                console.log("insertion de " + datas);
            });
        });
    });

    //ou une redirection:
    // res.redirect('/authentification');
    res.redirect('/authentification/creation-de-compte');

    //il faut terminer le cycle
    // res.end();


});


//pour le formulaire du login / connexion
app.post("/authentification", (req, res) => {
    // const datasLog = [
    //     {
    //         nom: req.body.nom,
    //         password: req.body.password
    //     }
    // ];

    // console.log('les infos de login ' + datasLog);

    console.log(req.body.nom);
    console.log(req.body.password);

    jsonfile.readFile(fileUsersJson, (err, datas) => {
        if (err) console.error(err);
        
        console.log(datas.password);
        const hash = datas.password;

        //pour comparer une clef de hash et la valeur de l'input:
        bcrypt.compare(req.body.password, hash, function (err, result) {

            console.log(hash);
            // if (!result) {
            //     console.log("Erreur d'identification.");
            // } else {
            //     res.redirect('/');
            // } 
        });
    });

    //pour comparer une clef de hash et la valeur de l'input:
    bcrypt.compare(req.body.password, hash, function (err, result) {

        console.log(hash);
        // if (!result) {
        //     console.log("Erreur d'identification.");
        // } else {
        //     res.redirect('/');
        // } 
    });



    
    
    // res.end();
    // res.redirect('/');


});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
