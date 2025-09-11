<script lang="ts">
  let email = '';
  let success = '';
  let error = '';

  function handleSubmit() {
    error = '';
    success = '';
    if (!email) {
      error = 'Please enter your email address.';
      return;
    }
    // Simulated response
    success = 'If your email is registered, a reset link will be sent!';
  }
</script>
<div class="marquee-container" role="marquee" aria-label="Scrolling welcome message">
  <div class="marquee-content">
    Welcome to Virtual Book Belgaum! Your gateway to a world of knowledge and imagination. Sign up today to explore our vast collection of books and resources!
  </div>
</div>

<img src="assets/VBS.png" alt="VBS Logo" class="login-logo" />

<div class="forgot-container">
  <div class="forgot-left">
    <a href="/login" class="back-link">&lt; Back to login</a>
    <h2 class="title">Forgot your password?</h2>
    <p class="subtitle">Don't worry, happens to all of us. Enter your email below to recover your password</p>
    <form class="forgot-form" on:submit|preventDefault={handleSubmit}>
      <label for="email" class="label">Email</label>
      <input type="email" class="input" bind:value={email} id="email" required />
      <button type="submit" class="submit-btn">Submit</button>
      {#if error}<div class="error">{error}</div>{/if}
      {#if success}<div class="success">{success}</div>{/if}
    </form>
    <div class="social-section">Or Sign up with</div>
    <div class="social-buttons">
      <button type="button" class="social-btn">
        <img src="/assets/facebook.ico" alt="Facebook Logo" style="width:26px;vertical-align:middle; margin-right:6px;" />
        Facebook
      </button>
      <button type="button" class="social-btn">
        <img src="/assets/google.ico" alt="Google Logo" style="width:26px;vertical-align:middle; margin-right:6px;" />
        Google
      </button>
    </div>
  </div>
  <div class="forgot-right">
    <img src="/assets/forget.png" alt="Password Illustration" class="illustration-img" />
    <!-- Use your actual illustration path -->
  </div>
</div>

<style>

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

.forgot-container {
  display: flex;
  background: #e1c4fa;
  max-height: 75vh !important;
  border-radius: 40px;
  max-width: 700px;
  margin: 5rem auto 0 auto;
}
.forgot-left {
  flex: 1.3;
  padding: 4.5rem 2.5rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.forgot-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6d7f5;
  border-radius: 0 40px 40px 0;
  padding: 1.7rem;
}
.illustration-img {
  width: 95%;
  max-width:350px;
  object-fit: contain;
}

.back-link {
  font-size: 1.1rem;
  color: #8454d4;
  margin-bottom: 2rem;

  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
}

.title {
  font-size: 2.05rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #713cb9;
}
.subtitle {
  color: #544883;
  font-size: 1.07rem;
  margin-bottom: 0.5rem;
}
.forgot-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.label {
  font-weight: 540;
  margin-bottom: .3rem;
  color: #593399;
}
.input {
  padding: 0.5rem 0.5rem;
  border-radius: 12px;
  border: none;
  font-size: 1.11rem;
  width: 100%;  
  box-shadow: 0 2px 15px rgba(154,134,209,0.08);
}
.submit-btn {
  margin-top: 0.2rem;
  background: #a16bd2;
  color: #fff;
  font-size: 1.13rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 0.5rem 0;
  transition: background 0.16s;
  cursor: pointer;
} 
.submit-btn:hover {
  background: #834bc2;
}

.error {
  color: #bb2222;
  font-size: 1rem;
  margin-top: 0.6rem;
}
.success {
  color: #228c36;
  font-size: 1rem;
  margin-top: 0.6rem;
}

.social-section {
  margin-bottom: 0.7rem;
  font-size: 1.08rem;
  color: #593399;
  font-weight: 500;
}
.social-buttons {
  display: flex;
  gap: 1.4rem;
}

.social-btn {
  background: #fff;
  border: 1.2px solid #cca5e5;
  border-radius: 12px;
  padding: 0.52rem 2.1rem;
  font-size: 1.07rem;
  font-weight: 550;
  color: #593399;
  box-shadow: 0 2px 10px #be98de41;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: box-shadow 0.17s;
}
.social-btn:hover {
  background: #c7b3e3;
  color: #512872;
  box-shadow: 0 2px 12px #a985c7;
}
</style>
