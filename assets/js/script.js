"use strict";

// sessionStorage.setItem("name", "Aqsin");
// sessionStorage.setItem("surname", "Veliyev");

// console.log(sessionStorage.getItem("name"));
// console.log(sessionStorage.getItem("surname"));

// sessionStorage.clear();

// sessionStorage.removeItem("name");

// localStorage.setItem("name", "Semed");

// const inputKey = document.querySelector(".input-key");
// const inputValue = document.querySelector(".input-value");

// const addBtn = document.querySelector("button");

// addBtn.addEventListener("click", function () {
//   let key = inputKey.value;
//   let value = inputValue.value;

//   localStorage.setItem(key, value);

//   inputKey.value = "";
//   inputValue.value = "";
// });

// localStorage.setItem("datas", datas);

// let jsonData = {
//   name: "Semed",
//   surname: "Huseynov",
//   phones: [654654, 4566556],
//   group: [
//     {
//       name: "P418",
//       capacity: 40,
//       teachers: ["Cavid", "Hemid"],
//     },
//   ],
// };

// console.log(jsonData.group[0].capacity);

// for (const item of jsonData.group[0].teachers) {
//   console.log(item);
// }

// let datas = ["Oruc", "Semed", "Ilham", "Aqsin"];

// let datas = [
//   {
//     name: "Semed",
//     surname: "Huseynov",
//   },

//   {
//     name: "Tunzale",
//     surname: "Memmedova",
//   },
// ];

// localStorage.setItem("datas", JSON.stringify(datas));

// console.log(JSON.parse(localStorage.getItem("datas")));

let basket = [];
let basketCountSpan = document.querySelector(".basket-count");
let topPrice = document.querySelector(".top-price");

if (JSON.parse(localStorage.getItem("basket")) == null) {
  localStorage.setItem("basket", JSON.stringify(basket));
} else {
  basket = JSON.parse(localStorage.getItem("basket"));
}

getBasketCount(basket);

function getBasketCount(arr) {
  let basketCount = 0;

  if (arr.length != 0)
    for (const item of basket) {
      basketCount += item.count;
    }

  document.querySelector(".basket-count").innerText = basketCount;
}

getBasketPrice(basket);

function getBasketPrice(arr) {
  let basketPrice = 0;

  if (arr.length != 0)
    for (const item of basket) {
      basketPrice += item.count * item.price;
    }

  document.querySelector(".top-price").innerText = basketPrice;
}

const addBtn = document.querySelectorAll(".add-btn");

addBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    let productId = parseInt(
      this.parentNode.parentNode.getAttribute("data-id")
    );
    let productName = this.parentNode.firstElementChild.innerText;
    let productDesc = this.parentNode.lastElementChild.innerText;
    let productPrice = this.parentNode.nextElementSibling.innerText;
    let productImg = this.parentNode.previousElementSibling.getAttribute("src");

    let existProduct = basket.find((m) => m.id == productId);

    if (existProduct != undefined) {
      existProduct.count++;
    } else {
      basket.push({
        id: productId,
        name: productName,
        price: productPrice,
        description: productDesc,
        image: productImg,
        count: 1,
      });
    }

    getBasketCount(basket);
    getBasketPrice(basket);

    localStorage.setItem("basket", JSON.stringify(basket));
  });
});
