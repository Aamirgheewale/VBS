<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib/userStore';
  import { goto } from '$app/navigation';
  import { cart, clearCart } from '$lib/cartStore';
  import { purchasedBooksStore } from '$lib/purchasedStore';

  let userId: number = 0;

  // Cart item type aligned with store definition
  let cartItems: Array<{
    id: string;
    book_id: string;
    title: string;
    author: string;
    price: number;
    image: string;
    quantity: number;
    pdfUrl?: string;
  }> = [];

  let paymentMethod = 'UPI';

  // Subscribe to cart store to keep cartItems synced
  cart.subscribe(items => {
    cartItems = items;
    console.log('Cart updated:', cartItems);
  });

  // Subscribe to user store to detect login / logout
  userStore.subscribe(user => {
    userId = user.id ?? 0;
    // if (userId) {
    //   loadCartFromBackend();
    // } else {
    //   cartItems = [];
    //   clearCart();
    // }
  });

  // Fetch cart from backend for logged-in user and sync store
  async function loadCartFromBackend() {
    if (!userId) {
      cartItems = [];
      clearCart();
      return;
    }
    try {
      const res = await fetch(`/api/cart?user_id=${userId}`);
      if (res.ok) {
        const data = await res.json();
        // Data should always be Array<CartItem>
        if (Array.isArray(data)) {
          cart.set(data);
        } else {
          cart.set([]);
        }
      } else {
        cart.set([]);
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
      cart.set([]);
    }
  }

  // Reactive subtotal calculation
  $: subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Fetch purchased books to update UI if needed
  async function loadPurchased() {
    if (!userId) return;
    try {
      const res = await fetch(`/api/purchased?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          purchasedBooksStore.set(data);
        } else {
          purchasedBooksStore.set([]);
        }
      }
    } catch (err) {
      console.error('Failed to load purchased books', err);
      purchasedBooksStore.set([]);
    }
  }

  // Handle purchase button click
  async function handlePurchase() {
    if (!userId) {
      alert('Please log in to complete purchase');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Validate structure of cartItems before purchase
    if (cartItems.some(item => !item.id || !item.quantity)) {
      alert('Cart data corrupted or incomplete. Please try again.');
      return;
    }

    const purchasePayload = {
      userId,
      items: cartItems.map(item => ({
        bookId: Number(item.book_id),
        quantity: item.quantity,
      })),
      totalAmount: Number(subtotal.toFixed(2)),
      paymentMethod,
    };

    console.log('Purchase payload:', purchasePayload);
    console.log('Cart items at purchase:', cartItems);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchasePayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Update purchased books store with newly purchased books
        purchasedBooksStore.update(current => [
          ...current,
          ...cartItems.map(item => ({
            id: String(item.id),
            bookId: Number(item.id),
            title: item.title,
            cover: item.image,
            pdfUrl: item.pdfUrl,
            author: item.author,
            price: item.price,
            image: item.image,
            quantity: item.quantity,
          }))
        ]);

        // Clear cart after successful purchase
        clearCart();

        // Refresh purchased books list
        await loadPurchased();

        // Redirect to user profile page or order summary page
        goto('/Profile');

      } else {
        alert(data.error || 'Purchase failed');
      }
    } catch (err) {
      console.error('Purchase error:', err);
      alert('An error occurred while processing your purchase.');
    }
  }
  let loadingCart = true;

userStore.subscribe(async user => {
  if (user?.id) {
    loadingCart = true;
    try {
      const res = await fetch(`/api/cart?user_id=${user.id}`);
      if(res.ok) {
        const data = await res.json();
        cart.set(data);
      }
    } catch(e) {
      cart.set([]);
    }
    loadingCart = false;
  } else {
    cart.set([]);
    loadingCart = false;
  }
});

</script>

<h2 style="text-align:center; margin-bottom:2rem;">Billing Details</h2>

<div class="checkout-box">
  <div>
    {#each cartItems as item}
      <div class="book-row">
        <img src={item.image} alt={item.title} class="book-cover" />
        <div class="book-info">
          <span>{item.title}</span>
          <span class="price">₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    {/each}
  </div>

  <div class="summary">
    <div>Subtotal: <span class="price">₹{subtotal.toFixed(2)}</span></div>
    <div class="divider"></div>
    <div>Total: <span class="price">₹{subtotal.toFixed(2)}</span></div>
  </div>

  <div class="payment-method">
    <label>
      <input type="radio" bind:group={paymentMethod} value="UPI" checked />
      UPI
    </label>
  </div>

  <button class="purchase-btn" on:click={handlePurchase}>Purchase</button>
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
    width: 60px;
    height: 90px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 1rem;
  }
  .book-info {
    flex-grow: 1;
  }
  .price {
    font-weight: 500;
    margin-left: auto;
  }
  .summary {
    margin: 1rem 0;
  }
  .divider {
    margin: 0.3rem 0;
    border-bottom: 1px solid #ccc;
  }
  .payment-method {
    margin: 1.25rem 0;
  }
  .purchase-btn {
    width: 90%;
    background-color: #d74d4d;
    color: white;
    border: none;
    margin: 2rem 5% 0 5%;
    padding: 0.75rem 0;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 7px;
    cursor: pointer;
  }
  .purchase-btn:hover {
    background-color: #b63434;
  }
</style>
