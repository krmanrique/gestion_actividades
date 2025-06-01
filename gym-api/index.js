import { validator } from "./services/validator.js";
import { calculator } from "./services/calculator.js";
import { FileSaver } from "./services/filesaver.js";
import { EmailNotifier } from "./services/EmailNotifier.js";
import { SmsNotifier } from "./services/smsnotifier.js";

class OrderProcessor {
  constructor(orderData, saver, notifier) {
    this.orderData = orderData;
    this.saver = saver;
    this.notifier = notifier;
  }

  processOrder() {
    validator.validate(this.orderData);
    const total = calculator.calculateTotal(this.orderData);
    this.saver.save(this.orderData);
    this.notifier.notify(this.orderData.customerContact);
    return total;
  }
}

// Datos de ejemplo
const orderData = {
  customerContact: "user@example.com",
  items: [
    { name: "Laptop", price: 1200, quantity: 1 },
    { name: "Mouse", price: 25, quantity: 2 },
  ],
};

const orderData1 = {
  customerContact: "123",
  items: [
    { name: "balon", price: 12, quantity: 1 },
    { name: "raqueta", price: 5, quantity: 2 },
  ],
};

const processor = new OrderProcessor(
  orderData,
  new FileSaver(),
  new EmailNotifier()
);

const processor1 = new OrderProcessor(
  orderData1,
  new FileSaver(),
  new SmsNotifier()
);

console.log("Total:", processor.processOrder());
console.log("Total:", processor1.processOrder());
