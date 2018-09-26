
module.exports = {
  orderSchema: {
    type: 'object',
    properties: {
      meals: {
        type: 'array',
        minItems: 1,
        items: { type: 'string' },
      },
    },
  },
};
