import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";

highchartsMap(Highcharts);

var mapDataIE = require('@highcharts/map-collection/countries/lk/lk-all.geo.json');

function Map(props) {
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        var dt=[{
            value: 1,
            "hc-key": "lk-co",
            name: "Colombo",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 2,
            "hc-key": "lk-gq",
            name: "Gampaha",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 3,
            "hc-key": "lk-kt",
            name: "Kalutara",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 4,
            "hc-key": "lk-ky",
            name: "Kandy",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 5,
            "hc-key": "lk-mt",
            name: "Matale",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 6,
            "hc-key": "lk-nw",
            name: "Nuwara Eliya",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 7,
            "hc-key": "lk-gl",
            name: "Galle",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 8,
            "hc-key": "lk-mh",
            name: "Matara",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 9,
            "hc-key": "lk-hb",
            name: "Hambantota",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 10,
            "hc-key": "lk-ja",
            name: "Jaffna",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 11,
            "hc-key": "lk-kl",
            name: "Kilinochchi",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 12,
            "hc-key": "lk-mb",
            name: "Mannar",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 13,
            "hc-key": "lk-va",
            name: "Vavuniya",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 14,
            "hc-key": "lk-mp",
            name: "Mullativu",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 15,
            "hc-key": "lk-bc",
            name: "Batticaloa",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 16,
            "hc-key": "lk-ap",
            name: "Ampara",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 17,
            "hc-key": "lk-tc",
            name: "Trincomalee",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 18,
            "hc-key": "lk-kg",
            name: "Kurunegala",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 19,
            "hc-key": "lk-px",
            name: "Puttalam",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 20,
            "hc-key": "lk-ad",
            name: "Anuradhapura",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 21,
            "hc-key": "lk-pr",
            name: "Polonnaruwa",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 22,
            "hc-key": "lk-bd",
            name: "Badulla",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 23,
            "hc-key": "lk-mj",
            name: "Monaragala",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 24,
            "hc-key": "lk-rn",
            name: "Ratnapura",
            temp: 30,
            humidity: 80,
            pressure: 1000
        },{
            value: 25,
            "hc-key": "lk-ke",
            name: "Kegalle",
            temp: 30,
            humidity: 80,
            pressure: 1000
        }]
    
        setData(dt);
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
            headerFormat: "",
             pointFormat: `{point.name}<br><br>Temperature: {point.temp}°C<br>Humidity: {point.humidity}%<br>Air Pressure: {point.pressure}hPa`
        },
        plotOptions: {
            series: {
                events: {
                    click: function (e) {
                    }
                }
            }
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


    return (
            <HighchartsReact
                constructorType={"mapChart"}
                highcharts={Highcharts}
                options={mapOptions}
            />
    );
}

export default Map;