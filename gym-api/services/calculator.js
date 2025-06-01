export class calculator {
  static calculateTotal(orderData) {
    return orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}