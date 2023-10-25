module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order/preTransaction",
      handler: "custom.preTransaction",
    },
    {
      method: "GET",
      path: "/order/postTransaction",
      handler: "custom.postTransaction",
    },
  ],
};
