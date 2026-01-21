<template>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  </div>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  </div>
  <div class="skeleton-card">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line short"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-card {
  background: rgba(255,255,255,.03);
  border-radius: 16px;
  padding: 1rem;
  overflow: hidden;
}

.skeleton-image {
  height: 160px;
  border-radius: 12px;
  margin-bottom: 1rem;
  background: linear-gradient(
    90deg,
    #1a1a1a 25%,
    #2a2a2a 37%,
    #1a1a1a 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: .6rem;
}

.skeleton-line {
  height: 14px;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    #1a1a1a 25%,
    #2a2a2a 37%,
    #1a1a1a 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton-line.title {
  width: 70%;
  height: 18px;
}

.skeleton-line.short {
  width: 40%;
}

@keyframes shimmer {
  0% { background-position: 100% 0 }
  100% { background-position: -100% 0 }
}
</style>
