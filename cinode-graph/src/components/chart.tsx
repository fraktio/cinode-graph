import React, { useEffect } from 'react';
import * as d3 from 'd3';

interface TestData {
  averageLevel: number;
  tech: string;
  users: number;
}

interface IProps {
  data?: TestData[];
}

const Chart = ({ data }: IProps) => {
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
    const size = data && data.length ? data.length : 0;

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
      .call(d3.axisBottom(xScale).ticks(size));

    chart
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(yScale).ticks(size));

    console.log('DATA: ', data);
    // 400 estimateR so x 0,
    const circles = svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', d => d.users * 20)
      .attr('cy', d => d.averageLevel * 10)
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

  return (
    <>
      <div id='chart' style={{ width: '60%', height: '60%' }}></div>
    </>
  );
};
export default Chart;
