/**
 * @jest-environment jsdom
 */

import fs from 'fs';
import path from 'path';

import {
  identifierFromElement,
  getElement,
  getMultipleSiblingsElements,
} from '../../src';

describe('integrationo/blog', () => {
  document.body.outerHTML = fs.readFileSync(path.resolve(__dirname, './blog.txt'), 'utf-8');

  describe('Create identifier and get element.', () => {
    it('Should get first post title.', () => {
      const element = document.querySelector(':nth-child(1) > .blog-entry > .text > .heading > a');
      const identifier = identifierFromElement(element);
      const result = getElement(identifier);
      expect(result).toEqual(element);
    });

    it('Shoud get first post description.', () => {
      const element = document.querySelector(':nth-child(1) > .blog-entry > .text > :nth-child(3)');
      const identifier = identifierFromElement(element);
      const result = getElement(identifier);
      expect(result).toEqual(element);
    });

    it('Shoud get first post date.', () => {
      const element = document.querySelector(':nth-child(1) > .blog-entry > .text > .meta > :nth-child(1) > a');
      const identifier = identifierFromElement(element);
      const result = getElement(identifier);
      expect(result).toEqual(element);
    });
  });

  describe('Get multiple siblings elements.', () => {
    it('Should get post data.', () => {
      const titleElement = document.querySelector(':nth-child(1) > .blog-entry > .text > .heading > a');
      const titleIdentifier = identifierFromElement(titleElement);
      const descriptionElement0 = document.querySelector(':nth-child(1) > .blog-entry > .text > :nth-child(3)');
      const descriptionIdentifier0 = identifierFromElement(descriptionElement0);
      const descriptionElement1 = document.querySelector(':nth-child(2) > .blog-entry > .text > :nth-child(3)');
      const descriptionIdentifier1 = identifierFromElement(descriptionElement1);
      const dateElement = document.querySelector(':nth-child(1) > .blog-entry > .text > .meta > :nth-child(1) > a');
      const dateIdentfier = identifierFromElement(dateElement);

      const result = getMultipleSiblingsElements([[titleIdentifier], [descriptionIdentifier0, descriptionIdentifier1], [dateIdentfier]]);
      expect(result.length).toBe(3);
      expect(result[0].length).toBe(5);
      expect(result[1].length).toBe(5);
      expect(result[1].length).toBe(5);
      result.forEach(r => {
        r.forEach(e => expect(e).toBeDefined());
      });
    });
  });
});
