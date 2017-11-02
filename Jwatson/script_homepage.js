function Reverse_Button_Color() {
    this.style.backgroundImage = "linear-gradient(to right, #fde700 20%, #15f7c9 80%)";
    this.style.color = "white";
}
function Reset_Button_Color() {
    this.style.backgroundImage = "linear-gradient(to right, #15f7c9 20%, #fde700 80%)";
    this.style.color = "#0d0326";
}

var i;
for (i = 0; i < document.getElementsByClassName("choices-button").length; i++) {
    document.getElementsByClassName("choices-button")[i].addEventListener("mouseenter", Reverse_Button_Color);
    document.getElementsByClassName("choices-button")[i].addEventListener("mouseleave", Reset_Button_Color);
}