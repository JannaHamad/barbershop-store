const productsDiv = document.getElementById("products");
const cartItemsDiv = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPriceEl = document.getElementById("totalPrice");
const cartModal = document.getElementById("cartModal");

let cart = [];
let products = [];

/* ===== المنتجات ===== */
products.push(
  { id: 1, name: "كريم شعر", price: 10, img: "image (1).jpeg" },
  { id: 2, name: "مشط حلاقة", price: 15, img: "image (2).jpeg" },
  { id: 3, name: "جل تصفيف", price: 20, img: "image (3).jpeg" }
);

/* باقي الصور */
for (let i = 4; i <= 41; i++) {
  products.push({
    id: i,
    name: "❓",
    price: null,
    img: `image (${i}).jpeg`
  });
}

/* ===== عرض المنتجات ===== */
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${p.img}" onclick="openImage('${p.img}')">
    <div class="product-info">
      <h4>${p.name}</h4>
      <p>${p.price ? p.price + " ₪" : "❓"}</p>
    </div>
    <div class="controls">
      <button onclick="decrease(${p.id})">−</button>
      <span id="qty-${p.id}">0</span>
      <button onclick="increase(${p.id})">+</button>
    </div>
  `;
  productsDiv.appendChild(div);
});

/* ===== زيادة الكمية ===== */
function increase(id) {
  const product = products.find(p => p.id === id);
  if (!product.price) {
    alert("المنتج غير متوفر حالياً");
    return;
  }

  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateUI();
}

/* ===== نقصان الكمية ===== */
function decrease(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty--;
  if (item.qty === 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateUI();
}

/* ===== تحديث الواجهة ===== */
function updateUI() {
  let totalQty = 0;
  let total = 0;

  cartItemsDiv.innerHTML = "";

  products.forEach(p => {
    const item = cart.find(i => i.id === p.id);
    document.getElementById(`qty-${p.id}`).innerText = item ? item.qty : 0;
  });

  cart.forEach(i => {
    totalQty += i.qty;
    total += i.qty * i.price;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span>${i.name} × ${i.qty}</span>
        <span>${i.qty * i.price} ₪</span>
      </div>
    `;
  });

  cartCount.innerText = totalQty;
  totalPriceEl.innerText = total;
}

/* ===== فتح / إغلاق السلة ===== */
function toggleCart() {
  cartModal.style.display =
    cartModal.style.display === "block" ? "none" : "block";
}

/* ===== إرسال واتساب ===== */
function sendWhatsApp() {
  if (!cart.length) {
    alert("السلة فارغة");
    return;
  }

  let msg = "طلب جديد:\n\n";
  cart.forEach(i => {
    msg += `${i.name} × ${i.qty} = ${i.qty * i.price} ₪\n`;
  });
  msg += `\nالإجمالي: ${totalPriceEl.innerText} ₪`;

  window.open(
    `https://wa.me/972XXXXXXXX?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}

/* ===== تكبير الصورة ===== */
function openImage(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("imageModal").style.display = "flex";
}

function closeImage() {
  document.getElementById("imageModal").style.display = "none";
}
