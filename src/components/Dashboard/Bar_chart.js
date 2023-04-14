import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
const Bar_chart = (props) => {
    const data= {
        labels: Array.from(Array(props.data.length).keys()),
        datasets: [
          {
            label: 'Defects',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            borderColor: 'rgb(0, 255, 0)',
            borderWidth: 1,
            data: props.data,
          }
        ]
      }
      const options= {
        plugins: {
          title: {
            display: true,
            text: 'NO. of Defects present per second'
          }
        }
      }
  
  return (
    <>
    <Bar 
        data={data}
        options={options}
      />
    </>
  )
}

export default Bar_chart