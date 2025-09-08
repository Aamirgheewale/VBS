<script>
  let searchQuery = '';
  const handleSearch = () => {
    // Implement book search routing if needed
    window.location.href = `/books?search=${encodeURIComponent(searchQuery)}`;
  };
</script>

<style>
  nav {
    background: white;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem 0;
    font-family: 'Inter', Arial, sans-serif;
  }
  .navbar-content {
    width: 92%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-link {
    display: flex;
    align-items: center;
    height: 48px;
  }
  .logo-img {
    margin: 0px;
    height: 100px;
    margin-right: 2rem;
    transition: box-shadow 0.2s;
  }
  .search-bar-container {
    flex: 1;
    display: flex;
    align-items: center;
    margin-right: 2rem;
    max-width: 340px;
    background: #fff;
    border-radius: 28px;
    border: 2px solid #68217A;
    padding: 0 0.75rem;
    box-sizing: border-box;
    height: 40px;
  }
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
    padding: 0 0.5rem;
    color: #232323;
  }
  .search-btn {
    background: none;
    border: none;
    color: #68217A;
    font-size: 1.3rem;
    cursor: pointer;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .nav-link {
    position: relative;
    padding: 0.5rem 1.2rem;
    border-radius: 22px;
    font-weight: 500;
    color: #232323;
    background: none;
    text-decoration: none;
    transition: background 0.16s, color 0.16s;
  }
  .nav-link.home-active,
  .nav-link:hover {
    background: #9A5CD5;
    color: #fff !important;
  }
</style>

<nav>
  <div class="navbar-content">
    <!-- Logo on left; clicking navigates to homepage -->
    <a href="/" class="logo-link">
      <img src="/assets/VBS.png" alt="Virtual Bookstore Logo" class="logo-img" />
    </a>
    <!-- Search bar -->
    <div class="search-bar-container">
      <input
        type="text"
        class="search-input"
        placeholder="Type any book here"
        bind:value={searchQuery}
        on:keydown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button class="search-btn" type="button" aria-label="Search" on:click={handleSearch}>
        <i class="bi bi-search"></i>
      </button>
    </div>
    <!-- Navigation links -->
    <div class="nav-links">
      <a href="/" class="nav-link home-active">Home</a>
      <a href="/Books" class="nav-link">Categories</a>
      <a href="/library" class="nav-link">My Books</a>
      <a href="/cart" class="nav-link">
        Cart <i class="bi bi-cart"></i>
      </a>
      <a href="/profile" class="nav-link">
        Profile/Login <i class="bi bi-person"></i>
      </a>
    </div>
  </div>
</nav>
