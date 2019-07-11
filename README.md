# contextual-element-identifier
Library of context-based element identification and search

# Setup

```
$ npm install contextual-element-identifier
```

# Concept and Usage
This library aims to uniquely identify HTML elements on web pages and web applications based on context.  
The library generates an xpath based on the identifier and gets an element.  
For example, even if the target page changes while scraping, you can get the target element.  


## `ElementIdentifier` Creation

### `identifierFromElement()`

```
export const identifierFromElement = (
  element: Element,
  ignoreClassNames: string[] = [],
  document: Document = window.document
): ElementIdentifier
```

`ElementIdentifier` is a pure object and can be easily serialized.  
`ignoreClassNames` is a class name that ignores its existence when identifying an element. For example, if you set `active`, the library does not distinguish between elements with and without.  

## Find elements from `ElementIdentifier`

### `getElement()`

```
export const getElement = (
  identifier: ElementIdentifier,
  document: Document = window.document
): Element | undefined
```

Gets an element that exactly matches the `ElementIdentifier`. If it does not exist, it returns undefined.  

### `findElements()`

```
export const findElements = (
  identifier: ElementIdentifier,
  document: Document = window.document
): Element[]
```

Acquires the target element or its candidate based on ElementIdentifier.  

### `findElementsWithPredicate()`

```
export const findElementsWithPredicate = (
  identifier: ElementIdentifier,
  predicate: (element: Element) => boolean,
  document: Document = window.document
): Element[] 
```

The basic behavior is the same as for `findElements()`.  
You can filter target elements by predicate.  

## Get siblings elements from `ElementIdentifier`

### `getSiblingsElements()`

```
export const getSiblingsElements = (
  identifier: ElementIdentifier | ElementIdentifier[],
  document: Document = window.document
): Element[]
```

Gets sibling elements of one or more ElementIdentifiers.  
If the repeating element is the target element (such as `li`, `td`, etc...), that condition takes precedence.  
If multiple ElementIdentifiers are given, behavior will be to exclude different conditions based on the first ElementIdentifiers.  

### `getMultipleSiblingsElements()`

```
export const getMultipleSiblingsElements = (
  identifiers: ElementIdentifier[][],
  document: Document = window.document
): (Element | undefined)[][]
```

Get sibling elements of multiple elements based on whether they belong to the same ancestor element. If there is no sibling element in the ancestor element, undefined is inserted.  
If there is no common ancestor, returns the result of `getSiblingsElements()` for each.  

### `evaluateXPath()`

```
export const evaluateXPath = (
  xpath: string,
  root: Node = window.document,
  document: Document = window.document
): Element[]
```

Performs an xpath expression.  