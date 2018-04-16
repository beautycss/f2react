'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createF2;

var _f = require('@antv/f2');

var _f2 = _interopRequireDefault(_f);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uniqueId = 0;
function generateUniqueId() {
  return 'rc-f2-' + uniqueId++;
}

function createF2(__operation) {
  var _class, _temp;

  var F2Component = (_temp = _class = function (_Component) {
    _inherits(F2Component, _Component);

    function F2Component(props, context) {
      _classCallCheck(this, F2Component);

      var _this = _possibleConstructorReturn(this, (F2Component.__proto__ || Object.getPrototypeOf(F2Component)).call(this, props, context));

      _this.chart = null;
      _this.chartId = generateUniqueId();
      return _this;
    }

    _createClass(F2Component, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.initChart(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
        var newData = newProps.data,
            newWidth = newProps.width,
            newHeight = newProps.height;
        var _props = this.props,
            oldData = _props.data,
            oldWidth = _props.width,
            oldHeight = _props.height;


        if (newData !== oldData) {
          this.chart.changeData(newData);
        }
        if (newWidth !== oldWidth || newHeight !== oldHeight) {
          this.chart.changeSize(newWidth, newHeight);
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate() {
        return false;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.chart.destroy();
        this.chart = null;
        this.chartId = null;
      }
    }, {
      key: 'initChart',
      value: function initChart(props) {
        var data = props.data,
            width = props.width,
            height = props.height,
            padding = props.padding,
            configs = props.configs;

        var chart = new _f2.default.Chart({
          id: this.chartId,
          width: width,
          height: height,
          padding: padding,
          pixelRatio: window.devicePixelRatio
        });
        chart.source(data);
        __operation(chart, configs);
        this.chart = chart;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement('canvas', {
          ref: function ref(i) {
            return _this2.chartId = i;
          }
        });
      }
    }]);

    return F2Component;
  }(_react.Component), _class.propTypes = {
    data: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.object), _propTypes2.default.instanceOf(_f2.default.Frame)]).isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired
  }, _temp);


  return F2Component;
}
module.exports = exports['default'];