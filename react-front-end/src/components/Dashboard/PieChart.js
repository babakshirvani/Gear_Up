import React from 'react';
import { Pie, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

// defaults.animation = false;

const data = {
  labels: ['Completed', 'Planned', 'Friends'],
  datasets: [
    {
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'orange',

      ],
      borderWidth: 0,
    },
  ],
  options: {
    plugins: {
      legend: {
      }
    }
  }
};

const PieChartContainer = styled.div`
  background-color: #F3F5FA;
  width: 100%;
  height: 100%;
  margin-left: 1rem;
  box-shadow: 2px 2px 7px 0px rgb(166, 166, 166);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const PieChart = () => (
    <PieChartContainer>
      <h6 style={{padding: '1rem 1.65rem', fontSize: '1.4rem', borderBottom: '1px lightgrey solid', marginBottom: '0rem', color: '#668fff', verticalAlign: 'middle'}}>Trip Stats</h6>
      <Pie data={data} style={{padding: '1rem'}} plugins={[ChartDataLabels]} options={{plugins: { datalabels: { color: 'white', font: { size: 20}}}}}/>
    </PieChartContainer>
);

export default PieChart;