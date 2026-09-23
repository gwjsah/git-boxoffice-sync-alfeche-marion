function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice, isVIP) {
  let total = quantity * basePrice;
  if (isVIP) {
    total = total * 1.5; 
  }
  return Math.floor(total);
}

module.exports = { isValidQuantity, calculateTicketPrice };
