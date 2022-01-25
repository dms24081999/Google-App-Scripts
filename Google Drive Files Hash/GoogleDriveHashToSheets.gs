function driveHash() {
  var folderId="<folderID>"; // Folder ID: https://drive.google.com/drive/folders/<folderID>?usp=sharing
  var sheetName="Sheet1";  // Name of the sheet
  var sheetId="<sheetID>" // Google Sheets ID: https://docs.google.com/spreadsheets/d/<sheetID>/edit#gid=0
  var pathPattern="\\" // "\\" for "\" and "/" for "/"
  
  var dApp=DriveApp;
  var folder=dApp.getFolderById(folderId);
  var ss = SpreadsheetApp.openById(sheetId);
  SpreadsheetApp.setActiveSpreadsheet(ss);
  var sheet = ss.getSheetByName(sheetName);
  sheet.clear();
  listFolders(dApp,sheet,folder,".");
}

function listFolders(dApp,sheet,folder,path) {
  folder = folder || DriveApp.getRootFolder();
  var name = folder.getName();
  var files = folder.getFiles();

  while ( files.hasNext() ) {
    file=files.next()
    md5_val=Drive.Files.get(file.getId())['md5Checksum'];
    full_path=path+pathPattern+file.getName();
    sheet.appendRow([md5_val, full_path]);
    // Logger.log(md5_val + "\t" + full_path);
  }

  var subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    subfolder=subfolders.next();
    listFolders(dApp,sheet,subfolder,path+pathPattern+subfolder.getName());
  }
}