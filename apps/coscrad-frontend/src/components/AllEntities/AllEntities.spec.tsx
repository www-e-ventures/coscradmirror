import { render } from '@testing-library/react';

import AllEntities from './AllEntities';

describe('AllEntities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AllEntities />);
    expect(baseElement).toBeTruthy();
  });
});
