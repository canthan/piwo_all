const Router = require('koa-router');
const queries = require('../db/queries/storage');

const router = new Router();
const BASE_URL = `/api/v1.0/storage`;

router.get(BASE_URL, async (ctx) => {
  try {
    const storages = await queries.getAllStorages();
    ctx.body = {
      status: 'success',
      data: storages
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    const storages = await queries.getStoragesOfUser(ctx.params.user_id);
    ctx.body = {
      status: 'success',
      data: storages
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:user_id/:beer_id`, async (ctx) => {
  try {
    const storages = await queries.getStoragesOfBeer(ctx.params.user_id, ctx.params.beer_id);
    ctx.body = {
      status: 'success',
      data: storages
    };
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
