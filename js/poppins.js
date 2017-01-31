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
    for(var i = 0; i < this.checkBoxes.length; i++){
      if(this.checkBoxes[i].getAttribute('data-poppins-root') === 'true'){
        this.checkBoxes[i].addEventListener('click', handleClick, false);
      }else{
        this.checkBoxes[i].addEventListener('click', handleClick, false);
      }
    }
  },
  /*
    Check for the existence of the root selected and child checkboxes
  */
  integrityCheck: function(){
    return this.rootSelector.hasChildNodes() && this.checkBoxes.length > 0;
  }
};

/*
  1. Check if there are parents
  2. Check if there are brothers
  3. Check if there are children
*/
function handleClick(){
  parentId = this.getAttribute('data-poppins-parent');
  if(parentId !== null)
    parentCheckboxClick(parentId, this.checked, this.indeterminate);
}

/*
  1. Parent might be root
  2. Compare brothers state against clicked checkbox state
*/
function parentCheckboxClick(parentId, checked, indeterminate){
  sameState = 0;
  parent = document.querySelector("[data-poppins-id=" + parentId + "]");
  upperParentId = parent.getAttribute('data-poppins-parent');
  if(upperParentId !== null){
    upperParent = document.querySelector("[data-poppins-id=" + upperParentId + "]");
    brothers = document.querySelectorAll("[data-poppins-parent=" + upperParentId + "]");

    for(var i = 0; i < brothers.length; i++){
      if(brothers[i].checked === checked || brothers[i].indeterminate === indeterminate)
        sameState++;
    }
    console.log(sameState);
    switch(sameState){
      case brothers.length:
        parent.checked = checked;
        parent.indeterminate = indeterminate;
        break;
      case 0:
        parent.checked = !checked;
        parent.indeterminate = false;
        break;
      default:
        parent.checked = !checked;
        parent.indeterminate = true;
    }
    parentCheckboxClick(upperParentId, parent.checked, parent.indeterminate);
  }else{
    parent.checked = checked;
    parent.indeterminate = indeterminate;
  }
}

function handleCheckBoxClick(){
  poppinsId = this.getAttribute('data-poppins-id');
  childrenArray = document.querySelectorAll("[data-poppins-parent=" + poppinsId + "]");
}