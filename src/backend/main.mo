import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Course = {
    id : Nat;
    title : Text;
    description : Text;
    category : Category;
    level : Level;
  };

  type Category = {
    #Science;
    #Arts;
    #Commerce;
  };

  type Level = {
    #Undergraduate;
    #Postgraduate;
    #Doctoral;
  };

  type Subject = {
    #Botany;
    #Chemistry;
    #Zoology;
    #Biotechnology;
    #Physics;
    #Geology;
    #CurrentAffairs;
    #HumanBiology;
  };

  type StudyMaterial = {
    title : Text;
    file : Storage.ExternalBlob;
  };

  public type Topic = {
    title : Text;
    description : Text;
    studyMaterials : [StudyMaterial];
  };

  public type SubjectContent = {
    description : Text;
    topics : [Topic];
  };

  type TopicIdentifier = Text;
  type SubjectIdentifier = Text;

  var nextCourseId = 1;

  let courses = Map.empty<Nat, Course>();
  let topics = Map.empty<TopicIdentifier, Topic>();
  let subjects = Map.empty<SubjectIdentifier, [TopicIdentifier]>();
  let subjectDescriptions = Map.empty<SubjectIdentifier, Text>();

  module Course {
    public func compareById(course1 : Course, course2 : Course) : Order.Order {
      Nat.compare(course1.id, course2.id);
    };
  };

  public shared ({ caller }) func addCourse(
    title : Text,
    description : Text,
    category : Category,
    level : Level,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add courses");
    };

    if (title.isEmpty() or description.isEmpty()) {
      Runtime.trap("Title and description cannot be empty");
    };

    let course : Course = {
      id = nextCourseId;
      title;
      description;
      category;
      level;
    };

    courses.add(nextCourseId, course);
    nextCourseId += 1;
  };

  public query ({ caller }) func getCourse(id : Nat) : async Course {
    switch (courses.get(id)) {
      case (null) { Runtime.trap("Course not found") };
      case (?course) { course };
    };
  };

  public query ({ caller }) func getCoursesByCategory(category : Category) : async [Course] {
    courses.values().toArray().filter(
      func(course) {
        course.category == category;
      }
    ).sort(Course.compareById);
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray().sort(Course.compareById);
  };

  public shared ({ caller }) func addDefaultCourses() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add default courses");
    };

    await addScienceCourses();
    await addArtsCourses();
    await addCommerceCourses();
  };

  func addScienceCourses() : async () {
    await addCourse(
      "11th Class",
      "Comprehensive foundation course for higher secondary education focusing on core science subjects including Physics, Chemistry, Biology, and Mathematics. This program prepares students for advanced scientific studies and competitive examinations with detailed theoretical knowledge and practical applications essential for academic success.",
      #Science,
      #Undergraduate,
    );
    await addCourse(
      "12th Class",
      "Advanced higher secondary program building upon 11th class foundations with specialized focus on Physics, Chemistry, Biology, and Mathematics. This course prepares students for entrance examinations, professional courses, and provides the academic rigor necessary for pursuing higher education in science and technology fields.",
      #Science,
      #Undergraduate,
    );
    await addCourse(
      "B.Sc.",
      "Bachelor of Science degree program providing in-depth study of scientific disciplines including Physics, Chemistry, Biology, Mathematics, and specialized branches. This undergraduate course combines theoretical knowledge with practical laboratory experience, preparing students for research careers, professional programs, and advanced studies in science and technology.",
      #Science,
      #Undergraduate,
    );
    await addCourse(
      "B.Arch.",
      "Bachelor of Architecture degree program combining artistic creativity with technical knowledge to design functional and aesthetically pleasing buildings and spaces. This professional course covers architectural design, construction technology, environmental systems, and urban planning, preparing students for careers in architecture, interior design, and urban development.",
      #Science,
      #Undergraduate,
    );
    await addCourse(
      "B.Tech",
      "Bachelor of Technology degree program focusing on applied engineering sciences and technology development. This undergraduate course emphasizes practical problem-solving, innovation, and technical skills across various engineering disciplines, preparing students for careers in technology industries, research and development, and engineering consultancy.",
      #Science,
      #Undergraduate,
    );
    await addCourse(
      "B.E.",
      "Bachelor of Engineering degree program providing comprehensive engineering education with emphasis on theoretical foundations and practical applications. This undergraduate course covers core engineering principles, design methodologies, and technical analysis, preparing students for professional engineering careers and advanced studies.",
      #Science,
      #Undergraduate,
    );
    await addCourse(
      "M.Sc.",
      "Master of Science degree program offering advanced study and research in specialized scientific fields. This postgraduate course emphasizes research methodology, advanced theoretical concepts, and practical applications, preparing students for research careers, doctoral studies, and specialized professional roles in science and technology.",
      #Science,
      #Postgraduate,
    );
    await addCourse(
      "M.Arch.",
      "Master of Architecture degree program providing advanced architectural education with focus on design innovation, sustainability, and urban planning. This postgraduate course emphasizes research-based design, environmental considerations, and contemporary architectural practices, preparing students for leadership roles in architecture and urban development.",
      #Science,
      #Postgraduate,
    );
    await addCourse(
      "M.Tech.",
      "Master of Technology degree program offering specialized technical education and research in engineering and technology fields. This postgraduate course focuses on advanced technical skills, innovation, and research methodology, preparing students for senior technical positions and doctoral research.",
      #Science,
      #Postgraduate,
    );
    await addCourse(
      "M.E.",
      "Master of Engineering degree program providing advanced engineering education with emphasis on research and development. This postgraduate course combines theoretical knowledge with practical research experience, preparing students for leadership roles in engineering industries and academic careers.",
      #Science,
      #Postgraduate,
    );
  };

  func addArtsCourses() : async () {
    await addCourse(
      "11th Class",
      "Comprehensive foundation course for higher secondary education focusing on humanities, literature, and arts subjects. This program prepares students for advanced studies and competitive examinations in the arts stream.",
      #Arts,
      #Undergraduate,
    );
    await addCourse(
      "12th Class",
      "Advanced higher secondary program building upon 11th class foundations with specialized focus on arts subjects. This course prepares students for undergraduate studies, professional courses, and academic pursuits in the arts and humanities.",
      #Arts,
      #Undergraduate,
    );
    await addCourse(
      "B.A.",
      "Bachelor of Arts degree program offering comprehensive study in humanities, social sciences, literature, and liberal arts subjects. This undergraduate course develops critical thinking, communication skills, and cultural awareness while providing flexibility to explore diverse academic interests and career paths in education, media, public service, and creative industries.",
      #Arts,
      #Undergraduate,
    );
    await addCourse(
      "M.A.",
      "Master of Arts degree program providing advanced study in humanities, social sciences, and liberal arts disciplines. This postgraduate course emphasizes research methodology, critical analysis, and specialized knowledge, preparing students for academic careers, research positions, and professional roles in education, media, and cultural organizations.",
      #Arts,
      #Postgraduate,
    );
    await addCourse(
      "Ph.D.",
      "Doctor of Philosophy degree program offering the highest level of academic achievement in arts and humanities fields. This doctoral program emphasizes original research, scholarly contribution, and academic excellence, preparing students for careers in higher education, research institutions, and specialized professional roles.",
      #Arts,
      #Doctoral,
    );
  };

  func addCommerceCourses() : async () {
    await addCourse(
      "11th Class",
      "Comprehensive foundation course for higher secondary education focusing on business studies, accounting, and economics. This program prepares students for advanced studies and competitive examinations in the commerce stream.",
      #Commerce,
      #Undergraduate,
    );
    await addCourse(
      "12th Class",
      "Advanced higher secondary program building upon 11th class foundations with specialized focus on commerce subjects. This course prepares students for undergraduate studies, professional courses, and academic pursuits in business, accounting, and finance.",
      #Commerce,
      #Undergraduate,
    );
    await addCourse(
      "B.Com.",
      "Bachelor of Commerce degree program focusing on business studies, accounting, economics, finance, and commercial law. This undergraduate course provides comprehensive understanding of business operations, financial management, and commercial practices, preparing students for careers in banking, finance, accounting, and business management.",
      #Commerce,
      #Undergraduate,
    );
    await addCourse(
      "M.Com.",
      "Master of Commerce degree program offering advanced study in business, finance, and commercial subjects. This postgraduate course emphasizes research methodology, advanced business concepts, and specialized knowledge, preparing students for senior management positions, academic careers, and professional consultancy roles.",
      #Commerce,
      #Postgraduate,
    );
    await addCourse(
      "Ph.D.",
      "Doctor of Philosophy degree program providing the highest level of academic achievement in commerce and business studies. This doctoral program emphasizes original research, business innovation, and scholarly contribution, preparing students for careers in higher education, business research, and executive leadership positions.",
      #Commerce,
      #Doctoral,
    );
  };

  public query ({ caller }) func courseExists(category : Category, level : Level) : async Bool {
    courses.values().toArray().any(
      func(course) {
        course.category == category and course.level == level
      }
    );
  };

  public shared ({ caller }) func addTopicToSubject(
    subjectId : SubjectIdentifier,
    topicId : TopicIdentifier,
    topic : Topic
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add topics");
    };

    topics.add(topicId, topic);

    let currentTopicIds = switch (subjects.get(subjectId)) {
      case (null) { [] };
      case (?existingIds) { existingIds };
    };
    subjects.add(subjectId, currentTopicIds.concat([topicId]));
  };

  public query ({ caller }) func getTopicsBySubject(subjectId : SubjectIdentifier) : async [(TopicIdentifier, Topic)] {
    switch (subjects.get(subjectId)) {
      case (null) { Runtime.trap("Subject not found") };
      case (?topicIds) {
        topicIds.filterMap(
          func(topicId) {
            switch (topics.get(topicId)) {
              case (null) { null };
              case (?topic) { ?(topicId, topic) };
            };
          }
        );
      };
    };
  };

  public query ({ caller }) func getTopic(topicId : TopicIdentifier) : async Topic {
    switch (topics.get(topicId)) {
      case (null) { Runtime.trap("Topic not found") };
      case (?topic) { topic };
    };
  };

  public shared ({ caller }) func setSubjectDescription(
    subjectId : SubjectIdentifier,
    description : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set subject descriptions");
    };
    subjectDescriptions.add(subjectId, description);
  };

  public query ({ caller }) func getSubjectDescription(subjectId : SubjectIdentifier) : async Text {
    switch (subjectDescriptions.get(subjectId)) {
      case (null) { Runtime.trap("Subject description not found") };
      case (?description) { description };
    };
  };

  public query ({ caller }) func getSubjectContent(subjectId : SubjectIdentifier) : async SubjectContent {
    let description = switch (subjectDescriptions.get(subjectId)) {
      case (null) { "" };
      case (?desc) { desc };
    };

    switch (subjects.get(subjectId)) {
      case (null) { Runtime.trap("Subject not found") };
      case (?topicIds) {
        let topicList = topicIds.filterMap(
          func(topicId) {
            switch (topics.get(topicId)) {
              case (null) { null };
              case (?topic) { ?topic };
            };
          }
        );
        { description; topics = topicList };
      };
    };
  };
};
