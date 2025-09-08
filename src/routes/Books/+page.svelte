<script lang="ts">
  // Sample book data block — replace with API fetching later
  let books = [
    { id: '1', title: "Svelte for Beginners", author: "Jane Doe" },
    { id: '2', title: "Advanced SvelteKit", author: "John Smith" },
    { id: '3', title: "JavaScript Essentials", author: "Alice Johnson" }
  ];
</script>

<style>
  h1 {
    text-align: center;
    margin-top: 2rem;
    color: #68217A;
  }
  ul.book-list {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0;
    list-style: none;
  }
  li.book-item {
    background: #F3E8FF;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  li.book-item:hover {
    background: #DDD0FF;
  }
  .title {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .author {
    color: #6B4C91;
  }
</style>

<h1>Books</h1>

<ul class="book-list">
  {#each books as book}
    <li class="book-item">
      <a 
        href={`/books/${book.id}`} 
        class="book-link"
        style="display:block; text-decoration:none; color:inherit;">
        <div class="title">{book.title}</div>
        <div class="author">by {book.author}</div>
      </a>
    </li>
  {/each}
</ul>

