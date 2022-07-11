import { Router, Request, Response } from 'express'

import Person from '../models/Person'
import PersonI from '../models/PersonInterface'


const router = Router();
//rotas da api

router.post('/', async (req: Request, res: Response) => {

    //req.body
    const { name, salary, approved } = req.body
    const person: PersonI = { name, salary, approved };

    // create

    try {

        await Person.create(person);
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' });

    } catch (error) {
        res.status(500).json({ error: error })
    }

})


router.get('/', async (req: Request, res: Response) => {
    try {
        
        const people = await Person.find();
        res.status(200).json(people);

    } catch (error) {

        res.status(500).json({ error: error })
    }
})

export default router;