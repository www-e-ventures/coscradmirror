import { render } from '@testing-library/react';

import VocabularyListDetail from './VocabularyListDetail';

describe('VocabularyListDetail', () => {
  // TODO decide how to deal with `fetch` \ an `httpClient`
  it.skip('should render successfully', () => {
    const { baseElement } = render(<VocabularyListDetail />);
    expect(baseElement).toBeTruthy();
  });
});
