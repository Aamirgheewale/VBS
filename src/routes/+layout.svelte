<script>
  import Navbar from '../components/navbar.svelte';
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
</style>

<Navbar />

<main>
  <slot />
</main>

<!-- <footer style="text-align:center; margin-top:2rem; color: #888;">
  &copy; 2025 Virtual Bookstore
</footer> -->
<footer class="bg-purple text-white pt-4 pb-2">
  <div class="container">
    <div class="row mb-3">
      <!-- Brand/Info -->
      <div class="col-md-2 mb-3">
        <div class="fw-semibold mb-2">Virtual Book Store <span class="text-white-50">©</span></div>
        <div class="d-flex gap-2 mt-3">
          <a href="/" class="text-white" aria-label="Facebook"><i class="bi bi-facebook fs-4"></i></a>
          <a href="/" class="text-white" aria-label="Instagram"><i class="bi bi-instagram fs-4"></i></a>
          <a href="/" class="text-white" aria-label="Twitter"><i class="bi bi-twitter fs-4"></i></a>
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
        <div class="small"><i class="bi bi-telephone-fill me-2"></i> +445 87 999 000</div>
        <div class="small"><i class="bi bi-clock me-2"></i> Mo-Fri, 9 AM to 11 PM</div>
        <div class="small"><i class="bi bi-envelope me-2"></i> b.world@store.ro</div>
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


