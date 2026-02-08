document.addEventListener("DOMContentLoaded", function () {

  // DASHBOARD DATA
  const dashboardData = {
    total_orders: 8,
    confirmed_orders: 1,
    pending_orders: 0,
    conversion_rate: 12.5,
    confirmed_value: 72997,
    pending_value: 0
  };

  // SET VALUES
  document.getElementById("totalOrders").innerText = dashboardData.total_orders;
  document.getElementById("confirmedOrders").innerText = dashboardData.confirmed_orders;
  document.getElementById("pendingOrders").innerText = dashboardData.pending_orders;
  document.getElementById("conversionRate").innerText =
    dashboardData.conversion_rate + "%";
  document.getElementById("confirmedValue").innerText =
    "₹" + dashboardData.confirmed_value.toLocaleString("en-IN");
  document.getElementById("pendingValue").innerText =
    "₹" + dashboardData.pending_value.toLocaleString("en-IN");

  // MONTHLY SALES BAR CHART
  new Chart(document.getElementById("salesChart"), {
    type: "bar",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        data: [120,350,180,290,160,210,280,140,220,380,260,150],
        backgroundColor: "#6366f1",
        borderRadius: 6,
        barThickness: 18
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "#eef0f4" } }
      }
    }
  });

  // TREND CHART
  const trendCanvas = document.getElementById("trendChart");
  const trendCtx = trendCanvas.getContext("2d");

  const gradient = trendCtx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, "rgba(99,102,241,0.35)");
  gradient.addColorStop(1, "rgba(99,102,241,0.05)");

  new Chart(trendCtx, {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
      datasets: [{
        data: [2,5,3,6,4,7,8],
        borderColor: "#6366f1",
        backgroundColor: gradient,
        fill: true,
        tension: 0.45,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });

  // PIE CHART
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: ["Fruits", "Vegetables", "Dairy", "Snacks", "Beverages", "Others"],
      datasets: [{
        data: [25, 20, 18, 15, 12, 10],
        backgroundColor: [
          "#22c55e",
          "#84cc16",
          "#3b82f6",
          "#f59e0b",
          "#06b6d4",
          "#9ca3af"
        ]
      }]
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: "70%"
    }
  });


});
function goToOrders(){
  window.location.href = "../html/orders.html";
}

/* SIDEBAR FUNCTIONS OUTSIDE */
function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle("show");
  document.getElementById("overlay").classList.toggle("show");
}

function closeSidebar(){
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
}