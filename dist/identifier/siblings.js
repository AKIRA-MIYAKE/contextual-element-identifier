"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unconstrainedDifferentParams = exports.isDifferentFragment = exports.findDifferentFragmentIndices = exports.findRepeatingLastIndexAndNodeName = exports.intersectionRight = exports.intersectionLeft = exports.ancestorFragmetnsFromIdentifiers = exports.siblingsFragmentsFromDifferentDepthIdentifiers = exports.siblingsFragmentsFromSameDepthIdentifiers = exports.siblingsFragmentsFromFragments = exports.siblingsFragmentsFromIdentifiers = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _interfaces = require("./interfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
        return i === index ? _objectSpread({}, f, {
          index: -1
        }) : f;
      });

    case 'th':
    case 'td':
      {
        var left = fragments.slice(0, index).map(function (f) {
          return f.nodeName === 'tr' ? _objectSpread({}, f, {
            index: -1
          }) : f;
        });
        var right = fragments.slice(index);
        return [].concat(_toConsumableArray(left), _toConsumableArray(right));
      }

    default:
      return fragments.map(function (f) {
        return f.hasSiblings ? _objectSpread({}, f, {
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
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = zipped[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
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
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = zipped[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
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

  var f0 = _objectSpread({}, fragment0, {
    nodeName: opts.nodeName ? '*' : fragment0.nodeName,
    index: opts.index ? -1 : fragment0.index,
    id: opts.id ? undefined : fragment0.id,
    classNames: opts.className ? [] : fragment0.classNames,
    roles: opts.role ? [] : fragment0.roles,
    depth: opts.depth ? -1 : fragment0.depth
  });

  var f1 = _objectSpread({}, fragment1, {
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
    fragment = _objectSpread({}, fragment, {
      nodeName: '*'
    });
  }

  if (fragment0.index !== fragment1.index) {
    fragment = _objectSpread({}, fragment, {
      index: -1
    });
  }

  if (fragment0.id !== fragment1.id) {
    fragment = _objectSpread({}, fragment, {
      id: undefined
    });
  }

  if (!_lodash.default.isEqual(fragment0.classNames, fragment1.classNames)) {
    var classNames = _lodash.default.intersection(fragment0.classNames, fragment1.classNames);

    fragment = _objectSpread({}, fragment, {
      classNames: classNames
    });
  }

  if (!_lodash.default.isEqual(fragment0.roles, fragment1.roles)) {
    var roles = _lodash.default.intersection(fragment0.roles, fragment1.roles);

    fragment = _objectSpread({}, fragment, {
      roles: roles
    });
  }

  if (fragment0.uniqueKey !== fragment1.uniqueKey) {
    fragment = _objectSpread({}, fragment, {
      uniqueKey: _interfaces.UniqueKey.Index
    });
  }

  return fragment;
};

exports.unconstrainedDifferentParams = unconstrainedDifferentParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZGVudGlmaWVyL3NpYmxpbmdzLnRzIl0sIm5hbWVzIjpbInNpYmxpbmdzRnJhZ21lbnRzRnJvbUlkZW50aWZpZXJzIiwiaWRlbnRpZmllcnMiLCJoZWFkIiwiXyIsInRhaWwiLCJsZW5ndGgiLCJzaWJsaW5nc0ZyYWdtZW50c0Zyb21GcmFnbWVudHMiLCJhYnNvbHV0ZSIsImV2ZXJ5IiwiaWRlbnRpZmllciIsInNpYmxpbmdzRnJhZ21lbnRzRnJvbVNhbWVEZXB0aElkZW50aWZpZXJzIiwic2libGluZ3NGcmFnbWVudHNGcm9tRGlmZmVyZW50RGVwdGhJZGVudGlmaWVycyIsImZyYWdtZW50cyIsImZpbmRSZXBlYXRpbmdMYXN0SW5kZXhBbmROb2RlTmFtZSIsImluZGV4Iiwibm9kZU5hbWUiLCJtYXAiLCJmIiwiaSIsImxlZnQiLCJzbGljZSIsInJpZ2h0IiwiaGFzU2libGluZ3MiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyZW50IiwiaW5kaWNlcyIsImZpbmREaWZmZXJlbnRGcmFnbWVudEluZGljZXMiLCJpbmNsdWRlcyIsInVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMiLCJpbnRlcnNlY3Rpb25MZWZ0IiwiaW50ZXJzZWN0aW9uUmlnaHQiLCJhbmNlc3RvckZyYWdtZXRuc0Zyb21JZGVudGlmaWVycyIsImludGVyc2VjdGVkIiwiZnJhZ21lbnRzMCIsImZyYWdtZW50czEiLCJvcHRpb25zIiwiaWQiLCJyb2xlIiwiY2xhc3NObWFlIiwiZGVwdGgiLCJ6aXBwZWQiLCJ6aXAiLCJhcnIiLCJmMCIsImYxIiwiaXNEaWZmZXJlbnQiLCJpc0RpZmZlcmVudEZyYWdtZW50IiwicHVzaCIsImNsYXNzTmFtZSIsInJldmVyc2VkMCIsInJlZHVjZVJpZ2h0IiwicmV2ZXJzZWQxIiwicmV2ZXJzZSIsInJlcGVhdGluZ05vZGVOYW1lIiwiZmluZExhc3RJbmRleCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJmcmFnbWVudDAiLCJmcmFnbWVudDEiLCJvcHRzIiwiY2xhc3NOYW1lcyIsInJvbGVzIiwiaXNFcXVhbCIsImZyYWdtZW50IiwiaW50ZXJzZWN0aW9uIiwidW5pcXVlS2V5IiwiVW5pcXVlS2V5IiwiSW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV08sSUFBTUEsZ0NBQWdDLEdBQUcsU0FBbkNBLGdDQUFtQyxDQUM5Q0MsV0FEOEMsRUFFeEI7QUFDdEIsTUFBTUMsSUFBSSxHQUFHQyxnQkFBRUQsSUFBRixDQUFPRCxXQUFQLENBQWI7O0FBQ0EsTUFBTUcsSUFBSSxHQUFHRCxnQkFBRUMsSUFBRixDQUFPSCxXQUFQLENBQWI7O0FBRUEsTUFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVCxXQUFPLEVBQVA7QUFDRDs7QUFFRCxNQUFJRSxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBT0MsOEJBQThCLENBQUNKLElBQUksQ0FBQ0ssUUFBTixDQUFyQztBQUNELEdBRkQsTUFFTyxJQUNMSCxJQUFJLENBQUNJLEtBQUwsQ0FDRSxVQUFBQyxVQUFVO0FBQUEsV0FBSUEsVUFBVSxDQUFDRixRQUFYLENBQW9CRixNQUFwQixLQUErQkgsSUFBSSxDQUFDSyxRQUFMLENBQWNGLE1BQWpEO0FBQUEsR0FEWixDQURLLEVBSUw7QUFDQSxXQUFPSyx5Q0FBeUMsQ0FBQ1IsSUFBRCxFQUFPRSxJQUFQLENBQWhEO0FBQ0QsR0FOTSxNQU1BO0FBQ0wsV0FBT08sOENBQThDLENBQUNULElBQUQsRUFBT0UsSUFBUCxDQUFyRDtBQUNEO0FBQ0YsQ0FyQk07Ozs7QUF1QkEsSUFBTUUsOEJBQThCLEdBQUcsU0FBakNBLDhCQUFpQyxDQUM1Q00sU0FENEMsRUFFdEI7QUFBQSw4QkFDTUMsaUNBQWlDLENBQUNELFNBQUQsQ0FEdkM7QUFBQSxNQUNkRSxLQURjLHlCQUNkQSxLQURjO0FBQUEsTUFDUEMsUUFETyx5QkFDUEEsUUFETzs7QUFHdEIsVUFBUUEsUUFBUjtBQUNFLFNBQUssSUFBTDtB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U0FBUyxDQUFDRSxVQUZPLENBQW5COztBQUlBRyxJQUFBQSxRQUFRLHFCQUFRQSxRQUFSO0FBQWtCSCxNQUFBQSxVQUFVLEVBQVZBO0FBQWxCLE1BQVI7QUFDRDs7QUFFRCxNQUFJLENBQUMxRCxnQkFBRTRELE9BQUYsQ0FBVUwsU0FBUyxDQUFDSSxLQUFwQixFQUEyQkgsU0FBUyxDQUFDRyxLQUFyQyxDQUFMLEVBQWtEO0FBQ2hELFFBQU1BLEtBQUssR0FBRzNELGdCQUFFOEQsWUFBRixDQUFlUCxTQUFTLENBQUNJLEtBQXpCLEVBQWdDSCxTQUFTLENBQUNHLEtBQTFDLENBQWQ7O0FBQ0FFLElBQUFBLFFBQVEscUJBQVFBLFFBQVI7QUFBa0JGLE1BQUFBLEtBQUssRUFBTEE7QUFBbEIsTUFBUjtBQUNEOztBQUVELE1BQUlKLFNBQVMsQ0FBQ1EsU0FBVixLQUF3QlAsU0FBUyxDQUFDTyxTQUF0QyxFQUFpRDtBQUMvQ0YsSUFBQUEsUUFBUSxxQkFBUUEsUUFBUjtBQUFrQkUsTUFBQUEsU0FBUyxFQUFFQyxzQkFBVUM7QUFBdkMsTUFBUjtBQUNEOztBQUVELFNBQU9KLFFBQVA7QUFDRCxDQXBDTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEVsZW1lbnRJZGVudGlmaWVyLCBFbGVtZW50RnJhZ21lbnQsIFVuaXF1ZUtleSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlmZmVyZW50SWdub3JlT3B0aW9ucyB7XG4gIG5vZGVOYW1lPzogYm9vbGVhbjtcbiAgaW5kZXg/OiBib29sZWFuO1xuICBpZD86IGJvb2xlYW47XG4gIGNsc2FzTmFtZT86IGJvb2xlYW47XG4gIHJvbGU/OiBib29sZWFuO1xuICBkZXB0aD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBzaWJsaW5nc0ZyYWdtZW50c0Zyb21JZGVudGlmaWVycyA9IChcbiAgaWRlbnRpZmllcnM6IEVsZW1lbnRJZGVudGlmaWVyW11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3QgaGVhZCA9IF8uaGVhZChpZGVudGlmaWVycyk7XG4gIGNvbnN0IHRhaWwgPSBfLnRhaWwoaWRlbnRpZmllcnMpO1xuXG4gIGlmICghaGVhZCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICh0YWlsLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBzaWJsaW5nc0ZyYWdtZW50c0Zyb21GcmFnbWVudHMoaGVhZC5hYnNvbHV0ZSk7XG4gIH0gZWxzZSBpZiAoXG4gICAgdGFpbC5ldmVyeShcbiAgICAgIGlkZW50aWZpZXIgPT4gaWRlbnRpZmllci5hYnNvbHV0ZS5sZW5ndGggPT09IGhlYWQuYWJzb2x1dGUubGVuZ3RoXG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gc2libGluZ3NGcmFnbWVudHNGcm9tU2FtZURlcHRoSWRlbnRpZmllcnMoaGVhZCwgdGFpbCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNpYmxpbmdzRnJhZ21lbnRzRnJvbURpZmZlcmVudERlcHRoSWRlbnRpZmllcnMoaGVhZCwgdGFpbCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzaWJsaW5nc0ZyYWdtZW50c0Zyb21GcmFnbWVudHMgPSAoXG4gIGZyYWdtZW50czogRWxlbWVudEZyYWdtZW50W11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3QgeyBpbmRleCwgbm9kZU5hbWUgfSA9IGZpbmRSZXBlYXRpbmdMYXN0SW5kZXhBbmROb2RlTmFtZShmcmFnbWVudHMpO1xuXG4gIHN3aXRjaCAobm9kZU5hbWUpIHtcbiAgICBjYXNlICdsaSc6XG4gICAgY2FzZSAnZHQnOlxuICAgIGNhc2UgJ2RkJzpcbiAgICBjYXNlICd0cic6XG4gICAgICByZXR1cm4gZnJhZ21lbnRzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGluZGV4ID8geyAuLi5mLCBpbmRleDogLTEgfSA6IGYpKTtcbiAgICBjYXNlICd0aCc6XG4gICAgY2FzZSAndGQnOiB7XG4gICAgICBjb25zdCBsZWZ0ID0gZnJhZ21lbnRzXG4gICAgICAgIC5zbGljZSgwLCBpbmRleClcbiAgICAgICAgLm1hcChmID0+IChmLm5vZGVOYW1lID09PSAndHInID8geyAuLi5mLCBpbmRleDogLTEgfSA6IGYpKTtcbiAgICAgIGNvbnN0IHJpZ2h0ID0gZnJhZ21lbnRzLnNsaWNlKGluZGV4KTtcbiAgICAgIHJldHVybiBbLi4ubGVmdCwgLi4ucmlnaHRdO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZyYWdtZW50cy5tYXAoZiA9PiAoZi5oYXNTaWJsaW5ncyA/IHsgLi4uZiwgaW5kZXg6IC0xIH0gOiBmKSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBzaWJsaW5nc0ZyYWdtZW50c0Zyb21TYW1lRGVwdGhJZGVudGlmaWVycyA9IChcbiAgaGVhZDogRWxlbWVudElkZW50aWZpZXIsXG4gIHRhaWw6IEVsZW1lbnRJZGVudGlmaWVyW11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgcmV0dXJuIHRhaWwucmVkdWNlKChhY2MsIGN1cnJlbnQpID0+IHtcbiAgICBjb25zdCBpbmRpY2VzID0gZmluZERpZmZlcmVudEZyYWdtZW50SW5kaWNlcyhhY2MsIGN1cnJlbnQuYWJzb2x1dGUpO1xuICAgIHJldHVybiBhY2MubWFwKChmLCBpKSA9PiB7XG4gICAgICBpZiAoaW5kaWNlcy5pbmNsdWRlcyhpKSkge1xuICAgICAgICByZXR1cm4gdW5jb25zdHJhaW5lZERpZmZlcmVudFBhcmFtcyhmLCBjdXJyZW50LmFic29sdXRlW2ldKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBoZWFkLmFic29sdXRlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaWJsaW5nc0ZyYWdtZW50c0Zyb21EaWZmZXJlbnREZXB0aElkZW50aWZpZXJzID0gKFxuICBoZWFkOiBFbGVtZW50SWRlbnRpZmllcixcbiAgdGFpbDogRWxlbWVudElkZW50aWZpZXJbXVxuKTogRWxlbWVudEZyYWdtZW50W10gPT4ge1xuICBjb25zdCBsZWZ0ID0gdGFpbC5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4ge1xuICAgIHJldHVybiBpbnRlcnNlY3Rpb25MZWZ0KGFjYywgY3VycmVudC5hYnNvbHV0ZSk7XG4gIH0sIGhlYWQuYWJzb2x1dGUpO1xuXG4gIGNvbnN0IHJpZ2h0ID0gdGFpbC5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4ge1xuICAgIHJldHVybiBpbnRlcnNlY3Rpb25SaWdodChhY2MsIGN1cnJlbnQuYWJzb2x1dGUpO1xuICB9LCBoZWFkLmFic29sdXRlKTtcblxuICByZXR1cm4gWy4uLmxlZnQsIC4uLnJpZ2h0XTtcbn07XG5cbmV4cG9ydCBjb25zdCBhbmNlc3RvckZyYWdtZXRuc0Zyb21JZGVudGlmaWVycyA9IChcbiAgaWRlbnRpZmllcnM6IEVsZW1lbnRJZGVudGlmaWVyW11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgaWYgKGlkZW50aWZpZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGludGVyc2VjdGVkID0gaWRlbnRpZmllcnNcbiAgICAubWFwKGkgPT4gaS5hYnNvbHV0ZSlcbiAgICAucmVkdWNlKChhY2MsIGN1cnJlbnQpID0+IHtcbiAgICAgIHJldHVybiBpbnRlcnNlY3Rpb25MZWZ0KGFjYywgY3VycmVudCk7XG4gICAgfSk7XG5cbiAgcmV0dXJuIHNpYmxpbmdzRnJhZ21lbnRzRnJvbUZyYWdtZW50cyhpbnRlcnNlY3RlZCk7XG59O1xuXG5leHBvcnQgY29uc3QgaW50ZXJzZWN0aW9uTGVmdCA9IChcbiAgZnJhZ21lbnRzMDogRWxlbWVudEZyYWdtZW50W10sXG4gIGZyYWdtZW50czE6IEVsZW1lbnRGcmFnbWVudFtdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgbm9kZU5hbWU6IGZhbHNlLFxuICAgIGlkOiBmYWxzZSxcbiAgICByb2xlOiBmYWxzZSxcbiAgICBjbGFzc05tYWU6IGZhbHNlLFxuICAgIGRlcHRoOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdCB6aXBwZWQgPSBfLnppcChmcmFnbWVudHMwLCBmcmFnbWVudHMxKTtcblxuICBjb25zdCBpbnRlcnNlY3RlZDogRWxlbWVudEZyYWdtZW50W10gPSBbXTtcbiAgZm9yIChjb25zdCBhcnIgb2YgemlwcGVkKSB7XG4gICAgY29uc3QgZjAgPSBhcnJbMF07XG4gICAgY29uc3QgZjEgPSBhcnJbMV07XG5cbiAgICBpZiAodHlwZW9mIGYwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZjEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpc0RpZmZlcmVudCA9IGlzRGlmZmVyZW50RnJhZ21lbnQoZjAsIGYxLCBvcHRpb25zKTtcbiAgICAgIGlmICghaXNEaWZmZXJlbnQpIHtcbiAgICAgICAgaW50ZXJzZWN0ZWQucHVzaCh1bmNvbnN0cmFpbmVkRGlmZmVyZW50UGFyYW1zKGYwLCBmMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbnRlcnNlY3RlZDtcbn07XG5cbmV4cG9ydCBjb25zdCBpbnRlcnNlY3Rpb25SaWdodCA9IChcbiAgZnJhZ21lbnRzMDogRWxlbWVudEZyYWdtZW50W10sXG4gIGZyYWdtZW50czE6IEVsZW1lbnRGcmFnbWVudFtdXG4pOiBFbGVtZW50RnJhZ21lbnRbXSA9PiB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgbm9kZU5hbWU6IGZhbHNlLFxuICAgIGlkOiB0cnVlLFxuICAgIHJvbGU6IGZhbHNlLFxuICAgIGNsYXNzTmFtZTogdHJ1ZSxcbiAgICBkZXB0aDogdHJ1ZSxcbiAgfTtcblxuICBjb25zdCByZXZlcnNlZDAgPSBmcmFnbWVudHMwLnJlZHVjZVJpZ2h0KFxuICAgIChhY2MsIGN1cnJlbnQpID0+IFsuLi5hY2MsIGN1cnJlbnRdLFxuICAgIFtdIGFzIEVsZW1lbnRGcmFnbWVudFtdXG4gICk7XG5cbiAgY29uc3QgcmV2ZXJzZWQxID0gZnJhZ21lbnRzMS5yZWR1Y2VSaWdodChcbiAgICAoYWNjLCBjdXJyZW50KSA9PiBbLi4uYWNjLCBjdXJyZW50XSxcbiAgICBbXSBhcyBFbGVtZW50RnJhZ21lbnRbXVxuICApO1xuXG4gIGNvbnN0IHppcHBlZCA9IF8uemlwKHJldmVyc2VkMCwgcmV2ZXJzZWQxKTtcblxuICBjb25zdCBpbnRlcnNlY3RlZDogRWxlbWVudEZyYWdtZW50W10gPSBbXTtcbiAgZm9yIChjb25zdCBhcnIgb2YgemlwcGVkKSB7XG4gICAgY29uc3QgZjAgPSBhcnJbMF07XG4gICAgY29uc3QgZjEgPSBhcnJbMV07XG5cbiAgICBpZiAodHlwZW9mIGYwICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZjEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBpc0RpZmZlcmVudCA9IGlzRGlmZmVyZW50RnJhZ21lbnQoZjAsIGYxLCBvcHRpb25zKTtcbiAgICAgIGlmICghaXNEaWZmZXJlbnQpIHtcbiAgICAgICAgaW50ZXJzZWN0ZWQucHVzaCh1bmNvbnN0cmFpbmVkRGlmZmVyZW50UGFyYW1zKGYwLCBmMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGludGVyc2VjdGVkLnJldmVyc2UoKTtcblxuICByZXR1cm4gaW50ZXJzZWN0ZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZFJlcGVhdGluZ0xhc3RJbmRleEFuZE5vZGVOYW1lID0gKFxuICBmcmFnbWVudHM6IEVsZW1lbnRGcmFnbWVudFtdXG4pOiB7IGluZGV4OiBudW1iZXI7IG5vZGVOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgfSA9PiB7XG4gIGNvbnN0IHJlcGVhdGluZ05vZGVOYW1lID0gWydsaScsICdkdCcsICdkZCcsICd0cicsICd0aCcsICd0ZCddO1xuICBjb25zdCBpbmRleCA9IF8uZmluZExhc3RJbmRleChmcmFnbWVudHMsIGYgPT5cbiAgICByZXBlYXRpbmdOb2RlTmFtZS5pbmNsdWRlcyhmLm5vZGVOYW1lKVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgaW5kZXgsXG4gICAgbm9kZU5hbWU6IGZyYWdtZW50c1tpbmRleF0gPyBmcmFnbWVudHNbaW5kZXhdLm5vZGVOYW1lIDogdW5kZWZpbmVkLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbmREaWZmZXJlbnRGcmFnbWVudEluZGljZXMgPSAoXG4gIGZyYWdtZW50czA6IEVsZW1lbnRGcmFnbWVudFtdLFxuICBmcmFnbWVudHMxOiBFbGVtZW50RnJhZ21lbnRbXSxcbiAgb3B0aW9uczogRGlmZmVyZW50SWdub3JlT3B0aW9ucyA9IHt9XG4pOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IHppcHBlZCA9IF8uemlwKGZyYWdtZW50czAsIGZyYWdtZW50czEpLnNsaWNlKDAsIGZyYWdtZW50czAubGVuZ3RoKTtcblxuICBjb25zdCBpbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICB6aXBwZWQuZm9yRWFjaCgoYXJyLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGYwID0gYXJyWzBdO1xuICAgIGNvbnN0IGYxID0gYXJyWzFdO1xuXG4gICAgaWYgKHR5cGVvZiBmMCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGYxICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGlzRGlmZmVyZW50RnJhZ21lbnQoZjAsIGYxLCBvcHRpb25zKSkge1xuICAgICAgICBpbmRpY2VzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGljZXM7XG59O1xuXG5leHBvcnQgY29uc3QgaXNEaWZmZXJlbnRGcmFnbWVudCA9IChcbiAgZnJhZ21lbnQwOiBFbGVtZW50RnJhZ21lbnQsXG4gIGZyYWdtZW50MTogRWxlbWVudEZyYWdtZW50LFxuICBvcHRpb25zOiBEaWZmZXJlbnRJZ25vcmVPcHRpb25zID0ge31cbik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBvcHRzID0ge1xuICAgIG5vZGVOYW1lOiBmYWxzZSxcbiAgICBpbmRleDogZmFsc2UsXG4gICAgaWQ6IGZhbHNlLFxuICAgIGNsYXNzTmFtZTogZmFsc2UsXG4gICAgcm9sZTogZmFsc2UsXG4gICAgZGVwdGg6IGZhbHNlLFxuICAgIC4uLm9wdGlvbnMsXG4gIH07XG5cbiAgY29uc3QgZjAgPSB7XG4gICAgLi4uZnJhZ21lbnQwLFxuICAgIG5vZGVOYW1lOiBvcHRzLm5vZGVOYW1lID8gJyonIDogZnJhZ21lbnQwLm5vZGVOYW1lLFxuICAgIGluZGV4OiBvcHRzLmluZGV4ID8gLTEgOiBmcmFnbWVudDAuaW5kZXgsXG4gICAgaWQ6IG9wdHMuaWQgPyB1bmRlZmluZWQgOiBmcmFnbWVudDAuaWQsXG4gICAgY2xhc3NOYW1lczogb3B0cy5jbGFzc05hbWUgPyBbXSA6IGZyYWdtZW50MC5jbGFzc05hbWVzLFxuICAgIHJvbGVzOiBvcHRzLnJvbGUgPyBbXSA6IGZyYWdtZW50MC5yb2xlcyxcbiAgICBkZXB0aDogb3B0cy5kZXB0aCA/IC0xIDogZnJhZ21lbnQwLmRlcHRoLFxuICB9O1xuXG4gIGNvbnN0IGYxID0ge1xuICAgIC4uLmZyYWdtZW50MSxcbiAgICBub2RlTmFtZTogb3B0cy5ub2RlTmFtZSA/ICcqJyA6IGZyYWdtZW50MS5ub2RlTmFtZSxcbiAgICBpbmRleDogb3B0cy5pbmRleCA/IC0xIDogZnJhZ21lbnQxLmluZGV4LFxuICAgIGlkOiBvcHRzLmlkID8gdW5kZWZpbmVkIDogZnJhZ21lbnQxLmlkLFxuICAgIHJvbGVzOiBvcHRzLnJvbGUgPyBbXSA6IGZyYWdtZW50MS5yb2xlcyxcbiAgICBjbGFzc05hbWVzOiBvcHRzLmNsYXNzTmFtZSA/IFtdIDogZnJhZ21lbnQxLmNsYXNzTmFtZXMsXG4gICAgZGVwdGg6IG9wdHMuZGVwdGggPyAtMSA6IGZyYWdtZW50MS5kZXB0aCxcbiAgfTtcblxuICByZXR1cm4gIV8uaXNFcXVhbChmMCwgZjEpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVuY29uc3RyYWluZWREaWZmZXJlbnRQYXJhbXMgPSAoXG4gIGZyYWdtZW50MDogRWxlbWVudEZyYWdtZW50LFxuICBmcmFnbWVudDE6IEVsZW1lbnRGcmFnbWVudFxuKTogRWxlbWVudEZyYWdtZW50ID0+IHtcbiAgbGV0IGZyYWdtZW50ID0geyAuLi5mcmFnbWVudDAgfTtcblxuICBpZiAoZnJhZ21lbnQwLm5vZGVOYW1lICE9PSBmcmFnbWVudDEubm9kZU5hbWUpIHtcbiAgICBmcmFnbWVudCA9IHsgLi4uZnJhZ21lbnQsIG5vZGVOYW1lOiAnKicgfTtcbiAgfVxuXG4gIGlmIChmcmFnbWVudDAuaW5kZXggIT09IGZyYWdtZW50MS5pbmRleCkge1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgaW5kZXg6IC0xIH07XG4gIH1cblxuICBpZiAoZnJhZ21lbnQwLmlkICE9PSBmcmFnbWVudDEuaWQpIHtcbiAgICBmcmFnbWVudCA9IHsgLi4uZnJhZ21lbnQsIGlkOiB1bmRlZmluZWQgfTtcbiAgfVxuXG4gIGlmICghXy5pc0VxdWFsKGZyYWdtZW50MC5jbGFzc05hbWVzLCBmcmFnbWVudDEuY2xhc3NOYW1lcykpIHtcbiAgICBjb25zdCBjbGFzc05hbWVzID0gXy5pbnRlcnNlY3Rpb24oXG4gICAgICBmcmFnbWVudDAuY2xhc3NOYW1lcyxcbiAgICAgIGZyYWdtZW50MS5jbGFzc05hbWVzXG4gICAgKTtcbiAgICBmcmFnbWVudCA9IHsgLi4uZnJhZ21lbnQsIGNsYXNzTmFtZXMgfTtcbiAgfVxuXG4gIGlmICghXy5pc0VxdWFsKGZyYWdtZW50MC5yb2xlcywgZnJhZ21lbnQxLnJvbGVzKSkge1xuICAgIGNvbnN0IHJvbGVzID0gXy5pbnRlcnNlY3Rpb24oZnJhZ21lbnQwLnJvbGVzLCBmcmFnbWVudDEucm9sZXMpO1xuICAgIGZyYWdtZW50ID0geyAuLi5mcmFnbWVudCwgcm9sZXMgfTtcbiAgfVxuXG4gIGlmIChmcmFnbWVudDAudW5pcXVlS2V5ICE9PSBmcmFnbWVudDEudW5pcXVlS2V5KSB7XG4gICAgZnJhZ21lbnQgPSB7IC4uLmZyYWdtZW50LCB1bmlxdWVLZXk6IFVuaXF1ZUtleS5JbmRleCB9O1xuICB9XG5cbiAgcmV0dXJuIGZyYWdtZW50O1xufTtcbiJdfQ==