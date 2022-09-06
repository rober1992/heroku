import {Router} from 'express';
import { productController } from "../controllers/productsController";
import { checkAdmin } from '../middlewares/checkAdm';
import { Request, Response} from 'express';

const router = Router();

type Photos = {
    value: string;
};
  
  type Emails = {
    value: string;
};
  interface User extends Express.User {
    contador?: number;
    displayName?: string;
    photos?: Photos[];
    emails?: Emails[];
}

router.get('/', async (req: Request, res: Response) => {
    let foto = 'noPhoto';
    let email = 'noEmail';
  
    if (req.isAuthenticated()) {
      const userData : User = req.user;
  
      if (userData.photos) foto = userData.photos[0].value;
  
      if (userData.emails) email = userData.emails[0].value;

      const totalProd = await productController.getProducts();
      console.log('productos:',totalProd)
  
      res.render('main', {
        nombre: userData.displayName,
        foto,
        email,
        products : totalProd
      });
    } else {
      res.redirect('/api/login');
    }
});

router.get('/:id', productController.checkProductExist, productController.getProducts);

router.post('/add', checkAdmin,  productController.checkAddProduct, productController.addProduct);

router.put('/update/:id', checkAdmin, productController.checkProductExist, productController.updateProduct);

router.delete('/delete/:id', checkAdmin, productController.checkProductExist, productController.delete);


export default router;