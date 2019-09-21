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

test('should execute confirmAction in ConfirmationModal', () => {
  wrapper.find('button').first().simulate('click');
  expect(confirmAction).toHaveBeenCalled();
})

test('should close ConfirmationModal', () => {
  wrapper.find('button').last().simulate('click');
  expect(closeModal).toHaveBeenCalled();
});