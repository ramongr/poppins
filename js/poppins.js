Poppins = {
  rootSelector: undefined,
  checkBoxes: undefined,
  init: function(){
    /*
      1. Check poppins integrity - DONE
      2. Check if there's a root - DONE
      3. Check for data-poppins tags
      4. Add eventlisteners
    */

    this.rootSelector = $('div[data-poppins=true]')[0];
    this.checkBoxes = $(this.rootSelector).find('[data-poppins-id]');
    if(this.integrityCheck())
      this.clickListeners();
  },
  /*
    Root checboxes - Parent checkboxes that that have no parent themselves
    Parent checkboxes - Checkboxes that aren't root but have children
    Node checkboxes - Checkboxes that only have parents
  */
  clickListeners: function(){
    // this.checkBoxes.each(function(index, check){
    //   $(check).on('click', function(){
    //     Poppins.handleRootClick();
    //   });
    // });
    for(var i = 0; i < this.checkBoxes.length; i++){
      if($(this.checkBoxes[i]).attr('data-poppins-root') === 'true'){
        $(this.checkBoxes[i]).on('click', function(event){
          handleRootClick(event);
        });
      }
    }
  },
  integrityCheck: function(){
    return $(this.rootSelector).length == 1 && $(this.checkBoxes).length > 0;
  },
};
function handleRootClick(event){
  rootId = $(event.target).attr('data-poppins-id');
  childrenArray = $(selector).find("[data-poppins-parent=" + rootId + "]");
}