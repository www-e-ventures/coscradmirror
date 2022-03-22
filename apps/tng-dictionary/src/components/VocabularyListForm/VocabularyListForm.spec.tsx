import { render } from '@testing-library/react';

import VocabularyListForm, { VocabularyListFormElement } from './VocabularyListForm';

const dummyCheckbox: VocabularyListFormElement = {
  type: 'checkbox',
  name: 'the checkbox',
  validValues: [{
    display: 'Usually',
    value: true
  },{
    display: 'standard (non-usitative) form',
    value: false
  }]
};

const dummyDropbox: VocabularyListFormElement = {
  type: 'dropbox',
  name: 'my dropbox',
  validValues: [{
    display: 'I',
    value: '11'
  },{
    display: 'You',
    value: '21'
  },{
    display: 'She, he, or it',
    value: '31'
  }]
}

const dummyFormItems: VocabularyListFormElement[] = [
  dummyCheckbox,
  dummyDropbox
]

describe('VocabularyListForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VocabularyListForm formItems={dummyFormItems}/>);
    expect(baseElement).toBeTruthy();
  });
});
