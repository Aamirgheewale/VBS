<script lang="ts">
  // Sample data for demonstration
  let featuredBooks = [
    {
      id: 1,
      title: "Financial Feminist",
      author: "Tori Dunlap",
      img: "/assets/bookcover.png"
    },
    {
      id: 2,
      title: "No More Police",
      author: "Mariame Kaba & Andrea J. Ritchie",
      img: "/assets/bookcover.png"
    },
    {
      id: 3,
      title: "I'm Glad My Mom Died",
      author: "Jennette McCurdy",
      img: "/assets/bookcover.png"
    },
    {
      id: 4,
      title: "Nona the Ninth",
      author: "Tamsyn Muir",
      img: "/assets/bookcover.png"
    }
  ];

  let categories = [
    {
      id: 1,
      title: "Harlem Shuffle",
      author: "Colson Whitehead",
      price: 26.92,
      img: "/assets/bookcover.png"
    },
    {
      id: 2,
      title: "Two Old Women",
      author: "Velma Wallis",
      price: 13.95,
      img: "/assets/bookcover.png"
    },
    {
      id: 3,
      title: "Carrie Soto Is Back",
      author: "Taylor Jenkins Reid",
      price: 26.04,
      img: "/assets/bookcover.png"
    },
    {
      id: 4,
      title: "Book Lovers",
      author: "Emily Henry",
      price: 15.81,
      img: "/assets/bookcover.png"
    }
  ];
</script>

<!-- Hero Section -->
 
<div class="container py-5">
  <div class="row align-items-center">
    <!-- Left Section -->
    <div class="col-md-6">
      <div class="ps-3 border-start" style="border-left: 3px solid #C7A4F7;">
        <span class="badge rounded-pill border text-purple mb-3" style="border-color:#C7A4F7; background:transparent;">
          Author of august
        </span>
        <h1 class="fw-bold mb-3" style="font-size:2.5rem; color:#252223;">
          Eric-Emanuel Schmitt
        </h1>
        <p style="color:#252223; font-size:1.07rem;">
          Eric-Emmanuel Schmitt has been awarded more than 20 literary prizes and distinctions,<br/> and in 2001 he received the title of Chevalier des Arts et des Lettres. His books have been translated into over 40 languages.
        </p>
        <a href="/books?author=Eric-Emanuel%20Schmitt" class="btn btn-purple btn-lg mt-3" style="background-color:#9A86D1; color:#fff; font-weight:500;">
          View his books
        </a>
      </div>
    </div>
    <!-- Right Section -->
    <div class="col-md-6 text-end">
      
      <img src="/assets/book1.png" alt="Eric-Emanuel Schmitt book" class="img-fluid mb-2" style="height: 400px;"/>
      
    </div>
  </div>
</div>

<!-- Featured Books Carousel -->
<section class="container my-5">
  <h2 class="text-center mb-4 fw-bold">Featured Books</h2>
  <div class="row justify-content-center">
    {#each featuredBooks as book}
   
    <div class="col-md-3 col-6 mb-4">
        <div class="card h-100 border-0">
          <img src={book.img} class="card-img-top" alt={book.title} />
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">{book.title}</h5>
            <p class="card-text small">{book.author}</p>
          </div>
        </div>
      </div>
      
    {/each}
  </div>
</section>

<!-- Categories Section -->
<section class="container my-5">
  <h2 class="fw-bold mb-4 text-center">Categories</h2>
  <div class="row">
    {#each categories as book}
      <div class="col-md-3 col-6 mb-4">
        <div class="card h-100 border-0">
          <img src={book.img} class="card-img-top" alt={book.title} />
          <div class="card-body">
            <h5 class="card-title fw-bold">{book.title}</h5>
            <div class="card-text small mb-2">{book.author}</div>
            <div class="fw-bold mb-2">₹{book.price}</div>
            <button class="btn btn-purple w-100">
              <i class="bi bi-cart"></i> Add to cart
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- New Arrival Section -->
<section class="container my-5">
  <h2 class="fw-bold mb-4 text-center">New Arrival</h2>
  <div class="row">
    {#each categories as book}
      <div class="col-md-3 col-6 mb-4">
        <div class="card h-100 border-0">
          <img src={book.img} class="card-img-top" alt={book.title} />
          <div class="card-body">
            <h5 class="card-title fw-bold">{book.title}</h5>
            <div class="card-text small mb-2">{book.author}</div>
            <div class="fw-bold mb-2">₹{book.price}</div>
            <button class="btn btn-purple w-100">
              <i class="bi bi-cart"></i> Add to cart
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>




<style>
  /* Custom color for purple buttons and accents */
  
  .btn-purple {
    background-color: #9A86D1 !important;
    color: #fff !important;
    font-weight: 500;
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
</style>
