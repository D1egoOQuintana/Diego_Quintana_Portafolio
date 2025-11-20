import { profile } from "@/data/profile";

export default function AboutPage() {
  return (
    <article className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <p className="text-lg leading-relaxed text-gray-300">
        {profile.bio}
      </p>
    </article>
  );
}
