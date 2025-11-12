// Get modal & elements
const modal = document.getElementById("orderModal");
const openBtn = document.getElementById("openOrderForm");
const closeBtn = document.getElementsByClassName("close")[0];
const orderBtns = document.querySelectorAll(".order-btn");
const formProduct = document.getElementById("formProduct");
const orderForm = document.getElementById("orderForm");

// Open modal when “Shop Now” clicked (from hero)
openBtn.onclick = () => {
  formProduct.value = "";
  modal.style.display = "block";
};

// Open modal and set product name when any “Order Now” btn clicked
orderBtns.forEach(btn => {
  btn.onclick = () => {
    const prodName = btn.getAttribute("data-product");
    formProduct.value = prodName;
    modal.style.display = "block";
  };
});

// Close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Close if click outside modal content
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

// Handle form submission
orderForm.onsubmit = (e) => {
  e.preventDefault();
  alert("Thank you! Your order is submitted.");
  // TODO: integrate backend or send form data to Sheet/email
  modal.style.display = "none";
  orderForm.reset();
};
