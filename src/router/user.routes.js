import express from "express";

//importer les fonctions du controller user.js
import {  getLogin, postLogin, getRegister, postRegister } from "../controller/user.js";

const router = express.Router();


//connexion
router.get("/", getLogin);

router.post("/", postLogin);


//inscription
router.get("/creation-de-compte", getRegister);

router.post("/creation-de-compte", postRegister);


export default router;
