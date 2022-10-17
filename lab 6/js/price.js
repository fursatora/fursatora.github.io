function Calculate() {
    let field_1 = document.getElementsByName("Price");
    let field_2 = document.getElementsByName("gAmount");
    let res = document.getElementById("result");
    if ((/^[0-9]+$/).test(field_1[0].value) && (/^[0-9]+$/).test(field_2[0].value)) {
        res.innerHTML = "Стоимость " + (field_1[0].value * field_2[0].value);
    } else {
        res.innerHTML = "Неверный ввод, пожалуйста введите ЦЫЫЫФРЫ.";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("button_1");
    button.addEventListener("click", Calculate);
});