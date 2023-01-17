const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index')


require('./config/dbConfig')
// Allow client http requests
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET","POST"],
    credentials: true,
},{
    origin: ["https://http.cat/"],
    method: ["GET"],
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use(routes);

// Server port
app.listen(3333);

