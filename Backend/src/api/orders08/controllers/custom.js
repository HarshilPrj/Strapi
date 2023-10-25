// @ts-nocheck
const { createCoreController } = require("@strapi/strapi").factories;
const https = require("https");
const PaytmChecksum = require("paytmchecksum");

module.exports = createCoreController(
  "api::orders08.orders08",
  ({ strapi }) => ({
    async preTransaction(ctx) {
      /*
       * import checksum generation utility
       * You can get this utility from https://developer.paytm.com/docs/checksum/
       */

      let paytmParams = {};
      let params = ctx.request.body;

      const entry = await strapi.entityService.create(
        "api::orders08.orders08",
        {
          data: {
            email: params.email,
            orderId: params.orderId,
            payment_info: params.payment_info,
            products: params.products,
            address: params.address,
            name: params.name,
            transections_id: params.transections_id,
            amount: params.amount,
            status: params.status,
          },
        }
      );

      paytmParams.body = {
        requestType: "Payment",
        OBJID: entry.id,
        mid: process.env.MID,
        websiteName: "YOUR_WEBSITE_NAME",
        orderId: ctx.request.body.orderId,
        callbackUrl: "http://localhost:1337/api/order/postTransaction",
        txnAmount: {
          value: ctx.request.body.amount,
          currency: "INR",
        },
        userInfo: {
          custId: "CUST_001",
        },
      };

      /*
       * Generate checksum by parameters we have in body
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */

      try {
        let checksum = await PaytmChecksum.generateSignature(
          JSON.stringify(paytmParams.body),
          process.env.MKEY
        );

        paytmParams.head = {
          signature: checksum,
        };
      } catch (error) {
        ctx.status = 400;
        return ctx.response.body({
          message: "Invalid Merchant Signature",
          error: error.message,
          stack: error.stack,
        });
      }

      var post_data = JSON.stringify(paytmParams);

      const getToken = () => {
        return new Promise((resolve, reject) => {
          var options = {
            /* for Staging */
            // hostname: "securegw-stage.paytm.in"
            /* for Production */
            hostname: "securegw.paytm.in",
            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${ctx.request.body.orderId}`,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };

          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });

            post_res.on("end", function () {
              console.log("Response: ", response);
              resolve(response);
            });
          });

          post_req.write(post_data);
          post_req.end();
        });
      };

      let res = await getToken();
      ctx.send(JSON.parse(res));
    },

    async postTransaction(ctx) {
      try {
        let params = ctx.request.body;
        console.log(params);

        // const entries = await strapi.entityService.findMany(
        //   "api::orders08.orders08",
        //   {
        //     fields: ["id"],
        //     filters: { orderId: params.ORDERID },
        //   }
        // );

        // const id = entries[0].id;

        // await strapi.entityService.update("api::orders08.orders08", id, {
        //   data: {
        //     transections_id: params.TXNID,
        //     payment_info: params,
        //     status: params.STATUS,
        //   },
        // });

        ctx.redirect("http://localhost:3000/success");
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: error.message, stack: error.stack };
      }
    },
  })
);
