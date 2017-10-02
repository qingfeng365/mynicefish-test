import { MynicefishTestPage } from './app.po';

describe('mynicefish-test App', () => {
  let page: MynicefishTestPage;

  beforeEach(() => {
    page = new MynicefishTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
