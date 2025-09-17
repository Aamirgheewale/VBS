<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib/userStore';
  import { writable, type Writable } from 'svelte/store';

   interface WishlistItem {
    id: string;     // wishlist row ID from DB
    bookId: number; // Book ID from DB
    title: string;
    price: number;
    image: string;
  }

  // Writable store holding current wishlist items
  const wishlist: Writable<WishlistItem[]> = writable([]);

  let userId: number = 0;

  // Subscribe to userStore for logged-in user changes
  userStore.subscribe(user => {
    userId = user?.id || 0;
    if (userId) loadWishlist();
    else wishlist.set([]);
  });

  // Load wishlist from backend API for logged-in user
  async function loadWishlist() {
    if (!userId) {
      wishlist.set([]);
      return;
    }
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`);
      if (res.ok) {
        const data: WishlistItem[] = await res.json();
        wishlist.set(data);
      } else {
        wishlist.set([]);
      }
    } catch (err) {
      console.error('Failed to load wishlist:', err);
      wishlist.set([]);
    }
  }

  // Add book to wishlist via backend
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

  // Remove book from wishlist via backend
  async function removeFromWishlist(id: string) {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await loadWishlist();
      }
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
    }
  }

  // Reactive variable for UI
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
