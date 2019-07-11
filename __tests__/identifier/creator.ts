import {
  identifierFromElement,
  fragmentsFromElement,
} from '../../src/identifier/creator';
import { UniqueKey } from '../../src/identifier/interfaces';

describe('identifier/creation', () => {
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

  describe('identifierFromElement()', () => {
    it('Shoud return element identifier.', () => {
      const element0 = document.querySelector('#content > :nth-child(1) > :nth-child(1) > a > span');
      const result0 = identifierFromElement(element0, ['y']);
      expect(result0).toEqual({
        absolute: [
          { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
          { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
          { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
          { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
          { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
          { nodeName: 'ul', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'li', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
        ],
        unique: [
          { nodeName: 'ul', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'li', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
        ],
      });

      const element1 = document.querySelector('#otherContent > :nth-child(2) > a > span');
      const result1 = identifierFromElement(element1, ['y']);
      expect(result1).toEqual({
        absolute: [
          { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
          { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
          { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
          { nodeName: 'div', index: 1, hasSiblings: true, id: 'otherContent', roles: [], classNames: [], depth: 3, uniqueKey: UniqueKey.Index },
          { nodeName: 'div', index: 1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        ],
        unique: [
          { nodeName: 'div', index: 1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 4, uniqueKey: 'index' },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 5, uniqueKey: 'index' },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: 'index' },
        ],
      });
    });
  });

  describe('fragmetnsFromElement()', () => {
    it('Should return element fragments.', () => {
      const element = document.querySelector('#content > :nth-child(1) > :nth-child(1) > a > span');
      const result = fragmentsFromElement(element, ['y']);
      expect(result).toEqual([
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'ul', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'li', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });
  });
});