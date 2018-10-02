const Router = require('koa-router');
const queries = require('../db/queries/users');

const router = new Router();
const BASE_URL = `/api/v1.0/users`;

router.get(BASE_URL, async (ctx) => {
  try {
    const users = await queries.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (err) {
    console.error(err)
  }
})

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const user = await queries.getSingleUser(ctx.params.id);
    ctx.body = {
      status: 'success',
      data: user
    };
  } catch (err) {
    console.error(err)
  }
})

module.exports = router;
