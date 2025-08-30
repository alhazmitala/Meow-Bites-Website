
//Dummy Data 
// const products = [
//     { name: "Tuna and Caviar Cat Food", category: "Dry Food", price: 25 },
//     { name: "Cat Leash", category: "Accessories", price: 15 },
//     { name: "Fish Treats", category: "Treats", price: 10 },
//     { name: "Big Cage", category: "Accessories", price: 50 },
//     { name: "Salmon and Chicken Cat Food", category: "Wet Food", price: 30 },
// ];

// Function to filter and display search results
function searchProducts() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let resultsTable = document.getElementById("resultsTable");

    resultsTable.innerHTML = ""; // Clear previous results

    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(input)
    );

    if (filteredProducts.length === 0) {
        resultsTable.innerHTML = "<tr><td colspan='3'>No results found</td></tr>";
        return;
    }

    filteredProducts.forEach(product => {
        let row = resultsTable.insertRow();
        row.insertCell(0).innerText = product.name;
        row.insertCell(1).innerText = product.category;
        row.insertCell(2).innerText = product.price;
    });
}

/* src/public/js/data.js
   Handles the “Add Product” form.
------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('product-form');
  if (!form) return;                 // runs only on the Add-Product page

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd   = new FormData(form);
    const btn  = form.querySelector('button[type="submit"]');
    const msg  = document.getElementById('confirmationMessage');

    btn.disabled = true;
    btn.textContent = 'Saving…';

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        body  : fd        // works with or without file input
      });

      if (res.ok) {
        msg.textContent = 'Product saved!';
        msg.style.color = 'lime';
        setTimeout(() => location.href = '/products', 800);
      } else {
        const { message } = await res.json().catch(() => ({}));
        throw new Error(message || 'Server error');
      }
    } catch (err) {
      alert(err.message);
      btn.disabled = false;
      btn.textContent = 'Add Product';
    }
  });
});
