import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface U {
  first: string;
  last: string;
  level: number;
}

interface TestData {
  averageLevel: number;
  tech: string;
  userCount: number;
  userArray: U[];
}

interface IProps {
  data?: TestData[];
  f: Function;
}

const Chart = ({ data, f }: IProps) => {
  useEffect(() => {
    data && drawChart();
  }, [data]);

  const drawChart = () => {
    const heightValue = 400;
    const widthValue = 600;

    const svg = d3
      .select('#chart')
      .html('')
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
      .domain([0, 35]);

    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    chart
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(yScale).ticks(5));

    const circles = svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => d.userCount * (widthValue / 35))
      .attr('cy', d => heightValue - d.averageLevel * (heightValue / 5))
      .attr('r', radius)
      .attr('fill', (d, i) => d3.schemeCategory10[i % 10])
      .on('click', clicked);

    circles
      .append('text')
      .attr('dx', function(d) {
        return -20;
      })
      .text(function(d) {
        return d.tech;
      })
      .selectAll('tspan')
      .join('tspan');

    function clicked(d, i) {
      f(d.userArray);
      d3.select(this)
        .transition()
        .attr('fill', 'black')
        .attr('r', radius * 2)
        .transition()
        .attr('r', radius)
        .attr('fill', d3.schemeCategory10[i % 10]);
      console.log(
        d3.select(this).attr('cx'),
        d3.select(this).attr('cy'),
        'D3 values : ',
        d
      );
    }
  };

  return (
    <>
      <div id='chart' style={{ width: '60%', height: '60%' }}></div>
    </>
  );
};
export default Chart;
