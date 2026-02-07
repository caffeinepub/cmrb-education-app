import { Heart } from 'lucide-react';
import { SiInstagram, SiX, SiTelegram } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t border-rose-200/50 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:border-rose-900/50 dark:from-rose-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/cmrb-logo.dim_200x200.png"
                alt="CMRB Education"
                className="h-8 w-8 rounded-lg"
              />
              <span className="font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                CMRB Education
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students with quality science education across multiple disciplines.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Courses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#courses" className="hover:text-rose-600 transition-colors">
                  All Courses
                </a>
              </li>
              <li>
                <a href="#subjects" className="hover:text-rose-600 transition-colors">
                  Browse by Subject
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Subjects</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#botany" className="hover:text-rose-600 transition-colors">
                  Botany
                </a>
              </li>
              <li>
                <a href="#chemistry" className="hover:text-rose-600 transition-colors">
                  Chemistry
                </a>
              </li>
              <li>
                <a href="#zoology" className="hover:text-rose-600 transition-colors">
                  Zoology
                </a>
              </li>
              <li>
                <a href="#biotechnology" className="hover:text-rose-600 transition-colors">
                  Biotechnology
                </a>
              </li>
              <li>
                <a href="#Physics" className="hover:text-rose-600 transition-colors">
                  Physics
                </a>
              </li>
              <li>
                <a href="#Geology" className="hover:text-rose-600 transition-colors">
                  Geology
                </a>
              </li>
              <li>
                <a href="#HumanBiology" className="hover:text-rose-600 transition-colors">
                  Human Biology
                </a>
              </li>
              <li>
                <a href="#CurrentAffairs" className="hover:text-rose-600 transition-colors">
                  Current Affairs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://ig.com/CMRBEDUCATION"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose-600 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/CMRBEDUCATION"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose-600 transition-colors"
                aria-label="Follow us on X"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/CMRBEDUCATION"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-rose-600 transition-colors"
                aria-label="Follow us on Telegram"
              >
                <SiTelegram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-rose-200/50 pt-6 dark:border-rose-900/50">
          <p className="text-center text-sm text-muted-foreground">
            © 2025. Built with{' '}
            <Heart className="inline h-4 w-4 text-rose-500 fill-rose-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-rose-600 hover:text-rose-700 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
