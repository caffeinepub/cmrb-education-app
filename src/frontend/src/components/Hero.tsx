import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-rose-900/20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjk0YjMiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              <Sparkles className="h-4 w-4" />
              Welcome to CMRB Education
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                Discover the Beauty
              </span>
              <br />
              <span className="text-foreground">of Science</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Explore comprehensive courses in Botany, Chemistry, Zoology, and
              Biotechnology. Learn from expert-curated content designed to inspire
              and educate.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById('courses')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-xl hover:shadow-rose-500/40 hover:scale-105"
              >
                Browse Courses
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById('subjects')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="rounded-lg border-2 border-rose-300 bg-white px-6 py-3 font-semibold text-rose-700 transition-all hover:bg-rose-50 dark:border-rose-700 dark:bg-transparent dark:text-rose-400 dark:hover:bg-rose-950/30"
              >
                Explore Subjects
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 opacity-20 blur-2xl"></div>
            <img
              src="/assets/generated/hero-banner.dim_1024x400.png"
              alt="Education Hero"
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
