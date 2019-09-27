import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationModal from '../../components/ConfirmationModal';

let wrapper, closeModal, confirmAction

beforeEach(() => {
  closeModal = jest.fn();
  confirmAction = jest.fn();
  wrapper = shallow(<ConfirmationModal closeModal={closeModal} confirmAction={confirmAction} />)
});

test('should render ConfirmationModal', () => {
  expect(wrapper).toMatchSnapshot();
});
