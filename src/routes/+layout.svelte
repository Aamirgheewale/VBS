<script lang="ts">
  import Navbar from '../components/navbar.svelte';
  import Toasts from '$lib/Toasts.svelte';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { page } from '$app/stores';

  // Svelte store for back to top button
  const showBackToTop = writable(false);

  onMount(() => {
    const navbar = document.querySelector('nav');
    const threshold = navbar ? navbar.offsetHeight : 100;

    function onScroll() {
      showBackToTop.set(window.scrollY > threshold);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>


<style>
   main {
    
     padding: 1rem 2rem;
    max-width: 960px;
    margin: 0 auto; 
  } 
  .bg-purple {
    background-color: #9A86D1;
  }
  .back-to-top {
    position: fixed;
    right: 1.5rem;
    bottom: 1.5rem;
    background: #9A86D1;
    color: white;
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 1.8rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(154, 134, 209, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100;
    transition: opacity 0.3s ease;
  }
  .back-to-top:hover {
    background: #8057B3;
  }
  .back-to-top:hidden {
    opacity: 0;
    pointer-events: none;
  }

</style>
{#if $page.url.pathname !== '/signup' && String($page.url.pathname) !== '/login' && String($page.url.pathname) !== '/forgot'}
  <Navbar />
{/if}

<main>
  <slot />
  <Toasts />
</main>

{#if $showBackToTop}
  <button class="back-to-top" aria-label="Back to top" on:click={scrollToTop}>
    ↑
  </button>
{/if}


<!-- <footer style="text-align:center; margin-top:2rem; color: #888;">
  &copy; 2025 Virtual Bookstore
</footer> -->
<footer class="bg-purple text-white pt-4 pb-2"  >
  <div class="container">
    <div class="row mb-3">
      <!-- Brand/Info -->
      <div class="col-md-2 mb-3">
        <div class="fw-semibold mb-2">Virtual Book Store <span class="text-white-50">©</span></div>
        <div class="d-flex gap-2 mt-3">
          <a href="/" class="text-white" aria-label="Facebook"><i class="bi bi-facebook fs-4"></i></a>
          <a href="/" class="text-white" aria-label="Instagram"><i class="bi bi-instagram fs-4"></i></a>
          
          <a href="https://www.linkedin.com/in/aamirgheewale/" target="_blank" rel="noopener noreferrer" class="text-white" aria-label="LinkedIn"><i class="bi bi-linkedin fs-4"></i></a>
        </div>
      </div>
      <!-- Categories -->
      <div class="col-md-2 mb-3">
        <div class="fw-semibold mb-2">Categories</div>
        <div class="small">Psychology</div>
        <div class="small">Self-Help</div>
        <div class="small">Romance</div>
        <div class="small">Mystery</div>
      </div>
      <!-- For Kids -->
      <div class="col-md-2 mb-3">
        <div class="fw-semibold mb-2">For kids</div>
        <div class="small">Games</div>
        <div class="small">Comics</div>
        <div class="small">Fantasy</div>
      </div>
      <!-- E-Books -->
      <div class="col-md-2 mb-3">
        <div class="fw-semibold mb-2">E-Books</div>
        <div class="small">Fiction</div>
        <div class="small">Historical</div>
        <div class="small">Horror</div>
      </div>
      <!-- Help & Contacts -->
      <div class="col-md-2 mb-3">
        <div class="fw-semibold mb-2">Help & Contacts</div>
        <div class="small"><i class="bi bi-telephone-fill me-2"></i> +91 12345 67890</div>
        <!-- <div class="small"><i class="bi bi-clock me-2"></i> Mo-Fri, 9 AM to 11 PM</div> -->
        <div class="small"><i class="bi bi-envelope me-2"></i> VBS.books@gmail.com</div>
      </div>
      <!-- Request a Call -->
      <div class="col-md-2 mb-3 d-flex flex-column align-items-end">
        <div class="small mb-2" style="max-width:160px;">If you have questions, you can contact us or we will do it for you.</div>
        <button class="btn btn-outline-light btn-sm px-4">Request a call</button>
      </div>
    </div>
    <hr class="opacity-50" />
    <div class="text-center small opacity-75">&copy; All copyrights are reserved. VBS 2025.</div>
  </div>
</footer>


