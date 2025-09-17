<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { userStore } from '$lib/userStore';
  import { goto } from '$app/navigation';
  import { purchasedBooksStore } from '$lib/purchasedStore';

  import type { User } from '$lib/userStore';

  interface WishlistItem {
    id: string;
    bookId: number;
    title: string;
    price: number;
    image: string;
  }

  interface PurchasedBook {
    id: string;
    bookId: number;
    title: string;
    cover: string;
    pdfUrl?: string;
    author: string;
    price: number;
    image: string;
    quantity: number;
    pdf_url?: string;
  }

  // User state
  let user: User = { id: 0, name: '', email: '', phone: '', loggedIn: false };
  userStore.subscribe(value => user = { ...value, id: value.id ?? 0 });
  let tempUser: User = { ...user };
  let activeTab = 'personal';
  let editMode = false;
  let userId: number = 0;

  // Wishlist store and data
  const wishlist: Writable<WishlistItem[]> = writable([]);
  let wishlistItems: WishlistItem[] = [];
  wishlist.subscribe(items => wishlistItems = items);

  // Purchased books store and data
  const purchasedBooks: Writable<PurchasedBook[]> = purchasedBooksStore;
  let purchasedBooksItems: PurchasedBook[] = [];
  purchasedBooksStore.subscribe(bks => purchasedBooksItems = bks);

  // React to user login/logout
  userStore.subscribe(u => {
    userId = u?.id || 0;
    if (userId) {
      loadWishlist();
      loadPurchased();
    } else {
      wishlist.set([]);
      purchasedBooksStore.set([]);
    }
  });

  // Fetch user profile details on mount
  onMount(async () => {
    if (user.loggedIn && user.id) {
      try {
        const res = await fetch(`/api/profile?userId=${user.id}`);
        if (res.ok) {
          const userData = await res.json();
          userStore.set({ ...userData, loggedIn: true });
          tempUser = { ...userData };
        }
      } catch (err) {
        console.error('Failed to load user profile', err);
      }
    }
  });

  // Tabs selection
  function selectTab(tab: string) {
    activeTab = tab;
    editMode = false;
    tempUser = { ...user };
  }
  function startEdit() {
    editMode = true;
    tempUser = { ...user };
  }
  function cancelEdit() {
    editMode = false;
    tempUser = { ...user };
  }

  // Save user profile changes
  async function saveChanges() {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tempUser, id: user.id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          userStore.set({ ...data.user, loggedIn: true });
          editMode = false;
        } else {
          alert(data.error || 'Failed to save changes');
        }
      } else {
        alert('Failed to save changes');
      }
    } catch (err) {
      console.error('Save error', err);
      alert('Error saving changes');
    }
  }

  // Logout function
  async function logout() {
    try {
      const res = await fetch('/api/auth', { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        userStore.set({ id: 0, name: '', email: '', phone: '', loggedIn: false });
        goto('/');
      } else {
        alert(data.error || 'Failed to logout, please try again.');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('An error occurred during logout.');
    }
  }

  // Wishlist loading and removal
  async function loadWishlist() {
    if (!userId) return wishlist.set([]);
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`);
      if (res.ok) {
        wishlist.set(await res.json());
      }
    } catch (e) {
      wishlist.set([]);
      console.error('Failed to load wishlist:', e);
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) loadWishlist();
    } catch (err) {
      console.error('Failed to remove item from wishlist:', err);
    }
  }

  // Purchased books loading
  async function loadPurchased() {
    if (!userId) return purchasedBooksStore.set([]);
    try {
      const res = await fetch(`/api/purchased?userId=${userId}`);
      if (res.ok) purchasedBooksStore.set(await res.json());
    } catch (err) {
      purchasedBooksStore.set([]);
      console.error('Failed to load purchased books', err);
    }
  }

  // View purchased book PDF
  function viewBook(book: PurchasedBook) {
    const pdfUrl = book.pdfUrl || book.pdf_url;
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('PDF not available for this book.');
    }
  }

  

</script> -->

<!-- Your existing markup and styles unchanged -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { userStore } from '$lib/userStore';
  import { goto } from '$app/navigation';
  import { purchasedBooksStore } from '$lib/purchasedStore';
  import type { User } from '$lib/userStore';

  interface WishlistItem {
    id: string;
    bookId: number;
    title: string;
    price: number;
    image: string;
  }

  interface PurchasedBook {
    id: number | string;
    bookId: number;
    title: string;
    cover: string;
    pdf_url?: string;
    author: string;
    price: number;
    quantity: number;
    image: string;
    pdfUrl?: string;
  }

  let user: User = { id: 0, name: '', email: '', phone: '', loggedIn: false };
  userStore.subscribe((value) => {
    user = { ...value, id: value.id ?? 0 };
  });
  let tempUser = { ...user };
  let activeTab = 'personal';
  let editMode = false;

  let userId = 0;

  const wishlist: Writable<WishlistItem[]> = writable([]);
  let wishlistItems: WishlistItem[] = [];
  wishlist.subscribe((items) => {
    wishlistItems = items;
  });

  const purchasedBooks = purchasedBooksStore;
  let purchasedBooksItems: PurchasedBook[] = [];
  purchasedBooksStore.subscribe((books) => {
    purchasedBooksItems = books;
  });

  // Update wishlist and purchased books on login/logout
  userStore.subscribe((u) => {
    userId = u?.id ?? 0;
    if (userId) {
      loadWishlist();
      loadPurchased();
    } else {
      wishlist.set([]);
      purchasedBooksStore.set([]);
    }
  });

  onMount(async () => {
    if (user.loggedIn && user.id) {
      try {
        const res = await fetch(`/api/profile?userId=${user.id}`);
        if (res.ok) {
          const userData = await res.json();
          userStore.set({ ...userData, loggedIn: true });
          tempUser = { ...userData };
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    }
  });

  function selectTab(tab: string) {
    activeTab = tab;
    editMode = false;
    tempUser = { ...user };
  }

  function startEdit() {
    editMode = true;
    tempUser = { ...user };
  }

  function cancelEdit() {
    editMode = false;
    tempUser = { ...user };
  }

  async function saveChanges() {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...tempUser, id: user.id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          userStore.set({ ...data.user, loggedIn: true });
          editMode = false;
        } else {
          alert(data.error || 'Failed to save changes');
        }
      } else alert('Failed to save changes');
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving changes');
    }
  }

  async function logout() {
    try {
      const res = await fetch('/api/auth', { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        userStore.set({ id: 0, name: '', email: '', phone: '', loggedIn: false });
        goto('/');
      } else alert(data.error || 'Failed to logout');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Error logging out');
    }
  }

  async function loadWishlist() {
    if (!userId) return wishlist.set([]);
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`);
      if (res.ok) wishlist.set(await res.json());
    } catch (err) {
      console.error('Load wishlist error:', err);
      wishlist.set([]);
    }
  }

  async function removeFromWishlist(id: string) {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) loadWishlist();
    } catch (err) {
      console.error('Remove wishlist error:', err);
    }
  }

  async function loadPurchased() {
    if (!userId) return purchasedBooksStore.set([]);
    try {
      const res = await fetch(`/api/purchased?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        purchasedBooksStore.set(data);
      }
    } catch (err) {
      console.error('Load purchased books error:', err);
      purchasedBooksStore.set([]);
    }
  }

  function viewBook(book: PurchasedBook) {
    const url = book.pdf_url || book.pdfUrl;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else alert('PDF not available for this book.');
  }
</script>

<!-- Profile Header -->
<div class="profile-header">
  {#if user.loggedIn}
    <span class="welcome">Welcome! {user.name}</span>
    <button class="btn log-out" on:click={logout}>Logout</button>
  {/if}
</div>

<!-- Tabs -->
<div class="tabs">
  <button class="tab" class:active={activeTab === 'personal'} on:click={() => selectTab('personal')}>
    Personal Details
  </button>
  <button class="tab" class:active={activeTab === 'purchased'} on:click={() => selectTab('purchased')}>
    Purchased Books
  </button>
  <button class="tab" class:active={activeTab === 'wishlist'} on:click={() => selectTab('wishlist')}>
    Wishlist <i class="bi bi-heart" style="margin-left:6px;"></i>
  </button>
</div>

<!-- Personal Details Tab -->
{#if activeTab === 'personal'}
  <div class="profile-card">
    {#if !editMode}
      <button class="edit-btn" on:click={startEdit}>Edit Details</button>
    {/if}
    <div class="fields-row">
      <div class="field-block">
        <label for="name" class="field-label">Full Name</label>
        {#if editMode}
          <input type="text" bind:value={tempUser.name} placeholder="Full Name" />
        {:else}
          <div class="read-view">{user.name}</div>
        {/if}
      </div>
      <div class="field-block">
        <label for="email" class="field-label">Email</label>
        {#if editMode}
          <input type="email" bind:value={tempUser.email} />
        {:else}
          <div class="read-view">{user.email}</div>
        {/if}
      </div>
    </div>
    <div class="fields-row">
      <div class="field-block">
        <label for="phone" class="field-label">Phone No</label>
        {#if editMode}
          <input type="tel" bind:value={tempUser.phone} />
        {:else}
          <div class="read-view">{user.phone}</div>
        {/if}
      </div>
    </div>
    {#if editMode}
      <div class="actions-row">
        <button class="btn btn-outline-dark" on:click={cancelEdit}>Cancel</button>
        <button class="btn btn-purple" on:click={saveChanges}>Save Changes</button>
      </div>
    {/if}
  </div>
{/if}

<!-- Wishlist Tab -->
{#if activeTab === 'wishlist'}
  <div class="profile-card">
    <h3>Wishlist ({wishlistItems.length})</h3>
    {#if wishlistItems.length > 0}
      <div class="wishlist-list">
        {#each wishlistItems as book}
          <div class="wishlist-item">
            <img src={book.image} alt={book.title} width="120" />
            <div>{book.title}</div>
            <div>₹{book.price}</div>
            <button on:click={() => removeFromWishlist(book.id)}>🗑️ Remove</button>
          </div>
        {/each}
      </div>
    {:else}
      <p>No books in your wishlist.</p>
    {/if}
  </div>
{/if}

<!-- Purchased Books Tab -->
{#if activeTab === 'purchased'}
  <div class="profile-card">
    <table class="purchased-table">
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Quantity</th>
          <th>Price at Purchase</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each purchasedBooksItems as book}
          <tr>
            <td><img src={book.cover} alt={book.title} style="width: 100px; border-radius: 12px;" /></td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.quantity}</td>
            <td>₹{book.price}</td>
            <td>
              <button class="view-btn" on:click={() => viewBook(book)}>
                View <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    {#if purchasedBooksItems.length === 0}
      <div style="margin-top: 2rem; text-align: center;">No books purchased yet.</div>
    {/if}
  </div>
{/if}
<style>
  .profile-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:2.7rem; margin-top: 2.3rem;}
  .welcome { font-size:1.08rem; color:#9A86D1; font-weight: 500;}
  .tabs { display: flex; 
    justify-content: center;
    gap: 2rem; margin-bottom: -1px; }
  .tab {
    
    position:relative;
    padding: 0.85rem 2rem 0.85rem 2rem;
    background: none;
    border: none;
    font-size: 1.11rem; 
    font-weight: 620;
    color: #232323;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    border-radius: 18px 18px 0 0;
  }
  .tab.active {
    background: #9A5CD5;
    color: #fff;
    box-shadow: 0 2px 8px rgba(154,134,209,0.07);
    z-index: 2;
  }
  .tab:hover:not(.active) {
    background: #eee;
    color: #8057B3;
  }
  .profile-card {
    border:2px solid #232323;
    border-radius:23px;
    padding:2.5rem;
    background: #fff;
    max-width: 830px;
    margin: 0 auto 3rem auto;
    margin-top:0.5rem;
    box-shadow: 0 2px 18px rgb(154 134 209 / 0.04);
    position:relative;
  }
  .edit-btn {
    position:absolute;
    right:1rem; top:1.2rem;
    background:#fff;
    border:1.5px solid #bbb;
    border-radius:9px;
    padding:0.44rem 1.1rem;
    box-shadow: 1px 2px 5px rgba(0,0,0,0.07);
    font-weight:580;
    cursor:pointer;
  }
  .edit-btn:hover {
     background:#f9f9fa; 
     border-color:#999;
     background: #8057B3;
     color: #fff;   
    }
  .fields-row { display:flex; align-items:center; justify-content: space-around; margin-bottom:2.4rem; }
  .field-block { display:flex; flex-direction:column; align-items:center; min-width:270px;}
  .field-label { font-weight:530; margin-bottom:0.5rem;}
  input, .read-view {
    padding: 0.50rem 1.2rem;
    border-radius:7px;
    border:1.2px solid #bbb;
    font-size:1.08rem;
    min-width:170px;
    text-align: center;
    box-shadow: 2px 4px 7px rgba(0,0,0,0.08);
    margin-bottom:0.5rem;
    background:#fff;
  }
  .read-view {
    font-weight:550;
    border:none; pointer-events:none;
    background: #f9f9fa;
  }
  .actions-row { display:flex; justify-content:center; gap:1.5rem; margin-top:1.9rem;}
  .btn-purple { background:#9A86D1; color:#fff; padding:0.7rem 2.8rem; border-radius:7px; font-weight:600; border:none;}
  .btn-outline-dark { background:#fff; color:#232323; border:1.5px solid #232323; border-radius:7px; font-weight:580; padding:0.7rem 2.8rem;}
  .btn-purple:disabled {opacity:0.52; cursor:not-allowed;}
  /* .initial-badge {
    background: #9A86D1;
    color: #fff; font-weight: bold;
    padding: 0.2rem 0.85rem;
    border-radius: 50%;
    margin-left: 1rem;
    font-size: 1.1rem;
    vertical-align: middle;
  } */

   .wishlist-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.wishlist-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 140px;
  text-align: center;
}
.log-out{
  border: 2px solid #9A86D1;
}
.log-out:hover{
  background: #9A86D1;
  color: #fff;
} 



/* purchased books table styling */

.purchased-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.purchased-table th, .purchased-table td {
  text-align: center;
  padding: 1rem 0.5rem;
  border: none;
  font-size: 1.12rem;
}

.purchased-table th {
  border-bottom: 2px solid #222;
  font-weight: 600;
  background: none;
  color: #222;
}

.purchased-table tr:not(:last-child) td {
  border-bottom: 1px solid #bbb;
}

 .view-btn {
  background: none;
  border: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  font-size: 1.05rem;
} 
 .view-btn i {
  margin-left: 0.35rem;
  font-size: 1.25rem;
}

  .purchased-table th,
  .purchased-table td {
    padding: 0.5rem 1rem;
    text-align: center;
  }

</style>
