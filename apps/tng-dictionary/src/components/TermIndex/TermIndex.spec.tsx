import { render } from '@testing-library/react';

import TermIndex from './TermIndex';

describe('TermIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TermIndex />);
    expect(baseElement).toBeTruthy();
  });
});
