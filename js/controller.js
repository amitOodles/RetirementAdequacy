app.controller("TTRController", ['$scope', '$timeout', 'AgeCalculator', 'TaxRateCalculator', 'SGCRate', 'WithoutSSCalculator', 'WithSSCalculator', 'ChartServiceHc', 'DonutChartServiceHc', 'PdfMaker', function($scope, $timeout, AgeCalculator, TaxRateCalculator, SGCRate, WithoutSSCalculator, WithSSCalculator, ChartServiceHc, DonutChartServiceHc, PdfMaker) {

 $scope.funds=["Building Unions Super Scheme Queensland BUSSQ ",
"First Super ",
"QSuper Lifetime Aspire 1 Group ",
"QSuper Lifetime Outlook ",
"QSuper Lifetime Sustain Group 1 ",
"Local Government Strategy AgeBased Investment Conservative ",
"QSuper Lifetime Focus 1 Group ",
"QSuper Lifetime Sustain Group 2 ",
"Construction & Building Unions Super Growth Cbus ",
"Meat Industry Employees Super MIESF ",
"QSuper Lifetime Focus 2 Group ",
"Suncorp Funds 1934 Prior ",
"QSuper Lifetime Aspire 2 Group ",
"Aon Defensive ",
"Suncorp Funds 1935 to 1939 ",
"Statewide Super ",
"Suncorp Funds 1950 to 1954 ",
"Suncorp Funds 1945 to 1949 ",
"QSuper Lifetime Focus 3 Group ",
"Suncorp Funds 1955 to 1959 ",
"Suncorp Funds 1940 to 1944 ",
"Local Government Strategy AgeBased Investment Balanced ",
"Suncorp Funds 1960 to 1964 ",
"Aon 66 ",
"Suncorp Funds 1965 to 1969 ",
"MTAA Super My AutoSuper ",
"Suncorp Funds 1970 to 1974 ",
"Telstra Super Conservative ",
"Suncorp Funds 1975 to 1979 ",
"Aon 65 ",
"MyLifeMyMoney Super MyCatholicSuper ",
"AustralianSuper ",
"HOSTPLUS Super Balanced ",
"AustralianSuper Komatsu Plan ",
"Suncorp Funds 1980 to 1984 ",
"AustralianSuper IBM Plan ",
"Suncorp Funds 1995 to 1999 ",
"Suncorp Funds 1985 to 1989 ",
"Energy Super ",
"Suncorp Funds 1990 to 1994 ",
"Suncorp Funds 2000 to 2004 ",
"Rei Super ee Balanced ",
"Aon 64 ",
"LGIASuper Lifecycle 75 Plus ",
"Care Super ",
"Prime Super ",
"Asgard Employee 1950s ",
"Mine Wealth and Wellbeing Stable ",
"CCA Future Directions Conservative ",
"ANZ Smart Choice SuperFor QBE employees 1940s ",
"Maritime Super Moderate investment ",
"Aon 63 ",
"ANZ Smart Choice Super 1940s ",
"Asgard Employee 1970s ",
"Asgard Employee 1960s ",
"Bendigo Conservative Index Fund ",
"Aon 62 ",
"Asgard Employee 1980s ",
"Local Government Strategy AgeBased Investment Balanced Growth ",
"WA Local Government Super ",
"LGIASuper Lifecycle Under 75 ",
"Sunsuper for Life Age 64 ",
"BT Business 1940s ",
"Sunsuper for Life Age 61 ",
"Sunsuper for Life Age 65 and over ",
"Sunsuper for Life Age 60 ",
"Sunsuper for Life Age 62 ",
"Sunsuper for Life Age 58 ",
"Sunsuper for Life Age 59 ",
"Sunsuper for Life Age 63 ",
"Sunsuper for Life Age 55 ",
"Sunsuper for Life Age 56 ",
"AMP Super Savings Woolworths Group ",
"Sunsuper for Life Age 57 ",
"Sunsuper for Life Age 54 and under ",
"Mine Wealth and Wellbeing Balanced ",
"Aon 61 ",
"Commonwealth Essential Super 1940's option ",
"UniSuper UniSuper Balanced ",
"Health Employees Super Australia Core Pool ",
"Pitcher Retirement Plan ",
"Westpac Group Plan 1940s ",
"Virgin Super Essentials Tracker Balanced Over 60S Mix ",
"Commonwealth Essential Super 1950's option ",
"Queensland Independent Education & Care Super QIEC ",
"Aon 60 ",
"CCA Future Directions Moderately Cons ",
"Asgard Employee 1990s ",
"Australia Post 1960s ",
"First State Super Lifecycle Balanced ",
"Colonial First State FirstChoice Superannuation Trust 194549 ",
"Intrust Super ",
"TWU Super Balanced ",
"Mercer WGSP Born prior to 1929 ",
"Colonial First State FirstChoice Superannuation Trust 195054 ",
"AFLPA & Industry 1960s ",
"Guild Retirement Fund Consolidating ",
"Australia Post Capital Stable ",
"Mercy Super ",
"Media Super Balanced investment accumulation ",
"The Transport Industry Super TIS ",
"Commonwealth Bank Group Super Accumulate Plus Balanced ",
"Club Plus Super Scheme ",
"The Flexible Benefits Super FlexibleSuper Active Balanced ",
"Aon 59 ",
"Mine Wealth and Wellbeing Growth ",
"AFLPA & Industry Capital Stable ",
"BT Super for Life Employer Super 1940s ",
"Mercer WGSP 1944 to 1948 ",
"ANZ Smart Choice SuperFor QBE employees 1950s ",
"ANZ Smart Choice Super 1950s ",
"Australian Meat Industry Super AMIST ",
"Mercer WGSP 1929 to 1933 ",
"Australia Post 1950s ",
"DuluxGroup Employees Super Active Balanced ",
"Bendigo Balanced Index Fund ",
"Incitec Pivot Employees Super Active Balanced ",
"AMP No.2 1960s ",
"Local Authorities Super Vision ",
"Mercer WGSP 1934 to 1938 ",
"Mercer WGSP 1939 to 1943 ",
"Mercer SmartPath Born prior to 1929 ",
"Anglican National ANS RIL Conservative ",
"Christian Super My Ethical ",
"AFLPA & Industry 1950s ",
"NGS Super Diversified ",
"Aon 58 ",
"Tasplan Super ",
"National Australia Bank Group Super NABGSF ",
"AMP No.2 Capital Stable ",
"AMP No.3 SDF 1960s ",
"ANZ Australian Staff Super Scheme ",
"AMP No.3 SDF Capital Stable ",
"Australian Ethical Retail Super Balanced accumulation ",
"CCA Future Directions Balanced ",
"Mercer SmartPath 1944 to 1948 ",
"legalSuper Balanced ",
"Mercer SmartPath 1929 to 1933 ",
"Mercer WGSP 1949 to 1953 ",
"equipSuper EquipSuper ",
"Quadrant Super Scheme MyChoices_ Investment ",
"Retail Employees Super REST ",
"Austsafe Super Balanced ",
"Aon 57 ",
"AMP No.2 1950s ",
"Virgin Super Essentials Tracker Balanced 50S Mix ",
"Rio Tinto Staff Super Growth Product ",
"Boc Gases Super BOC ",
"Mercer SmartPath 1934 to 1938 ",
"Mercer SmartPath 1939 to 1943 ",
"Asgard Employee 1940s ",
"Glidepath Altitude ",
"AMP No.3 SDF 1950s ",
"Colonial First State FirstChoice Superannuation Trust 195559 ",
"AvSuper Growth ",
"Local Government Strategy AgeBased Investment High Growth ",
"Australia Post 1970s ",
"Perpetual's Select Super ",
"Glidepath Destination ",
"Smartsave 'Member's Choice' Super Master Plan SmartSave Balanced ",
"Public Sector Super Accumulation Plan PSSap Balanced ",
"AFLPA & Industry 1970s ",
"Aon 56 ",
"Toyota Australia Super Plan Growth ",
"Toyota Employees Super Growth ",
"Mercer SmartPath 1949 to 1953 ",
"Westpac Group Plan 1950s ",
"Kinetic Super Growth ",
"Mercer WGSP 1954 to 1958 ",
"Mine Wealth and Wellbeing Aggressive ",
"NESS Super ",
"Glidepath Cruising ",
"Australia Post 1980s ",
"Australia Post 1990s ",
"Combined Super ",
"Russell Supersolution Master General Division ",
"Club Super ",
"Mercer Super Santos ",
"Aon 55 ",
"AMP No.2 1970s ",
"AFLPA & Industry 1980s ",
"Commonwealth Essential Super 1960's option ",
"AFLPA & Industry 1990s ",
"Telstra Super Balanced ",
"Worsley Alumina Super WASF Default ",
"AMG Super ",
"BT Business 1950s ",
"EmPlus Super ",
"Asgard Employee 2000s ",
"Glidepath Take Off ",
"Bendigo Growth Index Fund ",
"BT Super for Life Employer Super 1950s ",
"Mercer SmartPath 1954 to 1958 ",
"First State Super Lifecycle Diversified ",
"AMP No.3 SDF 1970s ",
"Aon 54 ",
"BHP Billiton Super Default ",
"AMP No.2 1980s ",
"Energy Industries Super Scheme-Pool A Balanced ",
"AMP No.2 1990s ",
"Guild Retirement Fund Growing ",
"AMP Retirement No.1 ",
"Mercer WGSP 1959 to 1963 ",
"Victorian Super Growth ",
"IOOF Portfolio Service Super ",
"ANZ Smart Choice SuperFor QBE employees 1960s ",
"ANZ Smart Choice Super 1960s ",
"CCA Future Directions Growth ",
"Commonwealth Essential Super 1990's option ",
"The Universal Super Scheme MLC ",
"Plum Super ",
"AMP Super Savings Brookfield Australia ",
"Commonwealth Essential Super 1980's option ",
"AMP No.3 SDF 1980s ",
"Nationwide Super NSF ",
"Aon 53 ",
"Commonwealth Essential Super 1970's option ",
"Concept One The Industry Super Balanced ",
"AMP No.3 SDF 1990s ",
"Mercer SmartPath 1959 to 1963 ",
"IAG & NRMA Super Plan ",
"AMP Super Savings Macquarie Group ",
"Max Super",
"Labour Union Co-Operative Retirement Balanced ",
"Goldman Sachs & JBWere Super Product ",
"Aon 52 ",
"Westpac Group Plan 2000s ",
"Westpac Group Plan 1960s ",
"Mercer WGSP 1964 to 1968 ",
"Mercer WGSP 1969 to 1973 ",
"Guild Retirement Fund Building ",
"CCA Future Directions High Growth ",
"Mercer WGSP 1974 to 1978 ",
"Mercer WGSP 1979 to 1983 ",
"Mercer WGSP 1984 to 1988 ",
"Aon 51 ",
"ANZ Smart Choice SuperFor QBE employees 1970s ",
"Telstra Super Growth ",
"Mercer WGSP 1989 to 1993 ",
"Mercer WGSP 1994 to 1998 ",
"United Technologies Corporation Retirement Plan Balanced ",
"ANZ Smart Choice Super 1970s ",
"BT Super for Life Employer Super 2000s ",
"Water Corporation Super Plan Growth ",
"The Executive Super MyLife ",
"BT Super for Life Employer Super 1960s ",
"Mercer SmartPath 1964 to 1968 ",
"Mercer SmartPath 1969 to 1973 ",
"Aon 50 ",
"Virgin Super Essentials Tracker Balanced 40S Mix ",
"Mercer WGSP 1999 to 2003 ",
"Mercer SmartPath 1974 to 1978 ",
"Mercer SmartPath 1979 to 1983 ",
"Mercer SmartPath 1984 to 1988 ",
"Colonial First State FirstChoice Superannuation Trust 196064 ",
"Anglican National ANS RIL Balanced ",
"Mercer SmartPath 1989 to 1993 ",
"Mercer SmartPath 1994 to 1998 ",
"Betros Bros Super No 2 ",
"ANZ Smart Choice SuperFor QBE employees 1980s ",
"Westpac Group Plan 1970s ",
"ANZ Smart Choice Super 1980s ",
"EquitySuper",
"ANZ Smart Choice SuperFor QBE employees 1990s ",
"Aon 49 ",
"ANZ Smart Choice Super 1990s ",
"LESF Super ",
"Lutheran Super Balanced Compliant ",
"Mercer SmartPath 1999 to 2003 ",
"BT Business 1960s ",
"Westpac Group Plan 1980s ",
"Aon 48 ",
"BT Super for Life Employer Super 1970s ",
"Westpac Group Plan 1990s ",
"Australian Catholic Super and Retirement Balanced ",
"Aon 47 ",
"Elphinstone Group Super Balanced ",
"BT Super for Life Employer Super 1980s ",
"BT Super for Life Employer Super 1990s ",
"BT Business 2000s ",
"Colonial First State FirstChoice Superannuation Trust 196569 ",
"Aon 46 ",
"Virgin Super Essentials Tracker Balanced Under 40S Mix ",
"Colonial First State FirstChoice Superannuation Trust 197074 ",
"Colonial First State FirstChoice Superannuation Trust 199599 ",
"BT Business 1970s ",
"Colonial First State FirstChoice Superannuation Trust 198589 ",
"Colonial First State FirstChoice Superannuation Trust 197579 ",
"Colonial First State FirstChoice Superannuation Trust 198084 ",
"Aon 45 ",
"Colonial First State FirstChoice Superannuation Trust 199094 ",
"Aon 44 ",
"The Victorian Independent Schools Super VISSF Balanced",
"BT Business 1990s ",
"BT Business 1980s ",
"Aon 43 ",
"Anglican National ANS RIL Growth ",
"Aon High Growth ",
"Anglican National ANS RIL High Growth "];

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

    $scope.insurancePremium =200;

    $scope.superTaxRate =15;

    $scope.administrationFee = 1;

    $scope.investmentManagementFee = 1;

    $scope.memberFee = 80;

    var retirementAgeSlider = document.getElementById('retirementAgeSlider'),
        annualSalarySlider = document.getElementById('annualSalarySlider'),
        employerContributionLevelSlider = document.getElementById('employerContributionLevelSlider'),
        superBalanceSlider = document.getElementById('superBalanceSlider'),
        rateOfReturnSlider = document.getElementById('rateOfReturnSlider'),
        inflationSlider = document.getElementById('inflationSlider'),
        wageIncreaseSlider = document.getElementById('wageIncreaseSlider'),
        insurancePremiumSlider = document.getElementById('insurancePremiumSlider'),
        superTaxRateSlider = document.getElementById('superTaxRateSlider'),
        administrationFeeSlider = document.getElementById('administrationFeeSlider'),
        investmentManagementFeeSlider = document.getElementById('investmentManagementFeeSlider'),
        memberFeeSlider = document.getElementById('memberFeeSlider');




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

    noUiSlider.create(administrationFeeSlider, {
        start: [$scope.administrationFee],
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

    noUiSlider.create(investmentManagementFeeSlider, {
        start: [$scope.investmentManagementFee],
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

    noUiSlider.create(memberFeeSlider, {
        start: [$scope.memberFee],
        range: {
            'min': [0],
            'max': [4000]
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
        administrationFeeInput = document.getElementById('administrationFeeInput'),
        investmentManagementFeeInput = document.getElementById('investmentManagementFeeInput'),
        memberFeeInput = document.getElementById('memberFeeInput');


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

    administrationFeeSlider.noUiSlider.on('update', function(values, handle) {
        administrationFeeInput.value = values[handle];
        $scope.administrationFee = (values[handle]);
    });

    investmentManagementFeeSlider.noUiSlider.on('update', function(values, handle) {
        investmentManagementFeeInput.value = values[handle];
        $scope.investmentManagementFee = (values[handle]);
    });

    memberFeeSlider.noUiSlider.on('update', function(values, handle) {
        memberFeeInput.value = values[handle];
        $scope.memberFee = (values[handle]);
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

    administrationFeeInput.addEventListener("change", function() {
        administrationFeeSlider.noUiSlider.set($scope.administrationFee);
    });

    investmentManagementFeeInput.addEventListener("change", function() {
        investmentManagementFeeSlider.noUiSlider.set($scope.investmentManagementFee);
    });

    memberFeeInput.addEventListener("change", function() {
        memberFeeSlider.noUiSlider.set($scope.memberFee);
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

    administrationFeeSlider.noUiSlider.on('set', function(values, handle) {
        administrationFeeInput.value = values[handle];
        $scope.administrationFee = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    investmentManagementFeeSlider.noUiSlider.on('set', function(values, handle) {
        investmentManagementFeeInput.value = values[handle];
        $scope.investmentManagementFee = (values[handle]);
        // calculateFinal();
        $timeout(0);
    });

    memberFeeSlider.noUiSlider.on('set', function(values, handle) {
        memberFeeInput.value = values[handle];
        $scope.memberFee = (values[handle]);
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
