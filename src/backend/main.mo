import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import List "mo:core/List";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

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
    priceInINR : ?Nat;
    description : Text;
    category : Category;
    level : Level;
    subjectId : ?Text;
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

  let courseSubjectMapping = Map.empty<Text, List.List<Nat>>();
  let courses = Map.empty<Nat, Course>();
  let topics = Map.empty<TopicIdentifier, Topic>();
  let subjects = Map.empty<SubjectIdentifier, [TopicIdentifier]>();
  let subjectContents = Map.empty<SubjectIdentifier, SubjectContent>();

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
    subjectId : ?Text,
    priceInINR : ?Nat,
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
      priceInINR;
      description;
      category;
      level;
      subjectId;
    };

    courses.add(nextCourseId, course);
    if (subjectId.isSome()) {
      addCourseToSubjectMapping(nextCourseId, subjectId.unwrap());
    };
    nextCourseId += 1;
  };

  func addCourseToSubjectMapping(courseId : Nat, subjectId : Text) {
    let currentCourseList = switch (courseSubjectMapping.get(subjectId)) {
      case (null) { List.empty<Nat>() };
      case (?existingList) { existingList };
    };
    currentCourseList.add(courseId);
    courseSubjectMapping.add(subjectId, currentCourseList);
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

  public query ({ caller }) func getAllCoursesBySubject(subjectId : Text) : async [Course] {
    switch (courseSubjectMapping.get(subjectId)) {
      case (null) { [] };
      case (?courseIds) {
        courseIds.toArray().filterMap(
          func(id) {
            courses.get(id);
          }
        );
      };
    };
  };

  public shared ({ caller }) func addDefaultCourses() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add default courses");
    };

    await addScienceCourses();
    await addArtsCourses();
    await addCommerceCourses();
    await addProfessionalCourses();
    await addLawCourses();
    await addEducationCourses();
    await addPharmacyAndMedicalCourses();
    await addAgricultureScienceCourses();
  };

  func addScienceCourses() : async () {
    let coreSubjects = [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Electronics",
    ];

    await addCourseWithSubjects(
      "11th Class",
      "Comprehensive foundation course for higher secondary education focusing on core science subjects including Physics, Chemistry, Biology, and Mathematics. This program prepares students for advanced scientific studies and competitive examinations with detailed theoretical knowledge and practical applications essential for academic success.",
      #Science,
      #Undergraduate,
      coreSubjects,
      null,
    );
    await addCourseWithSubjects(
      "12th Class",
      "Advanced higher secondary program building upon 11th class foundations with specialized focus on Physics, Chemistry, Biology, and Mathematics. This course prepares students for entrance examinations, professional courses, and provides the academic rigor necessary for pursuing higher education in science and technology fields.",
      #Science,
      #Undergraduate,
      coreSubjects,
      null,
    );
    await addCourseWithSubjects(
      "B.Sc.",
      "Bachelor of Science degree program providing in-depth study of scientific disciplines including Physics, Chemistry, Biology, Mathematics, and specialized branches. This undergraduate course combines theoretical knowledge with practical laboratory experience, preparing students for research careers, professional programs, and advanced studies in science and technology.",
      #Science,
      #Undergraduate,
      coreSubjects,
      null,
    );
    await addCourseWithSubjects(
      "B.Tech",
      "Bachelor of Technology degree program focusing on applied engineering sciences and technology development. This undergraduate course emphasizes practical problem-solving, innovation, and technical skills across various engineering disciplines, preparing students for careers in technology industries, research and development, and engineering consultancy.",
      #Science,
      #Undergraduate,
      ["Electronics", "Physics", "Mathematics"],
      null,
    );
    await addCourseWithSubjects(
      "B.E.",
      "Bachelor of Engineering degree program providing comprehensive engineering education with emphasis on theoretical foundations and practical applications. This undergraduate course covers core engineering principles, design methodologies, and technical analysis, preparing students for professional engineering careers and advanced studies.",
      #Science,
      #Undergraduate,
      ["Electronics", "Physics", "Mathematics"],
      null,
    );
    await addCourseWithSubjects(
      "M.Sc.",
      "Master of Science degree program offering advanced study and research in specialized scientific fields. This postgraduate course emphasizes research methodology, advanced theoretical concepts, and practical applications, preparing students for research careers, doctoral studies, and specialized professional roles in science and technology.",
      #Science,
      #Postgraduate,
      coreSubjects,
      null,
    );
    await addCourseWithSubjects(
      "M.Tech.",
      "Master of Technology degree program offering specialized technical education and research in engineering and technology fields. This postgraduate course focuses on advanced technical skills, innovation, and research methodology, preparing students for senior technical positions and doctoral research.",
      #Science,
      #Postgraduate,
      ["Electronics", "Physics", "Mathematics"],
      null,
    );
    await addCourseWithSubjects(
      "M.E.",
      "Master of Engineering degree program providing advanced engineering education with emphasis on research and development. This postgraduate course combines theoretical knowledge with practical research experience, preparing students for leadership roles in engineering industries and academic careers.",
      #Science,
      #Postgraduate,
      ["Electronics", "Physics", "Mathematics"],
      null,
    );

    // Add individual science subjects with pricing
    await addCourseWithSubjects("11th Botany", "Comprehensive study of Botany for 11th class students.", #Science, #Undergraduate, ["Botany"], ?199);
    await addCourseWithSubjects("11th Zoology", "Comprehensive study of Zoology for 11th class students.", #Science, #Undergraduate, ["Zoology"], ?199);
    await addCourseWithSubjects("11th Chemistry", "Comprehensive study of Chemistry for 11th class students.", #Science, #Undergraduate, ["Chemistry"], ?199);
    await addCourseWithSubjects("11th Physics", "Comprehensive study of Physics for 11th class students.", #Science, #Undergraduate, ["Physics"], ?199);
    await addCourseWithSubjects("12th Science", "Comprehensive study for 12th class science students.", #Science, #Undergraduate, coreSubjects, ?299);
  };

  func addArtsCourses() : async () {
    await addCourseWithSubjects(
      "11th Class",
      "Comprehensive foundation course for higher secondary education focusing on humanities, literature, and arts subjects. This program prepares students for advanced studies and competitive examinations in the arts stream.",
      #Arts,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "12th Class",
      "Advanced higher secondary program building upon 11th class foundations with specialized focus on arts subjects. This course prepares students for undergraduate studies, professional courses, and academic pursuits in the arts and humanities.",
      #Arts,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "B.A.",
      "Bachelor of Arts degree program offering comprehensive study in humanities, social sciences, literature, and liberal arts subjects. This undergraduate course develops critical thinking, communication skills, and cultural awareness while providing flexibility to explore diverse academic interests and career paths in education, media, public service, and creative industries.",
      #Arts,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "M.A.",
      "Master of Arts degree program providing advanced study in humanities, social sciences, and liberal arts disciplines. This postgraduate course emphasizes research methodology, critical analysis, and specialized knowledge, preparing students for academic careers, research positions, and professional roles in education, media, and cultural organizations.",
      #Arts,
      #Postgraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "Ph.D.",
      "Doctor of Philosophy degree program offering the highest level of academic achievement in arts and humanities fields. This doctoral program emphasizes original research, scholarly contribution, and academic excellence, preparing students for careers in higher education, research institutions, and specialized professional roles.",
      #Arts,
      #Doctoral,
      [],
      null,
    );
  };

  func addCommerceCourses() : async () {
    await addCourseWithSubjects(
      "11th Class",
      "Comprehensive foundation course for higher secondary education focusing on business studies, accounting, and economics. This program prepares students for advanced studies and competitive examinations in the commerce stream.",
      #Commerce,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "12th Class",
      "Advanced higher secondary program building upon 11th class foundations with specialized focus on commerce subjects. This course prepares students for undergraduate studies, professional courses, and academic pursuits in business, accounting, and finance.",
      #Commerce,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "B.Com.",
      "Bachelor of Commerce degree program focusing on business studies, accounting, economics, finance, and commercial law. This undergraduate course provides comprehensive understanding of business operations, financial management, and commercial practices, preparing students for careers in banking, finance, accounting, and business management.",
      #Commerce,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "M.Com.",
      "Master of Commerce degree program offering advanced study in business, finance, and commercial subjects. This postgraduate course emphasizes research methodology, advanced business concepts, and specialized knowledge, preparing students for senior management positions, academic careers, and professional consultancy roles.",
      #Commerce,
      #Postgraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "Ph.D.",
      "Doctor of Philosophy degree program providing the highest level of academic achievement in commerce and business studies. This doctoral program emphasizes original research, business innovation, and scholarly contribution, preparing students for careers in higher education, business research, and executive leadership positions.",
      #Commerce,
      #Doctoral,
      [],
      null,
    );
  };

  func addProfessionalCourses() : async () {
    await addCourseWithSubjects(
      "B.C.A.",
      "Bachelor of Computer Applications (BCA) is an undergraduate degree program focusing on computer science, software development, and information technology. This course covers programming languages, database management, web development, and system analysis, preparing students for careers in the IT industry and paving the way for higher studies like MCA (Master of Computer Applications).",
      #Science,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "B.B.A.",
      "Bachelor of Business Administration (BBA) is an undergraduate degree program that provides a solid foundation in business management, leadership, and entrepreneurial skills. Covering topics such as marketing, finance, human resources, and operations management, this course prepares students for careers in business, startups, and further education such as MBA (Master of Business Administration).",
      #Commerce,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "M.B.A.",
      "Master of Business Administration (MBA) is a postgraduate program designed to develop advanced business management, analytical, and strategic leadership skills. This course covers finance, marketing, operations, and human resources, preparing graduates for leadership roles in corporate organizations, entrepreneurship, and specialized consulting careers.",
      #Commerce,
      #Postgraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "M.C.A.",
      "Master of Computer Applications (MCA) is a postgraduate program focusing on advanced computer science, software development, and information systems. Covering programming, networking, database management, and system security, this course prepares students for specialized roles in software engineering, IT project management, and research in the technology sector.",
      #Science,
      #Postgraduate,
      [],
      null,
    );
  };

  func addLawCourses() : async () {
    await addCourseWithSubjects(
      "LL.B.",
      "Bachelor of Laws (LL.B.) is an undergraduate law degree that provides comprehensive knowledge of legal theories, principles, and practices. This course covers constitutional law, criminal law, civil procedures, and legal research, preparing graduates for legal practice, judiciary, and further academic pursuits such as LL.M. (Master of Laws).",
      #Arts,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "LL.M.",
      "Master of Laws (LL.M.) is a postgraduate program that offers advanced theoretical and practical knowledge in specialized areas of law. This course emphasizes legal research and analysis, preparing graduates for high-level legal careers, academic positions, and specialized consultancy in the legal field.",
      #Arts,
      #Postgraduate,
      [],
      null,
    );
  };

  func addEducationCourses() : async () {
    await addCourseWithSubjects(
      "B.Ed.",
      "Bachelor of Education (B.Ed.) is an undergraduate program focused on teacher training, educational methodologies, and classroom management. This course emphasizes curriculum design, educational assessment, and practical teaching experience, preparing graduates for careers in primary and secondary education.",
      #Arts,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "M.Ed.",
      "Master of Education (M.Ed.) is a postgraduate program designed to enhance skills in educational leadership, curriculum design, and research methodology. This course prepares graduates for educational administration, academic research, and development of innovative teaching practices.",
      #Arts,
      #Postgraduate,
      [],
      null,
    );
  };

  func addPharmacyAndMedicalCourses() : async () {
    await addCourseWithSubjects(
      "B.Pharm",
      "Bachelor of Pharmacy (B.Pharm) is an undergraduate program focusing on pharmaceutical sciences, drug development, and clinical training. This course covers pharmacology, medicinal chemistry, pharmacognosy, practical experience in pharmacy practice, and prepares graduates for roles in the pharmaceutical industry, clinical research, and healthcare services.",
      #Science,
      #Undergraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "M.Pharm",
      "Master of Pharmacy (M.Pharm) is a postgraduate program that offers advanced study in pharmaceutical sciences, emphasizing research and development. This course covers clinical drug development, regulatory affairs, clinical research, and advanced pharmacological studies, preparing graduates for careers in pharmaceutical research, academic posts, and drug regulatory departments.",
      #Science,
      #Postgraduate,
      [],
      null,
    );
    await addCourseWithSubjects(
      "MBBS",
      "Bachelor of Medicine, Bachelor of Surgery (MBBS) is an undergraduate professional degree in medicine and surgery. This course provides comprehensive medical education, including clinical training, surgical practice, and research, preparing graduates for careers as licensed medical practitioners, healthcare researchers, and public health specialists.",
      #Science,
      #Undergraduate,
      [],
      null,
    );
  };

  func addAgricultureScienceCourses() : async () {
    let agriSubjects = [
      "Botany",
      "Chemistry",
      "HumanBiology",
      "Physics",
      "Geology",
      "Zoology",
      "Biotechnology",
      "Geography",
    ];

    await addCourseWithSubjects(
      "Agriculture Science",
      "The Agriculture Science stream integrates the study of agricultural practices, crop management, animal husbandry, and sustainable farming techniques. This program covers subjects such as Botany, Chemistry, Human Biology, Physics, Geology, Zoology, Biotechnology, and Geography, and Geography. Students will gain theoretical knowledge and practical skills necessary for careers in agriculture, environmental management, and related industries.",
      #Science,
      #Undergraduate,
      agriSubjects,
      null,
    );
  };

  func addCourseWithSubjects(
    title : Text,
    description : Text,
    category : Category,
    level : Level,
    subjectIds : [Text],
    priceInINR : ?Nat,
  ) : async () {
    for (subjectId in subjectIds.values()) {
      await addCourse(title, description, category, level, ?subjectId, priceInINR);
    };
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

  public shared ({ caller }) func setSubjectContent(
    subjectId : SubjectIdentifier,
    content : SubjectContent,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set subject content");
    };
    subjectContents.add(subjectId, content);
  };

  public query ({ caller }) func getSubjectsByCategory(category : Category) : async [SubjectIdentifier] {
    let subjectKeys = subjects.keys().toArray();
    subjectKeys;
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

  public query ({ caller }) func getSubjectContent(subjectId : SubjectIdentifier) : async SubjectContent {
    switch (subjectContents.get(subjectId)) {
      case (null) { defaultContentForSubject(subjectId) };
      case (?content) { content };
    };
  };

  func defaultContentForSubject(subjectId : SubjectIdentifier) : SubjectContent {
    switch (subjectId) {
      case ("Electronics") {
        {
          description = "Explore the vast field of Electronics, from fundamental concepts to advanced innovations. This subject covers semiconductor devices, digital and analog electronics, signal processing, circuit theory, communications, and circuit design. Delve into microelectronics, power electronics, sensors, microcontrollers, and emerging technologies like nanotechnology and quantum electronics. Understand the principles behind integrated circuits, electronic communication systems, embedded systems, and the role of electronics in smart technologies and renewable energy. ";
          topics = [
            {
              title = "Semiconductor Devices";
              description = "Introduction to semiconductor materials, diodes, transistors, and their applications in electronic circuits.";
              studyMaterials = [];
            },
            {
              title = "Analog Electronics";
              description = "Study of analog circuit design, operational amplifiers, filters, signal amplification, and waveform generation.";
              studyMaterials = [];
            },
            {
              title = "Digital Electronics";
              description = "Understanding digital logic, binary systems, logic gates, flip-flops, multiplexers, and digital circuit design.";
              studyMaterials = [];
            },
            {
              title = "Signal Processing";
              description = "Analysis of signals, frequency filters, modulation techniques, and fundamental signal processing methods.";
              studyMaterials = [];
            },
            {
              title = "Circuit Design and Analysis";
              description = "Design and analysis of electronic circuits, PCB design, and simulation tools for efficient circuit development.";
              studyMaterials = [];
            },
            {
              title = "Communication Systems";
              description = "Study of wireless communication, radio frequency systems, and electronic transmission technologies.";
              studyMaterials = [];
            },
            {
              title = "Embedded Systems";
              description = "Introduction to microcontrollers, embedded system programming, and real-time applications in electronic devices.";
              studyMaterials = [];
            },
            {
              title = "Industrial Electronics";
              description = "Application of electronics in industrial automation, robotics, and control systems in manufacturing processes.";
              studyMaterials = [];
            },
            {
              title = "Quantum Electronics and Devices";
              description = "Exploration of quantum phenomena in electronics, nanotechnology, and advanced electronic devices.";
              studyMaterials = [];
            },
            {
              title = "Innovations in Electronics";
              description = "Updates on current research, breakthroughs, and emerging trends in the field of electronics.";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("Botany") {
        {
          description = "Explore the science of plant life, including plant structure, function, growth, and reproduction.";
          topics = [
            {
              title = "Cell Structure and Function";
              description = "Study the basic unit of life, plant cell organization, and cellular functions.";
              studyMaterials = [];
            },
            {
              title = "Photosynthesis";
              description = "Investigate the process by which plants convert light energy into chemical energy.";
              studyMaterials = [];
            },
            {
              title = "Plant Anatomy";
              description = "Examine the internal structure of plants, including tissues and organs.";
              studyMaterials = [];
            },
            {
              title = "Plant Morphology";
              description = "Explore the external structure of plants, including roots, stems, leaves, and flowers.";
              studyMaterials = [];
            },
            {
              title = "Plant Physiology";
              description = "Understand the biological processes in plants, such as growth, development, and response to stimuli.";
              studyMaterials = [];
            },
            {
              title = "Genetics and Evolution";
              description = "Study the principles of heredity, genetic variation, and the evolutionary process in plants.";
              studyMaterials = [];
            },
            {
              title = "Ecology";
              description = "Explore the interactions between plants and their environment, including ecosystems and conservation.";
              studyMaterials = [];
            },
            {
              title = "Indian Botany";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Botany";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("Chemistry") {
        {
          description = "Dive into the study of matter, its properties, composition, structure, and the changes it undergoes.";
          topics = [
            {
              title = "Atomic Structure";
              description = "Learn about the structure of atoms, subatomic particles, and electron configuration.";
              studyMaterials = [];
            },
            {
              title = "Periodic Table";
              description = "Understand the organization and trends of the periodic table.";
              studyMaterials = [];
            },
            {
              title = "Chemical Bonding";
              description = "Study how atoms combine to form molecules through ionic, covalent, and metallic bonds.";
              studyMaterials = [];
            },
            {
              title = "Chemical Reactions";
              description = "Explore different types of chemical reactions and their mechanisms.";
              studyMaterials = [];
            },
            {
              title = "Thermodynamics";
              description = "Examine the principles of energy transfer and chemical equilibrium.";
              studyMaterials = [];
            },
            {
              title = "Organic Chemistry";
              description = "Study the chemistry of carbon-containing compounds and their reactions.";
              studyMaterials = [];
            },
            {
              title = "Inorganic Chemistry";
              description = "Explore the chemistry of elements other than carbon and their compounds.";
              studyMaterials = [];
            },
            {
              title = "Analytical Chemistry";
              description = "Learn techniques for analyzing and identifying chemical substances.";
              studyMaterials = [];
            },
            {
              title = "Indian Chemistry";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Chemistry";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("Mathematics") {
        {
          description = "Explore the world of mathematics, from fundamental concepts to advanced theories and applications. This subject covers arithmetic, algebra, calculus, geometry, statistics, probability, trigonometry, number theory, linear algebra, and discrete mathematics. Develop problem-solving skills and analytical thinking essential for scientific, technological, and everyday applications.";
          topics = [
            createTopic("Arithmetic", "Basic mathematical operations, fractions, decimals, and percentages."),
            createTopic("Algebra", "Study of equations, functions, and algebraic structures."),
            createTopic("Calculus", "Analysis of change using limits, derivatives, and integrals."),
            createTopic("Geometry", "Examination of shapes, their properties, and spatial relationships."),
            createTopic("Trigonometry", "Study of the relationships between angles and sides in triangles."),
            createTopic("Statistics", "Collection, analysis, and interpretation of data."),
            createTopic("Probability", "Study of random events, probability theory, and statistical applications."),
            createTopic("Number Theory", "Exploration of properties and relationships of numbers."),
            createTopic("Linear Algebra", "Study of vectors, matrices, and linear transformations."),
            createTopic("Discrete Mathematics", "Analysis of structures such as graphs, sets, and combinatorics."),
          ];
        };
      };
      case ("Zoology") {
        {
          description = "Discover the study of animals, their anatomy, physiology, classification, and behavior.";
          topics = [
            {
              title = "Animal Diversity";
              description = "Learn about the vast variety of animal species and their classifications.";
              studyMaterials = [];
            },
            {
              title = "Cell Biology";
              description = "Study the structure and function of animal cells and tissues.";
              studyMaterials = [];
            },
            {
              title = "Genetics";
              description = "Explore the principles of heredity and genetic inheritance in animals.";
              studyMaterials = [];
            },
            {
              title = "Physiology";
              description = "Understand the biological processes and functions in animals.";
              studyMaterials = [];
            },
            {
              title = "Ecology";
              description = "Study the relationship between animals and their environment.";
              studyMaterials = [];
            },
            {
              title = "Evolution";
              description = "Investigate the evolutionary process and adaptation of animal species.";
              studyMaterials = [];
            },
            {
              title = "Behavioral Biology";
              description = "Examine animal behavior and the mechanisms driving it.";
              studyMaterials = [];
            },
            {
              title = "Applied Zoology";
              description = "Study the practical applications of zoology in industries and research.";
              studyMaterials = [];
            },
            {
              title = "Indian Zoology";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Zoology";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("Biotechnology") {
        {
          description = "Explore the application of biological systems and organisms to develop products and technologies.";
          topics = [
            {
              title = "Genetic Engineering";
              description = "Learn about manipulating the DNA of organisms for desired traits.";
              studyMaterials = [];
            },
            {
              title = "Molecular Biology";
              description = "Study the structure and function of molecules essential for life.";
              studyMaterials = [];
            },
            {
              title = "Microbiology";
              description = "Examine microorganisms and their role in biotechnology.";
              studyMaterials = [];
            },
            {
              title = "Immunology";
              description = "Understand the immune system and biotechnological applications in medicine.";
              studyMaterials = [];
            },
            {
              title = "Bioprocess Engineering";
              description = "Explore the design of processes using living cells for industrial applications.";
              studyMaterials = [];
            },
            {
              title = "Environmental Biotechnology";
              description = "Learn how biotechnology addresses environmental challenges.";
              studyMaterials = [];
            },
            {
              title = "Bioinformatics";
              description = "Study the application of computer technology to biological data analysis.";
              studyMaterials = [];
            },
            {
              title = "Pharmaceutical Biotechnology";
              description = "Explore the development of drugs and therapies using biotechnological methods.";
              studyMaterials = [];
            },
            {
              title = "Indian Biotechnology";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Biotechnology";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("Physics") {
        {
          description = "Unveil the study of matter, energy, forces, and the fundamental principles of the universe.";
          topics = [
            {
              title = "Mechanics";
              description = "Study the motion of objects and forces acting upon them.";
              studyMaterials = [];
            },
            {
              title = "Electromagnetism";
              description = "Examine the relationship between electricity and magnetism.";
              studyMaterials = [];
            },
            {
              title = "Thermodynamics";
              description = "Explore the principles of heat, energy, and work.";
              studyMaterials = [];
            },
            {
              title = "Optics";
              description = "Learn about the behavior and properties of light.";
              studyMaterials = [];
            },
            {
              title = "Quantum Mechanics";
              description = "Study the behavior of matter and energy at the atomic level.";
              studyMaterials = [];
            },
            {
              title = "Relativity";
              description = "Understand the theory of relativity and its impact on physics.";
              studyMaterials = [];
            },
            {
              title = "Particle Physics";
              description = "Examine the fundamental particles and the forces governing them.";
              studyMaterials = [];
            },
            {
              title = "Applied Physics";
              description = "Explore practical applications of physics in technology and industry.";
              studyMaterials = [];
            },
            {
              title = "Indian Physics";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Physics";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("Geology") {
        {
          description = "Investigate the study of the Earth, its structure, composition, and the processes that shape it.";
          topics = [
            {
              title = "Earth's Structure";
              description = "Learn about the layers of the Earth and their characteristics.";
              studyMaterials = [];
            },
            {
              title = "Mineralogy";
              description = "Study minerals, their properties, and classification.";
              studyMaterials = [];
            },
            {
              title = "Petrology";
              description = "Examine the origin and formation of rocks.";
              studyMaterials = [];
            },
            {
              title = "Geological Processes";
              description = "Understand the dynamic processes that shape the Earth's surface.";
              studyMaterials = [];
            },
            {
              title = "Plate Tectonics";
              description = "Explore the movement of Earth's plates and their impact.";
              studyMaterials = [];
            },
            {
              title = "Fossil Record";
              description = "Study the history of life on Earth through fossils.";
              studyMaterials = [];
            },
            {
              title = "Economic Geology";
              description = "Learn about the application of geology in resource exploration and mining.";
              studyMaterials = [];
            },
            {
              title = "Environmental Geology";
              description = "Examine environmental challenges and solutions related to geology.";
              studyMaterials = [];
            },
            {
              title = "Indian Geology";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Geology";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("HumanBiology") {
        {
          description = "Understand the science of the human body, including its structure, function, development, and health.";
          topics = [
            {
              title = "Cell Biology";
              description = "Study the basic unit of life and human cell organization.";
              studyMaterials = [];
            },
            {
              title = "Genetics";
              description = "Explore the principles of heredity and genetic inheritance in humans.";
              studyMaterials = [];
            },
            {
              title = "Physiology";
              description = "Understand the bodily systems and their functions.";
              studyMaterials = [];
            },
            {
              title = "Anatomy";
              description = "Examine the structure of the human body and its organs.";
              studyMaterials = [];
            },
            {
              title = "Immunology";
              description = "Learn about the immune system and its role in health and disease.";
              studyMaterials = [];
            },
            {
              title = "Endocrinology";
              description = "Study hormones and their regulation of bodily functions.";
              studyMaterials = [];
            },
            {
              title = "Human Development";
              description = "Explore the stages of growth and development from conception to adulthood.";
              studyMaterials = [];
            },
            {
              title = "Medical Biology";
              description = "Examine the application of biology in healthcare and medicine.";
              studyMaterials = [];
            },
            {
              title = "Indian Human Biology";
              description = "Study the history, contribution and achievements of Indian scientist in the field of Human Biology";
              studyMaterials = [];
            },
          ];
        };
      };
      case ("CurrentAffairs") {
        {
          description = "Stay updated with the latest events, developments, and issues impacting India.";
          topics = [
            {
              title = "National Politics";
              description = "Follow the latest developments in government, policies, and political events.";
              studyMaterials = [];
            },
            {
              title = "International Relations";
              description = "Understand India's role in global affairs and international partnerships.";
              studyMaterials = [];
            },
            {
              title = "Economy";
              description = "Stay informed about economic trends, government policies, and major financial sectors.";
              studyMaterials = [];
            },
            {
              title = "Science and Technology";
              description = "Explore advances in science and technology, including government initiatives and achievements.";
              studyMaterials = [];
            },
            {
              title = "Environment";
              description = "Stay current with environmental issues, policies, and sustainability efforts in India.";
              studyMaterials = [];
            },
            {
              title = "Health";
              description = "Get updates on public health, policies, and current events.";
              studyMaterials = [];
            },
            {
              title = "Education";
              description = "Follow changes and trends in education policies and systems.";
              studyMaterials = [];
            },
            {
              title = "Social Issues";
              description = "Explore social challenges and government initiatives.";
              studyMaterials = [];
            },
          ];
        };
      };
      case (_) {
        {
          description = "No content available for this subject. Please contact your administrator.";
          topics = [];
        };
      };
    };
  };

  func createTopic(title : Text, description : Text) : Topic {
    {
      title;
      description;
      studyMaterials = [];
    };
  };
};
