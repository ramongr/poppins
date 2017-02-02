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
  var parentId = this.getAttribute('data-poppins-parent'),
    checkedStatus = {
      checked: undefined,
      indeterminate: undefined
    };
  if(parentId !== null){
    checkedStatus = brotherCheckboxClick(parentId, this.checked, this.indeterminate);
    parentCheckboxClick(parentId, checkedStatus.checked, checkedStatus.indeterminate);
  }
}

function brotherCheckboxClick(parentId, checked, indeterminate){
  var brothers = document.querySelectorAll("[data-poppins-parent=" + parentId + "]"),
    sameState = 0;
    for(var i = 0; i < brothers.length; i++){
      if(brothers[i].checked === checked || brothers[i].indeterminate === indeterminate)
        sameState++;
  }
  return setCheckedStatus(sameState, brothers.length, checked, indeterminate);
}

/*
  1. Parent might be root
  2. Compare brothers state against clicked checkbox state
*/
function parentCheckboxClick(parentId, checked, indeterminate){
  var sameState = 0,
    checkedStatus = {
      checked: undefined,
      indeterminate: undefined
    },
    parent = document.querySelector("[data-poppins-id=" + parentId + "]");

  parent.checked = checked;
  parent.indeterminate = indeterminate;
  upperParentId = parent.getAttribute('data-poppins-parent');

  if(upperParentId !== null){
    upperParent = document.querySelector("[data-poppins-id=" + upperParentId + "]");
    parentBrothers = document.querySelectorAll("[data-poppins-parent=" + upperParentId + "]");
    console.log(parentBrothers.length);
    for(var i = 0; i < parentBrothers.length; i++){
      if(parentBrothers[i].checked === checked || parentBrothers[i].indeterminate === indeterminate)
        sameState++;
    }
    checkedStatus = setCheckedStatus(sameState, parentBrothers.length, checkedStatus.checked, checkedStatus.indeterminate);
    parentCheckboxClick(upperParentId, checkedStatus.checked, checkedStatus.indeterminate);
  }
}

function setCheckedStatus(sameState, length, checked, indeterminate){
  var obj = {
    checked: undefined,
    indeterminate: undefined
  };
  switch(sameState){
    case length:
      obj.checked = checked;
      obj.indeterminate = indeterminate;
      break;
    case 0:
      obj.checked = !checked;
      obj.indeterminate = false;
      break;
    default:
      obj.checked = !checked;
      obj.indeterminate = true;
  }

  return obj;
}