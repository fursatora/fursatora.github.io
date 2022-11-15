/*global
    $
    alert
*/

function updateState() {
    let modalButton = document.getElementById("modalButton");
    let storedState = window.localStorage.getItem("modalCheckbox");
    if (storedState === "true") {
        modalButton.disabled = false;
    } else {
        modalButton.disabled = true;
    }
}

function send() {
    let ajaxData = {
        name: document.getElementById("modalInputName").value,
        message: document.getElementById("modalInputMessage").value,
        slap_replyto: document.getElementById("modalInputEmail").value
    };

    $.ajax({
        url: "https://api.slapform.com/wow1shift@gmail.com",
        dataType: "json",
        method: "POST",
        data: ajaxData,
        success: function (response) {
            if (response.meta.status === "success") {
                alert("Successful!");
            }
            if (response.meta.status === "fail") {
                alert("Unsuccessful!");
            }
        }
    });

    let modalInputName = document.getElementById("modalInputName");
    let modalInputMessage = document.getElementById("modalInputMessage");
    let modalInputEmail = document.getElementById("modalInputEmail");
    let modalCheckbox = document.getElementById("modalCheckbox");

    modalInputName.value = "";
    modalInputMessage.value = "";
    modalInputEmail.value = "";
    modalCheckbox.checked = false;

    window.localStorage.setItem(modalInputName.id, modalInputName.value);
    window.localStorage.setItem(modalInputMessage.id, modalInputMessage.value);
    window.localStorage.setItem(modalInputEmail.id, modalInputEmail.value);
    window.localStorage.setItem(modalCheckbox.id, modalCheckbox.checked);

    updateState();

    return false;
}

window.addEventListener("DOMContentLoaded", function () {

    let modalInputName = document.getElementById("modalInputName");
    let modalInputEmail = document.getElementById("modalInputEmail");
    let modalInputMessage = document.getElementById("modalInputMessage");
    let modalCheckbox = document.getElementById("modalCheckbox");

    modalInputName.value = window.localStorage.getItem(modalInputName.id);
    modalInputEmail.value = window.localStorage.getItem(modalInputEmail.id);
    modalInputMessage.value = window.localStorage.getItem(modalInputMessage.id);

    modalInputName.addEventListener("input", function (event) {
        window.localStorage.setItem(event.target.id, event.target.value);
    });
    modalInputEmail.addEventListener("input", function (event) {
        window.localStorage.setItem(event.target.id, event.target.value);
    });
    modalInputMessage.addEventListener("input", function (event) {
        window.localStorage.setItem(event.target.id, event.target.value);
    });
    modalCheckbox.addEventListener("change", function (event) {
        window.localStorage.setItem(event.target.id, event.target.checked);
        updateState();
    });

    if (window.localStorage.getItem(modalCheckbox.id) === "true") {
        modalCheckbox.checked = true;
    } else {
        modalCheckbox.checked = false;
    }

    $("#ajax_form").submit(function () {
        send();
        return false;
    });

    $("#testModal").on("shown.bs.modal", function onShownModal() {
        history.pushState({isShown: true}, "Form shown", "#form");
    });
    $("#testModal").on("hidden.bs.modal", function onHiddenModal() {
        history.pushState({isShown: false}, "Form hidden", "/");
    });

    if (window.location.hash === "form") {
        history.pushState({isShown: true}, "Form shown", "#form");
    } else {
        history.pushState({isShown: false}, "Form hidden", "/");
    }

    window.onpopstate = function (event) {
        if (event.state.isShown) {
            $("#testModal").modal("show");
        } else {
            $("#testModal").modal("hide");
        }
    };

    updateState();
});
