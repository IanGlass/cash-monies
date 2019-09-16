import { addExpense, startAddExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import { SSL_OP_NETSCAPE_CA_DN_BUG } from 'constants';


const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {}
  // Firebase does not deal well with arrays, so create an object using ids as keys
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt }
  })
  database
    .ref('expenses')
    .set(expenseData)
    .then(() => {
      done();
    })
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      note: 'New note value'
    } 
  })
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
  })
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should set expenses', () => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses(expenses))
    .then(() => {
      const action = store.getActions();
      expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses: [expense[0]]
      });

      return database.ref('expenses').once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expense[0]);
      done()
    })
})