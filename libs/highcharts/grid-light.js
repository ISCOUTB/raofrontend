/**
 * Grid-light theme for Highcharts JS
 * @author Torstein Honsi
 */

// Load the fonts
Highcharts.createElement('link', {
    href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
    colors: ["#aaeeee",  "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee","#55BF3B", "#DF5353", "#7798BF","#7cb5ec"],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: "Dosis"
        }
    },
    title: {
        style: {
            fontSize: '19px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'black'
        }
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '16px'
        }
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            style: {
                fontSize: '16px',
                color: 'black',
                fontWeight: 'bold'
            }
        }
    },
    yAxis: {
        minorTickInterval: 'auto',
        title: {
            style: {
                textTransform: '',
                fontSize: '17px',
                color: 'black',
                fontWeight: 'bold'
            }
        },
        labels: {
            style: {
                fontSize: '15px',
                color: 'black',
                fontWeight: 'bold'
            }
        }
    },
    plotOptions: {
        candlestick: {
            lineColor: '#404048'
        },
        bar: {
            dataLabels: {
                style: {
                    color: 'black',
                    fontSize: '13px'
                }
            }
        }
    },
    // General
    background2: '#F0F0EA'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
