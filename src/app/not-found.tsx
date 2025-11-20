import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="p-8 font-mono">
      <h2 className="text-red-500 text-xl font-bold">404 - Page Not Found</h2>
      <p className="text-gray-400 mb-4">The requested resource could not be found.</p>
      <Link href="/" className="text-green-400 hover:underline">Return Home</Link>
    </div>
  )
}
