import { BookOpen, Clock } from 'lucide-react';
import { useGetAllCourses } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Category } from '../backend';

const categoryColors: Record<Category, string> = {
  [Category.Science]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  [Category.Arts]: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  [Category.Commerce]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const courseIcons: Record<string, string> = {
  '11th Class': '/assets/generated/11th-class-icon-transparent.dim_64x64.png',
  '12th Class': '/assets/generated/12th-class-icon-transparent.dim_64x64.png',
  'B.A.': '/assets/generated/ba-icon-transparent.dim_64x64.png',
  'B.Sc.': '/assets/generated/bsc-icon-transparent.dim_64x64.png',
  'B.Com.': '/assets/generated/bcom-icon-transparent.dim_64x64.png',
  'B.C.A.': '/assets/generated/bca-icon-transparent.dim_64x64.png',
  'B.B.A.': '/assets/generated/bba-icon-transparent.dim_64x64.png',
  'B.Arch.': '/assets/generated/barch-icon-transparent.dim_64x64.png',
  'B.Tech': '/assets/generated/btech-icon-transparent.dim_64x64.png',
  'B.E.': '/assets/generated/be-icon-transparent.dim_64x64.png',
  'M.Sc.': '/assets/generated/msc-icon-transparent.dim_64x64.png',
  'M.Arch.': '/assets/generated/march-icon-transparent.dim_64x64.png',
  'M.Tech.': '/assets/generated/mtech-icon-transparent.dim_64x64.png',
  'M.E.': '/assets/generated/me-icon-transparent.dim_64x64.png',
  'M.A.': '/assets/generated/ma-icon-transparent.dim_64x64.png',
  'Ph.D.': '/assets/generated/phd-icon-transparent.dim_64x64.png',
  'M.Com.': '/assets/generated/mcom-icon-transparent.dim_64x64.png',
};

export default function CoursesSection() {
  const { data: courses, isLoading } = useGetAllCourses();

  return (
    <section id="courses" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
            <BookOpen className="h-4 w-4" />
            Our Courses
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Featured Courses
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive learning paths designed by experts
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const iconSrc = courseIcons[course.title];
              return (
                <Card
                  key={Number(course.id)}
                  className="group overflow-hidden border-rose-200/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 hover:border-rose-300 dark:border-rose-900/50 dark:hover:border-rose-800"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={categoryColors[course.category]}>
                        {course.category}
                      </Badge>
                      {iconSrc && (
                        <img
                          src={iconSrc}
                          alt={`${course.title} icon`}
                          className="h-10 w-10 object-contain"
                        />
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-rose-600 transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-sm">
                      <Clock className="h-3 w-3" />
                      Self-paced learning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {course.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses available yet</h3>
            <p className="text-muted-foreground">
              Check back soon for new educational content
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
