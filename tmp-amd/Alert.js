define(["exports", "module", "react", "./utils/joinClasses", "./utils/classSet", "./BootstrapMixin"], function (exports, module, _react, _utilsJoinClasses, _utilsClassSet, _BootstrapMixin) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var React = _interopRequire(_react);

  var joinClasses = _interopRequire(_utilsJoinClasses);

  var classSet = _interopRequire(_utilsClassSet);

  var BootstrapMixin = _interopRequire(_BootstrapMixin);

  var Alert = React.createClass({
    displayName: "Alert",

    mixins: [BootstrapMixin],

    propTypes: {
      onDismiss: React.PropTypes.func,
      dismissAfter: React.PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        bsClass: "alert",
        bsStyle: "info"
      };
    },

    renderDismissButton: function renderDismissButton() {
      return React.createElement(
        "button",
        {
          type: "button",
          className: "close",
          onClick: this.props.onDismiss,
          "aria-hidden": "true" },
        "×"
      );
    },

    render: function render() {
      var classes = this.getBsClassSet();
      var isDismissable = !!this.props.onDismiss;

      classes["alert-dismissable"] = isDismissable;

      return React.createElement(
        "div",
        _extends({}, this.props, { className: joinClasses(this.props.className, classSet(classes)) }),
        isDismissable ? this.renderDismissButton() : null,
        this.props.children
      );
    },

    componentDidMount: function componentDidMount() {
      if (this.props.dismissAfter && this.props.onDismiss) {
        this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
      }
    },

    componentWillUnmount: function componentWillUnmount() {
      clearTimeout(this.dismissTimer);
    }
  });

  module.exports = Alert;
});