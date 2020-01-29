"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinConditionsByOr = exports.joinConditionsByAnd = exports.buildPositionCondition = exports.buildRoleCondition = exports.buildClassNameCondition = exports.buildIdCondition = exports.buildCondition = exports.buidlNodeName = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _interfaces = require("../identifier/interfaces");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// tslint:disable-next-line
var With = require('xpather').With; // tslint:disable-next-line


var Condition = require('xpather/built/condition').Condition;

var buidlNodeName = function buidlNodeName(fragment) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = _objectSpread({
    id: false
  }, options);

  return opts.id && typeof fragment.id !== 'undefined' ? '*' : fragment.nodeName;
};

exports.buidlNodeName = buidlNodeName;

var buildCondition = function buildCondition(fragment) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var opts = _objectSpread({
    id: false,
    className: false,
    role: false,
    strict: true,
    ignoreUniqueKey: false
  }, options);

  var idCondition = buildIdCondition(fragment, opts);
  var classNameConditions = buildClassNameCondition(fragment, opts);
  var roleConditions = buildRoleCondition(fragment, opts);
  var positionCondition = buildPositionCondition(fragment, opts);

  var conditionArray = _lodash.default.compact([idCondition, classNameConditions, roleConditions, positionCondition]);

  var conditions = conditionArray.length > 0 ? opts.strict ? joinConditionsByAnd(conditionArray) : joinConditionsByOr(conditionArray) : undefined;
  return conditions;
};

exports.buildCondition = buildCondition;

var buildIdCondition = function buildIdCondition(fragment, options) {
  if (options.ignoreUniqueKey && options.id && typeof fragment.id !== 'undefined') {
    return With.exactId(fragment.id);
  } else {
    return undefined;
  }
};

exports.buildIdCondition = buildIdCondition;

var buildClassNameCondition = function buildClassNameCondition(fragment, options) {
  if (!options.ignoreUniqueKey && fragment.uniqueKey === _interfaces.UniqueKey.ClassName && fragment.classNames.length > 0 || options.className && fragment.classNames.length > 0) {
    var arr = fragment.classNames.map(function (cn) {
      return With.attribute('class', cn);
    });
    return options.strict ? joinConditionsByAnd(arr) : joinConditionsByOr(arr);
  } else {
    return undefined;
  }
};

exports.buildClassNameCondition = buildClassNameCondition;

var buildRoleCondition = function buildRoleCondition(fragment, options) {
  if (!options.ignoreUniqueKey && fragment.uniqueKey === _interfaces.UniqueKey.Role && fragment.roles.length > 0 || options.role && fragment.roles.length > 0) {
    var arr = fragment.roles.map(function (r) {
      return With.attribute('role', r);
    });
    return options.strict ? joinConditionsByAnd(arr) : joinConditionsByOr(arr);
  } else {
    return undefined;
  }
};

exports.buildRoleCondition = buildRoleCondition;

var buildPositionCondition = function buildPositionCondition(fragment, options) {
  if (!options.ignoreUniqueKey) {
    if (fragment.uniqueKey === _interfaces.UniqueKey.Index && fragment.hasSiblings && fragment.index + 1) {
      return With.position(fragment.index + 1);
    } else {
      return undefined;
    }
  } else {
    if (!fragment.hasSiblings || fragment.index === -1) {
      return undefined;
    }

    if (options.id && typeof fragment.id !== 'undefined') {
      return undefined;
    }

    if (options.className && fragment.classNames.length > 0 || options.role && fragment.roles.length > 0) {
      return new Condition("position() = ".concat(fragment.index + 1));
    } else {
      return With.position(fragment.index + 1);
    }
  }
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


exports.buildPositionCondition = buildPositionCondition;

var joinConditionsByAnd = function joinConditionsByAnd(conditions) {
  return conditions.reduce(function (acc, current) {
    return acc.and(current);
  });
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


exports.joinConditionsByAnd = joinConditionsByAnd;

var joinConditionsByOr = function joinConditionsByOr(conditions) {
  return conditions.reduce(function (acc, current) {
    return acc.or(current);
  });
};

exports.joinConditionsByOr = joinConditionsByOr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy94cGF0aC9idWlsZGVyLnRzIl0sIm5hbWVzIjpbIldpdGgiLCJyZXF1aXJlIiwiQ29uZGl0aW9uIiwiYnVpZGxOb2RlTmFtZSIsImZyYWdtZW50Iiwib3B0aW9ucyIsIm9wdHMiLCJpZCIsIm5vZGVOYW1lIiwiYnVpbGRDb25kaXRpb24iLCJjbGFzc05hbWUiLCJyb2xlIiwic3RyaWN0IiwiaWdub3JlVW5pcXVlS2V5IiwiaWRDb25kaXRpb24iLCJidWlsZElkQ29uZGl0aW9uIiwiY2xhc3NOYW1lQ29uZGl0aW9ucyIsImJ1aWxkQ2xhc3NOYW1lQ29uZGl0aW9uIiwicm9sZUNvbmRpdGlvbnMiLCJidWlsZFJvbGVDb25kaXRpb24iLCJwb3NpdGlvbkNvbmRpdGlvbiIsImJ1aWxkUG9zaXRpb25Db25kaXRpb24iLCJjb25kaXRpb25BcnJheSIsIl8iLCJjb21wYWN0IiwiY29uZGl0aW9ucyIsImxlbmd0aCIsImpvaW5Db25kaXRpb25zQnlBbmQiLCJqb2luQ29uZGl0aW9uc0J5T3IiLCJ1bmRlZmluZWQiLCJleGFjdElkIiwidW5pcXVlS2V5IiwiVW5pcXVlS2V5IiwiQ2xhc3NOYW1lIiwiY2xhc3NOYW1lcyIsImFyciIsIm1hcCIsImNuIiwiYXR0cmlidXRlIiwiUm9sZSIsInJvbGVzIiwiciIsIkluZGV4IiwiaGFzU2libGluZ3MiLCJpbmRleCIsInBvc2l0aW9uIiwicmVkdWNlIiwiYWNjIiwiY3VycmVudCIsImFuZCIsIm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLElBQUksR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQkQsSUFBaEMsQyxDQUNBOzs7QUFDQSxJQUFNRSxTQUFTLEdBQUdELE9BQU8sQ0FBQyx5QkFBRCxDQUFQLENBQW1DQyxTQUFyRDs7QUFrQk8sSUFBTUMsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUMzQkMsUUFEMkIsRUFHaEI7QUFBQSxNQURY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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRWxlbWVudEZyYWdtZW50LCBVbmlxdWVLZXkgfSBmcm9tICcuLi9pZGVudGlmaWVyL2ludGVyZmFjZXMnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbmNvbnN0IFdpdGggPSByZXF1aXJlKCd4cGF0aGVyJykuV2l0aDtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuY29uc3QgQ29uZGl0aW9uID0gcmVxdWlyZSgneHBhdGhlci9idWlsdC9jb25kaXRpb24nKS5Db25kaXRpb247XG5cbmV4cG9ydCBpbnRlcmZhY2UgWFBhdGhPcHRpb25zIHtcbiAgaWQ/OiBib29sZWFuO1xuICBjbGFzc05hbWU/OiBib29sZWFuO1xuICByb2xlPzogYm9vbGVhbjtcbiAgc3RyaWN0PzogYm9vbGVhbjtcbiAgaWdub3JlVW5pcXVlS2V5PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBYUGF0aElubmVyT3B0aW9ucyB7XG4gIGlkOiBib29sZWFuO1xuICBjbGFzc05hbWU6IGJvb2xlYW47XG4gIHJvbGU6IGJvb2xlYW47XG4gIHN0cmljdDogYm9vbGVhbjtcbiAgaWdub3JlVW5pcXVlS2V5OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgYnVpZGxOb2RlTmFtZSA9IChcbiAgZnJhZ21lbnQ6IEVsZW1lbnRGcmFnbWVudCxcbiAgb3B0aW9uczogWFBhdGhPcHRpb25zID0ge31cbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgaWQ6IGZhbHNlLFxuICAgIC4uLm9wdGlvbnMsXG4gIH07XG5cbiAgcmV0dXJuIG9wdHMuaWQgJiYgdHlwZW9mIGZyYWdtZW50LmlkICE9PSAndW5kZWZpbmVkJ1xuICAgID8gJyonXG4gICAgOiBmcmFnbWVudC5ub2RlTmFtZTtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZENvbmRpdGlvbiA9IChcbiAgZnJhZ21lbnQ6IEVsZW1lbnRGcmFnbWVudCxcbiAgb3B0aW9uczogWFBhdGhPcHRpb25zID0ge31cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbik6IGFueSA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7XG4gICAgaWQ6IGZhbHNlLFxuICAgIGNsYXNzTmFtZTogZmFsc2UsXG4gICAgcm9sZTogZmFsc2UsXG4gICAgc3RyaWN0OiB0cnVlLFxuICAgIGlnbm9yZVVuaXF1ZUtleTogZmFsc2UsXG4gICAgLi4ub3B0aW9ucyxcbiAgfTtcblxuICBjb25zdCBpZENvbmRpdGlvbiA9IGJ1aWxkSWRDb25kaXRpb24oZnJhZ21lbnQsIG9wdHMpO1xuICBjb25zdCBjbGFzc05hbWVDb25kaXRpb25zID0gYnVpbGRDbGFzc05hbWVDb25kaXRpb24oZnJhZ21lbnQsIG9wdHMpO1xuICBjb25zdCByb2xlQ29uZGl0aW9ucyA9IGJ1aWxkUm9sZUNvbmRpdGlvbihmcmFnbWVudCwgb3B0cyk7XG4gIGNvbnN0IHBvc2l0aW9uQ29uZGl0aW9uID0gYnVpbGRQb3NpdGlvbkNvbmRpdGlvbihmcmFnbWVudCwgb3B0cyk7XG5cbiAgY29uc3QgY29uZGl0aW9uQXJyYXkgPSBfLmNvbXBhY3QoW1xuICAgIGlkQ29uZGl0aW9uLFxuICAgIGNsYXNzTmFtZUNvbmRpdGlvbnMsXG4gICAgcm9sZUNvbmRpdGlvbnMsXG4gICAgcG9zaXRpb25Db25kaXRpb24sXG4gIF0pO1xuXG4gIGNvbnN0IGNvbmRpdGlvbnMgPVxuICAgIGNvbmRpdGlvbkFycmF5Lmxlbmd0aCA+IDBcbiAgICAgID8gb3B0cy5zdHJpY3RcbiAgICAgICAgPyBqb2luQ29uZGl0aW9uc0J5QW5kKGNvbmRpdGlvbkFycmF5KVxuICAgICAgICA6IGpvaW5Db25kaXRpb25zQnlPcihjb25kaXRpb25BcnJheSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiBjb25kaXRpb25zO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkSWRDb25kaXRpb24gPSAoXG4gIGZyYWdtZW50OiBFbGVtZW50RnJhZ21lbnQsXG4gIG9wdGlvbnM6IFhQYXRoSW5uZXJPcHRpb25zXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pOiBhbnkgPT4ge1xuICBpZiAoXG4gICAgb3B0aW9ucy5pZ25vcmVVbmlxdWVLZXkgJiZcbiAgICBvcHRpb25zLmlkICYmXG4gICAgdHlwZW9mIGZyYWdtZW50LmlkICE9PSAndW5kZWZpbmVkJ1xuICApIHtcbiAgICByZXR1cm4gV2l0aC5leGFjdElkKGZyYWdtZW50LmlkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRDbGFzc05hbWVDb25kaXRpb24gPSAoXG4gIGZyYWdtZW50OiBFbGVtZW50RnJhZ21lbnQsXG4gIG9wdGlvbnM6IFhQYXRoSW5uZXJPcHRpb25zXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4pOiBhbnkgPT4ge1xuICBpZiAoXG4gICAgKCFvcHRpb25zLmlnbm9yZVVuaXF1ZUtleSAmJlxuICAgICAgZnJhZ21lbnQudW5pcXVlS2V5ID09PSBVbmlxdWVLZXkuQ2xhc3NOYW1lICYmXG4gICAgICBmcmFnbWVudC5jbGFzc05hbWVzLmxlbmd0aCA+IDApIHx8XG4gICAgKG9wdGlvbnMuY2xhc3NOYW1lICYmIGZyYWdtZW50LmNsYXNzTmFtZXMubGVuZ3RoID4gMClcbiAgKSB7XG4gICAgY29uc3QgYXJyID0gZnJhZ21lbnQuY2xhc3NOYW1lcy5tYXAoY24gPT4gV2l0aC5hdHRyaWJ1dGUoJ2NsYXNzJywgY24pKTtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHJpY3QgPyBqb2luQ29uZGl0aW9uc0J5QW5kKGFycikgOiBqb2luQ29uZGl0aW9uc0J5T3IoYXJyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRSb2xlQ29uZGl0aW9uID0gKFxuICBmcmFnbWVudDogRWxlbWVudEZyYWdtZW50LFxuICBvcHRpb25zOiBYUGF0aElubmVyT3B0aW9uc1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuKTogYW55ID0+IHtcbiAgaWYgKFxuICAgICghb3B0aW9ucy5pZ25vcmVVbmlxdWVLZXkgJiZcbiAgICAgIGZyYWdtZW50LnVuaXF1ZUtleSA9PT0gVW5pcXVlS2V5LlJvbGUgJiZcbiAgICAgIGZyYWdtZW50LnJvbGVzLmxlbmd0aCA+IDApIHx8XG4gICAgKG9wdGlvbnMucm9sZSAmJiBmcmFnbWVudC5yb2xlcy5sZW5ndGggPiAwKVxuICApIHtcbiAgICBjb25zdCBhcnIgPSBmcmFnbWVudC5yb2xlcy5tYXAociA9PiBXaXRoLmF0dHJpYnV0ZSgncm9sZScsIHIpKTtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHJpY3QgPyBqb2luQ29uZGl0aW9uc0J5QW5kKGFycikgOiBqb2luQ29uZGl0aW9uc0J5T3IoYXJyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRQb3NpdGlvbkNvbmRpdGlvbiA9IChcbiAgZnJhZ21lbnQ6IEVsZW1lbnRGcmFnbWVudCxcbiAgb3B0aW9uczogWFBhdGhJbm5lck9wdGlvbnNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbik6IGFueSA9PiB7XG4gIGlmICghb3B0aW9ucy5pZ25vcmVVbmlxdWVLZXkpIHtcbiAgICBpZiAoXG4gICAgICBmcmFnbWVudC51bmlxdWVLZXkgPT09IFVuaXF1ZUtleS5JbmRleCAmJlxuICAgICAgZnJhZ21lbnQuaGFzU2libGluZ3MgJiZcbiAgICAgIGZyYWdtZW50LmluZGV4ICsgMVxuICAgICkge1xuICAgICAgcmV0dXJuIFdpdGgucG9zaXRpb24oZnJhZ21lbnQuaW5kZXggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFmcmFnbWVudC5oYXNTaWJsaW5ncyB8fCBmcmFnbWVudC5pbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuaWQgJiYgdHlwZW9mIGZyYWdtZW50LmlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAob3B0aW9ucy5jbGFzc05hbWUgJiYgZnJhZ21lbnQuY2xhc3NOYW1lcy5sZW5ndGggPiAwKSB8fFxuICAgICAgKG9wdGlvbnMucm9sZSAmJiBmcmFnbWVudC5yb2xlcy5sZW5ndGggPiAwKVxuICAgICkge1xuICAgICAgcmV0dXJuIG5ldyBDb25kaXRpb24oYHBvc2l0aW9uKCkgPSAke2ZyYWdtZW50LmluZGV4ICsgMX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFdpdGgucG9zaXRpb24oZnJhZ21lbnQuaW5kZXggKyAxKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgY29uc3Qgam9pbkNvbmRpdGlvbnNCeUFuZCA9IChjb25kaXRpb25zOiBhbnlbXSk6IGFueSA9PiB7XG4gIHJldHVybiBjb25kaXRpb25zLnJlZHVjZSgoYWNjLCBjdXJyZW50KSA9PiB7XG4gICAgcmV0dXJuIGFjYy5hbmQoY3VycmVudCk7XG4gIH0pO1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBjb25zdCBqb2luQ29uZGl0aW9uc0J5T3IgPSAoY29uZGl0aW9uczogYW55W10pOiBhbnkgPT4ge1xuICByZXR1cm4gY29uZGl0aW9ucy5yZWR1Y2UoKGFjYywgY3VycmVudCkgPT4ge1xuICAgIHJldHVybiBhY2Mub3IoY3VycmVudCk7XG4gIH0pO1xufTtcbiJdfQ==