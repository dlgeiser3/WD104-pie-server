require('dotenv').config();
const Express = require("express");
const app = Express();
app.use(Express.json());

const dbConnection = require("./db");
const middlewares = require('./middlewares');
const controllers = require('./controllers');


// app.use(express.static(__dirname + '/public'));
// console.log(__dirname);

// app.get('/', (req, res) => res.render('index'));

app.use(middlewares.headers);
app.use("/user", controllers.usercontroller)
app.use("/pies", middlewares.validateSession, controllers.piecontroller);

dbConnection.authenticate()
  .then(() => dbConnection.sync()) // => {force: true}
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server: ] App is listening on Port ${process.env.PORT}`)
    });
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  })
    
