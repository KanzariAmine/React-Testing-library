import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/Button';
import {render, cleanup, fireEvent} from '@testing-library/react'
import "@testing-library/jest-dom";
// import renderer from 'react-test-renderer';

//Clean the dom tree after every test.
afterEach(cleanup);

/**Check if the component render witout any problem */
it('Should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button></Button>, div);
  ReactDOM.unmountComponentAtNode(div);
});

/**Check if the button render with the correct label(click me please) */
it('Should renders Button correctly', () => {
  const {getByTestId} = render(<Button label='click me please'></Button>)
  expect(getByTestId('button')).toHaveTextContent("click me please")
});

/**Check if the button render with the correct label(save).
 * We make the some test just for testing the cleanup, 
 * without cleanup you have error when you run the test
 */
it('Should renders Button correctly (save)', () => {
  const {getByTestId} = render(<Button label='save'></Button>)
  expect(getByTestId('button')).toHaveTextContent("save")
});

/**Create snapshot for component. */
it('Should matches snapshot', () => {
  const tree = render(<Button label="save"></Button>);
  expect(tree).toMatchSnapshot();
});

it('Should catsh the click event', () => {
  const handleClick = jest.fn(); 
  
  const {getByTestId} = render(<Button lable='save' onClick={handleClick}></Button>)
  const node = getByTestId('button');
  fireEvent(node, new MouseEvent('click', {bubbles: true, cancelable: true}))
  
});
