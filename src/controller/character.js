

import path from "path";
//j'import la bibliotheque de jsonfile :
import jsonfile from "jsonfile";
//on stock dans une variable l'emplacement du fichier:
const fileJson = path.join(process.cwd(), "public/assets/datas.json");

const getAllPerso = (req, res) => {
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
};


const getById = (req, res) => {
   res.send(`Hello ${req.params.id} !`); 
}



export { getAllPerso, getById };