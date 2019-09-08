import React from 'react';
import { shallow } from 'enzyme';

import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, history, editExpense, removeExpense;

beforeEach(() => {
  history = { push: jest.fn() };
  editExpense = jest.fn();
  removeExpense = jest.fn();
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[0]}
      history={history}
      editExpense={editExpense}
      removeExpense={removeExpense}
    />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(wrapper).toMatchSnapshot();
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id ,expenses[0]);
});

test('should handle removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(wrapper).toMatchSnapshot();
  expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
})