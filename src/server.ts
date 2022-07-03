import express, { Express, Request, Response,  } from 'express'
import {Error} from 'mongoose'
const mongoose = require('mongoose');

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


//endPoint inicial / rota
app.get('/', (req: Request, res: Response) => {
    //mostrar a req
    res.json(
        {
            message: 'Oi Express!'
        }
    )
})


//entregar uma porta
mongoose.connect(`${process.env.DB_CONNECTOR}`)
.then(()=>{
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
.catch((err:Error)=>{
    console.log(err)
})