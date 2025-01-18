const containerCard = document.querySelector("[data-containerCard]");
const cart_container = document.querySelector("[data-cart-container]");

let products = [];
let cart = [];

fetch("./data.json")
     .then((res) => res.json())
     .then((data) => {
          products = data;
          getData();
     });

function getData() {
     if (products.length > 0) {
          for (let i = 0; i < products.length; i++) {
               const card = document.createElement("div");
               card.classList.add("card");
               card.setAttribute("data-id", `${[i]}`);

               card.innerHTML = `
             <img class="card-image" src="${products[i].image.desktop}" alt="photo">
             <div class="addToCart-btn">
             <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
             <button class="add-to-cart">add to cart</button>
             </div>
             <h5>${products[i].category}</h5>
             <h4>${products[i].name}</h4>
             <span>$${products[i].price}</span>
            `;
               containerCard.appendChild(card);
          }
     }
}

setTimeout(() => {
     const card = document.querySelectorAll(".card");
     card.forEach((card) => {
          card.addEventListener("click", (e) => changeButton(e, card));
     });
}, 100);

function changeButton(e, card) {
     // Find the closest parent element with the "addToCart-btn" class
     const addToCart_btn = e.target.closest(".addToCart-btn");

     if (addToCart_btn) {
          // Replace the button's content with updated SVGs and styles
          addToCart_btn.innerHTML = `
              <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none"
                viewBox="0 0 10 2"><path fill="currentColor" d="M0 .375h10v1.25H0V.375Z"/></svg>
              <strong>1</strong>
              <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none"
                viewBox="0 0 10 10"><path fill="currentColor"
                d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
            `;

          // Style changes
          addToCart_btn.style.backgroundColor = "hsl(14, 86%, 42%)";
          const card_image = card.querySelector(".card-image");
          card_image.style.border = "2px solid hsl(14, 86%, 42%)";

          // Retrieve the parent ID
          const parentId = addToCart_btn.parentElement.dataset.id;
          addToCart_btn.style.cursor = "not-allowed";

          // Find the SVG elements inside the button
          const svg_iconPlus = addToCart_btn.querySelector(".increment");
          const svg_iconMinus = addToCart_btn.querySelector(".decrement");
          const strongElement = addToCart_btn.querySelector("strong");

          // Example: Log or manipulate the SVG elements
          svg_iconPlus.addEventListener("click", () => {
               let count = 0;
               count++;
               console.log(count);
          });

          svg_iconMinus.addEventListener("click", () => {
               if (count > 0) {
                    count--;
                    strongElement.textContent = count;
                    // getCartData(parentId, count);
               }
          });

          // Call the external function
          getCartData(parentId);
     }
}

function getCartData(parentId) {
     const findTheIndex = cart.findIndex((cart) => cart.parentId === parentId);

     if (findTheIndex !== -1) {
          cart[findTheIndex].quantity++;
     } else {
          cart.push({
               parentId,
               quantity: 1,
          });
     }
}

// cart_container.innerHTML = `
// <h2>your cart(0)</h2>
// <div class="cart-info">
//    <div class="title-and-price">
//        <h3>${card_name.textContent}</h3>
//            <div class="price-info">
//                <h4 class="count-number">1x</h4>
//                <h4 class="price">@${card_price.textContent}</h4>
//                <h4 class="double-price">${card_price.textContent}</h4>
//           </div>
//    </div>
//    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
// </div>

// <div class="order">
// <h4>order total</h4>
// <h2>$46.50</h2>
// </div>
// <p>this is a <span>carbon-neutral</span> delivery</p>
// <button>confirm order</button>
// `;
