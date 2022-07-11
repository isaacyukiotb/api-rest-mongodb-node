import { Router, Request, Response } from 'express'

import Person from '../models/Person'
import PersonI from '../models/PersonInterface'


const router = Router();
//rotas da api


//criando dados
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

//Leitura de Dados
router.get('/', async (req: Request, res: Response) => {
    try {

        const people = await Person.find();
        res.status(200).json(people);

    } catch (error) {

        res.status(500).json({ error: error })
    }
})

//Criando rotas dinamicas
router.get('/:id', async (req: Request, res: Response) => {

    //extrair o dado pela requisicao, pela URL = req.params
    const id: string = req.params.id;

    try {

        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'O Usuario nao foi encontrado!' })
            return
        }

        res.status(200).json(person);


    } catch (error) {

        res.status(500).json({ error: error })
    }
})

// Update - Atualizacao de dados (PUT, PATCH) (PUT - Atualizar todos os dados) (PATCH - Atualizar apenas alguns campos)
router.patch('/:id', async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const { name, salary, approved } = req.body;

    const person: PersonI = {
        name,
        salary,
        approved
    }


    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person);

        //Verifica se algum dado foi modificado
        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'O Usuario nao foi encontrado!' })
            return
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

router.delete('/:id', async (req: Request, res: Response) => {

    const id = req.params.id;

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'O Usuario nao foi encontrado!' })
        return
    }

    try {

        await Person.deleteOne({_id:id});

        res.status(200).json({message:'Usuario removido com sucesso!'});

    } catch (error) {

        res.status(500).json({ error: error })

    }


})

export default router;