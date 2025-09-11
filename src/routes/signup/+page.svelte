<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/userStore'; // import store

  // 1. Form fields
  let firstName = "", lastName = "", email = "", phone = "";
  let password = "", confirmPassword = "";
  let agree = false;
  let error = "", success = "";

  // 2. Submit handler
  async function handleSignup() {
    error = "";
    success = "";

    // Basic client validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      error = "Please fill in all fields.";
      return;
    }
    if (password !== confirmPassword) {
      error = "Passwords do not match.";
      return;
    }
    if (!agree) {
      error = "You must agree to the Terms and Privacy Policies.";
      return;
    }

    // Here you POST data to an actual backend API endpoint
    // For now, fake success
    userStore.set({ firstName, lastName, email, phone, loggedIn: true }); // save in store
    success = "Account created! Redirecting...";

    setTimeout(() => goto('/'), 1200); // redirect after short delay for feedback
  }
</script>


<style>
.signup-main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #e5d2f7; */
  padding: 1rem;
}

.signup-box {
  display: flex;
  max-width: 700px;         /* enough width */
  width: 100%;
  background: #c3a6e2;
  border-radius: 24px;
  box-shadow: 0 4px 16px #b09ec480;
  overflow: hidden;
  flex-wrap: nowrap;        /* prevent wrapping */
}

.signup-img {
  background: #fff;
  width: 40%;
  min-width: 220px;         /* ensure minimum image width */
  border-radius: 24px 0 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 1rem;
}

.signup-img img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}

.signup-form {
  flex: 1;
  min-width: 280px;         /* ensure minimum form width */
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0 24px 24px 0;
}


.signup-logo {
 height: 120px;
  width: auto !important;
  position: absolute;
  top: 2rem;
  right: 1.5rem;
  width: 60px;
}

h1 {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  color: #2b2169;
}

.signup-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1rem;
  margin: 1rem 0;
}

.signup-fields input {
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  background: #fff;
  font-size: 0.9rem;
  margin-top: 0;
  box-shadow: 1px 2px 5px rgba(0,0,0,0.08);
  transition: box-shadow 0.3s ease;
}

.signup-fields input:focus {
  outline: none;
  box-shadow: 0 0 7px #8d70f5;
}

.terms-row {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #555;
  display: flex;
  align-items: center;
}

.terms-row input[type="checkbox"] {
  margin-right: 0.7rem;
  width: 16px;
  height: 16px;
}

.signup-btn {
  padding: 0.65rem 0;
  border-radius: 8px;
  background: #9A86D1;
  font-size: 1rem;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.2rem;
  margin-bottom: 0.6rem;
  transition: background 0.27s ease;
}

.signup-btn:disabled {
  background: #bbb;
  cursor: not-allowed;
}

.signup-social {
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
  justify-content: center;
}

.social-btn {
  border: none;
  background: #fff;
  border-radius: 8px;
  padding: 0.4rem 1.6rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px #9A86D1a8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.error {
  color: #bb2222;
  margin-bottom: 0.9rem;
  text-align: left;
  font-size: 0.9rem;
}

.success {
  color: #2b8c34;
  margin-bottom: 0.9rem;
  text-align: left;
  font-size: 0.9rem;
}

.already-row {
  text-align: left;
  margin-top: 0.6rem;
  font-size: 1rem;
  color: #333;
}
  .marquee-container {
     position: fixed;     /* Fix it relative to viewport */
  top: 0;              /* Stick at top (optional) */
  left: 0;
  width: 100vw;        /* Full viewport width */
  overflow: hidden;
  background: #653ae3;
  color: #fff;
  font-weight: 600;
  padding: 0.4rem 0;
  z-index: 1000;       /* On top of other elements */
  box-sizing: border-box;
}
  

  .marquee-content {
    display: inline-block;
    white-space: nowrap;
    padding-left: 100%; /* start off-screen right */
    animation: marquee-scroll 25s linear infinite;
  }

  @keyframes marquee-scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
</style>

<div class="marquee-container" role="marquee" aria-label="Scrolling welcome message">
  <div class="marquee-content">
    Welcome to Virtual Book Belgaum! Your gateway to a world of knowledge and imagination. Sign up today to explore our vast collection of books and resources!
  </div>
</div>


<div class="signup-main">
  <div class="signup-box">
    <img src="assets/VBS.png" alt="VBS Logo" class="signup-logo"/>
    <div class="signup-img">
      <!-- Use your chosen signup illustration! -->
      <img src="assets/signup.png" alt="Signup Visual" style="max-width:100%;height:auto;" />
    </div>
    <form class="signup-form" on:submit|preventDefault={handleSignup}>
      <!-- VBS Logo -->
      
      <h1>Sign up</h1>
      <div style="color:#555;font-size:1.04rem;margin-bottom:0.3rem;">Let's get you all set up so you can access your personal account.</div>
      {#if error}
        <div class="error">{error}</div>
      {/if}
      {#if success}
        <div class="success">{success}</div>
      {/if}
      <div class="signup-fields">
        <input type="text" placeholder="First Name" bind:value={firstName} autocomplete="given-name"/>
        <input type="text" placeholder="Last Name" bind:value={lastName} autocomplete="family-name"/>
        <input type="email" placeholder="Email" bind:value={email} autocomplete="email"/>
        <input type="text" placeholder="Phone No" bind:value={phone} autocomplete="tel"/>
        <input type="password" placeholder="Password" bind:value={password} autocomplete="new-password"/>
        <input type="password" placeholder="Confirm Password" bind:value={confirmPassword} autocomplete="new-password"/>
      </div>
      <div class="terms-row">
        <input type="checkbox" bind:checked={agree} id="agree" style="margin-right: 0.7rem;">
        <label for="agree">
          I agree to all the <span style="color:#653ae3;font-weight:600;">Terms</span> and <span style="color:#653ae3;font-weight:600;">Privacy Policies</span>
        </label>
      </div>
      <button class="signup-btn" type="submit" disabled={!agree || !firstName || !lastName || !email || !phone || !password || !confirmPassword}>Create Account</button>
      <div class="already-row">Already have an account? <a href="/login" style="color:#653ae3;font-weight:600;">Login</a></div>
      <div style="text-align:center;color:#444;font-size:1.02rem; margin:1.1rem 0 0.6rem 0;">Or Sign up with</div>
      <div class="signup-social">
        <button type="button" class="social-btn"><img src="assets/facebook.ico" alt="Facebook Logo" style="width:24px;vertical-align:middle;"/> Facebook</button>
        <button type="button" class="social-btn"><img src="assets/google.ico" alt="Google Logo" style="width:24px;vertical-align:middle;"/> Google</button>
      </div>
    </form>
  </div>
</div>
