//named and unmaed regular functions
 /*
  REGULAR BT BEGINNING: ------------------------------------------------------ use backtracking array to turn things on and off so that I can build the beginning of the function. make sure to get all other types here as well. then recurse and define type of function and start and stop when necessary.
  get rid of this and seperate each of these types of functions individually... more code but you can add them each as a config option... make sure equals and closed scope stay =, (... only backtrack oin these two
 */

 
 //backtracking the regular function for the beginning of the build string...the characters in the array should be ordered certainly.
 
 function back_track_regular(drop_off_index_reg) { 
 
   /*
    var a = async function() { } <--- 
    var a = +async function() { } <--- 
    var a = +    async function() { } <--- 
    when c is found, check for async, then check for character
    var a = +async +function() {} --- figure out if this is legal... i dont think it is. it doesnt compile so... im not going to add it in.. idk i have to figure it out. hey kenz. hey tay. hehe 
   */
 
   if(
    data.charAt(drop_off_index_reg) === 'c' && 
    take_five(drop_off_index_reg) === true && 
    regular_function_async_found === false && 
    regular_function_type_found === false && 
    regular_function_found_equals === false 
   ) {
    //then add the character here if it exists.... create another var. +,-,... if anything else not a real function. equals will be determined after
    bt_regular_parameter_string.unshift('c');
    bt_regular_parameter_string.unshift('n');
    bt_regular_parameter_string.unshift('y');
    bt_regular_parameter_string.unshift('s');
    bt_regular_parameter_string.unshift('a');
    drop_off_index_reg = drop_off_index_reg - 6; //change this to 7
    regular_function_async_found = true;
    return back_track_regular(drop_off_index_reg);
   }
 
   //check for characters right before function where async and equals doesnt exist..
 
 
 }
 
 function take_five(drop_off_index_reg) { 
   // backtrack starting from minice 5 here to check for characters. append '+,-,!...' and end
   if(
     (data.charAt(drop_off_index_reg-5) === ' ' || data.charAt(drop_off_index_reg-5) === '\s' || data.charAt(drop_off_index_reg-5) === '\n') && //or : for the beginning of an object. if : then get out
     data.charAt(drop_off_index_reg-4) === 'a' &&
     data.charAt(drop_off_index_reg-3) === 's' &&
     data.charAt(drop_off_index_reg-2) === 'y' &&
     data.charAt(drop_off_index_reg-1) === 'n' &&
     data.charAt(drop_off_index_reg  ) === 'c'
   ) { 
     return true;
   } else { 
     return false;
   }
 }

 //scoped and named in the same set... dont take urnary operators into consideration here.... add that in after... when you take ordering into consideration