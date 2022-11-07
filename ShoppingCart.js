//Empty dictionary to be filled with product information and read by addToCart
var dict = {};

//Helper function. Adds product info to dictionary to be retrieved later.
//Product name is set to the key of the dictionary, while 
function addProduct(productName, productPrice)
{
if (Object.keys(dict).includes(`${productName}`) === true)
{
    dict[productName][1]++;
} 
else
{
    dict[productName] = [productPrice, 1];
}
}

//Helper function. Gets specified key by the name of value present in dict object.
function getKeyByValue(object, value) 
{
    return Object.keys(object).find(key => object[key] === value);
}

//Main function to call addProduct, then read the dictionary to edit parts of the DOM accordingly.
//Adds items purchased to appropriate columns in cart based on conditionals.
function addToCart(productName, productPrice) 
{
    addProduct(productName, productPrice)
    
    var table = document.getElementById('tableData2');

    var row1item1 = table.children[0].children[0];
    var row1item2 = table.children[0].children[1];
    var row1item3 = table.children[0].children[2];

    var row2item1 = table.children[1].children[0];
    var row2item2 = table.children[1].children[1];
    var row2item3 = table.children[1].children[2];
    
    var row3item1 = table.children[2].children[0];
    var row3item2 = table.children[2].children[1];
    var row3item3 = table.children[2].children[2];

    if (row1item1.childNodes.length === 0)
    {
        row1item1.innerHTML =   `<center>${getKeyByValue(dict, dict[productName])}</center>`;
        row1item2.innerHTML =   `<center>${dict[productName][0]}</center>`;
        row1item3.innerHTML =   `<center>${dict[productName][1]}</center>`;
    } 
    else if (row1item1.childNodes.length !== 0 && row1item1.textContent === productName)
    {
            row1item3.innerHTML =   `<center>${dict[productName][1]}</center>`;
    } 
    else if (row1item1.childNodes.length !== 0 && row2item1.childNodes.length === 0 && row1item1.textContent !== productName) 
    {
        row2item1.innerHTML =   `<center>${getKeyByValue(dict, dict[productName])}</center>`;
        row2item2.innerHTML =   `<center>${dict[productName][0]}</center>`;
        row2item3.innerHTML =   `<center>${dict[productName][1]}</center>`;
    } 
    else if (row2item1.childNodes.length !== 0 && row2item1.textContent === productName) 
    {
        row2item3.innerHTML =   `<center>${dict[productName][1]}</center>`;
    }
    else if (row2item1.childNodes.length !== 0 && row3item1.childNodes.length === 0 && row2item1.textContent !== productName) 
    {
        row3item1.innerHTML =   `<center>${getKeyByValue(dict, dict[productName])}</center>`;
        row3item2.innerHTML =   `<center>${dict[productName][0]}</center>`;
        row3item3.innerHTML =   `<center>${dict[productName][1]}</center>`;
    }
    else if (row3item1.childNodes.length !== 0 && row3item1.textContent === productName) 
    {
        row3item3.innerHTML =   `<center>${dict[productName][1]}</center>`;
    }

}

//Method to display the calculated total of purchased items in cart, as well as the subtotal
function purchaseCart() 
{
    var table = document.getElementById('tableData2');

    var row1item2 = table.children[0].children[1]; //price
    var row1item3 = table.children[0].children[2]; //amount

    var row2item2 = table.children[1].children[1]; //price
    var row2item3 = table.children[1].children[2]; //amount
    
    var row3item2 = table.children[2].children[1]; //price
    var row3item3 = table.children[2].children[2]; //amount

    var checkoutTable = document.getElementById('CHECKOUT');

    subTotal = ((row1item2.textContent * row1item3.textContent) + (row2item2.textContent * row2item3.textContent) + (row3item2.textContent * row3item3.textContent)).toFixed(2);

    total = (subTotal * 1.06).toFixed(2);

    tax = (total - subTotal).toFixed(2);

    checkoutTable.innerHTML = `<br><h5><center>Thank you for your purchase!</center></h5><table class="table table-dark table-striped"><thead><tr><th><center>Total: ${total}</center></th><th><center>Subtotal: ${subTotal}</center></th><th><center>Tax: ${tax}</center></th></tr></thead></table>`;
}

