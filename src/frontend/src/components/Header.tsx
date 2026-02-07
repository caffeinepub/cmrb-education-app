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
    { name: 'Botany', id: 'Botany' },
    { name: 'Chemistry', id: 'Chemistry' },
    { name: 'Zoology', id: 'Zoology' },
    { name: 'Biotechnology', id: 'Biotechnology' },
    { name: 'Physics', id: 'Physics' },
    { name: 'Geology', id: 'Geology' },
    { name: 'Human Biology', id: 'HumanBiology' },
    { name: 'Current Affairs', id: 'CurrentAffairs' },
    { name: 'Electronics', id: 'Electronics' },
    { name: 'Mathematics', id: 'Mathematics' },
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
          <nav className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <button
                    onClick={() => scrollToSection('courses')}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Courses
                  </button>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Subjects</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {subjects.map((subject) => (
                        <li key={subject.id}>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => scrollToSection(subject.id)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left"
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('courses')}
                  className="flex items-center gap-2 text-lg font-medium hover:text-rose-600 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  Courses
                </button>
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                    <FlaskConical className="h-4 w-4" />
                    Subjects
                  </div>
                  <div className="flex flex-col gap-2 pl-6">
                    {subjects.map((subject) => (
                      <button
                        key={subject.id}
                        onClick={() => scrollToSection(subject.id)}
                        className="text-left text-sm hover:text-rose-600 transition-colors py-1"
                      >
                        {subject.name}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
