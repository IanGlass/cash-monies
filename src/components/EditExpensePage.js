import React from 'react';
import { connect } from 'react-redux';
import ConfirmationModal from './ConfirmationModal';
import Dialog from '@material-ui/core/Dialog';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
    }
  }
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }
  removeExpense = () => {
    this.closeModal();
    this.props.startRemoveExpense(this.props.expense.id);
    this.props.history.push('/');
  }
  openModal = () => {
    this.setState(() => ({
      showModal: true
    }));
  }
  closeModal = () => {
    this.setState(() => ({
      showModal: false
    }));
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary"
            onClick={this.openModal}
          >Remove Expense</button>
          <ConfirmationModal
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            closeLabel="No"
            confirmLabel="Yes"
            message={"Are you sure you want to remove " + this.props.expense.description + "?"}
            confirmAction={this.removeExpense}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (id) => dispatch(startRemoveExpense({ id }))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
