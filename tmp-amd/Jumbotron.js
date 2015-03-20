define(["exports", "module", "react", "./utils/joinClasses"], function (exports, module, _react, _utilsJoinClasses) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var joinClasses = _interopRequire(_utilsJoinClasses);

  var Jumbotron = React.createClass({
    displayName: "Jumbotron",

    render: function render() {
      return React.createElement(
        "div",
        _extends({}, this.props, { className: joinClasses(this.props.className, "jumbotron") }),
        this.props.children
      );
    }
  });

  module.exports = Jumbotron;
});