import React, { useState, useEffect } from 'react'
import Loading from '../../Loading/Loading'
import Style from './LinearMap.module.css'

// this all 3 are necessary imports & comands for using Chart.js 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);






const LinearMap = () => {

  // states which store the Dates and the null. of cases in a Array 
  const [dates, setDates] = useState([])
  const [cases, setCases] = useState([])

  // Option is require to create chart using Chart.js it is predefine with some changes according to us 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Covid cases v/s dates',
      },
    },
  };

  // this is x-axis coordinates which contain the dates
  const labels = dates;

  // what we have to pass in our chart relative to labes/ dates 
  const data = {
    labels,
    datasets: [
      {
        label: 'Cases',
        data: cases,
        borderColor: '#1976d2',
        backgroundColor: '#1976d2'
      }

    ],
  };

  // this fetch the API data and then store the dates & noConflict. of cases in states we have mention earlier 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const jsonData = await response.json();
        console.log('jsonData', jsonData)
        const Dates = await Object.keys(jsonData.cases)
        setDates(Dates)
        const Cases = await Object.values(jsonData.cases)
        setCases(Cases)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {
        !dates  ? <Loading /> : <div className={Style.linearMap}><Line options={options} data={data} style={{width:'100%'}} /></div>
      }
    </>
  )
}

export default LinearMap


