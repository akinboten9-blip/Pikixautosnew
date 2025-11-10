import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Gauge,
  MapPin,
  Wrench,
  Palette,
  Car,
  CheckCircle,
  Shield,
  Truck,
  Banknote,
  Sparkles,
  Video
} from "lucide-react";

import { getVehicleById } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FinanceCalculator from "./_components/finance-calculator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    notFound();
  }

  const vehicleImages = vehicle.images
    .map((id) => PlaceHolderImages.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">{`${vehicle.make} ${vehicle.model}`}</h1>
                        <p className="text-muted-foreground">{vehicle.year}</p>
                    </div>
                     <Badge 
                        variant={vehicle.status === 'Sold' ? 'destructive' : vehicle.status === 'Pending' ? 'secondary' : 'default'} 
                        className="mt-2 sm:mt-0 text-base px-4 py-1"
                        >
                        {vehicle.status}
                    </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {vehicleImages.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video relative">
                          {image && <Image
                            src={image.imageUrl}
                            alt={`${vehicle.make} ${vehicle.model} image ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                            data-ai-hint={image.imageHint}
                          />}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold flex items-center mb-4">
                        <Video className="mr-2 h-5 w-5 text-primary"/>
                        Virtual Tour
                    </h2>
                    <p className="text-muted-foreground mb-4">Explore every angle of your next car from the comfort of your home.</p>
                    <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                        <Button variant="outline">
                            <Video className="mr-2 h-4 w-4" />
                            Launch 360° Tour
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed">
                  {vehicle.description}
                </p>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vehicle.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-3xl text-primary font-bold">
                  ${vehicle.price.toLocaleString()}
                </CardTitle>
                <CardDescription>Estimated costs and payments</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button className="w-full" size="lg" disabled={vehicle.status !== 'Available'}>
                    {vehicle.status === 'Available' ? 'Buy Now' : `Currently ${vehicle.status}`}
                 </Button>
                 <Button className="w-full mt-2" variant="outline" size="lg" disabled={vehicle.status !== 'Available'}>
                    Make an Offer
                 </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Specifications</CardTitle></CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center"><Car className="mr-2 h-4 w-4"/>Body Type</span>
                  <strong>{vehicle.bodyType}</strong>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center"><Gauge className="mr-2 h-4 w-4"/>Mileage</span>
                  <strong>{vehicle.mileage.toLocaleString()} miles</strong>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center"><Wrench className="mr-2 h-4 w-4"/>Transmission</span>
                  <strong>{vehicle.transmission}</strong>
                </div>
                 <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center"><Palette className="mr-2 h-4 w-4"/>Exterior/Interior</span>
                  <strong>{vehicle.exteriorColor}/{vehicle.interiorColor}</strong>
                </div>
                <Separator />
                 <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center"><MapPin className="mr-2 h-4 w-4"/>Location</span>
                  <strong>{vehicle.location}</strong>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Banknote className="mr-2 h-5 w-5"/>Finance Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <FinanceCalculator vehiclePrice={vehicle.price} />
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><Truck className="mr-2 h-5 w-5"/>Shipping & Logistics</CardTitle>
                    <CardDescription>Estimate shipping and import duties.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input id="destination" placeholder="Enter your city" />
                    </div>
                     <Button className="w-full" variant="secondary">Calculate Shipping</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
