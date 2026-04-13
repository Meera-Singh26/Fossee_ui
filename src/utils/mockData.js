// Mock data – replace with real API calls in production
export const WORKSHOPS = [
  {
    id: 1,
    title: 'Python for Scientific Computing',
    category: 'Python',
    level: 'Beginner',
    duration: '2 Days',
    date: '2025-05-15',
    seats: 40,
    bookedSeats: 28,
    instructor: 'Prof. Prabhu Ramachandran',
    location: 'IIT Bombay, Mumbai',
    mode: 'Offline',
    description:
      'Learn Python fundamentals with NumPy, SciPy, and Matplotlib for scientific applications. Hands-on exercises with real datasets.',
    topics: ['NumPy', 'SciPy', 'Matplotlib', 'Pandas'],
    prerequisites: 'Basic programming knowledge',
    tags: ['python', 'science', 'data'],
  },
  {
    id: 2,
    title: 'Scilab for Engineering Applications',
    category: 'Scilab',
    level: 'Intermediate',
    duration: '3 Days',
    date: '2025-05-22',
    seats: 35,
    bookedSeats: 35,
    instructor: 'Dr. Manas Das',
    location: 'Online (Zoom)',
    mode: 'Online',
    description:
      'Master Scilab for control systems, signal processing, and numerical methods used in engineering disciplines.',
    topics: ['Control Systems', 'Signal Processing', 'Optimization', 'Simulation'],
    prerequisites: 'Engineering mathematics',
    tags: ['scilab', 'engineering', 'control'],
  },
  {
    id: 3,
    title: 'R for Data Analysis',
    category: 'R',
    level: 'Beginner',
    duration: '2 Days',
    date: '2025-06-05',
    seats: 50,
    bookedSeats: 12,
    instructor: 'Dr. Sameer Sapre',
    location: 'IIT Bombay, Mumbai',
    mode: 'Offline',
    description:
      'Introduction to R programming for statistical analysis, data visualization, and predictive modeling.',
    topics: ['Data Frames', 'ggplot2', 'dplyr', 'Linear Regression'],
    prerequisites: 'Basic statistics',
    tags: ['r', 'statistics', 'data science'],
  },
  {
    id: 4,
    title: 'LaTeX for Academic Writing',
    category: 'LaTeX',
    level: 'Beginner',
    duration: '1 Day',
    date: '2025-06-12',
    seats: 60,
    bookedSeats: 45,
    instructor: 'Mr. Aditya Padalkar',
    location: 'Online (Zoom)',
    mode: 'Online',
    description:
      'Create professional research papers, theses, and presentations using LaTeX with BibTeX referencing.',
    topics: ['Document Structure', 'Math Equations', 'BibTeX', 'Beamer'],
    prerequisites: 'None',
    tags: ['latex', 'writing', 'academic'],
  },
  {
    id: 5,
    title: 'OpenFOAM for CFD Simulations',
    category: 'OpenFOAM',
    level: 'Advanced',
    duration: '3 Days',
    date: '2025-07-01',
    seats: 25,
    bookedSeats: 8,
    instructor: 'Prof. Kannan Iyer',
    location: 'IIT Bombay, Mumbai',
    mode: 'Offline',
    description:
      'Computational Fluid Dynamics using open-source OpenFOAM toolkit for complex flow simulations.',
    topics: ['Mesh Generation', 'Boundary Conditions', 'Turbulence Models', 'Post-processing'],
    prerequisites: 'Fluid mechanics, Linux basics',
    tags: ['cfd', 'simulation', 'engineering'],
  },
  {
    id: 6,
    title: 'Django Web Development',
    category: 'Python',
    level: 'Intermediate',
    duration: '2 Days',
    date: '2025-07-14',
    seats: 40,
    bookedSeats: 22,
    instructor: 'Ms. Priyanka Bhatia',
    location: 'Online (Zoom)',
    mode: 'Online',
    description:
      'Build full-featured web applications with Django framework including REST APIs and authentication.',
    topics: ['Models', 'Views', 'Templates', 'REST API', 'Auth'],
    prerequisites: 'Python basics',
    tags: ['django', 'web', 'python'],
  },
];

export const CATEGORIES = ['All', 'Python', 'Scilab', 'R', 'LaTeX', 'OpenFOAM'];
export const LEVELS     = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
export const MODES      = ['All Modes', 'Online', 'Offline'];

export const STATS = [
  { value: '10,000+', label: 'Workshops Conducted' },
  { value: '5 Lakh+', label: 'Students Trained' },
  { value: '800+',    label: 'Colleges Covered' },
  { value: '15+',     label: 'Open Source Tools' },
];

export const TESTIMONIALS = [
  {
    name: 'Anjali Sharma',
    college: 'NIT Trichy',
    text: 'The Python workshop completely changed my approach to data analysis. The instructors were world-class and the hands-on sessions were extremely well structured.',
    course: 'Python for Scientific Computing',
  },
  {
    name: 'Rohit Verma',
    college: 'BITS Pilani',
    text: 'FOSSEE workshops are genuinely different from what you find on YouTube. Deep, rigorous, and practically applicable. Highly recommend to every engineering student.',
    course: 'Scilab for Engineering',
  },
  {
    name: 'Priya Nair',
    college: 'VIT Vellore',
    text: 'Booking was simple, the content was excellent, and the certificate adds real value to your resume. The LaTeX workshop saved me weeks of frustration with my thesis!',
    course: 'LaTeX for Academic Writing',
  },
];
