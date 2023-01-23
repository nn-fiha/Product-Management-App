"use strict";

const productList = [];

function getInput() {
  const id = document.getElementById("input1").value;
  const name = document.getElementById("input2").value;
  const price = document.getElementById("input3").value;
  return { id, name, price };
}

function createElement(text) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${text.id}</td><td>${text.name}</td><td>${text.price}</td>`;
  return row;
}

function addHeading(tblHead) {
  tblHead.innerHTML = `<th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Options</th>`;
}

function doesExist(product) {
  return productList.includes(product);
}
function validaition(product) {
  if (product.id === "" || product.name === "" || product.price === "") {
    alert("Please fill up all fields!!!");
    return;
  }

  if (doesExist(product.id)) {
    alert("Product ID is already exist!!!!\nPlease try with another ID");
    return;
  }
  let pname = product.name;
  product.name = pname.trim();

  if (pname.length > 60) {
    alert("Please try to fill product name between 60 characters!");
    return;
  }
  let p_price = parseInt(product.price);
  if (p_price <= 0 || p_price > 100000) {
    alert("price should be between 1 to 100000 !!!");
    return;
  }
  return true;
}
function addText(msg){ 
  msg.innerHTML = `<p>Thanks for adding the product!</p>`;
  setTimeout(function () {
    msg.style.display = 'none';
  },1000);
 

}


function addData() {
  const product = getInput();
  if (validaition(product)) {

    productList.push(product.id);
    const msg = document.getElementById("text");
    addText(msg);
    msg.style.display = 'visibli';
    const tblHead = document.getElementById("t__head");
    addHeading(tblHead);
    const row = createElement(product);
    const targetElement = document.getElementById("output__list");
    targetElement.appendChild(row);
  }
}
addData();
