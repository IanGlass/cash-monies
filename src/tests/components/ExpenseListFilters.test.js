import React from 'react';
import { shallow } from 'enzyme';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />);
})

test('should render EventListFilters', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data', () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

// test('should handle text change', () => {
//   wrapper.find('input').simulate('change', {
//     target: {
//       value: 'rent'
//     }
//   });
//   expect(setTextFilter).toHaveBeenLastCalledWith({
//     target: {
//       value: 'rent'
//     }
//   });
// });
