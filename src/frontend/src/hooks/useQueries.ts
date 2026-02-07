import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Category, Level, type Course, type SubjectIdentifier, type Topic, type TopicIdentifier, type SubjectContent } from '../backend';

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCoursesByCategory(category: Category) {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCoursesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      category,
      level,
    }: {
      title: string;
      description: string;
      category: Category;
      level: Level;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addCourse(title, description, category, level);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useGetTopicsBySubject(subjectId: SubjectIdentifier) {
  const { actor, isFetching } = useActor();

  return useQuery<Array<[TopicIdentifier, Topic]>>({
    queryKey: ['topics', subjectId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTopicsBySubject(subjectId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTopic(topicId: TopicIdentifier) {
  const { actor, isFetching } = useActor();

  return useQuery<Topic>({
    queryKey: ['topic', topicId],
    queryFn: async () => {
      if (!actor) throw new Error('Topic not found');
      return actor.getTopic(topicId);
    },
    enabled: !!actor && !isFetching && !!topicId,
  });
}

export function useGetSubjectContent(subjectId: SubjectIdentifier) {
  const { actor, isFetching } = useActor();

  return useQuery<SubjectContent>({
    queryKey: ['subjectContent', subjectId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getSubjectContent(subjectId);
    },
    enabled: !!actor && !isFetching && !!subjectId,
  });
}

export function useAddTopicToSubject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      subjectId,
      topicId,
      topic,
    }: {
      subjectId: SubjectIdentifier;
      topicId: TopicIdentifier;
      topic: Topic;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addTopicToSubject(subjectId, topicId, topic);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['topics', variables.subjectId] });
      queryClient.invalidateQueries({ queryKey: ['subjectContent', variables.subjectId] });
    },
  });
}
