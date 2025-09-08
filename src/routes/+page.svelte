<script lang="ts">
   // Data for each carousel slide
  let authors = [
    {
      badge: "Author of August",
      name: "Eric-Emanuel Schmitt",
      description: "Eric-Emmanuel Schmitt has been awarded more than 20 literary prizes and distinctions, and in 2001 he received the title of Chevalier des Arts et des Lettres. His books have been translated into over 40 languages.",
      btn: "View his books",
      btnLink: "/books?author=Eric-Emanuel%20Schmitt",
      img: "/assets/book1.png"
    },
    {
      badge: "Author of September",
      name: "Tori Dunlap",
      description: "Tori Dunlap is an entrepreneur and author. Her impactful work in financial education led to her bestselling book and wide recognition among financial circles.",
      btn: "View her books",
      btnLink: "/books?author=Tori%20Dunlap",
      img: "/assets/book1.png"
    },
    {
      badge: "Author of October",
      name: "Taylor Jenkins Reid",
      description: "Taylor Jenkins Reid has written multiple critically acclaimed novels, best known for immersive stories and rich, relatable characters enjoyed by readers worldwide.",
      btn: "View her books",
      btnLink: "/books?author=Taylor%20Jenkins%20Reid",
      img: "/assets/book1.png"
    }
  ];
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
 
<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
  <div class="carousel-inner">
    {#each authors as author, i}
      <div class="carousel-item {i === 0 ? 'active' : ''}">
        <div class="container py-5">
          <div class="row align-items-center">
            <!-- Left Section -->
            <div class="col-md-6">
              <div class="ps-3 border-start" style="border-left: 3px solid #C7A4F7;">
                <span class="badge rounded-pill border text-purple mb-3" style="border-color:#C7A4F7; background:transparent;">
                  {author.badge}
                </span>
                <h1 class="fw-bold mb-3" style="font-size:2.5rem; color:#252223;">
                  {author.name}
                </h1>
                <p style="color:#252223; font-size:1.07rem;">
                  {author.description}
                </p>
                <a href={author.btnLink} class="btn btn-purple btn-lg mt-3" style="background-color:#9A86D1; color:#fff; font-weight:500;">
                  {author.btn}
                </a>
              </div>
            </div>
            <!-- Right Section -->
            <div class="col-md-6 text-end">
              <img src={author.img} alt={author.name + ' book'} class="img-fluid mb-2" style="height: 400px;" />
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <!-- Carousel Controls (fixed with correct attributes) -->
  <button class="carousel-control-prev" aria-label="Previous slide" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" aria-label="Next slide" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
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
            <a href="/categories" class="btn btn-purple mt-2">
              Go to Category
            </a>
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
