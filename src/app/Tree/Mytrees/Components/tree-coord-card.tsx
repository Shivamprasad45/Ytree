import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TreeCoordCardProps {
  coord: {
    find_id: string;
    name: string;
    imageURL: string;
    bio?: string;
    verifed: boolean;
  };
}

export function TreeCoordCard({ coord }: TreeCoordCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/Tree/Aboutmytree/${coord.find_id}`} className="block">
        <div className="relative">
          <div className="h-48 w-full overflow-hidden relative">
            <Image
              src={coord.imageURL || "/placeholder.svg"}
              alt={coord.name || "Tree image"}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              style={{ objectPosition: "center" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {coord.verifed ? (
            <Badge className="absolute top-3 right-3 bg-green-100 text-green-800 flex items-center gap-1.5">
              <Leaf className="h-3 w-3" />
              Verified
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 flex items-center gap-1.5"
            >
              <AlertCircle className="h-3 w-3" />
              Pending Verification
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          {coord.verifed ? (
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {coord.name}
              </h3>
              {coord.bio && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {coord.bio}
                </p>
              )}
              <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>Location tracked</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-2">
              <h3 className="font-semibold text-base text-yellow-700">
                Awaiting Verification
              </h3>
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
