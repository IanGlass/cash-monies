import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import expensesTotal from '../selectors/expenses-total';
import getVisibleExpenses from '../selectors/expenses';

export const ExpensesSummary = (props) => (
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">Viewing <span>{props.expensesCount}</span> {props.expensesCount === 1 ? 'expense' : 'expenses'} with total <span>{numeral(props.expensesTotal / 100).format('$0,0.00')}</span></h1>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  expensesTotal: expensesTotal(getVisibleExpenses(state.expenses, state.filters)),
  expensesCount: getVisibleExpenses(state.expenses, state.filters).length
})

export default connect(mapStateToProps)(ExpensesSummary);