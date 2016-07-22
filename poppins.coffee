###
function checkboxHierarchy(elem){
  var selector = "#" + $(elem).attr('id');
  var brotherArray, childArray, subChildArray, i, j, checked;
  var filterArray = [];
  var markerArray = [];
  var jsonData, pointArray;
  
  if($(elem).attr('aria-parent') === 'true'){
  
    childArray = $("[data-id=" + $(elem).attr('id') + "]");
    for(i = 0; i < childArray.length; i++){
  
      $(childArray[i]).prop('checked', $(elem).prop('checked'));
      
      if($(childArray[i]).attr('aria-parent') === 'true'){  
  
        subChildArray = $("[data-id=" + $(childArray[i]).attr('id') + "]");
        for(j = 0; j < subChildArray.length; j++){
          $(subChildArray[j]).prop('checked', $(childArray[i]).prop('checked'));
        }
      }
    }
  }

  if($(elem).attr('aria-child') === 'true'){
    var parent = "#" + $(elem).data('id');
    
    childArray = $("[data-id=" + $(elem).data('id') + "]");
    checked = 0;
    
    for(i = 0; i < childArray.length; i++){
    
      if($(childArray[i]).is(':checked'))
        checked++;
    }

    $(parent).prop('indeterminate', checked < childArray.length && checked > 0);
    $(parent).prop('checked', checked === childArray.length);

    if($(parent).attr('aria-child') === 'true'){
    
      var rootBox = "#" + $(parent).data('id');
      brotherArray = $("[data-id=" + $(parent).data('id') + "]");
      checked = 0;

      for(i = 0; i < brotherArray.length; i++){
        
        if($(brotherArray[i]).is(':checked'))

          checked++;
      }

      $(rootBox).prop('indeterminate', checked < brotherArray.length && checked > 0);
      $(rootBox).prop('checked', checked === brotherArray.length);
    }
  }
}
###

poppinsJS = 
  init: ->
    $(document).on '[type=checkbox]', 'click', (evt)->
      evt.preventPropagation()
      console.log($(this))

  default_options:
    rootId: $('[aria-root=true]').attr('id')
    

$.fn.poppins = (args) ->
  if poppinsJS[args] #Calling a function
    poppinsJS[args].apply this, Array::slice.call(arguments, 1)
  else
    poppinsJS.init.apply this, arguments if typeof args is "object" or not args