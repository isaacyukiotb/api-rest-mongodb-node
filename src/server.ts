import express, { Express } from 'express'
import {Error} from 'mongoose'
import mongoose from 'mongoose';

import personRoutes from './routes/personRoutes';
import homeRoutes from './routes/homeRoutes';

import * as dotenv from 'dotenv'
dotenv.config();
const app: Express = express();

//forma de ler JSON /middlewares -recursos que sao executados entre as requisicoes de respostas

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

//Rotas da aplicacao

app.use('/person', personRoutes);
app.use('/', homeRoutes);


//entregar uma porta
mongoose.connect(`${process.env.DB_CONNECTOR}`)
.then(()=>{
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
.catch((err:Error)=>{
    console.log(err)
})