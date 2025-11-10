import { getVehicles } from "@/lib/data";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import VehicleCard from "@/components/vehicle-card";
import SearchFilters from "./_components/search-filters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function VehiclesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const allVehicles = getVehicles();
  // In a real app, you would filter `allVehicles` based on `searchParams`
  const searchTerm = searchParams?.search || "";

  const filteredVehicles = allVehicles.filter(v => 
    `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(String(searchTerm).toLowerCase()) &&
    v.status === 'Available'
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 mt-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <SearchFilters />
          </aside>
          <main className="w-full lg:w-3/4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold font-headline">Vehicle Listings</h1>
              <p className="text-muted-foreground">{filteredVehicles.length} vehicles found</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
