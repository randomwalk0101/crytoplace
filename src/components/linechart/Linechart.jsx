import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

// React 组件名必须以大写字母开头
const Linechart = ({ historicalData }) => {
  // 状态的初始值应该是包含表头的数组
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    // 确保 historicalData 和 historicalData.prices 都存在
    if (historicalData && historicalData.prices) {
      historicalData.prices.forEach((item) => {
        // 将日期和价格添加到数组中
        dataCopy.push([new Date(item[0]).toLocaleDateString().slice(0, -5), item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]); // 当 historicalData 变化时执行

  return (
    // 使用正确的 JSX 语法渲染 Chart 组件
    <Chart
      chartType='LineChart'
      data={data}
      height="100%"
      legendToggle
    />
  );
}

export default Linechart;