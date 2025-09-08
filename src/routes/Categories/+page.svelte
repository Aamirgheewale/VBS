<script lang="ts">
  // Sample data
  let categories = [
    {
      name: "Action",
      books: [
        {
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/harlem-shuffle.jpg"
        },
        {
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/two-old-women.jpg"
        },
        {
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/carrie-soto.jpg"
        },
        {
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/book-lovers.jpg"
        }
      ]
    },
    {
      name: "Romance",
      books: [
        // Same books for demo
        {
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/harlem-shuffle.jpg"
        },
        {
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/two-old-women.jpg"
        },
        {
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/carrie-soto.jpg"
        },
        {
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/book-lovers.jpg"
        }
      ]
    },
    {
      name: "Drama",
      books: [
        // Same books for demo
        {
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/harlem-shuffle.jpg"
        },
        {
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/two-old-women.jpg"
        },
        {
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/carrie-soto.jpg"
        },
        {
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/book-lovers.jpg"
        }
      ]
    }
  ];
</script>

<div class="container my-4">
  <h2 class="text-center fw-bold mb-4">Categories</h2>
  {#each categories as category}
    <h4 class="fw-bold mt-5 mb-3 text-center">{category.name}</h4>
    <div class="d-flex align-items-stretch justify-content-center gap-3 mb-5">
      {#each category.books as book}
        <div class="card text-center" style="min-width:210px; max-width:240px;">
          <img src={book.img} alt={book.title} class="card-img-top" style="height:250px; object-fit:cover;" />
          <div class="card-body p-2">
            <h6 class="fw-bold mb-1">{book.title}</h6>
            <div class="text-muted" style="font-size:0.98rem;">{book.author}</div>
            <div class="fw-bold mt-1 mb-2">${book.price}</div>
            <button class="btn btn-purple w-100">
              <i class="bi bi-cart"></i> Add to cart
            </button>
          </div>
        </div>
      {/each}
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
</style>
