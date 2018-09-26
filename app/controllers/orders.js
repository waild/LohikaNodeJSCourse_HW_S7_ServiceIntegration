const orderService = require('../services/orderService');
const NotFoundError = require('../infrastracture/customErrors/notFoundError');

class Orders {
  static create(req, res) {
    orderService
      .create(req.body)
      .then((id) => {
        res.location(`/api/orders/${id}`);
        res.sendStatus(201);
      }).catch((err) => {
        if (err instanceof NotFoundError) {
          return res.status(404).json({ error: err.message });
        }
        return res.status(400).json({ error: err.message });
      });
  }

  static get(req, res) {
    orderService
      .get(req.params.order_id)
      .then((data) => {
        res.json(data);
      }).catch((err) => {
        if (err instanceof NotFoundError) {
          return res.status(404).json({ error: err.message });
        }
        return res.status(400).json({ error: err.message });
      });
  }
}
module.exports = Orders;
