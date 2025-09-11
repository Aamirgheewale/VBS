<script lang="ts">
  import { cart, clearCart } from '$lib/cartStore'; // your cart store module
  import type { CartItem } from '$lib/cartStore';    // assuming you have a CartItem type
  import { goto } from '$app/navigation';
  import { purchasedBooksStore } from '$lib/purchasedStore'; // your purchased books store

  let cartItems: CartItem[] = [];
  cart.subscribe(items => cartItems = items);

  let subtotal = 0;
  $: subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  let paymentMethod = "UPI";

function handlePurchase() {
  purchasedBooksStore.update(books => {
    // Merge existing purchased books + new purchase from cart
    return [...books, ...cartItems.map(item => ({
      id: item.id,
      title: item.title,
      cover: item.image,
      pdfUrl: item.pdfUrl // optional
    }))];
  });

  clearCart(); // Clear cart after purchase
  goto('/profile?purchased=true');
}
</script>

<h2 style="text-align:center; margin-bottom:2rem;">Billing Details</h2>
<div class="checkout-box">
  <div>
    {#each cartItems as item}
      <div class="book-row">
        <img src={item.image} alt={item.title} class="book-cover" />
        <span>{item.title}</span>
        <span class="price">${item.price}</span>
      </div>
    {/each}
  </div>
  <div style="margin:1.25rem 0;">
    <div>Subtotal: <span class="price">${subtotal}</span></div>
    <div style="margin:0.3rem 0; border-bottom:1px solid #ccc;"></div>
    <div>Total: <span class="price">${subtotal}</span></div>
  </div>
  <div style="margin:1.15rem 0;">
    <label>
      <input type="radio" bind:group={paymentMethod} value="UPI" checked />
      UPI
    </label>
    <!-- Add more payment options later -->
  </div>
  <button class="purchase-btn" on:click={handlePurchase}>purchase</button>
</div>

<style>
.checkout-box {
  max-width: 375px;
  margin: 0 auto;
}

.book-row {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.book-cover {
  width: 60px; height: 90px;
  object-fit: cover;
  border-radius: 7px;
  margin-right: 1.2rem;
}

.price {
  margin-left: auto;
  font-weight: 500;
}

.purchase-btn {
  width: 90%;
  background: #d74d4d;
  color: #fff;
  border: none;
  margin: 2rem 0 0 5%;
  padding: 0.7rem 0;
  border-radius: 7px;
  font-size: 1.06rem;
  font-weight: 500;
  transition: background 0.18s;
  cursor: pointer;
}

.purchase-btn:hover {
  background: #b73636;
}
</style>
