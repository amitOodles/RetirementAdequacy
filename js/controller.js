app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'TaxRateCalculator', 'SGCRate', 'WithoutSSCalculator', 'WithSSCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker','AreaChartService', function($scope, $timeout, AgeCalculator, TaxRateCalculator, SGCRate, WithoutSSCalculator, WithSSCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker,AreaChartService) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    $scope.listOb = [{ id: 0, name: "Minimum Pension Only" },
        { id: 1, name: "Choose you own pension" }
    ];

    $timeout(function() {
        $('.selectpickerSingle').selectpicker({
            style: 'btn-info',
            size: 2
        });

        $('.selectpickerSpouse').selectpicker({
            style: 'btn-info',
            size: 2
        });
    });

    $scope.showPensionOption = true;
    $scope.showPensionOptionSpouse = true;

    $('.selectpickerSingle').on('change', function() {
        var selected = $('.selectpickerSingle option:selected').val();
        $scope.showPensionOption = selected == 1;
        calculateFinal();
        $timeout(0);
    });

    $('.selectpickerSpouse').on('change', function() {
        var selected = $('.selectpickerSpouse option:selected').val();
        $scope.showPensionOptionSpouse = selected == 1;
        $timeout(0);
    });

    var initDate = new Date();
    initDate.setYear(1961);
    initDate.setMonth(6);
    initDate.setDate(1);
    $scope.dob = initDate;
    $scope.dobSpouse = initDate;


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

    $scope.firstDP = function() {
        $scope.dateOptions.maxDate = new Date(1998, 11, 31);
        $scope.dateOptions.minDate = new Date(1950, 0, 1);
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
        formatYear: 'yy',
        startingDay: 1,
        showWeeks: false
    };


    $scope.open1 = function() {
        $scope.popup1.opened = true;
        $scope.firstDP();
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
        $scope.firstDP();
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'dd/MM/yyyy', 'd!/M!/yyyy'];
    $scope.format = $scope.formats[5];

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

    $scope.spouseOption = false;
    $scope.houseOption = false;
    $scope.retirementAgeSpouse = 60;
    $scope.annualSalarySpouse = 200000;
    $scope.superBalanceSpouse = 0;
    $scope.salarySacrificeSpouse = 2000;
    $scope.pensionStartSpouse = 20000;
    $scope.insurancePremiumSpouse = 0;
    $scope.investmentReturnSpouse = 0;
    $scope.variableFeeSpouse = 10000;
    $scope.fixedFeeSpouse = 20000;
    $scope.pensionDrawdownBase = 40000;
    $scope.pensionDrawdownBaseSpouse = 40000;

    $scope.overlay = false;

    $scope.fy = 2016;

    $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
    $scope.ageSpouse = AgeCalculator.getAge($scope.dobSpouse, $scope.fy);

    $scope.retirementAge = 65;

    $scope.annualSalary = 300000;

    $scope.employerContributionLevel = 9.50;
    $scope.employerContributionLevelSpouse = 9.50;

    $scope.inflation = 3.50;
    $scope.inflationSpouse = 3.50;

    $scope.superBalance = 500000;

    $scope.wageIncrease = 4.00;
    $scope.wageIncreaseSpouse = 4.00;

    $scope.insurancePremium = 0;

    $scope.salarySacrifice = 20000;

    $scope.pensionStart = 57;

    $scope.investmentReturn = 5.30;

    $scope.variableFee = 1.11;

    $scope.fixedFee = 300;

    $scope.homeContents = 50000;
    $scope.vehicleCost = 0;
    $scope.investmentProperty = 2000;
    $scope.bankAssets = 20000;
    $scope.listedInvestment = 0;
    $scope.marginLoans = 0;
    $scope.allocatedPension = 60000;
    $scope.otherInvestment = 20000;
    $scope.netRentalIncome = 0;
    $scope.otherIncome = 0;
    $scope.pensionIncome = 0;


    var retirementAgeSlider = document.getElementById('retirementAgeSlider'),
        annualSalarySlider = document.getElementById('annualSalarySlider'),
        employerContributionLevelSlider = document.getElementById('employerContributionLevelSlider'),
        employerContributionLevelSpouseSlider = document.getElementById('employerContributionLevelSpouseSlider'),
        superBalanceSlider = document.getElementById('superBalanceSlider'),
        inflationSlider = document.getElementById('inflationSlider'),
        inflationSpouseSlider = document.getElementById('inflationSpouseSlider'),
        wageIncreaseSlider = document.getElementById('wageIncreaseSlider'),
        wageIncreaseSpouseSlider = document.getElementById('wageIncreaseSpouseSlider'),
        insurancePremiumSlider = document.getElementById('insurancePremiumSlider'),
        salarySacrificeSlider = document.getElementById('salarySacrificeSlider'),
        pensionStartSlider = document.getElementById('pensionStartSlider'),
        investmentReturnSlider = document.getElementById('investmentReturnSlider'),
        variableFeeSlider = document.getElementById('variableFeeSlider'),
        fixedFeeSlider = document.getElementById('fixedFeeSlider'),
        annualSalarySpouseSlider = document.getElementById('annualSalarySpouseSlider'),
        superBalanceSpouseSlider = document.getElementById('superBalanceSpouseSlider'),
        salarySacrificeSpouseSlider = document.getElementById('salarySacrificeSpouseSlider'),
        pensionStartSpouseSlider = document.getElementById('pensionStartSpouseSlider'),
        insurancePremiumSpouseSlider = document.getElementById('insurancePremiumSpouseSlider'),
        investmentReturnSpouseSlider = document.getElementById('investmentReturnSpouseSlider'),
        variableFeeSpouseSlider = document.getElementById('variableFeeSpouseSlider'),
        fixedFeeSpouseSlider = document.getElementById('fixedFeeSpouseSlider'),
        retirementAgeSpouseSlider = document.getElementById('retirementAgeSpouseSlider'),
        pensionDrawdownBaseSlider = document.getElementById('pensionDrawdownBaseSlider'),
        pensionDrawdownBaseSpouseSlider = document.getElementById('pensionDrawdownBaseSpouseSlider'),

        homeContentsSlider = document.getElementById('homeContentsSlider'),
        vehicleCostSlider = document.getElementById('vehicleCostSlider'),
        investmentPropertySlider = document.getElementById('investmentPropertySlider'),
        bankAssetsSlider = document.getElementById('bankAssetsSlider'),
        listedInvestmentSlider = document.getElementById('listedInvestmentSlider'),
        marginLoansSlider = document.getElementById('marginLoansSlider'),
        allocatedPensionSlider = document.getElementById('allocatedPensionSlider'),
        otherInvestmentSlider = document.getElementById('otherInvestmentSlider'),
        netRentalIncomeSlider = document.getElementById('netRentalIncomeSlider'),
        otherIncomeSlider = document.getElementById('otherIncomeSlider'),
        pensionIncomeSlider = document.getElementById('pensionIncomeSlider');




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
            'max': [600000]
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
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
            // thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(employerContributionLevelSpouseSlider, {
        start: [$scope.employerContributionLevelSpouse],
        range: {
            'min': [9],
            'max': [20]
        },
        step: 0.1,
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
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(inflationSpouseSlider, {
        start: [$scope.inflationSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
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
            'max': [3000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });


    noUiSlider.create(wageIncreaseSlider, {
        start: [$scope.wageIncrease],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(wageIncreaseSpouseSlider, {
        start: [$scope.wageIncreaseSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
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

    noUiSlider.create(salarySacrificeSlider, {
        start: [$scope.salarySacrifice],
        range: {
            'min': [0],
            'max': [35000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(pensionStartSlider, {
        start: [$scope.pensionStart],
        range: {
            'min': [55],
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
        step: 0.1,
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
        step: 0.01,
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

    noUiSlider.create(annualSalarySpouseSlider, {
        start: [$scope.annualSalarySpouse],
        range: {
            'min': [0],
            'max': [600000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: 'lower'
    });

    noUiSlider.create(superBalanceSpouseSlider, {
        start: [$scope.superBalanceSpouse],
        range: {
            'min': [0],
            'max': [3000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(insurancePremiumSpouseSlider, {
        start: [$scope.insurancePremiumSpouse],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(salarySacrificeSpouseSlider, {
        start: [$scope.salarySacrificeSpouse],
        range: {
            'min': [0],
            'max': [35000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(pensionStartSpouseSlider, {
        start: [$scope.pensionStartSpouse],
        range: {
            'min': [50],
            'max': [75]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
        }),
        connect: 'lower'
    });
    noUiSlider.create(investmentReturnSpouseSlider, {
        start: [$scope.investmentReturnSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.1,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });


    noUiSlider.create(variableFeeSpouseSlider, {
        start: [$scope.variableFeeSpouse],
        range: {
            'min': [0],
            'max': [10]
        },
        step: 0.01,
        format: wNumb({
            decimals: 2,
            postfix: '%',
        }),
        connect: 'lower'
    });

    noUiSlider.create(fixedFeeSpouseSlider, {
        start: [$scope.fixedFeeSpouse],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(retirementAgeSpouseSlider, {
        start: [$scope.retirementAgeSpouse],
        range: {
            'min': [55],
            'max': [70]
        },
        step: 1,
        format: wNumb({
            decimals: 0,
            // prefix: '$',
            // thousand: ','
        }),
        connect: 'lower'
    });
    noUiSlider.create(pensionDrawdownBaseSlider, {
        start: [$scope.pensionDrawdownBase],
        range: {
            'min': [0],
            'max': [60000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(pensionDrawdownBaseSpouseSlider, {
        start: [$scope.pensionDrawdownBaseSpouse],
        range: {
            'min': [0],
            'max': [60000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(homeContentsSlider, {
        start: [$scope.homeContents],
        range: {
            'min': [0],
            'max': [500000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: 'lower'
    });

    noUiSlider.create(vehicleCostSlider, {
        start: [$scope.vehicleCost],
        range: {
            'min': [0],
            'max': [500000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(listedInvestmentSlider, {
        start: [$scope.listedInvestment],
        range: {
            'min': [0],
            'max': [1000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(investmentPropertySlider, {
        start: [$scope.investmentProperty],
        range: {
            'min': [0],
            'max': [2000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(bankAssetsSlider, {
        start: [$scope.bankAssets],
        range: {
            'min': [0],
            'max': [1000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(marginLoansSlider, {
        start: [$scope.marginLoans],
        range: {
            'min': [0],
            'max': [1000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });


    noUiSlider.create(allocatedPensionSlider, {
        start: [$scope.allocatedPension],
        range: {
            'min': [0],
            'max': [100000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    // noUiSlider.create(superFundsSlider, {
    //     start: [$scope.superFunds],
    //     range: {
    //         'min': [0],
    //         'max': [10000000]
    //     },
    //     step: 500,
    //     format: wNumb({
    //         decimals: 0,
    //         prefix: '$',
    //         thousand: ','
    //     }),
    //     connect: 'lower'
    // });

    noUiSlider.create(otherInvestmentSlider, {
        start: [$scope.otherInvestment],
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

    // noUiSlider.create(employmentIncomeSlider, {
    //     start: [$scope.employmentIncome],
    //     range: {
    //         'min': [0],
    //         'max': [10000000]
    //     },
    //     step: 500,
    //     format: wNumb({
    //         decimals: 0,
    //         prefix: '$',
    //         thousand: ','
    //     }),
    //     connect: 'lower'
    // });

    // noUiSlider.create(employmentIncomePartnerSlider, {
    //     start: [$scope.employmentIncomePartner],
    //     range: {
    //         'min': [0],
    //         'max': [10000000]
    //     },
    //     step: 500,
    //     format: wNumb({
    //         decimals: 0,
    //         prefix: '$',
    //         thousand: ','
    //     }),
    //     connect: 'lower'
    // });

    noUiSlider.create(netRentalIncomeSlider, {
        start: [$scope.netRentalIncome],
        range: {
            'min': [0],
            'max': [20000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','
        }),
        connect: 'lower'
    });

    noUiSlider.create(otherIncomeSlider, {
        start: [$scope.otherIncome],
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
    noUiSlider.create(pensionIncomeSlider, {
        start: [$scope.pensionIncome],
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




    var ageInput = document.getElementById('ageInput'),
        retirementAgeInput = document.getElementById('retirementAgeInput'),
        annualSalaryInput = document.getElementById('annualSalaryInput'),
        employerContributionLevelInput = document.getElementById('employerContributionLevelInput'),
        employerContributionLevelSpouseInput = document.getElementById('employerContributionLevelSpouseInput'),
        superBalanceInput = document.getElementById('superBalanceInput'),
        // rateOfReturnInput = document.getElementById('rateOfReturnInput'),
        inflationInput = document.getElementById('inflationInput'),
        inflationSpouseInput = document.getElementById('inflationSpouseInput'),
        wageIncreaseInput = document.getElementById('wageIncreaseInput'),
        wageIncreaseSpouseInput = document.getElementById('wageIncreaseSpouseInput'),
        insurancePremiumInput = document.getElementById('insurancePremiumInput'),
        // superTaxRateInput = document.getElementById('superTaxRateInput'),
        salarySacrificeInput = document.getElementById('salarySacrificeInput'),
        pensionStartInput = document.getElementById('pensionStartInput'),
        investmentReturnInput = document.getElementById('investmentReturnInput'),
        variableFeeInput = document.getElementById('variableFeeInput'),
        fixedFeeInput = document.getElementById('fixedFeeInput'),
        annualSalarySpouseInput = document.getElementById('annualSalarySpouseInput'),
        superBalanceSpouseInput = document.getElementById('superBalanceSpouseInput'),
        salarySacrificeSpouseInput = document.getElementById('salarySacrificeSpouseInput'),
        pensionStartSpouseInput = document.getElementById('pensionStartSpouseInput'),
        insurancePremiumSpouseInput = document.getElementById('insurancePremiumSpouseInput'),
        investmentReturnSpouseInput = document.getElementById('investmentReturnSpouseInput'),
        variableFeeSpouseInput = document.getElementById('variableFeeSpouseInput'),
        fixedFeeSpouseInput = document.getElementById('fixedFeeSpouseInput'),
        retirementAgeSpouseInput = document.getElementById('retirementAgeSpouseInput'),
        pensionDrawdownBaseInput = document.getElementById('pensionDrawdownBaseInput'),
        pensionDrawdownBaseSpouseInput = document.getElementById('pensionDrawdownBaseSpouseInput'),
        homeContentsInput = document.getElementById('homeContentsInput'),
        vehicleCostInput = document.getElementById('vehicleCostInput'),
        investmentPropertyInput = document.getElementById('investmentPropertyInput'),
        bankAssetsInput = document.getElementById('bankAssetsInput'),
        listedInvestmentInput = document.getElementById('listedInvestmentInput'),
        marginLoansInput = document.getElementById('marginLoansInput'),
        allocatedPensionInput = document.getElementById('allocatedPensionInput'),
        // superFundsInput = document.getElementById('superFundsInput'),
        otherInvestmentInput = document.getElementById('otherInvestmentInput'),
        // employmentIncomeInput = document.getElementById('employmentIncomeInput'),
        // employmentIncomePartnerInput = document.getElementById('employmentIncomePartnerInput'),
        netRentalIncomeInput = document.getElementById('netRentalIncomeInput'),
        otherIncomeInput = document.getElementById('otherIncomeInput'),
        pensionIncomeInput = document.getElementById('pensionIncomeInput');



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

    employerContributionLevelSpouseSlider.noUiSlider.on('update', function(values, handle) {
        employerContributionLevelSpouseInput.value = values[handle];
        $scope.employerContributionLevelSpouse = (values[handle]);
    });

    superBalanceSlider.noUiSlider.on('update', function(values, handle) {
        superBalanceInput.value = values[handle];
        $scope.superBalance = (values[handle]);
    });

    // rateOfReturnSlider.noUiSlider.on('update', function(values, handle) {
    //     rateOfReturnInput.value = values[handle];
    //     $scope.rateOfReturn = (values[handle]);
    // });

    inflationSlider.noUiSlider.on('update', function(values, handle) {
        inflationInput.value = values[handle];
        $scope.inflation = (values[handle]);
    });

    inflationSpouseSlider.noUiSlider.on('update', function(values, handle) {
        inflationSpouseInput.value = values[handle];
        $scope.inflationSpouse = (values[handle]);
    });

    wageIncreaseSlider.noUiSlider.on('update', function(values, handle) {
        wageIncreaseInput.value = values[handle];
        $scope.wageIncrease = (values[handle]);
    });

    wageIncreaseSpouseSlider.noUiSlider.on('update', function(values, handle) {
        wageIncreaseSpouseInput.value = values[handle];
        $scope.wageIncreaseSpouse = (values[handle]);
    });

    insurancePremiumSlider.noUiSlider.on('update', function(values, handle) {
        insurancePremiumInput.value = values[handle];
        $scope.insurancePremium = (values[handle]);
    });

    // superTaxRateSlider.noUiSlider.on('update', function(values, handle) {
    //     superTaxRateInput.value = values[handle];
    //     $scope.superTaxRate = (values[handle]);
    // });

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

    annualSalarySpouseSlider.noUiSlider.on('update', function(values, handle) {
        annualSalarySpouseInput.value = values[handle];
        $scope.annualSalarySpouse = (values[handle]);
    });

    superBalanceSpouseSlider.noUiSlider.on('update', function(values, handle) {
        superBalanceSpouseInput.value = values[handle];
        $scope.superBalanceSpouse = (values[handle]);
    });

    salarySacrificeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        salarySacrificeSpouseInput.value = values[handle];
        $scope.salarySacrificeSpouse = (values[handle]);
    });

    pensionStartSpouseSlider.noUiSlider.on('update', function(values, handle) {
        pensionStartSpouseInput.value = values[handle];
        $scope.pensionStartSpouse = (values[handle]);
    });

    insurancePremiumSpouseSlider.noUiSlider.on('update', function(values, handle) {
        insurancePremiumSpouseInput.value = values[handle];
        $scope.insurancePremiumSpouse = (values[handle]);
    });

    investmentReturnSpouseSlider.noUiSlider.on('update', function(values, handle) {
        investmentReturnSpouseInput.value = values[handle];
        $scope.investmentReturnSpouse = (values[handle]);
    });

    variableFeeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        variableFeeSpouseInput.value = values[handle];
        $scope.variableFeeSpouse = (values[handle]);
    });

    fixedFeeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        fixedFeeSpouseInput.value = values[handle];
        $scope.fixedFeeSpouse = (values[handle]);
    });

    retirementAgeSpouseSlider.noUiSlider.on('update', function(values, handle) {
        retirementAgeSpouseInput.value = values[handle];
        $scope.retirementAgeSpouse = (values[handle]);
    });

    pensionDrawdownBaseSlider.noUiSlider.on('update', function(values, handle) {
        pensionDrawdownBaseInput.value = values[handle];
        $scope.pensionDrawdownBase = (values[handle]);
    });

    pensionDrawdownBaseSpouseSlider.noUiSlider.on('update', function(values, handle) {
        pensionDrawdownBaseSpouseInput.value = values[handle];
        $scope.pensionDrawdownBaseSpouse = (values[handle]);
    });

    homeContentsSlider.noUiSlider.on('update', function(values, handle) {
        homeContentsInput.value = values[handle];
        $scope.homeContents = (values[handle]);
    });

    vehicleCostSlider.noUiSlider.on('update', function(values, handle) {
        vehicleCostInput.value = values[handle];
        $scope.vehicleCost = (values[handle]);
    });

    investmentPropertySlider.noUiSlider.on('update', function(values, handle) {
        investmentPropertyInput.value = values[handle];
        $scope.investmentProperty = (values[handle]);
    });

    bankAssetsSlider.noUiSlider.on('update', function(values, handle) {
        bankAssetsInput.value = values[handle];
        $scope.bankAssets = (values[handle]);
    });

    listedInvestmentSlider.noUiSlider.on('update', function(values, handle) {
        listedInvestmentInput.value = values[handle];
        $scope.listedInvestment = (values[handle]);
    });

    marginLoansSlider.noUiSlider.on('update', function(values, handle) {
        marginLoansInput.value = values[handle];
        $scope.marginLoans = (values[handle]);
    });

    allocatedPensionSlider.noUiSlider.on('update', function(values, handle) {
        allocatedPensionInput.value = values[handle];
        $scope.allocatedPension = (values[handle]);
    });

    // superFundsSlider.noUiSlider.on('update', function(values, handle) {
    //     superFundsInput.value = values[handle];
    //     $scope.superFunds = (values[handle]);
    // });

    otherInvestmentSlider.noUiSlider.on('update', function(values, handle) {
        otherInvestmentInput.value = values[handle];
        $scope.otherInvestment = (values[handle]);
    });

    // employmentIncomeSlider.noUiSlider.on('update', function(values, handle) {
    //     employmentIncomeInput.value = values[handle];
    //     $scope.employmentIncome = (values[handle]);
    // });

    // employmentIncomePartnerSlider.noUiSlider.on('update', function(values, handle) {
    //     employmentIncomePartnerInput.value = values[handle];
    //     $scope.employmentIncomePartner = (values[handle]);
    // });

    netRentalIncomeSlider.noUiSlider.on('update', function(values, handle) {
        netRentalIncomeInput.value = values[handle];
        $scope.netRentalIncome = (values[handle]);
    });

    otherIncomeSlider.noUiSlider.on('update', function(values, handle) {
        otherIncomeInput.value = values[handle];
        $scope.otherIncome = (values[handle]);
    });
    pensionIncomeSlider.noUiSlider.on('update', function(values, handle) {
        pensionIncomeInput.value = values[handle];
        $scope.pensionIncome = (values[handle]);
    });


    $scope.ageChange = function() {
        var dobText = document.getElementById("dobText");
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-8])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dob = fd;
        } else {
            $scope.dob = initDate;
        }
        $scope.age = AgeCalculator.getAge($scope.dob, $scope.fy);
        if($scope.age>59){
            retirementAgeSlider.noUiSlider.updateOptions({  
                range: {
                    'min': ($scope.age+1),
                    'max': 75
                }
            });
        }else{
            retirementAgeSlider.noUiSlider.updateOptions({  
                range: {
                    'min': 60,
                    'max': 75
                }
            });
        }
    }

    $scope.ageChange2 = function() {
        var dobText = document.getElementById("dobTextSpouse");
        var dateString = dobText.value;
        var dateArr = dateString.split("/");

        var date_regex = /^([1-9]|0[1-9]|1\d|2\d|3[01])\/(0[1-9]|[1-9]|1[0-2])\/(19[5-9][0-8])$/;
        var correct = date_regex.test(dobText.value);
        var fd = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
        if (((fd.getMonth() + 1) === Number(dateArr[1]) && fd.getDate() === Number(dateArr[0])) && correct) {
            $scope.dobSpouse = fd;
        } else {
            $scope.dobSpouse = initDate;
        }
        $scope.ageSpouse = AgeCalculator.getAge($scope.dobSpouse, $scope.fy);
        if($scope.ageSpouse>59){
            retirementAgeSpouseSlider.noUiSlider.updateOptions({  
                range: {
                    'min': ($scope.ageSpouse+1),
                    'max': 75
                }
            });
        }else{
            retirementAgeSpouseSlider.noUiSlider.updateOptions({  
                range: {
                    'min': 60,
                    'max': 75
                }
            });
        }
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

    employerContributionLevelSpouseInput.addEventListener("change", function() {
        employerContributionLevelSpouseSlider.noUiSlider.set($scope.employerContributionLevelSpouse);
    });

    superBalanceInput.addEventListener("change", function() {
        superBalanceSlider.noUiSlider.set($scope.superBalance);
    });


    inflationInput.addEventListener("change", function() {
        inflationSlider.noUiSlider.set($scope.inflation);
    });

    inflationSpouseInput.addEventListener("change", function() {
        inflationSpouseSlider.noUiSlider.set($scope.inflationSpouse);
    });

    wageIncreaseInput.addEventListener("change", function() {
        wageIncreaseSlider.noUiSlider.set($scope.wageIncrease);
    });

    wageIncreaseSpouseInput.addEventListener("change", function() {
        wageIncreaseSpouseSlider.noUiSlider.set($scope.wageIncreaseSpouse);
    });

    insurancePremiumInput.addEventListener("change", function() {
        insurancePremiumSlider.noUiSlider.set($scope.insurancePremium);
    });


    salarySacrificeInput.addEventListener("change", function() {
        salarySacrificeSlider.noUiSlider.set($scope.salarySacrifice);
    });

    pensionStartInput.addEventListener("change", function() {
        pensionStartSlider.noUiSlider.set($scope.pensionStart);
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

    annualSalarySpouseInput.addEventListener("change", function() {
        annualSalarySpouseSlider.noUiSlider.set($scope.annualSalarySpouse);
    });

    superBalanceSpouseInput.addEventListener("change", function() {
        superBalanceSpouseSlider.noUiSlider.set($scope.superBalanceSpouse);
    });

    salarySacrificeSpouseInput.addEventListener("change", function() {
        salarySacrificeSpouseSlider.noUiSlider.set($scope.salarySacrificeSpouse);
    });

    pensionStartSpouseInput.addEventListener("change", function() {
        pensionStartSpouseSlider.noUiSlider.set($scope.pensionStartSpouse);
    });

    insurancePremiumSpouseInput.addEventListener("change", function() {
        insurancePremiumSpouseSlider.noUiSlider.set($scope.insurancePremiumSpouse);
    });

    investmentReturnSpouseInput.addEventListener("change", function() {
        investmentReturnSpouseSlider.noUiSlider.set($scope.investmentReturnSpouse);
    });

    variableFeeSpouseInput.addEventListener("change", function() {
        variableFeeSpouseSlider.noUiSlider.set($scope.variableFeeSpouse);
    });

    fixedFeeSpouseInput.addEventListener("change", function() {
        fixedFeeSpouseSlider.noUiSlider.set($scope.fixedFeeSpouse);
    });

    retirementAgeSpouseInput.addEventListener("change", function() {
        retirementAgeSpouseSlider.noUiSlider.set($scope.retirementAgeSpouse);
    });

    pensionDrawdownBaseInput.addEventListener("change", function() {
        pensionDrawdownBaseSlider.noUiSlider.set($scope.pensionDrawdownBase);
    });

    pensionDrawdownBaseSpouseInput.addEventListener("change", function() {
        pensionDrawdownBaseSpouseSlider.noUiSlider.set($scope.pensionDrawdownBaseSpouse);
    });

    homeContentsInput.addEventListener("change", function() {
        homeContentsSlider.noUiSlider.set($scope.homeContents);
    });

    vehicleCostInput.addEventListener("change", function() {
        vehicleCostSlider.noUiSlider.set($scope.vehicleCost);
    });

    investmentPropertyInput.addEventListener("change", function() {
        investmentPropertySlider.noUiSlider.set($scope.investmentProperty);
    });

    bankAssetsInput.addEventListener("change", function() {
        bankAssetsSlider.noUiSlider.set($scope.bankAssets);
    });

    listedInvestmentInput.addEventListener("change", function() {
        listedInvestmentSlider.noUiSlider.set($scope.listedInvestment);
    });

    marginLoansInput.addEventListener("change", function() {
        marginLoansSlider.noUiSlider.set($scope.marginLoans);
    });

    allocatedPensionInput.addEventListener("change", function() {
        allocatedPensionSlider.noUiSlider.set($scope.allocatedPension);
    });

    otherInvestmentInput.addEventListener("change", function() {
        otherInvestmentSlider.noUiSlider.set($scope.otherInvestment);
    });


    netRentalIncomeInput.addEventListener("change", function() {
        netRentalIncomeSlider.noUiSlider.set($scope.netRentalIncome);
    });

    otherIncomeInput.addEventListener("change", function() {
        otherIncomeSlider.noUiSlider.set($scope.otherIncome);
    });
    pensionIncomeInput.addEventListener("change", function() {
        pensionIncomeSlider.noUiSlider.set($scope.pensionIncome);
    });


    retirementAgeSlider.noUiSlider.on('set', function(values, handle) {
        retirementAgeInput.value = values[handle];
        $scope.retirementAge = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    annualSalarySlider.noUiSlider.on('set', function(values, handle) {
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    employerContributionLevelSlider.noUiSlider.on('set', function(values, handle) {
        employerContributionLevelInput.value = values[handle];
        $scope.employerContributionLevel = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    employerContributionLevelSpouseSlider.noUiSlider.on('set', function(values, handle) {
        employerContributionLevelSpouseInput.value = values[handle];
        $scope.employerContributionLevelSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    superBalanceSlider.noUiSlider.on('set', function(values, handle) {
        superBalanceInput.value = values[handle];
        $scope.superBalance = (values[handle]);
        calculateFinal();
        $timeout(0);
    });


    inflationSlider.noUiSlider.on('set', function(values, handle) {
        inflationInput.value = values[handle];
        $scope.inflation = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    wageIncreaseSlider.noUiSlider.on('set', function(values, handle) {
        wageIncreaseInput.value = values[handle];
        $scope.wageIncrease = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    inflationSpouseSlider.noUiSlider.on('set', function(values, handle) {
        inflationSpouseInput.value = values[handle];
        $scope.inflationSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    wageIncreaseSpouseSlider.noUiSlider.on('set', function(values, handle) {
        wageIncreaseSpouseInput.value = values[handle];
        $scope.wageIncreaseSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    insurancePremiumSlider.noUiSlider.on('set', function(values, handle) {
        insurancePremiumInput.value = values[handle];
        $scope.insurancePremium = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    salarySacrificeSlider.noUiSlider.on('set', function(values, handle) {
        salarySacrificeInput.value = values[handle];
        $scope.salarySacrifice = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    pensionStartSlider.noUiSlider.on('set', function(values, handle) {
        pensionStartInput.value = values[handle];
        $scope.pensionStart = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    investmentReturnSlider.noUiSlider.on('set', function(values, handle) {
        investmentReturnInput.value = values[handle];
        $scope.investmentReturn = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    variableFeeSlider.noUiSlider.on('set', function(values, handle) {
        variableFeeInput.value = values[handle];
        $scope.variableFee = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    fixedFeeSlider.noUiSlider.on('set', function(values, handle) {
        fixedFeeInput.value = values[handle];
        $scope.fixedFee = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    annualSalarySpouseSlider.noUiSlider.on('set', function(values, handle) {
        annualSalarySpouseInput.value = values[handle];
        $scope.annualSalarySpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    superBalanceSpouseSlider.noUiSlider.on('set', function(values, handle) {
        superBalanceSpouseInput.value = values[handle];
        $scope.superBalanceSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    salarySacrificeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        salarySacrificeSpouseInput.value = values[handle];
        $scope.salarySacrificeSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    pensionStartSpouseSlider.noUiSlider.on('set', function(values, handle) {
        pensionStartSpouseInput.value = values[handle];
        $scope.pensionStartSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    insurancePremiumSpouseSlider.noUiSlider.on('set', function(values, handle) {
        insurancePremiumSpouseInput.value = values[handle];
        $scope.insurancePremiumSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    investmentReturnSpouseSlider.noUiSlider.on('set', function(values, handle) {
        investmentReturnSpouseInput.value = values[handle];
        $scope.investmentReturnSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    variableFeeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        variableFeeSpouseInput.value = values[handle];
        $scope.variableFeeSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    fixedFeeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        fixedFeeSpouseInput.value = values[handle];
        $scope.fixedFeeSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    retirementAgeSpouseSlider.noUiSlider.on('set', function(values, handle) {
        retirementAgeSpouseInput.value = values[handle];
        $scope.retirementAgeSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    pensionDrawdownBaseSlider.noUiSlider.on('set', function(values, handle) {
        pensionDrawdownBaseInput.value = values[handle];
        $scope.pensionDrawdownBase = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    pensionDrawdownBaseSpouseSlider.noUiSlider.on('set', function(values, handle) {
        pensionDrawdownBaseSpouseInput.value = values[handle];
        $scope.pensionDrawdownBaseSpouse = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    homeContentsSlider.noUiSlider.on('set', function(values, handle) {
        homeContentsInput.value = values[handle];
        $scope.homeContents = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    vehicleCostSlider.noUiSlider.on('set', function(values, handle) {
        vehicleCostInput.value = values[handle];
        $scope.vehicleCost = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    investmentPropertySlider.noUiSlider.on('set', function(values, handle) {
        investmentPropertyInput.value = values[handle];
        $scope.investmentProperty = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    bankAssetsSlider.noUiSlider.on('set', function(values, handle) {
        bankAssetsInput.value = values[handle];
        $scope.bankAssets = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    listedInvestmentSlider.noUiSlider.on('set', function(values, handle) {
        listedInvestmentInput.value = values[handle];
        $scope.listedInvestment = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    marginLoansSlider.noUiSlider.on('set', function(values, handle) {
        marginLoansInput.value = values[handle];
        $scope.marginLoans = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    allocatedPensionSlider.noUiSlider.on('set', function(values, handle) {
        allocatedPensionInput.value = values[handle];
        $scope.allocatedPension = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    otherInvestmentSlider.noUiSlider.on('set', function(values, handle) {
        otherInvestmentInput.value = values[handle];
        $scope.otherInvestment = (values[handle]);
        calculateFinal();
        $timeout(0);
    });


    netRentalIncomeSlider.noUiSlider.on('set', function(values, handle) {
        netRentalIncomeInput.value = values[handle];
        $scope.netRentalIncome = (values[handle]);
        calculateFinal();
        $timeout(0);
    });

    otherIncomeSlider.noUiSlider.on('set', function(values, handle) {
        otherIncomeInput.value = values[handle];
        $scope.otherIncome = (values[handle]);
        calculateFinal();
        $timeout(0);
    });
    pensionIncomeSlider.noUiSlider.on('set', function(values, handle) {
        pensionIncomeInput.value = values[handle];
        $scope.pensionIncome = (values[handle]);
        calculateFinal();
        $timeout(0);
    });


    $scope.spouseOptionChange = function(spouse) {
        $scope.spouseOption = spouse;
        calculateFinal();
        $timeout(0);
    }

    $scope.houseOptionChange = function(ownHouse) {
        $scope.houseOption = ownHouse;
        calculateFinal();
        $timeout(0);
    }


    function calculateMinPension(age) {
        if (age >= 56 && age <= 64) {
            return 4;
        }
        if (age >= 65 && age <= 74) {
            return 5;
        }
        if (age >= 75 && age <= 79) {
            return 6;
        }
        if (age >= 80 && age <= 84) {
            return 7;
        }
        if (age >= 85 && age <= 89) {
            return 9;
        }
        if (age >= 90 && age <= 94) {
            return 11;
        }
        if (age >= 95) {
            return 14;
        }
    }

    function cLookUp(sal) {
        if (sal <= 249999) {
            return 0.15;
        } else {
            return 0.3;
        }
    }

    $scope.isCouple = true;

    $scope.ownsHome = true;

    $scope.minPension = true;

    $scope.ddPercent = 4.00;

    $scope.ddBase = 40000;

    $scope.minPensionSpouse = true;

    $scope.ddBaseSpouse = 30000;

    function biCount(spouse) {

        if (!spouse) {
            var annualSalary = Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));

            var superBalance = Number($scope.superBalance.replaceAll('$', '').replaceAll(',', ''));

            var wageIncrease = Number($scope.wageIncrease.replaceAll('%', ''));

            var inflation = Number($scope.inflation.replaceAll('%', ''));
            var inflationSpouse = Number($scope.inflationSpouse.replaceAll('%', ''));

            var investmentReturn = Number($scope.investmentReturn.replaceAll('%', ''));

            var variableFee = Number($scope.variableFee.replaceAll('%', ''));

            var employerContributionLevel = Number($scope.employerContributionLevel.replaceAll('%', ''));

            var salarySacrifice = Number($scope.salarySacrifice.replaceAll('$', '').replaceAll(',', ''));

            var fixedFee = Number($scope.fixedFee.replaceAll('$', '').replaceAll(',', ''));

            var insurancePremium = Number($scope.insurancePremium.replaceAll('$', '').replaceAll(',', ''));

            var retirementAge = $scope.retirementAge;

            var pensionStart = $scope.pensionStart;

            var minPension = !$scope.showPensionOption;


            var ddBase = Number($scope.pensionDrawdownBase.replaceAll('$', '').replaceAll(',', ''));

            var ageL = $scope.age;

        } else {
            var annualSalary = Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', ''));

            var superBalance = Number($scope.superBalanceSpouse.replaceAll('$', '').replaceAll(',', ''));

            var wageIncrease = Number($scope.wageIncreaseSpouse.replaceAll('%', ''));

            var inflation = Number($scope.inflationSpouse.replaceAll('%', ''));

            var investmentReturn = Number($scope.investmentReturnSpouse.replaceAll('%', ''));

            var variableFee = Number($scope.variableFeeSpouse.replaceAll('%', ''));

            var employerContributionLevel = Number($scope.employerContributionLevelSpouse.replaceAll('%', ''));

            var salarySacrifice = Number($scope.salarySacrificeSpouse.replaceAll('$', '').replaceAll(',', ''));

            var fixedFee = Number($scope.fixedFeeSpouse.replaceAll('$', '').replaceAll(',', ''));

            var insurancePremium = Number($scope.insurancePremiumSpouse.replaceAll('$', '').replaceAll(',', ''));

            var retirementAge = $scope.retirementAgeSpouse;


            var pensionStart = $scope.pensionStartSpouse;

            var minPension = !$scope.showPensionOptionSpouse;

            var ddBase = Number($scope.pensionDrawdownBaseSpouse.replaceAll('$', '').replaceAll(',', ''));

            var ageL = $scope.ageSpouse;
        }



        var biArray = [];

        var baArray = [];

        var penArray = [];

        var ageArray = [];

        var balanceIndexed = 0;

        var year = 0;

        var cpi;

        var adjustedSalary, concessionalCo, earning, taxation, drawdown, fAndI, balance, balanceCpi, paymentFactor;

        var count = 0;

        while (balanceIndexed >= 0) {
            cpi = Math.pow(1 + (inflation / 100), year);
            adjustedSalary = ageL < retirementAge ? annualSalary * Math.pow(1 + (wageIncrease / 100), year) : 0;
            if (year === 0) {
                concessionalCo = 0;
            } else {
                if (ageL < $scope.retirementAge) {
                    var temp = adjustedSalary * (employerContributionLevel / 100) + salarySacrifice;
                    concessionalCo = temp <= 25000 ? temp : 25000;
                } else {
                    concessionalCo = 0;
                }
            }
            balanceCpi = 1 / cpi;
            var temp1 = 0;
            if (year === 0) {
                earnings = taxation = drawdown = fAndI = 0;
                balance = superBalance;

            } else {
                if (minPension) {
                    if (ageL < pensionStart) {
                        drawdown = 0;
                    } else {
                        drawdown = baArray[year - 1] * (calculateMinPension(ageL) / 100)
                    }
                } else {
                    if (ageL < pensionStart) {
                        drawdown = 0;
                    } else {
                        drawdown = ddBase * Math.pow(1 + (inflation / 100), ageL - pensionStart);
                    }
                }



                fAndI = baArray[year - 1] * (variableFee / 100.00) + fixedFee + insurancePremium;


                earnings = baArray[year - 1] * (Math.pow(1 + (investmentReturn / 100), 0.5) - 1) + (baArray[year - 1] * Math.pow(1 + (investmentReturn / 100), 0.5) + concessionalCo - fAndI - drawdown) * (Math.pow(1 + (investmentReturn / 100), 0.5) - 1);


                if (ageL >= 60 && ageL >= pensionStart) {
                    taxation = cLookUp(annualSalary) * concessionalCo;
                } else {
                    taxation = cLookUp(annualSalary) * concessionalCo + earnings * 0.15;
                }

                balance = baArray[year - 1] + concessionalCo + earnings - taxation - drawdown - fAndI;
            }

            balanceIndexed = balance * balanceCpi;

            baArray.push(balance);

            penArray.push(drawdown);

            biArray.push(balanceIndexed);

            ageArray.push(ageL);

            year++;

            ageL++;

            count++;

        }

        return {
            count: count - 2,
            biArray: biArray.slice(0, count - 1),
            penArray: penArray.slice(0, count - 1),
            ageArray: ageArray.slice(0, count - 1)
        }

    }

    function entitledAgedPension(superFunds, assetCalculationObj) {
        var homeContents = Number($scope.homeContents.replaceAll('$', '').replaceAll(',', ''));
        var vehicleCost = Number($scope.vehicleCost.replaceAll('$', '').replaceAll(',', ''));
        var investmentProperty = Number($scope.investmentProperty.replaceAll('$', '').replaceAll(',', ''));
        var bankAssets = Number($scope.bankAssets.replaceAll('$', '').replaceAll(',', ''));
        var listedInvestment = Number($scope.listedInvestment.replaceAll('$', '').replaceAll(',', ''));
        var marginLoans = Number($scope.marginLoans.replaceAll('$', '').replaceAll(',', ''));
        var allocatedPension = Number($scope.allocatedPension.replaceAll('$', '').replaceAll(',', ''));
        var otherInvestment = Number($scope.otherInvestment.replaceAll('$', '').replaceAll(',', ''));
        var employmentIncome = Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', ''));
        var employmentIncomePartner = $scope.spouseOption ? Number($scope.annualSalarySpouse.replaceAll('$', '').replaceAll(',', '')) : 0;
        var netRentalIncome = Number($scope.netRentalIncome.replaceAll('$', '').replaceAll(',', ''));
        var otherIncome = Number($scope.otherIncome.replaceAll('$', '').replaceAll(',', ''));
        var pensionIncome = Number($scope.pensionIncome.replaceAll('$', '').replaceAll(',', ''));


        var temp, temp2, temp3, deemingRate;

        if ($scope.spouseOption) {
            deemingRate = (($scope.age < $scope.pensionStart) && ($scope.ageSpouse < $scope.pensionStartSpouse)) ? 80600 : 40300;
        } else {
            deemingRate = 48600;
        }


        var totalAsset = homeContents + vehicleCost + investmentProperty;
        var totalInvestment = bankAssets + listedInvestment + marginLoans + allocatedPension + superFunds + otherInvestment;
        var totalIncome = employmentIncome + employmentIncomePartner + netRentalIncome + otherIncome + pensionIncome;


        if (totalInvestment <= deemingRate) {
            temp = totalInvestment * (1.75 / 100);
        } else {
            temp = deemingRate * (1.75 / 100) + (totalInvestment - deemingRate) * (3.25 / 100);
        }

        var totalCalcIncome = totalIncome + temp;


        var fortnightIncome = totalCalcIncome / 26;


        if (fortnightIncome <= assetCalculationObj.itCheck) {
            temp2 = assetCalculationObj.default;
        } else {
            temp2 = assetCalculationObj.default-assetCalculationObj.percent * (fortnightIncome - assetCalculationObj.itCheck);
        }

        var maxAgedPensionIncome = temp2;

        var totalCalcAsset = totalAsset + totalInvestment;

        if (totalCalcAsset <= assetCalculationObj.low) {
            temp3 = assetCalculationObj.default;
        } else {
            if (totalCalcAsset > assetCalculationObj.high) {
                temp3 = 0;
            } else {
                temp3 = assetCalculationObj.default-(assetCalculationObj.default / (assetCalculationObj.high - assetCalculationObj.low)) * (totalCalcAsset - assetCalculationObj.low)
            }
        }

        var maxAgedPensionAsset = temp3;


        var entitledAgedPension = maxAgedPensionIncome > maxAgedPensionAsset ? maxAgedPensionAsset : maxAgedPensionIncome;

        // return entitledAgedPension;

        return entitledAgedPension > 0 ? entitledAgedPension : 0;
    }


    function calculateFinal() {
        console.log('chaling');
        var isCouple = $scope.spouseOption;
        var ctm;
        var object1 = biCount(false);
        if (isCouple) {
            var object2 = biCount(true);
            ctm = Math.max(object1.count, object2.count);
            fillArray();
        } else {
            ctm = object1.count;
        }



        function fillArray() {
            if (object1.count < object2.count) {
                for (var i = 0; i < object2.count - object1.count; i++) {
                    object1.penArray.push(0);
                    object1.biArray.push(0);
                    object1.ageArray.push(object1.ageArray[object1.count + i] + 1);
                }
            } else {
                for (var i = 0; i < object1.count - object2.count; i++) {
                    object2.penArray.push(0);
                    object2.biArray.push(0);
                    object2.ageArray.push(object2.ageArray[object2.count + i] + 1);
                }
            }
        }

        var assetCalculationObj = {};

        if ($scope.spouseOption && $scope.houseOption) {
            assetCalculationObj.high = 1163000;
            assetCalculationObj.low = 291500;
            assetCalculationObj.default = 653.5;
            assetCalculationObj.itCheck = 288;
            assetCalculationObj.percent = 0.25;
        }

        if ($scope.spouseOption && !$scope.houseOption) {
            assetCalculationObj.high = 1312000;
            assetCalculationObj.low = 440500;
            assetCalculationObj.default = 653.5;
            assetCalculationObj.itCheck = 288;
            assetCalculationObj.percent = 0.25;
        }

        if (!$scope.spouseOption && $scope.houseOption) {
            assetCalculationObj.high = 783500;
            assetCalculationObj.low = 205500;
            assetCalculationObj.default = 867;
            assetCalculationObj.itCheck = 162;
            assetCalculationObj.percent = 0.5;
        }

        if (!$scope.spouseOption && !$scope.houseOption) {
            assetCalculationObj.high = 932500;
            assetCalculationObj.low = 354500;
            assetCalculationObj.default = 867;
            assetCalculationObj.itCheck = 162;
            assetCalculationObj.percent = 0.5;
        }

        var superFund;

        var cArray = object1.biArray;

        var eArray = $scope.spouseOption ? object2.biArray : [];

        var hArray = object1.penArray;

        var iArray = $scope.spouseOption ? object2.penArray : [];

        var fArray = [];

        var gArray = [];

        var jArray = [];

        var kArray = [];

        var lArray = [];

        var mArray = [];

        for (i = 0; i <= ctm; i++) {
            if ($scope.spouseOption) {
                superFund = object1.biArray[i] + object2.biArray[i];
                if (object2.ageArray[i] < 65){
                    gArray.push(0);
                } else {
                    gArray.push(entitledAgedPension(superFund, assetCalculationObj));
                }
                
                if (object1.ageArray[i] < 65){
                    fArray.push(0);
                }else{
                    fArray.push(entitledAgedPension(superFund, assetCalculationObj));
                }
            kArray.push(gArray[i] * 26);
            jArray.push(fArray[i] * 26);
            lArray.push(cArray[i] + eArray[i]);
            mArray.push(jArray[i] + kArray[i] + hArray[i] + iArray[i]);
            }else{
                superFund = object1.biArray[i];
                if (object1.ageArray[i] < 65){
                    fArray.push(0);
                }else{
                    fArray.push(entitledAgedPension(superFund, assetCalculationObj));
                }
                gArray.push(0);
            kArray.push(gArray[i] * 26);
            jArray.push(fArray[i] * 26);
            lArray.push(cArray[i]);
            mArray.push(jArray[i] + kArray[i] + hArray[i]);    
            }



        }

        console.log('j',jArray);
        console.log('k',kArray);
        console.log('l',lArray);
        console.log('m',mArray);


        ChartServiceHc.createChart(lArray);

        AreaChartService.createChart(jArray,kArray,hArray,iArray,27,30.2);

    }

    calculateFinal();


}]);
