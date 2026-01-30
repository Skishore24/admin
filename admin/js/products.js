/* =========================================
   PRODUCT DATA (Sample)
========================================= */
let editIndex = null;

const products = [
  {
    id: 1,
    name: "Basmati Rice",
    price: 120,
    discount: 5,
    stock: 40,
    unit: "1 kg",
    desc: "Premium quality rice"
  },
  {
    id: 2,
    name: "Sunflower Oil",
    price: 180,
    discount: 10,
    stock: 25,
    unit: "1 L",
    desc: "Healthy cooking oil"
  }
];

/* =========================================
   RENDER PRODUCT TABLE
========================================= */
function renderProducts(list = products) {
    const body = document.getElementById("productBody");
    body.innerHTML = "";
  
    list.forEach(p => {
      body.innerHTML += `
        <tr>
          <td><img src="https://via.placeholder.com/40"></td>
          <td>${p.name}</td>
          <td>₹${p.price}</td>
          <td>${p.discount}%</td>
          <td>${p.stock}</td>
          <td>${p.unit}</td>
          <td>${p.desc}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editProduct(${p.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  }
/* =========================================
   SEARCH
========================================= */
function searchProducts() {
    const searchValue = document
      .getElementById("searchInput")
      .value
      .toLowerCase();
  
    const body = document.getElementById("productBody");
    body.innerHTML = "";
  
    products
      .filter(p =>
        p.name.toLowerCase().includes(searchValue) ||
        p.desc.toLowerCase().includes(searchValue) ||
        p.unit.toLowerCase().includes(searchValue)
      )
      .forEach((p, i) => {
        body.innerHTML += `
          <tr>
            <td><img src="https://via.placeholder.com/40"></td>
            <td>${p.name}</td>
            <td>₹${p.price}</td>
            <td>${p.discount}%</td>
            <td>${p.stock}</td>
            <td>${p.unit}</td>
            <td>${p.desc}</td>
            <td>
              <button class="action-btn edit-btn" onclick="editProduct(${i})">Edit</button>
              <button class="action-btn delete-btn" onclick="deleteProduct(${i})">Delete</button>
            </td>
          </tr>
        `;
      });
  }
  

/* =========================================
   MODAL CONTROLS
========================================= */
function openModal() {
  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
  clearForm();
  editIndex = null;
  document.getElementById("modalTitle").innerText = "Add Product";
}

/* =========================================
   CLEAR FORM
========================================= */
function clearForm() {
  pname.value = "";
  pprice.value = "";
  pdiscount.value = "";
  pqty.value = "";
  punit.value = "";
  pdesc.value = "";
}

/* =========================================
   SAVE PRODUCT (ADD / UPDATE)
========================================= */
function saveProduct() {
  const data = {
    name: pname.value,
    price: pprice.value,
    discount: pdiscount.value,
    stock: pqty.value,
    unit: punit.value,
    desc: pdesc.value
  };

  if (editIndex === null) {
    products.push(data);        // Add
  } else {
    products[editIndex] = data; // Update
  }

  closeModal();
  renderProducts();
}

/* =========================================
   EDIT PRODUCT
========================================= */
function editProduct(index) {
  editIndex = index;
  const p = products[index];

  pname.value = p.name;
  pprice.value = p.price;
  pdiscount.value = p.discount;
  pqty.value = p.stock;
  punit.value = p.unit;
  pdesc.value = p.desc;

  document.getElementById("modalTitle").innerText = "Edit Product";
  openModal();
}
/* =========================================
   EDIT PRODUCT
========================================= */
function deleteProduct(id) {
    const index = products.findIndex(p => p.id === id);
  
    if (index === -1) return;
  
    if (confirm("Are you sure you want to delete this product?")) {
      products.splice(index, 1);
      renderProducts();
    }
  }
  
/* INITIAL LOAD */
renderProducts();
