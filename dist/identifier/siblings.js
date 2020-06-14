"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unconstrainedDifferentParams = exports.isDifferentFragment = exports.findDifferentFragmentIndices = exports.findRepeatingLastIndexAndNodeName = exports.intersectionRight = exports.intersectionLeft = exports.ancestorFragmetnsFromIdentifiers = exports.siblingsFragmentsFromDifferentDepthIdentifiers = exports.siblingsFragmentsFromSameDepthIdentifiers = exports.siblingsFragmentsFromFragments = exports.siblingsFragmentsFromIdentifiers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _interfaces = require("./interfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZGVudGlmaWVyL3NpYmxpbmdzLnRzIl0sIm5hbWVzIjpbInNpYmxpbmdzRnJhZ21lbnRzRnJvbUlkZW50aWZpZXJzIiwiaWRlbnRpZmllcnMiLCJoZWFkIiwiXyIsInRhaWwiLCJsZW5ndGgiLCJzaWJsaW5nc0ZyYWdtZW50c0Zyb21GcmFnbWVudHMiLCJhYnNvbHV0ZSIsImV2ZXJ5IiwiaWRlbnRpZmllciIsInNpYmxpbmdzRnJhZ21lbnRzRnJvbVNhbWVEZXB0aElkZW50aWZpZXJzIiwic2libGluZ3NGcmFnbWVudHNGcm9tRGlmZmVyZW50RGVwdGhJZGVudGlmaWVycyIsImZyYWdtZW50cyIsImZpbmRSZXBlYXRpbmdMYXN0SW5kZXhBbmROb2RlTmFtZSIsImluZGV4Iiwibm9kZU5hbWUiLCJtYXAiLCJmIiwiaSIsImxlZnQiLCJzbGljZSIsInJpZ2h0IiwiaGFzU2libGluZ3MiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50IiwiaW5kaWNlcyIsImZpbmREaWZmZXJlbnRGcmFnbWVudEluZGljZXMiLCJpbmNsdWRlcyIsInVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMiLCJpbnRlcnNlY3Rpb25MZWZ0IiwiaW50ZXJzZWN0aW9uUmlnaHQiLCJhbmNlc3RvckZyYWdtZXRuc0Zyb21JZGVudGlmaWVycyIsImludGVyc2VjdGVkIiwiZnJhZ21lbnRzMCIsImZyYWdtZW50czEiLCJvcHRpb25zIiwiaWQiLCJyb2xlIiwiY2xhc3NObWFlIiwiZGVwdGgiLCJ6aXBwZWQiLCJ6aXAiLCJhcnIiLCJmMCIsImYxIiwiaXNEaWZmZXJlbnQiLCJpc0RpZmZlcmVudEZyYWdtZW50IiwicHVzaCIsImNsYXNzTmFtZSIsInJldmVyc2VkMCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZWQxIiwicmV2ZXJzZSIsInJlcGVhdGluZ05vZGVOYW1lIiwiZmluZExhc3RJbmRleCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJmcmFnbWVudDAiLCJmcmFnbWVudDEiLCJvcHRzIiwiY2xhc3NOYW1lcyIsInJvbGVzIiwiaXNFcXVhbCIsImZyYWdtZW50IiwiaW50ZXJzZWN0aW9uIiwidW5pcXVlS2V5IiwiVW5pcXVlS2V5IiwiSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV08sSUFBTUEsZ0NBQWdDLEdBQUcsU0FBbkNBLGdDQUFtQyxDQUM5Q0MsV0FEOEMsRUFFeEI7QUFDdEIsTUFBTUMsSUFBSSxHQUFHQyxnQkFBRUQsSUFBRixDQUFPRCxXQUFQLENBQWI7O0FBQ0EsTUFBTUcsSUFBSSxHQUFHRCxnQkFBRUMsSUFBRixDQUFPSCxXQUFQLENBQWI7O0FBRUEsTUFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVCxXQUFPLEVBQVA7QUFDRDs7QUFFRCxNQUFJRSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBT0MsOEJBQThCLENBQUNKLElBQUksQ0FBQ0ssUUFBTixDQUFyQztBQUNELEdBRkQsTUFFTyxJQUNMSCxJQUFJLENBQUNJLEtBQUwsQ0FDRSxVQUFBQyxVQUFVO0FBQUEsV0FBSUEsVUFBVSxDQUFDRixRQUFYLENBQW9CRixNQUFwQixLQUErQkgsSUFBSSxDQUFDSyxRQUFMLENBQWNGLE1BQWpEO0FBQUEsR0FEWixDQURLLEVBSUw7QUFDQSxXQUFPSyx5Q0FBeUMsQ0FBQ1IsSUFBRCxFQUFPRSxJQUFQLENBQWhEO0FBQ0QsR0FOTSxNQU1BO0FBQ0wsV0FBT08sOENBQThDLENBQUNULElBQUQsRUFBT0UsSUFBUCxDQUFyRDtBQUNEO0FBQ0YsQ0FyQk07Ozs7QUF1QkEsSUFBTUUsOEJBQThCLEdBQUcsU0FBakNBLDhCQUFpQyxDQUM1Q00sU0FENEMsRUFFdEI7QUFBQSw4QkFDTUMsaUNBQWlDLENBQUNELFNBQUQsQ0FEdkM7QUFBQSxNQUNkRSxLQURjLHlCQUNkQSxLQURjO0FBQUEsTUFDUEMsUUFETyx5QkFDUEEsUUFETzs7QUFHdEIsVUFBUUEsUUFBUjtBQUNFLFNBQUss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QUVELE1BQUksQ0FBQzFELGdCQUFFNEQsT0FBRixDQUFVTCxTQUFTLENBQUNJLEtBQXBCLEVBQTJCSCxTQUFTLENBQUNHLEtBQXJDLENBQUwsRUFBa0Q7QUFDaEQsUUFBTUEsS0FBSyxHQUFHM0QsZ0JBQUU4RCxZQUFGLENBQWVQLFNBQVMsQ0FBQ0ksS0FBekIsRUFBZ0NILFNBQVMsQ0FBQ0csS0FBMUMsQ0FBZDs7QUFDQUUsSUFBQUEsUUFBUSxtQ0FBUUEsUUFBUjtBQUFrQkYsTUFBQUEsS0FBSyxFQUFMQTtBQUFsQixNQUFSO0FBQ0Q7O0FBRUQsTUFBSUosU0FBUyxDQUFDUSxTQUFWLEtBQXdCUCxTQUFTLENBQUNPLFNBQXRDLEVBQWlEO0FBQy9DRixJQUFBQSxRQUFRLG1DQUFRQSxRQUFSO0FBQWtCRSxNQUFBQSxTQUFTLEVBQUVDLHNCQUFVQztBQUF2QyxNQUFSO0FBQ0Q7O0FBRUQsU0FBT0osUUFBUDtBQUNELENBcENNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRWxlbWVudElkZW50aWZpZXIsIEVsZW1lbnRGcmFnbWVudCwgVW5pcXVlS2V5IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGludGVyZmFjZSBEaWZmZXJlbnRJZ25vcmVPcHRpb25zIHtcbiAgbm9kZU5hbWU/OiBib29sZWFuO1xuICBpbmRleD86IGJvb2xlYW47XG4gIGlkPzogYm9vbGVhbjtcbiAgY2xzYXNOYW1lPzogYm9vbGVhbjtcbiAgcm9sZT86IGJvb2xlYW47XG4gIGRlcHRoPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IHNpYmxpbmdzRnJhZ21lbnRzRnJvbUlkZW50aWZpZXJzID0gKFxuICBpZGVudGlmaWVyczogRWxlbWVudElkZW50aWZpZXJbXVxuKTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICBjb25zdCBoZWFkID0gXy5oZWFkKGlkZW50aWZpZXJzKTtcbiAgY29uc3QgdGFpbCA9IF8udGFpbChpZGVudGlmaWVycyk7XG5cbiAgaWYgKCFoZWFkKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgaWYgKHRhaWwubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHNpYmxpbmdzRnJhZ21lbnRzRnJvbUZyYWdtZW50cyhoZWFkLmFic29sdXRlKTtcbiAgfSBlbHNlIGlmIChcbiAgICB0YWlsLmV2ZXJ5KFxuICAgICAgaWRlbnRpZmllciA9PiBpZGVudGlmaWVyLmFic29sdXRlLmxlbmd0aCA9PT0gaGVhZC5hYnNvbHV0ZS5sZW5ndGhcbiAgICApXG4gICkge1xuICAgIHJldHVybiBzaWJsaW5nc0ZyYWdtZW50c0Zyb21TYW1lRGVwdGhJZGVudGlmaWVycyhoZWFkLCB0YWlsKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2libGluZ3NGcmFnbWVudHNGcm9tRGlmZmVyZW50RGVwdGhJZGVudGlmaWVycyhoZWFkLCB0YWlsKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNpYmxpbmdzRnJhZ21lbnRzRnJvbUZyYWdtZW50cyA9IChcbiAgZnJhZ21lbnRzOiBFbGVtZW50RnJhZ21lbnRbXVxuKTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICBjb25zdCB7IGluZGV4LCBub2RlTmFtZSB9ID0gZmluZFJlcGVhdGluZ0xhc3RJbmRleEFuZE5vZGVOYW1lKGZyYWdtZW50cyk7XG5cbiAgc3dpdGNoIChub2RlTmFtZSkge1xuICAgIGNhc2UgJ2xpJzpcbiAgICBjYXNlICdkdCc6XG4gICAgY2FzZSAnZGQnOlxuICAgIGNhc2UgJ3RyJzpcbiAgICAgIHJldHVybiBmcmFnbWVudHMubWFwKChmLCBpKSA9PiAoaSA9PT0gaW5kZXggPyB7IC4uLmYsIGluZGV4OiAtMSB9IDogZikpO1xuICAgIGNhc2UgJ3RoJzpcbiAgICBjYXNlICd0ZCc6IHtcbiAgICAgIGNvbnN0IGxlZnQgPSBmcmFnbWVudHNcbiAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxuICAgICAgICAubWFwKGYgPT4gKGYubm9kZU5hbWUgPT09ICd0cicgPyB7IC4uLmYsIGluZGV4OiAtMSB9IDogZikpO1xuICAgICAgY29uc3QgcmlnaHQgPSBmcmFnbWVudHMuc2xpY2UoaW5kZXgpO1xuICAgICAgcmV0dXJuIFsuLi5sZWZ0LCAuLi5yaWdodF07XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZnJhZ21lbnRzLm1hcChmID0+IChmLmhhc1NpYmxpbmdzID8geyAuLi5mLCBpbmRleDogLTEgfSA6IGYpKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNpYmxpbmdzRnJhZ21lbnRzRnJvbVNhbWVEZXB0aElkZW50aWZpZXJzID0gKFxuICBoZWFkOiBFbGVtZW50SWRlbnRpZmllcixcbiAgdGFpbDogRWxlbWVudElkZW50aWZpZXJbXVxuKTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICByZXR1cm4gdGFpbC5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4ge1xuICAgIGNvbnN0IGluZGljZXMgPSBmaW5kRGlmZmVyZW50RnJhZ21lbnRJbmRpY2VzKGFjYywgY3VycmVudC5hYnNvbHV0ZSk7XG4gICAgcmV0dXJuIGFjYy5tYXAoKGYsIGkpID0+IHtcbiAgICAgIGlmIChpbmRpY2VzLmluY2x1ZGVzKGkpKSB7XG4gICAgICAgIHJldHVybiB1bmNvbnN0cmFpbmVkRGlmZmVyZW50UGFyYW1zKGYsIGN1cnJlbnQuYWJzb2x1dGVbaV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIGhlYWQuYWJzb2x1dGUpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNpYmxpbmdzRnJhZ21lbnRzRnJvbURpZmZlcmVudERlcHRoSWRlbnRpZmllcnMgPSAoXG4gIGhlYWQ6IEVsZW1lbnRJZGVudGlmaWVyLFxuICB0YWlsOiBFbGVtZW50SWRlbnRpZmllcltdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGNvbnN0IGxlZnQgPSB0YWlsLnJlZHVjZSgoYWNjLCBjdXJyZW50KSA9PiB7XG4gICAgcmV0dXJuIGludGVyc2VjdGlvbkxlZnQoYWNjLCBjdXJyZW50LmFic29sdXRlKTtcbiAgfSwgaGVhZC5hYnNvbHV0ZSk7XG5cbiAgY29uc3QgcmlnaHQgPSB0YWlsLnJlZHVjZSgoYWNjLCBjdXJyZW50KSA9PiB7XG4gICAgcmV0dXJuIGludGVyc2VjdGlvblJpZ2h0KGFjYywgY3VycmVudC5hYnNvbHV0ZSk7XG4gIH0sIGhlYWQuYWJzb2x1dGUpO1xuXG4gIHJldHVybiBbLi4ubGVmdCwgLi4ucmlnaHRdO1xufTtcblxuZXhwb3J0IGNvbnN0IGFuY2VzdG9yRnJhZ21ldG5zRnJvbUlkZW50aWZpZXJzID0gKFxuICBpZGVudGlmaWVyczogRWxlbWVudElkZW50aWZpZXJbXVxuKTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICBpZiAoaWRlbnRpZmllcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgaW50ZXJzZWN0ZWQgPSBpZGVudGlmaWVyc1xuICAgIC5tYXAoaSA9PiBpLmFic29sdXRlKVxuICAgIC5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4ge1xuICAgICAgcmV0dXJuIGludGVyc2VjdGlvbkxlZnQoYWNjLCBjdXJyZW50KTtcbiAgICB9KTtcblxuICByZXR1cm4gc2libGluZ3NGcmFnbWVudHNGcm9tRnJhZ21lbnRzKGludGVyc2VjdGVkKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRlcnNlY3Rpb25MZWZ0ID0gKFxuICBmcmFnbWVudHMwOiBFbGVtZW50RnJhZ21lbnRbXSxcbiAgZnJhZ21lbnRzMTogRWxlbWVudEZyYWdtZW50W11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBub2RlTmFtZTogZmFsc2UsXG4gICAgaWQ6IGZhbHNlLFxuICAgIHJvbGU6IGZhbHNlLFxuICAgIGNsYXNzTm1hZTogZmFsc2UsXG4gICAgZGVwdGg6IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0IHppcHBlZCA9IF8uemlwKGZyYWdtZW50czAsIGZyYWdtZW50czEpO1xuXG4gIGNvbnN0IGludGVyc2VjdGVkOiBFbGVtZW50RnJhZ21lbnRbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGFyciBvZiB6aXBwZWQpIHtcbiAgICBjb25zdCBmMCA9IGFyclswXTtcbiAgICBjb25zdCBmMSA9IGFyclsxXTtcblxuICAgIGlmICh0eXBlb2YgZjAgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBmMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGlzRGlmZmVyZW50ID0gaXNEaWZmZXJlbnRGcmFnbWVudChmMCwgZjEsIG9wdGlvbnMpO1xuICAgICAgaWYgKCFpc0RpZmZlcmVudCkge1xuICAgICAgICBpbnRlcnNlY3RlZC5wdXNoKHVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMoZjAsIGYxKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGludGVyc2VjdGVkO1xufTtcblxuZXhwb3J0IGNvbnN0IGludGVyc2VjdGlvblJpZ2h0ID0gKFxuICBmcmFnbWVudHMwOiBFbGVtZW50RnJhZ21lbnRbXSxcbiAgZnJhZ21lbnRzMTogRWxlbWVudEZyYWdtZW50W11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBub2RlTmFtZTogZmFsc2UsXG4gICAgaWQ6IHRydWUsXG4gICAgcm9sZTogZmFsc2UsXG4gICAgY2xhc3NOYW1lOiB0cnVlLFxuICAgIGRlcHRoOiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0IHJldmVyc2VkMCA9IGZyYWdtZW50czAucmVkdWNlUmlnaHQoXG4gICAgKGFjYywgY3VycmVudCkgPT4gWy4uLmFjYywgY3VycmVudF0sXG4gICAgW10gYXMgRWxlbWVudEZyYWdtZW50W11cbiAgKTtcblxuICBjb25zdCByZXZlcnNlZDEgPSBmcmFnbWVudHMxLnJlZHVjZVJpZ2h0KFxuICAgIChhY2MsIGN1cnJlbnQpID0+IFsuLi5hY2MsIGN1cnJlbnRdLFxuICAgIFtdIGFzIEVsZW1lbnRGcmFnbWVudFtdXG4gICk7XG5cbiAgY29uc3QgemlwcGVkID0gXy56aXAocmV2ZXJzZWQwLCByZXZlcnNlZDEpO1xuXG4gIGNvbnN0IGludGVyc2VjdGVkOiBFbGVtZW50RnJhZ21lbnRbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGFyciBvZiB6aXBwZWQpIHtcbiAgICBjb25zdCBmMCA9IGFyclswXTtcbiAgICBjb25zdCBmMSA9IGFyclsxXTtcblxuICAgIGlmICh0eXBlb2YgZjAgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBmMSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGlzRGlmZmVyZW50ID0gaXNEaWZmZXJlbnRGcmFnbWVudChmMCwgZjEsIG9wdGlvbnMpO1xuICAgICAgaWYgKCFpc0RpZmZlcmVudCkge1xuICAgICAgICBpbnRlcnNlY3RlZC5wdXNoKHVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMoZjAsIGYxKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaW50ZXJzZWN0ZWQucmV2ZXJzZSgpO1xuXG4gIHJldHVybiBpbnRlcnNlY3RlZDtcbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kUmVwZWF0aW5nTGFzdEluZGV4QW5kTm9kZU5hbWUgPSAoXG4gIGZyYWdtZW50czogRWxlbWVudEZyYWdtZW50W11cbik6IHsgaW5kZXg6IG51bWJlcjsgbm9kZU5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCB9ID0+IHtcbiAgY29uc3QgcmVwZWF0aW5nTm9kZU5hbWUgPSBbJ2xpJywgJ2R0JywgJ2RkJywgJ3RyJywgJ3RoJywgJ3RkJ107XG4gIGNvbnN0IGluZGV4ID0gXy5maW5kTGFzdEluZGV4KGZyYWdtZW50cywgZiA9PlxuICAgIHJlcGVhdGluZ05vZGVOYW1lLmluY2x1ZGVzKGYubm9kZU5hbWUpXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBpbmRleCxcbiAgICBub2RlTmFtZTogZnJhZ21lbnRzW2luZGV4XSA/IGZyYWdtZW50c1tpbmRleF0ubm9kZU5hbWUgOiB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZmluZERpZmZlcmVudEZyYWdtZW50SW5kaWNlcyA9IChcbiAgZnJhZ21lbnRzMDogRWxlbWVudEZyYWdtZW50W10sXG4gIGZyYWdtZW50czE6IEVsZW1lbnRGcmFnbWVudFtdLFxuICBvcHRpb25zOiBEaWZmZXJlbnRJZ25vcmVPcHRpb25zID0ge31cbik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgemlwcGVkID0gXy56aXAoZnJhZ21lbnRzMCwgZnJhZ21lbnRzMSkuc2xpY2UoMCwgZnJhZ21lbnRzMC5sZW5ndGgpO1xuXG4gIGNvbnN0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gIHppcHBlZC5mb3JFYWNoKChhcnIsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgZjAgPSBhcnJbMF07XG4gICAgY29uc3QgZjEgPSBhcnJbMV07XG5cbiAgICBpZiAodHlwZW9mIGYwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZjEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoaXNEaWZmZXJlbnRGcmFnbWVudChmMCwgZjEsIG9wdGlvbnMpKSB7XG4gICAgICAgIGluZGljZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kaWNlcztcbn07XG5cbmV4cG9ydCBjb25zdCBpc0RpZmZlcmVudEZyYWdtZW50ID0gKFxuICBmcmFnbWVudDA6IEVsZW1lbnRGcmFnbWVudCxcbiAgZnJhZ21lbnQxOiBFbGVtZW50RnJhZ21lbnQsXG4gIG9wdGlvbnM6IERpZmZlcmVudElnbm9yZU9wdGlvbnMgPSB7fVxuKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgbm9kZU5hbWU6IGZhbHNlLFxuICAgIGluZGV4OiBmYWxzZSxcbiAgICBpZDogZmFsc2UsXG4gICAgY2xhc3NOYW1lOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBkZXB0aDogZmFsc2UsXG4gICAgLi4ub3B0aW9ucyxcbiAgfTtcblxuICBjb25zdCBmMCA9IHtcbiAgICAuLi5mcmFnbWVudDAsXG4gICAgbm9kZU5hbWU6IG9wdHMubm9kZU5hbWUgPyAnKicgOiBmcmFnbWVudDAubm9kZU5hbWUsXG4gICAgaW5kZXg6IG9wdHMuaW5kZXggPyAtMSA6IGZyYWdtZW50MC5pbmRleCxcbiAgICBpZDogb3B0cy5pZCA/IHVuZGVmaW5lZCA6IGZyYWdtZW50MC5pZCxcbiAgICBjbGFzc05hbWVzOiBvcHRzLmNsYXNzTmFtZSA/IFtdIDogZnJhZ21lbnQwLmNsYXNzTmFtZXMsXG4gICAgcm9sZXM6IG9wdHMucm9sZSA/IFtdIDogZnJhZ21lbnQwLnJvbGVzLFxuICAgIGRlcHRoOiBvcHRzLmRlcHRoID8gLTEgOiBmcmFnbWVudDAuZGVwdGgsXG4gIH07XG5cbiAgY29uc3QgZjEgPSB7XG4gICAgLi4uZnJhZ21lbnQxLFxuICAgIG5vZGVOYW1lOiBvcHRzLm5vZGVOYW1lID8gJyonIDogZnJhZ21lbnQxLm5vZGVOYW1lLFxuICAgIGluZGV4OiBvcHRzLmluZGV4ID8gLTEgOiBmcmFnbWVudDEuaW5kZXgsXG4gICAgaWQ6IG9wdHMuaWQgPyB1bmRlZmluZWQgOiBmcmFnbWVudDEuaWQsXG4gICAgcm9sZXM6IG9wdHMucm9sZSA/IFtdIDogZnJhZ21lbnQxLnJvbGVzLFxuICAgIGNsYXNzTmFtZXM6IG9wdHMuY2xhc3NOYW1lID8gW10gOiBmcmFnbWVudDEuY2xhc3NOYW1lcyxcbiAgICBkZXB0aDogb3B0cy5kZXB0aCA/IC0xIDogZnJhZ21lbnQxLmRlcHRoLFxuICB9O1xuXG4gIHJldHVybiAhXy5pc0VxdWFsKGYwLCBmMSk7XG59O1xuXG5leHBvcnQgY29uc3QgdW5jb25zdHJhaW5lZERpZmZlcmVudFBhcmFtcyA9IChcbiAgZnJhZ21lbnQwOiBFbGVtZW50RnJhZ21lbnQsXG4gIGZyYWdtZW50MTogRWxlbWVudEZyYWdtZW50XG4pOiBFbGVtZW50RnJhZ21lbnQgPT4ge1xuICBsZXQgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50MCB9O1xuXG4gIGlmIChmcmFnbWVudDAubm9kZU5hbWUgIT09IGZyYWdtZW50MS5ub2RlTmFtZSkge1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgbm9kZU5hbWU6ICcqJyB9O1xuICB9XG5cbiAgaWYgKGZyYWdtZW50MC5pbmRleCAhPT0gZnJhZ21lbnQxLmluZGV4KSB7XG4gICAgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50LCBpbmRleDogLTEgfTtcbiAgfVxuXG4gIGlmIChmcmFnbWVudDAuaWQgIT09IGZyYWdtZW50MS5pZCkge1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgaWQ6IHVuZGVmaW5lZCB9O1xuICB9XG5cbiAgaWYgKCFfLmlzRXF1YWwoZnJhZ21lbnQwLmNsYXNzTmFtZXMsIGZyYWdtZW50MS5jbGFzc05hbWVzKSkge1xuICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBfLmludGVyc2VjdGlvbihcbiAgICAgIGZyYWdtZW50MC5jbGFzc05hbWVzLFxuICAgICAgZnJhZ21lbnQxLmNsYXNzTmFtZXNcbiAgICApO1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgY2xhc3NOYW1lcyB9O1xuICB9XG5cbiAgaWYgKCFfLmlzRXF1YWwoZnJhZ21lbnQwLnJvbGVzLCBmcmFnbWVudDEucm9sZXMpKSB7XG4gICAgY29uc3Qgcm9sZXMgPSBfLmludGVyc2VjdGlvbihmcmFnbWVudDAucm9sZXMsIGZyYWdtZW50MS5yb2xlcyk7XG4gICAgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50LCByb2xlcyB9O1xuICB9XG5cbiAgaWYgKGZyYWdtZW50MC51bmlxdWVLZXkgIT09IGZyYWdtZW50MS51bmlxdWVLZXkpIHtcbiAgICBmcmFnbWVudCA9IHsgLi4uZnJhZ21lbnQsIHVuaXF1ZUtleTogVW5pcXVlS2V5LkluZGV4IH07XG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnQ7XG59O1xuIl19