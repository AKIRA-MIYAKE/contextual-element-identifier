import {
  siblingsFragmentsFromFragments,
  siblingsFragmentsFromSameDepthIdentifiers,
  siblingsFragmentsFromDifferentDepthIdentifiers,
} from '../../src/identifier/siblings';
import { UniqueKey } from '../../src/identifier/interfaces';

describe('identifier/siblings', () => {
  describe('siblingsFragmentsFromFragments()', () => {
    it('Should return siblings fragmetns from list item fragmetns.', () => {
      const fragmetns = [
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'ul', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'li', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ];

      const result = siblingsFragmentsFromFragments(fragmetns);
      expect(result).toEqual([
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'ul', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'li', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });

    it('Should return siblings fragmetns from table cell item fragmetns.', () => {
      const fragmetns = [
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'table', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'tbody', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'tr', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'td', index: 3, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ];

      const result = siblingsFragmentsFromFragments(fragmetns);
      expect(result).toEqual([
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'table', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'tbody', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'tr', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'td', index: 3, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });

    it('Should return siblings fragmetns from fragments that not including repeating element.', () => {
      const fragmetns = [
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ];

      const result = siblingsFragmentsFromFragments(fragmetns);
      expect(result).toEqual([
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });
  });

  describe('siblingsFragmentsFromSameDepthIdentifiers()', () => {
    it('Shoud return siblings fragmetns', () => {
      const identifier0 = {
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
      };

      const identifier1 = {
        absolute: [
          { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
          { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
          { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
          { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
          { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
          { nodeName: 'ul', index: 1, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'li', index: 1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
        ],
        unique: [
          { nodeName: 'ul', index: 1, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'li', index: 1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
        ]
      };

      const result = siblingsFragmentsFromSameDepthIdentifiers(identifier0, [identifier1]);
      expect(result).toEqual([
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['x'], depth: 3, uniqueKey: UniqueKey.ClassName },
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'ul', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'li', index: -1, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });
  });

  describe('siblingsFragmentsFromDifferentDepthIdentifiers()', () => {
    it('Shoud return siblings fragmetns', () => {
      const identifier0 = {
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
      };

      const identifier1 = {
        absolute: [
          { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
          { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
          { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
          { nodeName: 'div', index: 1, hasSiblings: true, id: 'otherContent', roles: [], classNames: [], depth: 3, uniqueKey: UniqueKey.Index },
          { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        ],
        unique: [
          { nodeName: 'div', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
          { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 5, uniqueKey: UniqueKey.Index },
          { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        ]
      };

      const result = siblingsFragmentsFromDifferentDepthIdentifiers(identifier0, [identifier1]);
      expect(result).toEqual([
        { nodeName: 'html', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 0, uniqueKey: UniqueKey.Index },
        { nodeName: 'body', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 1, uniqueKey: UniqueKey.Index },
        { nodeName: 'div', index: 0, hasSiblings: false, id: undefined, roles: ['main'], classNames: [], depth: 2, uniqueKey: UniqueKey.Role },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });
  });
});