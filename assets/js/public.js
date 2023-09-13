
(function () {
  'use strict'
	
})()


function w3_open() {
	$("#mySmallSidebar").css("display","none");
	$("#mySidebar").css("display","block");
}

function w3_close() {
	$("#mySidebar").css("display","none");
	$("#mySmallSidebar").css("display","block");
}

function openUserInfo() {
	$("#user_info_modal_div").css("display","block");
}

function closeUserInfo() {
	$("#user_info_modal_div").css("display","none");
}

function openMainAlert(){
	$("#main_alert_svg").toggle();
}
//function closeMainAlert(){
//	$("#alert_modal_div").css("display","none");
//}
function openCompanyLoc(){
	$("#company_location_modal_div").show();
}
function closeCompanyLoc() {
	$("#company_location_modal_div").hide();
}

function locChange(htmlInfo){
	window.location = htmlInfo;
}

function openMyPopUp(htmlFile){
	var popUpObj = window.open(htmlFile, "_blank", "width=1366px, height=700px, top=100px, left=100px, menubar=no, toolbar=no, location=no, status=no, resizable=no");
}
function rstFileDownload(fileInfo){
	window.open(fileInfo, "_blank");
}

function resizeMyPopUp(){
	window.resizeTo( 1366, 700 );
}
function getCurrentUrlInfo(){
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}


function arcParameter(rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) {
    return [rx, ',', ry, ' ', xAxisRotation, ' ', largeArcFlag, ',', sweepFlag, ' ', x, ',', y ].join('');
};

function generatePathData( x, y, width, height, tr, br, bl, tl ) {
    var data = [];
    // start point in top-middle of the rectangle
    data.push('M' + (x + width / 2) + ',' + y);
    // next we go to the right
    data.push('H' + (x + width - tr));
    if (tr > 0) {
        // now we draw the arc in the top-right corner
        data.push('A' + arcParameter(tr, tr, 0, 0, 1, (x + width), (y + tr)));
    }
    // next we go down
    data.push('V' + (y + height - br));
    if (br > 0) {
        // now we draw the arc in the lower-right corner
        data.push('A' + arcParameter(br, br, 0, 0, 1, (x + width - br), (y + height)));
    }
    // now we go to the left
    data.push('H' + (x + bl));
    if (bl > 0) {
        // now we draw the arc in the lower-left corner
        data.push('A' + arcParameter(bl, bl, 0, 0, 1, (x + 0), (y + height - bl)));
    }
    // next we go up
    data.push('V' + (y + tl));
    if (tl > 0) {
        // now we draw the arc in the top-left corner
        data.push('A' + arcParameter(tl, tl, 0, 0, 1, (x + tl), (y + 0)));
    }
    // and we close the path
    data.push('Z');
    return data.join(' ');
};


function bytesToSize(bytes, showTxt) {
	var result = "";
    //var sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    var sizes = ['bp', 'Kb', 'Mb', 'Gb', 'Tb'];
    if(bytes == 0){ return 'n/a'};
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)));
    if(showTxt){
    	if(i == 0){
    		result = bytes + '_' + sizes[i];
    	}else{
    		result = (bytes / Math.pow(1000, i)).toFixed(1) + '_' + sizes[i];
    	}
    }else{
    	if(i == 0){
    		result = Number( bytes );
    	}else {
    		result = Number( (bytes / Math.pow(1000, i)).toFixed(1) );
    	}
    }
    return result;
};

function convertToSize(bytes, showTxt, standardType) {
	var result = "";
    if(bytes == 0){ return 'n/a'};
    var i = 0;
    switch(standardType){
    	case "Bytes":{i = 0;};break;
    	case "bp":{i = 0;};break;
    	case "Kb":{i = 1;};break;
    	case "Mb":{i = 2;};break;
    	case "Gb":{i = 3;};break;
    	case "Tb":{i = 4;};break;
    }
    
    if(showTxt){
    	if(i == 0){
    		result = bytes + '_' + standardType;
    	}else{
    		result = (bytes / Math.pow(1000, i)).toFixed(1) + '_' + standardType;
    	}
    }else{
    	if(i == 0){
    		result = Number( bytes );
    	}else{
    		result = Number( (bytes / Math.pow(1000, i)).toFixed(1) );
    	}
    }
    return result;
};

function getChartRange(maxVal){
	var result = new Array();
	var maxVal = Math.ceil(maxVal/10)*10;
	if( maxVal <= 20){
		for(var i = 0; i <= maxVal; i++){
			result.push(i);
		}
	}else{
		var dividingVal = 20;
			
		if(maxVal > 1000 && maxVal <= 10000){
			dividingVal *= 10;
		}else if(maxVal > 10000 && maxVal <= 100000){
			dividingVal *= 100;
		}else if(maxVal > 100000 && maxVal <= 1000000){
			dividingVal *= 1000;
		}else if(maxVal > 1000000){
			dividingVal *= 10000;
		}
		
		if( (maxVal%dividingVal) < (dividingVal/2) ){
			maxVal += dividingVal;
		}else {
			maxVal += (dividingVal/2);
		}
		for(var i = 0; i <= (maxVal/dividingVal); i++){
			result.push(i*dividingVal);
		}
	}
	return result;
}

function getCommaNumber(numStr){
	return numStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

