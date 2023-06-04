
let shared = require('../data');
let checked_valid = false;

//slower than numbers_o
//if(shared.get_current_token().test(/^0b([10]+)$|^0o([0-7]+)$|^0x([a-fA-f0-9]+)$|^(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?$/) === false) { //make this a look ahead if faster
// function look_ahead() { 
// } ---> /0b([10]+)$|^0o([0-7]+)|0x([a-fA-f0-9]+)|(\.[0-9]{1,}|[0]\.?[0-9]{0,}|[1-9]{1}[0-9]{0,}\.?[0-9]{0,})(e[\-+][0-9]+)?/g --- how to start regular expression look ahead at a specific index without lastIndex
//or use the function where removing object values and adding them back after... checking one index at a time...

function numbers() { 
 while(true) {
  if(isNaN(shared.get_current_token())) {
   if(checked_valid === false && check_if_might_be_valid() === true) {
    continue;
   }
   shared.pop_current_token();
   shared.decrease_data_index_for_correct_data_index_and_line_number(1);
   checked_valid = false;
   break;
  }
  shared.update_current_token(shared.get_data().charAt(shared.get_data_index()));
  shared.update_data_index(1);
 }
}

function check_if_might_be_valid() { 

 checked_valid = true;

 if(shared.get_current_token().slice(-1) === 'e') {
  if(
   (shared.get_data().charAt(shared.get_data_index() + 1) === '+' || shared.get_data().charAt(shared.get_data_index() + 1) === '-') && 
   shared.get_data().charAt(shared.get_data_index() + 2).test(/[0-9]/) === true
  ) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 2))
   shared.update_data_index(3);
   return true;
  }
 }

 if(shared.get_current_token() === '0o') {
  if(shared.get_data().charAt(shared.get_data_index() + 1).test(/[0-7]/)) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_data_index(2);
   return true;
  }
 }

 if(shared.get_current_token() === '0x') {
  if(shared.get_data().charAt(shared.get_data_index() + 1).test(/[a-fA-f0-9]/)) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_data_index(2);
   return true;
  }
 }

 if(shared.get_current_token() === 'ob') {
  if(shared.get_data().charAt(shared.get_data_index() + 1).test(/[10]/)) { 
   shared.update_current_token(shared.get_data().charAt(shared.get_data_index() + 1))
   shared.update_data_index(2);
   return true;
  }
 }

 return false;

}

module.exports = numbers;