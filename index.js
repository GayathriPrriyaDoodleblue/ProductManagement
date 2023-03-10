const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
dotenv.config();
const port = process.env.PORT;
require('./src/controllers/index');
app.use(bodyParser.json());
const dbsetup = require('./src/config/db');

const routes = require('./src/routes/index');
routes(app);



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});