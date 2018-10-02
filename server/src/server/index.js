const Koa = require('koa');
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const userDataRoutes = require('./routes/user_data');
const beerRoutes = require('./routes/beer');
const storageRoutes = require('./routes/storage');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(indexRoutes.routes());
app.use(usersRoutes.routes());
app.use(beerRoutes.routes());
app.use(storageRoutes.routes());
app.use(userDataRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
