import React, { useState, useEffect } from 'react';
import Style from './Maps.module.css';
import Layout from '../../Component/Layout/Layout';
import Button from '@mui/material/Button';
import LinearMap from '../../Component/Maps/LinearMap/LinearMap';
import MarkedMap from '../../Component/Maps/MarkedMap/MarkedMap';

const Maps = () => {

  // countries covid & location data 
  const [countriesData, setCountriesData] = useState([]);
// current Tab 
  const [tab, setTab] = useState(true);

  // fetching data for countriesData 
  useEffect(() => {
    const fetchData = async () =>  {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        const jsonData = await response.json();
        setCountriesData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <>
      <Layout>
        <div className={Style.maps}>
          <div className={Style.maps_nav}>
          <div className={Style.maps_navTitle}>
            {
                tab ? <p style={{fontSize:'30px'}} >Linear Map <span style={{ fontSize: '20px', color: 'grey' }} >( covid cases fluctuation )</span></p> : 
                  <p style={{ fontSize: '30px' }}>Marker Map <span style={{ fontSize: '20px', color:'grey' }} >( country name, active cases, total deaths, total recovered )</span></p>
            }
          </div>
            <div className={Style.maps_navBtn}>
              <Button variant="outlined" onClick={() => setTab(true)}>Linear Map</Button>
              <Button variant="outlined" onClick={() => setTab(false)}>Marked Map</Button>
            </div>
          </div>
          <div className={Style.maps_map}>
            {tab ? <LinearMap /> : <MarkedMap Data={countriesData} />}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Maps;
