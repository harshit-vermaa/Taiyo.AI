import React, { useState } from 'react'
import Loading from '../../Loading/Loading'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './MarkedMap.module.css';

// MarkedMap 
const MarkedMap = ({ Data }) => {

  // const that contain Data came from Maps 
  const [countriesData, setCountriesData] = useState(Data)

  // Initial Position 
  const startPosition = [23.624875882999124, 77.96044653143865]

  return (
    // Validation 
      !countriesData  ? <Loading /> :

      // Map code React leaflet
        <>
          <MapContainer center={startPosition} zoom={4} style={{ height: '78vh', width: '95vw' }} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
              countriesData.map((country) => {
                
                {/* values of lat & long of each country  */}
                const latPosition = country.countryInfo.lat;
                const longPositon = country.countryInfo.long;
                const markPositon = [latPosition, longPositon];

                return (
                  <Marker position={markPositon} className={styles['custom-marker-icon']} >
                      {/* Pop and its style  */}
                      <Popup>
                        <div style={{ display: 'flex', gap: '3px', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '600' }}>Country name : {country.country}</span>
                          <span style={{ color: 'red' }}><span style={{ fontWeight: '600', color: 'black' }}>Total no. of active cases</span> : {country.active}</span>
                          <span style={{ color: 'green' }} ><span style={{ fontWeight: '600', color: 'black' }}>Recoverd cases</span> : {country.recovered}</span>
                          <span style={{ color: 'red' }}><span style={{ fontWeight: '600', color: 'black' }}>Total deaths</span> : {country.deaths}</span>
                        </div>
                      </Popup>
                    </Marker>
                )
              })
            }
          </MapContainer>
        </>
    )
}

export default MarkedMap


