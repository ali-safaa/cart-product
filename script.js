const containerCard = document.querySelector("[data-containerCard]");
const cart_container = document.querySelector("[data-cart-container]");
const container_cart_info = document.querySelector(
     "[data-container-cart-info]"
);

let products = [];
let cart = [];

fetch("./data.json")
     .then((res) => res.json())
     .then((data) => {
          products = data;
          getData();
     });

function getData() {
     containerCard.innerHTML = "";
     for (let i = 0; i < products.length; i++) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.setAttribute("data-id", `${[i]}`);
          card.addEventListener("click", (e) => changeButton(e, card));
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

function changeButton(e, card) {
     // Find the closest parent element with the "addToCart-btn" class
     const addToCart_btn = e.target.closest(".addToCart-btn");

     if (addToCart_btn) {
          // Replace the button's content with updated SVGs and styles
          addToCart_btn.innerHTML = `
             <svg
                class="decrement"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2">
                  <path
                     fill="currentColor"
                     d="M0 .375h10v1.25H0V.375Z"/>
            </svg>
                <strong>1</strong>
                <svg
                         class="increment"
                         xmlns="http://www.w3.org/2000/svg"
                         width="10"
                         height="10"
                         fill="none"
                         viewBox="0 0 10 10"
                    >
                         <path
                              fill="currentColor"
                              d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                         />
                    </svg>
            `;

          // get child elements from card
          const card_image = card.querySelector(".card-image");
          const card_name = card.querySelector("h4").textContent;

          // Style changes
          addToCart_btn.style.backgroundColor = "hsl(14, 86%, 42%)";
          card_image.style.border = "2px solid hsl(14, 86%, 42%)";

          // Retrieve the parent ID
          const parentId = card_name;
          addToCart_btn.style.cursor = "not-allowed";

          // Find the SVG elements inside the button
          // const svg_iconPlus = addToCart_btn.querySelector(".increment");
          // const svg_iconMinus = addToCart_btn.querySelector(".decrement");
          // const strongElement = addToCart_btn.querySelector("strong");

          checkingID(parentId);
     }
}

function checkingID(parentId) {
     const findingIndex = cart.findIndex((cart) => cart.parentId === parentId);

     if (findingIndex !== -1) {
          cart[findingIndex].quantity++;
     } else {
          cart.push({
               parentId,
               quantity: 1,
          });
     }

     getCartData();
}

function getCartData() {
     cart_container.innerHTML = "";
     const containerInfo = document.createElement("div");
     containerInfo.classList.add("containerInfo");

     for (let i = 0; i < cart.length; i++) {
          cart_container.innerHTML = `<h2>your cart(${i})</h2>`;

          const findIndex = products.findIndex(
               (product) => product.name === cart[i].parentId
          );

          if (findIndex !== -1) {
               const info = document.createElement("div");
               const formating = products[findIndex].price * cart[i].quantity;

               info.classList.add("info");
               info.innerHTML = `
               <div class="title-and-price">
                <h3>${products[findIndex].name}</h3>
                <div class="price-info-and-quantity">
                     <h4 class="count-number">${cart[i].quantity}x</h4>
                     <h4 class="price">@ $${products[findIndex].price.toFixed(
                          2
                     )}</h4>
                     <h4 class="double-price">$${formating.toFixed(2)}</h4>
                </div>
           </div>
           <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
           >
                <path
                     fill="#CAAFA7"
                     d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
           </svg>
               `;

               containerInfo.appendChild(info);
               cart_container.appendChild(containerInfo);
               cart_container.innerHTML += `
                <p>this is a <span>carbon-neutral</span> delivery</p>
                <div class="order-total">
                <h3>Order Total:</h3>
                <h4>${products[findIndex].price.toFixed(2)}</h4>
                </div>
               
               <button>Confirm Order</button>
               `;
          }
     }
}

// const cart_info = document.createElement("div");
// cart_info.classList.add("cart-info-and-quantity");
//  cart_container.innerHTML += `
//  <h2>Your Cart (0)</h2>
//  `;
// cart_info.innerHTML = `
//
// `;
// cart_container.innerHTML += `
// <h2>Your Cart (0)</h2>
// `;
// container_cart_info.appendChild(cart_info);

// cart_container.innerHTML += `
// <div class="order">
// <h4>order total</h4>
// <h2>$46.50</h2>
// </div>

// <button>confirm order</button>
// `;
