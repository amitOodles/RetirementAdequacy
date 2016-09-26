app.service('ChartServiceHc',function(){
  this.createChart = function(balanceArray){
    
    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    var infoData = [];

    for(var i=0;i<balanceArray.length;i++){
        infoData.push({
            name:i+1,
            y:balanceArray[i]
        });
    }



    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Discounted Super Balance'
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
            headerFormat: '<span style="font-weight:700;font-size:14px;">Super Balance</span><br>',
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
            // colorByPoint: true,
            data : infoData,
            // data: [{
            //     name: 'Take Home Pay Without Salary Sacrifice',
            //     y: thpWithoutSS,
            //     // drilldown: 'Microsoft Internet Explorer'
            // }, {
            //     name: 'Take Home Pay With Salary Sacrifice',
            //     y: thpWithSS,
            //     // drilldown: 'Chrome'
            // }, {
            //     name: 'Tax Saving',
            //     y: taxSaving,
            //     // drilldown: 'Firefox'
            // }, {
            //     name: 'Salary Sacrifice',
            //     y: optimisedSS,
            //     // drilldown: 'Safari'
            // }]
        }],

    });

}});
