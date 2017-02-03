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
  }else{
    childClick(this.getAttribute('data-poppins-id'), this.checked, this.indeterminate);
  }
}

function brotherCheckboxClick(parentId, checked, indeterminate){
  var brothers = document.querySelectorAll("[data-poppins-parent=" + parentId + "]"),
    sameState = 0;
    for(var i = 0; i < brothers.length; i++){
      if(brothers[i].checked === checked && brothers[i].indeterminate === indeterminate)
        sameState++;
  }
  return setCheckedStatus(sameState, brothers.length, checked, indeterminate);
}

function childClick(parentId, checked, indeterminate){
  var children = document.querySelectorAll("[data-poppins-parent=" + parentId + "]");

  for(var i = 0; i < children.length; i++){
    children[i].checked = checked;
    children[i].indeterminate = indeterminate;
    childId = children[i].getAttribute('data-poppins-id');
    childClick(childId, checked, indeterminate);
  }

  return true;
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
    checkedStatus = brotherCheckboxClick(upperParentId, parent.checked, parent.indeterminate);
    parentCheckboxClick(upperParentId, checkedStatus.checked, checkedStatus.indeterminate);
  }

  return true;
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