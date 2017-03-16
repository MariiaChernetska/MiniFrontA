import { MiniUtubePage } from './app.po';

describe('mini-utube App', function() {
  let page: MiniUtubePage;

  beforeEach(() => {
    page = new MiniUtubePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
