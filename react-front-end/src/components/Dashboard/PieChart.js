import React, { useEffect, useState } from 'react';
import { Pie, defaults } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styled from 'styled-components';

// defaults.animation = false;



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

export const PieChart = props => {

  const pieData = {
    
    labels: ['Completed', 'Planned', 'Friends'],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'orange',
  
        ],
        borderWidth: 0,
      },
    ],
  };

  
  const [tripData, setTripData] = useState({...pieData});
  const { tripStats } = props;

  useEffect(() => {
    if (!tripStats) return;
    console.log("props.tripStats", props.tripStats)
    console.log(Number(tripStats['completed']), Number(tripStats['planned']), Number(tripStats['friends']));
    pieData.datasets[0].data.push(Number(tripStats['completed']), Number(tripStats['planned']), Number(tripStats['friends']))
    setTripData({...pieData});
  }, [props])

  return (

    <PieChartContainer>
      <h6 style={{padding: '1rem 1.65rem', fontSize: '1.4rem', borderBottom: '1px lightgrey solid', marginBottom: '0rem', color: '#668fff', verticalAlign: 'middle'}}>Trip Stats</h6>
      {tripData.datasets[0].data.length !== 0 && console.log("tripData.datasets[0].data ", tripData.datasets[0].data)}
      {tripData.datasets[0].data.length !== 0 &&
      <Pie data={tripData} plugins={[ChartDataLabels]} options={{layout: { padding: 20}, plugins: { datalabels: { display: function(context) {return context.dataset.data[context.dataIndex] !== 0}, color: 'white', font: { size: 20 }}}}}/>
      // <Pie data={tripData} plugins={[ChartDataLabels]} options={{plugins: { datalabels: { color: 'white', font: { size: 20 }}}}}/>
      // <Pie data={data} options={{plugins: { datalabels: { color: 'white', font: { size: 20}}}}}/>
      }
    </PieChartContainer>
  )
};

export default PieChart;

// [Number(props['planned']), Number(props['completed']), Number(props['friends'])]