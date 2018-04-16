import F2 from '@antv/f2';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

let uniqueId = 0;
function generateUniqueId() {
  return `rc-f2-${uniqueId++}`;
}

export default function createF2(__operation) {
  class F2Component extends Component {
    static propTypes = {
      data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.instanceOf(F2.Frame),
      ]).isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    };

    constructor(props, context) {
      super(props, context);
      this.chart = null;
      this.chartId = generateUniqueId();
    }

    componentDidMount() {
      this.initChart(this.props);
    }

    componentWillReceiveProps(newProps) {
      const { data: newData, width: newWidth, height: newHeight } = newProps;
      const { data: oldData, width: oldWidth, height: oldHeight } = this.props;

      if (newData !== oldData) {
        this.chart.changeData(newData);
      }
      if (newWidth !== oldWidth || newHeight !== oldHeight) {
        this.chart.changeSize(newWidth, newHeight);
      }
    }

    shouldComponentUpdate() {
      return false;
    }

    componentWillUnmount() {
      this.chart.destroy();
      this.chart = null;
      this.chartId = null;
    }

    initChart(props) {
      const { data, width, height, padding, configs } = props;
      const chart = new F2.Chart({
        id: this.chartId,
        width,
        height,
        padding,
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(data);
      __operation(chart, configs);
      this.chart = chart;
    }

    render() {
      return (
        <canvas
          ref={i => (this.chartId = i)}
        />
      );
    }
  }

  return F2Component;
}
