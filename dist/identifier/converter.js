"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeMinHasId = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var takeMinHasId = function takeMinHasId(fragments) {
  var index = _lodash.default.findLastIndex(fragments, function (f) {
    return typeof f.id !== 'undefined';
  });

  return index !== -1 ? fragments.slice(index) : fragments;
};

exports.takeMinHasId = takeMinHasId;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZGVudGlmaWVyL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6WyJ0YWtlTWluSGFzSWQiLCJmcmFnbWVudHMiLCJpbmRleCIsIl8iLCJmaW5kTGFzdEluZGV4IiwiZiIsImlkIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUlPLElBQU1BLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQzFCQyxTQUQwQixFQUVKO0FBQ3RCLE1BQU1DLEtBQUssR0FBR0MsZ0JBQUVDLGFBQUYsQ0FBZ0JILFNBQWhCLEVBQTJCLFVBQUFJLENBQUM7QUFBQSxXQUFJLE9BQU9BLENBQUMsQ0FBQ0MsRUFBVCxLQUFnQixXQUFwQjtBQUFBLEdBQTVCLENBQWQ7O0FBQ0EsU0FBT0osS0FBSyxLQUFLLENBQUMsQ0FBWCxHQUFlRCxTQUFTLENBQUNNLEtBQVYsQ0FBZ0JMLEtBQWhCLENBQWYsR0FBd0NELFNBQS9DO0FBQ0QsQ0FMTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IEVsZW1lbnRGcmFnbWVudCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjb25zdCB0YWtlTWluSGFzSWQgPSAoXG4gIGZyYWdtZW50czogRWxlbWVudEZyYWdtZW50W11cbik6IEVsZW1lbnRGcmFnbWVudFtdID0+IHtcbiAgY29uc3QgaW5kZXggPSBfLmZpbmRMYXN0SW5kZXgoZnJhZ21lbnRzLCBmID0+IHR5cGVvZiBmLmlkICE9PSAndW5kZWZpbmVkJyk7XG4gIHJldHVybiBpbmRleCAhPT0gLTEgPyBmcmFnbWVudHMuc2xpY2UoaW5kZXgpIDogZnJhZ21lbnRzO1xufTtcbiJdfQ==