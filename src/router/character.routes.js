import express from "express";


//importer les fonctions du controller
import { getAllPerso, getById } from "../controller/character.js";

//on peut mettre la même constante que pour le fichier index.routes.js
const router = express.Router();

//la route "/list-character" :
router.get('/', getAllPerso); //1er paramètre le chemin, second paramètre, la fonction du controller

//la route "/list-character/:id" :
router.get("/:id", getById);

export default router;


