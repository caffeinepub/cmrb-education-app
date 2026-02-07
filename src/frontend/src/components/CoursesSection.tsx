import { BookOpen, Clock } from 'lucide-react';
import { useGetAllCourses, useGetCoursesBySubject } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '../backend';
import { useState } from 'react';
import { formatINR } from '../utils/formatCurrency';

const categoryColors: Record<Category, string> = {
  [Category.Science]: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  [Category.Arts]: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  [Category.Commerce]: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const courseIcons: Record<string, string> = {
  '11th Class': '/assets/generated/11th-class-icon-transparent.dim_64x64.png',
  '12th Class': '/assets/generated/12th-class-icon-transparent.dim_64x64.png',
  '11th Botany': '/assets/generated/11th-botany-icon-transparent.dim_64x64.png',
  '11th Zoology': '/assets/generated/11th-zoology-icon-transparent.dim_64x64.png',
  '11th Chemistry': '/assets/generated/11th-chemistry-icon-transparent.dim_64x64.png',
  '11th Physics': '/assets/generated/11th-physics-icon-transparent.dim_64x64.png',
  '12th Science': '/assets/generated/12th-science-icon-transparent.dim_64x64.png',
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
  'M.B.A.': '/assets/generated/mba-icon-transparent.dim_64x64.png',
  'M.C.A.': '/assets/generated/mca-icon-transparent.dim_64x64.png',
  'LL.B.': '/assets/generated/llb-icon-transparent.dim_64x64.png',
  'LL.M.': '/assets/generated/llm-icon-transparent.dim_64x64.png',
  'B.Ed.': '/assets/generated/bed-icon-transparent.dim_64x64.png',
  'M.Ed.': '/assets/generated/med-icon-transparent.dim_64x64.png',
  'MBBS': '/assets/generated/mbbs-icon-transparent.dim_64x64.png',
  'B.Pharm': '/assets/generated/bpharm-icon-transparent.dim_64x64.png',
  'M.Pharm': '/assets/generated/mpharm-icon-transparent.dim_64x64.png',
  'Agriculture Science': '/assets/generated/agriculture-science-icon-transparent.dim_64x64.png',
};

const subjects = [
  { id: 'all', name: 'All Courses' },
  { id: 'Botany', name: 'Botany' },
  { id: 'Chemistry', name: 'Chemistry' },
  { id: 'Zoology', name: 'Zoology' },
  { id: 'Biotechnology', name: 'Biotechnology' },
  { id: 'Physics', name: 'Physics' },
  { id: 'Geology', name: 'Geology' },
  { id: 'HumanBiology', name: 'Human Biology' },
  { id: 'CurrentAffairs', name: 'Current Affairs' },
  { id: 'Electronics', name: 'Electronics' },
  { id: 'Mathematics', name: 'Mathematics' },
];

function CourseIcon({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 object-contain"
      onError={() => setHasError(true)}
    />
  );
}

function CourseGrid({ courses, isLoading }: { courses?: any[]; isLoading: boolean }) {
  if (isLoading) {
    return (
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
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-rose-600 dark:text-rose-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No courses available</h3>
        <p className="text-muted-foreground">
          No courses found for this subject yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => {
        const iconSrc = courseIcons[course.title];
        const priceLabel = formatINR(course.priceInINR);
        return (
          <Card
            key={Number(course.id)}
            className="group overflow-hidden border-rose-200/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 hover:border-rose-300 dark:border-rose-900/50 dark:hover:border-rose-800"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={categoryColors[course.category]}>
                    {course.category}
                  </Badge>
                  {priceLabel && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 font-semibold">
                      {priceLabel}
                    </Badge>
                  )}
                </div>
                {iconSrc && (
                  <CourseIcon src={iconSrc} alt={`${course.title} icon`} />
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
  );
}

function SubjectCoursesTab({ subjectId }: { subjectId: string }) {
  const { data: courses, isLoading } = useGetCoursesBySubject(subjectId);
  return <CourseGrid courses={courses} isLoading={isLoading} />;
}

export default function CoursesSection() {
  const { data: allCourses, isLoading: allCoursesLoading } = useGetAllCourses();

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
              Browse Courses
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore courses by subject or view all available programs
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full flex-wrap h-auto gap-2 bg-muted/50 p-2 mb-8">
            {subjects.map((subject) => (
              <TabsTrigger
                key={subject.id}
                value={subject.id}
                className="data-[state=active]:bg-rose-600 data-[state=active]:text-white"
              >
                {subject.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <CourseGrid courses={allCourses} isLoading={allCoursesLoading} />
          </TabsContent>

          {subjects.slice(1).map((subject) => (
            <TabsContent key={subject.id} value={subject.id}>
              <SubjectCoursesTab subjectId={subject.id} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
