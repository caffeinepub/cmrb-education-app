import { useState } from 'react';
import { ChevronDown, FileText, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useGetSubjectContent } from '@/hooks/useQueries';

interface SubjectCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  bgColor: string;
  topics?: string[];
  useBackendTopics?: boolean;
}

export default function SubjectCard({
  id,
  name,
  description,
  icon,
  gradient,
  bgColor,
  topics = [],
  useBackendTopics = false,
}: SubjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: subjectContent, isLoading } = useGetSubjectContent(id);

  const displayTopics = useBackendTopics && subjectContent?.topics ? subjectContent.topics : null;
  const topicCount = displayTopics ? displayTopics.length : topics.length;
  const fullDescription = subjectContent?.description || description;

  const handleStudyMaterialClick = (fileUrl: string, title: string) => {
    window.open(fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      id={id}
      className="group overflow-hidden border-rose-200/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 dark:border-rose-900/50"
    >
      <CardHeader className={`${bgColor} transition-colors`}>
        <div className="mb-3 flex items-center justify-between">
          <div className={`rounded-lg bg-gradient-to-br ${gradient} p-3 shadow-lg`}>
            <img src={icon} alt={name} className="h-8 w-8" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {topicCount} topics
          </Badge>
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {fullDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-rose-200 bg-rose-50/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/20 dark:hover:bg-rose-950/40">
            <span className="text-rose-700 dark:text-rose-400">View Topics</span>
            <ChevronDown
              className={`h-4 w-4 text-rose-600 transition-transform dark:text-rose-400 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-3">
            {isLoading && useBackendTopics ? (
              <div className="flex items-center justify-center rounded-lg border border-border bg-card p-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Loading topics...</span>
              </div>
            ) : displayTopics && displayTopics.length > 0 ? (
              displayTopics.map((topic, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <p className="text-base font-semibold text-foreground">{topic.title}</p>
                  {topic.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {topic.description}
                    </p>
                  )}
                  {topic.studyMaterials && topic.studyMaterials.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs font-medium text-foreground">Study Materials:</p>
                      {topic.studyMaterials.map((material, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleStudyMaterialClick(material.file.getDirectURL(), material.title)}
                          className="flex w-full items-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700 transition-colors hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50"
                        >
                          <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{material.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : topics.length > 0 ? (
              topics.map((topic, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
                >
                  <p className="text-sm text-foreground">{topic}</p>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Topics coming soon
                </p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}

