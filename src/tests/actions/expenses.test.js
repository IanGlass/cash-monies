import { addExpense, startAddExpense, editExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';


const uid = 'thisisatestuid';
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expenseData = {}
  // Firebase does not deal well with arrays, so create an object using ids as keys
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt }
  })
  database
    .ref(`users/${uid}/expenses`)
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
});

test('should remove an expense from firebase', (done) => {
  const store = createMockStore({ auth: { uid }});
  store.dispatch(startRemoveExpense(expenses[0]))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
      })

      return database.ref(`users/${uid}/expenses/${expenses[0].id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.exportVal()).toBeFalsy();
      done();
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

test('should edit an expense from firebase', (done) => {
  const store = createMockStore({ auth: { uid }});
  const updatedNote = 'This is an updated note';
  const id = expenses[0].id
  store.dispatch(startEditExpense(id, {
    note: updatedNote
  }))
  .then(() => {
    const action = store.getActions();
    expect(action[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates: {
        note: updatedNote
      }
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.exportVal().note).toEqual(updatedNote);
    done();
  })
  .catch((error) => {
    console.log(error);
  })
})

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
  })
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({ auth: { uid }});
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

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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

test('should fetch the expenses from firebase', () => {
  const store = createMockStore({ auth: { uid }});
  store.dispatch(startSetExpenses())
    .then(() => {

      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
})