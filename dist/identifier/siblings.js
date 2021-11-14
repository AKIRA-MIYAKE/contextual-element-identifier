"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unconstrainedDifferentParams = exports.siblingsFragmentsFromSameDepthIdentifiers = exports.siblingsFragmentsFromIdentifiers = exports.siblingsFragmentsFromFragments = exports.siblingsFragmentsFromDifferentDepthIdentifiers = exports.isDifferentFragment = exports.intersectionRight = exports.intersectionLeft = exports.findRepeatingLastIndexAndNodeName = exports.findDifferentFragmentIndices = exports.ancestorFragmetnsFromIdentifiers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _interfaces = require("./interfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var siblingsFragmentsFromIdentifiers = function siblingsFragmentsFromIdentifiers(identifiers) {
  var head = _lodash.default.head(identifiers);

  var tail = _lodash.default.tail(identifiers);

  if (!head) {
    return [];
  }

  if (tail.length === 0) {
    return siblingsFragmentsFromFragments(head.absolute);
  } else if (tail.every(function (identifier) {
    return identifier.absolute.length === head.absolute.length;
  })) {
    return siblingsFragmentsFromSameDepthIdentifiers(head, tail);
  } else {
    return siblingsFragmentsFromDifferentDepthIdentifiers(head, tail);
  }
};

exports.siblingsFragmentsFromIdentifiers = siblingsFragmentsFromIdentifiers;

var siblingsFragmentsFromFragments = function siblingsFragmentsFromFragments(fragments) {
  var _findRepeatingLastInd = findRepeatingLastIndexAndNodeName(fragments),
      index = _findRepeatingLastInd.index,
      nodeName = _findRepeatingLastInd.nodeName;

  switch (nodeName) {
    case 'li':
    case 'dt':
    case 'dd':
    case 'tr':
      return fragments.map(function (f, i) {
        return i === index ? _objectSpread(_objectSpread({}, f), {}, {
          index: -1
        }) : f;
      });

    case 'th':
    case 'td':
      {
        var left = fragments.slice(0, index).map(function (f) {
          return f.nodeName === 'tr' ? _objectSpread(_objectSpread({}, f), {}, {
            index: -1
          }) : f;
        });
        var right = fragments.slice(index);
        return [].concat(_toConsumableArray(left), _toConsumableArray(right));
      }

    default:
      return fragments.map(function (f) {
        return f.hasSiblings ? _objectSpread(_objectSpread({}, f), {}, {
          index: -1
        }) : f;
      });
  }
};

exports.siblingsFragmentsFromFragments = siblingsFragmentsFromFragments;

var siblingsFragmentsFromSameDepthIdentifiers = function siblingsFragmentsFromSameDepthIdentifiers(head, tail) {
  return tail.reduce(function (acc, current) {
    var indices = findDifferentFragmentIndices(acc, current.absolute);
    return acc.map(function (f, i) {
      if (indices.includes(i)) {
        return unconstrainedDifferentParams(f, current.absolute[i]);
      } else {
        return f;
      }
    });
  }, head.absolute);
};

exports.siblingsFragmentsFromSameDepthIdentifiers = siblingsFragmentsFromSameDepthIdentifiers;

var siblingsFragmentsFromDifferentDepthIdentifiers = function siblingsFragmentsFromDifferentDepthIdentifiers(head, tail) {
  var left = tail.reduce(function (acc, current) {
    return intersectionLeft(acc, current.absolute);
  }, head.absolute);
  var right = tail.reduce(function (acc, current) {
    return intersectionRight(acc, current.absolute);
  }, head.absolute);
  return [].concat(_toConsumableArray(left), _toConsumableArray(right));
};

exports.siblingsFragmentsFromDifferentDepthIdentifiers = siblingsFragmentsFromDifferentDepthIdentifiers;

var ancestorFragmetnsFromIdentifiers = function ancestorFragmetnsFromIdentifiers(identifiers) {
  if (identifiers.length === 0) {
    return [];
  }

  var intersected = identifiers.map(function (i) {
    return i.absolute;
  }).reduce(function (acc, current) {
    return intersectionLeft(acc, current);
  });
  return siblingsFragmentsFromFragments(intersected);
};

exports.ancestorFragmetnsFromIdentifiers = ancestorFragmetnsFromIdentifiers;

var intersectionLeft = function intersectionLeft(fragments0, fragments1) {
  var options = {
    nodeName: false,
    id: false,
    role: false,
    classNmae: false,
    depth: false
  };

  var zipped = _lodash.default.zip(fragments0, fragments1);

  var intersected = [];

  var _iterator = _createForOfIteratorHelper(zipped),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var arr = _step.value;
      var f0 = arr[0];
      var f1 = arr[1];

      if (typeof f0 !== 'undefined' && typeof f1 !== 'undefined') {
        var isDifferent = isDifferentFragment(f0, f1, options);

        if (!isDifferent) {
          intersected.push(unconstrainedDifferentParams(f0, f1));
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return intersected;
};

exports.intersectionLeft = intersectionLeft;

var intersectionRight = function intersectionRight(fragments0, fragments1) {
  var options = {
    nodeName: false,
    id: true,
    role: false,
    className: true,
    depth: true
  };
  var reversed0 = fragments0.reduceRight(function (acc, current) {
    return [].concat(_toConsumableArray(acc), [current]);
  }, []);
  var reversed1 = fragments1.reduceRight(function (acc, current) {
    return [].concat(_toConsumableArray(acc), [current]);
  }, []);

  var zipped = _lodash.default.zip(reversed0, reversed1);

  var intersected = [];

  var _iterator2 = _createForOfIteratorHelper(zipped),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var arr = _step2.value;
      var f0 = arr[0];
      var f1 = arr[1];

      if (typeof f0 !== 'undefined' && typeof f1 !== 'undefined') {
        var isDifferent = isDifferentFragment(f0, f1, options);

        if (!isDifferent) {
          intersected.push(unconstrainedDifferentParams(f0, f1));
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  intersected.reverse();
  return intersected;
};

exports.intersectionRight = intersectionRight;

var findRepeatingLastIndexAndNodeName = function findRepeatingLastIndexAndNodeName(fragments) {
  var repeatingNodeName = ['li', 'dt', 'dd', 'tr', 'th', 'td'];

  var index = _lodash.default.findLastIndex(fragments, function (f) {
    return repeatingNodeName.includes(f.nodeName);
  });

  return {
    index: index,
    nodeName: fragments[index] ? fragments[index].nodeName : undefined
  };
};

exports.findRepeatingLastIndexAndNodeName = findRepeatingLastIndexAndNodeName;

var findDifferentFragmentIndices = function findDifferentFragmentIndices(fragments0, fragments1) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var zipped = _lodash.default.zip(fragments0, fragments1).slice(0, fragments0.length);

  var indices = [];
  zipped.forEach(function (arr, index) {
    var f0 = arr[0];
    var f1 = arr[1];

    if (typeof f0 !== 'undefined' && typeof f1 !== 'undefined') {
      if (isDifferentFragment(f0, f1, options)) {
        indices.push(index);
      }
    }
  });
  return indices;
};

exports.findDifferentFragmentIndices = findDifferentFragmentIndices;

var isDifferentFragment = function isDifferentFragment(fragment0, fragment1) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var opts = _objectSpread({
    nodeName: false,
    index: false,
    id: false,
    className: false,
    role: false,
    depth: false
  }, options);

  var f0 = _objectSpread(_objectSpread({}, fragment0), {}, {
    nodeName: opts.nodeName ? '*' : fragment0.nodeName,
    index: opts.index ? -1 : fragment0.index,
    id: opts.id ? undefined : fragment0.id,
    classNames: opts.className ? [] : fragment0.classNames,
    roles: opts.role ? [] : fragment0.roles,
    depth: opts.depth ? -1 : fragment0.depth
  });

  var f1 = _objectSpread(_objectSpread({}, fragment1), {}, {
    nodeName: opts.nodeName ? '*' : fragment1.nodeName,
    index: opts.index ? -1 : fragment1.index,
    id: opts.id ? undefined : fragment1.id,
    roles: opts.role ? [] : fragment1.roles,
    classNames: opts.className ? [] : fragment1.classNames,
    depth: opts.depth ? -1 : fragment1.depth
  });

  return !_lodash.default.isEqual(f0, f1);
};

exports.isDifferentFragment = isDifferentFragment;

var unconstrainedDifferentParams = function unconstrainedDifferentParams(fragment0, fragment1) {
  var fragment = _objectSpread({}, fragment0);

  if (fragment0.nodeName !== fragment1.nodeName) {
    fragment = _objectSpread(_objectSpread({}, fragment), {}, {
      nodeName: '*'
    });
  }

  if (fragment0.index !== fragment1.index) {
    fragment = _objectSpread(_objectSpread({}, fragment), {}, {
      index: -1
    });
  }

  if (fragment0.id !== fragment1.id) {
    fragment = _objectSpread(_objectSpread({}, fragment), {}, {
      id: undefined
    });
  }

  if (!_lodash.default.isEqual(fragment0.classNames, fragment1.classNames)) {
    var classNames = _lodash.default.intersection(fragment0.classNames, fragment1.classNames);

    fragment = _objectSpread(_objectSpread({}, fragment), {}, {
      classNames: classNames
    });
  }

  if (!_lodash.default.isEqual(fragment0.roles, fragment1.roles)) {
    var roles = _lodash.default.intersection(fragment0.roles, fragment1.roles);

    fragment = _objectSpread(_objectSpread({}, fragment), {}, {
      roles: roles
    });
  }

  if (fragment0.uniqueKey !== fragment1.uniqueKey) {
    fragment = _objectSpread(_objectSpread({}, fragment), {}, {
      uniqueKey: _interfaces.UniqueKey.Index
    });
  }

  return fragment;
};

exports.unconstrainedDifferentParams = unconstrainedDifferentParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZGVudGlmaWVyL3NpYmxpbmdzLnRzIl0sIm5hbWVzIjpbInNpYmxpbmdzRnJhZ21lbnRzRnJvbUlkZW50aWZpZXJzIiwiaWRlbnRpZmllcnMiLCJoZWFkIiwiXyIsInRhaWwiLCJsZW5ndGgiLCJzaWJsaW5nc0ZyYWdtZW50c0Zyb21GcmFnbWVudHMiLCJhYnNvbHV0ZSIsImV2ZXJ5IiwiaWRlbnRpZmllciIsInNpYmxpbmdzRnJhZ21lbnRzRnJvbVNhbWVEZXB0aElkZW50aWZpZXJzIiwic2libGluZ3NGcmFnbWVudHNGcm9tRGlmZmVyZW50RGVwdGhJZGVudGlmaWVycyIsImZyYWdtZW50cyIsImZpbmRSZXBlYXRpbmdMYXN0SW5kZXhBbmROb2RlTmFtZSIsImluZGV4Iiwibm9kZU5hbWUiLCJtYXAiLCJmIiwiaSIsImxlZnQiLCJzbGljZSIsInJpZ2h0IiwiaGFzU2libGluZ3MiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50IiwiaW5kaWNlcyIsImZpbmREaWZmZXJlbnRGcmFnbWVudEluZGljZXMiLCJpbmNsdWRlcyIsInVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMiLCJpbnRlcnNlY3Rpb25MZWZ0IiwiaW50ZXJzZWN0aW9uUmlnaHQiLCJhbmNlc3RvckZyYWdtZXRuc0Zyb21JZGVudGlmaWVycyIsImludGVyc2VjdGVkIiwiZnJhZ21lbnRzMCIsImZyYWdtZW50czEiLCJvcHRpb25zIiwiaWQiLCJyb2xlIiwiY2xhc3NObWFlIiwiZGVwdGgiLCJ6aXBwZWQiLCJ6aXAiLCJhcnIiLCJmMCIsImYxIiwiaXNEaWZmZXJlbnQiLCJpc0RpZmZlcmVudEZyYWdtZW50IiwicHVzaCIsImNsYXNzTmFtZSIsInJldmVyc2VkMCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZWQxIiwicmV2ZXJzZSIsInJlcGVhdGluZ05vZGVOYW1lIiwiZmluZExhc3RJbmRleCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJmcmFnbWVudDAiLCJmcmFnbWVudDEiLCJvcHRzIiwiY2xhc3NOYW1lcyIsInJvbGVzIiwiaXNFcXVhbCIsImZyYWdtZW50IiwiaW50ZXJzZWN0aW9uIiwidW5pcXVlS2V5IiwiVW5pcXVlS2V5IiwiSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV08sSUFBTUEsZ0NBQWdDLEdBQUcsU0FBbkNBLGdDQUFtQyxDQUM5Q0MsV0FEOEMsRUFFeEI7QUFDdEIsTUFBTUMsSUFBSSxHQUFHQyxnQkFBRUQsSUFBRixDQUFPRCxXQUFQLENBQWI7O0FBQ0EsTUFBTUcsSUFBSSxHQUFHRCxnQkFBRUMsSUFBRixDQUFPSCxXQUFQLENBQWI7O0FBRUEsTUFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVCxXQUFPLEVBQVA7QUFDRDs7QUFFRCxNQUFJRSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBT0MsOEJBQThCLENBQUNKLElBQUksQ0FBQ0ssUUFBTixDQUFyQztBQUNELEdBRkQsTUFFTyxJQUNMSCxJQUFJLENBQUNJLEtBQUwsQ0FDRSxVQUFDQyxVQUFEO0FBQUEsV0FBZ0JBLFVBQVUsQ0FBQ0YsUUFBWCxDQUFvQkYsTUFBcEIsS0FBK0JILElBQUksQ0FBQ0ssUUFBTCxDQUFjRixNQUE3RDtBQUFBLEdBREYsQ0FESyxFQUlMO0FBQ0EsV0FBT0sseUNBQXlDLENBQUNSLElBQUQsRUFBT0UsSUFBUCxDQUFoRDtBQUNELEdBTk0sTUFNQTtBQUNMLFdBQU9PLDhDQUE4QyxDQUFDVCxJQUFELEVBQU9FLElBQVAsQ0FBckQ7QUFDRDtBQUNGLENBckJNOzs7O0FBdUJBLElBQU1FLDhCQUE4QixHQUFHLFNBQWpDQSw4QkFBaUMsQ0FDNUNNLFNBRDRDLEVBRXRCO0FBQ3RCLDhCQUE0QkMsaUNBQWlDLENBQUNELFNBQUQsQ0FBN0Q7QUFBQSxNQUFRRSxLQUFSLHlCQUFRQSxLQUFSO0FBQUEsTUFBZUMsUUFBZix5QkFBZUEsUUFBZjs7QUFFQSxVQUFRQSxRQUFSO0FBQ0UsU0FB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O0FBRUQsTUFBSSxDQUFDMUQsZ0JBQUU0RCxPQUFGLENBQVVMLFNBQVMsQ0FBQ0ksS0FBcEIsRUFBMkJILFNBQVMsQ0FBQ0csS0FBckMsQ0FBTCxFQUFrRDtBQUNoRCxRQUFNQSxLQUFLLEdBQUczRCxnQkFBRThELFlBQUYsQ0FBZVAsU0FBUyxDQUFDSSxLQUF6QixFQUFnQ0gsU0FBUyxDQUFDRyxLQUExQyxDQUFkOztBQUNBRSxJQUFBQSxRQUFRLG1DQUFRQSxRQUFSO0FBQWtCRixNQUFBQSxLQUFLLEVBQUxBO0FBQWxCLE1BQVI7QUFDRDs7QUFFRCxNQUFJSixTQUFTLENBQUNRLFNBQVYsS0FBd0JQLFNBQVMsQ0FBQ08sU0FBdEMsRUFBaUQ7QUFDL0NGLElBQUFBLFFBQVEsbUNBQVFBLFFBQVI7QUFBa0JFLE1BQUFBLFNBQVMsRUFBRUMsc0JBQVVDO0FBQXZDLE1BQVI7QUFDRDs7QUFFRCxTQUFPSixRQUFQO0FBQ0QsQ0FwQ00iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBFbGVtZW50SWRlbnRpZmllciwgRWxlbWVudEZyYWdtZW50LCBVbmlxdWVLZXkgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpZmZlcmVudElnbm9yZU9wdGlvbnMge1xuICBub2RlTmFtZT86IGJvb2xlYW47XG4gIGluZGV4PzogYm9vbGVhbjtcbiAgaWQ/OiBib29sZWFuO1xuICBjbHNhc05hbWU/OiBib29sZWFuO1xuICByb2xlPzogYm9vbGVhbjtcbiAgZGVwdGg/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3Qgc2libGluZ3NGcmFnbWVudHNGcm9tSWRlbnRpZmllcnMgPSAoXG4gIGlkZW50aWZpZXJzOiBFbGVtZW50SWRlbnRpZmllcltdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGNvbnN0IGhlYWQgPSBfLmhlYWQoaWRlbnRpZmllcnMpO1xuICBjb25zdCB0YWlsID0gXy50YWlsKGlkZW50aWZpZXJzKTtcblxuICBpZiAoIWhlYWQpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBpZiAodGFpbC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gc2libGluZ3NGcmFnbWVudHNGcm9tRnJhZ21lbnRzKGhlYWQuYWJzb2x1dGUpO1xuICB9IGVsc2UgaWYgKFxuICAgIHRhaWwuZXZlcnkoXG4gICAgICAoaWRlbnRpZmllcikgPT4gaWRlbnRpZmllci5hYnNvbHV0ZS5sZW5ndGggPT09IGhlYWQuYWJzb2x1dGUubGVuZ3RoXG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gc2libGluZ3NGcmFnbWVudHNGcm9tU2FtZURlcHRoSWRlbnRpZmllcnMoaGVhZCwgdGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNpYmxpbmdzRnJhZ21lbnRzRnJvbURpZmZlcmVudERlcHRoSWRlbnRpZmllcnMoaGVhZCwgdGFpbCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzaWJsaW5nc0ZyYWdtZW50c0Zyb21GcmFnbWVudHMgPSAoXG4gIGZyYWdtZW50czogRWxlbWVudEZyYWdtZW50W11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3QgeyBpbmRleCwgbm9kZU5hbWUgfSA9IGZpbmRSZXBlYXRpbmdMYXN0SW5kZXhBbmROb2RlTmFtZShmcmFnbWVudHMpO1xuXG4gIHN3aXRjaCAobm9kZU5hbWUpIHtcbiAgICBjYXNlICdsaSc6XG4gICAgY2FzZSAnZHQnOlxuICAgIGNhc2UgJ2RkJzpcbiAgICBjYXNlICd0cic6XG4gICAgICByZXR1cm4gZnJhZ21lbnRzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGluZGV4ID8geyAuLi5mLCBpbmRleDogLTEgfSA6IGYpKTtcbiAgICBjYXNlICd0aCc6XG4gICAgY2FzZSAndGQnOiB7XG4gICAgICBjb25zdCBsZWZ0ID0gZnJhZ21lbnRzXG4gICAgICAgIC5zbGljZSgwLCBpbmRleClcbiAgICAgICAgLm1hcCgoZikgPT4gKGYubm9kZU5hbWUgPT09ICd0cicgPyB7IC4uLmYsIGluZGV4OiAtMSB9IDogZikpO1xuICAgICAgY29uc3QgcmlnaHQgPSBmcmFnbWVudHMuc2xpY2UoaW5kZXgpO1xuICAgICAgcmV0dXJuIFsuLi5sZWZ0LCAuLi5yaWdodF07XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZnJhZ21lbnRzLm1hcCgoZikgPT4gKGYuaGFzU2libGluZ3MgPyB7IC4uLmYsIGluZGV4OiAtMSB9IDogZikpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2libGluZ3NGcmFnbWVudHNGcm9tU2FtZURlcHRoSWRlbnRpZmllcnMgPSAoXG4gIGhlYWQ6IEVsZW1lbnRJZGVudGlmaWVyLFxuICB0YWlsOiBFbGVtZW50SWRlbnRpZmllcltdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIHJldHVybiB0YWlsLnJlZHVjZSgoYWNjLCBjdXJyZW50KSA9PiB7XG4gICAgY29uc3QgaW5kaWNlcyA9IGZpbmREaWZmZXJlbnRGcmFnbWVudEluZGljZXMoYWNjLCBjdXJyZW50LmFic29sdXRlKTtcbiAgICByZXR1cm4gYWNjLm1hcCgoZiwgaSkgPT4ge1xuICAgICAgaWYgKGluZGljZXMuaW5jbHVkZXMoaSkpIHtcbiAgICAgICAgcmV0dXJuIHVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMoZiwgY3VycmVudC5hYnNvbHV0ZVtpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgaGVhZC5hYnNvbHV0ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc2libGluZ3NGcmFnbWVudHNGcm9tRGlmZmVyZW50RGVwdGhJZGVudGlmaWVycyA9IChcbiAgaGVhZDogRWxlbWVudElkZW50aWZpZXIsXG4gIHRhaWw6IEVsZW1lbnRJZGVudGlmaWVyW11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3QgbGVmdCA9IHRhaWwucmVkdWNlKChhY2MsIGN1cnJlbnQpID0+IHtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uTGVmdChhY2MsIGN1cnJlbnQuYWJzb2x1dGUpO1xuICB9LCBoZWFkLmFic29sdXRlKTtcblxuICBjb25zdCByaWdodCA9IHRhaWwucmVkdWNlKChhY2MsIGN1cnJlbnQpID0+IHtcbiAgICByZXR1cm4gaW50ZXJzZWN0aW9uUmlnaHQoYWNjLCBjdXJyZW50LmFic29sdXRlKTtcbiAgfSwgaGVhZC5hYnNvbHV0ZSk7XG5cbiAgcmV0dXJuIFsuLi5sZWZ0LCAuLi5yaWdodF07XG59O1xuXG5leHBvcnQgY29uc3QgYW5jZXN0b3JGcmFnbWV0bnNGcm9tSWRlbnRpZmllcnMgPSAoXG4gIGlkZW50aWZpZXJzOiBFbGVtZW50SWRlbnRpZmllcltdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGlmIChpZGVudGlmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBpbnRlcnNlY3RlZCA9IGlkZW50aWZpZXJzXG4gICAgLm1hcCgoaSkgPT4gaS5hYnNvbHV0ZSlcbiAgICAucmVkdWNlKChhY2MsIGN1cnJlbnQpID0+IHtcbiAgICAgIHJldHVybiBpbnRlcnNlY3Rpb25MZWZ0KGFjYywgY3VycmVudCk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIHNpYmxpbmdzRnJhZ21lbnRzRnJvbUZyYWdtZW50cyhpbnRlcnNlY3RlZCk7XG59O1xuXG5leHBvcnQgY29uc3QgaW50ZXJzZWN0aW9uTGVmdCA9IChcbiAgZnJhZ21lbnRzMDogRWxlbWVudEZyYWdtZW50W10sXG4gIGZyYWdtZW50czE6IEVsZW1lbnRGcmFnbWVudFtdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgbm9kZU5hbWU6IGZhbHNlLFxuICAgIGlkOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBjbGFzc05tYWU6IGZhbHNlLFxuICAgIGRlcHRoOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdCB6aXBwZWQgPSBfLnppcChmcmFnbWVudHMwLCBmcmFnbWVudHMxKTtcblxuICBjb25zdCBpbnRlcnNlY3RlZDogRWxlbWVudEZyYWdtZW50W10gPSBbXTtcbiAgZm9yIChjb25zdCBhcnIgb2YgemlwcGVkKSB7XG4gICAgY29uc3QgZjAgPSBhcnJbMF07XG4gICAgY29uc3QgZjEgPSBhcnJbMV07XG5cbiAgICBpZiAodHlwZW9mIGYwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZjEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpc0RpZmZlcmVudCA9IGlzRGlmZmVyZW50RnJhZ21lbnQoZjAsIGYxLCBvcHRpb25zKTtcbiAgICAgIGlmICghaXNEaWZmZXJlbnQpIHtcbiAgICAgICAgaW50ZXJzZWN0ZWQucHVzaCh1bmNvbnN0cmFpbmVkRGlmZmVyZW50UGFyYW1zKGYwLCBmMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnRlcnNlY3RlZDtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRlcnNlY3Rpb25SaWdodCA9IChcbiAgZnJhZ21lbnRzMDogRWxlbWVudEZyYWdtZW50W10sXG4gIGZyYWdtZW50czE6IEVsZW1lbnRGcmFnbWVudFtdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgbm9kZU5hbWU6IGZhbHNlLFxuICAgIGlkOiB0cnVlLFxuICAgIHJvbGU6IGZhbHNlLFxuICAgIGNsYXNzTmFtZTogdHJ1ZSxcbiAgICBkZXB0aDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdCByZXZlcnNlZDAgPSBmcmFnbWVudHMwLnJlZHVjZVJpZ2h0KFxuICAgIChhY2MsIGN1cnJlbnQpID0+IFsuLi5hY2MsIGN1cnJlbnRdLFxuICAgIFtdIGFzIEVsZW1lbnRGcmFnbWVudFtdXG4gICk7XG5cbiAgY29uc3QgcmV2ZXJzZWQxID0gZnJhZ21lbnRzMS5yZWR1Y2VSaWdodChcbiAgICAoYWNjLCBjdXJyZW50KSA9PiBbLi4uYWNjLCBjdXJyZW50XSxcbiAgICBbXSBhcyBFbGVtZW50RnJhZ21lbnRbXVxuICApO1xuXG4gIGNvbnN0IHppcHBlZCA9IF8uemlwKHJldmVyc2VkMCwgcmV2ZXJzZWQxKTtcblxuICBjb25zdCBpbnRlcnNlY3RlZDogRWxlbWVudEZyYWdtZW50W10gPSBbXTtcbiAgZm9yIChjb25zdCBhcnIgb2YgemlwcGVkKSB7XG4gICAgY29uc3QgZjAgPSBhcnJbMF07XG4gICAgY29uc3QgZjEgPSBhcnJbMV07XG5cbiAgICBpZiAodHlwZW9mIGYwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZjEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpc0RpZmZlcmVudCA9IGlzRGlmZmVyZW50RnJhZ21lbnQoZjAsIGYxLCBvcHRpb25zKTtcbiAgICAgIGlmICghaXNEaWZmZXJlbnQpIHtcbiAgICAgICAgaW50ZXJzZWN0ZWQucHVzaCh1bmNvbnN0cmFpbmVkRGlmZmVyZW50UGFyYW1zKGYwLCBmMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGludGVyc2VjdGVkLnJldmVyc2UoKTtcblxuICByZXR1cm4gaW50ZXJzZWN0ZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFJlcGVhdGluZ0xhc3RJbmRleEFuZE5vZGVOYW1lID0gKFxuICBmcmFnbWVudHM6IEVsZW1lbnRGcmFnbWVudFtdXG4pOiB7IGluZGV4OiBudW1iZXI7IG5vZGVOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgfSA9PiB7XG4gIGNvbnN0IHJlcGVhdGluZ05vZGVOYW1lID0gWydsaScsICdkdCcsICdkZCcsICd0cicsICd0aCcsICd0ZCddO1xuICBjb25zdCBpbmRleCA9IF8uZmluZExhc3RJbmRleChmcmFnbWVudHMsIChmKSA9PlxuICAgIHJlcGVhdGluZ05vZGVOYW1lLmluY2x1ZGVzKGYubm9kZU5hbWUpXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBpbmRleCxcbiAgICBub2RlTmFtZTogZnJhZ21lbnRzW2luZGV4XSA/IGZyYWdtZW50c1tpbmRleF0ubm9kZU5hbWUgOiB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZERpZmZlcmVudEZyYWdtZW50SW5kaWNlcyA9IChcbiAgZnJhZ21lbnRzMDogRWxlbWVudEZyYWdtZW50W10sXG4gIGZyYWdtZW50czE6IEVsZW1lbnRGcmFnbWVudFtdLFxuICBvcHRpb25zOiBEaWZmZXJlbnRJZ25vcmVPcHRpb25zID0ge31cbik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgemlwcGVkID0gXy56aXAoZnJhZ21lbnRzMCwgZnJhZ21lbnRzMSkuc2xpY2UoMCwgZnJhZ21lbnRzMC5sZW5ndGgpO1xuXG4gIGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gIHppcHBlZC5mb3JFYWNoKChhcnIsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZjAgPSBhcnJbMF07XG4gICAgY29uc3QgZjEgPSBhcnJbMV07XG5cbiAgICBpZiAodHlwZW9mIGYwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZjEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoaXNEaWZmZXJlbnRGcmFnbWVudChmMCwgZjEsIG9wdGlvbnMpKSB7XG4gICAgICAgIGluZGljZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kaWNlcztcbn07XG5cbmV4cG9ydCBjb25zdCBpc0RpZmZlcmVudEZyYWdtZW50ID0gKFxuICBmcmFnbWVudDA6IEVsZW1lbnRGcmFnbWVudCxcbiAgZnJhZ21lbnQxOiBFbGVtZW50RnJhZ21lbnQsXG4gIG9wdGlvbnM6IERpZmZlcmVudElnbm9yZU9wdGlvbnMgPSB7fVxuKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgbm9kZU5hbWU6IGZhbHNlLFxuICAgIGluZGV4OiBmYWxzZSxcbiAgICBpZDogZmFsc2UsXG4gICAgY2xhc3NOYW1lOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBkZXB0aDogZmFsc2UsXG4gICAgLi4ub3B0aW9ucyxcbiAgfTtcblxuICBjb25zdCBmMCA9IHtcbiAgICAuLi5mcmFnbWVudDAsXG4gICAgbm9kZU5hbWU6IG9wdHMubm9kZU5hbWUgPyAnKicgOiBmcmFnbWVudDAubm9kZU5hbWUsXG4gICAgaW5kZXg6IG9wdHMuaW5kZXggPyAtMSA6IGZyYWdtZW50MC5pbmRleCxcbiAgICBpZDogb3B0cy5pZCA/IHVuZGVmaW5lZCA6IGZyYWdtZW50MC5pZCxcbiAgICBjbGFzc05hbWVzOiBvcHRzLmNsYXNzTmFtZSA/IFtdIDogZnJhZ21lbnQwLmNsYXNzTmFtZXMsXG4gICAgcm9sZXM6IG9wdHMucm9sZSA/IFtdIDogZnJhZ21lbnQwLnJvbGVzLFxuICAgIGRlcHRoOiBvcHRzLmRlcHRoID8gLTEgOiBmcmFnbWVudDAuZGVwdGgsXG4gIH07XG5cbiAgY29uc3QgZjEgPSB7XG4gICAgLi4uZnJhZ21lbnQxLFxuICAgIG5vZGVOYW1lOiBvcHRzLm5vZGVOYW1lID8gJyonIDogZnJhZ21lbnQxLm5vZGVOYW1lLFxuICAgIGluZGV4OiBvcHRzLmluZGV4ID8gLTEgOiBmcmFnbWVudDEuaW5kZXgsXG4gICAgaWQ6IG9wdHMuaWQgPyB1bmRlZmluZWQgOiBmcmFnbWVudDEuaWQsXG4gICAgcm9sZXM6IG9wdHMucm9sZSA/IFtdIDogZnJhZ21lbnQxLnJvbGVzLFxuICAgIGNsYXNzTmFtZXM6IG9wdHMuY2xhc3NOYW1lID8gW10gOiBmcmFnbWVudDEuY2xhc3NOYW1lcyxcbiAgICBkZXB0aDogb3B0cy5kZXB0aCA/IC0xIDogZnJhZ21lbnQxLmRlcHRoLFxuICB9O1xuXG4gIHJldHVybiAhXy5pc0VxdWFsKGYwLCBmMSk7XG59O1xuXG5leHBvcnQgY29uc3QgdW5jb25zdHJhaW5lZERpZmZlcmVudFBhcmFtcyA9IChcbiAgZnJhZ21lbnQwOiBFbGVtZW50RnJhZ21lbnQsXG4gIGZyYWdtZW50MTogRWxlbWVudEZyYWdtZW50XG4pOiBFbGVtZW50RnJhZ21lbnQgPT4ge1xuICBsZXQgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50MCB9O1xuXG4gIGlmIChmcmFnbWVudDAubm9kZU5hbWUgIT09IGZyYWdtZW50MS5ub2RlTmFtZSkge1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgbm9kZU5hbWU6ICcqJyB9O1xuICB9XG5cbiAgaWYgKGZyYWdtZW50MC5pbmRleCAhPT0gZnJhZ21lbnQxLmluZGV4KSB7XG4gICAgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50LCBpbmRleDogLTEgfTtcbiAgfVxuXG4gIGlmIChmcmFnbWVudDAuaWQgIT09IGZyYWdtZW50MS5pZCkge1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgaWQ6IHVuZGVmaW5lZCB9O1xuICB9XG5cbiAgaWYgKCFfLmlzRXF1YWwoZnJhZ21lbnQwLmNsYXNzTmFtZXMsIGZyYWdtZW50MS5jbGFzc05hbWVzKSkge1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBfLmludGVyc2VjdGlvbihcbiAgICAgIGZyYWdtZW50MC5jbGFzc05hbWVzLFxuICAgICAgZnJhZ21lbnQxLmNsYXNzTmFtZXNcbiAgICApO1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgY2xhc3NOYW1lcyB9O1xuICB9XG5cbiAgaWYgKCFfLmlzRXF1YWwoZnJhZ21lbnQwLnJvbGVzLCBmcmFnbWVudDEucm9sZXMpKSB7XG4gICAgY29uc3Qgcm9sZXMgPSBfLmludGVyc2VjdGlvbihmcmFnbWVudDAucm9sZXMsIGZyYWdtZW50MS5yb2xlcyk7XG4gICAgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50LCByb2xlcyB9O1xuICB9XG5cbiAgaWYgKGZyYWdtZW50MC51bmlxdWVLZXkgIT09IGZyYWdtZW50MS51bmlxdWVLZXkpIHtcbiAgICBmcmFnbWVudCA9IHsgLi4uZnJhZ21lbnQsIHVuaXF1ZUtleTogVW5pcXVlS2V5LkluZGV4IH07XG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnQ7XG59O1xuIl19