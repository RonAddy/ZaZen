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
  chrome.storage.local.set({
    'metaHistoryObj': historyObj
  }, function () {
    return historyObj;
  });
}

function getChanges() {
  chrome.storage.local.get(['metaHistoryObj'], function (result) {
    return result.metaHistoryObj;
  });
}

function checkTabs() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, queryTabs);
}

function queryTabs(tabs) {
//   let focused = false
// chrome.windows.getCurrent((window) => {
//     focused = window.focused;
//   })


  if (!tabs[0]) return;
  let parsedURL = tabs[0].url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/)[1];
 
  if (!historyObj[parsedURL]) {
    historyObj[parsedURL] = {
      'title': tabs[0].title,
      'url': tabs[0].url,
      'count': 1
    };
  } else{

    historyObj[parsedURL].count++;
  }
  saveChanges();
  //let mHO = getChanges();

  // indexObj
  chrome.storage.local.get(['metaIndexObj'], function (res) {
    //console.log('IndexObj: ', result.metaIndexObj);
    // historyObj
    chrome.storage.local.get(['metaHistoryObj'], function (result) {
      //console.log('historyObj', result.metaHistoryObj);
      // console.log('please be true', focused);
      // iterate through index and history
      for (let ele in result.metaHistoryObj) {
        console.log('index: ', res.metaIndexObj);
        if (res.metaIndexObj.hasOwnProperty(ele)) {
          console.log('index has element in history');
          console.log('Count now', result.metaHistoryObj[ele].count);
          if (result.metaHistoryObj[ele].count >= res.metaIndexObj[ele]) {
            // when the count of the history matches the index
            console.log('Final!!!!', result.metaHistoryObj[ele].count);
            alert('you have excessed the page limit.');
          }
        }
      }
    });
  });

}

setInterval(() => {
  checkTabs();
}, 1000);