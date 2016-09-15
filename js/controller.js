app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'TaxRateCalculator', 'SGCRate', 'WithoutSSCalculator', 'WithSSCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker', function($scope, $timeout, AgeCalculator, TaxRateCalculator, SGCRate, WithoutSSCalculator, WithSSCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    $scope.resultWithSS = [0, 0, 0];
    $scope.resultWithoutSS = [0, 0, 0];

    var initDate = new Date();
    initDate.setYear(1998);
    initDate.setMonth(6);
    initDate.setDate(1);
    $scope.dob = initDate;

    // $('#kartik').tooltip();

    $scope.chartOneOpen = true;

    $scope.infoShow = function(value) {
            if (value) {
                document.getElementsByClassName("information-overlay")[0].style.visibility = "visible";
                document.getElementsByClassName("information-overlay")[0].style.zIndex = "9999";
                document.getElementsByClassName("information-overlay")[0].style.position = "inline-block";
                document.getElementsByClassName("information-overlay")[0].style.height = "" + (document.getElementsByClassName("otrp-calculator")[0].clientHeight - 10) + "px";
            } else {
                document.getElementsByClassName("information-overlay")[0].style.visibility = "hidden";
            }
        }
        // $scope.unattainableTHP = false;

    $scope.firstDP = function() {
        $scope.dateOptions.maxDate = new Date(1998, 11, 31);
        $scope.dateOptions.minDate = new Date(1950, 0, 1);
        console.log("firstDp", $scope.dateOptions.minDate);
    }

    $scope.secondDp = function() {
        delete $scope.dateOptions.maxDate;
    }

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        // minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yy',
        // maxDate: new Date(2020, 5, 22),
        // minDate: new Date(),
        startingDay: 1,
        showWeeks: false
    };

    // $scope.toggleMin = function() {
    //   $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    //   $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    // };

    // $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
        $scope.firstDP();
    };

    $scope.open2 = function() {
        $scope.secondDp();
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy', 'd!/M!/yyyy'];
    $scope.format = $scope.formats[5];
    // $scope.altInputFormats = ['d!/M!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }


    $scope.unattainableTHP = false;

    $scope.attainableTHP = false;

    $scope.unattainableTHPS = false;

    $scope.optimisedSS;

    $scope.needSS = true;


    $scope.overlay = false;


    // $scope.age = 42;

    $scope.fy = 2017;

    $scope.cses = 80000;

    $scope.thp = 45000;

    $scope.maxTHP2 = 0;

    $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);

    $scope.retirementAge = 65;

    $scope.annualSalary = 60000;

    $scope.employerContributionLevel = 9.50;

    $scope.inflation = 2.50;

    $scope.superBalance = 100000;

    $scope.rateOfReturn = 5.58;

    $scope.wageIncrease = 3.50;

    $scope.insurancePremium = 200;

    $scope.superTaxRate = 15;

    $scope.salarySacrifice = 20000;

    $scope.pensionStart  = 55;

    $scope.investmentReturn = 5.30;

    $scope.variableFee = 1.11;

    $scope.fixedFee = 300; 


    var retirementAgeSlider = document.getElementById('retirementAgeSlider'),
        annualSalarySlider = document.getElementById('annualSalarySlider'),
        employerContributionLevelSlider = document.getElementById('employerContributionLevelSlider'),
        superBalanceSlider = document.getElementById('superBalanceSlider'),
        rateOfReturnSlider = document.getElementById('rateOfReturnSlider'),
        inflationSlider = document.getElementById('inflationSlider'),
        wageIncreaseSlider = document.getElementById('wageIncreaseSlider'),
        insurancePremiumSlider = document.getElementById('insurancePremiumSlider'),
        superTaxRateSlider = document.getElementById('superTaxRateSlider'),
        salarySacrificeSlider = document.getElementById('salarySacrificeSlider'),
        pensionStartSlider = document.getElementById('pensionStartSlider'),
        investmentReturnSlider = document.getElementById('investmentReturnSlider'),
        variableFeeSlider = document.getElementById('variableFeeSlider'),
        fixedFeeSlider = document.getElementById('fixedFeeSlider');




    noUiSlider.create(retirementAgeSlider, {
        start: [65],
        range: {
            'min': [60],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: 'lower'
    });

    noUiSlider.create(annualSalarySlider, {
        start: [$scope.annualSalary],
        range: {
            'min': [0],
            'max': [10000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: 'lower'
    });

    noUiSlider.create(employerContributionLevelSlider, {
        start: [$scope.employerContributionLevel],
        range: {
            'min': [9],
            'max': [20]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
            // thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(inflationSlider, {
        start: [$scope.inflation],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(superBalanceSlider, {
        start: [$scope.superBalance],
        range: {
            'min': [0],
            'max': [200000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(rateOfReturnSlider, {
        start: [$scope.rateOfReturn],
        range: {
            'min': [0],
            'max': [50]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(wageIncreaseSlider, {
        start: [$scope.wageIncrease],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });


    noUiSlider.create(insurancePremiumSlider, {
        start: [$scope.insurancePremium],
        range: {
            'min': [0],
            'max': [200000]
        },
        step: 100,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(superTaxRateSlider, {
        start: [$scope.superTaxRate],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(salarySacrificeSlider, {
        start: [$scope.salarySacrifice],
        range: {
            'min': [10000],
            'max': [35000]
        },
        step: 500,
        format: wNumb({
            decimals: 2,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    }); 

        noUiSlider.create(pensionStartSlider, {
        start: [$scope.pensionStart],
        range: {
            'min': [60],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: 'lower'
    });

    noUiSlider.create(investmentReturnSlider, {
        start: [$scope.investmentReturn],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });       

    noUiSlider.create(variableFeeSlider, {
        start: [$scope.variableFee],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.5,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(fixedFeeSlider, {
        start: [$scope.fixedFee],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 100,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });     


    var ageInput = document.getElementById('ageInput'),
        retirementAgeInput = document.getElementById('retirementAgeInput'),
        annualSalaryInput = document.getElementById('annualSalaryInput'),
        employerContributionLevelInput = document.getElementById('employerContributionLevelInput'),
        superBalanceInput = document.getElementById('superBalanceInput'),
        rateOfReturnInput = document.getElementById('rateOfReturnInput'),
        inflationInput = document.getElementById('inflationInput'),
        wageIncreaseInput = document.getElementById('wageIncreaseInput'),
        insurancePremiumInput = document.getElementById('insurancePremiumInput'),
        superTaxRateInput = document.getElementById('superTaxRateInput'),
        salarySacrificeInput = document.getElementById('salarySacrificeInput'),
        pensionStartInput = document.getElementById('pensionStartInput'),
        investmentReturnInput = document.getElementById('investmentReturnInput'),
        variableFeeInput = document.getElementById('variableFeeInput'),
        fixedFeeInput = document.getElementById('fixedFeeInput');


    retirementAgeSlider.noUiSlider.on('update', function(values, handle) {
        retirementAgeInput.value = values[handle];
        $scope.retirementAge = (values[handle]);
    });

    annualSalarySlider.noUiSlider.on('update', function(values, handle) {
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
    });

    employerContributionLevelSlider.noUiSlider.on('update', function(values, handle) {
        employerContributionLevelInput.value = values[handle];
        $scope.employerContributionLevel = (values[handle]);
    });

    superBalanceSlider.noUiSlider.on('update', function(values, handle) {
        superBalanceInput.value = values[handle];
        $scope.superBalance = (values[handle]);
    });

    rateOfReturnSlider.noUiSlider.on('update', function(values, handle) {
        rateOfReturnInput.value = values[handle];
        $scope.rateOfReturn = (values[handle]);
    });

    inflationSlider.noUiSlider.on('update', function(values, handle) {
        inflationInput.value = values[handle];
        $scope.inflation = (values[handle]);
    });

    wageIncreaseSlider.noUiSlider.on('update', function(values, handle) {
        wageIncreaseInput.value = values[handle];
        $scope.wageIncrease = (values[handle]);
    });

    insurancePremiumSlider.noUiSlider.on('update', function(values, handle) {
        insurancePremiumInput.value = values[handle];
        $scope.insurancePremium = (values[handle]);
    });

    superTaxRateSlider.noUiSlider.on('update', function(values, handle) {
        superTaxRateInput.value = values[handle];
        $scope.superTaxRate = (values[handle]);
    });

    salarySacrificeSlider.noUiSlider.on('update', function(values, handle) {
        salarySacrificeInput.value = values[handle];
        $scope.salarySacrifice = (values[handle]);
    });

    pensionStartSlider.noUiSlider.on('update', function(values, handle) {
        pensionStartInput.value = values[handle];
        $scope.pensionStart = (values[handle]);
    });

    investmentReturnSlider.noUiSlider.on('update', function(values, handle) {
        investmentReturnInput.value = values[handle];
        $scope.investmentReturn = (values[handle]);
    });

    variableFeeSlider.noUiSlider.on('update', function(values, handle) {
        variableFeeInput.value = values[handle];
        $scope.variableFee = (values[handle]);
    });

    fixedFeeSlider.noUiSlider.on('update', function(values, handle) {
        fixedFeeInput.value = values[handle];
        $scope.fixedFee = (values[handle]);
    });


    $scope.ageChange = function() {
        var dobText = document.getElementById("dobText");
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-8])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        // console.log("fd",fd);
        console.log("correct", correct);
        console.log("c1", (fd.getMonth() + 1), Number(dateArr[1]));
        console.log("c2", fd.getDate(), Number(dateArr[0]));
        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dob = fd;
        } else {
            $scope.dob = initDate;
        }
        $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
        $scope.submitForm2(true);
    }

    retirementAgeInput.addEventListener("change", function() {
        retirementAgeSlider.noUiSlider.set($scope.retirementAge);
    });

    annualSalaryInput.addEventListener("change", function() {
        annualSalarySlider.noUiSlider.set($scope.annualSalary);
    });

    employerContributionLevelInput.addEventListener("change", function() {
        employerContributionLevelSlider.noUiSlider.set($scope.employerContributionLevel);
    });

    superBalanceInput.addEventListener("change", function() {
        superBalanceSlider.noUiSlider.set($scope.superBalance);
    });

    rateOfReturnInput.addEventListener("change", function() {
        rateOfReturnSlider.noUiSlider.set($scope.rateOfReturn);
    });

    inflationInput.addEventListener("change", function() {
        inflationSlider.noUiSlider.set($scope.inflation);
    });

    wageIncreaseInput.addEventListener("change", function() {
        wageIncreaseSlider.noUiSlider.set($scope.wageIncrease);
    });

    insurancePremiumInput.addEventListener("change", function() {
        insurancePremiumSlider.noUiSlider.set($scope.insurancePremium);
    });

    superTaxRateInput.addEventListener("change", function() {
        superTaxRateSlider.noUiSlider.set($scope.superTaxRate);
    });

    salarySacrificeInput.addEventListener("change", function() {
        salarySacrificeSlider.noUiSlider.set($scope.superTaxRate);
    });

    pensionStartInput.addEventListener("change", function() {
        pensionStartSlider.noUiSlider.set($scope.superTaxRate);
    });

    investmentReturnInput.addEventListener("change", function() {
        investmentReturnSlider.noUiSlider.set($scope.investmentReturn);
    });

    variableFeeInput.addEventListener("change", function() {
        variableFeeSlider.noUiSlider.set($scope.variableFee);
    });

    fixedFeeInput.addEventListener("change", function() {
        fixedFeeSlider.noUiSlider.set($scope.fixedFee);
    });



    retirementAgeSlider.noUiSlider.on('set', function(values, handle) {
        retirementAgeInput.value = values[handle];
        $scope.retirementAge = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    annualSalarySlider.noUiSlider.on('set', function(values, handle) {
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    employerContributionLevelSlider.noUiSlider.on('set', function(values, handle) {
        employerContributionLevelInput.value = values[handle];
        $scope.employerContributionLevel = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    superBalanceSlider.noUiSlider.on('set', function(values, handle) {
        superBalanceInput.value = values[handle];
        $scope.superBalance = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    rateOfReturnSlider.noUiSlider.on('set', function(values, handle) {
        rateOfReturnInput.value = values[handle];
        $scope.rateOfReturn = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    inflationSlider.noUiSlider.on('set', function(values, handle) {
        inflationInput.value = values[handle];
        $scope.inflation = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    wageIncreaseSlider.noUiSlider.on('set', function(values, handle) {
        wageIncreaseInput.value = values[handle];
        $scope.wageIncrease = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    insurancePremiumSlider.noUiSlider.on('set', function(values, handle) {
        insurancePremiumInput.value = values[handle];
        $scope.insurancePremium = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    superTaxRateSlider.noUiSlider.on('set', function(values, handle) {
        superTaxRateInput.value = values[handle];
        $scope.superTaxRate = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    salarySacrificeSlider.noUiSlider.on('set', function(values, handle) {
        salarySacrificeInput.value = values[handle];
        $scope.salarySacrifice = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    pensionStartSlider.noUiSlider.on('set', function(values, handle) {
        pensionStartInput.value = values[handle];
        $scope.pensionStart = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    investmentReturnSlider.noUiSlider.on('set', function(values, handle) {
        investmentReturnInput.value = values[handle];
        $scope.investmentReturn = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    variableFeeSlider.noUiSlider.on('set', function(values, handle) {
        variableFeeInput.value = values[handle];
        $scope.variableFee = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    fixedFeeSlider.noUiSlider.on('set', function(values, handle) {
        fixedFeeInput.value = values[handle];
        $scope.fixedFee = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });



    // document.getElementById("download").addEventListener("click", function() {
    //     var toggleNeeded = false;
    //     if (!$scope.chartOneOpen) {
    //         document.getElementById("container").classList.toggle("ng-hide");
    //         toggleNeeded = true;
    //     }
    //     PdfMaker.createChart($scope.dob, $scope.age, $scope.fy, $scope.cses, $scope.thp, $scope.resultWithoutSS, $scope.resultWithSS, $scope.needSS, $scope.optimisedSS, toggleNeeded);
    // });


}]);
