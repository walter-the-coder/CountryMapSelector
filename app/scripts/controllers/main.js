'use strict';

angular.module('knowitApp')
  .controller('MainCtrl', function ($scope, Positionservice, $timeout) {
    $scope.navn ='';
    $scope.epost ='';
    $scope.resetVars = function(){
    	$scope.navn ='';
    	$scope.epost ='';
    };

    /*COUNTRY SELECT*/
    /*Name of your input field ID*/
    var inputfieldID = 'autoComplete';
    /*Name of your canvas ID*/
    var canvasID = 'myCanvas';
    /*Defines amount to scroll, that means scrollspeed*/
    var scrollAmount = 10;
    /*If selected country is needed for user purpose, you can find it here*/
    $scope.country; 

    /*Function dependent variables. do not alter*/
    var countryImage = new Image();/*USED TO PLACE IMAGE OF COUNTRY ON TOP OF MAP. do not touch*/
    var setImage = 0;
    var delayTime = 1;/*do not touch*/
	var Xpos = 0;
	var Ypos = 0;
	var canvas = document.getElementById(canvasID);
    var context = canvas.getContext('2d');
    var imageObj = new Image();
  	imageObj.onload = function() {
    	context.drawImage(imageObj, Xpos, Ypos);
  	};
	imageObj.src = '../img/worldmap.jpg';

	Positionservice.getJSON('./data/position.json').then(
        function(data) {
        	$scope.positions = data;
        },
        function(status) { console.log(status);}
    );

	$scope.getAndSetPosition = function(posArray, country) {
	    for (var teller = 0; teller < posArray.length; teller ++) {
	        if (posArray[teller].country == country) {
	        	if(posArray[teller].Xpos < Xpos){
	        		$scope.moveXpos(posArray[teller].Xpos, -scrollAmount, posArray[teller].Src);
	        	}

	        	if(posArray[teller].Xpos >= Xpos){
	        		$scope.moveXpos(posArray[teller].Xpos, scrollAmount, posArray[teller].Src);
	        	}

	        	if(posArray[teller].Ypos < Ypos){
	        		$scope.moveYpos(posArray[teller].Ypos, -scrollAmount, posArray[teller].Src);
	        	}

	        	if(posArray[teller].Ypos >= Ypos){
	        		$scope.moveYpos(posArray[teller].Ypos, scrollAmount, posArray[teller].Src);
	        	}

	        }
	    }
	};

	$scope.setCountry = function(){
		$scope.country = $('#'+inputfieldID).val();
		$scope.getAndSetPosition($scope.positions, $scope.country);
	};

	$scope.updateCanvas = function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(imageObj, Xpos, Ypos);	
	}

	$scope.moveXpos = function(XposNew, movePerTick, countryImage){
		$timeout(function(){
			if(movePerTick < 0){
				if( (XposNew+movePerTick) < Xpos){
					Xpos+=movePerTick;
					$scope.moveXpos(XposNew, movePerTick, countryImage);
					$scope.updateCanvas();
				}
				else{
					Xpos = XposNew;
					setImage +=1;
					$scope.checkIfArrivedAtCountry(countryImage);
				}
			}
			else{
				if( (XposNew-movePerTick) > Xpos){
					Xpos+=movePerTick;
					$scope.moveXpos(XposNew, movePerTick, countryImage);
					$scope.updateCanvas();
				}
				else{
					Xpos = XposNew;
					setImage +=1;
					$scope.checkIfArrivedAtCountry(countryImage);
				}
			}
		},delayTime);		
	};

	$scope.moveYpos = function(YposNew, movePerTick, countryImage){
		$timeout(function(){

			if(movePerTick < 0){
				if( (YposNew+movePerTick) < Ypos){
					Ypos+=movePerTick;
					$scope.moveYpos(YposNew, movePerTick, countryImage);
					$scope.updateCanvas();
				}
				else{
					Ypos = YposNew;
					setImage +=1;
					$scope.checkIfArrivedAtCountry(countryImage);
				}
			}
			else{
				if( (YposNew-movePerTick) > Ypos){
					Ypos+=movePerTick;
					$scope.moveYpos(YposNew, movePerTick, countryImage);
					$scope.updateCanvas();
				}
				else{
					Ypos = YposNew;
					setImage +=1;
					$scope.checkIfArrivedAtCountry(countryImage);
				}
			}
		},delayTime);		
	};

	$scope.checkIfArrivedAtCountry = function(countryImage){
		if(setImage == 2){
			$scope.updateCanvas();
			$scope.setImage(countryImage);
			setImage = 0;
		}
	}

	$scope.setImage = function(imageURL){
	  	countryImage.onload = function() {
	    	context.drawImage(countryImage, 0, 0);
	  	};
		countryImage.src = imageURL;
	}

  });