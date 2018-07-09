import { Btt } from '../src/index';

describe('btt', () => {
  it("Should return an instance", () => {
    const btt = new Btt({
      domain: '127.0.0.1',
      port: 8000,
      protocol: 'http',
      version: '2.525',
    });
    expect(btt).toBeInstanceOf(Btt);
  });
});