//let anchor = document.querySelector('a')

//function openMenu() {
    // document.getElementById("navBar").style.width = "100%";
    // document.querySelector("div").style.opacity= '.2';
    // document.querySelector(".sideMenu").style.opacity= '.8';

    //while( anchor.style.height !== 0){
    //    anchor.style.height--;
    //}
//}

//anchor.addEventListener('click', openMenu);


let clarityTarget1 = document.querySelector('input');
//let clarityTarget1Count = document.querySelector('#clarityTarget1Count')
//let clarityTarget1Count = document.getElementById('clarityTarget1Count').value;

console.log(document);

let indexObj = { 'facebook.com' : 3, 'reddit.com' : 2 };

function setChange() {
  chrome.storage.local.set({'metaIndexObj' : indexObj}, function() {
    //return indexObj;
    console.log('im from index js');
    console.log(indexObj);
  });
}

setChange();
