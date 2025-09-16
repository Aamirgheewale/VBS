<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { Book } from '$lib/types';
  import type { Category } from '$lib/categories/+service';

  // Data from backend
  let heroBooks: { [genre: string]: Book | null } = {
    action: null,
    drama: null,
    romance: null
  };

  let featuredBooks: { [genre: string]: Book[] } = {};
  let categoriesBooks: { [genre: string]: Book[] } = {};
  let newArrivalBooks: { [genre: string]: Book[] } = {};

  let genres: string[] = [];
  let categories: Category[] = [];

  // Fetch all categories to get genre names and ids
  async function fetchCategories() {
    const res = await fetch('/api/categories');
    if (res.ok) {
      categories = await res.json();
      // Load all category names; change slice if you want to limit displayed genres
      genres = categories.map((c) => c.name.toLowerCase());
    }
  }

  // Fetch one book by genre for hero carousel (for specific genres)
  async function fetchHeroBooks() {
    for (const genre of ['action', 'drama', 'romance']) {
      const category = categories.find(c => c.name.toLowerCase() === genre);
      if (!category) continue;
      const res = await fetch(`/api/categories/books?category_id=${category.id}`);
      if (res.ok) {
        const books: Book[] = await res.json();
        heroBooks[genre] = books.length > 0 ? books[0] : null;
      }
    }
  }

  // Fetch books for featured, categories, and new arrivals with proper slicing
  async function fetchGroupedBooks() {
    // First 4 genres for Featured and Categories
    for (const genre of genres.slice(0, 4)) {
      const category = categories.find(c => c.name.toLowerCase() === genre);
      if (!category) continue;
      const res = await fetch(`/api/categories/books?category_id=${category.id}`);
      if (res.ok) {
        const books: Book[] = await res.json();
        featuredBooks[genre] = books.length > 0 ? [books[0]] : [];
        categoriesBooks[genre] = books.length > 1 ? [books[1]] : [];
      }
    }

    // Next 4 genres for New Arrival
    for (const genre of genres.slice(4, 8)) {
      const category = categories.find(c => c.name.toLowerCase() === genre);
      if (!category) continue;
      const res = await fetch(`/api/categories/books?category_id=${category.id}`);
      if (res.ok) {
        const books: Book[] = await res.json();
        newArrivalBooks[genre] = books.length > 0 ? [books[0]] : [];
      }
    }
  }

  // Navigate to category page on button click
  function goToCategory(genre: string) {
    goto(`/books?genre=${encodeURIComponent(genre)}`);
  }

  onMount(async () => {
    await fetchCategories();
    await Promise.all([fetchHeroBooks(), fetchGroupedBooks()]);
  });
</script>

<!-- Hero Section Carousel -->
<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
  <div class="carousel-inner">
    {#each ['action', 'drama', 'romance'] as genre, i}
      {#if heroBooks[genre]}
        <div class="carousel-item {i === 0 ? 'active' : ''}">
          <div class="container py-5">
            <div class="row align-items-center">
              <!-- Left -->
              <div class="col-md-6">
                <div class="ps-3 border-start" style="border-left: 3px solid #C7A4F7;">
                  <span class="badge rounded-pill border text-purple mb-3" style="border-color:#C7A4F7; background:transparent;">
                    Featured {genre.charAt(0).toUpperCase() + genre.slice(1)} Book
                  </span>
                  <h1 class="fw-bold mb-3" style="font-size:2.5rem; color:#252223;">
                    {heroBooks[genre].title}
                  </h1>
                  <p style="color:#252223; font-size:1.07rem;">
                    {heroBooks[genre].author}
                  </p>
                  <p style="color:#252223;">
                    {heroBooks[genre].description ?? 'No description available.'}
                  </p>
                  <button class="btn btn-purple btn-lg mt-3" on:click={() => goToCategory(genre)}>
                    Go to {genre.charAt(0).toUpperCase() + genre.slice(1)} Category
                  </button>
                </div>
              </div>
              <!-- Right -->
              <div class="col-md-6 text-end">
                <img src={heroBooks[genre].cover_image_url} alt={heroBooks[genre].title} class="img-fluid mb-2" style="height: 400px;" />
              </div>
            </div>
          </div>
        </div>
      {:else}
        <div class="carousel-item {i === 0 ? 'active' : ''}">
          <div class="container py-5">
            <div class="row align-items-center">
              <div class="col-12 text-center text-muted">
                No {genre} books available
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <button class="carousel-control-prev" aria-label="Previous slide" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" aria-label="Next slide" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>

<!-- Featured Books Section -->
<section class="container my-5">
  <h2 class="text-center mb-4 fw-bold">Featured Books</h2>
  <div class="row justify-content-center">
    {#each genres.slice(0, 4) as genre}
      {#if featuredBooks[genre]}
        {#each featuredBooks[genre] as book}
          <div
            class="col-md-3 col-6 mb-4"
            role="button"
            tabindex="0"
            style="cursor:pointer;"
            aria-label={`Go to ${genre} category`}
            on:click={() => goToCategory(genre)}
            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToCategory(genre); }}
          >
            <div class="card h-100 border-0">
              <img src={book.cover_image_url} class="card-img-top" alt={book.title} />
              <div class="card-body text-center">
                <h5 class="card-title fw-bold">{book.title}</h5>
                <p class="card-text small">{book.author}</p>
                <button
                  class="btn btn-purple mt-2"
                  on:click|stopPropagation={() => goToCategory(genre)}
                  aria-label={`Go to ${genre} category`}
                >
                  Go to Category
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {/each}
  </div>
</section>

<!-- Categories Section -->
<section class="container my-5">
  <h2 class="fw-bold mb-4 text-center">Categories</h2>
  <div class="row">
    {#each genres.slice(0, 4) as genre}
      {#if categoriesBooks[genre]}
        {#each categoriesBooks[genre] as book}
          <div
            class="col-md-3 col-6 mb-4"
            role="button"
            tabindex="0"
            style="cursor:pointer;"
            aria-label={`Go to ${genre} category`}
            on:click={() => goToCategory(genre)}
            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToCategory(genre); }}
          >
            <div class="card h-100 border-0">
              <img src={book.cover_image_url} class="card-img-top" alt={book.title} />
              <div class="card-body">
                <h5 class="card-title fw-bold">{book.title}</h5>
                <div class="card-text small mb-2">{book.author}</div>
                <div class="fw-bold mb-2">₹{book.price}</div>
                <button
                  class="btn btn-purple w-100"
                  on:click|stopPropagation={() => goToCategory(genre)}
                  aria-label={`Go to ${genre} category`}
                >
                  Go to Category
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {/each}
  </div>
</section>

<!-- New Arrival Section -->
<section class="container my-5">
  <h2 class="fw-bold mb-4 text-center">New Arrival</h2>
  <div class="row">
    {#each genres.slice(4, 8) as genre}
      {#if newArrivalBooks[genre]}
        {#each newArrivalBooks[genre] as book}
          <div
            class="col-md-3 col-6 mb-4"
            role="button"
            tabindex="0"
            style="cursor:pointer;"
            aria-label={`Go to ${genre} category`}
            on:click={() => goToCategory(genre)}
            on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') goToCategory(genre); }}
          >
            <div class="card h-100 border-0">
              <img src={book.cover_image_url} class="card-img-top" alt={book.title} />
              <div class="card-body">
                <h5 class="card-title fw-bold">{book.title}</h5>
                <div class="card-text small mb-2">{book.author}</div>
                <div class="fw-bold mb-2">₹{book.price}</div>
                <button
                  class="btn btn-purple w-100"
                  on:click|stopPropagation={() => goToCategory(genre)}
                  aria-label={`Go to ${genre} category`}
                >
                  Go to Category
                </button>
              </div>
            </div>
          </div>
        {/each}
      {/if}
    {/each}
  </div>
</section>

<style>
  .btn-purple {
    background-color: #9A86D1 !important;
    color: #fff !important;
    font-weight: 500;
    border: none;
  }
  .btn-purple:hover {
    background-color: #8057B3 !important;
    color: #fff !important;
  }
  .text-purple {
    color: #9A86D1 !important;
  }
  .border-start {
    border-left: 3px solid #C7A4F7 !important;
  }
  .carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='black' viewBox='0 0 8 8'><path d='M2.5 0l-1.41 1.41L4.67 5l-3.58 3.59L2.5 8l5-5z'/></svg>");
  }
  .carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='black' viewBox='0 0 8 8'><path d='M5.5 0l1.41 1.41L3.33 5l3.58 3.59L5.5 8l-5-5z'/></svg>");
  }
</style>
