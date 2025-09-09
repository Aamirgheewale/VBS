<script lang="ts">
  import { cart, removeFromCart, setQuantity } from '$lib/cartStore';
  import type { CartItem } from '$lib/cartStore';
  import { get } from 'svelte/store';

  let cartItems: CartItem[] = [];
  $: cart.subscribe(items => cartItems = items);

  $: subtotals = cartItems.map(item => item.quantity * item.price);
  $: subtotal = subtotals.reduce((a, b) => a + b, 0);
  $: total = subtotal;

  function handleQuantity(id: string, value: string) {
    setQuantity(id, parseInt(value) || 1);
  }

  function handleRemove(id: string) {
    removeFromCart(id);
  }

  function returnToBooks() {
    window.location.href = "/categories";
  }
</script>

<div class="container my-5">
  <table class="cart-table w-100 mb-3">
    <thead>
      <tr>
        <th style="width:28%">Book</th>
        <th style="width:15%">Price</th>
        <th style="width:18%">Quantity</th>
        <th style="width:15%">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {#each cartItems as item (item.id)}
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:12px;">
              <button class="remove-btn" aria-label="Remove" on:click={() => handleRemove(item.id)}>✖</button>
              <img src={item.image} alt={item.title} style="height:64px;width:50px;object-fit:cover;border-radius:8px;">
              <span>
                <span class="fw-bold">{item.title}</span><br>
                <span class="text-muted small">{item.author}</span>
              </span>
            </div>
          </td>
          <td>₹{item.price}</td>
          <td>
            <select class="qty-select" value={item.quantity} on:change={e => {const target = e.target as HTMLSelectElement;
  if (target) handleQuantity(item.id, target.value);
}}>
              {#each Array(10).fill(0) as _, i}
                <option value={i+1} selected={item.quantity === i+1}>{i+1}</option>
              {/each}
            </select>
          </td>
          <td>₹{item.quantity * item.price}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="d-flex flex-wrap gap-4 mt-4">
    <div>
        <button class="btn btn-outline-dark px-5" on:click={returnToBooks}>Return To Books</button>
    </div>
        <div class="cart-total-box ms-auto p-4">
      <h5 class="mb-3">Cart Total</h5>
      <div class="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>₹{subtotal}</span></div>
      <hr>
      <div class="d-flex justify-content-between mb-3"><span>Total:</span><span class="fw-bold">₹{total}</span></div>
      <button class="btn btn-purple w-100" disabled>Proceed to checkout</button>
    </div>
  </div>
</div>

<style>
  .cart-table th, .cart-table td { padding: 18px 10px; font-size:1rem;}
  .cart-table thead tr {background:#fff;font-weight:600;}
  .cart-table {border-collapse:separate;border-spacing:0;}
  .cart-table tr {border-bottom:2px solid #d1dad9;}
  .qty-select {width:60px;padding:4px 0;border-radius:6px;border:1px solid #d1dad9;}
  .remove-btn {background:none;border:none;color:#ff4444;font-size:1.5rem;cursor:pointer;}
  .cart-total-box {border:2px solid #d1dad9; border-radius:13px; background:#fff; width:320px;}
  .btn-purple {background-color: #9A86D1 !important; color: #fff !important;}
  .btn-purple:disabled {opacity:0.5;}
  .btn-outline-dark {border:1.5px solid #232323; color:#232323; background:#fff;}
  .btn-outline-dark:hover {background:#232323;color:#fff;}
</style>
