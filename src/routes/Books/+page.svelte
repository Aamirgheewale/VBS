<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { addToCart } from '$lib/cartStore';
  import { showToast } from '$lib/toastStore';
import { wishlist, addToWishlist } from '$lib/wishlistStore';
import type { WishlistItem } from '$lib/wishlistStore';

let books: { id: number; title: string; author: string }[] = [];

  async function loadBooks() {
    const res = await fetch('/api/books');
    books = await res.json();
  }
  onMount(loadBooks);

  async function addBook() {
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Example', author: 'Someone' })
    });
    await loadBooks(); // reload after adding
  }

  interface Book {
    id: number;
    title: string;
    author: string;
    rating: number;
    price: number;
    img: string;
    description: string;
    publisher: string;
    pubDate: string;
    language: string;
    age: string;
    pages: string;
    dimensions: string;
  }

  type BookGenreMap = {
    [key: string]: Book[];
  };

  let genreBooks: Book[] = [];
  let genre = '';

  // ONLY declare this once!
  const allBooksByGenre: BookGenreMap = { 
    action: [
      { id: 1,
        title: "Action Book 1",
        author: "Author A",
        rating: 4.2,
        price: 15.99,
        img: "/assets/card1.png",
        description: "Exciting action-packed novel.",
        publisher: "Action Publisher",
        pubDate: "January 1, 2023",
        language: "English",
        age: "16+",
        pages: "350",
        dimensions: "6 x 9 inches",
        
      },
      {id: 2,
        title: "Action Book 1",
        author: "Author A",
        rating: 4.2,
        price: 15.99,
        img: "/assets/card1.png",
        description: "Exciting action-packed novel.",
        publisher: "Action Publisher",
        pubDate: "January 1, 2023",
        language: "English",
        age: "16+",
        pages: "350",
        dimensions: "6 x 9 inches"
      }
      // Add more action books here
    ],
    drama: [
      {id: 1,
        title: "Drama Book 1",
        author: "Author D",
        rating: 4.7,
        price: 12.49,
        img: "/assets/card2.png",
        description: "A heartfelt drama story.",
        publisher: "Drama Publisher",
        pubDate: "March 15, 2022",
        language: "English",
        age: "14+",
        pages: "420",
        dimensions: "6 x 8.5 inches"
      }
      // Add more drama books here
    ],
    romance: [
      { id: 1,
        title: "Romance Book 1",
        author: "Author R",
        rating: 4.4,
        price: 13.95,
        img: "/assets/card3.png",
        description: "A beautiful love story.",
        publisher: "Romance Publisher",
        pubDate: "February 14, 2021",
        language: "English",
        age: "18+",
        pages: "300",
        dimensions: "5.5 x 8.25 inches"
      }
      // Add more romance books here
    ],
    fantasy: [
      {id: 1,
        title: "Chain of Gold: The Last Hours #1",
        author: "Cassandra Clare",
        rating: 4.5,
        price: 12.49,
        img: "/assets/card1.png",
        description: "From #1 New York Times bestselling author Cassandra Clare...",
        publisher: "Margaret K. Books",
        pubDate: "March 3, 2020",
        language: "English",
        age: "14+",
        pages: "592",
        dimensions: "6 × 1.8 × 9 inches"
      }
      // Add more fantasy books here
    ],
    mystery: [],
    comedy: [],
    historical: [],
    science_fiction: [],
    horror: []
  };

  // Get genre from URL query param on mount
  onMount(() => {
    const url = new URL(window.location.href);
    genre = (url.searchParams.get('genre') || '').toLowerCase();
    genreBooks = allBooksByGenre[genre] || [];
  });

  // Placeholder methods for buttons
  function handleAddToCart(book: Book) {
    addToCart({
      id: String(book.id),
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.img
    });
    showToast('Item added to cart', 'success');
  }

  // function favorite(book: Book) { /* TODO */ }

  let currentWishlist: WishlistItem[] = [];

  wishlist.subscribe((value: WishlistItem[]) => {
    currentWishlist = value;
  });

function favorite(book: Book) {
  addToWishlist({
    id: String(book.id),
    title: book.title,
    author: book.author,
    image: book.img,
    price: book.price
  });
  showToast('Added to wishlist', 'success'); // optionally import and use showToast for feedback
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
</style>
