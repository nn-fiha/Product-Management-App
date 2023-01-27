"use strict";
let cnt = 0;
let upen=false;
let selectedRow = null;
const MAX_NAME_LENGTH = 60;
const MAX_PRICE_LIMIT = 1000;
const MIN_PRICE_LIMIT = 1;
const productList = [];


// class Product {
//   constructor(id, name, price) {
//   this.id = id;
//   this.name = name;
//   this.price = price;
//   }
//   isValidId() {
//   return Boolean(this.id);
//   }
//   isValidName() {
//   return Boolean(this.name) && this.name.length <= MAX_NAME_LENGTH;
//   }
//   isValidPrice() {
//   return (
//   Boolean(this.price) &&
//   this.price >= MIN_PRICE_LIMIT &&
//   this.price <= MAX_PRICE_LIMIT
//   );
//   }
// }

// function showErrorMessage(elementId,errorMsg){
//   const errorElement = document.getElementById(elementId);
//   errorElement.innerText = errorMsg;
//   errorElement.style.color='Red';
// }

function resetForm() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}

function resetErrorMsg(){
  document.getElementById("error-id").innerText  = "";
  document.getElementById("error-name").innerText  = "";
  document.getElementById("error-price").innerText  = "";

  
  document.getElementById("id").style.borderColor = 'none';
  document.getElementById("name").style.borderColor = 'none';
  document.getElementById("price").style.borderColor = 'none';
}

function getInput() {
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value;
  return {id, name, price};
}


function deleteRow(row, id) {
  if (confirm("Do you want to delete this record?")) {
    cnt--;
    console.log(cnt);
    let i = row.parentElement.parentElement;
    document.getElementById("output__list").deleteRow(i.rowIndex);
    productList.splice(productList.indexOf(id), 1);
    if (cnt === 0) {
      const tblHead = document.getElementById("t__head");
      tblHead.innerHTML = "";
    }
    resetForm();
    resetErrorMsg();
  }
  
}

function onEdit(row) {
  upen=true;
  selectedRow = row.parentElement.parentElement;
  let pid = document.getElementById("id");
  pid.value = selectedRow.cells[0].innerText;
  pid.disabled = true;
  document.getElementById("name").value = selectedRow.cells[1].innerText;
  document.getElementById("price").value = selectedRow.cells[2].innerText;
  document.getElementById("add-btn").innerText = "Update";
}
function updateProduct(Data) {
  upen=true;
  selectedRow.cells[0].innerText =Data.id;
  selectedRow.cells[1].innerText = Data.name;
  selectedRow.cells[2].innerText  = Data.price;
  document.getElementById("id").disabled = false;
   document.getElementById("add-btn").innerText = "Add";
  resetForm();
  resetErrorMsg();
  upen=false;
}

function createElement(text) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${text.id}</td>
                  <td>${text.name}</td>
                  <td>${text.price}</td>
                  <td><button class="update__btn" onclick="onEdit(this)">Update</button>
                  </td>
                  <td>
                  <button class="delete__btn" onclick="deleteRow(this,${text.id})">Delete</button>
                 </td>`;
  return row;
}

function addHeading(tblHead,listName) {
  listName.innerHTML=`<span>Product List</span>`;
  tblHead.innerHTML = `<th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>`;
}



// function isValidInput(product) {
//   let isValid = true;
//   if (!product.isValidId()) {
//   showErrorMessage({
//   elementId:'id',
//   errorMessage: 'Invalid ID',
//   });
//   isValid = false;
//   }
//   if (!product.isValidName()) {
//   showErrorMessage({
//   elementId: 'name',
//   errorMessage: 'Invalid Name',
//   });
//   isValid = false;
//   }
//   if (!product.isValidPrice()) {
//   showErrorMessage({
//   elementId: 'price',
//   errorMessage: 'Invalid Price',
//   });
//   isValid = false;
//   }

//   const productWithNewId = productList.find((p) => {
//     return p.id === product.id;
//     });
//     if (Boolean(productWithNewId)) {
//     showErrorMessage({
//     elementId: 'id',
//     errorMessage: 'Duplicate ID',
//     });
//     isValid = false;
//     }
//     return isValid;
    
// }

function doesExist(product) {
  return productList.includes(product);
}

function isValidInput(product) {
  if(upen===false)
{
  if (doesExist(product.id)) {
    document.getElementById("id").style.borderColor = 'red';
    document.getElementById("error-id").innerText  = "Product ID is already exist! Please try with another ID";
    return;
  }
}
  let pname = product.name;
  if (pname.length > MAX_NAME_LENGTH) {
    document.getElementById("name").style.borderColor = 'red';
    document.getElementById("error-name").innerText = "Product name should less then 60 cherecters.";
    return;
  }
  let pPrice = parseInt(product.price);
  if (pPrice < MIN_PRICE_LIMIT ) {
    document.getElementById("price").style.borderColor  = 'red';
    document.getElementById("error-price").innerText = "Price can not be negative or 0";
    return;
  }
  if ( pPrice > MAX_PRICE_LIMIT) {
    document.getElementById("price").style.borderColor  = 'red';
    document.getElementById("error-price").innerText = "Price can not be more than 100000!";
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
  let product = getInput();
  cnt++;
  if (cnt > 0) {
   
      if (isValidInput(product)) {
        if (upen==false) {
        productList.push(product.id);
        const tblHead = document.getElementById("t__head");
        const listName =document.getElementById("list__info");
        addHeading(tblHead,listName);
        const row = createElement(product);
        const table = document.getElementById("output__list").getElementsByTagName("tbody")[0];
        table.appendChild(row);
        let msg = document.getElementById("text");
        addText(msg);
        }else{
          updateProduct(product);
        }

    resetForm();
    resetErrorMsg();
    upen=false;
  }
}
}
