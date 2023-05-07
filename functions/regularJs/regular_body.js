
/*
 builds the function body
*/

var update_function_and_update_data = require('../data');
var double_quote_string = require('generate/functions/regularJs/script_recursive_exit/double_quote_string');
var single_quote_string = require('generate/functions/regularJs/script_recursive_exit/single_quote_string');
var multiline_comment = require('generate/functions/regularJs/script_recursive_exit/multiline_comment');
var singleline_comment = require('generate/functions/regularJs/script_recursive_exit/singleline_comment');
var template_string = require('generate/functions/regularJs/script_recursive_exit/template_string');
var regex = require('generate/functions/regularJs/script_recursive_exit/regex');

var data_index_ = 0;
var data_ = '';
var line_number_ = 0;
var function_name = '';
var in_parameter_set = 'out';
var parameter_string = '';
var opening_parameter_count = 0; 
var closing_parameter_count = 0;
var original_line_number = 0;
var in_function_build_string_ = '';
var beginning_bracket_count = 0;
var ending_bracket_count = 0;
var data_index_and_line_number_update = {};

function build_body_of_function(data_index, line_number) {
 data_ = update_function_and_update_data.data;
 data_index_ = data_index;
 line_number_ = line_number;
 original_line_number = line_number;
 function_name = '';
 in_parameter_set = 'out';
 parameter_string = '';
 opening_parameter_count = 0; 
 closing_parameter_count = 0;
 in_function_build_string_ = '';
 return recurse(data_index_);
}

function recurse(data_index_) { 

 if(data_index_ > data_.length) {
  throw new Error(
   "Error: The function in the document has not ended. End of file error" + 
   "line number: " + original_line_number
  )
 }

 if(data_.charAt(data_index_) === '\n') { 
  line_number_ = line_number_ + 1;
 }

 in_function_build_string_ += data_.charAt(data_index_); 
 
 if(in_parameter_set === 'in') { 
  parameter_string += data_.charAt(data_index_); 
 }

 if(data_.charAt(data_index_) === '"') {
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = double_quote_string(data_index_, true, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === "'") {
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = single_quote_string(data_index_, true, line_number_, false);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === '`') { 
  data_index_ = data_index_ + 1;
  data_index_and_line_number_update = template_string(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  data_.charAt(data_index_) === '/' && 
  data_.charAt(data_index_ + 1) === '/'
 ) {
  in_function_build_string_ += '/';
  parameter_string += in_parameter_set === 'in' ? '/' : ''
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = singleline_comment(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  data_.charAt(data_index_) === '/' && 
  data_.charAt(data_index_ + 1) === '*'
 ) {
  in_function_build_string_ += '*';
  parameter_string += in_parameter_set === 'in' ? '/' : ''
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = multiline_comment(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(data_.charAt(data_index_) === '/') { 
  in_function_build_string_ += data_.charAt(data_index_ + 1);
  parameter_string += in_parameter_set === 'in' ? '/' : ''
  data_index_ = data_index_ + 2;
  data_index_and_line_number_update = regex(data_index_, true, line_number_);
  update();
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'out' &&
  data_.charAt(data_index_) !== ' ' && 
  data_.charAt(data_index_) !== '\n' && 
  data_.charAt(data_index_) !== '('
 ) { 
  function_name += data_.charAt(data_index_);
  data_index_ += 1; 
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'out' &&
  data_.charAt(data_index_) === '(' 
 ) {  
  in_parameter_set = 'in';
  parameter_string += data_.charAt(data_index_);
  opening_parameter_count += 1;
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 } 

 if(
  in_parameter_set === 'in' &&
  data_.charAt(data_index_) === '(' 
 ) { 
  opening_parameter_count += 1;
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 } 

 if(
  in_parameter_set === 'in' && 
  data_.charAt(data_index_) === ')'
 ) { 
  closing_parameter_count += 1; 
  if(opening_parameter_count === closing_parameter_count) {
   in_parameter_set = 'done';
  }
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'done' &&
  data_.charAt(data_index_) === '{' 
 ) { 
  beginning_bracket_count += 1;
  data_index_ = data_index_ + 1; 
  return recurse(data_index_);
 }

 if(
  in_parameter_set === 'done' &&
  data_.charAt(data_index_) === '}' 
 ) { 
  ending_bracket_count += 1;
  data_index_ = data_index_ + 1; 
  if(beginning_bracket_count === ending_bracket_count) { 
   return end();
  }
  return recurse(data_index_);
 }

 data_index_ = data_index_ + 1; 
 return recurse(data_index_);

}

function update() {  
 data_index_ = data_index_and_line_number_update.data_index_;
 line_number_ = data_index_and_line_number_update.line_number_;
 in_function_build_string_ += data_index_and_line_number_update.build_string;
 if(in_parameter_set === 'in') { 
  parameter_string += data_index_and_line_number_update.build_string; 
 }
}

function end() { 
 return {
  data_index: data_index_, 
  line_number: line_number_, 
  build_string: in_function_build_string_,
  parameters: parameter_string, 
  name: function_name,
 }
}

module.exports = build_body_of_function;

var a = { 
  value: 12,
  left: {
    value: 10, 
    left: {
      value: 8, 
      right: null, 
      left: null
    }, 
    right: {
      value: 11,
      right: null, 
      left: null
    }
  }, 
  right: {
    value: 18, 
    left: {
     value: 14, 
     left: null, 
     right: 16
    }, 
    right: {
      value: 20, 
      left: null, 
      right: null
    }
  },
}