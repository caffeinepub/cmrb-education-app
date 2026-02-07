import SubjectCard from './SubjectCard';
import { Microscope } from 'lucide-react';

const subjects = [
  {
    id: 'Botany',
    name: 'Botany',
    description: 'The fascinating study of plant life that explores the intricate world of flora from microscopic cellular structures to vast forest ecosystems. Botany encompasses the comprehensive examination of plant anatomy, physiology, genetics, ecology, and evolution, revealing how plants adapt, survive, and thrive in diverse environments.',
    icon: '/assets/generated/botany-icon-transparent.dim_64x64.png',
    gradient: 'from-green-400 to-emerald-600',
    bgColor: 'bg-green-50/50 dark:bg-green-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Chemistry',
    name: 'Chemistry',
    description: 'The central science that bridges physics and biology, exploring the composition, structure, properties, and behavior of matter at the molecular and atomic level. Chemistry investigates how atoms combine to form molecules, how chemical bonds form and break, and how energy changes accompany chemical reactions.',
    icon: '/assets/generated/chemistry-icon-transparent.dim_64x64.png',
    gradient: 'from-blue-400 to-cyan-600',
    bgColor: 'bg-blue-50/50 dark:bg-blue-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Zoology',
    name: 'Zoology',
    description: 'The comprehensive study of animal life that examines the diversity, behavior, physiology, and evolution of creatures ranging from microscopic organisms to complex mammals. Zoology explores animal classification, anatomy, reproduction, development, and the intricate relationships between different species and their environments.',
    icon: '/assets/generated/zoology-icon-transparent.dim_64x64.png',
    gradient: 'from-amber-400 to-orange-600',
    bgColor: 'bg-amber-50/50 dark:bg-amber-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Biotechnology',
    name: 'Biotechnology',
    description: 'The revolutionary field that harnesses biological systems, living organisms, and cellular processes to develop innovative technologies and products that benefit humanity. Biotechnology combines principles from biology, chemistry, physics, and engineering to create solutions for healthcare, agriculture, environmental protection, and industrial applications.',
    icon: '/assets/generated/biotech-icon-transparent.dim_64x64.png',
    gradient: 'from-purple-400 to-pink-600',
    bgColor: 'bg-purple-50/50 dark:bg-purple-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Physics',
    name: 'Physics',
    description: 'The fundamental science that seeks to understand how the universe works by studying matter, energy, motion, forces, space, and time. Physics explores the basic principles governing everything from subatomic particles to galaxies, providing the foundation for all other sciences and technological innovations.',
    icon: '/assets/generated/physics-icon-transparent.dim_64x64.png',
    gradient: 'from-indigo-400 to-violet-600',
    bgColor: 'bg-indigo-50/50 dark:bg-indigo-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Geology',
    name: 'Geology',
    description: 'The Earth science that investigates our planet\'s structure, composition, processes, and history spanning billions of years. Geology examines rocks, minerals, fossils, and landforms to understand how Earth has evolved and continues to change through geological time.',
    icon: '/assets/generated/geology-icon-transparent.dim_64x64.png',
    gradient: 'from-stone-400 to-brown-600',
    bgColor: 'bg-stone-50/50 dark:bg-stone-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'HumanBiology',
    name: 'Human Biology',
    description: 'The comprehensive study of the human body\'s structure, function, and biological processes that sustain life and health. Human Biology explores anatomy, physiology, genetics, development, and the complex interactions between different organ systems that maintain homeostasis.',
    icon: '/assets/generated/human-biology-icon-transparent.dim_64x64.png',
    gradient: 'from-red-400 to-rose-600',
    bgColor: 'bg-red-50/50 dark:bg-red-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'CurrentAffairs',
    name: 'Current Affairs',
    description: 'The essential study of contemporary events, developments, and trends that shape our world, providing students with comprehensive awareness of political, economic, social, and cultural changes occurring at local, national, and international levels. This vital subject keeps students informed about government policies, legislative changes, economic reforms, technological advancements, scientific breakthroughs, and social movements that impact society.',
    icon: '/assets/generated/current-affairs-icon-transparent.dim_64x64.png',
    gradient: 'from-rose-400 to-red-600',
    bgColor: 'bg-rose-50/50 dark:bg-rose-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Electronics',
    name: 'Electronics',
    description: 'Explore the vast field of Electronics, from fundamental concepts to advanced innovations. This subject covers semiconductor devices, digital and analog electronics, signal processing, circuit theory, communications, and circuit design.',
    icon: '/assets/generated/electronics-icon-transparent.dim_64x64.png',
    gradient: 'from-yellow-400 to-orange-600',
    bgColor: 'bg-yellow-50/50 dark:bg-yellow-950/20',
    topics: [],
    useBackendTopics: true,
  },
  {
    id: 'Mathematics',
    name: 'Mathematics',
    description: 'Explore the world of mathematics, from fundamental concepts to advanced theories and applications. This subject covers arithmetic, algebra, calculus, geometry, statistics, probability, trigonometry, number theory, linear algebra, and discrete mathematics.',
    icon: '/assets/generated/mathematics-icon-transparent.dim_64x64.png',
    gradient: 'from-cyan-400 to-blue-600',
    bgColor: 'bg-cyan-50/50 dark:bg-cyan-950/20',
    topics: [],
    useBackendTopics: true,
  },
];

export default function SubjectsSection() {
  return (
    <section id="subjects" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
            <Microscope className="h-4 w-4" />
            Subject Areas
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Explore Our Subjects
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dive deep into specialized fields of science and biotechnology
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} {...subject} />
          ))}
        </div>
      </div>
    </section>
  );
}
