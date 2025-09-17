<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import { addToCart } from '$lib/cartStore';
  import { showToast } from '$lib/toastStore';
  import { wishlist, addToWishlist } from '$lib/wishlistStore';
  import type { Book, WishlistItem } from '$lib/types';


  
  let books: any[] = [];
  let genre = '';

  async function loadBooks() {
    let path = '/api/books';
    if (genre) path += `?genre=${encodeURIComponent(genre)}`;
    const res = await fetch(path);
    books = await res.json();
  }

  onMount(() => {
    // Get genre from URL
    const url = new URL(window.location.href);
    genre = url.searchParams.get('genre') || '';
    loadBooks();
  });

  async function addBook(title, author, price) {
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, price })
    });
    await loadBooks();
  }

  function handleAddToCart(book) {
    addToCart({ id: book.id, title: book.title, author: book.author, price: book.price, image: book.cover_image_url });
    showToast('Item added to cart', 'success');
  }

  function favorite(book) {
    addToWishlist({ id: String(book.id), title: book.title, author: book.author, image: book.cover_image_url, price: book.price });
    showToast('Added to wishlist', 'success');
  }
</script>


<div class="container my-5">
  <h2 class="fw-bold mb-4 text-center">My Books - {genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'All'}</h2>
  {#if genreBooks.length > 0}
    {#each genreBooks as book}
      <div class="row align-items-center mb-5">
        <div class="col-md-4 text-center">
          <img src={book.img} alt={book.title} style="max-width:80%;border-radius:10px;" />
        </div>
        <div class="col-md-8">
          <h4 class="fw-bold">{book.title}</h4>
          <div class="mb-1 text-muted">{book.author}</div>
          <div class="mb-2">
            {#each Array(5) as _, i}
              <i class={"bi " + (i+1 <= Math.floor(book.rating) ? "bi-star-fill" : i < book.rating ? "bi-star-half" : "bi-star")} style="color:#9A86D1;"></i>
            {/each}
            <span class="ms-2 fw-semibold">{book.rating}</span>
          </div>
          <div class="fs-4 fw-bold mb-2">${book.price}</div>
          <p style="color: #555;">{book.description}</p>
          <div class="d-flex gap-3 mb-3">
            <button class="btn btn-purple px-4 fw-semibold" on:click={() => handleAddToCart(book)}>
              <i class="bi bi-cart"></i> Add to cart
            </button>
            <button
  class="btn btn-outline-purple px-4 fw-semibold"
  on:click={() => favorite(book)}
  disabled={currentWishlist.some(item => item.id === String(book.id))}
>
  {#if currentWishlist.some(item => item.id === String(book.id))}
    ★ Favorited
  {:else}
    Favorite
  {/if}
</button>
          </div>
          <div class="row mt-3 text-muted small">
            <div class="col-6">Publisher: <span class="fw-bold">{book.publisher}</span></div>
            <div class="col-6">Publication date: <span class="fw-bold">{book.pubDate}</span></div>
            <div class="col-6">Language: <span class="fw-bold">{book.language}</span></div>
            <div class="col-6">Reading age: <span class="fw-bold">{book.age}</span></div>
            <div class="col-6">Print length: <span class="fw-bold">{book.pages} pages</span></div>
            <div class="col-6">Dimensions: <span class="fw-bold">{book.dimensions}</span></div>
          </div>
        </div>
      </div>
      <hr />
    {/each}
  {:else}
    <p class="text-center fs-5 text-muted">No books found for "{genre}" genre.</p>
  {/if}
</div>

<style>
  .btn-purple {
    background-color: #9A86D1 !important;
    color: #fff !important;
    border: none;
  }
  .btn-purple:hover {
    background-color: #8057B3 !important;
  }
  .btn-outline-purple {
    color: #9A86D1 !important;
    border-color: #9A86D1 !important;
    background: transparent;
  }
  .btn-outline-purple:hover {
    background-color: #9A86D1 !important;
    color: #fff !important;
  }
</style> -->


<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import { addToCart } from '$lib/cartStore';
  import { showToast } from '$lib/toastStore';
  import { wishlist, addToWishlist } from '$lib/wishlistStore';
  
  import type { Book } from '$lib/books/+service';

  let books: Book[] = [];
  let genre = '';
  // Map category name (lowercase) → category id
  let categoryMap: Record<string, number> = {};

  // Fetch all categories, build category map
  async function loadCategories() {
    const res = await fetch('/api/categories');
    if (res.ok) {
      const categories = await res.json();
      categoryMap = {};
      for (const c of categories) {
        categoryMap[c.name.toLowerCase()] = c.id;
      }
    } else {
      categoryMap = {};
    }
  }

  // Load books by category ID resolved from genre; fallback to all books if no genre
  async function loadBooks() {
    if (genre) {
      await loadCategories();
      const categoryId = categoryMap[genre.toLowerCase()];
      if (!categoryId) {
        books = []; // No matching category found
        return;
      }
      const res = await fetch(`/api/categories/books?category_id=${categoryId}`);
      if (res.ok) {
        books = await res.json();
      } else {
        books = [];
      }
    } else {
      const res = await fetch('/api/books');
      books = res.ok ? await res.json() : [];
    }
  }

  // On mount get genre query param and load books accordingly
  onMount(() => {
    const url = new URL(window.location.href);
    genre = url.searchParams.get('genre') || '';
    loadBooks();
  });

  function handleAddToCart(book: Book) {
    addToCart({
      id: String(book.id),
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.cover_image_url
    });
    showToast('Item added to cart', 'success');
  }

  function favorite(book: Book) {
    addToWishlist({
      id: String(book.id),
      title: book.title,
      author: book.author,
      image: book.cover_image_url,
      price: book.price
    });
    showToast('Added to wishlist', 'success');
  }
</script>

<div class="container my-5">
  <h2 class="fw-bold mb-4 text-center">
    My Books - {genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'All'}
  </h2>

  {#if books.length > 0}
    {#each books as book}
      <div class="row align-items-center mb-5">
        <div class="col-md-4 text-center">
          <img src={book.cover_image_url} alt={book.title} style="max-width:80%; border-radius:10px;" />
        </div>
        <div class="col-md-8">
          <h4 class="fw-bold">{book.title}</h4>
          <div class="mb-1 text-muted">{book.author}</div>
          <div class="mb-2">
            {#each Array(5) as _, i}
              <i
                class={"bi " + (i + 1 <= Math.floor(book.rating) ? "bi-star-fill" : i < book.rating ? "bi-star-half" : "bi-star")}
                style="color:#9A86D1;"
              ></i>
            {/each}
            <span class="ms-2 fw-semibold">{book.rating}</span>
          </div>
          <div class="fs-4 fw-bold mb-2">₹{book.price}</div>
          <p style="color: #555;">{book.description}</p>
          <div class="d-flex gap-3 mb-3">
            <button class="btn btn-purple px-4 fw-semibold" on:click={() => handleAddToCart(book)}>
              <i class="bi bi-cart"></i> Add to cart
            </button>
            <button
              class="btn btn-outline-purple px-4 fw-semibold"
              on:click={() => favorite(book)}
              disabled={$wishlist.some(item => item.id === String(book.id))}
            >
              {#if $wishlist.some(item => item.id === String(book.id))}
                ★ Favorited
              {:else}
                Favorite
              {/if}
            </button>
          </div>
          <div class="row mt-3 text-muted small">
            <div class="col-6">Publisher: <span class="fw-bold">{book.publisher}</span></div>
            <div class="col-6">Publication date: <span class="fw-bold">{book.pubDate}</span></div>
            <div class="col-6">Language: <span class="fw-bold">{book.language}</span></div>
            <div class="col-6">Reading age: <span class="fw-bold">{book.age}</span></div>
            <div class="col-6">Print length: <span class="fw-bold">{book.pages} pages</span></div>
            <div class="col-6">Dimensions: <span class="fw-bold">{book.dimensions}</span></div>
          </div>
        </div>
      </div>
      <hr />
    {/each}
  {:else}
    <p class="text-center fs-5 text-muted">No books found for "{genre}" genre.</p>
  {/if}
</div>

<style>
  .btn-purple {
    background-color: #9A86D1 !important;
    color: #fff !important;
    border: none;
  }
  .btn-purple:hover {
    background-color: #8057B3 !important;
  }
  .btn-outline-purple {
    color: #9A86D1 !important;
    border-color: #9A86D1 !important;
    background: transparent;
  }
  .btn-outline-purple:hover {
    background-color: #9A86D1 !important;
    color: #fff !important;
  }
</style> -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { addToCart } from '$lib/cartStore';
  import { showToast } from '$lib/toastStore';
  import { wishlist } from '$lib/wishlistStore';
  import type { Book } from '$lib/books/+service';
  import { userStore } from '$lib/userStore';
  import { get } from 'svelte/store';


  let books: Book[] = [];
  let genre = '';
  let categoryMap: Record<string, number> = {};

  // Fetch all categories and create a map from name to ID
  async function loadCategories() {
    const res = await fetch('/api/categories');
    if (res.ok) {
      const categories = await res.json();
      categoryMap = {};
      for (const c of categories) {
        categoryMap[c.name.toLowerCase()] = c.id;
      }
    } else {
      categoryMap = {};
    }
  }

  // Load books by resolving genre to category ID and fetching books for that category
  async function loadBooks() {
    if (genre) {
      await loadCategories();
      const categoryId = categoryMap[genre.toLowerCase()];
      if (!categoryId) {
        books = [];
        return;
      }
      const res = await fetch(`/api/categories/books?category_id=${categoryId}`);
      books = res.ok ? await res.json() : [];
    } else {
      const res = await fetch('/api/books');
      books = res.ok ? await res.json() : [];
    }
  }

  onMount(() => {
    const url = new URL(window.location.href);
    genre = url.searchParams.get('genre') || '';
    loadBooks();
  });

  // function handleAddToCart(book: Book) {
  //   addToCart({
  //     id: String(book.id),
  //     title: book.title,
  //     author: book.author,
  //     price: book.price,
  //     image: book.cover_image_url ?? ''
  //   });
  //   showToast('Item added to cart', 'success');
  // }

  
// function handleAddToCart(book: Book) {
//   const user = get(userStore);
//   if (!user?.loggedIn) {
//     showToast('Please log in to add items to your cart', 'error');
//     return;
//   }

//   addToCart({
//     id: String(book.id),
//     title: book.title,
//     author: book.author,
//     price: book.price,
//     image: book.cover_image_url ?? '',
//   },1);
//   showToast('Item added to cart', 'success');
// }

async function handleAddToCart(book: Book) {
  console.log("addToCart called with id:", book.id);
  const user = get(userStore);
  if (!user?.loggedIn || !user?.id) {
    showToast('Please log in to add items to your cart', 'error');
    return;
  }

  // POST to backend
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: user.id,
      book_id: book.id,
      quantity: 1
    })
  });

  if (res.ok) {
    showToast('Item added to cart', 'success');
    // Optionally: signal/update cart on navbar (with a store or event)
  } else {
    showToast('Could not add to cart. Please try again.', 'error');
  }
}

  // function favorite(book: Book) {
  //   addToWishlist({
  //     id: String(book.id),
  //     title: book.title,
  //     author: book.author,
  //     image: book.cover_image_url ?? '',
  //     price: book.price
  //   });
  //   showToast('Added to wishlist', 'success');
  // }

async function favorite(book: Book) {
  const user = get(userStore);
  if (!user?.loggedIn || !user?.id) {
    showToast('Please log in to wishlist books', 'error');
    return;
  }

  // POST to backend wishlist API
  const res = await fetch('/api/wishlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.id,
      bookId: book.id
    })
  });

  if (res.ok) {
    showToast('Added to wishlist', 'success');
    // You may want to re-fetch wishlist state here if showing it
  } else {
    showToast('Could not add to wishlist. Please try again.', 'error');
  }
}


  console.log('Book images:', books.map(b => b.cover_image_url));
  console.log('Category map:', categoryMap);

console.log('Fetched books:', books); 

</script>

<div class="container my-5">
  <h2 class="fw-bold mb-4 text-center">
    My Books - {genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'All'}
  </h2>

  {#if books.length > 0}
    {#each books as book}
      <div class="row align-items-center mb-5">
        <div class="col-md-4 text-center">
          <img src={book.cover_image_url ?? ''} alt={book.title ?? 'No title'} style="max-width:80%; border-radius:10px;" />
        <!-- <img src={book.cover_image_url && book.cover_image_url.length > 0 ? book.cover_image_url : '/default-book-cover.jpg'} alt={book.title ?? 'No title'} style="max-width:80%; border-radius:10px;" /> -->

        </div>
        <div class="col-md-8">
          <h4 class="fw-bold">{book.title ?? 'Untitled'}</h4>
          <div class="mb-1 text-muted">{book.author ?? 'Unknown author'}</div>
          <div class="mb-2">
            {#if book.rating != null}
              {#each Array(5) as _, i}
                <i
                  class={"bi " + (i + 1 <= Math.floor(book.rating) ? "bi-star-fill" : i < book.rating ? "bi-star-half" : "bi-star")}
                  style="color:#9A86D1;"
                ></i>
              {/each}
              <span class="ms-2 fw-semibold">{book.rating}</span>
            {:else}
              <span class="ms-2 text-muted">No rating</span>
            {/if}
          </div>
          <div class="fs-4 fw-bold mb-2">₹{book.price != null ? book.price : 'N/A'}</div>
          <p style="color: #555;">{book.description ?? 'No description available'}</p>
          <div class="d-flex gap-3 mb-3">
            <button disabled={!$userStore.loggedIn} class="btn btn-purple px-4 fw-semibold" on:click={() => handleAddToCart(book)}   >
              <i class="bi bi-cart"></i> Add to cart
            </button>
            <button
              class="btn btn-outline-purple px-4 fw-semibold"
              on:click={() => favorite(book)}
              disabled={$wishlist.some(item => item.id === String(book.id))}
            >
              {#if $wishlist.some(item => item.id === String(book.id))}
                ★ Favorited
              {:else}
                Favorite
              {/if}
            </button>
          </div>
          <div class="row mt-3 text-muted small">
            <div class="col-6">Publisher: <span class="fw-bold">{book.publisher ?? 'N/A'}</span></div>
            <div class="col-6">Publication date: <span class="fw-bold">{book.pubDate ?? 'N/A'}</span></div>
            <div class="col-6">Language: <span class="fw-bold">{book.language ?? 'N/A'}</span></div>
            <div class="col-6">Reading age: <span class="fw-bold">{book.age ?? 'N/A'}</span></div>
            <div class="col-6">Print length: <span class="fw-bold">{book.pages != null ? `${book.pages} pages` : 'N/A'}</span></div>
            <div class="col-6">Dimensions: <span class="fw-bold">{book.dimensions ?? 'N/A'}</span></div>
          </div>
        </div>
      </div>
      <hr />
    {/each}
  {:else}
    <p class="text-center fs-5 text-muted">No books found for "{genre}" genre.</p>
  {/if}
</div>

<style>
  .btn-purple {
    background-color: #9A86D1 !important;
    color: #fff !important;
    border: none;
  }
  .btn-purple:hover {
    background-color: #8057B3 !important;
  }
  .btn-outline-purple {
    color: #9A86D1 !important;
    border-color: #9A86D1 !important;
    background: transparent;
  }
  .btn-outline-purple:hover {
    background-color: #9A86D1 !important;
    color: #fff !important;
  }
</style>
