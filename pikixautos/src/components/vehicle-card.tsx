import Image from "next/image";
import Link from "next/link";
import { Gauge, MapPin, Wrench, Calendar } from "lucide-react";
import type { Vehicle } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const primaryImageId = vehicle.images[0];
  const image = PlaceHolderImages.find((img) => img.id === primaryImageId);

  return (
    <Card className="overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/vehicles/${vehicle.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            {image && (
              <Image
                src={image.imageUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
            )}
            <Badge 
              variant={vehicle.status === 'Sold' ? 'destructive' : vehicle.status === 'Pending' ? 'secondary' : 'default'} 
              className="absolute top-2 right-2"
            >
              {vehicle.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-lg font-headline mb-2">{`${vehicle.make} ${vehicle.model}`}</CardTitle>
          <p className="text-xl font-bold text-primary mb-3">
            ${vehicle.price.toLocaleString()}
          </p>
          <div className="text-sm text-muted-foreground space-y-2 mt-auto">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 shrink-0" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center">
              <Gauge className="w-4 h-4 mr-2 shrink-0" />
              <span>{vehicle.mileage.toLocaleString()} miles</span>
            </div>
            <div className="flex items-center">
              <Wrench className="w-4 h-4 mr-2 shrink-0" />
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 shrink-0" />
              <span className="truncate">{vehicle.location}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
