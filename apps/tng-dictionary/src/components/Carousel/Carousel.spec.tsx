import { render } from '@testing-library/react';
import { Term } from '../TermsDetail/TermsDetail';

import Carousel from './Carousel';

const dummyTerms: Term[] = [{
  term: 'term 1',
  termEnglish: 'english term 1',
  audioURL: 'http://www.mysound.com/1',
  id: '312',
  contributor: 'John Doe'
},
{
  term: 'term 2 no english',
  audioURL: 'http://www.mysound.com/2',
  id: '313',
  contributor: 'Jane Deer'
},
{
  term: 'term 3 no audio',
  id: '314',
  contributor: 'Jane Deer'
}
]

describe('Carousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Carousel data={dummyTerms} />);
    expect(baseElement).toBeTruthy();
  });
});
