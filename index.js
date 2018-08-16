let anchor = document.querySelector('a')

function openMenu() {
    // document.getElementById("navBar").style.width = "100%";
    // document.querySelector("div").style.opacity= '.2';
    // document.querySelector(".sideMenu").style.opacity= '.8';

    while( anchor.style.height !== 0){
        anchor.style.height--;
    }
}

anchor.addEventListener('click', openMenu);