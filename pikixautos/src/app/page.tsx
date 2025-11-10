import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import VehicleCard from "@/components/vehicle-card";
import { getFeaturedVehicles } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredVehicles = getFeaturedVehicles(4);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
              Find Your Next Ride
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
              The premier marketplace for buying and selling cars in Nigeria.
            </p>
            <div className="mt-8 max-w-lg mx-auto">
              <form action="/vehicles">
                <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
                  <Input
                    name="search"
                    className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground pl-6"
                    placeholder="e.g. Toyota Camry 2022"
                  />
                  <Button type="submit" size="icon" className="rounded-full m-1 bg-accent hover:bg-accent/90 shrink-0">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section id="featured" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Vehicles</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                Explore our hand-picked selection of quality cars, trucks, and SUVs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/vehicles">
                  View All Listings <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
