"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-green-50 text-green-900 p-2">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">
            Discover Our Plant-Sharing Community
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Share Your Green Journey
          </h2>
          <p className="mb-4">
            Welcome to our vibrant community of plant enthusiasts! Here, you can
            upload images of your beloved plants, share your gardening
            experiences, and connect with fellow plant lovers from around the
            world.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Image
              src="https://picsum.photos/id/237/200/300"
              alt="Plant sharing example"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="https://picsum.photos/id/235/200/300"
              alt="Community interaction"
              width={300}
              height={200}
              className="rounded-lg"
            />
            <Image
              src="https://picsum.photos/id/238/200/300"
              alt="Plant growth progress"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Easy image uploading for showcasing your plants</li>
            <li>Share your gardening experiences and tips</li>
            <li>Connect with a global community of plant enthusiasts</li>
            <li>Track your plants growth journey</li>
            <li>Get advice and support from experienced gardeners</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Why Join Our Community?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Learn and Grow</h3>
              <p>
                Gain valuable insights from experienced gardeners and expand
                your plant knowledge.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Share Your Success</h3>
              <p>
                Showcase your thriving plants and inspire others with your green
                thumb.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">Get Support</h3>
              <p>
                Troubleshoot plant problems and receive advice from our
                supportive community.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">
                Document Your Journey
              </h3>
              <p>
                Create a beautiful visual diary of your plants growth and
                progress.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Sign up for a free account</li>
            <li>Upload photos of your plants</li>
            <li>Share your gardening experiences and tips</li>
            <li>Connect with other plant enthusiasts</li>
            <li>Explore and learn from the community</li>
          </ol>
        </section>

        <section className="text-center bg-green-100 py-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Join Our Green Community?
          </h2>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/signup">Start Sharing Your Plants</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
