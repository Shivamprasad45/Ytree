import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { TreePine } from "lucide-react"
import Link from "next/link"
import MaxWidthRappers from "@/components/MaxWidthRapper"
import Image from "next/image"

export function EmptyState() {
  return (
    <MaxWidthRappers>
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[80vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-10 pb-6 text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <TreePine className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Trees Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t planted any trees yet. Start your forest journey by planting your first tree.
            </p>
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Empty forest illustration"
              width={300}
              height={200}
              className="mx-auto rounded-lg mb-6"
            />
          </CardContent>
          <CardFooter className="flex justify-center pb-8">
            <Button asChild size="lg">
              <Link href="/Tree/order">Plant Your First Tree</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MaxWidthRappers>
  )
}

