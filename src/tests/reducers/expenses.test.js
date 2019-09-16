import expensesReducer from '../../reducers/expenses';

import expenses from '../fixtures/expenses';

test('should setup default expenses values', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
})

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expense if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
})

test('should add an expense', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expense: expenses[0]
  }
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([expenses[0]])
})

test('should edit an expense by id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      description: 'Not Rent'
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state[0].description).toEqual('Not Rent');
})

test('should not edit expense if id not found', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      description: 'I should not change'
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses
  }
  const state = expensesReducer(null, action);
  expect(state).toEqual(expenses);
})