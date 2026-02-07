import { useState } from 'react';
import { ChevronDown, FileText, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useGetSubjectContent } from '@/hooks/useQueries';
import { ExternalBlob } from '../backend';

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
  
  const { data: subjectContent, isLoading, isError, error } = useGetSubjectContent(id, { 
    enabled: useBackendTopics 
  });

  const displayTopics = useBackendTopics && subjectContent?.topics ? subjectContent.topics : null;
  const topicCount = displayTopics ? displayTopics.length : topics.length;
  const fullDescription = useBackendTopics && subjectContent?.description ? subjectContent.description : description;

  const handleStudyMaterialClick = (file: ExternalBlob, title: string) => {
    try {
      // Check if file has getDirectURL method
      if (file && typeof (file as any).getDirectURL === 'function') {
        const fileUrl = (file as any).getDirectURL();
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('Study material file does not have getDirectURL method');
      }
    } catch (error) {
      console.error('Error opening study material:', error);
    }
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
            ) : isError && useBackendTopics ? (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm font-medium">Unable to load topics</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {error instanceof Error ? error.message : 'Please try again later'}
                </p>
              </div>
            ) : displayTopics && displayTopics.length > 0 ? (
              displayTopics.map((topic, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <p className="text-base font-semibold text-foreground">{topic.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {topic.description}
                  </p>
                  {topic.studyMaterials && topic.studyMaterials.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-xs font-medium text-foreground">Study Materials:</p>
                      {topic.studyMaterials.map((material, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleStudyMaterialClick(material.file, material.title)}
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
            ) : useBackendTopics && (!displayTopics || displayTopics.length === 0) ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  No topics available yet for this subject
                </p>
              </div>
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
