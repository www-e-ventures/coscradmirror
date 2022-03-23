import { render } from '@testing-library/react';

import TermData, { Term } from './Term';

describe('Term', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Term />);
    expect(baseElement).toBeTruthy();
  });
});
