let editIndex = null;
let currentCategory = "All";
let editCategoryIndex = null;

/* =========================
   PRODUCT DATA
========================= */

const products = [

  { name:"Basmati Rice", price:120, discount:10, stock:25, unit:"1 kg", category:"Rice", desc:"Premium rice", img:"../images/rice.jpg" },
  { name:"Brown Rice", price:110, discount:5, stock:18, unit:"1 kg", category:"Rice", desc:"Healthy rice", img:"../images/brownrice.jpg" },
  { name:"Sona Masuri Rice", price:95, discount:0, stock:30, unit:"1 kg", category:"Rice", desc:"Daily use rice", img:"../images/sona.jpg" },

  { name:"Sunflower Oil", price:180, discount:8, stock:15, unit:"1 L", category:"Oil", desc:"Healthy oil", img:"../images/sunfl.jpg" },
  { name:"Coconut Oil", price:240, discount:5, stock:12, unit:"1 L", category:"Oil", desc:"Cold pressed oil", img:"../images/coco.jpg" },
  { name:"Groundnut Oil", price:220, discount:6, stock:10, unit:"1 L", category:"Oil", desc:"Pure oil", img:"../images/GroundnutOil.jpg" },

  { name:"Potato Chips", price:40, discount:0, stock:50, unit:"250 g", category:"Snacks", desc:"Crispy chips", img:"../images/PotatoChips.jpg" },
  { name:"Biscuits", price:30, discount:0, stock:60, unit:"250 g", category:"Snacks", desc:"Tea time snack", img:"../images/Biscuits.jpg" },
  { name:"Cookies", price:60, discount:10, stock:35, unit:"250 g", category:"Snacks", desc:"Chocolate cookies", img:"../images/cookies.jpg" },

  { name:"Tea", price:80, discount:5, stock:20, unit:"500 g", category:"Beverages", desc:"Strong tea", img:"../images/tea.jpg" },
  { name:"Coffee", price:120, discount:7, stock:14, unit:"250 g", category:"Beverages", desc:"Instant coffee", img:"../images/coffee.jpg" },
  { name:"Green Tea", price:150, discount:12, stock:16, unit:"250 g", category:"Beverages", desc:"Healthy drink", img:"../images/greentea.jpg" }

];

/* =========================
   CATEGORY SYSTEM
========================= */

let categories = ["Rice","Oil","Snacks","Beverages"];

function toggleCategoryManager() {
  const panel = document.getElementById("categoryManager");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  renderCategoryList();
}

function renderCategoryList() {
  const list = document.getElementById("categoryList");
  list.innerHTML = "";

  categories.forEach((cat, index) => {
    list.innerHTML += `
      <div class="category-row">
        <span>${cat}</span>
        <div>
          <button class="edit-cat" onclick="editCategory(${index})">Edit</button>
          <button class="delete-cat" onclick="deleteCategory(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  refreshCategoryButtons();
}

function openCategoryModal() {
  editCategoryIndex = null;
  document.getElementById("categoryModalTitle").innerText = "Add Category";
  document.getElementById("newCategoryName").value = "";
  document.getElementById("categoryModal").style.display = "block";
}

function closeCategoryModal() {
  document.getElementById("categoryModal").style.display = "none";
  document.getElementById("newCategoryName").value = "";
}



function saveCategory() {
  const input = document.getElementById("newCategoryName");
  const name = input.value.trim();

  if (!name) {
    alert("Enter category name");
    return;
  }

  if (editCategoryIndex === null) {
    // Add new category
    categories.push(name);
  } else {
    // Edit category
    categories[editCategoryIndex] = name;
    editCategoryIndex = null;   // reset edit mode
  }

  closeCategoryModal();
  renderCategoryList();
  refreshCategoryButtons();   // important
}

function editCategory(index) {
  editCategoryIndex = index;
  document.getElementById("categoryModalTitle").innerText = "Edit Category";
  document.getElementById("newCategoryName").value = categories[index];
  document.getElementById("categoryModal").style.display = "block";
}


function deleteCategory(index) {
  if (confirm("Delete this category?")) {
    categories.splice(index, 1);
    renderCategoryList();
  }
}

function refreshCategoryButtons() {
  const container = document.querySelector(".category-filter");
  const manageBtn = container.querySelector(".add-category-btn");

  container.innerHTML = `
    <button class="active" onclick="filterCategory('All', this)">All</button>
  `;

  categories.forEach(cat => {
    container.innerHTML += `
      <button onclick="filterCategory('${cat}', this)">${cat}</button>
    `;
  });

  container.appendChild(manageBtn);

  /* Update dropdown */
  const dropdown = document.getElementById("pcategory");
  dropdown.innerHTML = `<option value="">Select Category</option>`;

  categories.forEach(cat => {
    dropdown.innerHTML += `<option>${cat}</option>`;
  });
}

/* =========================
   PRODUCT FUNCTIONS
========================= */

function renderProducts(list = products) {
  const body = document.getElementById("productBody");
  body.innerHTML = "";

  list.forEach((p) => {
    const realIndex = products.indexOf(p);

    body.innerHTML += `
  <div class="product-card">
    <img src="${p.img}" class="product-img">

    <div class="product-info">
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>

      <div class="meta">
        <span class="badge">${p.category}</span>
      </div>

      <div class="details">
        <div><strong>Price:</strong> ₹${p.price}</div>
        <div><strong>Discount:</strong> ${p.discount || 0}%</div>
        <div><strong>Stock:</strong> ${p.stock || 0}</div>
        <div><strong>Unit:</strong> ${p.unit || "-"}</div>
        <div class="final-price">
          <strong>Final Price:</strong> ₹${Math.round(p.price - (p.price * (p.discount || 0) / 100))}
        </div>
      </div>

      <div class="card-footer">
        <div class="actions">
          <button class="edit-btn" onclick="editProduct(${realIndex})">Edit</button>
          <button class="delete-btn" onclick="deleteProduct(${realIndex})">Delete</button>
        </div>
      </div>
    </div>
  </div>
`;

  });
}

function filterCategory(cat, btn) {
  currentCategory = cat;

  document.querySelectorAll(".category-filter button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(p =>
    (currentCategory === "All" || p.category === currentCategory) &&
    (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );

  renderProducts(filtered);
}

function openModal() {
  document.getElementById("modalTitle").innerText = "Add Product";
  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
  editIndex = null;
}

function saveProduct() {
  const product = {
    name: pname.value,
    price: Number(pprice.value),
    discount: Number(pdiscount.value) || 0,
    stock: Number(pqty.value) || 0,
    unit: punit.value,
    category: pcategory.value,
    desc: pdesc.value,
    img: "../images/3.jpg"
  };

  if (!product.name || !product.category) {
    alert("Enter product name and category");
    return;
  }

  if (editIndex === null) {
    products.push(product);
  } else {
    products[editIndex] = product;
  }

  closeModal();
  applyFilters();
}


function editProduct(index) {
  editIndex = index;
  const p = products[index];

  pname.value = p.name;
  pprice.value = p.price;
  pdiscount.value = p.discount;
  pqty.value = p.stock;
  punit.value = p.unit;
  pdesc.value = p.desc;
  pcategory.value = p.category;

  document.getElementById("modalTitle").innerText = "Edit Product";
  document.getElementById("productModal").style.display = "block";
}


function deleteProduct(index) {
  if (confirm("Delete product?")) {
    products.splice(index, 1);
    applyFilters();
  }
}

/* =========================
   SIDEBAR
========================= */

function toggleSidebar(){
  document.querySelector(".sidebar").classList.toggle("show");
  document.querySelector(".overlay").classList.toggle("show");
}

function closeSidebar(){
  document.querySelector(".sidebar").classList.remove("show");
  document.querySelector(".overlay").classList.remove("show");
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", function () {
  refreshCategoryButtons();
  renderCategoryList();
  renderProducts();

  document.getElementById("searchInput").addEventListener("input", applyFilters);

});
