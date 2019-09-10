import { isObject } from "util";


export default (expenses) => {
  if (!expenses) {
    return 0;
  }
  if (expenses.amount) { 
    return expenses.amount;
  }
  const total = expenses.reduce((memo, expense) => memo + expense.amount, 0);
  return total;
}