app.service('PdfMaker', [function() {

    this.createChart = function(extraDetails, personalDetails, personalDetailsSpouse, assumptions, assumptionsSpouse, otherAssets) {

        function reduceToCapitalize(nameArr) {
            if (nameArr.length < 2) {
                var name = nameArr[0];
                return name[0].toUpperCase() + name.slice(1);
            }
            return nameArr.reduce(function(first, second) {
                return first[0].toUpperCase() + first.slice(1) + " " + second[0].toUpperCase() + second.slice(1)
            })
        }


        if (personalDetails.spouseOption) {
            topDetail = 530;
            topAssum = 430;
            topHead = 70;
            nameDetail = "General Information (Member 1)";
            nameAssump = "Assumptions (Member 1)";
        } else {
            topDetail = 370;
            topAssum = 240;
            topHead = 90;
            nameDetail = "General Information";
            nameAssump = "Assumptions";
        }

        var cdob = personalDetails.dob.toString().split(" ")[1] + " " + personalDetails.dob.toString().split(" ")[2] + " " + personalDetails.dob.toString().split(" ")[3];
        var cdob1 = personalDetailsSpouse.dob.toString().split(" ")[1] + " " + personalDetailsSpouse.dob.toString().split(" ")[2] + " " + personalDetailsSpouse.dob.toString().split(" ")[3];

        var moneyFormat = wNumb({
            mark: '.',
            thousand: ',',
            prefix: '$',
            decimals: 2
                // postfix: ' p.p.'
        });

        var pcFormat = wNumb({
            mark: '.',
            postfix: '%',
            decimals: 2
        })

        var imgData2 = 'data:image/png;base64,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';

        var columnsP1 = [
            { title: "Retirement Adequacy Calculations", dataKey: "info" },
        ];

        var columnsP2 = [
            { title: "Comparison Graph", dataKey: "info" },
        ];

        var columnsP3 = [{ title: "Calculator Information", dataKey: "info" }];


        var rowsP3 = [
            { "info": "1) The Retirement Adequacy Calculator is a tool designed to help you determine whether you and your partner's retirement savings will provide you the retirement that you both want to enjoy. It builds a projection of your savings and compares it against the financial needs in retirement of you and your partner." },
            { "info": "2) The calculator also aims to show what your superannuation balance and non-superannuation investments holdings could grow to when you retire" },
            { "info": "3) The calculator also aims to identify any gap between your projected superannuation savings at retirement and your expected retirement income" },
            { "info": "4) The calculator also aims to show you how different factors such as your current age, your planned retirement age, current annual income and investments could impact your retirement savings and encourage you to actively manage your superannuation." }
        ];

        var columns1 = [
            { title: nameDetail, dataKey: "info1" },
            { title: "Values", dataKey: "value" },
        ];
        var rows1 = [
            { "info1": "Full Name", "value": reduceToCapitalize((extraDetails.firstName.trim() + " " + extraDetails.lastName.trim()).split(' ')) },
            { "info1": "Gender", "value": personalDetails.gender },
            { "info1": "Date Of Birth", "value": cdob },
            { "info1": "Age", "value": personalDetails.age },
            { "info1": "E-Mail", "value": extraDetails.email.trim() },
            { "info1": "Mobile Number", "value": "0" + extraDetails.mobile },
            { "info1": "Annual Salary", "value": moneyFormat.to(personalDetails.annualSalary) },
            { "info1": "Super Balance", "value": moneyFormat.to(personalDetails.superBalance) },
            { "info1": "Retirement Age", "value": personalDetails.retirementAge },
            { "info1": "Salary Sacrifice", "value": moneyFormat.to(personalDetails.salarySacrifice) },
            { "info1": "Pension Start Age", "value": personalDetails.pensionAge },
            { "info1": "Do you have a spouse?", "value": personalDetails.spouseOption ? "Yes" : "No" },
            { "info1": "Do you own a house?", "value": personalDetails.houseOption ? "Yes" : "No" },
            { "info1": "Target Income", "value": moneyFormat.to(personalDetails.targetIncome) }
        ];

        if(personalDetails.houseOption){    
        if (extraDetails.address !== undefined && extraDetails.address.length !== 0) {
            rows1.push({ "info1": "Address", "value": reduceToCapitalize(extraDetails.address.trim().replaceAll('\n', ' ').replace(/\s+/g, " ").split(" ")) });
        }

        if (extraDetails.postalCode != undefined) {
            var postCode = extraDetails.postalCode;
            if (extraDetails.postalCode < 10) {
                postCode = "000" + extraDetails.postalCode
            }
            if (extraDetails.postalCode >= 10 && extraDetails.postalCode < 100) {
                postCode = "00" + extraDetails.postalCode
            }
            if (extraDetails.postalCode >= 100 && extraDetails.postalCode < 1000) {
                postCode = "0" + extraDetails.postalCode
            }
            rows1.push({ "info1": "Postal Code", "value": postCode });
        }
    }

        var columns5 = [
            { title: "General Information (Member 2)", dataKey: "info2" },
            { title: "Values", dataKey: "value" },
        ];
        var rows5 = [
            { "info2": "Gender", "value": personalDetailsSpouse.gender },
            { "info2": "Date Of Birth", "value": cdob1 },
            { "info2": "Age", "value": personalDetailsSpouse.age },
            { "info2": "Annual Salary", "value": moneyFormat.to(personalDetailsSpouse.annualSalary) },
            { "info2": "Super Balance", "value": moneyFormat.to(personalDetailsSpouse.superBalance) },
            { "info2": "Retirement Age", "value": personalDetailsSpouse.retirementAge },
            { "info2": "Salary Sacrifice", "value": moneyFormat.to(personalDetailsSpouse.salarySacrifice) },
            { "info2": "Pension Start Age", "value": personalDetailsSpouse.pensionAge }
        ];

        var columns2 = [
            { title: nameAssump, dataKey: "assume1" },
            { title: "Value", dataKey: "value" },
        ];
        var rows2 = [
            { "assume1": "Insurance Premium per year", "value": moneyFormat.to(assumptions.insurancePremium) },
            { "assume1": "Investment Return", "value": pcFormat.to(assumptions.investmentReturn) },
            { "assume1": "Variable Fee", "value": pcFormat.to(assumptions.variableFee) },
            { "assume1": "Fixed Fee", "value": moneyFormat.to(assumptions.fixedFee) },
            { "assume1": "Employer Contribution Level", "value": pcFormat.to(assumptions.employerContributionLevel) },
            { "assume1": "Inflation", "value": pcFormat.to(assumptions.inflation) },
            { "assume1": "Wage Increase", "value": pcFormat.to(assumptions.wageIncrease) },
            { "assume1": "Pension Drawdown Base", "value": moneyFormat.to(assumptions.pensionDrawdownBase) }
        ];

        var columns6 = [
            { title: "Assumptions (Member 2)", dataKey: "assume2" },
            { title: "Value", dataKey: "value" },
        ];
        var rows6 = [
            { "assume2": "Insurance Premium per year", "value": moneyFormat.to(assumptionsSpouse.insurancePremium) },
            { "assume2": "Investment Return", "value": pcFormat.to(assumptionsSpouse.investmentReturn) },
            { "assume2": "Variable Fee", "value": pcFormat.to(assumptionsSpouse.variableFee) },
            { "assume2": "Fixed Fee", "value": moneyFormat.to(assumptionsSpouse.fixedFee) },
            { "assume2": "Employer Contribution Level", "value": pcFormat.to(assumptionsSpouse.employerContributionLevel) },
            { "assume2": "Inflation", "value": pcFormat.to(assumptionsSpouse.inflation) },
            { "assume2": "Wage Increase", "value": pcFormat.to(assumptionsSpouse.wageIncrease) },
            { "assume2": "Pension Drawdown Base", "value": moneyFormat.to(assumptionsSpouse.pensionDrawdownBase) }
        ];

        var columns8 = [
            { title: "Other Assets", dataKey: "otherAsset" },
            { title: "Value", dataKey: "value" },
        ];
        var rows8 = [
            { "otherAsset": "Home Contents", "value": moneyFormat.to(otherAssets.homeContents) },
            { "otherAsset": "Vehicle Cost", "value": moneyFormat.to(otherAssets.vehicleCost) },
            { "otherAsset": "Investment Property", "value": moneyFormat.to(otherAssets.investmentProperty) },
            { "otherAsset": "Bank Assets", "value": moneyFormat.to(otherAssets.bankAssets) },
            { "otherAsset": "Listed Investment", "value": moneyFormat.to(otherAssets.listedInvestment) },
            { "otherAsset": "Margin Loans", "value": moneyFormat.to(otherAssets.marginLoans) },
            { "otherAsset": "Other Investment", "value": moneyFormat.to(otherAssets.otherInvestment) },
            { "otherAsset": "Net Rental Income", "value": moneyFormat.to(otherAssets.netRentalIncome) },
            { "otherAsset": "Other Income", "value": moneyFormat.to(otherAssets.otherIncome) },
            { "otherAsset": "Pension Income", "value": moneyFormat.to(otherAssets.pensionIncome) },
            { "otherAsset": "Allocated Pension", "value": moneyFormat.to(otherAssets.allocatedPension) }
        ];



        var options = {
            theme: 'grid'
        };

        var doc = new jsPDF('p', 'pt');
        doc.autoTable(columnsP1, [], {
            margin: { top: 20 },
            styles: {
                rowHeight: 40,
                halign: 'left',
                valign: 'middle',
                fontSize: 15
            }
        });

        var top = doc.autoTableEndPosY();

        doc.autoTable(columns1, rows1, {
            margin: { top: top + 40 },
            styles: {
                halign: "left",
                overflow: 'linebreak'
            },
            columnStyles: {
                info: { columnWidth: 370 },
                value: { columnWidth: 147 }
            },
        });

        if (personalDetails.spouseOption) {
            top = doc.autoTableEndPosY();
            doc.autoTable(columns5, rows5, {
                margin: { top: top + 40 },
                styles: {
                    halign: "left",
                    overflow: 'linebreak'
                },
                columnStyles: {
                    info: { columnWidth: 370 },
                    value: { columnWidth: 147 }
                },
            });
        }

        if (!personalDetails.spouseOption) {
            top = doc.autoTableEndPosY();
            doc.autoTable(columns8, rows8, {
                margin: { top: top + 40 },
                styles: {
                    halign: "left",
                },
                columnStyles: {
                    info: { columnWidth: 370 },
                    value: { columnWidth: 147 }
                },
            });
        }

        doc.addImage(imgData2, 'PNG', 40, 780);
        doc.setFontSize(10);
        doc.text(510, 810, 'PAGE ' + 1);

        doc.addPage();
        doc.autoTable(columnsP2, [], {
            margin: { top: 20 },
            styles: {
                rowHeight: 30,
                halign: 'left',
                valign: 'middle',
                fontSize: 15
            }
        });

        var canvas = document.createElement("canvas");

        canvg(canvas, $('#container').highcharts().getSVG());

        var img = canvas.toDataURL("image/png");

        doc.addImage(img, 'PNG', 60, 80);

        canvas = document.createElement("canvas");

        canvg(canvas, $('#containerA').highcharts().getSVG());

        img = canvas.toDataURL("image/png");

        doc.addImage(img, 'PNG', 60, 420);

        doc.addImage(imgData2, 'PNG', 40, 780);
        doc.setFontSize(10);
        doc.text(510, 810, 'PAGE ' + 2);

        doc.addPage();


        doc.autoTable(columns2, rows2, {
            margin: { top: 20 },
            columnStyles: {
                info: { columnWidth: 420 },
                value: { columnWidth: 97 }
            },
        });
        if (personalDetails.spouseOption) {
            top = doc.autoTableEndPosY();
            doc.autoTable(columns6, rows6, {
                margin: { top: top + 40 },
                columnStyles: {
                    info: { columnWidth: 420 },
                    value: { columnWidth: 97 }
                },
            });

        }

        if (personalDetails.spouseOption) {
            top = doc.autoTableEndPosY();
            doc.autoTable(columns8, rows8, {
                margin: { top: top + 40 },
                styles: {
                    halign: "left",
                },
                columnStyles: {
                    info: { columnWidth: 420 },
                    value: { columnWidth: 97 }
                },
            });
        }

        if (!personalDetails.spouseOption) {
            top = doc.autoTableEndPosY();
            doc.autoTable(columnsP3, rowsP3, {
                margin: { top: top + 40 },
                styles: {
                    overflow: 'linebreak',
                    fontSize: 10
                }
            });
        }

        doc.addImage(imgData2, 'PNG', 40, 780);
        doc.setFontSize(10);
        doc.text(510, 810, 'PAGE ' + 3);

        if (personalDetails.spouseOption) {

            doc.addPage();


            doc.autoTable(columnsP3, rowsP3, {
                margin: { top: 20 },
                styles: {
                    overflow: 'linebreak',
                    fontSize: 10
                }
            });

            doc.addImage(imgData2, 'PNG', 40, 780);
            doc.setFontSize(10);
            doc.text(510, 810, 'PAGE ' + 4);

        }
        doc.save('RetirementAdequacy.pdf');

    }
}]);
