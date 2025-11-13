// Stripe integration (placeholder example)
const stripe = Stripe("pk_live_xxxxxxxxxxxxxxxxxxxxx"); // अपनी publishable key डालो

document.querySelectorAll(".buy-now").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Demo payment page — backend required for real payments!");
  });
});

// Contact form popup
const modal = document.getElementById("contactModal");
document.getElementById("contactBtn").onclick = () => modal.style.display = "block";
document.querySelector(".close").onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };
