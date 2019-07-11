"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSameNodeNameSiblings = exports.getUniqueKey = exports.extractRoles = exports.extractClassNames = exports.extractIdIfExists = exports.fragmentsFromElement = exports.identifierFromElement = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _interfaces = require("./interfaces");

var _xpath = require("../xpath");

var _finder = require("../finder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var identifierFromElement = function identifierFromElement(element) {
  var ignoreClassNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var document = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.document;
  var absolute = fragmentsFromElement(element, ignoreClassNames);
  var unique = [];

  for (var i = 0; i < absolute.length; i++) {
    var fragment = absolute[absolute.length - 1 - i];
    unique = [fragment].concat(_toConsumableArray(unique));
    var xpath = (0, _xpath.xpathFromFragmentsUsingUniqueKey)(unique);
    var nodes = (0, _finder.evaluateXPath)(xpath, document, document);

    if (nodes.length === 1) {
      break;
    }
  }

  return {
    absolute: absolute,
    unique: unique
  };
};

exports.identifierFromElement = identifierFromElement;

var fragmentsFromElement = function fragmentsFromElement(element, ignoreClassNames) {
  var innerFunc = function innerFunc(ele) {
    var nodeName = ele.nodeName.toLowerCase();
    var index = 0;
    var hasSiblings = false;
    var id = extractIdIfExists(ele);
    var classNames = extractClassNames(ele, ignoreClassNames);
    var roles = extractRoles(ele);
    var depth = -1;
    var uniqueKey = getUniqueKey(ele);
    var fragment = {
      nodeName: nodeName,
      index: index,
      hasSiblings: hasSiblings,
      id: id,
      classNames: classNames,
      roles: roles,
      depth: depth,
      uniqueKey: uniqueKey
    };

    if (!ele.parentElement || ele.parentElement.nodeType !== 1 // Node.ELEMENT_NODE
    ) {
        return [fragment];
      }

    var siblings = getSameNodeNameSiblings(ele);

    if (siblings.length !== 1) {
      fragment = siblings.reduce(function (acc, current, i) {
        return current === ele ? _objectSpread({}, acc, {
          index: i
        }) : acc;
      }, _objectSpread({}, fragment, {
        hasSiblings: true
      }));
    }

    return [].concat(_toConsumableArray(innerFunc(ele.parentElement)), [fragment]);
  };

  return innerFunc(element).map(function (f, i) {
    return _objectSpread({}, f, {
      depth: i
    });
  });
};

exports.fragmentsFromElement = fragmentsFromElement;

var extractIdIfExists = function extractIdIfExists(element) {
  return element.id.length > 0 ? element.id : undefined;
};

exports.extractIdIfExists = extractIdIfExists;

var extractClassNames = function extractClassNames(element, ignoreClassNames) {
  var classNames = Array.from(element.classList).filter(function (cn) {
    return !ignoreClassNames.includes(cn);
  });
  return _lodash.default.uniq(classNames);
};

exports.extractClassNames = extractClassNames;

var extractRoles = function extractRoles(element) {
  var roleString = element.getAttribute('role');

  if (!roleString) {
    return [];
  }

  var roles = roleString.split(' ');
  return _lodash.default.uniq(roles);
};

exports.extractRoles = extractRoles;

var getUniqueKey = function getUniqueKey(element) {
  if (!element.parentElement || element.parentElement.nodeType !== 1 // Node.ELEMENT_NODE
  ) {
      return _interfaces.UniqueKey.Index;
    }

  var className = element.className;

  if (className.length > 0) {
    var sibs = element.parentElement.querySelectorAll("[class=\"".concat(className, "\"]"));

    if (sibs.length === 1) {
      return _interfaces.UniqueKey.ClassName;
    }
  }

  var roleString = element.getAttribute('role');

  if (roleString !== null && roleString.length > 0) {
    var _sibs = element.parentElement.querySelectorAll("[role=\"".concat(roleString, "\"]"));

    if (_sibs.length === 1) {
      return _interfaces.UniqueKey.Role;
    }
  }

  return _interfaces.UniqueKey.Index;
};

exports.getUniqueKey = getUniqueKey;

var getSameNodeNameSiblings = function getSameNodeNameSiblings(element) {
  var parentElement = element.parentElement;

  if (!parentElement) {
    return [element];
  }

  return Array.from(parentElement.children).filter(function (ce) {
    return ce.nodeName === element.nodeName;
  });
};

exports.getSameNodeNameSiblings = getSameNodeNameSiblings;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZGVudGlmaWVyL2NyZWF0b3IudHMiXSwibmFtZXMiOlsiaWRlbnRpZmllckZyb21FbGVtZW50IiwiZWxlbWVudCIsImlnbm9yZUNsYXNzTmFtZXMiLCJkb2N1bWVudCIsIndpbmRvdyIsImFic29sdXRlIiwiZnJhZ21lbnRzRnJvbUVsZW1lbnQiLCJ1bmlxdWUiLCJpIiwibGVuZ3RoIiwiZnJhZ21lbnQiLCJ4cGF0aCIsIm5vZGVzIiwiaW5uZXJGdW5jIiwiZWxlIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluZGV4IiwiaGFzU2libGluZ3MiLCJpZCIsImV4dHJhY3RJZElmRXhpc3RzIiwiY2xhc3NOYW1lcyIsImV4dHJhY3RDbGFzc05hbWVzIiwicm9sZXMiLCJleHRyYWN0Um9sZXMiLCJkZXB0aCIsInVuaXF1ZUtleSIsImdldFVuaXF1ZUtleSIsInBhcmVudEVsZW1lbnQiLCJub2RlVHlwZSIsInNpYmxpbmdzIiwiZ2V0U2FtZU5vZGVOYW1lU2libGluZ3MiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50IiwibWFwIiwiZiIsInVuZGVmaW5lZCIsIkFycmF5IiwiZnJvbSIsImNsYXNzTGlzdCIsImZpbHRlciIsImNuIiwiaW5jbHVkZXMiLCJfIiwidW5pcSIsInJvbGVTdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJzcGxpdCIsIlVuaXF1ZUtleSIsIkluZGV4IiwiY2xhc3NOYW1lIiwic2licyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJDbGFzc05hbWUiLCJSb2xlIiwiY2hpbGRyZW4iLCJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQ25DQyxPQURtQyxFQUliO0FBQUEsTUFGdEJDLGdCQUVzQix1RUFGTyxFQUVQO0FBQUEsTUFEdEJDLFFBQ3NCLHVFQUREQyxNQUFNLENBQUNELFFBQ047QUFDdEIs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LElBQU4sQ0FBV1gsYUFBYSxDQUFDNEIsUUFBekIsRUFBbUNmLE1BQW5DLENBQ0wsVUFBQWdCLEVBQUU7QUFBQSxXQUFJQSxFQUFFLENBQUMxQyxRQUFILEtBQWdCZCxPQUFPLENBQUNjLFFBQTVCO0FBQUEsR0FERyxDQUFQO0FBR0QsQ0FWTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEVsZW1lbnRJZGVudGlmaWVyLCBFbGVtZW50RnJhZ21lbnQsIFVuaXF1ZUtleSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyB4cGF0aEZyb21GcmFnbWVudHNVc2luZ1VuaXF1ZUtleSB9IGZyb20gJy4uL3hwYXRoJztcbmltcG9ydCB7IGV2YWx1YXRlWFBhdGggfSBmcm9tICcuLi9maW5kZXInO1xuXG5leHBvcnQgY29uc3QgaWRlbnRpZmllckZyb21FbGVtZW50ID0gKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBpZ25vcmVDbGFzc05hbWVzOiBzdHJpbmdbXSA9IFtdLFxuICBkb2N1bWVudDogRG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnRcbik6IEVsZW1lbnRJZGVudGlmaWVyID0+IHtcbiAgY29uc3QgYWJzb2x1dGUgPSBmcmFnbWVudHNGcm9tRWxlbWVudChlbGVtZW50LCBpZ25vcmVDbGFzc05hbWVzKTtcblxuICBsZXQgdW5pcXVlOiBFbGVtZW50RnJhZ21lbnRbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFic29sdXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBhYnNvbHV0ZVthYnNvbHV0ZS5sZW5ndGggLSAxIC0gaV07XG4gICAgdW5pcXVlID0gW2ZyYWdtZW50LCAuLi51bmlxdWVdO1xuICAgIGNvbnN0IHhwYXRoID0geHBhdGhGcm9tRnJhZ21lbnRzVXNpbmdVbmlxdWVLZXkodW5pcXVlKTtcbiAgICBjb25zdCBub2RlcyA9IGV2YWx1YXRlWFBhdGgoeHBhdGgsIGRvY3VtZW50LCBkb2N1bWVudCk7XG4gICAgaWYgKG5vZGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgYWJzb2x1dGUsIHVuaXF1ZSB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGZyYWdtZW50c0Zyb21FbGVtZW50ID0gKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBpZ25vcmVDbGFzc05hbWVzOiBzdHJpbmdbXVxuKTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICBjb25zdCBpbm5lckZ1bmMgPSAoZWxlOiBFbGVtZW50KTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gZWxlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc3QgaW5kZXggPSAwO1xuICAgIGNvbnN0IGhhc1NpYmxpbmdzID0gZmFsc2U7XG4gICAgY29uc3QgaWQgPSBleHRyYWN0SWRJZkV4aXN0cyhlbGUpO1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBleHRyYWN0Q2xhc3NOYW1lcyhlbGUsIGlnbm9yZUNsYXNzTmFtZXMpO1xuICAgIGNvbnN0IHJvbGVzID0gZXh0cmFjdFJvbGVzKGVsZSk7XG4gICAgY29uc3QgZGVwdGggPSAtMTtcbiAgICBjb25zdCB1bmlxdWVLZXkgPSBnZXRVbmlxdWVLZXkoZWxlKTtcblxuICAgIGxldCBmcmFnbWVudCA9IHtcbiAgICAgIG5vZGVOYW1lLFxuICAgICAgaW5kZXgsXG4gICAgICBoYXNTaWJsaW5ncyxcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lcyxcbiAgICAgIHJvbGVzLFxuICAgICAgZGVwdGgsXG4gICAgICB1bmlxdWVLZXksXG4gICAgfTtcblxuICAgIGlmIChcbiAgICAgICFlbGUucGFyZW50RWxlbWVudCB8fFxuICAgICAgZWxlLnBhcmVudEVsZW1lbnQubm9kZVR5cGUgIT09IDEgLy8gTm9kZS5FTEVNRU5UX05PREVcbiAgICApIHtcbiAgICAgIHJldHVybiBbZnJhZ21lbnRdO1xuICAgIH1cblxuICAgIGNvbnN0IHNpYmxpbmdzID0gZ2V0U2FtZU5vZGVOYW1lU2libGluZ3MoZWxlKTtcblxuICAgIGlmIChzaWJsaW5ncy5sZW5ndGggIT09IDEpIHtcbiAgICAgIGZyYWdtZW50ID0gc2libGluZ3MucmVkdWNlKFxuICAgICAgICAoYWNjLCBjdXJyZW50LCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPT09IGVsZSA/IHsgLi4uYWNjLCBpbmRleDogaSB9IDogYWNjO1xuICAgICAgICB9LFxuICAgICAgICB7IC4uLmZyYWdtZW50LCBoYXNTaWJsaW5nczogdHJ1ZSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBbLi4uaW5uZXJGdW5jKGVsZS5wYXJlbnRFbGVtZW50KSwgZnJhZ21lbnRdO1xuICB9O1xuXG4gIHJldHVybiBpbm5lckZ1bmMoZWxlbWVudCkubWFwKChmLCBpKSA9PiAoeyAuLi5mLCBkZXB0aDogaSB9KSk7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdElkSWZFeGlzdHMgPSAoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIHJldHVybiBlbGVtZW50LmlkLmxlbmd0aCA+IDAgPyBlbGVtZW50LmlkIDogdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RDbGFzc05hbWVzID0gKFxuICBlbGVtZW50OiBFbGVtZW50LFxuICBpZ25vcmVDbGFzc05hbWVzOiBzdHJpbmdbXVxuKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBjbGFzc05hbWVzID0gQXJyYXkuZnJvbShlbGVtZW50LmNsYXNzTGlzdCkuZmlsdGVyKFxuICAgIGNuID0+ICFpZ25vcmVDbGFzc05hbWVzLmluY2x1ZGVzKGNuKVxuICApO1xuICByZXR1cm4gXy51bmlxKGNsYXNzTmFtZXMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RSb2xlcyA9IChlbGVtZW50OiBFbGVtZW50KTogc3RyaW5nW10gPT4ge1xuICBjb25zdCByb2xlU3RyaW5nID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKTtcblxuICBpZiAoIXJvbGVTdHJpbmcpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCByb2xlcyA9IHJvbGVTdHJpbmcuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIF8udW5pcShyb2xlcyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VW5pcXVlS2V5ID0gKGVsZW1lbnQ6IEVsZW1lbnQpOiBVbmlxdWVLZXkgPT4ge1xuICBpZiAoXG4gICAgIWVsZW1lbnQucGFyZW50RWxlbWVudCB8fFxuICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlVHlwZSAhPT0gMSAvLyBOb2RlLkVMRU1FTlRfTk9ERVxuICApIHtcbiAgICByZXR1cm4gVW5pcXVlS2V5LkluZGV4O1xuICB9XG5cbiAgY29uc3QgY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWU7XG4gIGlmIChjbGFzc05hbWUubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHNpYnMgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIGBbY2xhc3M9XCIke2NsYXNzTmFtZX1cIl1gXG4gICAgKTtcbiAgICBpZiAoc2licy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBVbmlxdWVLZXkuQ2xhc3NOYW1lO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvbGVTdHJpbmcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpO1xuICBpZiAocm9sZVN0cmluZyAhPT0gbnVsbCAmJiByb2xlU3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBzaWJzID0gZWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgW3JvbGU9XCIke3JvbGVTdHJpbmd9XCJdYFxuICAgICk7XG4gICAgaWYgKHNpYnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gVW5pcXVlS2V5LlJvbGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFVuaXF1ZUtleS5JbmRleDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTYW1lTm9kZU5hbWVTaWJsaW5ncyA9IChlbGVtZW50OiBFbGVtZW50KTogRWxlbWVudFtdID0+IHtcbiAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICBpZiAoIXBhcmVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gW2VsZW1lbnRdO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20ocGFyZW50RWxlbWVudC5jaGlsZHJlbikuZmlsdGVyKFxuICAgIGNlID0+IGNlLm5vZGVOYW1lID09PSBlbGVtZW50Lm5vZGVOYW1lXG4gICk7XG59O1xuIl19