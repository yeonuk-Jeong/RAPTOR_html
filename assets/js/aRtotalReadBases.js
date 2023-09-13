
var dataList = null;
var chartUnitStr = "";

(function () {
  'use strict'
	
	dataList = total_read_bases_bar_chart;
	chartUnitStr = "Total Bases";
	d3HorizontalBarChart("original_chart");
	if(isMultipleDataset){
		switch(multipleDatasetType){
			case "RD_TRD":{
				dataList = trimmed_total_read_bases_bar_chart;
				d3HorizontalBarChart("trimmed_chart");
			};break;
			case "RD_UMI":{
				dataList = umi_total_read_bases_bar_chart;
				d3HorizontalBarChart("umi_chart");
			};break;
			case "RD_TRD_UMI":{
				dataList = trimmed_total_read_bases_bar_chart;
				d3HorizontalBarChart("trimmed_chart");
				
				dataList = umi_total_read_bases_bar_chart;
				d3HorizontalBarChart("umi_chart");
			};break;
		}
	}

})()

function checkDataList(dataList){
	var result = "";
	var cnt = dataList.data.length;
	if( cnt <= 20 ){
		result = "type1";
	}else if( cnt > 20 && cnt <= 40 ){
		result = "type2";
	}else{
		result = "type3";
	}
	return result;
}

function d3HorizontalBarChart(divIdStr){
	
	var readBaseData = null;
	var eachBarHeight = 0;
	var btwNum = 20;
	var dataAllCnt = dataList.data.length;
	var oneWord = 20; //BF: 15
	var bfLeftMargin = 0;
	var leftMargin = 0;
	var standardType = bytesToSize( Math.min.apply(null, dataList.data) , true).split("_")[1];
		if(standardType=="Kb"){standardType="Mb";}
	var standardDataArr = null;
	
	var standardValue = 0;
	
	switch(checkDataList(dataList)){
		case "type1":{
			readBaseData = new Array();
			standardDataArr = new Array();
			
			var dataRow = null;
			btwNum = dataList.data.length;
			for(var i = 0; i < dataAllCnt; i++){
				if(i < btwNum){
					dataRow = new Object();
					dataRow.label = dataList.labels[i];
						standardValue = convertToSize(dataList.data[i], false, standardType);
					dataRow.val = standardValue;
					readBaseData.push(dataRow);
					eachBarHeight += 38;
					bfLeftMargin = dataList.labels[i].length * oneWord;
					leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
				}else{
					standardValue = convertToSize(dataList.data[i], false, standardType);
				}
				standardDataArr.push(standardValue);
			}
			if(divIdStr=="original_chart"){
				$(".data_all_popup_btn.orgnBtn").hide();
			}else if(divIdStr=="trimmed_chart"){
				$(".data_all_popup_btn.trimBtn").hide();
			}else {
				$(".data_all_popup_btn.umiBtn").hide();
			}
		};break;
		case "type2":{
			readBaseData = new Array();
			standardDataArr = new Array();
			
			var dataRow = null;
			btwNum = dataList.data.length;
			for(var i = 0; i < dataAllCnt; i++){
				if(i < btwNum){
					dataRow = new Object();
					dataRow.label = dataList.labels[i];
						standardValue = convertToSize(dataList.data[i], false, standardType);
					dataRow.val = standardValue;
					readBaseData.push(dataRow);
					eachBarHeight += 38;
					bfLeftMargin = dataList.labels[i].length * oneWord;
					leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
				}else{
					standardValue = convertToSize(dataList.data[i], false, standardType);
				}
				standardDataArr.push(standardValue);
			}
			if(divIdStr=="original_chart"){
				$(".data_all_popup_btn.orgnBtn").hide();
			}else if(divIdStr=="trimmed_chart"){
				$(".data_all_popup_btn.trimBtn").hide();
			}else {
				$(".data_all_popup_btn.umiBtn").hide();
			}
		};break;
		case "type3":{
			readBaseData = new Array();
			standardDataArr = new Array();
			
			var dataRow = null;
			for(var i = 0; i < dataAllCnt; i++){
				if(i < btwNum){
					dataRow = new Object();
					dataRow.label = dataList.labels[i];
						standardValue = convertToSize(dataList.data[i], false, standardType);
					dataRow.val = standardValue;
					readBaseData.push(dataRow);
					eachBarHeight += 38;
					bfLeftMargin = dataList.labels[i].length * oneWord;
					leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
				}else{
					standardValue = convertToSize(dataList.data[i], false, standardType);
				}
				standardDataArr.push(standardValue);
			}
		};break;
	}
	
	



//	var readBaseData = [
//		{"label":"PM-PA-1134-N-A1","val":117.9},
//	];
	
	var dMxVal = Math.max.apply(null, standardDataArr) * 1.2;
	if(divIdStr=="original_chart"){
		$("#chart_unit_span").text( ( chartUnitStr+"("+standardType+")" ) );
	}else if(divIdStr=="trimmed_chart"){
		$("#chart_unit_span2").text( ( chartUnitStr+"("+standardType+")" ) );
	}else {
		$("#chart_unit_span3").text( ( chartUnitStr+"("+standardType+")" ) );
	}

	
	
	
	var yPaddingVal = 0.5;
	var chartHeight = 0;
	if(btwNum <= 10){
		chartHeight = eachBarHeight+40+30;
	}else {
		chartHeight = eachBarHeight;
	}
	if(leftMargin <= 20){
		leftMargin = leftMargin + oneWord;
	}
	var margin = {top: 40, right: 80, bottom: 30, left: leftMargin };
    var width = 984 - margin.left - margin.right;
    var height = chartHeight - margin.top - margin.bottom;
	var y = d3.scaleBand().range([0,height]).padding(yPaddingVal);
	var x = d3.scaleLinear().range([0, width]);
	var d3ChartToolTip = d3.select(".d3ChartToolTip");
	var svg = d3.select("#"+divIdStr).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	  x.domain([0, dMxVal ]);
	  y.domain( readBaseData.map(function(d) { return d.label; } ) );
	  
	  
	  svg.selectAll(".d3ChartBar")
      .data(readBaseData)
      .enter().append("path")
      .attr("class", "d3ChartBar")
      .attr("d", function(d){
    	  var pathDataValue = generatePathData( x(0) , y(d.label) , x(d.val) , y.bandwidth() , 8, 8, 0, 0);
    	  return pathDataValue;
      })
      .on("mouseover", function(d) {
    	  d3ChartToolTip.style("display", null);
    	  d3ChartToolTip.style("left", (d3.event.pageX - 175) + "px");
    	  d3ChartToolTip.style("top", (d3.event.pageY - 125) + "px");
    	  
    	  var ttHeaderX = 20;
    	  var ttHeaderY = 35;
    	  var ttNmX = 20;
    	  var ttNmY = 65;
    	  var ttUnitX = 20;
    	  var ttUnitY = 65;
    	  var ttValX = 165;
    	  var ttValY = 65;
    	  var dataValue = getCommaNumber(d.val);
    	  var ttNmFontSize = "18px";
    	  
    	  var standardTypeStr = "("+standardType+") : ";
    	  var chartUnitStrAll = chartUnitStr + standardTypeStr;
    	  var dataValueAll = dataValue;
    	  
    	  if(chartUnitStrAll.length > 22){
    		  ttNmX = 15;
    		  ttUnitX = 15;
			  ttUnitY = 95;
    		  ttValX = 15+(standardTypeStr.length * 8);
    		  ttValY = 95;
    		  chartUnitStrAll = chartUnitStr;
    		  standardTypeStr = "("+standardType+") : ";
    	  }else{
    		  chartUnitStrAll = chartUnitStr + standardTypeStr + dataValue;
    		  if(chartUnitStrAll.length > 22){
    			  ttValX = 20;
        		  ttValY = 95;
        		  chartUnitStrAll = chartUnitStr + standardTypeStr;
    		  }else{
    			  chartUnitStrAll = chartUnitStr + standardTypeStr;
    			  ttValX = 20+(chartUnitStrAll.length * 8);
    		  }
    		  standardTypeStr = "";
    	  }
	          
	          d3ChartToolTip.select(".d3ChartToolTipHeader").attr("x", ttHeaderX);
	          d3ChartToolTip.select(".d3ChartToolTipHeader").attr("y", ttHeaderY);
	          d3ChartToolTip.select(".d3ChartToolTipName").attr("x", ttNmX);
	          d3ChartToolTip.select(".d3ChartToolTipName").attr("y", ttNmY);
	          //d3ChartToolTip.select(".d3ChartToolTipName").attr("font-size", ttNmFontSize);
	          d3ChartToolTip.select(".d3ChartToolTipUnit").attr("x", ttUnitX);
	          d3ChartToolTip.select(".d3ChartToolTipUnit").attr("y", ttUnitY);
	          d3ChartToolTip.select(".d3ChartToolTipValue").attr("x", ttValX);
	          d3ChartToolTip.select(".d3ChartToolTipValue").attr("y", ttValY);
	          
          d3ChartToolTip.select(".d3ChartToolTipHeader").text(d.label);
    	  d3ChartToolTip.select(".d3ChartToolTipName").text( chartUnitStrAll );
    	  d3ChartToolTip.select(".d3ChartToolTipUnit").text( standardTypeStr );
          d3ChartToolTip.select(".d3ChartToolTipValue").text( dataValueAll );
      })
      .on("mouseout",  function() { d3ChartToolTip.style("display", "none"); });
	  
	  svg.append("g")
	  	.attr("class", "d3HighLightG")
	  	.selectAll("text")
	  	.data(readBaseData)
	  	.enter().append("text")
	  	.attr("class", "d3HighLightTxt")
	  	.attr("x", function(d){
	  		//var addMargin = x( (d.val/(d.val*2)) );
	  		//return (x(d.val)+addMargin);
	  		var xvPst = d.val+(d.val*0.02);
	  		return x(xvPst);
	  	})
	  	.attr("y", function(d) {
	  		return (y(d.label)+5+(y.bandwidth()/2));
	  	})
	  	.text(function(d) { return getCommaNumber(d.val); });
	  
	  svg.append("g")
	      .attr("class", "d3ChartYGridline")
	      .attr("transform", "translate(0,"+height+")")
	      .call(d3.axisBottom(x).ticks(7).tickSize(-height).tickFormat("") );
	  
	  svg.append("g")
	      .attr("class", "d3TopAxis")
	      .attr("transform", "translate(0,-10)")
	      .call(d3.axisBottom(x).ticks(7));
	  svg.append("g")
	      .attr("class", "d3LeftAxis")
	      .call(d3.axisLeft(y));
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".domain").remove();
	  d3.select(("#"+divIdStr)).select(".d3ChartYGridline").selectAll(".domain").remove();
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".tick").selectAll("line").attr("transform", "translate(0,0)");
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".tick").selectAll("text").attr("transform", "translate(0,-20)");	
	  d3.select(("#"+divIdStr)).select(".d3LeftAxis").selectAll(".domain").remove();
	  d3.select(("#"+divIdStr)).select(".d3LeftAxis").selectAll(".tick").selectAll("line").remove();
	
}

function showTabs(titleNm, ChartNm, unitSpan) {
  var x = $(".tab_item");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).hide();  
  }
  $("#"+ChartNm).show();
  $("#"+unitSpan).show();
  x = null;
  x = $(".tabTitleDiv");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).removeClass("tabTitleDivActive");
  }
  $("#"+titleNm).addClass("tabTitleDivActive");
}