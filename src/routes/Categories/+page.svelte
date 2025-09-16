<script lang="ts">
  import { onMount } from 'svelte';
  import { addToCart } from '$lib/cartStore';
  import { showToast } from '$lib/toastStore';
  import type { Book } from '$lib/types';
  import { userStore } from '$lib/userStore';
  import { get } from 'svelte/store';


  interface Category {
    id: number;
    name: string;
    description?: string;
  }
  interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    img?: string;
  }

  let categories: Category[] = [];
  let categoryBooks: { [key: number]: Book[] } = {};

  async function loadCategories() {
    const res = await fetch('/api/categories');
    if (res.ok) {
      categories = await res.json();
    } else {
      console.error('Failed to load categories');
    }
  }

  async function loadBooksForCategory(categoryId: number) {
    const res = await fetch(`/api/categories/books?category_id=${categoryId}`);
    if (res.ok) {
      categoryBooks[categoryId] = await res.json();
    } else {
      console.error(`Failed to load books for category ${categoryId}`);
    }
  }

onMount(async () => {
  await loadCategories();
  await loadPreviews();
})

  // Load books when user clicks "View All" button if not already loaded
  // async function handleViewAll(category: Category) {
  //   if (!categoryBooks[category.id]) {
  //     await loadBooksForCategory(category.id);
  //   }
  // }

  function handleViewAll(category: Category) {
  const categoryName = encodeURIComponent(category.name.toLowerCase());
  window.location.href = `/books?category=${categoryName}`;
}

async function loadPreviews() {
  for (const category of categories) {
    await loadBooksForCategory(category.id);
  }
}



  // function handleAddToCart(book: Book) {
  //   addToCart({
  //     id: String(book.id),
  //     title: book.title,
  //     author: book.author,
  //     price: book.price,
  //     image: book.img ?? ''
  //   });
  //   showToast('Item added to cart', 'success');
  // }
function handleAddToCart(book: Book) {
  const user = get(userStore);
  if (!user?.loggedIn) {
    showToast('Please log in to add items to your cart', 'error');
    return;
  }

  addToCart({
    id: String(book.id),
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.img ?? '',
  },1);
  showToast('Item added to cart', 'success');
}
</script>

<div class="container my-4">
  <h2 class="fw-bold mb-4">Categories</h2>
  {#each categories as category}
    <h4 class="fw-bold mt-5 mb-3 text-center">{category.name}</h4>
    <div class="d-flex align-items-stretch justify-content-center gap-3 mb-5">
      {#if categoryBooks[category.id]}
        {#each categoryBooks[category.id] as book}
          <div class="card text-center" style="min-width:210px; max-width:240px;">
            <img src={book.img} alt={book.title} class="card-img-top" style="height:250px; object-fit:cover;" />
            <div class="card-body p-2">
              <h6 class="fw-bold mb-1">{book.title}</h6>
              <div class="text-muted" style="font-size:0.98rem;">{book.author}</div>
              <div class="fw-bold mt-1 mb-2">₹{book.price}</div>
              <button disabled={!$userStore.loggedIn} class="btn btn-purple w-100" on:click={() => handleAddToCart(book)} >
                <i class="bi bi-cart"></i> Add to cart
              </button>
            </div>
          </div>
        {/each}
      
        
      {/if}
      
    </div>
    <div class="d-flex justify-content-center mb-4">
    <button class="btn px-4 fw-semibold view-all" style="border: 2px solid #9A86D1;" 
                on:click={() => handleViewAll(category)}>
          View All
        </button>
  </div>
        {/each}
</div>

<style>
  .btn-purple {
    background-color: #9A86D1 !important;
    color: #fff !important;
    border: none;
    font-weight: 500;
  }
  .btn-purple:hover {
    background-color: #8057B3 !important;
  }
  .view-all:hover {
    background-color: #9A86D1 !important;
    color: #fff !important;
  }
</style>
