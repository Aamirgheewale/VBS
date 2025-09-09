<script lang="ts">
  import { addToCart } from '$lib/cartStore';
    import { showToast } from '$lib/toastStore';
    import type { Book } from '$lib/types';
  // Sample data
  let categories = [
    {
      name: "Action",
      books: [
        { id: 1,
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/card1.png"
        },
        {id: 2,
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/card2.png"
        },
        {id: 3,
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/card3.png"
        },
        {id: 4,
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/card4.png"
        }
      ]
    },
    {
      name: "Romance",
      books: [
        // Same books for demo
        {id: 1,
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/card4.png"
        },
        {id: 2,
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/card3.png"
        },
        {id: 3,
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/card2.png"
        },
        {id: 4,
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/card1.png"
        }
      ]
    },
    {
      name: "Drama",
      books: [
        // Same books for demo
        {id: 1,
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/card1.png"
        },
        {id: 2,
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/card2.png"
        },
        {id: 3,
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/card3.png"
        },
        {id: 4,
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/card4.png"
        }
      ]
    },
    {
      name: "Fantasy",
      books: [
        // Same books for demo
        {id: 1,
          title: "Harlem Shuffle",
          author: "Colson Whitehead",
          price: 26.92,
          img: "/assets/card1.png"
        },
        {id: 2,
          title: "Two Old Women",
          author: "Velma Wallis",
          price: 13.95,
          img: "/assets/card2.png"
        },
        {id: 3,
          title: "Carrie Soto Is Back",
          author: "Taylor Jenkins Reid",
          price: 26.04,
          img: "/assets/card3.png"
        },
        {id: 4,
          title: "Book Lovers",
          author: "Emily Henry",
          price: 15.81,
          img: "/assets/card4.png"
        }
      ]
    }
  ];
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
</script>

<div class="container my-4">
  <h2 class="fw-bold mb-4">Categories</h2>
  {#each categories as category}
    <h4 class="fw-bold mt-5 mb-3 text-center">{category.name}</h4>
    <div class="d-flex align-items-stretch justify-content-center gap-3 mb-5">
      
        {#each category.books as book}
          <div class="card text-center" style="min-width:210px; max-width:240px;">
            <img src={book.img} alt={book.title} class="card-img-top" style="height:250px; object-fit:cover;" />
            <div class="card-body p-2">
              <h6 class="fw-bold mb-1">{book.title}</h6>
              <div class="text-muted" style="font-size:0.98rem;">{book.author}</div>
              <div class="fw-bold mt-1 mb-2">₹{book.price}</div>
               <button
    class="btn btn-purple w-100"
  on:click={() =>
    handleAddToCart(book)
  }
>
  <i class="bi bi-cart"></i> Add to cart
</button>
            </div>
          </div>
          
      {/each}
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn px-4 fw-semibold view-all" style="border: 2px solid #9A86D1;" 
      on:click={() => window.location.href = `/books?genre=${encodeURIComponent(category.name.toLowerCase())}`}>
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
