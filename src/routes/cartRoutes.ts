import {Router} from 'express';
import { checkAdmin } from '../middlewares/checkAdm';
import { productController } from "../controllers/productsController";
import { cartController } from '../controllers/cartController';


const router = Router();


router.get('/list', cartController.getProducts);

router.get('/list/:id', cartController.checkProductExist ,cartController.getProducts);

router.post('/add/:id', productController.checkProductExist, cartController.addProductsCartID);

router.delete('/delete/:id', cartController.checkProductExist, cartController.deleteProductCart);

export default router;