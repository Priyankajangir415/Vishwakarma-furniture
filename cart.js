// Cart functionality
let cart = [];
const cartItemsElement = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productId = productElement.getAttribute('data-id');
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    cartItemsElement.innerHTML = ''; // Clear cart display
    let total = 0;

    cart.forEach(product => {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
            ${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}
            <button onclick="removeFromCart('${product.id}')">Remove</button>
        `;
        cartItemsElement.appendChild(itemElement);
        total += product.price * product.quantity;
    });

    cartTotalElement.innerText = total.toFixed(2); // Update total price
    prepareOrderDetails();
}

function prepareOrderDetails() {
    // Prepare the order details to be sent when the user places the order
    const orderDetails = cart.map(product => {
        return `${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}`;
    }).join(', ');

    // Set the order details in the hidden input field
    orderDetailsElement.value = orderDetails;
}

function placeOrder(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get customer information from the form
    const name = document.querySelector('#name').value;
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;
    const orderDetails = orderDetailsElement.value;
    const totalAmount = cartTotalElement.innerText;

    // Send order details to the server or handle as needed (e.g., store in localStorage, send email)
    alert(`Order Placed Successfully!\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\nOrder: ${orderDetails}\nTotal: $${totalAmount}\nPayment Method: Cash on Delivery`);

    // Clear the cart after placing the order
    cart = [];
    updateCart();

}

