var my_character_array = [];
function update_character_array(data_) { //if faster than using charAt every time.. update this every file... this would replace data.js but same naming
 my_character_array = data_.split();
}
module.exports = {
 myCharAt: my_character_array, 
 update_character_array: update_character_array
}