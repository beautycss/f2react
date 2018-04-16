import React from 'react';

function computeWidth(node) {
  const totalWidth = parseInt(getComputedStyle(node).width, 10);
  const padding =
    parseInt(getComputedStyle(node).paddingLeft, 10) +
    parseInt(getComputedStyle(node).paddingRight, 10);
  return totalWidth - padding;
}

function getAutoWidth(n) {
  if (!n) {
    return 0;
  }

  let node = n;

  let width = computeWidth(node);

  while (!width) {
    node = node.parentNode;
    if (node) {
      width = computeWidth(node);
    } else {
      break;
    }
  }

  return width;
}

const autoWidth = () => (WrappedComponent) => {
  return class extends React.Component {
    state = {
      computedWidth: 0,
    };

    componentDidMount() {
      const { width } = this.props;
      if (!width) {
        const w = getAutoWidth(this.root);
        // eslint-disable-next-line
        this.setState({ computedWidth: w });
      }
    }

    handleRoot = (node) => {
      this.root = node;
    };

    render() {
      const { width } = this.props;
      const { computedWidth } = this.state;
      const w = width || computedWidth;
      return (
        <div ref={this.handleRoot}>{w > 0 && <WrappedComponent {...this.props} width={w} />}</div>
      );
    }
  };
};

export default autoWidth;
