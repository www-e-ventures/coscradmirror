import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AllEntities from './AllEntities';

describe('AllEntities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><AllEntities /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});
