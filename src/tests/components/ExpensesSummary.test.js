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
  const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={numeral(50199 / 100).format('$0,0.00')} />);
  console.log(wrapper.debug());
})