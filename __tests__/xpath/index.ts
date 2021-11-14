/**
 * @jest-environment jsdom
 */

import {
  toAbsoluteXPath,
  toUniqueXPath,
  toChromeLikeXPath,
  toSiblingsXPath,
} from '../../src/xpath';
import { UniqueKey } from '../../src/identifier/interfaces';

describe('xpath', () => {
  describe('toAbsoluteXPath()', () => {
    it('Should return absolute xpath.', () => {
      const identifier = {
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

      const result = toAbsoluteXPath(identifier);
      expect(result).toBe(`/html/body/div/div[1]/div/ul[1]/li[1]/a/span`);
    });
  });

  describe('toUniqueXPath()', () => {
    it('Should return unique xpath.', () => {
      const identifier = {
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

      const result = toUniqueXPath(identifier);
      expect(result).toBe(`//ul[1]/li[1]/a/span`);
    });
  });

  describe('toChromeLikeXPath()', () => {
    it('Should return chrome like xpath.', () => {
      const identifier = {
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

      const result = toChromeLikeXPath(identifier);
      expect(result).toBe(`//*[@id = 'content']/ul[1]/li[1]/a/span`);
    });
  });

  describe('toSiblingsXPath()', () => {
    it('Should return siblings xpath.', () => {
      const identifier = {
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

      const result = toSiblingsXPath(identifier);
      expect(result).toBe(`/html/body/div[contains(@role, 'main')]/div[contains(@class, 'x')]/div/ul[1]/li/a/span`);
    });
  });
});
