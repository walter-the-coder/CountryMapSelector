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
    var setImage = 0;/*do not touch*/
    var delayTime = 1;/*do not touch.*/
	var Xpos = 0;/*do not touch*/
	var Ypos = 0;/*do not touch*/
	var XposImage;/*do not touch*/
	var YposImage;/*do not touch*/
	var canvas = document.getElementById(canvasID);/*do not touch*/
    var context = canvas.getContext('2d');/*do not touch*/
    var imageObj = new Image();/*do not touch*/

    var savedImage; /*FOR DRAG FUNCTION ONLY*/

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
	        	savedImage =  posArray[teller].Src;
	        	XposImage = posArray[teller].Xpos;
	  			YposImage = posArray[teller].Ypos;
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
	};

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
	};

	$scope.setImage = function(imageURL){
	  	countryImage.onload = function() {
	    	context.drawImage(countryImage, XposImage, YposImage);
	  	};
		countryImage.src = imageURL;
	};

	var drag = false;
	var eventOriginX;
	var eventOriginY;
	var dragX;
	var dragY;
	var dragImageX;
	var dragImageY;
	var worldMapWidth = -2381;
	var worldMapHeight = -1180;
	$scope.startDrag = function(evt){
		eventOriginX =evt.clientX;
		eventOriginY =evt.clientY;
		drag = true;	
	}
	$scope.stopDrag = function(evt){
		if(drag){
			Xpos +=(evt.clientX - eventOriginX);
			Ypos +=(evt.clientY - eventOriginY);
			XposImage+=(evt.clientX-eventOriginX);
			YposImage+=(evt.clientY-eventOriginY);
			drag = false;
		}	
	};
	$scope.drag = function(evt){
		if(drag){
			if( Xpos+(evt.clientX - eventOriginX) >= 0 ){
				dragX = 0;
				dragImageX = 0;
			}
			else if ( Xpos+(evt.clientX - eventOriginX) <= worldMapWidth){ 
				dragX = worldMapWidth;
				dragImageX = worldMapWidth;
			}
			else{
				dragX = Xpos+(evt.clientX - eventOriginX);
				dragImageX = XposImage+(evt.clientX-eventOriginX);
			}
			if(Ypos+(evt.clientY - eventOriginY) >= 0){
				dragY = 0;
				dragImageY = 0;
			}
			else if( Ypos+(evt.clientY - eventOriginY) <= worldMapHeight){
				dragY = worldMapHeight;
				dragImageY = worldMapHeight;
			}
			else{
				dragY = Ypos+(evt.clientY - eventOriginY);
				dragImageY = YposImage+(evt.clientY-eventOriginY);
			}
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(imageObj, dragX, dragY);
			context.drawImage(countryImage, dragImageX, dragImageY);
		}
	}

  });