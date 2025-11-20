import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "cubicutec",
    title: "Cubicutec",
    description: "Sistema de reserva de cubículos para TECSUP. Optimiza tiempos y gestión de espacios.",
    techStack: ["React", "Vite", "Spring Boot", "MySQL"],
    metrics: ["Gestión en tiempo real", "Reducción de conflictos"],
    links: {
      repo: "https://github.com/ldquintana/cubicutec"
    },
    year: "2025",
    details: {
      overview: "Cubicutec es una solución integral desarrollada para optimizar la gestión de espacios de estudio en TECSUP. El sistema permite a estudiantes reservar cubículos de manera eficiente, eliminando conflictos de horario y maximizando el uso de recursos institucionales.",
      role: "Full Stack Developer & Team Lead",
      teamSize: "4 desarrolladores",
      duration: "3 meses (Octubre 2024 - Enero 2025)",
      contributions: [
        "Arquitectura completa del sistema: Diseñé la estructura backend con Spring Boot siguiendo principios SOLID y patrón MVC, implementando capas de servicio, controladores REST y repositorios JPA",
        "Desarrollo del frontend en React: Creé componentes reutilizables con hooks personalizados, implementé Context API para gestión de estado global y React Router para navegación SPA",
        "Sistema de autenticación JWT: Implementé login seguro con tokens JWT, refresh tokens automáticos, y middleware de autorización por roles (estudiante, administrador, staff)",
        "Base de datos relacional: Diseñé el modelo de datos en MySQL con normalización 3NF, índices optimizados para consultas frecuentes y triggers para validaciones de integridad",
        "API RESTful robusta: Desarrollé 15+ endpoints documentados con Swagger, validación de datos con Bean Validation, manejo centralizado de excepciones y respuestas estandarizadas",
        "Sistema de reservas en tiempo real: Implementé lógica de negocio para prevenir doble reserva con locks pesimistas en transacciones, validación de disponibilidad y cancelación automática de reservas expiradas",
        "Panel administrativo: Creé dashboard con métricas en tiempo real, gestión de usuarios, configuración de cubículos, reportes de uso y estadísticas visualizadas con Chart.js",
        "Notificaciones por email: Integré JavaMailSender para enviar confirmaciones de reserva, recordatorios automáticos 30 minutos antes y alertas de cancelación con plantillas HTML personalizadas"
      ],
      challenges: [
        "Prevención de condiciones de carrera: Resolví problemas de concurrencia cuando múltiples usuarios intentaban reservar el mismo cubículo simultáneamente usando transacciones optimistas y retry logic",
        "Optimización de rendimiento: Reduje tiempos de respuesta en 65% implementando caché de Redis para consultas frecuentes, lazy loading en el frontend y paginación en endpoints",
        "Gestión de zonas horarias: Implementé manejo consistente de fechas con ZonedDateTime de Java, asegurando sincronización correcta entre frontend y backend para reservas",
        "Testing exhaustivo: Alcancé 85% de cobertura con JUnit 5 y Mockito en backend, y React Testing Library en frontend, incluyendo tests de integración con base de datos en memoria H2"
      ],
      achievements: [
        "Reducción del 40% en conflictos de reserva comparado con el sistema manual anterior",
        "Adopción del 78% de estudiantes en el primer mes de lanzamiento",
        "Tiempo promedio de reserva reducido de 15 minutos a 2 minutos",
        "95% de satisfacción según encuesta de usuarios (250+ respuestas)",
        "Sistema escalable soportando hasta 500 usuarios concurrentes en pruebas de carga"
      ],
      features: [
        "Calendario interactivo con vista semanal/mensual y filtros por edificio y capacidad",
        "Búsqueda avanzada de cubículos disponibles con múltiples criterios (ubicación, horario, equipamiento)",
        "Sistema de favoritos para guardar cubículos preferidos",
        "Historial completo de reservas con opción de exportar a PDF",
        "Sistema de puntuación para premiar uso responsable y penalizar inasistencias",
        "Modo oscuro/claro con preferencias persistentes",
        "Responsive design optimizado para móviles (70% del tráfico)",
        "Integración con Google Calendar para sincronizar reservas"
      ]
    }
  },
  {
    slug: "blaxells",
    title: "Blaxells Ecommerce",
    description: "Tienda online de tecnología con panel administrativo y catálogo dinámico.",
    techStack: ["Laravel", "PHP", "Tailwind CSS", "MySQL"],
    metrics: ["Catálogo dinámico", "Panel Admin completo"],
    links: {
      repo: "https://github.com/ldquintana/blaxells"
    },
    year: "2024"
  },
  {
    slug: "inventory-sys",
    title: "Inventory System",
    description: "Sistema de gestión de inventarios para bodegas y almacenes.",
    techStack: ["Python", "Django", "React", "PostgreSQL"],
    metrics: ["Control de stock", "Trazabilidad total"],
    links: {
      repo: "https://github.com/ldquintana/inventory"
    },
    year: "2024"
  },
  {
    slug: "qr-attendance",
    title: "QR Attendance",
    description: "App móvil para registro de asistencia escolar mediante códigos QR.",
    techStack: ["Flutter", "Firebase", "Dart"],
    metrics: ["Registro instantáneo", "Sync en la nube"],
    links: {
      repo: "https://github.com/ldquintana/qr-attendance"
    },
    year: "2024"
  }
];
