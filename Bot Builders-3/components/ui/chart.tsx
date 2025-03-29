"use client"

import { Bar } from "react-chartjs-2"
import { Line } from "react-chartjs-2"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

export const BarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />
}

export const LineChart = ({ data, options }) => {
  return <Line data={data} options={options} />
}

export const PieChart = ({ data, options }) => {
  return <Pie data={data} options={options} />
}

