var dataList = null;

(function () {
  'use strict'
	
	dataList = gcat_bar_chart;
	d3ATGCBarChart("original_chart");
	
	if(isMultipleDataset){
		switch(multipleDatasetType){
			case "RD_TRD":{
				dataList = trimmed_gcat_bar_chart;
				d3ATGCBarChart("trimmed_chart");
			};break;
			case "RD_UMI":{
				dataList = umi_gcat_bar_chart;
				d3ATGCBarChart("umi_chart");
			};break;
			case "RD_TRD_UMI":{
				dataList = trimmed_gcat_bar_chart;
				d3ATGCBarChart("trimmed_chart");
				
				dataList = umi_gcat_bar_chart;
				d3ATGCBarChart("umi_chart");
			};break;
		}
	}
	
})()


function checkDataList(dataList){
	var result = "";
	var cnt = dataList.gc.length;
	if( cnt <= 20 ){
		result = "type1";
	}else if( cnt > 20 && cnt <= 40 ){
		result = "type2";
	}else{
		result = "type3";
	}
	return result;
}

function d3ATGCBarChart(divIdStr){
	
	var atgcData = null;
	var eachBarHeight = 0;
	var btwNum = 20;
	var oneWord = 20; //BF: 15
	var bfLeftMargin = 0;
	var leftMargin = 0;
	
	switch(checkDataList(dataList)){
		case "type1":{
			atgcData = new Array();
			var dataRow = null;
			btwNum = dataList.gc.length;
			for(var i = 0; i < btwNum; i++){
				dataRow = new Object();
				dataRow.label = dataList.labels[i];
				dataRow.gc = Number(dataList.gc[i].toFixed(1) );
				dataRow.at = Number(dataList.at[i].toFixed(1) );
				atgcData.push(dataRow);
				eachBarHeight += 38;
				bfLeftMargin = dataList.labels[i].length * oneWord;
				leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
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
			atgcData = new Array();
			var dataRow = null;
			btwNum = dataList.gc.length;
			for(var i = 0; i < btwNum; i++){
				dataRow = new Object();
				dataRow.label = dataList.labels[i];
				dataRow.gc = Number(dataList.gc[i].toFixed(1) );
				dataRow.at = Number(dataList.at[i].toFixed(1) );
				atgcData.push(dataRow);
				eachBarHeight += 38;
				bfLeftMargin = dataList.labels[i].length * oneWord;
				leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
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
			atgcData = new Array();
			var dataRow = null;
			for(var i = 0; i < btwNum; i++){
				dataRow = new Object();
				dataRow.label = dataList.labels[i];
				dataRow.gc = Number(dataList.gc[i].toFixed(1) );
				dataRow.at = Number(dataList.at[i].toFixed(1) );
				atgcData.push(dataRow);
				eachBarHeight += 38;
				bfLeftMargin = dataList.labels[i].length * oneWord;
				leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
			}
		};break;
	}
	
	
//	var atgcData = [
//		{"label":"PM-PA-1134-N-A1","gc":41.1,"at":58.9}		
//	];
	
	var dMxVal = Math.max.apply(null, dataList.data);
	var dMxValStrArr = bytesToSize(dMxVal, true).split("_");
	var dMxValArr = getChartRange( dMxValStrArr[0] );
	var dMxValIdx = (dMxValArr.length -1);
	
	var yPaddingVal = 0.3;
	var chartHeight = 0;
	if(btwNum <= 10){
		chartHeight = eachBarHeight+40+30;
	}else {
		chartHeight = eachBarHeight;
	}
	if(leftMargin <= 20){
		leftMargin = leftMargin + oneWord;
	}
	
	var margin = {top: 40, right: 30, bottom: 30, left: leftMargin },
    width = 984 - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom;

	var y = d3.scaleBand().range([0, height]).padding(yPaddingVal);
	var x = d3.scaleLinear().range([0, width]);
	var atgcToolTip = d3.select(".atgcToolTip");
	
	
	var svg = d3.select("#"+divIdStr).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	  x.domain( [0, 100] )
	  y.domain( atgcData.map(function(d) { return d.label; } ) );
	  
	  svg.selectAll(".gcbar")
      .data(atgcData)
      .enter().append("path")
      .attr("class", "gcbar")
      .attr("d", function(d){
    	  var pathDataValue = generatePathData( x(0) , y(d.label) , x(d.gc) , y.bandwidth() , 0, 0, 10, 10);
    	  return pathDataValue;
      })
      .on("mouseover", function(d) {
    	  atgcToolTip.style("display", null);
          atgcToolTip.style("left", (d3.event.pageX - 175) + "px");
          atgcToolTip.style("top", (d3.event.pageY - 125) + "px");
          atgcToolTip.select(".atgcToolTipHeader").text(d.label);
          atgcToolTip.select(".atgcToolTipGC").text(d.gc+"(%)");
          atgcToolTip.select(".atgcToolTipAT").text(d.at+"(%)");
      })
      .on("mouseout",  function() { atgcToolTip.style("display", "none"); });
	  
	  
	  svg.selectAll(".atbar")
      .data(atgcData)
      .enter().append("path")
      .attr("class", "atbar")
      .attr("d", function(d){
    	  var pathDataValue = generatePathData( x(d.gc) , y(d.label) , x(d.at) , y.bandwidth() , 10, 10, 0, 0);
    	  return pathDataValue;
      })
      .on("mouseover", function(d) {
    	  atgcToolTip.style("display", null);
          atgcToolTip.style("left", (d3.event.pageX - 175) + "px");
          atgcToolTip.style("top", (d3.event.pageY - 125) + "px");
          atgcToolTip.select(".atgcToolTipHeader").text(d.label);
          atgcToolTip.select(".atgcToolTipGC").text(d.gc+"(%)");
          atgcToolTip.select(".atgcToolTipAT").text(d.at+"(%)");
      })
      .on("mouseout",  function() { atgcToolTip.style("display", "none"); });
	  
	  svg.append("g")
	  	.attr("class", "d3HighLightG")
	  	.selectAll("text")
	  	.data(atgcData)
	  	.enter().append("text")
	  	.attr("class", "d3HighLightTxt")
	  	.attr("x", function(d){
	  		//var stX = (d.gc>50)?d.gc-(d.gc-50):d.gc-(50-d.gc);
	  		var stX = d.gc-8;
	  		return x(stX);
	  	})
	  	.attr("y", function(d) {
	  		return (y(d.label)+5+(y.bandwidth()/2));
	  	})
	  	.text(function(d) { return d.gc; });

	  svg.append("g")
	  	.attr("class", "d3HighLightG")
	  	.selectAll("text")
	  	.data(atgcData)
	  	.enter().append("text")
	  	.attr("class", "d3HighLightTxt")
	  	.attr("x", function(d){
	  		//var stX = (d.gc>50)?d.gc+(d.gc-50):d.gc+(50-d.gc);
	  		var stX = d.gc+5;
	  		return x(stX);
	  	})
	  	.attr("y", function(d) {
	  		return (y(d.label)+5+(y.bandwidth()/2));
	  	})
	  	.text(function(d) { return d.at; });
	  
	
	  svg.append("g")
	      .attr("class", "d3TopAxis")
	      .attr("transform", "translate(0,-10)")
	      .call(d3.axisBottom(x).tickFormat(function(d, i){
	    	  //return (i<5)?(d):(100-(i*10));
	    	  return d;
	      }));
	
	  svg.append("g")
	      .attr("class", "d3BottomAxis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x).tickFormat(function(d, i){
	    	  return (100-(i*10));
	      }));
	
	  svg.append("g")
	      .attr("class", "d3LeftAxis")
	      .call(d3.axisLeft(y));
	  
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".domain").remove();
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".tick").selectAll("line").attr("transform", "translate(0,0)");
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".tick").selectAll("text").attr("transform", "translate(0,-20)");
	
	  d3.select(("#"+divIdStr)).select(".d3LeftAxis").selectAll(".domain").remove();
	  d3.select(("#"+divIdStr)).select(".d3LeftAxis").selectAll(".tick").selectAll("line").remove();
	
	  d3.select(("#"+divIdStr)).select(".d3BottomAxis").selectAll(".domain").remove();
	
}

function showTabs(titleNm, ChartNm, unitSpan) {
  var x = $(".tab_item");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).hide();  
  }
  $("#"+ChartNm).show();
  x = null;
  x = $(".tabTitleDiv");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).removeClass("tabTitleDivActive");
  }
  $("#"+titleNm).addClass("tabTitleDivActive");
}

