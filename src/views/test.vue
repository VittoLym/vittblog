<script setup>
// Acá va lógica JS, estados, fetch, etc.
// por ahora puede estar vacío
</script>

<template>
    <div class="blog-container">
        <main class="max-w-7xl mx-auto px-4 md:px-6 py-10" >
            <section class="mb-16">
                <div class="flex items-end justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                        <span class="mono-label text-[10px] uppercase tracking-widest text-primary font-bold mb-1 block">Live Updates</span>
                        <h2 class="text-3xl font-bold">Trending</h2>
                    </div>
                        <a class="mono-label text-[11px] font-bold uppercase tracking-wider text-primary hover:opacity-80 flex items-center gap-1 group" href="#">
                            View Index
                            <span class="material-symbols-outlined text-xs transition-transform group-hover:translate-x-0.5">chevron_right</span>
                        </a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-2xl hover:shadow-primary/10">
                        <div class="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110 opacity-70" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCz1bojCIF5TB_GzopUuVRN9jpJ8GVbEHCpFDpHPad9Anjnaa8uTF-b8_ef2SLtRcXYHjTf74EdrBrBAGNxkMvBcNXq68VqcVg_5qdASGo9hQHIQcpPcczk-aOJj_4_vEv29YlE444OUT1whwPs5HzcxtMGnGweeE2GfNmRWdyN3YS5JPdm2nHn4T58G2euNUL6OKBe27TsRiigWw5Yrl-mmePRc02xVVxrHKJbMiBChMdNdiBWLEftFi73Fzr0nJIzP3eag94A7Vo");'></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-6 w-full">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="px-2 py-0.5 bg-primary text-white mono-label text-[9px] font-bold uppercase tracking-tighter rounded-sm">01 / Digital</span>
                            </div>
                            <h3 class="text-white text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Future of Digital Design</h3>
                            <div class="flex items-center gap-3 text-slate-400 mono-label text-[10px] uppercase tracking-wider">
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">timer</span>5m Read</span>
                            </div>
                        </div>
                    </div>
                    <div class="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-2xl hover:shadow-primary/10">
                        <div class="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110 opacity-70" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtWTWlrkgQpDQzT2D6xK9_m8m2bDYy9eNeuwc2FEwteOynX6b1aYKvh_6k7SzVSqEZEPWjEKYk6xpIuEs10BjzlWju2T2zShViXNDpv42BoBBlTPEMpbO8ei9N421V35tvkT6VnrHc36rBcZK2fJFzOTZAOZGbzSl7cXaV8biYJAO56N7iPTF_sFzFyBL9ttjKxhPaN-RyHTGGZEw3Wa1AZcjmnAXHXcPIWrpcp1gtlqWXcrDQTdcCsB_8jfMLw6aVSqyLm1e59Aw");'></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        <div class="absolute bottom-0 left-0 p-6 w-full">
                            <div class="flex items-center gap-2 mb-3">
                                <span class="px-2 py-0.5 bg-primary text-white mono-label text-[9px] font-bold uppercase tracking-tighter rounded-sm">02 / Eco</span>
                            </div>
                            <h3 class="text-white text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Green Urbanism 2024</h3>
                            <div class="flex items-center gap-3 text-slate-400 mono-label text-[10px] uppercase tracking-wider">
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">timer</span>8m Read</span>
                            </div>
                        </div>
                    </div>
                    <div class="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 transition-all hover:shadow-2xl hover:shadow-primary/10">
                        <div class="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110 opacity-70" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbC-dINKJ7lDDeCH-O4L7MRVv9_tYt4NNG27h7_O_vIjkozbsKwl-J8y6krHdwoto98BdOMTpDqw8jB2u-4EjPmwq1jPmnrI6_356sC0VDtXBfXGRbnbAtzLEaHDAlhFkz5_UKM3XofAjvnG49xAsJatnK5UorAGWbYKRl9ZS6_vI7KC5p7keSQuEa9qFJicNafBbibzcG_4L4C4GmlPHX3fAFPk4nxm4AtSHAdR1cTdjpqL4fl8ko6u8OPzx0JI3l36_Rf3mLBno");'></div>
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                            <div class="absolute bottom-0 left-0 p-6 w-full">
                                <div class="flex items-center gap-2 mb-3">
                                    <span class="px-2 py-0.5 bg-primary text-white mono-label text-[9px] font-bold uppercase tracking-tighter rounded-sm">03 / Work</span>
                                </div>
                                <h3 class="text-white text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">Hybrid Workplace Trends</h3>
                                <div class="flex items-center gap-3 text-slate-400 mono-label text-[10px] uppercase tracking-wider">
                                    <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs">timer</span>4m Read</span>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="flex items-end justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div>
                        <span class="mono-label text-[10px] uppercase tracking-widest text-primary font-bold mb-1 block">New Releases</span>
                        <h2 class="text-3xl font-bold">Recent Articles</h2>
                    </div>
                    <div class="flex gap-2">
                        <button class="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:text-primary transition-colors">
                            <span class="material-symbols-outlined text-xl">tune</span>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <article class="flex flex-col group">
                        <div class="relative w-full aspect-video overflow-hidden rounded-xl mb-5 bg-slate-100 dark:bg-slate-800">
                            <div class="absolute inset-0 bg-center bg-no-repeat bg-cover grayscale group-hover:grayscale-0 transition-all duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBhmmhQTmhuxZrvz9-TRfvW04NrIEezNOCMslwbrA0RwH235xLXB_EsIW3S51VBl5t0YpTpOkXksE8VlXTFfhs9Rp6vhQSc8NaD70dVg0pyXuiEAuisBY98hrXL11Y7AcqRoxatuktedAI4XAkzay1M27UWsyF3DvYQxYGFLScTI-Mk74yxPwpDFKYwIceCuHqhC-wGXivPpglsbaj5Dq3Ead1gVzTadKPq8kTHAvF9QK5rmeqJlJzoYQOJbBB0cOW7aW0bVkfsmU0");'></div>
                            <div class="absolute top-4 left-4">
                                <span class="px-2 py-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm text-slate-900 dark:text-white mono-label text-[9px] font-bold uppercase tracking-wider rounded border border-slate-200/50 dark:border-slate-700/50">Sustainability</span>
                            </div>
                        </div>
                        <div class="flex flex-col flex-1">
                            <h3 class="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">The Rise of Sustainable Energy in Modern Architecture</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2 mb-5">Exploring how renewable energy sources are becoming the foundation of new urban developments and residential housing projects.</p>
                            <div class="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                                <span class="mono-label text-slate-400 text-[10px] uppercase tracking-wide">Oct 12 / 5m</span>
                                <button class="flex items-center gap-1 text-primary mono-label text-[11px] font-bold uppercase tracking-wider group/btn">
                                    Read File
                                    <span class="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    <article class="flex flex-col group">
                        <div class="relative w-full aspect-video overflow-hidden rounded-xl mb-5 bg-slate-100 dark:bg-slate-800">
                            <div class="absolute inset-0 bg-center bg-no-repeat bg-cover grayscale group-hover:grayscale-0 transition-all duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC54rqVp1ScVwquAXPzbNLtsiMFEy87jtFaa926ZFb9qlfWTuHrqgrzxQ0khIyAM8JidcJOCiWeo15z_7uA4B_2CmLU2F8VYfHAF8rCyUPSsN9hvpw7TU4TO0Tgd98zjKI5lsNOorG99HOISL5LSWxdUzT5OCgVyKavepJBa97dNIRQL1JQ73Jj4WFxhvZl6Y0R9YqJNNF4fbSWUBd1weiIQPjIgnu4ug6G8Th83JCTJHCvVMEvAFb9N9CtOapOv_2n1TJKJmd3uXk");'></div>
                            <div class="absolute top-4 left-4">
                                <span class="px-2 py-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm text-slate-900 dark:text-white mono-label text-[9px] font-bold uppercase tracking-wider rounded border border-slate-200/50 dark:border-slate-700/50">Technology</span>
                            </div>
                        </div>
                        <div class="flex flex-col flex-1">
                            <h3 class="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">Minimalism in Mobile App UI: Less is More</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2 mb-5">Why the trend of minimalist user interfaces continues to dominate the tech world and improves user experience.</p>
                            <div class="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                                <span class="mono-label text-slate-400 text-[10px] uppercase tracking-wide">Oct 10 / 4m</span>
                                <button class="flex items-center gap-1 text-primary mono-label text-[11px] font-bold uppercase tracking-wider group/btn">
                                    Read File
                                    <span class="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    <article class="flex flex-col group">
                        <div class="relative w-full aspect-video overflow-hidden rounded-xl mb-5 bg-slate-100 dark:bg-slate-800">
                            <div class="absolute inset-0 bg-center bg-no-repeat bg-cover grayscale group-hover:grayscale-0 transition-all duration-500" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuApTLCn23zYWUjQUZQPOR6Tod3Oc50SH3-rC_r3jACf42yiL_glmXs97AEm8n0PJGzf8_4DizVPlMGA0PQystlkdkjv8A-IbV4hknB3Mt2N-rDE1X-FKlI_hmSlJgLg23TzoF9LIJnGEzPCxVU4beqsFKgPAwlL6GlTQlI0TZfvl3qf-FsvWaKvva4hpu4CR8tqvttsxbSl4eSSSTXgluroCdXtxRsmcon3KPa-xtDwfdasCk2D8olx4YKpyTVhoSp4m9KTFAxzvbk");'></div>
                            <div class="absolute top-4 left-4">
                                <span class="px-2 py-1 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm text-slate-900 dark:text-white mono-label text-[9px] font-bold uppercase tracking-wider rounded border border-slate-200/50 dark:border-slate-700/50">Lifestyle</span>
                            </div>
                        </div>
                <div class="flex flex-col flex-1">
                <h3 class="text-slate-900 dark:text-slate-50 text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">The Evolution of Community Spaces</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed line-clamp-2 mb-5">How coffee shops and local libraries are being redesigned to foster collaboration in a post-digital age.</p>
                <div class="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                <span class="mono-label text-slate-400 text-[10px] uppercase tracking-wide">Oct 08 / 6m</span>
                <button class="flex items-center gap-1 text-primary mono-label text-[11px] font-bold uppercase tracking-wider group/btn">
                                            Read File
                                            <span class="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                </button>
                </div>
                </div>
                </article>
                </div>
                <div class="flex justify-center mt-16 mb-20">
                    <button class="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl mono-label text-[11px] font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm">
                        Fetch More Articles
                    </button>
                </div>
            </section>
        </main>

    </div>
</template>

<style scoped>
    .blog-container{
        margin-top: 5rem;
    }
    .body {
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3, .tech-heading {
            font-family: 'Space Grotesk', sans-serif;
            letter-spacing: -0.02em;
        }
        .mono-label {
            font-family: 'JetBrains Mono', monospace;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .card-border {
            border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .dark .card-border {
            border: 1px solid rgba(30, 41, 59, 0.5);
        }
</style>
