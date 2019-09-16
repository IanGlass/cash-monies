import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'Rent',
    amount: 109500,
    createdAt: 0,
    note: ''
  },
  {
    id: '2',
    description: 'Gas',
    amount: 205120,
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    note: ''
  },
  {
    id: 3,
    description: 'Petrol',
    amount: 520,
    createdAt: moment(0).add(4, 'days').valueOf(0),
    note: ''
  }
]

export default expenses;