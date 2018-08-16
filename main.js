// alert(chrome.tabs.getAllInWindow());

function logTabs(tabs) {
  console.log(tabs);
}

chrome.tabs.query({currentWindow: true}, logTabs);
