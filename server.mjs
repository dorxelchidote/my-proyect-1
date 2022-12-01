import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import ascii_cats from 'ascii-cats';
import * as fs from 'node:fs';

const app = express();
const port = 3000;

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

function log_users (req, res, next){
    console.log(chalk.blue("Método: "), chalk.green(req.method));
    console.log(chalk.blue("Url:"), chalk.green(req.originalUrl));
    console.log(chalk.blue("Fecha:"), chalk.green(new Date(Date.now()).toString()));
    console.log(chalk.blue("Content-type"), chalk.green(req.get('Content-Type')));
    //Ejecuta la siguiente función
    next();
}

function print_cat (req, res, next) {
    console.log(ascii_cats());
    next();
}

function checkAuth (req, res, next) {
    let auth = req.get('x-auth');
    if(auth){
        next();
    }
    console.log(chalk.red("No autorizado"));
    res.sendStatus(401);
}

app.use(print_cat);

app.use("/users", log_users);

app.use("/users", checkAuth);

app.get('/', (req, res) => {
    console.log(chalk.blue("Entró a la raíz"));
    //res.send('Raíz del sitio');
    res.sendFile("./index.html");
});

app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', function (error, data){
        if(error){
            console.log(error);
        }
        console.log(chalk.blue("Mostrando usuarios:"));
        console.table(JSON.parse(data));
        res.send(data);
    });
});

app.get('/home', (req, res) => {
    console.log(chalk.green("Entró a Home"));
    res.send('Home del sitio');
});

app.listen(port, () => {
    console.log("Aplicación de ejemplo corriendo en puerto " + port);
});

