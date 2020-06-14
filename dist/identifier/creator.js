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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        return current === ele ? _objectSpread(_objectSpread({}, acc), {}, {
          index: i
        }) : acc;
      }, _objectSpread(_objectSpread({}, fragment), {}, {
        hasSiblings: true
      }));
    }

    return [].concat(_toConsumableArray(innerFunc(ele.parentElement)), [fragment]);
  };

  return innerFunc(element).map(function (f, i) {
    return _objectSpread(_objectSpread({}, f), {}, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZGVudGlmaWVyL2NyZWF0b3IudHMiXSwibmFtZXMiOlsiaWRlbnRpZmllckZyb21FbGVtZW50IiwiZWxlbWVudCIsImlnbm9yZUNsYXNzTmFtZXMiLCJkb2N1bWVudCIsIndpbmRvdyIsImFic29sdXRlIiwiZnJhZ21lbnRzRnJvbUVsZW1lbnQiLCJ1bmlxdWUiLCJpIiwibGVuZ3RoIiwiZnJhZ21lbnQiLCJ4cGF0aCIsIm5vZGVzIiwiaW5uZXJGdW5jIiwiZWxlIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluZGV4IiwiaGFzU2libGluZ3MiLCJpZCIsImV4dHJhY3RJZElmRXhpc3RzIiwiY2xhc3NOYW1lcyIsImV4dHJhY3RDbGFzc05hbWVzIiwicm9sZXMiLCJleHRyYWN0Um9sZXMiLCJkZXB0aCIsInVuaXF1ZUtleSIsImdldFVuaXF1ZUtleSIsInBhcmVudEVsZW1lbnQiLCJub2RlVHlwZSIsInNpYmxpbmdzIiwiZ2V0U2FtZU5vZGVOYW1lU2libGluZ3MiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50IiwibWFwIiwiZiIsInVuZGVmaW5lZCIsIkFycmF5IiwiZnJvbSIsImNsYXNzTGlzdCIsImZpbHRlciIsImNuIiwiaW5jbHVkZXMiLCJfIiwidW5pcSIsInJvbGVTdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJzcGxpdCIsIlVuaXF1ZUtleSIsIkluZGV4IiwiY2xhc3NOYW1lIiwic2licyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJDbGFzc05hbWUiLCJSb2xlIiwiY2hpbGRyZW4iLCJjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU8sSUFBTUEscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUNuQ0MsT0FEbUMsRUFJYjtBQUFBLE1BRnRCQyxnQkFFc0IsdUVBRk8sRUFFUDtBQUFBLE1BRHRCQyxRQUNzQix1RUFEREMsTUFBTSxDQUFDRCxRQUNOO0FB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QUFDQyxJQUFOLENBQVdYLGFBQWEsQ0FBQzRCLFFBQXpCLEVBQW1DZixNQUFuQyxDQUNMLFVBQUFnQixFQUFFO0FBQUEsV0FBSUEsRUFBRSxDQUFDMUMsUUFBSCxLQUFnQmQsT0FBTyxDQUFDYyxRQUE1QjtBQUFBLEdBREcsQ0FBUDtBQUdELENBVk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBFbGVtZW50SWRlbnRpZmllciwgRWxlbWVudEZyYWdtZW50LCBVbmlxdWVLZXkgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgeHBhdGhGcm9tRnJhZ21lbnRzVXNpbmdVbmlxdWVLZXkgfSBmcm9tICcuLi94cGF0aCc7XG5pbXBvcnQgeyBldmFsdWF0ZVhQYXRoIH0gZnJvbSAnLi4vZmluZGVyJztcblxuZXhwb3J0IGNvbnN0IGlkZW50aWZpZXJGcm9tRWxlbWVudCA9IChcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgaWdub3JlQ2xhc3NOYW1lczogc3RyaW5nW10gPSBbXSxcbiAgZG9jdW1lbnQ6IERvY3VtZW50ID0gd2luZG93LmRvY3VtZW50XG4pOiBFbGVtZW50SWRlbnRpZmllciA9PiB7XG4gIGNvbnN0IGFic29sdXRlID0gZnJhZ21lbnRzRnJvbUVsZW1lbnQoZWxlbWVudCwgaWdub3JlQ2xhc3NOYW1lcyk7XG5cbiAgbGV0IHVuaXF1ZTogRWxlbWVudEZyYWdtZW50W10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhYnNvbHV0ZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gYWJzb2x1dGVbYWJzb2x1dGUubGVuZ3RoIC0gMSAtIGldO1xuICAgIHVuaXF1ZSA9IFtmcmFnbWVudCwgLi4udW5pcXVlXTtcbiAgICBjb25zdCB4cGF0aCA9IHhwYXRoRnJvbUZyYWdtZW50c1VzaW5nVW5pcXVlS2V5KHVuaXF1ZSk7XG4gICAgY29uc3Qgbm9kZXMgPSBldmFsdWF0ZVhQYXRoKHhwYXRoLCBkb2N1bWVudCwgZG9jdW1lbnQpO1xuICAgIGlmIChub2Rlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGFic29sdXRlLCB1bmlxdWUgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBmcmFnbWVudHNGcm9tRWxlbWVudCA9IChcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgaWdub3JlQ2xhc3NOYW1lczogc3RyaW5nW11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3QgaW5uZXJGdW5jID0gKGVsZTogRWxlbWVudCk6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgICBjb25zdCBub2RlTmFtZSA9IGVsZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGluZGV4ID0gMDtcbiAgICBjb25zdCBoYXNTaWJsaW5ncyA9IGZhbHNlO1xuICAgIGNvbnN0IGlkID0gZXh0cmFjdElkSWZFeGlzdHMoZWxlKTtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gZXh0cmFjdENsYXNzTmFtZXMoZWxlLCBpZ25vcmVDbGFzc05hbWVzKTtcbiAgICBjb25zdCByb2xlcyA9IGV4dHJhY3RSb2xlcyhlbGUpO1xuICAgIGNvbnN0IGRlcHRoID0gLTE7XG4gICAgY29uc3QgdW5pcXVlS2V5ID0gZ2V0VW5pcXVlS2V5KGVsZSk7XG5cbiAgICBsZXQgZnJhZ21lbnQgPSB7XG4gICAgICBub2RlTmFtZSxcbiAgICAgIGluZGV4LFxuICAgICAgaGFzU2libGluZ3MsXG4gICAgICBpZCxcbiAgICAgIGNsYXNzTmFtZXMsXG4gICAgICByb2xlcyxcbiAgICAgIGRlcHRoLFxuICAgICAgdW5pcXVlS2V5LFxuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICAhZWxlLnBhcmVudEVsZW1lbnQgfHxcbiAgICAgIGVsZS5wYXJlbnRFbGVtZW50Lm5vZGVUeXBlICE9PSAxIC8vIE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgKSB7XG4gICAgICByZXR1cm4gW2ZyYWdtZW50XTtcbiAgICB9XG5cbiAgICBjb25zdCBzaWJsaW5ncyA9IGdldFNhbWVOb2RlTmFtZVNpYmxpbmdzKGVsZSk7XG5cbiAgICBpZiAoc2libGluZ3MubGVuZ3RoICE9PSAxKSB7XG4gICAgICBmcmFnbWVudCA9IHNpYmxpbmdzLnJlZHVjZShcbiAgICAgICAgKGFjYywgY3VycmVudCwgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiBjdXJyZW50ID09PSBlbGUgPyB7IC4uLmFjYywgaW5kZXg6IGkgfSA6IGFjYztcbiAgICAgICAgfSxcbiAgICAgICAgeyAuLi5mcmFnbWVudCwgaGFzU2libGluZ3M6IHRydWUgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gWy4uLmlubmVyRnVuYyhlbGUucGFyZW50RWxlbWVudCksIGZyYWdtZW50XTtcbiAgfTtcblxuICByZXR1cm4gaW5uZXJGdW5jKGVsZW1lbnQpLm1hcCgoZiwgaSkgPT4gKHsgLi4uZiwgZGVwdGg6IGkgfSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV4dHJhY3RJZElmRXhpc3RzID0gKGVsZW1lbnQ6IEVsZW1lbnQpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICByZXR1cm4gZWxlbWVudC5pZC5sZW5ndGggPiAwID8gZWxlbWVudC5pZCA6IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Q2xhc3NOYW1lcyA9IChcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgaWdub3JlQ2xhc3NOYW1lczogc3RyaW5nW11cbik6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgY2xhc3NOYW1lcyA9IEFycmF5LmZyb20oZWxlbWVudC5jbGFzc0xpc3QpLmZpbHRlcihcbiAgICBjbiA9PiAhaWdub3JlQ2xhc3NOYW1lcy5pbmNsdWRlcyhjbilcbiAgKTtcbiAgcmV0dXJuIF8udW5pcShjbGFzc05hbWVzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0Um9sZXMgPSAoZWxlbWVudDogRWxlbWVudCk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3Qgcm9sZVN0cmluZyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJyk7XG5cbiAgaWYgKCFyb2xlU3RyaW5nKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3Qgcm9sZXMgPSByb2xlU3RyaW5nLnNwbGl0KCcgJyk7XG4gIHJldHVybiBfLnVuaXEocm9sZXMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFVuaXF1ZUtleSA9IChlbGVtZW50OiBFbGVtZW50KTogVW5pcXVlS2V5ID0+IHtcbiAgaWYgKFxuICAgICFlbGVtZW50LnBhcmVudEVsZW1lbnQgfHxcbiAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQubm9kZVR5cGUgIT09IDEgLy8gTm9kZS5FTEVNRU5UX05PREVcbiAgKSB7XG4gICAgcmV0dXJuIFVuaXF1ZUtleS5JbmRleDtcbiAgfVxuXG4gIGNvbnN0IGNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuICBpZiAoY2xhc3NOYW1lLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBzaWJzID0gZWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgW2NsYXNzPVwiJHtjbGFzc05hbWV9XCJdYFxuICAgICk7XG4gICAgaWYgKHNpYnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gVW5pcXVlS2V5LkNsYXNzTmFtZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByb2xlU3RyaW5nID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKTtcbiAgaWYgKHJvbGVTdHJpbmcgIT09IG51bGwgJiYgcm9sZVN0cmluZy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3Qgc2licyA9IGVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgYFtyb2xlPVwiJHtyb2xlU3RyaW5nfVwiXWBcbiAgICApO1xuICAgIGlmIChzaWJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIFVuaXF1ZUtleS5Sb2xlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBVbmlxdWVLZXkuSW5kZXg7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2FtZU5vZGVOYW1lU2libGluZ3MgPSAoZWxlbWVudDogRWxlbWVudCk6IEVsZW1lbnRbXSA9PiB7XG4gIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgaWYgKCFwYXJlbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuIFtlbGVtZW50XTtcbiAgfVxuXG4gIHJldHVybiBBcnJheS5mcm9tKHBhcmVudEVsZW1lbnQuY2hpbGRyZW4pLmZpbHRlcihcbiAgICBjZSA9PiBjZS5ub2RlTmFtZSA9PT0gZWxlbWVudC5ub2RlTmFtZVxuICApO1xufTtcbiJdfQ==