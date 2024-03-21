import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import axios from 'axios';
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import io from 'socket.io-client';

highchartsMap(Highcharts);

var mapDataIE = require('@highcharts/map-collection/countries/lk/lk-all.geo.json');
const basePath = process.env.REACT_APP_BASEPATH;
const dataPath = process.env.REACT_APP_DATAPATH
const apiKey = process.env.REACT_APP_APIKEY;

function Map(props) {
    
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    
    useEffect(() => {

        const getWeatherData = async () => {
            try {
                const response = await axios.get(basePath+dataPath,{
                headers: {
                    'x-api-key': apiKey,
                }
                });

                let res = response.data;

                if(res.status){

                    let country = res.extra.countries.find(x => x.countryId === 1);
                    
                    let dataArray = districtWiseData(country);

                    setData(dataArray);
                    setError(null);
                }else{
                    setData(null);
                    setError(res.extra);
                }
            } catch (error) {
                    setData(null);
                    setError(error.message);
            }
        }

        getWeatherData();

        // Connect to the Socket.IO server
        const socket = io(basePath); 

        // Listen for 'weatherData' event emitted from the server
        socket.on('weather-data', (data) => {

            let country = data.countries.find(x => x.countryId === 1);
            let dataArray = districtWiseData(country);

            setData(dataArray);
            setError(null);
        });

        // Cleanup function to disconnect the socket
        return () => {
            socket.disconnect();
        };

    },[]);

    const mapOptions = {

        chart: {
            map: "countries/lk/lk-all"
        },

        title: {
            text: "Weather Stats of Sri Lanka"
        },
        credits: {
            enabled: false
        },
        mapNavigation: {
            enabled: false
        },
        tooltip: {
            headerFormat: " ",
            pointFormat: `{point.name}<br><br>Date & Time: {point.dateTime}<br>Temperature: {point.temp}°C<br>Humidity: {point.humidity}%<br>Air Pressure: {point.pressure}hPa`
        },
        plotOptions: {
            series: {
                events: {
                    click: function (e) {
                    }
                }
            }
        },
        accessibility: {
            enabled: false
        },
        series: [
            {
                name: "Basemap",
                mapData: mapDataIE,
                borderColor: "#000",
                nullColor: "rgba(200, 200, 200, 0.3)",
                showInLegend: false,
                data: data,
                states: {
                    hover: {
                        color: '#BADA55'
                    },
                },    
                dataLabels: {
                    enabled: true,
                    format: "{point.name}"
                }
            }
        ]
    };

    const districtWiseData = (country) => {

        let dataArray = [];

        let districts = country.districts;

        for (const district of districts) {

            let weatherStation = district.weatherStations.find(x => x.weatherStationId === district.districtId);
            let reading = weatherStation.reading;

            let dateTime = new Date(reading.dateTime);
            dateTime.setHours(dateTime.getHours() - 5);
            dateTime.setMinutes(dateTime.getMinutes() - 30);

            let dataObj = {
                value: district.districtId,
                "hc-key": district.districtCode,
                name: district.districtName,
                temp: reading.temperature,
                humidity: reading.humidity,
                pressure: reading.pressure,
                dateTime: dateTime.toLocaleString()
            }

            dataArray.push(dataObj);
        }

        return dataArray;
    }

    return (
        <>
            {error && <p className="error">Error: {error}</p>}
            <HighchartsReact
            constructorType={"mapChart"}
            highcharts={Highcharts}
                options={mapOptions}
            />
        </>
    );
}

export default Map;