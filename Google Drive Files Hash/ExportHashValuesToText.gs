function onOpen() {
  var thisSS = SpreadsheetApp.getActiveSpreadsheet();
   var myFs = [
     {name: "Export hash (.txt)", functionName: "exportHashToText"},
     {name: "Export filename (.txt)", functionName: "exportFilenameToText"},
   ];
   thisSS.addMenu("Extra Custom Tools", myFs);
}

function getData(){
  var thisSS = SpreadsheetApp.getActiveSpreadsheet();
  var currSheet = thisSS.getActiveSheet(); // .getSheetByName("Subtitles");
  var range = currSheet.getRange("A:B");
  range.sort(2); // Sorts by the values in the second column (B)
  return currSheet.getDataRange().getValues();
}

function saveToTextFile(text){
  var myName = Browser.inputBox("The file named here will be appeared in your Docs list.", Browser.Buttons.OK_CANCEL);
  if (myName == "cancel"){
  } else {
    DriveApp.createFile(myName + ".txt", text);
  }
}

function exportHashToText(){
  var data = getData();

  var text = data.map(function (row) {
    if(row[0]==""){
      hash_val='--------------------------------';
    }else{
      hash_val=row[0];
    }
    return hash_val + "\t" + row[1];
  }).join('\n');

  saveToTextFile(text);
}

function exportFilenameToText(){
  var data = getData();

  var text = data.map(function (row) {
    return row[1];
  }).join('\n');

  saveToTextFile(text);
}