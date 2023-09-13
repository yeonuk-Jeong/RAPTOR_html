

  
  function showToolTip(tblTopObj){
      var tblTop = $(tblTopObj).offset().top - 230;
      $("#table_cols_info_svg").css("top",tblTop);
      $("#table_cols_info_svg").show();
  }
  function closeToolTip(){
      $("#table_cols_info_svg").hide();
  }
  

  