import moment from 'moment';

const expenses = [
  {
    id: '1',
    description: 'Rent',
    amount: 109500,
    createdAt: 0
  },
  {
    id: '2',
    description: 'Gas',
    amount: 205120,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: 3,
    description: 'Petrol',
    amount: 520,
    createdAt: moment(0).add(4, 'days').valueOf(0)
  }
]

export default expenses;