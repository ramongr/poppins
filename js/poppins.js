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

    this.rootSelector = document.querySelector('[data-poppins=true]');
    this.checkBoxes = this.rootSelector.querySelectorAll('[data-poppins-id]');
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
      if(this.checkBoxes[i].getAttribute('data-poppins-root') === 'true'){
        this.checkBoxes[i].addEventListener('click', function(){
          handleRootClick(event);
        });
      }
    }
  },
  integrityCheck: function(){
    return this.rootSelector.hasChildNodes() && this.checkBoxes.length > 0;
  },
};

function handleRootClick(event){
  rootId = event.target.getAttribute('data-poppins-id');
  childrenArray = document.querySelectorAll("[data-poppins-parent=" + rootId + "]");

  for(var i = 0; i < childrenArray.length; i++){
    childrenArray[i].checked = event.target.checked;
  }
}