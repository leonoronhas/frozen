const { handleOrders } = require("./utils/helpers");

const placeOrders = () => {
  handleOrders();
};

// Run every 5 minutes
const runPlaceOrdersEveryFiveMinutes = setInterval(() => {
  placeOrders();

  // import orders function here
}, 30000); // 5 minutes in milliseconds

// clearInterval(runPlaceOrdersEveryFiveMinutes)