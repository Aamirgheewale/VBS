<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Simulate user authentication and profile
  let user = { firstName: 'xyz', lastName: 'xyz', email: 'xyz@gmail.com', phone: '+91 12345 67890', loggedIn: true };

  // Track tab selection and edit mode
  let activeTab = 'personal';
  let editMode = false;
  let tempUser = { ...user };

  function selectTab(tab: string) {
    activeTab = tab;
    editMode = false;
    tempUser = { ...user };
  }

  function startEdit() {
    editMode = true;
    tempUser = { ...user };
  }
  function cancelEdit() {
    editMode = false;
    tempUser = { ...user };
  }
  function saveChanges() {
    user = { ...tempUser, loggedIn: user.loggedIn };
    editMode = false;
  }

  // Simulate Auth: when not logged in, show Login/Profile button
  $: initial = user.loggedIn ? user.firstName.charAt(0).toUpperCase() : null;
</script>

<style>
  .profile-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:2.7rem; margin-top: 2.3rem;}
  .welcome { font-size:1.08rem; color:#9A86D1; font-weight: 500;}
  .tabs { display: flex; gap: 2rem; margin-bottom: -1px; }
  .tab {
    position:relative;
    padding: 0.85rem 2rem 0.85rem 2rem;
    background: none;
    border: none;
    font-size: 1.11rem; 
    font-weight: 620;
    color: #232323;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    border-radius: 18px 18px 0 0;
  }
  .tab.active {
    background: #9A5CD5;
    color: #fff;
    box-shadow: 0 2px 8px rgba(154,134,209,0.07);
    z-index: 2;
  }
  .tab:hover:not(.active) {
    background: #eee;
    color: #8057B3;
  }
  .profile-card {
    border:2px solid #232323;
    border-radius:23px;
    padding:2.5rem;
    background: #fff;
    max-width: 830px;
    margin: 0 auto 3rem auto;
    margin-top:0.5rem;
    box-shadow: 0 2px 18px rgb(154 134 209 / 0.04);
    position:relative;
  }
  .edit-btn {
    position:absolute;
    right:1rem; top:1.2rem;
    background:#fff;
    border:1.5px solid #bbb;
    border-radius:9px;
    padding:0.44rem 1.1rem;
    box-shadow: 1px 2px 5px rgba(0,0,0,0.07);
    font-weight:580;
    cursor:pointer;
  }
  .edit-btn:hover {
     background:#f9f9fa; 
     border-color:#999;
     background: #8057B3;
     color: #fff;   
    }
  .fields-row { display:flex; align-items:center; justify-content: space-around; margin-bottom:2.4rem; }
  .field-block { display:flex; flex-direction:column; align-items:center; min-width:270px;}
  .field-label { font-weight:530; margin-bottom:0.5rem;}
  input, .read-view {
    padding: 0.50rem 1.2rem;
    border-radius:7px;
    border:1.2px solid #bbb;
    font-size:1.08rem;
    min-width:170px;
    text-align: center;
    box-shadow: 2px 4px 7px rgba(0,0,0,0.08);
    margin-bottom:0.5rem;
    background:#fff;
  }
  .read-view {
    font-weight:550;
    border:none; pointer-events:none;
    background: #f9f9fa;
  }
  .actions-row { display:flex; justify-content:center; gap:1.5rem; margin-top:1.9rem;}
  .btn-purple { background:#9A86D1; color:#fff; padding:0.7rem 2.8rem; border-radius:7px; font-weight:600; border:none;}
  .btn-outline-dark { background:#fff; color:#232323; border:1.5px solid #232323; border-radius:7px; font-weight:580; padding:0.7rem 2.8rem;}
  .btn-purple:disabled {opacity:0.52; cursor:not-allowed;}
  .initial-badge {
    background: #9A86D1;
    color: #fff; font-weight: bold;
    padding: 0.2rem 0.85rem;
    border-radius: 50%;
    margin-left: 1rem;
    font-size: 1.1rem;
    vertical-align: middle;
  }
</style>

<div class="profile-header">
  <div style="font-size:1.15rem;">Manage My Account</div>
  {#if user.loggedIn}
    <span class="welcome">Welcome! {user.firstName}
      <span class="initial-badge">{initial}</span>
    </span>
  {:else}
    <button class="btn btn-outline-dark">Profile/Login</button>
  {/if}
</div>

<div class="tabs">
  <button class="tab {activeTab === 'personal' ? 'active' : ''}" on:click={() => selectTab('personal')}>Personal Details</button>
  <button class="tab {activeTab === 'purchased' ? 'active' : ''}" on:click={() => selectTab('purchased')}>Purchased Books</button>
  <button class="tab {activeTab === 'mybooks' ? 'active' : ''}" on:click={() => selectTab('mybooks')}>My Books</button>
  <button class="tab {activeTab === 'wishlist' ? 'active' : ''}" on:click={() => selectTab('wishlist')}>
    Wishlist <i class="bi bi-heart" style="margin-left:6px;"></i>
  </button>
</div>

{#if activeTab === 'personal'}
  <div class="profile-card">
  {#if !editMode}
  <button class="edit-btn" on:click={startEdit}>Edit Details</button>
{/if}

    <div class="fields-row">
      <div class="field-block">
        <label class="field-label" for="firstName">First Name</label>
        {#if editMode}
          <input type="text" bind:value={tempUser.firstName} />
        {:else}
          <div class="read-view">{user.firstName}</div>
        {/if}
      </div>
      <div class="field-block">
        <label class="field-label" for="email">Email</label>
        {#if editMode}
          <input type="email" bind:value={tempUser.email} />
        {:else}
          <div class="read-view">{user.email}</div>
        {/if}
      </div>
    </div>
    <div class="fields-row">
      <div class="field-block">
        <label class="field-label" for="lastName">Last Name</label>
        {#if editMode}
          <input type="text" bind:value={tempUser.lastName} />
        {:else}
          <div class="read-view">{user.lastName}</div>
        {/if}
      </div>
      <div class="field-block">
        <label class="field-label" for="phoneNo">Phone No</label>
        {#if editMode}
          <input type="tel" bind:value={tempUser.phone} />
        {:else}
          <div class="read-view">{user.phone}</div>
        {/if}
      </div>
    </div>
    {#if editMode}
      <div class="actions-row">
        <button class="btn btn-outline-dark" on:click={cancelEdit}>Cancel</button>
        <button class="btn btn-purple" on:click={saveChanges}>Save Changes</button>
      </div>
    {/if}
  </div>
{/if}
