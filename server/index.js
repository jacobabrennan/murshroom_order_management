

//==Mushroom Ordering Server ===================================================

//-- Dependencies --------------------------------
import express from 'express';
import expressSession from 'express-session';
import sessionSecret from './secure/session_secret.js';
import authentication from './authentication/index.js';

//-- Project Constants ---------------------------
const PORT = 7231;
const SERVER_LISTEN_MESSAGE = `Server started on port ${PORT}`;
const PATH_STATIC = 'public';
const URL_AUTHENTICATION = '/auth';
const URL_STATIC = '/rsc';

//-- Create and Configure Server------------------
const server = express();
server.use(expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
}));

//-- Route Requests ------------------------------
server.use(URL_STATIC, express.static(PATH_STATIC));
server.use(URL_AUTHENTICATION, authentication);

//-- Open Server ---------------------------------
server.listen(PORT, function () {
    console.log(SERVER_LISTEN_MESSAGE);
});
