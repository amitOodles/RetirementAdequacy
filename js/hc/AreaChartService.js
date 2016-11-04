app.service('AreaChartService', function() {

    this.createChart = function(benefitArr1, benefitArr2, penArr1, penArr2, le1, le2, spouseOption, target) {

        // console.log(le1,le2);

        //console.log(target);

        var plotLineId = 'Life Expectancy Member 1'; // To identify for removal
        var plotLineId1 = 'Life Expectancy Member 2'; // To identify for removal
        var plotLineId2 = 'Target'; // To identify for removal


        // Plot line options for adding
        plotLineOptions = {
            color: '#2443af',
            id: plotLineId,
            width: 2,
            value: le1,
            dashStyle: 'shortdash',
            label: {
                text: le1 + " years",
                style: {
                    fontWeight: 'bold'
                }
            }
        };
        plotLineOptions1 = {
            color: '#12841f',
            id: plotLineId1,
            width: 2,
            value: le2,
            dashStyle: 'shortdash',
            label: {
                text: le2 + " years",
                style: {
                    fontWeight: 'bold'
                }
            }
        };
        plotLineOptions2 = {
            color: 'red',
            id: plotLineId2,
            width: 3,
            value: target,
            label: {
                text: "$" + target,
                align: "right",
                style: {
                    fontWeight: 'bold'
                }
            }
        };

        var series;

        var plOptions;

        if (spouseOption) {
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
                color: '#2443af',
                name: 'Life Expectancy Member 1',
                type: 'line',
                dashStyle: 'shortdash',
                marker: {
                    enabled: false
                },
                events: {
                    legendItemClick: function(e) {
                        if (this.visible) {
                            this.chart.xAxis[0].removePlotLine(plotLineId);
                        } else {
                            this.chart.xAxis[0].addPlotLine(plotLineOptions);
                        }
                    }
                }
            }, {
                color: '#12841f',
                name: 'Life Expectancy Member 2',
                type: 'line',
                dashStyle: 'shortdash',
                marker: {
                    enabled: false
                },
                events: {
                    legendItemClick: function(e) {
                        if (this.visible) {
                            this.chart.xAxis[0].removePlotLine(plotLineId1);
                        } else {
                            this.chart.xAxis[0].addPlotLine(plotLineOptions1);
                        }
                    }
                }
            }, {
                color: 'red',
                name: 'Target Income',
                type: 'line',
                marker: {
                    enabled: false
                },
                events: {
                    legendItemClick: function(e) {
                        if (this.visible) {
                            this.chart.yAxis[0].removePlotLine(plotLineId2);
                        } else {
                            this.chart.yAxis[0].addPlotLine(plotLineOptions2);
                        }
                    }
                },
                data: [target]
            }];
            plOptions = [plotLineOptions, plotLineOptions1];
            plOptions1 = [plotLineOptions2];

        } else {
            series = [{
                name: 'CentreLink Benefit',
                data: benefitArr1
            }, {
                name: 'Pension Income',
                data: penArr1
            }, {
                color: '#2443af',
                name: 'Life Expectancy',
                type: 'line',
                dashStyle: 'shortdash',
                marker: {
                    enabled: false
                },
                events: {
                    legendItemClick: function(e) {
                        if (this.visible) {
                            this.chart.xAxis[0].removePlotLine(plotLineId);
                        } else {
                            this.chart.xAxis[0].addPlotLine(plotLineOptions);
                        }
                    }
                }
            }, {
                color: 'red',
                name: 'Target Income',
                type: 'line',
                marker: {
                    enabled: false
                },
                events: {
                    legendItemClick: function(e) {
                        if (this.visible) {
                            this.chart.yAxis[0].removePlotLine(plotLineId2);
                        } else {
                            this.chart.yAxis[0].addPlotLine(plotLineOptions2);
                        }
                    }
                },
                data: [target]
            }];
            plOptions = [plotLineOptions];
            plOptions1 = [plotLineOptions2];
        }


        $('#containerA').highcharts({
            chart: {
                type: 'area',
                height: 400,
                events: {
                    beforePrint: function() {
                        this.oldhasUserSize = this.hasUserSize;
                        this.resetParams = [this.chartWidth, this.chartHeight, false];
                        this.setSize(600, 400, false);
                    },
                    afterPrint: function() {
                        this.setSize.apply(this, this.resetParams);
                        this.hasUserSize = this.oldhasUserSize;
                    }
                }
            },
            title: {
                text: 'Income Stream Analysis'
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                title: {},

                max: 10 + Math.max(Math.max(Math.ceil(le1), Math.ceil(le2))),

                plotLines: plOptions
            },
            yAxis: {

                title: {
                    text: 'Amount($)'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                },
                plotLines: plOptions1
            },
            tooltip: {
                shared: true,
                headerFormat: '<span style="font-weight:700;font-size:14px;"> Income distribution year {point.key}</span><br>',
                valueDecimals: 2,
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
                        enabled: false,
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: series,
        });
    };
});
