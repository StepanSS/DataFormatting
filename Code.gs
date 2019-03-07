function myFunction() {
  
  var rawDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Existing Format');
  var resDataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Desired Format');
  var index = 0;
  var i =0, j = 0;  
  var dataN;
  var namesArray=[];
  
  // Get all Names in namesArray
   while(!(rawDataSheet.getRange(i+1, 1).isBlank())){
     
     dataN = rawDataSheet.getRange(i+1, 1).getValue();
     namesArray[i] = dataN;
     //Logger.log(dataArray[i]);     
     i++;     
   }
  
  // =============================================Get all details from column   row by row
  i =i+2;//jump ovet empty row
  var lastRow = rawDataSheet.getLastRow();  
  Logger.log(lastRow);
  
  // get all data in one array (exept names)
  var rawArray = rawDataSheet.getRange(i, 1, lastRow-i+1,1).getValues();
   Logger.log(rawArray.length);  
  
  //resDataSheet.getRange(1, 1, lastRow-i+1,1).setValues(rawArray);
  var array = {
    names: [],
    departm: [],
    title:[],
    email:[],
    phone:[]    
  };
  
  //copy all data in Objecr array
  while(j<=rawArray.length){
    var temp = rawDataSheet.getRange(i, 1).getValue();
    array.names.push(temp);
    temp = rawDataSheet.getRange(i+1, 1).getValue();
    array.departm.push(rawDataSheet.getRange(i+1, 1).getValue());
    array.title.push(rawDataSheet.getRange(i+2, 1).getValue());
    array.email.push(rawDataSheet.getRange(i+3, 1).getValue());
    
    // Check if email match RexEx Pattern
    var regExPhone = new RegExp('.[0-9]{3}.+');
    var regExEmail = new RegExp('.+@.+');
    var text = array.email[index];     
    var n = regExEmail.exec(text);
    if(n){//
      //Logger.log("EMAIL GOOD");     
      array.phone.push([rawDataSheet.getRange(i+4, 1).getValue()]);
      array.phone[index].push(rawDataSheet.getRange(i+5, 1).getValue());      
      var phon = array.phone[index][1];
      var ph = regExPhone.exec(array.phone[index][1])
      Logger.log(phon);
      Logger.log(ph);
      if(ph){// ---------------Check if mobile phone present        
         i = i + 6;
         j = j + 6;         
      }else{
         array.phone[index][1] = "";
         i = i + 5;
         j = j + 5;      
         } 
    }else{
      array.email[index] = "";
      array.phone.push([rawDataSheet.getRange(i+3, 1).getValue()]);
      array.phone[index].push(rawDataSheet.getRange(i+4, 1).getValue());
      var ph = regExPhone.exec(array.phone[index][1])
      if(ph){// ---------------Check if mobile phone present
         i = i + 5;
         j = j + 5;         
      }else{
         array.phone[index][1] = "";
         i = i + 4;
         j = j + 4;      
         }
    }
    index++;
  }
  //Logger.log(i);
  
  //========================================Print DATA to Desired Format SHEET
  //Logger.log(typeof(array.names));
  
  
  for (var i = 0 ; i<array.names.length-1; i++){
    //Logger.log("Print DATA"); 
    resDataSheet.getRange(i+2, 1, 1,1).setValue(namesArray[i]);
    resDataSheet.getRange(i+2, 2, 1,1).setValue(array.names[i]);
    resDataSheet.getRange(i+2, 3, 1,1).setValue(array.departm[i]);
    resDataSheet.getRange(i+2, 4, 1,1).setValue(array.title[i]);
    resDataSheet.getRange(i+2, 5, 1,1).setValue(array.email[i]);    
    var  phone1 = array.phone[i][0];
    var  phone2 = array.phone[i][1];
    resDataSheet.getRange(i+2, 6, 1,1).setValue(array.phone[i][0]);
    resDataSheet.getRange(i+2, 7, 1,1).setValue(array.phone[i][1]);
    //Logger.log(phone1);
  }
  
  
  
}
