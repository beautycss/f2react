## 代码

```js
import React, { Component } from 'react';
import createF2 from 'f2react';
// import autoWidth from '../autoWidth'; // 自适应宽度

const data = [
  { x: '1951 年', y: 38 },
  { x: '1952 年', y: 52 },
  { x: '1956 年', y: 61 },
  { x: '1957 年', y: 145 },
  { x: '1958 年', y: 48 },
  { x: '1959 年', y: 38 },
  { x: '1960 年', y: 38 },
  { x: '1962 年', y: 38 },
];

// @autoWidth() 1. 引入autoWidth 2. 去掉width设置
export default class MyComponent extends Component {
  state = {
    width: 300,
    height: 300,
  }

  Bar = createF2((chart) => {
    chart.interval().position('x*y');
    chart.render();
  });

  render() {
    <Bar
      width={this.state.width}
      height={this.state.height}
      data={data}
    />
  };
}
```
