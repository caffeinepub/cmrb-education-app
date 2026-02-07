export const idlFactory = ({ IDL }: any) => {
  const UserProfile = IDL.Record({ 'name': IDL.Text });
  const Category = IDL.Variant({
    'Arts': IDL.Null,
    'Commerce': IDL.Null,
    'Science': IDL.Null,
  });
  const Level = IDL.Variant({
    'Postgraduate': IDL.Null,
    'Undergraduate': IDL.Null,
    'Doctoral': IDL.Null,
  });
  const Course = IDL.Record({
    'id': IDL.Nat,
    'title': IDL.Text,
    'priceInINR': IDL.Opt(IDL.Nat),
    'description': IDL.Text,
    'level': Level,
    'subjectId': IDL.Opt(IDL.Text),
    'category': Category,
  });
  const SubjectIdentifier = IDL.Text;
  const ExternalBlob = IDL.Vec(IDL.Nat8);
  const StudyMaterial = IDL.Record({
    'title': IDL.Text,
    'file': ExternalBlob,
  });
  const Topic = IDL.Record({
    'title': IDL.Text,
    'description': IDL.Text,
    'studyMaterials': IDL.Vec(StudyMaterial),
  });
  const SubjectContent = IDL.Record({
    'description': IDL.Text,
    'topics': IDL.Vec(Topic),
  });
  const TopicIdentifier = IDL.Text;
  const UserRole = IDL.Variant({
    'admin': IDL.Null,
    'user': IDL.Null,
    'guest': IDL.Null,
  });
  return IDL.Service({
    'addCourse': IDL.Func(
      [IDL.Text, IDL.Text, Category, Level, IDL.Opt(IDL.Text), IDL.Opt(IDL.Nat)],
      [],
      [],
    ),
    'addDefaultCourses': IDL.Func([], [], []),
    'addTopicToSubject': IDL.Func(
      [SubjectIdentifier, TopicIdentifier, Topic],
      [],
      [],
    ),
    'assignCallerUserRole': IDL.Func([IDL.Principal, UserRole], [], []),
    'courseExists': IDL.Func([Category, Level], [IDL.Bool], ['query']),
    'getAllCourses': IDL.Func([], [IDL.Vec(Course)], ['query']),
    'getAllCoursesBySubject': IDL.Func([IDL.Text], [IDL.Vec(Course)], ['query']),
    'getCallerUserProfile': IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCallerUserRole': IDL.Func([], [UserRole], ['query']),
    'getCourse': IDL.Func([IDL.Nat], [Course], ['query']),
    'getCoursesByCategory': IDL.Func([Category], [IDL.Vec(Course)], ['query']),
    'getSubjectContent': IDL.Func([SubjectIdentifier], [SubjectContent], ['query']),
    'getSubjectsByCategory': IDL.Func([Category], [IDL.Vec(SubjectIdentifier)], ['query']),
    'getTopic': IDL.Func([TopicIdentifier], [Topic], ['query']),
    'getTopicsBySubject': IDL.Func(
      [SubjectIdentifier],
      [IDL.Vec(IDL.Tuple(TopicIdentifier, Topic))],
      ['query'],
    ),
    'getUserProfile': IDL.Func([IDL.Principal], [IDL.Opt(UserProfile)], ['query']),
    'isCallerAdmin': IDL.Func([], [IDL.Bool], ['query']),
    'saveCallerUserProfile': IDL.Func([UserProfile], [], []),
    'setSubjectContent': IDL.Func([SubjectIdentifier, SubjectContent], [], []),
    '_initializeAccessControlWithSecret': IDL.Func([IDL.Text], [], []),
  });
};
