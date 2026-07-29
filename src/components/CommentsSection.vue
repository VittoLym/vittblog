<template>
  <section class="max-w-container-max mx-40 px-gutter mt-section-gap">
    <div class="flex items-center gap-4 mb-8">
      <h3 class="font-headline-lg text-on-surface">System Logs: {{ comments.length }} Comments</h3>
      <div class="h-px flex-1 bg-outline-variant/30"></div>
    </div>

    <div class="space-y-6">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment bg-surface-container-low p-6 rounded-xl border border-outline-variant/50 hover:border-primary transition-all duration-300"
      >
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary font-bold">
            {{ comment.initials }}
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono-label-sm text-mono-label-sm text-on-surface">{{ comment.username }}</span>
              <span class="text-[10px] text-on-surface-variant uppercase font-mono-label-sm">{{ comment.time }}</span>
            </div>
            <p class="font-body-md text-on-surface-variant mb-4">{{ comment.text }}</p>
            <button class="flex items-center gap-1 text-primary font-mono-label-sm text-mono-label-xs uppercase hover:translate-x-1 transition-transform">
              <span class="material-symbols-outlined text-[14px]" data-icon="reply">reply</span>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment Input -->
    <div class="mt-8 border-t border-outline-variant pt-8">
      <div class="flex gap-4">
        <div class="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden flex-shrink-0">
          <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSCOsfRKEmWIDZpSrCUPfmE1_bEzFwR2yn-U9n5YvLFPgkG8zFXtI5mUDStpb1E8YwwMuBKhzKDWR0TQIR4s1MYXYRBsIIhGEViLjRNlfCUbRkMdJGaSc_iLHG1gz7bodMki1W8BYdXUh4fwPIMaAqz3S5tWOASzZzZjn-8A70PvATWzSvusbMowip8CgMhH5ewKwgUADTYkQPuIgw6y-LM6EdXRbSH8KT200yXF6A5uL698zqeCJjL5dDvPwgF7T-LWqvCa7IjW4" alt="User" />
        </div>
        <div class="flex-1">
          <textarea
            v-model="newComment"
            class="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-4 font-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[120px] focus:shadow-md"
            placeholder="Join the discussion... (Markdown supported)"
          ></textarea>
          <div class="flex justify-end mt-4">
            <button
              @click="submitComment"
              class="px-6 py-2 bg-slate-900 text-white font-mono-label-sm text-mono-label-sm uppercase rounded-lg hover:bg-black hover:scale-105 active:scale-95 transition-all"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  comments: {
    type: Array,
    required: true
  }
})

const newComment = ref('')

const submitComment = () => {
  if (newComment.value.trim()) {
    // Lógica para enviar comentario
    console.log('New comment:', newComment.value)
    newComment.value = ''
  }
}
</script>
<style scoped>
.comment{
  background-color: #f0f4fa;
  color: #171c20;
}
</style>