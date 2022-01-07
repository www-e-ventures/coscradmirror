import { render } from '@testing-library/react';

import VocabularyListIndex from './VocabularyListIndex';

describe('VocabularyListIndex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VocabularyListIndex />);
    expect(baseElement).toBeTruthy();
  });
});
