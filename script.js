"use strict";
let cnt=0;

const productList = [];

function resetForm()
{
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("price").value = '';
    
}

function getInput() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  return { id, name, price };
}

function deleteRow(row,id){
  if(confirm("Do you want to delete this record?")){
    cnt--;
    console.log(cnt);
  let i= row.parentElement.parentElement;
  document.getElementById("output__list").deleteRow(i.rowIndex);
  productList.splice (productList.indexOf(id), 1);
  if(cnt===0){
    const tblHead = document.getElementById("t__head");
    tblHead.innerHTML="";
  }
  resetForm();
 
  }
}


function createElement(text) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${text.id}</td>
                  <td>${text.name}</td>
                  <td>${text.price}</td>
                  <td>
                  <button class="delete__btn" onclick="deleteRow(this,${text.id})">Delete</button>
                 </td>`;
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

function addText(msg) {
  msg.innerHTML = `<p>Thanks for adding the product!</p>`;
  setTimeout(function () {
    msg.innerHTML = "";
  }, 1000);
}

function addData() {
  const product = getInput();
  cnt++;
  if(cnt>0){
  if (validaition(product)) {
    productList.push(product.id);
    const tblHead = document.getElementById("t__head");
    addHeading(tblHead);
    const row = createElement(product);
    const table = document.getElementById("output__list").getElementsByTagName('tbody')[0];
    table.appendChild(row);
    let msg = document.getElementById("text");
    addText(msg);
    resetForm();
    
  }
  }
}

