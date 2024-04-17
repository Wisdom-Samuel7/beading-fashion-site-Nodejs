
const menu = document.querySelector(".menu")

var close = document.querySelector(".close")

var menuBar = document.querySelector(".menu-bar")

menu.onclick = MenuDisplay
close.onclick = Close

function Close(){
    var top = document.querySelector(".top")
    var mid = document.querySelector(".mid")
    var btm = document.querySelector(".btm")

    menuBar.style.left = "-50vw"

    top.classList.remove("new-top")
    mid.classList.remove("new-mid")
    btm.classList.remove("new-btm")
}

function MenuDisplay() {
 window.scrollTo(0,0)
    var top = document.querySelector(".top")
    var mid = document.querySelector(".mid")
    var btm = document.querySelector(".btm")


    var btm = document.querySelector(".btm")

    top.classList.toggle("new-top")
    mid.classList.toggle("new-mid")
    btm.classList.toggle("new-btm")

    if(top.classList.contains("new-top")){
        menuBar.style.left = "0vw"
    }else{
        menuBar.style.left = "-50vw"
    }
}


