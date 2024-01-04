'use client'

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarGraphProps {
  data: GraphData[]
}

type GraphData = {
  day: string
  date: string
  totalAmount: number
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {

  // console.log(data)

  const labels = data.map(item => item.day)
  const amounts = data.map(item => item.totalAmount)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sale Amount',
        data: amounts,
        backgroundColor: 'rgba(30,184,84,.6)',
        borderColor: 'rgba(30,184,,84,1)',
        borderWidth: 2,
      },

    ]
  }

  const options = {
    scales: {
      y: {
        baginAtZero: true
      }
    }
  }

  return (
    <Bar data={chartData} options={options} />
  )
}

export default BarGraph