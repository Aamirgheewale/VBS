<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/userStore';


  let email = "";
  let password = "";
  let rememberMe = false;
  let error = "";
  let success = "";

  async function handleLogin() {
    error = "";
    success = "";

    if (!email || !password) {
      error = "Please enter both email and password.";
      return;
    }

     const userData = {
    firstName: "User",      // replace with real user first name
    lastName: "",  
    email: email,
    phone: "",
    loggedIn: true
  };

    userStore.set(userData);


    // TODO: Add actual authentication logic here (e.g., API call)
    // Simulate success for demo
    success = "Login successful! Redirecting...";

    // Redirect to home or dashboard after short delay
    setTimeout(() => goto('/'), 1200);
  }
</script>

<div class="marquee-container" role="marquee" aria-label="Scrolling welcome message">
  <div class="marquee-content">
    Welcome to Virtual Book Belgaum! Your gateway to a world of knowledge and imagination. Sign up today to explore our vast collection of books and resources!
  </div>
</div>

<img src="assets/VBS.png" alt="VBS Logo" class="login-logo" />
<div class="login-main">
  <div class="login-box">
    <form class="login-form" on:submit|preventDefault={handleLogin}>
      <h1>Login</h1>
      <p>Login to access your account</p>

      {#if error}
        <div class="error">{error}</div>
      {/if}
      {#if success}
        <div class="success">{success}</div>
      {/if}

      <input type="email" placeholder="Email" bind:value={email} required />
      <input type="password" placeholder="Password" bind:value={password} required />

      <div class="remember-row">
        <label>
          <input type="checkbox" bind:checked={rememberMe} />
          Remember me
        </label>
        <a href="/forgot" class="forgot-link">Forgot Password</a>
      </div>

      <button class="login-btn" type="submit">Login</button>

      <div style="margin-top: 0.6rem;">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>

      <div class="social-row">Or Sign up with</div>

      <div class="login-social">
        <button type="button" class="social-btn">
          <img src="/assets/facebook.ico" alt="Facebook Logo" style="width:24px;vertical-align:middle;" />
          Facebook
        </button>
        <button type="button" class="social-btn">
          <img src="/assets/google.ico" alt="Google Logo" style="width:24px;vertical-align:middle;" />
          Google
        </button>
      </div>
    </form>

    <div class="login-img">
      <img src="assets/login.png" alt="Login Illustration" />
    </div>
  </div>
</div>

<style>
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

  .login-main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background: #fff;
    padding: 2rem 0 0 3rem;
    position: relative;
    margin-top: 3rem; /* Adjust for marquee height */ 
  }

  .login-logo {
    /* width: 130px;
    height: auto;
    margin-bottom: 1rem; */
    
    height: 120px;
  width: auto !important;
  position: absolute;
  top: 2rem;
  right: 1.5rem;
  width: 60px;
  }

  .login-box {
    display: flex;
    max-width: 900px;
    width: 100%;
    background: #e7cbfb;
    border-radius: 48px;
    box-shadow: 0 8px 32px #b09ec4a8;
    overflow: hidden;
  }

  .login-form {
    flex: 1;
    padding: 2.6rem 3rem 2.6rem 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 48px 0 0 48px;
    background: transparent;
    justify-content: center;
    position: relative;
  }

  .login-form h1 {
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
  }

  .login-form p {
    color: #434343;
    margin-bottom: 1.5rem;
    font-size: 1.08rem;
  }

  .login-form input[type="email"],
  .login-form input[type="password"] {
    border: none;
    border-radius: 9px;
    padding: 0.8rem 1rem;
    background: #fff;
    font-size: 1.08rem;
    margin-bottom: 1.1rem;
  }

  .remember-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.4rem;
  }

  .login-btn {
    padding: 0.85rem 0;
    border-radius: 10px;
    background: #9A86D1;
    font-size: 1.18rem;
    color: #fff;
    border: none;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 1.2rem;
    transition: background 0.27s;
  }

  .login-btn:hover {
    background: #7f5cd5;
  }

  .login-form a {
    color: #653ae3;
    font-weight: 600;
    text-decoration: none;
  }

  .social-row {
    text-align: center;
    color: #444;
    font-size: 1.02rem;
    margin: 1.1rem 0 0.6rem 0;
  }

  .login-social {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .social-btn {
    border: 1px solid #ccd;
    background: #fff;
    border-radius: 8px;
    padding: 0.55rem 2.2rem;
    font-size: 1.08rem;
    cursor: pointer;
    box-shadow: 0 2px 8px #9A86D1a8;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .login-img {
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 0 48px 48px 0;
    padding: 2rem 1.5rem;
  }

  .login-img img {
    max-width: 100%;
    height: auto;
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
</style>
