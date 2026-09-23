function isValidQuantity(quantity) {
  return quantity > 0 && quantity <= 20;
}

function calculateTicketPrice(quantity, basePrice, isVIP) {
  let total = quantity * basePrice;
  if (quantity >= 5) {
    total = total * 0.9; 
  }
  if (isVIP) {
    total = total * 1.5; 
  }
  total = total - 10; 
  return Math.round(total);
}

module.exports = { isValidQuantity, calculateTicketPrice };