const setCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    return cart;
  } else {
    return [];
  }
};

const setUser = () => {
  const user = JSON.parse(localStorage.getItem("login"));
  if (user != 1) {
    return user;
  } else {
    return -1;
  }
};

const user = setUser();
cart = setCart();

const isProductInCart = (userId, productId) => {
  const found = cart.find((item) => {
    return item.userId == userId && item.itemId == productId;
  });
  if (found) {
    return true;
  } else {
    return false;
  }
};

const fetchProducts = async () => {
  const res = await axios("http://localhost:1020/products");
  const products = res.data;

  const productsHTML = products.map((item) => {
    console.log(item.image);
    return `<div id="${item.id}">
          <div class="imgWrapper"><img src="${item.image}" alt="pic" /></div>
          <div class="data">
            <h4>${item.title}</h4>
            <p>${item.desc}</p>
            <span class="price">${item.price}</span>
            <button class="add">add to cart</button>
          </div>
        </div>`;
  });
  document.querySelector("div.items").innerHTML = productsHTML;
  addEvent();
  const addButtons = document.querySelectorAll(".add");
  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (user != -1) {
        if (!isProductInCart(user, e.target.parentElement.parentElement.id)) {
          cart.push({
            userId: user,
            itemId: e.target.parentElement.parentElement.id,
          });
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
      console.log(cart);
    });
  });
};

fetchProducts();

const fetchInfo = async () => {
  const res = await axios("http://localhost:1020/information");
  const products = res.data;
  console.log(products);
  const infoHTML = products.map((item) => {
    return `<div>
          <span class="num">${item.number}</span><span class="text">${item.text}</span>
        </div>`;
  });
  document.querySelector("div.wrapper").innerHTML = infoHTML;
  addEvent();
};

fetchInfo();

const addEvent = () => {
  const cards = document.querySelectorAll("div.items > div");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const position = card.getBoundingClientRect();
      const mouseX = e.clientX - position.left;
      const mouseY = e.clientY - position.top;

      const percentX = mouseX / position.width;
      const percentY = mouseY / position.height;

      const maxRotate = 15;

      const rotateY = (percentX * 2 - 1) * maxRotate;

      const rotateX = (1 - percentY * 2) * maxRotate;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
};
