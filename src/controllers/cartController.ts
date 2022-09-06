import { Request, Response, NextFunction} from 'express';



class CartController {

    checkProductExist (req: Request, res: Response, next: NextFunction) {
        const idProd = Number(req.params.id);;

    

        next();
    }

    getProducts(req: Request, res: Response) {
        const idProd = Number(req.params.id);
    
       res.json({
         
        });

    }

    addProductsCartID(req: Request, res: Response) {
        const idProd = Number(req.params.id);

       
        


        res.json({
            msg : 'Product added successfully'
        });
    }

    deleteProductCart(req: Request, res: Response) {
        const idProd = Number(req.params.id);
        
  

        res.json({
            msg : 'Product deleted successfully'
        });
    }


}

export const cartController = new CartController();
