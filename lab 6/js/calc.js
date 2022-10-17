function getPriceObj() {
  return {
      products: [100, 200, 300],
      options: {
          option1: 50,
          option2: 100,
          option3: 150
      },
      props: {
          prop1: 100,
          prop2: 200
      }
  };
}

function updPrice() {
  let select = document.getElementsByName("product")[0];
  let amount = document.getElementsByName("calcAmount");
  let current_price = 0;
  let prices = getPriceObj();
  let price_i = parseInt(select.value) - 1;
  if (price_i >= 0) {
      current_price = prices.products[price_i];
  }

  let radio = document.getElementById("radios");
  radio.style.display = (
      select.value === "3"
      ? "block"
      : "none"
  );

  let radios = document.getElementsByName("options");
  radios.forEach(function (radio) {
      if (radio.checked) {
          let optionPrice = prices.options[radio.value];
          if (optionPrice !== undefined) {
              current_price += optionPrice;
          }
      }
  });

  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = (
      select.value === "3"
      ? "none"
      : "block"
  );

  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
          let propPrice = prices.props[checkbox.name];
          if (propPrice !== undefined) {
              current_price += propPrice;
          }
      }
  });

  document.getElementsByName("calcAmount")[0].value = document.getElementsByName("calcAmount")[0].value.replace(/[^0-9]/g, "");
  if ((/^[0-9]+$/).test(amount[0].value) && (/^[0-9]+$/).test(amount[0].value)) {
      current_price *= amount[0].value;
  }
  let pprice = document.getElementById("pprice");
  pprice.innerHTML = current_price + " RUB";
}


  let radio = document.getElementById("radios");
  radio.style.display = "none";

  let cAmount = document.getElementsByName("calcAmount")[0];
  cAmount.addEventListener("input", function () {
      updPrice();
  });

  let prod = document.getElementsByName("product")[0];
  prod.addEventListener("change", function () {
      let checkboxes = document.querySelectorAll("#checkboxes input");
      checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
      });
      let radios = document.getElementsByName("options");
      radios.forEach(function (radio) {
          if (radio.checked) {
              radio.checked = false;
          }
      });
      document.getElementsByName("calcAmount")[0].value = 1;
      updPrice();
  });

  document.getElementsByName("options").forEach(function (radio) {
      radio.addEventListener("change", function () {
          updPrice();
      });
  });

  document.querySelectorAll("#checkboxes input").forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
          updPrice();
      });
  });
  updPrice();
});
