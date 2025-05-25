function buypass() {
  if (!window.PaymentRequest) return alert("Payment Request APIに未対応なため使えません");

  new PaymentRequest(
    [
      {
        supportedMethods: location.origin + "/payment-manifest.json",
        data: {
          url: document.querySelector("input").value
        },
      },
    ],
    {
      total: {
        label: "_",
        amount: {
          value: "1", currency: "USD"
        },
      },
    }
  ).show();
}

document.querySelector("button#buypassBtn").onclick = buypass;

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");
const cloakToggle = document.getElementById("cloakToggle");
const iconColorSelect = document.getElementById("iconColorSelect");
const resetBtn = document.getElementById("resetBtn");

settingsToggle.onclick = () => {
  settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
};

cloakToggle.onchange = () => {
  if (cloakToggle.checked) {
    document.querySelectorAll("input, button#buypassBtn, p, .credit").forEach(el => el.style.display = "none");
  } else {
    document.querySelectorAll("input, button#buypassBtn, p, .credit").forEach(el => el.style.display = "");
  }
};

iconColorSelect.onchange = () => {
  let svgBase64;
  switch(iconColorSelect.value) {
    case "blueGreen":
      svgBase64 = btoa(`
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="#93adff"/>
          <line x1="16" y1="5" x2="16" y2="59" stroke="#93ffa9" stroke-width="6" stroke-linecap="round"/>
          <path d="M32 59 L16 5 L48 59" stroke="#46a049" stroke-width="6" fill="none" stroke-linejoin="round"/>
        </svg>
      `);
      break;
    case "redBlack":
      svgBase64 = btoa(`
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="#ff4c4c"/>
          <line x1="16" y1="5" x2="16" y2="59" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
          <path d="M32 59 L16 5 L48 59" stroke="#440000" stroke-width="6" fill="none" stroke-linejoin="round"/>
        </svg>
      `);
      break;
    default:
      svgBase64 = btoa(`
        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="#46a049"/>
          <line x1="16" y1="5" x2="16" y2="59" stroke="#93adff" stroke-width="6" stroke-linecap="round"/>
          <path d="M32 59 L16 5 L48 59" stroke="#93adff" stroke-width="6" fill="none" stroke-linejoin="round"/>
        </svg>
      `);
      break;
  }
  
  const favicon = document.getElementById("favicon");
  favicon.href = "data:image/svg+xml;base64," + svgBase64;
};

resetBtn.onclick = () => {
  window.location.reload();
};
