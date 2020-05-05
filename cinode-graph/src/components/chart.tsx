import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

interface IProps {
  title?: string;
}

const Chart = ({ title }: IProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    drawChart();
  });

  const testFunction = () => {
    setCount(count + 1);
  };

  const drawChart = () => {
    const heightValue = 400;
    const widthValue = 600;
    const testData = [
      {
        estimateRating: 1,
        users: 3.5,
        tech: 'Java'
      }
    ];

    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('viewBox', `0 0 ${widthValue} ${heightValue}`);
    const strokeWidth = 1.5;
    const margin = { top: 20, bottom: 20, left: 30, right: 30 };
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},10)`);
    const width = widthValue - margin.left - margin.right - strokeWidth * 2;
    const height = heightValue - margin.top - margin.bottom;

    const radius = 10;

    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, 5]);
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, 40]);

    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(testData.length));

    chart
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(yScale).ticks(testData.length));

    // 400 estimateR so x 0,
    const circles = svg
      .selectAll('circle')
      .data(testData)
      .join('circle')
      .attr('cx', d => d.users * 30)
      .attr('cy', d => d.estimateRating * 30)
      .attr('r', radius)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
      .on('click', clicked);

    circles
      .append('text')
      .attr('dx', function(d) {
        return -20;
      })
      .selectAll('tspan')
      .join('tspan')
      .text(d => d.tech);

    function clicked(d, i) {
      d3.select(this)
        .transition()
        .attr('fill', 'black')
        .attr('r', radius * 2)
        .transition()
        .attr('r', radius)
        .attr('fill', d3.schemeCategory10[i % 10]);
      console.log(
        "Clicked circle's X and Y: ",
        d3.select(this).attr('cx'),
        d3.select(this).attr('cy'),
        'D3 values : ',
        d
      );
    }
  };

  return <div id='chart' style={{ width: '80%', height: '80%' }} />;
};
export default Chart;
