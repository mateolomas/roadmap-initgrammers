import { RoadmapPhase } from '../types/roadmap';

export const roadmapData: RoadmapPhase[] = [
  {
    id: 1,
    title: "HTML",
    completed: false,
    description: "Fundamentos de HTML para estructura web",
    steps: [
      { 
        id: "1.1", 
        name: "Curso de HTML para principiantes (Fácil, Inglés, Curso)", 
        completed: false,
        description: "Curso completo que cubre los fundamentos de HTML5, incluyendo elementos semánticos y formularios.",
        resources: [
          {
            title: "freeCodeCamp HTML Course",
            url: "https://www.freecodecamp.org/learn/responsive-web-design/#basic-html-and-html5"
          },
          {
            title: "W3Schools HTML Tutorial",
            url: "https://www.w3schools.com/html/"
          }
        ]
      },
      { 
        id: "1.2", 
        name: "MDN HTML (Intermedio, Español, Documentación)", 
        completed: false,
        description: "Documentación oficial de Mozilla sobre HTML con ejemplos prácticos y mejores prácticas.",
        resources: [
          {
            title: "MDN HTML Guide",
            url: "https://developer.mozilla.org/es/docs/Web/HTML"
          },
          {
            title: "HTML Living Standard",
            url: "https://html.spec.whatwg.org/"
          }
        ]
      }
    ],
    estimated_time: "1-2 semanas",
  },
  {
    id: 2,
    title: "CSS",
    completed: false,
    description: "Estilización y diseño de páginas web",
    steps: [
      { 
        id: "2.1", 
        name: "Flexbox en español (Fácil, Español, Curso)", 
        completed: false,
        description: "Aprende a crear layouts flexibles y responsivos con Flexbox.",
        resources: [
          {
            title: "Flexbox Froggy",
            url: "https://flexboxfroggy.com/#es"
          },
          {
            title: "CSS Tricks - Guía Completa de Flexbox",
            url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
          }
        ]
      },
      { 
        id: "2.2", 
        name: "CSS Grid Guide (Intermedio, Inglés, Artículo)", 
        completed: false,
        description: "Domina el sistema de layout más potente de CSS con Grid.",
        resources: [
          {
            title: "Grid Garden",
            url: "https://cssgridgarden.com/#es"
          },
          {
            title: "MDN CSS Grid Layout",
            url: "https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout"
          }
        ]
      }
    ],
    estimated_time: "2-3 semanas",
  },
  {
    id: 3,
    completed: false,
    title: "Responsive Web Design",
    description: "Diseño adaptable para múltiples dispositivos",
    steps: [
      { 
        id: "3.1", 
        name: "Curso de RWD (Fácil, Inglés, Curso)", 
        completed: false,
        description: "Aprende los fundamentos del diseño responsivo y media queries.",
        resources: [
          {
            title: "freeCodeCamp Responsive Web Design",
            url: "https://www.freecodecamp.org/learn/responsive-web-design/"
          },
          {
            title: "Responsive Web Design Fundamentals",
            url: "https://web.dev/responsive-web-design-basics/"
          }
        ]
      },
      { 
        id: "3.2", 
        name: "MDN Responsive Design (Intermedio, Español, Documentación)", 
        completed: false,
        description: "Guía completa sobre diseño responsivo y mejores prácticas.",
        resources: [
          {
            title: "MDN Responsive Design",
            url: "https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design"
          },
          {
            title: "Responsive Design Patterns",
            url: "https://patterns.dev/posts/responsive-design/"
          }
        ]
      }
    ],
    estimated_time: "2-3 semanas",

  },
  {
    id: 4,
    completed: false,
    title: "JavaScript",
    description: "Programación del lado del cliente",
    steps: [
      { 
        id: "4.1", 
        name: "MDN JavaScript (Fácil/Intermedio, Español, Documentación)", 
        completed: false,
        description: "Guía completa de JavaScript moderno con ejercicios prácticos.",
        resources: [
          {
            title: "MDN JavaScript Guide",
            url: "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide"
          },
          {
            title: "JavaScript.info",
            url: "https://es.javascript.info/"
          }
        ]
      },
      { 
        id: "4.2", 
        name: "Eloquent JavaScript (Intermedio, Inglés, Libro)", 
        completed: false,
        description: "Libro profundo sobre JavaScript con ejemplos y ejercicios.",
        resources: [
          {
            title: "Eloquent JavaScript Online",
            url: "https://eloquentjavascript.net/"
          },
          {
            title: "JavaScript 30",
            url: "https://javascript30.com/"
          }
        ]
      }
    ],
    estimated_time: "3-4 semanas",
  },
  {
    id: 5,
    completed: false,
    title: "TypeScript",
    description: "JavaScript con tipado estático",
    steps: [
      { 
        id: "5.1", 
        name: "Curso de TypeScript (Fácil/Intermedio, Inglés, Documentación)", 
        completed: false,
        description: "Introducción a TypeScript y sus conceptos fundamentales.",
        resources: [
          {
            title: "TypeScript Handbook",
            url: "https://www.typescriptlang.org/docs/"
          },
          {
            title: "TypeScript Deep Dive",
            url: "https://basarat.gitbook.io/typescript/"
          }
        ]
      },
      { 
        id: "5.2", 
        name: "Guía de Tipos en TS (Avanzado, Inglés, Documentación)", 
        completed: false,
        description: "Conceptos avanzados de tipado en TypeScript.",
        resources: [
          {
            title: "Advanced Types",
            url: "https://www.typescriptlang.org/docs/handbook/advanced-types.html"
          },
          {
            title: "TypeScript Playground",
            url: "https://www.typescriptlang.org/play"
          }
        ]
      }
    ],
    estimated_time: "2-3 semanas",
  },
  {
    id: 6,
    completed: false,
    title: "Buenas Prácticas",
    description: "Patrones y estándares de desarrollo profesional",
    steps: [
      { 
        id: "6.1", 
        name: "Clean Code Summary (Intermedio, Inglés, Repositorio)", 
        completed: false,
        description: "Principios de código limpio y mantenible.",
        resources: [
          {
            title: "Clean Code JavaScript",
            url: "https://github.com/ryanmcdermott/clean-code-javascript"
          },
          {
            title: "SOLID Principles",
            url: "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design"
          }
        ]
      },
      { 
        id: "6.2", 
        name: "Refactoring Guru (Avanzado, Inglés, Artículos)", 
        completed: false,
        description: "Patrones de diseño y técnicas de refactorización.",
        resources: [
          {
            title: "Refactoring Guru - Design Patterns",
            url: "https://refactoring.guru/design-patterns"
          },
          {
            title: "Refactoring Guru - Refactoring",
            url: "https://refactoring.guru/refactoring"
          }
        ]
      }
    ],
    estimated_time: "2-3 semanas",

  },
  {
    id: 7,
    completed: false,
    title: "Control de Versiones",
    description: "Gestión de cambios en el código",
    steps: [
      { 
        id: "7.1", 
        name: "Aprende Git y GitHub (Fácil/Intermedio, Inglés, Interactivo)", 
        completed: false,
        description: "Fundamentos de control de versiones con Git y GitHub.",
        resources: [
          {
            title: "Git - La guía sencilla",
            url: "https://rogerdudler.github.io/git-guide/index.es.html"
          },
          {
            title: "GitHub Skills",
            url: "https://skills.github.com/"
          }
        ]
      },
      { 
        id: "7.2", 
        name: "Conventional Commits (Intermedio, Inglés, Especificación)", 
        completed: false,
        description: "Especificación para mensajes de commit estandarizados.",
        resources: [
          {
            title: "Conventional Commits",
            url: "https://www.conventionalcommits.org/es/v1.0.0/"
          },
          {
            title: "Semantic Versioning",
            url: "https://semver.org/lang/es/"
          }
        ]
      }
    ],
    estimated_time: "1-2 semanas",
  
  },
  {
    id: 8,
    completed: false,
    title: "Fullstack Development",
    description: "Desarrollo completo frontend y backend",
    steps: [
      { 
        id: "8.1", 
        name: "Fullstack Open (Intermedio, Inglés, Curso)", 
        completed: false,
        description: "Curso completo de desarrollo web moderno con React y Node.js.",
        resources: [
          {
            title: "Full Stack Open",
            url: "https://fullstackopen.com/es/"
          },
          {
            title: "Node.js Documentation",
            url: "https://nodejs.org/es/docs/"
          }
        ]
      },
      { 
        id: "8.2", 
        name: "The Odin Project (Intermedio, Inglés, Curso)", 
        completed: false,
        description: "Currículo completo de desarrollo web full stack.",
        resources: [
          {
            title: "The Odin Project",
            url: "https://www.theodinproject.com/"
          },
          {
            title: "MDN Web Docs",
            url: "https://developer.mozilla.org/es/docs/Learn"
          }
        ]
      }
    ],
    estimated_time: "4-8 semanas",
  }
];