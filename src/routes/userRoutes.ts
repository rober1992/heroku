import {Router} from 'express';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/userModels';
import passport from '../middlewares/auth';


const router = Router();


router.get('/', async (req : Request, res : Response) => {
    res.render('loginForm');
});

router.post('/signup', (req : Request, res : Response, next : NextFunction) => {
    passport.authenticate('signup', function (err: any, user: any, info: any) {
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.status(401).json({ data: info });
  
      res.render('main', { username : req.body.username})
    })(req, res, next);
});

router.get('/signUpPage', (req: Request, res: Response) => {
    res.render('signup');
})

router.post('/login', passport.authenticate('login'), (req : Request, res : Response) => {
    res.render('main', {username : req.body.username});
});

router.post('/logout', (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
        res.redirect('/api');
    });
})

router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/api/products',
      failureRedirect: '/api/fail',
    })
);



export default router;
