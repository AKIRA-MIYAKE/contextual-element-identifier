import {
  takeMinHasId,
} from '../../src/identifier/converter';
import { UniqueKey } from '../../src/identifier/interfaces';

describe('identifier/converter', () => {
  describe('takeMinHasId()', () => {
    it('Should return miminum fragments that including id.', () => {
      const fragments = [
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

      const result = takeMinHasId(fragments);
      expect(result).toEqual([
        { nodeName: 'div', index: 0, hasSiblings: false, id: 'content', roles: [], classNames: [], depth: 4, uniqueKey: UniqueKey.Index },
        { nodeName: 'ul', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: ['list'], depth: 5, uniqueKey: UniqueKey.Index },
        { nodeName: 'li', index: 0, hasSiblings: true, id: undefined, roles: [], classNames: [], depth: 6, uniqueKey: UniqueKey.Index },
        { nodeName: 'a', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 7, uniqueKey: UniqueKey.Index },
        { nodeName: 'span', index: 0, hasSiblings: false, id: undefined, roles: [], classNames: [], depth: 8, uniqueKey: UniqueKey.Index },
      ]);
    });
  });
});