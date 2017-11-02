function Reverse_Create_Button() {
    this.style.backgroundColor = "#fde700";
    this.style.color = "white";
}
function Reset_Create_Button() {
    this.style.backgroundColor = "#15f7c9";
    this.style.color = "#0d0326";
}
function Reverse_Join_Button() {
    this.style.backgroundColor = "#15f7c9";
    this.style.color = "white";
}
function Reset_Join_Button() {
    this.style.backgroundColor = "#fde700";
    this.style.color = "#0d0326";
}

document.getElementsByClassName("project-button-create")[0].addEventListener("mouseenter", Reverse_Create_Button);
document.getElementsByClassName("project-button-create")[0].addEventListener("mouseleave", Reset_Create_Button);
document.getElementsByClassName("project-button-join")[0].addEventListener("mouseenter", Reverse_Join_Button);
document.getElementsByClassName("project-button-join")[0].addEventListener("mouseleave", Reset_Join_Button);