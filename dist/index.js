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
  if (key in exports && exports[key] === _interfaces[key]) return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTs7QUFDQTs7QUFNQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGZyb20gJy4vaWRlbnRpZmllci9pbnRlcmZhY2VzJztcbmV4cG9ydCB7IGlkZW50aWZpZXJGcm9tRWxlbWVudCB9IGZyb20gJy4vaWRlbnRpZmllci9jcmVhdG9yJztcbmV4cG9ydCB7XG4gIHRvQWJzb2x1dGVYUGF0aCxcbiAgdG9VbmlxdWVYUGF0aCxcbiAgdG9DaHJvbWVMaWtlWFBhdGgsXG4gIHRvU2libGluZ3NYUGF0aFxufSBmcm9tICcuL3hwYXRoJztcbmV4cG9ydCB7IFxuICBnZXRFbGVtZW50LFxuICBmaW5kRWxlbWVudHMsXG4gIGZpbmRFbGVtZW50c1dpdGhQcmVkaWNhdGUsXG4gIGdldFNpYmxpbmdzRWxlbWVudHMsXG4gIGdldE11bHRpcGxlU2libGluZ3NFbGVtZW50cyxcbiAgZXZhbHVhdGVYUGF0aFxufSBmcm9tICcuL2ZpbmRlcic7Il19