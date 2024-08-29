let cart = [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        cartItems.innerHTML += `
            <div>
                ${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}
                <button onclick="increaseQuantity('${item.name}')">+</button>
                <button onclick="decreaseQuantity('${item.name}')">-</button>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: $${cartTotal}`;
}

function increaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    product.quantity++;
    updateCart();
}

function decreaseQuantity(productName) {
    const product = cart.find(item => item.name === productName);
    
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        removeFromCart(productName);
    }
    
    updateCart();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function checkout() {
    const cashReceived = Number(document.getElementById('cash-received').value);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    
    if (cashReceived >= cartTotal) {
        const change = cashReceived - cartTotal;
        document.getElementById('receipt').innerText = `Payment Successful! Change: $${change}`;
    } else {
        document.getElementById('receipt').innerText = 'Insufficient cash. Please provide more.';
    }
}
