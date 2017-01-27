Poppins = {
  rootSelector: undefined,
  init: function(){
    /*
      1. Check poppins integrity
      2. Check if there's a root
      3. Check for data-poppins tags
      4. Add eventlisteners
    */

    poppinsDiv = $('div[data-poppins=true]');
    if($(poppinsDiv).length == 1 && $(poppinsDiv).find('[data-poppins-root=true]').length > 1){
      console.log("Hurray");
    }
  },
  handleParentClick: function(){
    console.log("Hey");
  }
};