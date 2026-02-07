import { Heart } from 'lucide-react';
import { SiInstagram, SiX, SiTelegram } from 'react-icons/si';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-rose-200/50 bg-muted/30 dark:border-rose-900/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/cmrb-logo.dim_200x200.png"
                alt="CMRB Education"
                className="h-10 w-10 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  CMRB Education
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students with quality education and comprehensive learning resources.
            </p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  All Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Arts
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('courses')}
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Commerce
                </button>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Subjects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#Botany"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Botany
                </a>
              </li>
              <li>
                <a
                  href="#Chemistry"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Chemistry
                </a>
              </li>
              <li>
                <a
                  href="#Zoology"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Zoology
                </a>
              </li>
              <li>
                <a
                  href="#Biotechnology"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Biotechnology
                </a>
              </li>
              <li>
                <a
                  href="#Physics"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Physics
                </a>
              </li>
              <li>
                <a
                  href="#Geology"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Geology
                </a>
              </li>
              <li>
                <a
                  href="#HumanBiology"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Human Biology
                </a>
              </li>
              <li>
                <a
                  href="#CurrentAffairs"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Current Affairs
                </a>
              </li>
              <li>
                <a
                  href="#Electronics"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Electronics
                </a>
              </li>
              <li>
                <a
                  href="#Mathematics"
                  className="text-muted-foreground hover:text-rose-600 transition-colors"
                >
                  Mathematics
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose-600 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose-600 transition-colors"
                aria-label="Telegram"
              >
                <SiTelegram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-rose-200/50 pt-8 text-center text-sm text-muted-foreground dark:border-rose-900/50">
          <p>
            © 2026. Built with{' '}
            <Heart className="inline h-4 w-4 text-rose-600 fill-rose-600" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
