const salesCtx = document.getElementById("salesChart").getContext("2d");

new Chart(salesCtx, {
  type: "bar",
  data: {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Sales",
        data: [120, 350, 180, 290, 160, 210, 280, 140, 220, 380, 260, 150],
        backgroundColor: "#6366f1",
        borderRadius: 6,
        barThickness: 18
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        grid: { color: "#eef0f4" },
        ticks: { stepSize: 100 }
      }
    }
  }
});
const costData = [
  { name: "Fuel", amount: 89200, percent: 35, color: "primary" },
  { name: "Driver salaries", amount: 63700, percent: 25, color: "green" },
  { name: "Vehicle maintenance", amount: 38200, percent: 15, color: "yellow" },
  { name: "Warehousing", amount: 25500, percent: 10, color: "orange" },
  { name: "Insurance", amount: 17800, percent: 7, color: "red" }
];
