import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

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
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
            className="modal"
            contentLabel="Confirm Remove Expense"
          >
            <p>Are you sure?</p>
            <div className="button--group">
              <button className="button" onClick={this.removeExpense}>Yes</button>
              <button className="button" onClick={this.closeModal}>No</button>
            </div>
          </Modal>
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
