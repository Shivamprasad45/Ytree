import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  CalendarIcon,
  MapPinIcon,
  TreePine,
  Truck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import type { IPlantProfile } from "../../../../../type";

interface TreeCardProps {
  tree: IPlantProfile;
  getDaysOld: (age: string | number | Date) => number;
}

export function TreeCard({ tree, getDaysOld }: TreeCardProps) {
  const getStatusIcon = () => {
    switch (tree.status) {
      case 0:
        return <Clock className="h-4 w-4" />;
      case 1:
        return <Truck className="h-4 w-4" />;
      case 2:
        return <TreePine className="h-4 w-4" />;
      case 3:
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusText = () => {
    switch (tree.status) {
      case 0:
        return "Pending";
      case 1:
        return "Shipping";
      case 2:
        return "Ready to Plant";
      case 3:
        return "Planted";
      default:
        return "Processing";
    }
  };

  const getStatusColor = () => {
    switch (tree.status) {
      case 0:
        return "bg-yellow-100 text-yellow-800";
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-purple-100 text-purple-800";
      case 3:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <img
          src={tree.imageUrl || "/placeholder.svg"}
          alt={`${tree.name} tree`}
          className="w-full h-48 object-cover"
        />
        <div
          className={`absolute top-3 right-3 ${getStatusColor()} px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5`}
        >
          {getStatusIcon()}
          {getStatusText()}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <TreePine className="h-5 w-5 text-green-600" />
              {tree.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1">
              <MapPinIcon className="h-3.5 w-3.5" />
              ID: {tree.findtree_id}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {tree.status === 3 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{getDaysOld(tree.age).toLocaleString()} days old</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {tree.status === 2 ? (
          <Button className="w-full" asChild>
            <Link
              href={`/Tree/LogTree?id=${tree._id}&Plaintid=${tree.Plaintid}&userid=${tree.UserId}`}
            >
              Mark as Planted
            </Link>
          </Button>
        ) : (
          <Button
            variant={tree.status === 3 ? "default" : "secondary"}
            className="w-full"
            asChild
            disabled={tree.status !== 3}
          >
            <Link
              href={
                tree.status === 3
                  ? `/Tree/Aboutmytree/${tree.findtree_id}`
                  : "#"
              }
            >
              {tree.status === 3 ? "View Details" : "Awaiting Status Update"}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
