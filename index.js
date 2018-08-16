let button = document.querySelector('#submit_1');

let indexObj = { 'facebook.com' : 3, 'reddit.com' :1 };

button.addEventListener('click', () => {
    let val_1 = document.querySelector('#clarityVal_1')

    console.log(val_1);

    let val_input = parseInt(val_1.value);

    console.log(val_input);

    indexObj['reddit.com'] = val_input;

    setChange();

    chrome.storage.local.get(['metaIndexObj'], function(result) {
        console.log(result.metaIndexObj);
        return result.metaIndexObj;
      });
})


function setChange() {
  chrome.storage.local.set({'metaIndexObj' : indexObj}, function() {
    //return indexObj;
    console.log('im from index js');
    console.log(indexObj);
  });
}


setChange();
