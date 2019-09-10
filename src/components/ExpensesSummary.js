import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import expensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => (
  <div>
    <p>Viewing {props.expensesCount} {props.expensesCount === 1 ? 'expense' : 'expenses'} with total {numeral(props.expensesTotal / 100).format('$0,0.00')}</p>
  </div>
);

const mapStateToProps = (state) => ({
  expensesTotal: expensesTotal(getVisibleExpenses(state.expenses, state.filters)),
  expensesCount: getVisibleExpenses(state.expenses, state.filters).length
})

export default connect(mapStateToProps)(ExpensesSummary);