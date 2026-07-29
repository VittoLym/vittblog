<template>
  <div class="bg-background text-on-background min-h-screen">
    <!-- Reading Progress Bar -->
    <div id="progress-container" class="fixed top-16 left-0 w-full h-1 bg-transparent z-50">
      <div id="reading-progress" class="h-full bg-primary transition-all duration-100" :style="{ width: progress + '%' }"></div>
    </div>
    <main class="pb-24">
      <!-- Featured Hero Section -->
      <div class="relative w-full hero-parallax-container h-[400px] md:h-[500px] overflow-hidden bg-slate-900">
        <!-- Shader Background -->
        <ShaderBackground />
        <!-- Content Overlay -->
        <div class="absolute inset-0 z-10">
          <img
            class="w-full h-[120%] absolute top-[-10%] object-cover grayscale opacity-30 hover:opacity-50 transition-all duration-700 mix-blend-overlay"
            :src="article.heroImage"
            alt="Futuristic digital interface designs"
            ref="heroImg"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20"></div>
        </div>
      </div>

      <!-- Article Container -->
      <article class="max-w-container-max mx-40 px-gutter -mt-20 relative z-20">
        <div class=" article-container bg-surface-container-lowest p-6 md:p-12 border border-outline-variant rounded-xl shadow-sm">
          <!-- Meta Info -->
          <div class="flex items-center gap-2 mb-6 animate-fade-slide-up">
            <span class="bg-primary px-3 py-1 text-green font-mono-label-xs text-mono-label-xs uppercase rounded-[4px]">
              {{ article.category }}
            </span>
            <span class="text-on-surface-variant font-mono-label-sm text-mono-label-sm uppercase">
              {{ article.readTime }} MIN READ
            </span>
          </div>

          <h1 class="font-headline-xl text-headline-xl text-on-surface mb-8 leading-tight max-w-4xl animate-fade-slide-up delay-100">
            {{ article.title }}
          </h1>

          <!-- Author Row -->
          <div class="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-outline-variant mb-10 animate-fade-slide-up delay-200">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full overflow-hidden border border-outline-variant hover:scale-105 transition-transform">
                <img class="w-full h-full object-cover" :src="author.avatar" :alt="author.name" />
              </div>
              <div>
                <p class="font-headline-lg text-on-surface">{{ author.name }}</p>
                <p class="font-mono-label-sm text-mono-label-sm text-on-surface-variant uppercase">
                  {{ author.date }} • {{ author.role }}
                </p>
              </div>
            </div>

            <!-- Social Shares -->
            <div class="flex items-center gap-2">
              <button class="p-2 border border-outline-variant rounded-lg hover:bg-surface-container hover:scale-110 active:scale-95 transition-all duration-200 text-on-secondary-container">
                <span class="material-symbols-outlined text-[20px]" data-icon="share">share</span>
              </button>
              <button class="flex items-center gap-2 px-4 py-2 bg-primary text-blue font-mono-label-sm text-mono-label-sm uppercase rounded-lg hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200">
                <span>Share</span>
                <span class="material-symbols-outlined text-[16px]" data-icon="link">link</span>
              </button>
            </div>
          </div>

          <!-- Body Content -->
          <div class="article-body max-w-3xl mx-auto animate-fade-slide-up delay-300">
            <p v-for="(paragraph, index) in article.paragraphs" :key="index">
              {{ paragraph }}
            </p>

            <blockquote class="hover:bg-primary-container/10 transition-colors duration-300">
              {{ article.quote }}
            </blockquote>

            <pre class="hover:shadow-lg transition-shadow duration-300" v-if="article.codeSnippet">
              <code>{{ article.codeSnippet }}</code>
            </pre>

            <p>{{ article.conclusion }}</p>
          </div>
        </div>
      </article>

      <!-- Comments Section -->
      <CommentsSection :comments="comments" />

      <!-- Related Articles -->
      <RelatedArticles :articles="relatedArticles" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import ShaderBackground from '../components/ShaderBackground.vue'
import CommentsSection from '../components/CommentsSection.vue'
import RelatedArticles from '../components/RelatedArticles.vue'

const router = useRouter()
const route = useRoute()
const id = route.params.id

// Estado
const progress = ref(0)
const heroImg = ref(null)
const imageLoaded = ref(false)
const isLoading = ref(false)

// Datos del artículo
const article = ref({
  category: 'DESIGN',
  readTime: '6',
  title: 'The Future of Digital Design: Systems, Shaders, and the Evolution of Technical Interfaces',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDVK0woXdtlDyx5Nm20qqWd5brUn7p7NB2INjqcPmvyOnmF7-TEt51aeyY_h4_CMvdVEcJJ4q98Jw7z1Q296wIIOHh92mHwHu6dgmoSJIsEzKN2LyGRGp6ovaSv5DRGeDfW1s78nVeEhUnPKBlv4drViHScABVyvFm2A3xSFongPuijaW2aT8NQay73eTviLPjwhc7EixGb4Z-6mHuoM07MEF0wft1bETa7AYhWNWV6AEZsv6nglp6Ad350DY-_spsskhgin42RDA',
  paragraphs: [
    'As we navigate the mid-2020s, the boundary between the technical shell and the user interface continues to blur. What was once a clear separation—logic in the backend, aesthetics in the front—has converged into a unified design philosophy we call "Technical Modernism."',
    'Modern design systems are no longer static libraries of Figma components. They are living, breathing organisms driven by real-time data and environmental variables. We are seeing a shift toward interfaces that react not just to user input, but to system health, network latency, and developer-specific context.',
    'Consider the implementation of real-time shader backgrounds in enterprise dashboards. This isn\'t mere decoration; it\'s high-fidelity sensory feedback. A subtle shift in color temperature can signal a memory leak before the monitoring tools even trigger an alert.'
  ],
  quote: '"The most sophisticated interfaces of tomorrow won\'t be designed in static canvases; they will be compiled from logical constraints and generative algorithms."',
  codeSnippet: `// Dynamic System Color Logic
const updateInterfaceState = (latency) => {
  const primaryColor = latency > 100 ? '#ba1a1a' : '#006591';
  document.documentElement.style.setProperty('--primary', primaryColor);
  console.log(\`[SYSTEM] Interface state optimized for \${latency}ms\`);
};`,
  conclusion: 'In this new era, the role of the designer has shifted to that of a system architect. We are building the rules, not just the pixels. As TechWire Matrix continues to explore these intersections, we\'re finding that the most successful projects are those that embrace the structural discipline of code environments while maintaining the accessibility of high-end SaaS platforms.'
})

const author = ref({
  name: 'Lorenzo Franceschi-Bicchierai',
  role: 'STAFF WRITER',
  date: 'JULY 23, 2026',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVtKGxVs6CCFS5b-dVUh_wJJY4SclpcmvyeuPEhaWnPMwZcve7kjEEcPhuGaZJTKgJt-16c5r2lVxSXZq6bGjqj9pU7WeFeaDDbGdkCSmjjhYhyyhDoFqIqKzJtS1ZNyWPP3XEzPywp6cpboKLiPOl46a-3tsIHPwwakljf6xSZs1Rl_Zc5Hgg2obYIUw4agEeLOWK8-jPsbr35VIJpc5CulWcBNz7xbeCiRAO3oDAJk4XXbT95ANR5lhMcyRInOkSw_jQAgNn924'
})

const comments = ref([
  {
    id: 1,
    initials: 'JD',
    username: 'JACK_DORSEY_99',
    time: '2H AGO',
    text: 'The point about shader backgrounds being sensory feedback is brilliant. We\'ve been experimenting with this at Buzz for AI agent activity visualizations.'
  },
  {
    id: 2,
    initials: 'AS',
    username: 'AMANDA_SILBERLING',
    time: '4H AGO',
    text: 'Great breakdown. I\'m curious how these \'procedural aesthetics\' impact performance on low-end devices. Are we prioritizing visual data over accessibility?'
  }
])

const relatedArticles = ref([
  {
    id: 1,
    title: 'Google is working on a new AI chip designed to make Gemini more efficient',
    category: 'CHIPS',
    author: 'LUCAS ROPEC',
    time: '6H AGO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBDYa9XOmtQLagbNlVG-ktZ1qFP7uoi6FEtfTpCoe6cVkqa0_9iKum-P-VeUqoGmr5_AQ-yGrQLjy5Fy5OEFk0Gyar64s8SMbeJcW2sNtiLFZCXTihCQuXriJr1s_lY0xWiURJJqHKnk_v_vhvYvVadCzsXA5Okj2fJbdgbNjkQMNbNJxzz2hE7HxA0MQz6uwRthxSgpSC2gnaeGCJGJix_auDHvzo4pcf2syDUNW0RbeXzDq9ge1TxZWrF5PahMzrwOpfarZrwmA'
  },
  {
    id: 2,
    title: 'Mobileye CEO Amnon Shashua to step aside as company pushes into robotaxis',
    category: 'ROBOTICS',
    author: 'KIRSTEN KOROSEC',
    time: '4H AGO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAClDTfxwAHNGSGc8CCl33ADV0vJj07ROEZogBiH_GvL2pEBkfFchBElRifWJ8EoNA4U_Dxt7NZLmxGoDPzHh6hzvngJyr9WcEIOESDDf7ILXvazMJ0k4tKpKKkZOR5ZyYBY2bH5LsEjdyd3OiM7WfZvJRB0x84nKIaHV9ZA3QLmuKX6FgVd-JouXetrHg6l6JMepHlLxZVJApCm_38FHbKwc08Vj4QxIEw2c_LaRgSD-w9oSnY4XFsBnC9Fl3dp-w-9gVr-wLb8zg'
  },
  {
    id: 3,
    title: 'How AI guardrails are impeding the work of offensive cybersecurity researchers',
    category: 'SECURITY',
    author: 'LORENZO F-B',
    time: '2H AGO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK3ijYIUtsaaqAXGkKTfNfz0h-ff2BjuAQkMT1fcVneWI2CHz8Z8HtLNMhjzgDClWOlfhru4w08jHLbnYbG7JjOZ2m5QP3uLPhOZj8xFWRUP2jZlD8sDSutwjMPKNyTSfyG5KDQuWkAyIkUu-Xq0fHPfFeAMXHHYgXSLKuLWmKgBmvD36-n2JcwG2ybrDveN7G53g8caX6yKr9ggUohyKQdgBdw6n2DK7YfjBJorHUKiy7wps7coY9--VuOufIt05LxDYLLY1mLrs'
  }
])

// Métodos
const goBack = () => {
  router.back()
}

const updateProgress = () => {
  const scrolled = window.pageYOffset
  const winHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  const totalDocScrollable = docHeight - winHeight
  progress.value = (scrolled / totalDocScrollable) * 100

  // Parallax effect
  if (heroImg.value) {
    heroImg.value.style.transform = `translateY(${scrolled * 0.3}px)`
  }
}

// Lifecycle

onMounted(async() => {
  
  try {
    isLoading.value = true
    imageLoaded.value = false
    const res = await fetch(
        `https://vittblog-backend-1.onrender.com/articles/${id}`
    )
    if (!res.ok) throw new Error("Artículo no encontrado")
    const artRes = await res.json()
    console.log(artRes.image)
    article.value = {
      category: 'DESIGN',
      readTime: '6',
      title: artRes.title,
      heroImage: artRes.image,
      quote: artRes.content,
      }
      author.value = {
        name: artRes.owner_name,
        role: 'STAFF WRITER',
        date: artRes.date,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVtKGxVs6CCFS5b-dVUh_wJJY4SclpcmvyeuPEhaWnPMwZcve7kjEEcPhuGaZJTKgJt-16c5r2lVxSXZq6bGjqj9pU7WeFeaDDbGdkCSmjjhYhyyhDoFqIqKzJtS1ZNyWPP3XEzPywp6cpboKLiPOl46a-3tsIHPwwakljf6xSZs1Rl_Zc5Hgg2obYIUw4agEeLOWK8-jPsbr35VIJpc5CulWcBNz7xbeCiRAO3oDAJk4XXbT95ANR5lhMcyRInOkSw_jQAgNn924'

      }
    isLoading.value= false
  } catch (err) {
      console.log(err)
  }
  useHead({
    title:  `${article.value.title}`,
    meta: [
      {
        name: "description",
        content: `${article.value.quote} | ${author.value.name} | ${author.value.date}`
      }
    ]
  })
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<style scoped>
/* Estilos específicos del artículo */
.article-body h2 {
  font-family: 'Space Grotesk';
  font-size: 24px;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #171c20;
}
.article-container{
  background-color: #f0f4fa;
  color: #171c20;
}
.article-body p {
  font-family: 'Inter';
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #3e4850;
}

.article-body blockquote {
  border-left: 4px solid #006591;
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  color: #006591;
  background-color: #f0f4fa;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.article-body pre {
  color: #89ceff;
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono';
  font-size: 14px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.animate-fade-slide-up {
  opacity: 0;
  animation: fade-slide-up 0.6s cubic-bezier(0.2, 0, 0, 1) forwards;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }

@keyframes fade-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>