import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export interface Course {
    id: bigint;
    title: string;
    description: string;
    level: Level;
    category: Category;
}
export type SubjectIdentifier = string;
export interface SubjectContent {
    description: string;
    topics: Array<Topic>;
}
export interface StudyMaterial {
    title: string;
    file: ExternalBlob;
}
export type TopicIdentifier = string;
export interface Topic {
    title: string;
    description: string;
    studyMaterials: Array<StudyMaterial>;
}
export enum Category {
    Arts = "Arts",
    Commerce = "Commerce",
    Science = "Science"
}
export enum Level {
    Postgraduate = "Postgraduate",
    Undergraduate = "Undergraduate",
    Doctoral = "Doctoral"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCourse(title: string, description: string, category: Category, level: Level): Promise<void>;
    addDefaultCourses(): Promise<void>;
    addTopicToSubject(subjectId: SubjectIdentifier, topicId: TopicIdentifier, topic: Topic): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    courseExists(category: Category, level: Level): Promise<boolean>;
    getAllCourses(): Promise<Array<Course>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCourse(id: bigint): Promise<Course>;
    getCoursesByCategory(category: Category): Promise<Array<Course>>;
    getSubjectContent(subjectId: SubjectIdentifier): Promise<SubjectContent>;
    getSubjectDescription(subjectId: SubjectIdentifier): Promise<string>;
    getTopic(topicId: TopicIdentifier): Promise<Topic>;
    getTopicsBySubject(subjectId: SubjectIdentifier): Promise<Array<[TopicIdentifier, Topic]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setSubjectDescription(subjectId: SubjectIdentifier, description: string): Promise<void>;
}
