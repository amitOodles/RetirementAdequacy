app.service('AreaChartService',function(){
    
    this.createChart = function(benefitArr1,benefitArr2,penArr1,penArr2,le1,le2,spouseOption){

        // console.log(le1,le2);

        console.log(penArr1);

    var plotLineId = 'Life Expectancy Member 1'; // To identify for removal
    var plotLineId1 = 'Life Expectancy Member 2'; // To identify for removal
    
    // Plot line options for adding
    plotLineOptions = {
        color: '#FF0000',
        id: plotLineId, 
        width: 2,
        value: le1,
        // dashStyle: 'shortdash',
        label: {
                    text: le1
                }
    };
    plotLineOptions1 = {
        color: 'orange',
        id: plotLineId1, 
        width: 2,
        value: le2,
        // dashStyle: 'shortdash',
        label: {
                    text: le2
                }
    };

        var series;

        if(spouseOption){
            series = [{
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
        }, {
            // Series that mimics the plot line
            color: '#FF0000',
            name: 'Life Expectancy Member 1',
            // dashStyle: 'shortdash',
            marker: {
                enabled: false
            },
            events: {
                legendItemClick: function(e) {
                    if(this.visible) {
                        this.chart.xAxis[0].removePlotLine(plotLineId);
                    }
                    else {
                        this.chart.xAxis[0].addPlotLine(plotLineOptions);
                    }
                }
            }
        },{
            // Series that mimics the plot line
            color: 'orange',
            name: 'Life Expectancy Member 2',
            // dashStyle: 'shortdash',
            marker: {
                enabled: false
            },
            events: {
                legendItemClick: function(e) {
                    if(this.visible) {
                        this.chart.xAxis[0].removePlotLine(plotLineId1);
                    }
                    else {
                        this.chart.xAxis[0].addPlotLine(plotLineOptions1);
                    }
                }
            }
        }
        ];
        }else{
            series = [{
            name: 'Member 1 Benefit',
            data: benefitArr1
        },{
            name: 'Pension Member 1',
            data: penArr1
        },{
            // Series that mimics the plot line
            color: '#FF0000',
            name: 'Life Expectancy Member 1',
            // dashStyle: 'shortdash',
            marker: {
                enabled: false
            },
            events: {
                legendItemClick: function(e) {
                    if(this.visible) {
                        this.chart.xAxis[0].removePlotLine(plotLineId);
                    }
                    else {
                        this.chart.xAxis[0].addPlotLine(plotLineOptions);
                    }
                }
            }
        }
        ]
        }


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
            },

            // min: 1,

            plotLines: [
                plotLineOptions,plotLineOptions1
            ]
        },
        yAxis: {
            title: {
                text: 'Amount($)'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        tooltip: {
            shared: true,
            // headerFormat: '<span style="font-weight:700;font-size:14px;">Income distribution</span><br>',
            headerFormat: '<span style="font-weight:700;font-size:14px;"> Income distribution year {point.key}</span><br>',
            valueDecimals:2,
            valuePrefix: '$'
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
        series: series,
    });
    };
});
