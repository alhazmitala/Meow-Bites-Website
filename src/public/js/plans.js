/* /public/js/plans.js
   Renders the product grid & handles Buy / Delete
------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('product-grid') || document.querySelector('.grid_con');
  if (!grid) return;

  try {
    const res      = await fetch('/api/products');
    const products = await res.json();

    grid.innerHTML = products.map(p => `
      <article class="products" data-id="${p.id}">
        <img src="${p.imageUrl || '/images/placeholder.png'}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <h3>${Number(p.price).toFixed(2)} SAR</h3>

        <div class="button-group">
          <button class="buy-btn">Buy</button>
          <button class="delete-btn">Delete</button>
        </div>
      </article>
    `).join('');

    /* Attach one event listener for the whole grid (event delegation) */
    grid.addEventListener('click', async (e) => {
      if (!e.target.matches('.buy-btn, .delete-btn')) return;

      const article = e.target.closest('article');
      const id      = article.dataset.id;
      const name    = article.querySelector('h2').textContent;

      if (e.target.matches('.buy-btn')) {
        alert(`You selected: ${name}`);
        return;
      }

      /* Delete button */
      if (confirm(`Delete ${name}?`)) {
        try {
          const delRes = await fetch(`/api/products/${id}`, { method: 'DELETE' });
          if (delRes.ok) article.remove();
          else           alert('Failed to delete.');
        } catch (err) {
          console.error(err);
          alert('Error deleting product.');
        }
      }
    });

  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p class="center">Unable to load products.</p>';
  }
});
