
(function () {
  'use strict'


	$('[data-magnify=myImgGallery]').magnify({
	      resizable: false,
	      initMaximized: true,
	      headerToolbar: [
	    	  'zoomIn',
	          'zoomOut',
	          'prev',
	          'fullscreen',
	          'next',
	          'actualSize',
	        'close'
	      ],
	      footerToolbar:[],
	      title: true
	    });



	$("#example_jqdt").DataTable({
		"info":false,"ordering": false,"searching": false,"lengthChange": true,
		"lengthMenu": [[10, 30, 50, -1], [10, 30, 50, "All"]],
		"language": {
		    "paginate": {
		      "previous": "<img src='../images/icon_dt_previous.png'>",
		      "next": "<img src='../images/icon_dt_next.png'>"
		    }
		}
	});
	
	if(isMultipleDataset){

		switch(multipleDatasetType){
			case "RD_TRD":{
				$("#trimmed_example_jqdt").DataTable({
					"info":false,"ordering": false,"searching": false,"lengthChange": true,
					"lengthMenu": [[10, 30, 50, -1], [10, 30, 50, "All"]],
					"language": {
					    "paginate": { "previous": "<img src='../images/icon_dt_previous.png'>", "next": "<img src='../images/icon_dt_next.png'>" }
					}
				});
			};break;
			case "RD_UMI":{
				$("#umi_example_jqdt").DataTable({
					"info":false,"ordering": false,"searching": false,"lengthChange": true,
					"lengthMenu": [[10, 30, 50, -1], [10, 30, 50, "All"]],
					"language": {
					    "paginate": { "previous": "<img src='../images/icon_dt_previous.png'>", "next": "<img src='../images/icon_dt_next.png'>" }
					}
				});
			};break;
			case "RD_TRD_UMI":{
				$("#trimmed_example_jqdt").DataTable({
					"info":false,"ordering": false,"searching": false,"lengthChange": true,
					"lengthMenu": [[10, 30, 50, -1], [10, 30, 50, "All"]],
					"language": {
					    "paginate": { "previous": "<img src='../images/icon_dt_previous.png'>", "next": "<img src='../images/icon_dt_next.png'>" }
					}
				});
				$("#umi_example_jqdt").DataTable({
					"info":false,"ordering": false,"searching": false,"lengthChange": true,
					"lengthMenu": [[10, 30, 50, -1], [10, 30, 50, "All"]],
					"language": {
					    "paginate": { "previous": "<img src='../images/icon_dt_previous.png'>", "next": "<img src='../images/icon_dt_next.png'>" }
					}
				});
			};break;
		}

	}
	
	
	
	

	
})()


function showToolTip(tblTopObj){
	var tblTop = $(tblTopObj).offset().top - 230;
	$("#table_cols_info_svg").css("top",tblTop);
	$("#table_cols_info_svg").show();
}
function closeToolTip(){
	$("#table_cols_info_svg").hide();
}

function showTabs(titleNm, ChartNm, descTxt) {
  var x = $(".tab_item");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).hide();  
  }
  $("#"+ChartNm).show();
  $("#"+descTxt).show();
  x = null;
  x = $(".tabTitleDiv");
  for (var i = 0; i < x.length; i++) {
    $(x[i]).removeClass("tabTitleDivActive");
  }
  $("#"+titleNm).addClass("tabTitleDivActive");
}
