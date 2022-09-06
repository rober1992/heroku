import {Router} from 'express';
import productsRouter from './productsRoutes';
import cartRouter from './cartRoutes';
import UserRouter from './userRoutes'
import { isLoggedIn } from '../middlewares/auth';
import { allArguments } from '../utils/getArgs';
import { fork } from 'child_process';
import path from 'path';
import os from "os";

const numCPUs = os.cpus().length;

const router = Router();

const scriptPath = path.resolve(__dirname, '../middleware/getRandoms');

router.use('/products',isLoggedIn, productsRouter);
router.use('/cart', cartRouter);
router.use('/', UserRouter);
router.get('/info', (req,res) => {
    res.json ({
        arguments : allArguments,
        plataform : process.platform,
        nodeVersion : process.version,
        directory : process.cwd(),
        processId : process.pid,
        memoryUse : process.memoryUsage(),
        CPUs: numCPUs
    });
});


router.get('/randoms', (req,res) => {
    let numeros;
    req.query.cant ? (numeros = Number(req.query.cant)) : 100000000;
    const randoms = fork(scriptPath);
    const msg = { command: 'start', cantidad: numeros };
    randoms.send(JSON.stringify(msg));
    randoms.on('message', (result: any) => {
        res.json(result);
    });
});


export default router;