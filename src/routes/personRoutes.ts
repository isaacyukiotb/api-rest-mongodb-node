import { Router, Request, Response,  } from 'express'
import Person from '../models/Person'
import PersonI from '../models/PersonInterface'


const router = Router();
//rotas da api

router.post('/', async (req:Request, res:Response)=>{

    //req.body
    const {name, salary, approved} = req.body
    const person:PersonI = {name, salary, approved};
    
    // create

    try {

        await Person.create(person);
        res.status(201).json({message:'Pessoa inserida no sistema com sucesso!'});

    } catch (error) {
        res.status(500).json({error:error})
    }
    
})

//endPoint inicial / rota
router.get('/', (req: Request, res: Response) => {
    //mostrar a req
    res.json(
        {
            message: 'Oi Express!'
        }
    )
})

export default router;