import React from 'react';
import { shallow } from 'enzyme';
import numeral from 'numeral';

import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary with no expenses', () => {
  const wrapper = shallow(<ExpensesSummary />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary with expenses summary', () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={50199} />);
  expect(wrapper).toMatchSnapshot();
})