function UntitledMacro() {
//  var spreadsheet = SpreadsheetApp.getActive();
//  spreadsheet.getRange('A1').activate();
//  spreadsheet.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  
  var array = {
    names: [],
    departm: [],
    title:[],
    email:[],
    phone:[]    
  };
  
   array.phone.push(["first"]);
  Logger.log(array.phone);
  array.phone[0].push("hhaa");
  Logger.log(array.phone);
  
  var arr = objectsToArray(array);
  
 
  Logger.log(typeof(arr));
  Logger.log(arr);
  
};

function objectsToArray(objects) {
  var outputArray = [];
  for (var i in objects) 
    outputArray.push([objects[i].names, objects[i].departm, objects[i].title, objects[i].email, objects[i].phone]);
  return outputArray;
} 