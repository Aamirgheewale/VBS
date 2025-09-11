
<script lang="ts">

  import { wishlist, removeFromWishlist } from '$lib/wishlistStore';
  import type { WishlistItem } from '$lib/wishlistStore';
  let books : WishlistItem[] = [];
  wishlist.subscribe(value => books = value);
</script>

<h2>Wishlist ({books.length})</h2>
<div class="wishlist-list">
  {#each books as book}
    <div class="wishlist-item">
      <img src={book.image} alt={book.title} />
      <div>{book.title}</div>
      <div>{book.price}</div>
      <button on:click={() => removeFromWishlist(book.id)}>🗑️</button>
    </div>
  {/each}
  {#if books.length === 0}
    <div>No books added to wishlist.</div>
  {/if}
</div>
