<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { userStore } from '$lib/userStore';
  import { goto } from '$app/navigation';
  import type { User } from '$lib/userStore';
import { allBooksByGenre } from '$lib/bookData';
import type {Book} from '$lib/bookData';

const bookList: { title: string; genre: string }[] = [];

for (const genre in allBooksByGenre) {
  allBooksByGenre[genre].forEach((book) => {
    bookList.push({ title: book.title, genre });
  });
}

let suggestions: { title: string; genre: string }[] = [];

$: suggestions = searchQuery
  ? bookList.filter(book => book.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
  : [];

function selectSuggestion(book: { title: string; genre: string }) {
  goto(`/books?genre=${encodeURIComponent(book.genre)}`);
  searchQuery = '';
  suggestions = [];
}

  let searchQuery = '';

  const genres: string[] = [
    "Action",
    "Drama",
    "Romance",
    "Fantasy",
    "Mystery",
    "Comedy",
    "Historical",
    "Science Fiction",
    "Horror"
  ];

  const handleSearch = () => {
    window.location.href = `/books?search=${encodeURIComponent(searchQuery)}`;
  };

  const currentPath = derived(page, ($page) => $page.url.pathname.toLowerCase());

  function goToGenre(genre: string) {
    window.location.href = `/books?genre=${encodeURIComponent(genre)}`;
  }

  let user: User = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  loggedIn: false
};
  const unsubscribe = userStore.subscribe(value => user = value);

  function onProfileClick() {
    if (user?.loggedIn) {
      goto('/Profile');    // Go to profile page if logged in
    } else {
      goto('/signup');     // Else go to signup/login page
    }
  }
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
  user-select: none;
  cursor: pointer;
}

.nav-link:hover {
  background: #9A5CD5;
  color: #fff !important;
}

.nav-link.active {
  background: #9A5CD5;
  color: #fff !important;
}

/* Dropdown styles */
.nav-dropdown {
  position: relative;
}

.nav-dropdown > .nav-link {
  cursor: pointer;
}

.nav-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 185px;
  background: #fff;
  box-shadow: 0 4px 18px rgba(80, 60, 140, 0.13);
  border-radius: 16px;
  border: 1px solid #ececec;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: all 0.25s cubic-bezier(.36,1.39,.57,1);
  z-index: 100;
}

.nav-dropdown:hover > .nav-dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-dropdown-menu li {
  padding: 0;
  list-style: none;
}

.nav-dropdown-menu button {
  width: 100%;
  background: none;
  border: none;
  padding: 0.6rem 1.1rem;
  color: #68217A;
  font-weight: 500;
  font-family: inherit;
  font-size: 1rem;
  text-align: left;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.17s, color 0.15s;
}

.nav-dropdown-menu button:hover,
.nav-dropdown-menu button:focus {
  background: #9A5CD5;
  color: #fff;
  outline: none;
}

.profile-btn:hover {
  background: #9A5CD5; 
  color: #fff !important;
}

.dropdown {
  position: absolute;
  top: 42px; /* Adjust to just below search bar height */
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  max-height: 180px;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  margin: 0;
  list-style: none;
}

.dropdown li {
  padding: 0.5rem 1rem;
  color: #68217A;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.2s;
}

.dropdown li:hover {
  background-color: #9a5cd5;
  color: #fff;
}
.dropdown-item {
  background: tra;
  }

  
    .dropdown-btn {
  background: transparent;
  border: none;
  box-shadow: none;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  color: #68217A;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1rem;
  transition: background-color 0.2s, color 0.2s;
}

.dropdown-btn:hover,
.dropdown-btn:focus {
  background-color: #9a5cd5;
  color: #fff;
  outline: none;
}

  
</style>

<nav>
  <div class="navbar-content">
    <a href="/" class="logo-link">
      <img src="/assets/VBS.png" alt="Virtual Bookstore Logo" class="logo-img" />
    </a>
    <div class="search-bar-container" style="position: relative;">
  <input
    type="text"
    class="search-input"
    placeholder="Type any book here"
    bind:value={searchQuery}
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button class="search-btn"  type="button" aria-label="Search" on:click={handleSearch}>
    <i class="bi bi-search"></i>
  </button>

{#if suggestions.length > 0}
  <ul class="dropdown">
    {#each suggestions as book}
      <li class="dropdown-item">
        <button 
          type="button"
          on:click={() => selectSuggestion(book)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectSuggestion(book);
            }
          }}
          class="dropdown-btn"
        >
          {book.title}
        </button>
      </li>
    {/each}
  </ul>
{/if}


</div>
    <div class="nav-links">
      <a href="/" class="nav-link" class:active={$currentPath === '/'}>Home</a>
      <a href="/Categories" class="nav-link" class:active={$currentPath === '/categories'}>Categories</a>

      <div class="nav-dropdown">
        <span class="nav-link">
          Books <i class="bi bi-chevron-down" style="margin-left: 6px;"></i>
        </span>
        <ul class="nav-dropdown-menu">
          {#each genres as genre}
            <li>
              <button type="button" on:click={() => goToGenre(genre)}>
                {genre}
              </button>
            </li>
          {/each}
        </ul>
      </div>

      <a href="/cart" class="nav-link" class:active={$currentPath === '/cart'}>
        Cart <i class="bi bi-cart"></i>
      </a>

      <!-- Updated Profile/Login button -->
      <button class="nav-link profile-btn" on:click={onProfileClick}>
        {#if user?.loggedIn}
          {user.firstName.charAt(0).toUpperCase()} 
        {:else}   
          Profile/Login 
        {/if}
      </button>
    </div>
  </div>
</nav>
