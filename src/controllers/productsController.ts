import { productos } from "../models/productsModels";
import { Request, Response, NextFunction} from 'express';


const tableName = 'productos';

class ProductController {

    checkAddProduct (err: Error, req: Request, res: Response, next: NextFunction) {

        const { name, price, description, thumbnail, stock } = req.body;

        if (!name || !price || !description || !thumbnail || !stock ||  
            typeof name !== 'string' || 
            typeof description !== 'string' ||
            typeof thumbnail !== 'string' ||
            isNaN(stock) ||
            isNaN(price)) {
        return res.status(400).json({
            msg: 'Campos del body invalidos',
            error : err
        });
        }

        next();
    }

    async checkProductExist (req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        productos.findById(id, (err: Error, product: any) => {
            if (err) {
                return res.status(404).json({
                    msg: 'No se encuentra este producto'
                });
            } else {
                next();
            }
        })
    }

    async getProducts() {
        const total = await productos.find().lean();
        return total;
    };
        

    async addProduct(req: Request, res: Response) {
        console.log(req.body);
        await productos.create(req.body);
        res.redirect('/api/products');
    }

    async updateProduct(req: Request, res: Response) {
        const {id} = req.params;
        await productos.findByIdAndUpdate(id, req.body);
        res.json({
            msg : 'Producto actualizado con exito'
        })
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        await productos.findByIdAndDelete(id);
        res.json({
            msg : 'Producto borrado con exito'
        });
    }
}

export const productController = new ProductController();