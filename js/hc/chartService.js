app.service('ChartServiceHc',function(){
  this.createChart = function(thpWithoutSS,thpWithSS,taxSaving,optimisedSS){
    
    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Salary Sacrifice Optimisation'
        },
        exporting:{
            enabled:false
        },
        // subtitle: {
        //     text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
        // },
        xAxis: {
            type: 'category',
            labels:{
                autoRotation : false,
            }
        },
        yAxis: {
            title: {
                text: 'Amount ($)'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                // dataLabels: {
                //     enabled: true,
                //     format: '{point.y:.1f}%'
                // }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
            // pointFormat: '<b>$ {point.y:.2f}</b><br/>'
            pointFormatter: function(){
                return '<b>'+'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.')+'</b>';

            }
        },
        credits: {
            enabled: false
        },

        series: [{
            // name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Take Home Pay Without Salary Sacrifice',
                y: thpWithoutSS,
                // drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Take Home Pay With Salary Sacrifice',
                y: thpWithSS,
                // drilldown: 'Chrome'
            }, {
                name: 'Tax Saving',
                y: taxSaving,
                // drilldown: 'Firefox'
            }, {
                name: 'Salary Sacrifice',
                y: optimisedSS,
                // drilldown: 'Safari'
            }]
        }],
        // drilldown: {
        //     series: [{
        //         name: 'Microsoft Internet Explorer',
        //         id: 'Microsoft Internet Explorer',
        //         data: [
        //             [
        //                 'v11.0',
        //                 24.13
        //             ],
        //             [
        //                 'v8.0',
        //                 17.2
        //             ],
        //             [
        //                 'v9.0',
        //                 8.11
        //             ],
        //             [
        //                 'v10.0',
        //                 5.33
        //             ],
        //             [
        //                 'v6.0',
        //                 1.06
        //             ],
        //             [
        //                 'v7.0',
        //                 0.5
        //             ]
        //         ]
        //     }, {
        //         name: 'Chrome',
        //         id: 'Chrome',
        //         data: [
        //             [
        //                 'v40.0',
        //                 5
        //             ],
        //             [
        //                 'v41.0',
        //                 4.32
        //             ],
        //             [
        //                 'v42.0',
        //                 3.68
        //             ],
        //             [
        //                 'v39.0',
        //                 2.96
        //             ],
        //             [
        //                 'v36.0',
        //                 2.53
        //             ],
        //             [
        //                 'v43.0',
        //                 1.45
        //             ],
        //             [
        //                 'v31.0',
        //                 1.24
        //             ],
        //             [
        //                 'v35.0',
        //                 0.85
        //             ],
        //             [
        //                 'v38.0',
        //                 0.6
        //             ],
        //             [
        //                 'v32.0',
        //                 0.55
        //             ],
        //             [
        //                 'v37.0',
        //                 0.38
        //             ],
        //             [
        //                 'v33.0',
        //                 0.19
        //             ],
        //             [
        //                 'v34.0',
        //                 0.14
        //             ],
        //             [
        //                 'v30.0',
        //                 0.14
        //             ]
        //         ]
        //     }, {
        //         name: 'Firefox',
        //         id: 'Firefox',
        //         data: [
        //             [
        //                 'v35',
        //                 2.76
        //             ],
        //             [
        //                 'v36',
        //                 2.32
        //             ],
        //             [
        //                 'v37',
        //                 2.31
        //             ],
        //             [
        //                 'v34',
        //                 1.27
        //             ],
        //             [
        //                 'v38',
        //                 1.02
        //             ],
        //             [
        //                 'v31',
        //                 0.33
        //             ],
        //             [
        //                 'v33',
        //                 0.22
        //             ],
        //             [
        //                 'v32',
        //                 0.15
        //             ]
        //         ]
        //     }, {
        //         name: 'Safari',
        //         id: 'Safari',
        //         data: [
        //             [
        //                 'v8.0',
        //                 2.56
        //             ],
        //             [
        //                 'v7.1',
        //                 0.77
        //             ],
        //             [
        //                 'v5.1',
        //                 0.42
        //             ],
        //             [
        //                 'v5.0',
        //                 0.3
        //             ],
        //             [
        //                 'v6.1',
        //                 0.29
        //             ],
        //             [
        //                 'v7.0',
        //                 0.26
        //             ],
        //             [
        //                 'v6.2',
        //                 0.17
        //             ]
        //         ]
        //     }, {
        //         name: 'Opera',
        //         id: 'Opera',
        //         data: [
        //             [
        //                 'v12.x',
        //                 0.34
        //             ],
        //             [
        //                 'v28',
        //                 0.24
        //             ],
        //             [
        //                 'v27',
        //                 0.17
        //             ],
        //             [
        //                 'v29',
        //                 0.16
        //             ]
        //         ]
        //     }]
        // }
    });

}});
