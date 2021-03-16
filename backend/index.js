const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("./config");

const userModel = require("./models/user");

const app = express();

app.listen(config.port, () => {
  console.log(`server connecté http://localhost:${config.port}`);
});

mongoose.connect(config.mongoDB, () => {
  console.log("DB connectée");
});

app.use(bodyParser.json());
app.use(cors());

const verifyToken = async (req, res, next) => {
  console.log("test")
  try {
    const token = req.headers.authorization;
    const result = jwt.verify(token.split(" ")[1], config.secret);
    const user = await userModel
      .findOne({
        _id: result.id,
      })
      .exec();
    req.user = user;
    next();
  } catch (err) {
    res.send("vous n'etes pas authorisé");
  }
};

app.get("/", (req, res) => {
  res.send(
    "voici la page d'accueil choisissez de vous inscrire ou vous connecté"
  );
});

app.post("/login", async (req, res) => {
  const user = await userModel
    .findOne({
      email: req.body.email,
    })
    .exec();

    if(user){
      if (bcryptjs.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          config.secret,
          {
            expiresIn: 7200,
          }
        );
        res.json({
          message: "utilisateur reconnu",
          token: token,
        })
        console.log("nouvelle requet POST : login")
      } else {
        res.send("mot de passe érroné");
      }
    }else{
      res.send("email inconue")
    }

  
});

app.post("/signUp", async (req, res) => {
  try {
    const user = await userModel
      .findOne({
        email: req.body.email,
      })
      .exec();

    if (user) {
      res.send(`Un compte existe deja avec cette adresse mail`);
      return;
    }

    if (req.body.password.length < 8) {
      res.send("le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (req.body.password !== req.body.secondPassword) {
      res.send(
        "les mots de passes doivent etre identiques"
      );
      return;
    }

    await userModel.create({
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password),
      firstName: req.body.firstName,
      surname: req.body.surname,
      birth: req.body.birth,
    });
    res.send(`Bienvenue parmis nous ${req.body.firstName}`);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

app.get("/welcome", verifyToken, async (req, res) => {
  res.send(`Welcome, ${req.user.firstName}`);
});