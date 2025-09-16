<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/userStore';

  let userId: number = 0;
  let cartItems: Array<{
    id: number;
    title: string;
    author: string;
    price: number;
    image: string;
    quantity: number;
  }> = [];

  // Subscribe to user store and track userId changes
  const unsubscribe = userStore.subscribe(user => {
    const newUserId = user.id ?? 0;
    if (newUserId !== userId) {
      userId = newUserId;
      loadCart();
    }
  });

  async function loadCart() {
    if (!userId) {
      cartItems = [];
      return;
    }
    try {
      const res = await fetch(`/api/cart?user_id=${userId}`);
      if (res.ok) {
        cartItems = await res.json();
      } else {
        cartItems = [];
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
      cartItems = [];
    }
  }

  onMount(() => {
    loadCart();
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function handleQuantity(cartItemId: number, value: string) {
    const quantity = parseInt(value);
    if (!quantity || quantity < 1) return;
    await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cartItemId, quantity })
    });
    await loadCart();
  }

  async function handleRemove(cartItemId: number) {
    await fetch('/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: cartItemId })
    });
    await loadCart();
  }

  function returnToBooks() {
    goto("/Categories");
  }

  function proceedToCheckout() {
    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }
    goto('/checkout');
  }

  $: subtotals = cartItems.map(item => item.quantity * item.price);
  $: subtotal = subtotals.reduce((a, b) => a + b, 0);
  $: total = subtotal;
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
              <img src={item.image} alt={item.title} style="height:64px;width:50px;object-fit:cover;border-radius:8px;" />
              <span>
                <span class="fw-bold">{item.title}</span><br/>
                <span class="text-muted small">{item.author}</span>
              </span>
            </div>
          </td>
          <td>₹{item.price}</td>
          <td>
            <select
              class="qty-select"
              aria-label={`Select quantity for ${item.title}`}
              value={item.quantity}
              on:change={e => {
                const target = e.target as HTMLSelectElement;
                if (target) handleQuantity(item.id, target.value);
              }}
            >
              {#each Array(10) as _, i}
                <option value={i + 1} selected={item.quantity === i + 1}>{i + 1}</option>
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
      <hr/>
      <div class="d-flex justify-content-between mb-3"><span>Total:</span><span class="fw-bold">₹{total}</span></div>
      <button class="btn btn-purple" on:click={proceedToCheckout}>Proceed to Checkout</button>
    </div>
  </div>
</div>

<style>
  .cart-table th, .cart-table td { padding: 18px 10px; font-size:1rem; }
  .cart-table thead tr { background:#fff; font-weight:600; }
  .cart-table { border-collapse:separate; border-spacing:0; }
  .cart-table tr { border-bottom:2px solid #d1dad9; }
  .qty-select { width:60px; padding:4px 0; border-radius:6px; border:1px solid #d1dad9; }
  .remove-btn { background:none; border:none; color:#ff4444; font-size:1.5rem; cursor:pointer; }
  .cart-total-box { border:2px solid #d1dad9; border-radius:13px; background:#fff; width:320px; }
  .btn-purple { background-color: #9A86D1 !important; color: #fff !important; }
  .btn-purple:disabled { opacity:0.5; }
  .btn-outline-dark { border:1.5px solid #232323; color:#232323; background:#fff; }
  .btn-outline-dark:hover { background:#232323; color:#fff; }
</style>
