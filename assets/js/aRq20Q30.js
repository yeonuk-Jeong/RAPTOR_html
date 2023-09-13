var dataList = null;

(function () {
  'use strict'
	
	dataList = quality_score_bar_chart;
	d3HorizontalBarChart("original_chart");
	
	if(isMultipleDataset){
		switch(multipleDatasetType){
			case "RD_TRD":{
				dataList = trimmed_quality_score_bar_chart;
				d3HorizontalBarChart("trimmed_chart");
			};break;
			case "RD_UMI":{
				dataList = umi_quality_score_bar_chart;
				d3HorizontalBarChart("umi_chart");
			};break;
			case "RD_TRD_UMI":{
				dataList = trimmed_quality_score_bar_chart;
				d3HorizontalBarChart("trimmed_chart");
				
				dataList = umi_quality_score_bar_chart;
				d3HorizontalBarChart("umi_chart");
			};break;
		}
	}
	
	
	
})()

function checkDataList(dataList){
	var result = "";
	var cnt = dataList.datasets[0].data.length;
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
	
	var qualityScoreData = null;
	var eachBarHeight = 0;
	var btwNum = 20;
	var oneWord = 20; //BF: 15
	var bfLeftMargin = 0;
	var leftMargin = 0;
		
	var q20ScoreArr = null;
	var q30ScoreArr = null;
	
	for(var idxNum in dataList.datasets){
		var dsObj = dataList.datasets[idxNum];
		
		if(dsObj.label == "Q20"){
			q20ScoreArr = dsObj.data;
		}
		if(dsObj.label == "Q30"){
			q30ScoreArr = dsObj.data;
		}
	}
	
	switch(checkDataList(dataList)){
		case "type1":{
			qualityScoreData = new Array();
			var dataRow = null;
			btwNum = q20ScoreArr.length;
			for(var i = 0; i < btwNum; i++){
				dataRow = new Object();
				dataRow.label = dataList.labels[i];
				dataRow.q20 = Number( q20ScoreArr[i].toFixed(1) );
				dataRow.q30 = Number( q30ScoreArr[i].toFixed(1) );
				qualityScoreData.push(dataRow);
				eachBarHeight += 75;
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
			qualityScoreData = new Array();
			var dataRow = null;
			btwNum = q20ScoreArr.length;
			for(var i = 0; i < btwNum; i++){
				dataRow = new Object();
				dataRow.label = dataList.labels[i];
				dataRow.q20 = Number( q20ScoreArr[i].toFixed(1) );
				dataRow.q30 = Number( q30ScoreArr[i].toFixed(1) );
				qualityScoreData.push(dataRow);
				eachBarHeight += 75;
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
			qualityScoreData = new Array();
			var dataRow = null;
			for(var i = 0; i < btwNum; i++){
				dataRow = new Object();
				dataRow.label = dataList.labels[i];
				dataRow.q20 = Number( q20ScoreArr[i].toFixed(1) );
				dataRow.q30 = Number( q30ScoreArr[i].toFixed(1) );
				qualityScoreData.push(dataRow);
				eachBarHeight += 75;
				bfLeftMargin = dataList.labels[i].length * oneWord;
				leftMargin = (leftMargin>bfLeftMargin)?leftMargin:bfLeftMargin;
			}
		};break;
	}
	
	
//	var qualityScoreData = [
//		{"label":"PM-PA-1134-N-A1","q20":96.13,"q30":91.23}
//	];
		
	var yPaddingVal = 0.4;
	var chartHeight = 0;
	if(btwNum <= 10){
		chartHeight = eachBarHeight+40+30;
	}else {
		chartHeight = eachBarHeight;
	}
	if(leftMargin <= 20){
		leftMargin = leftMargin + oneWord;
	}
	var margin = {top: 40, right: 80, bottom: 30, left: leftMargin },
    width = 984 - margin.left - margin.right,
    height = chartHeight - margin.top - margin.bottom;

	var y = d3.scaleBand().range([0,height]).padding(yPaddingVal);
	var x = d3.scaleLinear().range([0, width]);
	var d3ChartToolTip = d3.select(".d3ChartToolTip");
	
	
	var svg = d3.select("#"+divIdStr).append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	  x.domain( [0, 100] )
	  y.domain( qualityScoreData.map(function(d,i) { return d.label; } )
	  );
	  
	  svg.append("g")
	  .attr("class", "d3ChartYGridline")
	  .selectAll("line")
	  .data([0,10,20,30,40,50,60,70,80,90,100])
	  .enter().append("line")
	  .attr("x1", function(d) { return x(d); })
	  .attr("x2", function(d) { return x(d); })
	  .attr("y1", function(d) { return 0; })
	  .attr("y2", function(d) { return height; });
	  
	  svg.selectAll(".d3ChartBar1")
      .data(qualityScoreData)
      .enter().append("path")
      .attr("class", "d3ChartBar1")
      .attr("d", function(d){
    	  var barWidth = (y.bandwidth()/2)-2;
    	  var yPst = y(d.label);
    	  var pathDataValue = generatePathData( x(0) , yPst , x(d.q20) , barWidth , 8, 8, 0, 0);
    	  return pathDataValue;
      })
      .on("mouseout",  function() { d3ChartToolTip.style("display", "none"); })
      .on("mouseover", function(d) {
    	  d3ChartToolTip.style("display", null);
    	  d3ChartToolTip.style("left", (d3.event.pageX - 175) + "px");
    	  d3ChartToolTip.style("top", (d3.event.pageY - 125) + "px");
    	  d3ChartToolTip.select(".d3ChartToolTipHeader").text(d.label)
          d3ChartToolTip.select(".d3ChartToolTipValue1").text(d.q20);
    	  d3ChartToolTip.select(".d3ChartToolTipValue2").text(d.q30);
      });
      

	  svg.selectAll(".d3ChartBar2")
      .data(qualityScoreData)
      .enter().append("path")
      .attr("class", "d3ChartBar2")
      .attr("d", function(d){
    	  var barWidth = (y.bandwidth()/2)-2;
    	  var yPst = (y(d.label)+barWidth)+4;
    	  var pathDataValue = generatePathData( x(0) , yPst , x(d.q30) , barWidth , 8, 8, 0, 0);
    	  return pathDataValue;
      })
      .on("mouseout",  function() { d3ChartToolTip.style("display", "none"); })
      .on("mouseover", function(d) {
    	  d3ChartToolTip.style("display", null);
    	  d3ChartToolTip.style("left", (d3.event.pageX - 175) + "px");
    	  d3ChartToolTip.style("top", (d3.event.pageY - 125) + "px");
    	  d3ChartToolTip.select(".d3ChartToolTipHeader").text(d.label)
    	  d3ChartToolTip.select(".d3ChartToolTipValue1").text(d.q20);
    	  d3ChartToolTip.select(".d3ChartToolTipValue2").text(d.q30);
      });	  
	  	  
	  
	  svg.append("g")
	  	.attr("class", "d3HighLightG")
	  	.selectAll("text")
	  	.data(qualityScoreData)
	  	.enter().append("text")
	  	.attr("class", "d3HighLightTxt1")
	  	.attr("x", function(d){
	  		var addMargin = x( (d.q20/(d.q20*2)) );
	  		return (x(d.q20)+addMargin);
	  	})
	  	.attr("y", function(d) {
	  		var barWidth = (y.bandwidth()/2)/2;
	  		return y(d.label)+barWidth;
	  	})
	  	.text(function(d) { return d.q20; });

	  svg.append("g")
	  	.attr("class", "d3HighLightG")
	  	.selectAll("text")
	  	.data(qualityScoreData)
	  	.enter().append("text")
	  	.attr("class", "d3HighLightTxt2")
	  	.attr("x", function(d){
	  		var addMargin = x( (d.q30/(d.q30*2)) );
	  		return (x(d.q30)+addMargin);
	  	})
	  	.attr("y", function(d) {
	  		var barWidth = y.bandwidth()/2;
	    	var yPst = (y(d.label)+barWidth)+14;	    	
	  		return yPst;
	  	})
	  	.text(function(d) { return d.q30; });
	  
	  
	  svg.append("g")
	      .attr("class", "d3TopAxis")
	      .attr("transform", "translate(0,-10)")
	      .call(d3.axisBottom(x));
	
	  svg.append("g")
	      .attr("class", "d3LeftAxis")
	      .call(d3.axisLeft(y));
	  
	  d3.select(("#"+divIdStr)).select(".d3TopAxis").selectAll(".domain").remove();
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
  x = null;
  x = $(".tabTitleDiv");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).removeClass("tabTitleDivActive");
  }
  $("#"+titleNm).addClass("tabTitleDivActive");
}


