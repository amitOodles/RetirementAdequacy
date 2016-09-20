    $scope.homeContents = 500000;
    $scope.vehicleCost = 0;
    $scope.investmentProperty = 2000;

    $scope.bankAssets = 20000;
    $scope.listedInvestment = 0;
    $scope.marginLoans = 0;
    $scope.allocatedPension = 800000;
    $scope.superFunds = 20000;
    $scope.otherInvestment = 20000;

    $scope.employmentIncome = 100000;
    $scope.employmentIncomePartner = 250000;
    $scope.netRentalIncome = 0;
    $scope.otherIncome = 0;
    $scope.pensionIncome = 0;

    var temp,temp2,temp3;

    var deemingRate=(($scope.age<$scope.retirementAge)||($scope.ageSpouse<$scope.retirementAgeSpouse))?80600:40300;

    var totalAsset=$scope.homeContents+ $scope.vehicleCost+ $scope.investmentProperty;
    var totalInvestment=$scope.bankAssets+$scope.listedInvestment+$scope.marginLoans+$scope.allocatedPension+$scope.superFunds
                        +$scope.otherInvestment;
    var totalIncome=$scope.employmentIncome+$scope.employmentIncomePartner+$scope.netRentalIncome+$scope.otherIncome+$scope.pensionIncome;

    if(totalInvestment<=deemingRate){
        temp=totalInvestment*(1.75/100);
    }else{
        temp=deemingRate*(1.75/100)+(totalInvestment-deemingRate)*(3.25/100);
    }
    var totalCalcIncome=totalIncome+temp;
    var fortnightIncome=totalCalcIncome/26;

    if(fortnightIncome<=288){
        temp2=653.5;
    }else{
        temp2=653.5-0.25*(fortnightIncome-288);
    }
    var maxAgedPensionIncome=temp2;

    var totalCalcAsset=totalAsset+totalInvestment;

    if(totalCalcAsset<=291500){
        temp3=653.5;
    }else{
        if(totalCalcAsset>1163000){
            temp3=0;
        }else{
            temp3=653.5-(653.5/(1163000-291500))*( totalCalcAsset-291500 )

        }
    }

    var maxAgedPensionAsset=temp3;

    var entitledAgedPension=maxAgedPensionIncome>maxAgedPensionAsset:maxAgedPensionAsset:maxAgedPensionIncome;