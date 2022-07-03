import { Router, Request, Response,  } from 'express'

const router = Router();

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