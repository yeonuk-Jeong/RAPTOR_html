var morethanval = 40;

(function () {
  'use strict'

  	var Div1 = ($('#content_1_div').offset().top)-morethanval;
	var Div2 = ($('#content_2_div').offset().top)-morethanval
	var Div3 = ($('#content_3_div').offset().top)-morethanval
	var Div4 = ($('#content_4_div').offset().top)-morethanval
	var DivHt = $('#content_4_div').height();

    
    $(window).scroll(function () {
    	
    	var docScrollTopVal = $(this).scrollTop(); 
    	
        if (docScrollTopVal > 680) {
            $('#menu_div').css({
            	"position":"fixed", "top": "20px", "z-index":1
            });
        } else {
            $('#menu_div').css({
            	"position":"static", "z-index":0
            });
        }

		

		
        
        if( (docScrollTopVal>=Div1) && (docScrollTopVal<Div2) ){
        	var btnObj1 = $('#workflow_btn_1');
        	if( !btnObj1.hasClass("workflow_btn_scroll") ){
        		btnObj1.addClass("workflow_btn_scroll");
        		$('.workflow_btn').not(btnObj1).removeClass("workflow_btn_scroll");
        	}
        }else if( (docScrollTopVal>=Div2) && (docScrollTopVal<Div3) ){
        	var btnObj2 = $('#workflow_btn_2');
        	if( !btnObj2.hasClass("workflow_btn_scroll") ){
        		btnObj2.addClass("workflow_btn_scroll");
        		$('.workflow_btn').not(btnObj2).removeClass("workflow_btn_scroll");
        	}
        }else if( (docScrollTopVal>=Div3) && (docScrollTopVal<Div4) ){
        	var btnObj3 = $('#workflow_btn_3');
        	if( !btnObj3.hasClass("workflow_btn_scroll") ){
        		btnObj3.addClass("workflow_btn_scroll");
        		$('.workflow_btn').not(btnObj3).removeClass("workflow_btn_scroll");
        	}
        }else if( (docScrollTopVal>=Div4) && (docScrollTopVal<(Div4 + DivHt)) ){
        	var btnObj4 = $('#workflow_btn_4');
        	if( !btnObj4.hasClass("workflow_btn_scroll") ){
        		btnObj4.addClass("workflow_btn_scroll");
        		$('.workflow_btn').not(btnObj4).removeClass("workflow_btn_scroll");
        	}
        }
        
    });
	
	
	
	
	$('#workflow_btn_1').on('click', function () {
		$('html').animate({scrollTop : Div1}, 100,'linear');
	});
	$('#workflow_btn_2').on('click', function () {
		$('html').animate({scrollTop : Div2}, 100,'linear');
	});
	$('#workflow_btn_3').on('click', function () {
		$('html').animate({scrollTop : Div3}, 100,'linear');
	});
	$('#workflow_btn_4').on('click', function () {
		$('html').animate({scrollTop : Div4}, 100,'linear');
	});
	
	
	$('.top-btn').on('click', function () {
		$('html').animate({scrollTop : 0}, 100,'linear');
	});
	
	
	
	var thisUrlInfo = getCurrentUrlInfo();
	
	var exeBtnObj = "#workflow_btn_"+thisUrlInfo.stNum;
	$(exeBtnObj).trigger("click");
})()



