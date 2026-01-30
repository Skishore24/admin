/* =====================================================
   SAMPLE ORDERS DATA
   ===================================================== */
   const orders = [
    {
      id: 1,
      orderNo: "ORD-1001",
      customer: "Kishore",
      total: 1250,
      time: "2026-01-30 10:15 AM",
      status: "pending"
    },
    {
      id: 2,
      orderNo: "ORD-1002",
      customer: "Arjun",
      total: 980,
      time: "2026-01-29 06:40 PM",
      status: "confirmed"
    },
    {
      id: 3,
      orderNo: "ORD-1003",
      customer: "Priya",
      total: 420,
      time: "2026-01-29 12:10 PM",
      status: "canceled"
    },
    {
      id: 4,
      orderNo: "ORD-1004",
      customer: "Rahul",
      total: 2350,
      time: "2026-01-28 09:05 AM",
      status: "confirmed"
    },
    {
      id: 5,
      orderNo: "ORD-1005",
      customer: "Ananya",
      total: 760,
      time: "2026-01-28 08:20 PM",
      status: "pending"
    }
  ];
  
  /* =====================================================
     STATE
     ===================================================== */
  let currentFilter = "all";
  let selectedOrderId = null;
  
  /* =====================================================
     RENDER TABLE
     ===================================================== */
  function renderOrders(list = orders) {
    const tbody = document.getElementById("ordersBody");
    tbody.innerHTML = "";
  
    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;color:#6b7280;">
            No orders found
          </td>
        </tr>
      `;
      return;
    }
  
    list.forEach(order => {
      tbody.innerHTML += `
        <tr>
          <td>${order.orderNo}</td>
          <td>${order.customer}</td>
          <td>₹${order.total}</td>
          <td>${order.time}</td>
          <td>
            <span class="status ${order.status}">
              ${order.status}
            </span>
          </td>
          <td>
            <button class="action-btn edit-btn"
              onclick="openStatusModal(${order.id})">
              Change Status
            </button>
          </td>
        </tr>
      `;
    });
  }
  
  /* =====================================================
     SEARCH (Order No or Customer)
     ===================================================== */
  function searchOrders() {
    const value = document
      .getElementById("searchInput")
      .value
      .toLowerCase();
  
    const searched = orders.filter(o =>
      o.orderNo.toLowerCase().includes(value) ||
      o.customer.toLowerCase().includes(value)
    );
  
    applyFilter(searched);
  }
  
  /* =====================================================
     FILTER BY STATUS
     ===================================================== */
  function filterOrders(status) {
    currentFilter = status;
    searchOrders();
  }
  
  function applyFilter(list) {
    if (currentFilter === "all") {
      renderOrders(list);
    } else {
      renderOrders(list.filter(o => o.status === currentFilter));
    }
  }
  
  /* =====================================================
     STATUS MODAL
     ===================================================== */
  function openStatusModal(orderId) {
    selectedOrderId = orderId;
  
    const order = orders.find(o => o.id === orderId);
    document.getElementById("statusSelect").value = order.status;
  
    document.getElementById("statusModal").style.display = "block";
  }
  
  function closeStatusModal() {
    document.getElementById("statusModal").style.display = "none";
    selectedOrderId = null;
  }
  
  /* =====================================================
     SAVE STATUS
     ===================================================== */
  function saveOrderStatus() {
    const newStatus = document.getElementById("statusSelect").value;
  
    const index = orders.findIndex(o => o.id === selectedOrderId);
    if (index === -1) return;
  
    orders[index].status = newStatus;
  
    closeStatusModal();
    renderOrders();
  }
  
  /* =====================================================
     INIT
     ===================================================== */
  renderOrders();
  