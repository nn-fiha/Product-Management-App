"use strict";
let cnt=0;

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

function addData() {
  const inputData = getInput();
  if (inputData.id === "" || inputData.name === "" || inputData.price === "" ){
    alert("Please fill up all fields!!!");
    return;
  }
  const tblHead = document.getElementById("t__head");
  addHeading(tblHead);
  const row = createElement(inputData);
  const targetElement = document.getElementById("output__list");
  targetElement.appendChild(row);

}
addData();
