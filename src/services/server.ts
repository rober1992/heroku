import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import handlebars from 'express-handlebars';
import session from 'express-session';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import compression from 'compression';

const StoreOptions = {
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/coderhouse'
    }),
    secret: 'asdasasdasfas',
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge : 600000
    }
};



const app = express ();
app.use(compression());

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));


const layoutsFolderPath = path.resolve(__dirname, '../../views/layouts')
const defaultLayerPth = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialsFolderPath = path.resolve(__dirname, '../../views/partials');


app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir : layoutsFolderPath,
    partialsDir : partialsFolderPath ,
    defaultLayout : defaultLayerPth
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use(session (StoreOptions));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', apiRouter)


const myServer = new http.Server(app);

export default myServer;