// main goal: setInterval for the tabs
// 10:28 -> understanding and implementing setInterval method
// 11:44 -> finish the basic query and sorting the active data.
// 2:40 -> completed basic query and sorting,
// 2:41 -> reading data from index.js

// history object
// should it live on chrome.storage?
let historyObj = {};

function saveChanges() {
  // set methods has two parameters
  // first param: object
  // second param: callback function
  chrome.storage.local.set({'metaHistoryObj': historyObj}, function() {
    //console.log('historyObject is now metahistoryobj', historyObj);
    return historyObj;
  });
}

function getChanges() {
  chrome.storage.local.get(['metaHistoryObj'], function(result) {
    console.log('historyobj currently is ', result.metaHistoryObj);
  });
}

function checkTabs() {
  chrome.tabs.query({active : true, currentWindow: true}, queryTabs);
}

function queryTabs(tabs){
  // since we already parsed the query due to checking objects
  //console.log(tabs[0]);

  if (!tabs[0]) return;
  let parsedURL = tabs[0].url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)[1];
  //console.log(parsedURL);

  // check if the parsedURL exist in history object,
  // if it does NOT, set the counter to 1;
  if (!historyObj[parsedURL]) {
    historyObj[parsedURL] = { 'title' : tabs[0].title,
			      'url' : tabs[0].url,
			      'count' : 1};
  } else {
    // if it does exist, increment the count
    historyObj[parsedURL].count++;
  }
  saveChanges();
  getChanges();
  //console.log('history: ', historyObj);
}

//setInterval(() => { checkTabs(); }, 1000);
