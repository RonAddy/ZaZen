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
    //console.log('historyobj currently is ', result.metaHistoryObj);
    return result.metaHistoryObj;
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
  //let mHO = getChanges();

  // indexObj
  chrome.storage.local.get(['metaIndexObj'], function(res) {
    //console.log('IndexObj: ', result.metaIndexObj);
    // historyObj
    chrome.storage.local.get(['metaHistoryObj'], function(result) {
      //console.log('historyObj', result.metaHistoryObj);

      // iterate through index and history
      for (let ele in result.metaHistoryObj) {
	console.log('index: ', res.metaIndexObj);
	if (res.metaIndexObj.hasOwnProperty(ele)) {
	  console.log('index has element in history');
	  if (result.metaHistoryObj[ele].count >= res.metaIndexObj[ele]) {
	    // when the count of the history matches the index
	    alert('you have excessed the page limit.');
	  }
	}
      }
    });
  });

  // iterating through metaIndexObj
  /*
  for (let ele in mIO) {
    if (mHO.hasOwnProperty(ele) && mHO[ele].count === mIO[ele]) {
      alert('ITS 4:30 IN THE FUCKING MORNING');
    }
  }
  */
  //console.log('index: ', mIO);
  //console.log('history: ', mHO);
}

setInterval(() => { checkTabs(); }, 1000);
//console.log(chrome.storage.local.get(['metaIndexObj'], function(result) {
  //return result.metaIndexObj;
//}));
