

//==============================================================================

//-- Dependencies --------------------------------
import express from 'express';

//-- Project Constants ---------------------------
const PORT = 7231;
const SERVER_LISTEN_MESSAGE = `Server started on port ${PORT}`;

//------------------------------------------------
const server = express();
server.listen(PORT, function () {
    console.log(SERVER_LISTEN_MESSAGE);
});
