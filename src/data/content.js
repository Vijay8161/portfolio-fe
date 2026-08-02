export const profile = {
  name: "Vijay Krishna Neeli",
  role: "Software Engineer Intern @ Garmin Technologies",
  email: "vijaykrishnaneeli@gmail.com",
  phone: "+91 63010 36123",
  location: "Hyderabad, India",
  linkedin: "https://linkedin.com/in/vijaykrishnaneeli",
  github: "https://github.com/Vijay8161",
  githubUser: "Vijay8161",
  heroLines: [
    "Saving Time.",
    "Scaling Software.",
    "and Shipping Value.",
  ],
  summary:
    "I design backend systems that solve real engineering problems and saves time— from large-scale log pipelines serving 80+ applications to AI knowledge systems that answer questions where engineers already work.",
  education: {
    school: "VIT-AP University",
    degree: "B.Tech — Computer Science & Engineering",
    gpa: "9.30 / 10.0",
    period: "2022 — 2026",
  },
};

export const marqueeItems = [
  "Building Reliable Software",
  "Designing Scalable Systems",
  "Engineering for Performance",
  "Cloud-Native Architecture",
  "System Design",
  "Developer Experience",
  "Automation First",
  "Continuous Learning",
];

export const experience = {
  company: "Garmin Technologies",
  role: "Software Engineer Intern",
  period: "Dec 2025 — Present",
  location: "Hyderabad, India",
  intro:
    "Working on the internal developer-platform team, building the observability infrastructure that product teams rely on to ship and debug software at scale.",
  projects: [
    {
      id: "log-platform",
      index: "PROJECT 01",
      title: "Scalable Log Aggregation & Migration Platform",
      problem:
        "Product teams were losing historical visibility: logs lived in Elasticsearch with a 10-day retention window, and every team's queries were hardcoded to their own deployment. Root-cause analysis across teams was slow, and storage costs were climbing.",
      architecture: [
        "80+ applications emit logs into Elasticsearch (hot, 10-day window)",
        "Spring Boot migration pipeline — dynamic query generation, fault-tolerant scheduled processing",
        "OpenSearch cold tier — 90+ day retention at ~75% lower storage cost",
        "One query layer serving 10+ teams with zero deployment-specific code",
      ],
      stack: ["Java", "Spring Boot", "Elasticsearch", "OpenSearch", "REST APIs"],
      metrics: [
        { to: 90, suffix: "+", label: "day log retention" },
        { to: 10, suffix: "+", label: "engineering teams" },
        { to: 80, suffix: "+", label: "applications onboarded" },
        { to: 99.9, suffix: "%", decimals: 1, label: "pipeline uptime" },
        { to: 75, suffix: "%", label: "storage cost reduction" },
      ],
    },
    {
      id: "error-clustering",
      index: "PROJECT 02",
      title: "Error Clustering & Alerting Platform",
      problem:
        "Engineers were drowning in duplicate error logs. The same failure surfaced hundreds of times across services, and every occurrence was investigated as if it were new — burning hours on repeat root-cause analysis.",
      architecture: [
        "Error logs ingested and normalized from OpenSearch",
        "Sentence embeddings convert each error into a semantic vector",
        "Vector similarity clustering with intelligent cluster merging",
        "Vue.js dashboard + alerting — one investigation per root cause",
      ],
      stack: ["Python", "OpenSearch", "Sentence Embeddings", "Vector Search", "Vue.js", "ML Pipelines"],
      metrics: [
        { to: 80, suffix: "%", label: "faster clustering" },
        { to: 50, suffix: "%", label: "fewer duplicate investigations" },
        { to: 65, suffix: "%", label: "faster root-cause analysis" },
      ],
    },
  ],
};

export const projects = [
  {
    id: "axiom",
    num: "01",
    name: "Axiom",
    tagline: "Multi-tenant technical assessment SaaS",
    image:
      "https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?crop=entropy&cs=srgb&fm=jpg&q=85",
    imageAlt: "Abstract dark architecture representing Axiom's multi-tenant system design",
    description:
      "Hiring teams juggle spreadsheets, email threads, and ad-hoc quizzes to run technical assessments. Axiom replaces that chaos with one multi-tenant platform where recruiters create, publish, and evaluate assessments — and candidates get a clean, focused experience. It is designed from day one to evolve into a full hiring-automation SaaS.",
    features: [
      "Multi-tenant architecture with strict data isolation per organization",
      "JWT authentication with role-based access control across every endpoint",
      "Three portals — Platform Admin, Recruiter dashboard, Candidate portal",
      "Full assessment lifecycle: create, publish, assign, evaluate",
      "Stateless REST API secured end-to-end with Spring Security",
    ],
    decisions: [
      "Shared-schema multi-tenancy with tenant context on every query — simple to operate today, migratable to schema-per-tenant when scale demands it.",
      "Stateless JWT access tokens + role guards at the controller layer keep the API horizontally scalable with no session store.",
      "Three portals, one design system — recruiter, candidate, and admin UIs share a component library to keep velocity high.",
      "Trade-off: synchronous evaluation keeps consistency simple; async grading queues are the planned next step.",
    ],
    codeBlock: `axiom/
├── server/                    # Spring Boot — multi-tenant core
│   ├── config/                # JWT filter, tenant resolver, security
│   ├── modules/
│   │   ├── auth/              # signup, login, token issue/refresh
│   │   ├── assessment/        # create → publish → assign → evaluate
│   │   ├── candidate/         # candidate portal workflows
│   │   └── recruiter/         # dashboards, pipelines, reports
│   └── common/                # RBAC guards, tenant context
└── client/                    # React + TypeScript
    ├── portals/admin/
    ├── portals/recruiter/
    └── portals/candidate/`,
    lessons:
      "Designing tenant isolation first forced discipline everywhere — every entity, query, and test carries tenant context by default.",
    stack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "JWT", "Spring Data JPA"],
    github: null,
    demo: null,
    private: true,
  },
  {
    id: "slack-assistant",
    num: "02",
    name: "Slack Support Assistant",
    tagline: "Self-improving RAG knowledge system for support channels",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?crop=entropy&cs=srgb&fm=jpg&q=85",
    imageAlt: "Code on a dark screen representing the Slack RAG assistant pipeline",
    description:
      "Support channels answer the same questions every week. This assistant learns from the channel's own history: it ingests threaded conversations, distills them into structured query-solution pairs, indexes them in FAISS, and then answers new questions directly in the Slack thread — with the knowledge base updating itself as new resolutions land.",
    pipeline: [
      "Ingest threaded messages via Slack SDK — filter bots, system noise, low-quality threads",
      "Clean markup, assign roles (first message = user, rest = support)",
      "LLM extracts structured Query / Solution pairs",
      "Chunk + embed with FastEmbed, store in a FAISS vector index",
      "LangChain RetrievalQA answers @mentions in-thread via Socket Mode",
      "Resolved threads feed back into the knowledge base",
    ],
    features: [
      "Self-updating knowledge base distilled from real resolutions",
      "Semantic retrieval over FAISS with FastEmbed embeddings",
      "Custom LangChain LLM wrapper around an internal API",
      "Thread-aware replies with Slack Bolt in Socket Mode",
    ],
    stack: ["Python", "LangChain", "FAISS", "FastEmbed", "Slack Bolt", "RAG"],
    github: "https://github.com/Vijay8161/slack-support-bot",
    demo: null,
  },
  {
    id: "voice-gender",
    num: "03",
    name: "Voice Gender Detection",
    tagline: "Deep learning research on speech classification",
    image:
      "https://images.unsplash.com/photo-1708779493105-9c743e367a3c?crop=entropy&cs=srgb&fm=jpg&q=85",
    imageAlt: "Dark abstract texture representing audio waveforms and neural networks",
    description:
      "A research-style exploration of how architecture choice affects speech classification. The same audio pipeline feeds three model families — a ResNet over mel-spectrograms, an LSTM over temporal features, and a hybrid ResNet + Transformer — and each is evaluated on accuracy, stability, and convergence behavior.",
    pipeline: [
      "Raw audio ingestion and normalization",
      "Preprocessing — silence trimming, resampling, feature extraction",
      "Mel-spectrogram + temporal feature generation",
      "Model training — ResNet, LSTM, and hybrid ResNet + Transformer",
      "Evaluation — accuracy, loss curves, architecture comparison",
    ],
    metrics: [
      { to: 93, suffix: "%", label: "classification accuracy" },
      { to: 3, suffix: "", label: "model architectures compared" },
    ],
    models: [
      { name: "ResNet", note: "Convolutional features over mel-spectrograms" },
      { name: "LSTM", note: "Temporal sequence modeling of speech features" },
      { name: "ResNet + Transformer", note: "Hybrid — spatial features with attention over time" },
    ],
    stack: ["Python", "Deep Neural Networks", "ResNet", "LSTM", "Transformers", "React", "Vite"],
    github: "https://github.com/Vijay8161/VoiceBasedGenderRecognition_Models",
    extraLink: { label: "UI Repository", url: "https://github.com/Vijay8161/VoiceBasedGenderRecognition_UI" },
    demo: "https://voice-based-gender-recognition-ui.vercel.app",
  }
];

export const moreProjects = [
  {
    name: "Legal & Medical NER Microservices",
    description:
      "Production-style NLP pipeline — a FastAPI inference service (Legal-BERT + BioBERT) behind a Node.js gateway with OCR and PDF ingestion, fully Dockerized.",
    stack: ["FastAPI", "Node.js", "HuggingFace", "Docker"],
    url: "https://github.com/Vijay8161/lam-be",
  },
  {
    name: "gRPC vs REST Benchmark",
    description:
      "Controlled Spring Boot benchmark comparing gRPC and REST under identical payloads — Apache Bench, 2000 requests at concurrency 100.",
    stack: ["Java", "Spring Boot", "gRPC", "Apache Bench"],
    url: "https://github.com/Vijay8161/grpc-vs-rest",
  },
  {
    name: "System Design in Java",
    description:
      "A working study of design concepts and patterns implemented in Java — built to turn theory into muscle memory.",
    stack: ["Java", "Design Patterns"],
    url: "https://github.com/Vijay8161/system-design",
  },
  {
    name: "Weeb",
    description:
      "A MERN-stack social platform for anime communities featuring user authentication, friend connections, photo sharing, and like/dislike interactions, backed by REST APIs and MongoDB.",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "REST APIs"],
    url: "https://github.com/Vijay8161/weeb_frontend",
  }
];

export const philosophy = [
  {
    num: "01",
    title: "Write code for the reader",
    body: "Code is read a hundred times more than it is written. I optimize for the engineer who arrives six months later — clear names, small functions, boring exactly where it should be.",
  },
  {
    num: "02",
    title: "Design for scale, build for today",
    body: "Every system I design has a growth story, but I ship the simplest version that works. Multi-tenant from day one at Axiom; sharding when the data says so.",
  },
  {
    num: "03",
    title: "Build software that saves time",
    body: "I enjoy building products that remove repetitive work and let people focus on what matters. Whether it's automating log aggregation, streamlining hiring workflows, or improving developer experience, the best software gives people their time back.",
  },
  {
    num: "04",
    title: "Performance is a feature",
    body: "A 75% storage reduction didn't happen by accident. Measure first, optimize deliberately, and verify every claim with numbers — not vibes.",
  },
  {
    num: "05",
    title: "If it isn't observable, it isn't done",
    body: "Logs, metrics, and traces are part of the feature, not an afterthought. At Garmin I built the pipelines I'd want to debug with at 3 AM.",
  },
  {
    num: "06",
    title: "Stay dangerously curious",
    body: "From gRPC benchmarks to RAG pipelines, I learn by building. The best engineers I know never stopped being students.",
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "Python", "SQL", "JavaScript"] },
  { group: "Backend", items: ["Spring Boot", "Spring Data JPA", "Node.js", "Express.js", "FastAPI", "Microservices"] },
  { group: "Frontend", items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "AI / ML", items: ["RAG Pipelines","Clustering Algorithms", "FAISS", "FastEmbed", "Sentence Embeddings", "HuggingFace"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB","Elasticsearch", "OpenSearch", "ELK Stack"] },
  { group: "Messaging", items: ["Apache Kafka", "RabbitMQ"] },
  { group: "Cloud & DevOps", items: ["AWS (Certified)", "Docker", "Podman", "Git", "Maven", "Postman"] },
];

export const achievements = [
  {
    date: "May 2025",
    title: "AWS Certified Cloud Practitioner",
    body: "Validated foundational knowledge of AWS cloud architecture, security, networking, pricing, and monitoring.",
  },
  {
    date: "2025",
    title: "GATE 2025",
    body: "Qualified the Graduate Aptitude Test in Engineering (CS/IT), among the most competitive CS examinations in India.",
  },
  {
    date: "Ongoing",
    title: "450+ LeetCode problems",
    body: "Solved 400+ data structures and algorithms problems — the daily reps behind strong fundamentals.",
  },
  {
    date: "2024",
    title: "VIKAS 2024 — VIT-AP Innovation Summit",
    body: "Showcased Eco-sort, a waste-segregation project, at the VIT-AP Innovation Knowledge Acquisition Summit with positive reviewer feedback.",
  },
  {
    date: "Hackathons",
    title: "24-hour prototype builds",
    body: "Built prototype applications across multiple hackathons, including a rural-health medication services platform in 24 hours.",
  },
  {
    date: "Leadership",
    title: "Documentation Lead — Be a Nerd Club",
    body: "Owned technical documentation and content organization for club projects and activities at VIT-AP.",
  },
];

export const navLinks = [
  { label: "Experience", id: "experience" },
  { label: "Work", id: "work" },
  { label: "Philosophy", id: "philosophy" },
  { label: "Skills", id: "skills" },
  { label: "GitHub", id: "github" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];
