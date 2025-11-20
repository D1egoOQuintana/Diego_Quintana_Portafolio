import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="p-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-green-400">{project.title}</h1>
      <div className="flex gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-gray-800 rounded text-sm text-gray-300">
            {tech}
          </span>
        ))}
      </div>
      <p className="text-xl text-gray-300 mb-8">{project.description}</p>
      
      {project.metrics && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
          <ul className="list-disc list-inside text-gray-300">
            {project.metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4">
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">
            View Demo
          </a>
        )}
        {project.links.repo && (
          <a href={project.links.repo} target="_blank" className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
            View Code
          </a>
        )}
      </div>
    </article>
  );
}
