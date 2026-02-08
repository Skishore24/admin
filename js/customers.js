/* SAMPLE DATA */
const customers = [
    {
      id: 1,
      name: "Krishna",
      phone: "9876543230",
      email: "krishna@gmail.com",
      total_orders: 1,
      total_spent: 18599,
      last_order: "30 Jan 2026, 11:21 PM"
    },
    {
      id: 2,
      name: "Arun",
      phone: "9898989898",
      email: "arun@gmail.com",
      total_orders: 4,
      total_spent: 4520,
      last_order: "28 Jan 2026, 09:10 AM"
    },
    {
      id: 3,
      name: "Priya",
      phone: "9797979797",
      email: "priya@gmail.com",
      total_orders: 2,
      total_spent: 1680,
      last_order: "27 Jan 2026, 06:45 PM"
    }
  ];
  
  /* RENDER */
  function renderCustomers(list = customers) {
    const tbody = document.getElementById("customersBody");
    tbody.innerHTML = "";
  
    list.forEach(c => {
      tbody.innerHTML += `
        <tr>
          <td data-label="Customer">
            <div class="customer-info">
              <div class="avatar">${c.name.charAt(0)}</div>
              <span>${c.name}</span>
            </div>
          </td>
          <td data-label="Phone">${c.phone}</td>
          <td data-label="Email">${c.email}</td>
          <td data-label="Orders">${c.total_orders}</td>
          <td data-label="Spent">₹${c.total_spent}</td>
          <td data-label="Last Order">${c.last_order}</td>
        </tr>
      `;
    });
  }
  
  /* SEARCH */
  function searchCustomers() {
    const value = document.getElementById("searchCustomer").value.toLowerCase();
    renderCustomers(
      customers.filter(c =>
        c.name.toLowerCase().includes(value) ||
        c.phone.includes(value) ||
        c.email.toLowerCase().includes(value)
      )
    );
  }
  
  /* SIDEBAR */
  function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
  }
  
  function closeSidebar() {
    document.getElementById("sidebar").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
  }
  
  function confirmLogout() {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out");
    }
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
  renderCustomers();
  