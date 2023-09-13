
(function () {
  'use strict'

	
	
	
	$('#tab_ctr_btn').on('click', function () {
		$(this).children("img").attr("src",function(idx, attr){
			if(attr.match("icon_tab2")){
				$('#list_tab_div').css("display","none");
				$('#box_list_tab_div').css("display","block");
				return attr.replace("../images/icon_tab2.png","../images/icon_tab1.png");
			}else{
				$('#list_tab_div').css("display","block");
				$('#box_list_tab_div').css("display","none");
				return attr.replace("../images/icon_tab1.png","../images/icon_tab2.png");
			}
		});
	});
	
	if(isMultipleDataset){

		switch(multipleDatasetType){
			case "RD_TRD":{
				$('#tab_ctr_btn2').on('click', function () {
					$(this).children("img").attr("src",function(idx, attr){
						if(attr.match("icon_tab2")){
							$('#list_tab_div2').css("display","none");
							$('#box_list_tab_div2').css("display","block");
							return attr.replace("../images/icon_tab2.png","../images/icon_tab1.png");
						}else{
							$('#list_tab_div2').css("display","block");
							$('#box_list_tab_div2').css("display","none");
							return attr.replace("../images/icon_tab1.png","../images/icon_tab2.png");
						}
					});
				});
			};break;
			case "RD_UMI":{
				$('#tab_ctr_btn3').on('click', function () {
					$(this).children("img").attr("src",function(idx, attr){
						if(attr.match("icon_tab2")){
							$('#list_tab_div3').css("display","none");
							$('#box_list_tab_div3').css("display","block");
							return attr.replace("../images/icon_tab2.png","../images/icon_tab1.png");
						}else{
							$('#list_tab_div3').css("display","block");
							$('#box_list_tab_div3').css("display","none");
							return attr.replace("../images/icon_tab1.png","../images/icon_tab2.png");
						}
					});
				});
			};break;
			case "RD_TRD_UMI":{
				$('#tab_ctr_btn2').on('click', function () {
					$(this).children("img").attr("src",function(idx, attr){
						if(attr.match("icon_tab2")){
							$('#list_tab_div2').css("display","none");
							$('#box_list_tab_div2').css("display","block");
							return attr.replace("../images/icon_tab2.png","../images/icon_tab1.png");
						}else{
							$('#list_tab_div2').css("display","block");
							$('#box_list_tab_div2').css("display","none");
							return attr.replace("../images/icon_tab1.png","../images/icon_tab2.png");
						}
					});
				});
				$('#tab_ctr_btn3').on('click', function () {
					$(this).children("img").attr("src",function(idx, attr){
						if(attr.match("icon_tab2")){
							$('#list_tab_div3').css("display","none");
							$('#box_list_tab_div3').css("display","block");
							return attr.replace("../images/icon_tab2.png","../images/icon_tab1.png");
						}else{
							$('#list_tab_div3').css("display","block");
							$('#box_list_tab_div3').css("display","none");
							return attr.replace("../images/icon_tab1.png","../images/icon_tab2.png");
						}
					});
				});
				
			};break;
		}

	}
	
	$('[data-magnify=myImgGallery]').magnify({
		resizable: false,
	      initMaximized: true,
	      headerToolbar: [
	    	  'zoomIn', 'zoomOut', 'prev', 'fullscreen', 'next', 'actualSize', 'close'
	      ],
	      footerToolbar:[],
	      title: true
	    });
	
	
})()


function showTabs(titleNm, ChartNm) {
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

