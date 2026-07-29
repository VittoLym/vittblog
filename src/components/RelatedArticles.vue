<template>
  <section class="max-w-container-max mx-20 px-gutter mt-section-gap mb-12">
    <h3 class="font-headline-lg text-on-surface mb-8">Related Documentation</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap gap-4">
      <div
        v-for="article in articles"
        :key="article.id"
        class="group cursor-pointer"
      >
        <div class="relative aspect-[16/10] mb-4 overflow-hidden rounded-lg border border-outline-variant">
          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            :src="article.image"
            :alt="article.title"
          />
          <span class="absolute top-3 left-3 bg-surface/80 backdrop-blur-md px-2 py-1 font-mono-label-xs text-mono-label-xs uppercase rounded-[4px] border border-outline-variant group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            {{ article.category }}
          </span>
        </div>
        <h4 class="font-headline-lg text-on-surface group-hover:text-primary transition-colors line-clamp-2">
          {{ article.title }}
        </h4>
        <p class="font-mono-label-sm text-mono-label-sm text-on-surface-variant mt-2 uppercase">
          {{ article.author }} • {{ article.time }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>