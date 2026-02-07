import { useState } from 'react';
import { Menu, X, BookOpen, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const subjects = [
    { name: 'Botany', id: 'botany' },
    { name: 'Chemistry', id: 'chemistry' },
    { name: 'Zoology', id: 'zoology' },
    { name: 'Biotechnology', id: 'biotechnology' },
    { name: 'Physics', id: 'Physics' },
    { name: 'Geology', id: 'Geology' },
    { name: 'Human Biology', id: 'HumanBiology' },
    { name: 'Current Affairs', id: 'CurrentAffairs' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-200/50 bg-white/80 backdrop-blur-lg dark:border-rose-900/50 dark:bg-gray-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
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
              <span className="text-xs text-muted-foreground">Learn & Grow</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection('courses')}
                    className="text-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Courses
                  </Button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30">
                    <FlaskConical className="mr-2 h-4 w-4" />
                    Subjects
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-4">
                      {subjects.map((subject) => (
                        <li key={subject.id}>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => scrollToSection(subject.id)}
                              className="block w-full text-left select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-rose-50 hover:text-rose-600 focus:bg-rose-50 focus:text-rose-600 dark:hover:bg-rose-950/30 dark:focus:bg-rose-950/30"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subject.name}
                              </div>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection('courses')}
                  className="justify-start text-foreground hover:text-rose-600 hover:bg-rose-50"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Courses
                </Button>
                <div className="space-y-2">
                  <p className="px-4 text-sm font-semibold text-muted-foreground">
                    Subjects
                  </p>
                  {subjects.map((subject) => (
                    <Button
                      key={subject.id}
                      variant="ghost"
                      onClick={() => scrollToSection(subject.id)}
                      className="w-full justify-start pl-8 text-foreground hover:text-rose-600 hover:bg-rose-50"
                    >
                      {subject.name}
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
