import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import ExpensesForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpensesForm />);
  expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseForm with expense data', () => {
  const wrapper = shallow(<ExpensesForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot(); 
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpensesForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpensesForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value: value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on input change', () => {
  const value = 'New note';
  const wrapper = shallow(<ExpensesForm />);
  wrapper.find('textarea').simulate('change', {
    target: { value: value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount on input change', () => {
  const value = '10099';
  const wrapper = shallow(<ExpensesForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value: value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on input change with invalid input', () => {
  const value = '$500';
  const wrapper = shallow(<ExpensesForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value: value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should set expense state on submit', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ExpensesForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].notes,
    createdAt: expenses[0].createdAt
  });
});

test('should set new date on date change', () => {
  const date = moment();
  const wrapper = shallow(<ExpensesForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(date);
  expect(wrapper.state('createdAt')).toEqual(date);
});

test('should set calendar focused on change', () => {
  const wrapper = shallow(<ExpensesForm />);
  expect(wrapper.state('calendarFocused')).toEqual(false);
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true });
  expect(wrapper.state('calendarFocused')).toEqual(true);
});


