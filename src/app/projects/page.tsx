import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="text-xl text-blue-400 hover:underline">
              {project.title}
            </Link>
            <p className="text-gray-400">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
