import path from "path";
import bcrypt from "bcrypt";

//j'import la bibliotheque de jsonfile :
import jsonfile from "jsonfile";

//je stock mon fichier datasUsers.json dans une nouvelle variable:
const fileUsersJson = path.join(process.cwd(), "public/assets/datasUsers.json");


//afficher la page login/connexion
const getLogin = (req, res) => {
    res.render("layout/main", {
        template: "../pages/login",

    })
};



//soummission du formulaire de connexion /login
const postLogin = (req, res) => {
    jsonfile.readFile(fileUsersJson, (err, datas) => {
        if (err) console.error(err);
        
        //le .find(), renvoi la valeur du premier élément trouvé dans le tableau qui correspond à la condition donnée par la fonction de test passé en argument
        const user = datas.find((user) => user.nom === req.body.nom);
        // console.log(user.nom);
        // console.log(req.body.nom);

        console.log(user);
        if (!user) { //si le user n'existe pas, donc s'il n'est pas présent dans la BDD/fichierjson
            console.log("Erreur d'authentification !");
        } else {
            //s'il existe, on compare le mot de passe:

             //pour comparer une clef de hash et la valeur de l'input:
            bcrypt.compare(req.body.password, user.password, function (err, result) {

                if (err) console.error(err);
                
                console.log(result);

                //comparaison du resultat:
                if (!result) { //si le résultat de la comparaison est fausse, alors c'est une erreur 
                    console.log("Erreur d'identification.");
                } else { //sinon sila comparaison est bonne, on se connecte

                    req.session.name = req.body.nom;
                    res.status(200);
                    res.redirect('/');
                } 
            });            
        }
    });
};


//affichage de la page d'inscription / register
const getRegister = (req, res) => {
    res.render("layout/main", {
            template: "../pages/register",
        });
}


//soumission du formulaire d'inscription / register
const postRegister = (req, res) => {
    //il nous faut un middleware fournit par "express", afin de récupérer et convertir les données en un format manipulable en js donc en un objet
    bcrypt.hash(req.body.password, 10, function (err, hash) {
    
        //lire le json pou récupérer les donées dedans afin de pouvoir ajouter d'autres données par la suite:
        jsonfile.readFile(fileUsersJson, (err, datasUsers) => {
            if (err) {
                console.error(err);
                datasUsers = [];
            }


            const datasUser = datasUsers.find((datasUser) => datasUser.nom === req.body.nom);
            // if (req.body.nom === );
            //peut etre que je ne peux pas le voir car il n'est pas encore dans le fichier json, donc je ne peux pas le lire
            // console.log("login: " + datasUser);

            //vérification du pseudo existe ou pas déjà dans le json
            if (datasUser) {
                console.log("Votre pseudo est déjà prit. Choississez-en un autre.");

            } else {
                //et donc si le pseudo n'exista pas déjà dans la base de donnée, alors on créé le compte
                
                datasUsers.push({ nom: req.body.nom, password: hash });
                // datas.push({ nom: req.body.nom, password: req.body.password });
                //pour garder les données déjà mise dans le json, avant de manipuler et de faire une concaténation on doit
            
        
                console.log("insertion de " + req.body.nom);
            
                //je veux enregistrer mes données dans un fichier json:
                jsonfile.writeFile(fileUsersJson, datasUsers, { spaces: 4, EOL: "\r\n" }, (err) => {
                    if (err) console.error(err);
                
                    //ou une redirection:
                    res.redirect('/authentification');
                
                    //il faut terminer le cycle
                    // res.end();
                });
                
            }
        });
    });

}


export { getLogin, postLogin, getRegister, postRegister };