import { profile } from "@/data/profile";

export default function ContactPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <ul className="space-y-2">
        {Object.entries(profile.socials).map(([key, val]) => (
          <li key={key} className="flex gap-4">
            <span className="font-bold capitalize w-24">{key}:</span>
            <a href={val} className="text-blue-400 hover:underline">{val}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
