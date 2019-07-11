"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  identifierFromElement: true,
  toAbsoluteXPath: true,
  toUniqueXPath: true,
  toChromeLikeXPath: true,
  toSiblingsXPath: true,
  getElement: true,
  findElements: true,
  findElementsWithPredicate: true,
  getSiblingsElements: true,
  getMultipleSiblingsElements: true,
  evaluateXPath: true
};
Object.defineProperty(exports, "identifierFromElement", {
  enumerable: true,
  get: function get() {
    return _creator.identifierFromElement;
  }
});
Object.defineProperty(exports, "toAbsoluteXPath", {
  enumerable: true,
  get: function get() {
    return _xpath.toAbsoluteXPath;
  }
});
Object.defineProperty(exports, "toUniqueXPath", {
  enumerable: true,
  get: function get() {
    return _xpath.toUniqueXPath;
  }
});
Object.defineProperty(exports, "toChromeLikeXPath", {
  enumerable: true,
  get: function get() {
    return _xpath.toChromeLikeXPath;
  }
});
Object.defineProperty(exports, "toSiblingsXPath", {
  enumerable: true,
  get: function get() {
    return _xpath.toSiblingsXPath;
  }
});
Object.defineProperty(exports, "getElement", {
  enumerable: true,
  get: function get() {
    return _finder.getElement;
  }
});
Object.defineProperty(exports, "findElements", {
  enumerable: true,
  get: function get() {
    return _finder.findElements;
  }
});
Object.defineProperty(exports, "findElementsWithPredicate", {
  enumerable: true,
  get: function get() {
    return _finder.findElementsWithPredicate;
  }
});
Object.defineProperty(exports, "getSiblingsElements", {
  enumerable: true,
  get: function get() {
    return _finder.getSiblingsElements;
  }
});
Object.defineProperty(exports, "getMultipleSiblingsElements", {
  enumerable: true,
  get: function get() {
    return _finder.getMultipleSiblingsElements;
  }
});
Object.defineProperty(exports, "evaluateXPath", {
  enumerable: true,
  get: function get() {
    return _finder.evaluateXPath;
  }
});

var _interfaces = require("./identifier/interfaces");

Object.keys(_interfaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interfaces[key];
    }
  });
});

var _creator = require("./identifier/creator");

var _xpath = require("./xpath");

var _finder = require("./finder");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7O0FBQ0E7O0FBTUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgKiBmcm9tICcuL2lkZW50aWZpZXIvaW50ZXJmYWNlcyc7XG5leHBvcnQgeyBpZGVudGlmaWVyRnJvbUVsZW1lbnQgfSBmcm9tICcuL2lkZW50aWZpZXIvY3JlYXRvcic7XG5leHBvcnQge1xuICB0b0Fic29sdXRlWFBhdGgsXG4gIHRvVW5pcXVlWFBhdGgsXG4gIHRvQ2hyb21lTGlrZVhQYXRoLFxuICB0b1NpYmxpbmdzWFBhdGhcbn0gZnJvbSAnLi94cGF0aCc7XG5leHBvcnQgeyBcbiAgZ2V0RWxlbWVudCxcbiAgZmluZEVsZW1lbnRzLFxuICBmaW5kRWxlbWVudHNXaXRoUHJlZGljYXRlLFxuICBnZXRTaWJsaW5nc0VsZW1lbnRzLFxuICBnZXRNdWx0aXBsZVNpYmxpbmdzRWxlbWVudHMsXG4gIGV2YWx1YXRlWFBhdGhcbn0gZnJvbSAnLi9maW5kZXInOyJdfQ==