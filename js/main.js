var idInput = document.getElementById('productId');
var nameInput = document.getElementById('ProductName');
var priceInput = document.getElementById('ProductPrice');
var typeInput =document.getElementById('ProductType');
var descInput = document.getElementById('ProductDesc');
var tableBody = document.getElementById('tableBody');
var searchInput = document.getElementById('searchInput');
var updateButton = document.getElementById('updateButton');
var addButton = document.getElementById('addButton');

var nameAlert = document.getElementById('nameAlert');
var priceAlert = document.getElementById('priceAlert');
var typeAlert = document.getElementById('typeAlert');
var descrptionAlert = document.getElementById('descrptionAlert');

var alerts = {
    name: nameAlert,
    price: priceAlert,
    type: typeAlert,
    descrption: descrptionAlert
}
var productList = []
var inputs={
    name: nameInput,
    price: priceInput,
    type: typeInput,
    descrption: descInput
}
var validations={
    name: /^[A-Z][a-z]{3,8}$/,
    price: /^([1-9][\d]{3}|10000)$/,
    type: /^(Mobile|Watch|Screen)$/,
    descrption: /^[\w ]{3,500}$/
}

if (localStorage.getItem('Products')){
    productList = JSON.parse(localStorage.getItem('Products'));
    display(productList);
}

function updateProdcutList(product){
    if(product) {
        productList.push(product);
    }
    localStorage.setItem('Products', JSON.stringify(productList));
}

function clearForm(){
    nameInput.value = '';
    priceInput.value = '';
    typeInput.value = '';
    descInput.value = '';
    for (var key in inputs){
        inputs[key].classList.remove('is-valid');
    }
}

function addProduct(){
    var validationState = true
    for (var key in inputs){
        if(!validate(key)){
            validationState = false;
        }
    }
    if(validationState){

        var productName = nameInput.value;
        var productPrice = priceInput.value;
        var prouductType = typeInput.value;
        var productDesc = descInput.value;
        var product ={
            name: productName, 
            price: productPrice,
            type: prouductType, 
            descrption: productDesc
        }
        updateProdcutList(product);
        console.log(productList);
        console.log(localStorage.getItem('Products'));
        display(productList);
        clearForm(); 
    }
}
function display(displayArr){
    var cartona="";
    for(var i = 0; i < displayArr.length; i++){
        cartona += `
         <tr>
            <td>${i}</td>
            <td>${displayArr[i].name}</td>
            <td>${displayArr[i].price}</td>
            <td>${displayArr[i].type}</td>
            <td>${displayArr[i].descrption}</td>
            <td>
                <button class="btn btn-outline-danger rounded-circle" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
                <button class="btn btn-outline-success rounded-circle" onclick="getUpdateProduct(${i})"><i class="fa-solid fa-pen"></i></button>
            </td>
            </tr>
        `
    }
    tableBody.innerHTML = cartona;
}

function deleteProduct(id){
    productList.splice(id, 1);
    display(productList);
    updateProdcutList();
}

function search(){
    var searchArr = [];
    var searchValue = searchInput.value.toLowerCase().trim();
    console.log(searchValue)
    for(var i = 0 ; i < productList.length ; i++){

        if (productList[i].name.toLowerCase().includes(searchValue)){
            searchArr.push(productList[i])
        }
    }
    display(searchArr);    
}
function getUpdateProduct(id){
    addButton.classList.replace('d-block', 'd-none');
    updateButton.classList.replace('d-none', 'd-block');

    idInput.value = id;
    nameInput.value = productList[id].name
    priceInput.value = productList[id].price
    typeInput.value = productList[id].type
    descInput.value = productList[id].descrption    
}
function postUpdateProduct(){
    var validationState = true;
    for (var key in inputs){
        if(!validate(key)){
            validationState = false;
        }
    }
    if(validationState){

        id = idInput.value
        var updatedProduct = {
            name: nameInput.value,
            price: priceInput.value,
            type: typeInput.value,
            descrption: descInput.value,
        }
        productList.splice(id, 1, updatedProduct)
        updateProdcutList();
        updateButton.classList.replace('d-block', 'd-none');
        addButton.classList.replace('d-none', 'd-block');
        display(productList);
        clearForm();
    }
}
function validate(validationType){
    var validatedInput = inputs[validationType];
    var alertMsg = alerts[validationType];
   
    
    var result = validations[validationType].test(validatedInput.value);
    if (result == false){
        validatedInput.classList.add('is-invalid');
        validatedInput.classList.remove('is-valid');
        alertMsg.classList.replace('d-none', 'd-block');
    }
    if (result == true){
        validatedInput.classList.remove('is-invalid');
        validatedInput.classList.add('is-valid');
        alertMsg.classList.replace( 'd-block', 'd-none');
    }
    return result;
}

// Validations 
// name: first letter uppercase then 3-8
// price: from 1000 to 10,000
// type: mobile, watch or screen first letter upper
// descrption: form 3, 500 letter