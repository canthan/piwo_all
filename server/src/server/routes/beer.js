const Router = require('koa-router');
const queries = require('../db/queries/beer');

const router = new Router();
const BASE_URL = `/api/v1.0/beer`;

router.get(BASE_URL, async (ctx) => {
  try {
    const beers = await queries.getAllBeers();
    ctx.body = {
      status: 'success',
      data: beers
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    const beers = await queries.getBeersOfUser(ctx.params.user_id)
    ctx.body = {
      status: 'success',
      data: beers
    };
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
