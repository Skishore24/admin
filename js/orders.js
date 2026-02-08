/* SAMPLE DATA */
const orders = [
  { id: 1, orderNo: "ORD-1001", customer: "Arun", total: 1250, time: "2026-01-30 10:15 AM", status: "pending" },
  { id: 2, orderNo: "ORD-1002", customer: "Arjun", total: 980, time: "2026-01-29 06:40 PM", status: "confirmed" },
  { id: 3, orderNo: "ORD-1003", customer: "Priya", total: 420, time: "2026-01-29 12:10 PM", status: "canceled" },
  { id: 4, orderNo: "ORD-1004", customer: "Rahul", total: 2350, time: "2026-01-28 09:05 AM", status: "confirmed" }
];

let currentFilter = "all";
let selectedOrderId = null;

/* SIDEBAR TOGGLE */
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
  document.getElementById("overlay").classList.toggle("show");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}
/* LOGOUT */
function confirmLogout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logged out");
  }
}

/* RENDER */
function renderOrders(list = orders) {
  const tbody = document.getElementById("ordersBody");
  tbody.innerHTML = "";

  list.forEach(order => {
    tbody.innerHTML += `
      <tr>
      <td data-label="Customer">${order.customer}</td>
        <td data-label="Order No">${order.orderNo}</td>
        <td data-label="Total">₹${order.total}</td>
        <td data-label="Time">${order.time}</td>
        <td data-label="Status">
          <span class="status ${order.status}">${order.status}</span>
        </td>
        <td data-label="Action">
          <button class="action-btn" onclick="openStatusModal(${order.id})">
            Change Status
          </button>
        </td>
      </tr>
    `;
  });
}

/* SEARCH + FILTER */
function searchOrders() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const result = orders.filter(o =>
    o.orderNo.toLowerCase().includes(value) ||
    o.customer.toLowerCase().includes(value)
  );
  applyFilter(result);
}

function filterOrders(status) {
  currentFilter = status;
  searchOrders();
}

function applyFilter(list) {
  if (currentFilter === "all") renderOrders(list);
  else renderOrders(list.filter(o => o.status === currentFilter));
}

/* MODAL */
function openStatusModal(id) {
  selectedOrderId = id;
  document.getElementById("statusSelect").value =
    orders.find(o => o.id === id).status;
  document.getElementById("statusModal").style.display = "block";
}

function closeStatusModal() {
  document.getElementById("statusModal").style.display = "none";
}

function saveOrderStatus() {
  const newStatus = document.getElementById("statusSelect").value;
  orders.find(o => o.id === selectedOrderId).status = newStatus;
  closeStatusModal();
  renderOrders();
}

document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".page");

  pages.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".page.active")?.classList.remove("active");
      btn.classList.add("active");
    });
  });
});

/* INIT */
renderOrders();
