// ========================================
// 1) Stripe LIVE publishable key
// ========================================
const stripe = Stripe("pk_live_51SSmVu3QzOhSCgVOrmvQMFbEclpfJxL30oAKd3fuLgsCkYpYTqqEXeDOZ66RZcIRBA6Uk96Pe7l6ovOHoBVzsawN003q5LLFUd");

// ========================================
// 2) Render backend API URL
// ========================================
const API_ROOT = "https://sharmasourav082002-arch-github-io-1.onrender.com";

// ========================================
// 3) Buy Now Buttons → Stripe Checkout
// ========================================
document.querySelectorAll(".buy-now").forEach(btn => {
    btn.addEventListener("click", async () => {

        const productId = btn.getAttribute("data-id");

        const items = [
            { id: productId, qty: 1 }
        ];

        const res = await fetch(`${API_ROOT}/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: items,
                currency: "inr",
                customer_email: "testbuyer@example.com"
            })
        });

        const data = await res.json();

        if (data.url) {
            window.location.href = data.url;
        } else {
            alert("Payment Error: " + data.error);
        }

    });
});

// ========================================
// 4) Contact Popup
// ========================================
const modal = document.getElementById("contactModal");

document.getElementById("contactBtn").onclick = () => {
    modal.style.display = "block";
};

document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
};

window.onclick = e => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
};
