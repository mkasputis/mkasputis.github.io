import React from 'react';
import { Provider } from 'react-redux'
import { render, fireEvent, waitForElement } from '@testing-library/react';

import App from '../App';
import store from '../../store'

describe('full app tests', () => {
  it('finds React in skills', async () => {
    const { container, getByText, getByTestId } = render(
      <Provider store={store}><App /></Provider>
    );
    fireEvent.click(getByText(/skills/i));
    const itemNode = await waitForElement(
      () => getByText(/javascript/i)
    );
    // moved React to nested list in Javascript
    //const { children } = itemNode.parentElement;
    const { children } = itemNode.children[0];
    const skills = [...children].map(child => child.textContent);
    expect(skills.includes('React')).toBe(true);
  });

  // TODO: finish test
  it.skip('loads rectangle from localStorage', async () => {
    const layerNames = [];
    // TODO: connect Provider to use store
    const { container, getByText, getByTestId } = render(<App/>);
    fireEvent.click(getByText(/mapping/i));
    // TODO: use @react-mock/localstorage to add shapes
    expect(layerNames).toEqual(expect.arrayContaining(['rectangle']));
  });
});

