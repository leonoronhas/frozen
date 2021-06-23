const { orders } = require("../data/orders");

const { TWENTY_FOUR_HOUR_HOLD_TAG, CONTACT_CUSTOMER } = require("./tags");

const checkIfLongtimeCustomer = (customerName) => {
  // Add longtime customers to the set or load it from file
  let longtimeCustomers = new Set();
  longtimeCustomers.add("Bruce Wayne");

  return longtimeCustomers.has(customerName);
};

const checkIfOutOfStockSKU = (sku) => {
  let outOfStockSKUs = new Set();
  outOfStockSKUs.add("666555");

  return outOfStockSKUs.has(sku);
};

const checkOrderTag = (tag) => {
  if (tag === TWENTY_FOUR_HOUR_HOLD_TAG) {
    return true;
  } else {
    return false;
  }
};

// TASK 2
const checkState = (state) => {
  // Default States that should ship from Rexburg Warehouse
  let states = new Set();
  states.add("WA");
  states.add("OR");
  states.add("CA");
  states.add("NV");
  states.add("AZ");
  states.add("UT");
  states.add("CO");
  states.add("WY");
  states.add("ID");
  states.add("MT");
  states.add("HI");
  states.add("AK");

  if (states.has(state)) {
    return true;
  } else {
    false;
  }
};

const handleOrders = () => {
  orders.map((order, index) => {
    if (checkIfLongtimeCustomer(order.name)) {
      // SINCE WE ARE RUNNING THE FUNCTION EVERY 5 MINUTES DO WE WANT TO KEEP DEDUCTING $25 FROM THE CUSTOMER?
      order.total -= 25;
    }

    // Check if out of stock
    orders[index].SKUs.map((sku) => {
      if (checkIfOutOfStockSKU(sku)) {
        orders[index].tags.push(CONTACT_CUSTOMER);
      }
    });

    orders[index].tags.map((tag, tagIndex) => {
      if (checkOrderTag(tag)) {
        // Do not import order
        orders.splice(index, 1); // Not sure if this will work but this is how you remove an item from array
      }
    });
  });

  return orders;
};

// TASK 2
const checkWhichUploadOrderPlatform = () => {
  let orders = []; // orders from DB;
  let inventory = []; // inventory from DB

  orders.map((order) => {
    // Check by state, SKU, and quantity available
    if (
      checkState(order.Location) &&
      order.SKU.includes("-SQ") &&
      order.Quantity <= inventory.Rexburg
    ) {
      uploadToShipstation(order);
    }
    // Same case as first if, without having available inventory in Rexburg
    else if (
      checkState(order.Location) &&
      order.SKU.includes("-SQ") &&
      order.Quantity > inventory.Rexburg
    ) {
      uploadToBFW(order);
    }
    // Order is not from default Rexburg states and does not include -SQ,
    // but Rexburg does not have inventory
    else if (
      !checkState(order.Location) &&
      !order.SKU.includes("-SQ") &&
      order.Quantity > inventory.Missouri
    ) {
      uploadToShipstation(order);
    } else {
      uploadToBFW(order);
    }
  });
};

module.exports = { handleOrders, checkWhichUploadOrderPlatform };
