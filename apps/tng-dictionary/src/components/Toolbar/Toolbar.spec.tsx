import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Toolbar from './Toolbar';

describe('Toolbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Toolbar /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});
