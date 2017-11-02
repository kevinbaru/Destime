function Set_Morsel_Type_List() {
    var industrySelection = this.value;
    var morselsList = document.getElementById("morsels");
    
    if (industrySelection == "Tech - Software") {
        morselsList.innerHTML = "<option value=\"SAAS\"></option> <option value=\"PAAS\"></option> <option value=\"IAAS\"></option> <option value=\"E-Commerce\"></option>"
    }
    else {
        morselsList.innerHTML = "";
    }
}

function Add_Objective() {
    document.getElementById("tag-holder").innerHTML += "<span class=\"objective-tag\"> " + document.getElementById("objectives").value + " </span> ";
    document.getElementById("objectives").value = "";
}

document.getElementById("industry").addEventListener("input", Set_Morsel_Type_List);

document.getElementById("add-objective").addEventListener("click", Add_Objective);