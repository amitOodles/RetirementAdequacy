app.service('AreaChartService',function(){
    
    this.createChart = function(benefitArr1,benefitArr2,penArr1,penArr2,le1,le2){
    $('#containerA').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Income Stream Analysis'
        },
        exporting:{
            enabled:false
        },
        // subtitle: {
        //     text: 'Source: Wikipedia.org'
        // },
        xAxis: {
            // categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
            // tickmarkPlacement: 'on',
            title: {
                // enabled: true,
                // text : 'years'
            }
        },
        yAxis: {
            title: {
                text: 'Amount($)'
            },
            labels: {
                formatter: function () {
                    return this.value/1000;
                }
            }
        },
        tooltip: {
            shared: true,
            // valueSuffix: ' millions'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    enabled:false,
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Member 1 Benefit',
            data: benefitArr1
        }, {
            name: 'Member 2 Benefit',
            data: benefitArr2
        }, {
            name: 'Pension Member 1',
            data: penArr1
        }, {
            name: 'Pension Member 2',
            data: penArr2
        },
        // {
        //     name: 'Oceania',
        //     data: [2, 2, 2, 6, 13, 30, 46]
        // }
        ]
    });
    };
});
