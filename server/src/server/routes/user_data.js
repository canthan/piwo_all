const Router = require('koa-router');
const queries = require('../db/queries/user_data');

const router = new Router();
const BASE_URL = `/api/v1.0/user_data`;

router.get(`${BASE_URL}/:user_id`, async (ctx) => {
  try {
    const user_data = await queries.getUserData(ctx.params.user_id);
    let user_batches = await queries.getUserBatches(ctx.params.user_id)
    let user_stashes = await queries.getUserStorages(ctx.params.user_id);

    let output_data = JSON.parse(JSON.stringify(user_data));
    output_data = Object.assign(...output_data);

    user_batches = JSON.parse(JSON.stringify(user_batches));
    user_stashes = [...JSON.parse(JSON.stringify(user_stashes))];

    user_batches.forEach((batch, index) => {
      user_batches[index]['stashes'] = [];
      user_stashes.forEach((stash) => {
        if (batch.batch_number === stash.batch_number) {
          user_batches[index].stashes.push(stash);
        }
      })
    });
    output_data['storage'] = user_batches;
    ctx.body = {
      status: 'success',
      data: output_data
    };
  } catch (err) {
    console.error(err)
  }
})

module.exports = router;
