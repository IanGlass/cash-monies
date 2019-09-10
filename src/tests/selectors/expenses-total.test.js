import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 for no expenses', () => {
  const total = getExpensesTotal();
  expect(total).toEqual(0);
});

test('should correctly add up a single expense', () => {
  const total = getExpensesTotal(expenses[0]);
  expect(total).toEqual(expenses[0].amount);
})

test('should correctly add up multiple expenses', () => {
  const total = getExpensesTotal(expenses);
  expect(total).toEqual(expenses[0].amount + expenses[1].amount + expenses[2].amount);
})