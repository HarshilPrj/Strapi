module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order/preTransaction",
      handler: "custom.preTransaction",
    },
    {
      method: "POST",
      path: "/order/postTransaction",
      handler: "custom.postTransaction",
    },
  ],
};
