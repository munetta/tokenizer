
var check_if_function = require('./arrow_check');
var build_beginning_of_function = require('./arrow_beginning');
var build_body_of_function = require('./arrow_body');

 function initiate_arrow(data, data_index, line_number, boundry_parameters_for_backtracking_paren) { 

   var return_object = {};

   if(check_if_function(data, data_index) === false) { 
    return_object.is_function = false;
    return return_object;
   }

   return_object.is_function = true;

   var beginning_function_ = build_beginning_of_function(data, data_index, boundry_parameters_for_backtracking_paren); //line number doesnt increase here... only decreases so not necessary... when recursing back , make sure not to count the ( inside the boundry jawn fuck boi boi you a bitch david a. ima fuk your daughter in the ass at norfolk cvs lol

   return_object.build_string = beginning_function_.build_string + "=>";
   return_object.is_async = beginning_function_.is_async;
   return_object.has_name = beginning_function_.has_name;

   data_index = data_index + 2; 

   var body_of_function = build_body_of_function(data, data_index, line_number); //line number will increase here

   return_object.build_string += body_of_function.build_string;
   return_object.parameters = body_of_function.parameters;
   return_object.line_number = body_of_function.line_number;
   return_object.data_index = body_of_function.data_index;

   return return_object;

  }

module.exports = initiate_arrow;  
  
  