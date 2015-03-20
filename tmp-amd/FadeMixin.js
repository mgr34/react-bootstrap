define(["exports", "module"], function (exports, module) {
  /*global document */
  // TODO: listen for onTransitionEnd to remove el
  "use strict";

  function getElementsAndSelf(root, classes) {
    var els = root.querySelectorAll("." + classes.join("."));

    els = [].map.call(els, function (e) {
      return e;
    });

    for (var i = 0; i < classes.length; i++) {
      if (!root.className.match(new RegExp("\\b" + classes[i] + "\\b"))) {
        return els;
      }
    }
    els.unshift(root);
    return els;
  }

  module.exports = {
    _fadeIn: function _fadeIn() {
      var els = undefined;

      if (this.isMounted()) {
        els = getElementsAndSelf(this.getDOMNode(), ["fade"]);

        if (els.length) {
          els.forEach(function (el) {
            el.className += " in";
          });
        }
      }
    },

    _fadeOut: function _fadeOut() {
      var els = getElementsAndSelf(this._fadeOutEl, ["fade", "in"]);

      if (els.length) {
        els.forEach(function (el) {
          el.className = el.className.replace(/\bin\b/, "");
        });
      }

      setTimeout(this._handleFadeOutEnd, 300);
    },

    _handleFadeOutEnd: function _handleFadeOutEnd() {
      if (this._fadeOutEl && this._fadeOutEl.parentNode) {
        this._fadeOutEl.parentNode.removeChild(this._fadeOutEl);
      }
    },

    componentDidMount: function componentDidMount() {
      if (document.querySelectorAll) {
        // Firefox needs delay for transition to be triggered
        setTimeout(this._fadeIn, 20);
      }
    },

    componentWillUnmount: function componentWillUnmount() {
      var els = getElementsAndSelf(this.getDOMNode(), ["fade"]),
          container = this.props.container && this.props.container.getDOMNode() || document.body;

      if (els.length) {
        this._fadeOutEl = document.createElement("div");
        container.appendChild(this._fadeOutEl);
        this._fadeOutEl.appendChild(this.getDOMNode().cloneNode(true));
        // Firefox needs delay for transition to be triggered
        setTimeout(this._fadeOut, 20);
      }
    }
  };
});