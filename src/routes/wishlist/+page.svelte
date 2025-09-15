<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib/userStore';
  import { writable } from 'svelte/store';

  export interface WishlistItem {
    id: string;
    bookId: number;
    title: string;
    price: number;
    image: string;
  }

  let userId = 0;
  userStore.subscribe(user => {
    userId = user?.id || 0;
    if (userId) loadWishlist();
    else wishlist.set([]);
  });

  // Local wishlist store
  const wishlist = writable<WishlistItem[]>([]);

  // Load wishlist from backend
  async function loadWishlist() {
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        wishlist.set(data);
      }
    } catch (error) {
      console.error('Failed to load wishlist:', error);
    }
  }

  // Add to wishlist via backend
  async function addToWishlist(item: WishlistItem) {
    if (!userId) {
      alert('Please login to add to wishlist.');
      return;
    }
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, bookId: item.bookId }),
      });
      if (res.ok) {
        await loadWishlist();
      }
    } catch (error) {
      console.error('Failed to add item to wishlist:', error);
    }
  }

  // Remove from wishlist via backend
  async function removeFromWishlist(id: string) {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        wishlist.update(items => items.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    }
  }

  // Reactive subscription for UI rendering
  let books: WishlistItem[] = [];
  wishlist.subscribe(value => books = value);
</script>

<h2>Wishlist ({books.length})</h2>

{#if books.length === 0}
  <p>No books added to wishlist.</p>
{/if}

<div class="wishlist-list">
  {#each books as book}
    <div class="wishlist-item">
      <img src={book.image} alt={book.title} width="80" height="100" />
      <div class="wishlist-details">
        <h4>{book.title}</h4>
        <p>₹{book.price}</p>
        <button aria-label="Remove from wishlist" on:click={() => removeFromWishlist(book.id)}>🗑️ Remove</button>
      </div>
    </div>
  {/each}
</div>

<style>
  .wishlist-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  .wishlist-item {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    gap: 1rem;
    align-items: center;
    width: 300px;
  }
  .wishlist-details h4 {
    margin: 0 0 0.3rem 0;
  }
  .wishlist-details p {
    margin: 0 0 0.5rem 0;
  }
  button {
    background: #9A86D1;
    color: white;
    border: none;
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background: #8057B3;
  }
</style>
