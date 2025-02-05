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

     const dots = document.createElement("div");
     dots.classList.add("dots");

     for (let i = 0; i < products.length; i++) {
          const card = document.createElement("div");
          const dot = document.createElement("div");

          if (i == 0) {
               card.classList.add("active");
               dot.classList.add("active");
          }

          card.classList.add("card");
          dot.classList.add("dot");

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

          card.addEventListener("click", (e) => changeButton(e, card));

          dots.appendChild(dot);
          containerCard.appendChild(card);
          containerCard.appendChild(dots);
     }
}

function changeButton(e, card) {
     // Find the closest parent element with the "addToCart-btn" class
     const add_to_cart = e.target.classList.contains("add-to-cart");
     const addToCart_btn = card.querySelector(".addToCart-btn");

     if (add_to_cart) {
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
                <strong>0</strong>
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

          // Retrieve the parent ID
          const parentId = card_name;

          // Style changes
          addToCart_btn.style.backgroundColor = "hsl(14, 86%, 42%)";
          card_image.style.border = "2px solid hsl(14, 86%, 42%)";

          const svg_iconMinus = addToCart_btn.querySelector(".decrement");
          const svg_iconPlus = addToCart_btn.querySelector(".increment");
          const strongElement = addToCart_btn.querySelector("strong");

          svg_iconPlus.addEventListener("click", () => {
               checkingID(parentId, strongElement, "increment");
          });

          svg_iconMinus.addEventListener("click", () => {
               checkingID(parentId, strongElement, "decrement");
          });

          checkingID(parentId, strongElement, "increment");
     }
}

function checkingID(parentId, strongElement, action) {
     const findingIndex = cart.findIndex((cart) => cart.parentId === parentId);

     // if action increment mean the quanitity++
     if (action === "increment") {
          if (findingIndex !== -1) {
               cart[findingIndex].quantity++;
          } else {
               cart.push({
                    parentId,
                    quantity: 1,
               });
          }

          // if action decrement mean the quanitity-- and if 0 will remove
     } else if (action === "decrement") {
          if (findingIndex !== -1) {
               cart[findingIndex].quantity--;
               if (cart[findingIndex].quantity <= 0) {
                    cart.splice(findingIndex, 1);
               }
          }
     }

     const currentItem = cart.find(
          (cartItem) => cartItem.parentId === parentId
     );

     strongElement.textContent = currentItem ? currentItem.quantity : 0;

     getCartData();
}

function getCartData() {
     cart_container.innerHTML = "";

     const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
     const header = document.createElement("h2");
     header.textContent = `Your Cart (${totalQuantity})`;
     cart_container.appendChild(header);

     const containerInfo = document.createElement("div");
     containerInfo.classList.add("containerInfo");

     for (let i = 0; i < cart.length; i++) {
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
           class="removeIcon"
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

               const removeIcon = info.querySelector(".removeIcon");

               removeIcon.addEventListener("click", () => removeID(i));

               containerInfo.appendChild(info);
          }
     }

     function removeID(index) {
          cart.splice(index, 1);
          getCartData();
     }

     cart_container.appendChild(containerInfo);
     const footer = document.createElement("div");

     footer.classList.add("footer");

     footer.innerHTML = `
        <p>this is a <span>carbon-neutral</span> delivery</p>
        <div class="order-total">
            <h3>Order Total:</h3>
            <h4>${cart
                 .reduce((sum, item) => {
                      const findIndex = products.findIndex(
                           (product) => product.name === item.parentId
                      );
                      return (
                           sum +
                           (findIndex !== -1
                                ? products[findIndex].price * item.quantity
                                : 0)
                      );
                 }, 0)
                 .toFixed(2)}</h4>
        </div>
        <button>Confirm Order</button>
    `;

     cart_container.appendChild(footer);
}

setTimeout(() => {
     let currentIndex = 0;
     const dots = document.querySelectorAll(".dot");
     const cards = document.querySelectorAll(".card");

     function updateCarousel() {
          cards.forEach((card, i) => {
               card.classList.remove("active");
               dots[i].classList.remove("active");
          });

          cards[currentIndex].classList.add("active");
          dots[currentIndex].classList.add("active");
     }

     updateCarousel();

     function nextIndex() {
          for (let progress = 10; progress <= 100; progress += 10) {
               dots.forEach((dot) => {
                    dot.style.setProperty("--progress", `${progress}%`);
               });
          }

          currentIndex = (currentIndex + 1) % cards.length;
          updateCarousel();
     }

     dots.forEach((dot, i) => {
          dot.addEventListener("click", () => {
               currentIndex = i;
               updateCarousel();
          });
     });

     setInterval(() => nextIndex(), 8000);
}, 100);
