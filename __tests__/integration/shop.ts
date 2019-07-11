import fs from 'fs';
import path from 'path';

import {
  identifierFromElement,
  getElement,
  findElements,
  findElementsWithPredicate,
  getMultipleSiblingsElements,
} from '../../src';

describe('integrationo/shop', () => {
  document.body.outerHTML = fs.readFileSync(path.resolve(__dirname, './shop.txt'), 'utf-8');
  const nextPageLinkIdentifier = require('./shop-next-link.json');

  describe('Create identifier and get element.', () => {
    it('Should get first product name.', () => {
      const element = document.querySelector(':nth-child(1) > .product > .text > h3 > a');
      const identifier = identifierFromElement(element);
      const result = getElement(identifier);
      expect(result).toEqual(element);
    });

    it('Shoud get first product price.', () => {
      const element = document.querySelector(':nth-child(1) > .product > .text > .pricing > .price > span');
      const identifier = identifierFromElement(element);
      const result = getElement(identifier);
      expect(result).toEqual(element);
    });
  });

  describe('Find elements from serialized identifier.', () => {
    it('Should find next link element of pagenation.', () => {
      const result = findElements(nextPageLinkIdentifier);
      expect(result.length).toBe(1);
      expect(result[0].nodeType).toBe(Node.ELEMENT_NODE);
      expect(result[0].textContent).toBe('>');
    });

    it('Should find next link element of pagenation with predicate.', () => {
      const result = findElementsWithPredicate(nextPageLinkIdentifier, e => e.textContent === '>');
      expect(result.length).toBe(1);
      expect(result[0].nodeType).toBe(Node.ELEMENT_NODE);
      expect(result[0].textContent).toBe('>');
    });
  });

  describe('Get multiple siblings elements.', () => {
    it('Should get product names and prices.', () => {
      const nameElement = document.querySelector(':nth-child(1) > .product > .text > h3 > a');
      const nameIdentifier = identifierFromElement(nameElement);
      const priceElement0 = document.querySelector(':nth-child(1) > .product > .text > .pricing > .price > span');
      const priceIdentifier0 = identifierFromElement(priceElement0);
      const priceElement1 = document.querySelector(':nth-child(2) > .product > .text > .pricing > .price > .price-sale');
      const priceIdentifier1 = identifierFromElement(priceElement1);

      const result = getMultipleSiblingsElements([[nameIdentifier], [priceIdentifier0, priceIdentifier1]]);
      expect(result.length).toBe(2);
      expect(result[0].length).toBe(8);
      expect(result[1].length).toBe(8);
      result.forEach(r => {
        r.forEach(e => expect(e).toBeDefined());
      });
    });
  });
});