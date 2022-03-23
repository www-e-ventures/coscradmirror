import { render } from '@testing-library/react';

import VocabularyListIndex from './VocabularyListIndex';

// TODO Deal with mocking fetch
describe.skip('VocabularyListIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VocabularyListIndex />);
    expect(baseElement).toBeTruthy();
  });
});
