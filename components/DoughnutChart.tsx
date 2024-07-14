'use client';


import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend }
  from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend)
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {

  const names = accounts.map(account => account.name)
  const balances = accounts.map(account => Number(account.currentBalance))
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: ['#0747b6', '#2265d8', '#2f91a']
      }
    ],
    labels: names
  }

  return (
    <Doughnut data={data} options={{
      cutout: '60%', plugins: {
        legend: {
          display: false
        }
      }
    }} />
  )
}

export default DoughnutChart