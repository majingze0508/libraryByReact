import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from '../webpack.config';
import favicon from 'serve-favicon';
import bodyParse from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParse from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import socket_io from 'socket.io';
import ios from 'socket.io-express-session';

const MongoStore = require('connect-mongo')(session);

const app = express();
const port = process.env.PORT || '3000';
app.io = socket_io();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {  
    //noInfo: true,
    publicPath: config.output.publicPath
}));
  
app.use(require('webpack-hot-middleware')(compiler));  
app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));

app.get('*', function(req, res) {  
    res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
    if(err) {
        console.error(err);
    } else {
        console.log('server is starting');
        open('http://localhost:3000')
    }
})