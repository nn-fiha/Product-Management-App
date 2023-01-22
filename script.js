"use strict";

function getInput() {
  const id = document.getElementById("input1").value;
  const name = document.getElementById("input2").value;
  const price = document.getElementById("input3").value;

  return { id, name, price };
}

function createElement(text) {
  const row = document.createElement("tr");
  const data = `<td>${text.id}</td><td>${text.name}</td><td>${text.price}</td>`;
  row.innerHTML = data;
  return row;
}
function createHeading() {
    let row1 = document.createElement("tr");
    let html = `<td>ID</td><td>Name</td><td>Price</td>`;
    row1.innerHTML = html;
    return row1;
  }

function addData() {
  const inputData = getInput();
  if (inputData.id === "" ){
    alert(`Please fill up the "ID" field!!!`);
    return;
  }
  else if (inputData.name === "" ){
    alert(`Please fill up the "Name" field !!!`);
    return;
  }
  else if (inputData.price === "" ){
    alert(`Please fill up the "price" field!!!`);
    return;
  }
 
  const row = createElement(inputData);
  const targetElement = document.getElementById("output__list");
  targetElement.appendChild(row);
}
addData();
