export class validator {
  static validate(orderData) {
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error("Orden must have at least one item");
    }
  }
}