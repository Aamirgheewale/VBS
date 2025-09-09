<script lang="ts">
  import { toasts } from './toastStore';
  import { fly, fade } from 'svelte/transition';

//   let $toasts;
//   toasts.subscribe(value => $toasts = value);
</script>

<style>
  .toasts-container {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 9999;
  }
  .toast {
    background: #9A86D1;
    color: white;
    border-radius: 8px;
    padding: 0.75rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 10px rgba(154, 134, 209, 0.4);
    font-weight: 600;
    user-select: none;
  }
  .toast.success {
    background: #4BB543;
  }
  svg {
    width: 20px;
    height: 20px;
    stroke: white;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>

<div class="toasts-container">
  {#each $toasts as toast (toast.id)}
    <div class={`toast ${toast.type}`} in:fly="{{ x: 200, duration: 300 }}" out:fade>
      <svg viewBox="0 0 24 24" fill="none">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      {toast.message}
    </div>
  {/each}
</div>
