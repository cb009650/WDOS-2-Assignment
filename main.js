/*Donation form Popup message*/
let message = document.getElementById("message");

function openmessage(){
    message.classList.add("open-message");
}
function closemessage(){
    message.classList.remove("open-message");
}

/*Activities Page*/

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", store)
} else {
    store()
}

function store() {

    var addCartButton = document.getElementsByClassName("addButton")
    for (var i = 0; i < addCartButton.length; i++) {
        var button = addCartButton[i]
        button.addEventListener("click", addCart)
    }

    var quantityadded = document.getElementsByClassName("cartQInput")
    for (var i = 0; i < quantityadded.length; i++) {
        var input = quantityadded[i]
        input.addEventListener("change", changeinquantity)
    }

    var removeFromCartbtn = document.getElementsByClassName("delete")
    for (var i = 0; i < removeFromCartbtn.length; i++) {
        var button = removeFromCartbtn[i]
        button.addEventListener("click", removeFromCart)
    }

    document.getElementsByClassName("purchaseButton")[0].addEventListener("click", purchasebtn)
}

function purchasebtn() {
    alert("Your reservation has been placed, thank you very much! We hope you enjoy your visit.")
    var itemsAdded = document.getElementsByClassName("itemsInCart")[0]
    while (itemsAdded.hasChildNodes()) {
        itemsAdded.removeChild(itemsAdded.firstChild)
    }
    updateCart()
}
function changeinquantity(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCart()
}

function removeFromCart(event) {
    var btnClick = event.target
    btnClick.parentElement.parentElement.remove()
    updateCart()
}

function addCart(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("buyTicket-title")[0].innerText
    var price = shopItem.getElementsByClassName("buyTicket-price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("buyTicket-image")[0].src
    addTickets(title, price, imageSrc)
    updateCart()
}

function addTickets(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add("cartRows")
    var itemsAdded = document.getElementsByClassName("itemsInCart")[0]
    var cartItemNames = itemsAdded.getElementsByClassName("cart-title")
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("Sorry it seems this item is already in the cart! Please increase the quantity from below.")
            return
        }
    }
    var cartLayout = `
        <div class="cart cartCol">
            <img class="cart-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-title">${title}</span>
        </div>
        <span class="cart-cost cartCol">${price}</span>
        <div class="cartQtity cartCol">
            <input class="cartQInput" type="number" value="1">
            <button class="btn delete" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartLayout
    itemsAdded.append(cartRow)
    cartRow.getElementsByClassName("cartQInput")[0].addEventListener("change", changeinquantity)
    cartRow.getElementsByClassName("delete")[0].addEventListener("click", removeFromCart)  
}

function updateCart() {
    var cartItemContainer = document.getElementsByClassName("itemsInCart")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cartRows")
    var total = 0
    
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-cost")[0]
        var cartQuantity = cartRow.getElementsByClassName("cartQInput")[0]
        var price = parseFloat(priceElement.innerText.replace("LKR ", " "))
        var quantity = cartQuantity.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("final-cart-price")[0].innerText = "LKR " + total

    
}


// idk??
