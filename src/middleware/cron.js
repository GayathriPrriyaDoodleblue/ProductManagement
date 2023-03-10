const cron = require('node-cron');
const statusModel = require('../models/status.model');

async function generateCron(id) {
  const task = cron.schedule('*/10 * * * * *', async () => {
    const now = new Date();
    await statusModel.query().insert({
      order_id: id,
      status: "orderPlaced"
    })
    await statusModel.query().insert({
      order_id: id,
      status: "orderShipped",
    })
    await statusModel.query().insert({
      order_id: id,
      status: "reachedLocalHub"
    })
    task.stop();

  },
    {
      scheduled: true,
      timezone: 'Asia/Kolkata'
    });
}

module.exports = { generateCron };


// let delivery_id;

            // const orderCount = await orderModel.query()
            //     .count('id')
            //     .first();

            // if (orderCount.count === 0) {
            //     delivery_id = 1;
            // } else {
            //     const lastOrder = await orderModel.query()
            //         .orderBy('id', 'desc')
            //         .first();

            //     if (lastOrder && lastOrder.delivery_id % 2 === 0) {
            //         delivery_id = 1;
            //     } else {
            //         delivery_id = 2;
            //     }
            // }