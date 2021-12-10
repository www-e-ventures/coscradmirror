export default (test: unknown): test is string =>
  typeof test === 'string' && test.length > 0;
