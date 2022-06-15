import { format } from "date-fns";
class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  get readableDate() {
    return format(this.date, "dd MMMM yyyy, hh:mm");
  }
}

export default Order;
