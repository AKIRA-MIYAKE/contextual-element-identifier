import {
  evaluateXPath,
} from '../../src/finder';

describe('finder', () => {
  document.body.innerHTML = `
    <div role="main">
      <div class="x y">
        <div id="content">
          <ul class="list">
            <li><a href="#"><span>a0</span></a></li>
            <li><a href="#"><span>a1</span></a></li>
            <li><a href="#"><span>a2</span></a></li>
          </ul>
          <ul class="list">
            <li><a href="#"><span>b0</span></a></li>
            <li><a href="#"><span>b1</span></a></li>
            <li><a href="#"><span>b2</span></a></li>
          </ul>
        </div>
      </div>
      <div id="otherContent">
        <div><a href="#"><span>c0</span></a></div>
        <div><a href="#"><span>c1</span></a></div>
      </div>
    </div>
  `;

  describe('evaluateXPath()', () => {
    it('Should return elements from absolute xpath.', () => {
      const xpath = '/html/body/div/div[1]/div/ul[1]/li[1]/a/span';
      const result = evaluateXPath(xpath);
      expect(result.length).toBe(1);
    });

    it('Should return elements from descendant xpath.', () => {
      const xpath = '//ul[1]/li[1]/a/span';
      const result = evaluateXPath(xpath);
      expect(result.length).toBe(1);
    });

    it('Should return elements with specified root.', () => {
      const xpath = `//li/a/span`;
      const root = document.querySelector('.list');
      const result = evaluateXPath(xpath, root);
      expect(result.length).toBe(3);
    });
  });
});