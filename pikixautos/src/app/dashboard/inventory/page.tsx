import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getVehicles } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AddVehicleDialog } from "./_components/add-vehicle-dialog";

export default function InventoryPage() {
  const vehicles = getVehicles();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Vehicle Inventory</CardTitle>
                <CardDescription>
                    Manage your vehicle listings.
                </CardDescription>
            </div>
            <AddVehicleDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Year
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => {
              const image = PlaceHolderImages.find(
                (p) => p.id === vehicle.images[0]
              );
              return (
                <TableRow key={vehicle.id}>
                  <TableCell className="hidden sm:table-cell">
                    {image && (
                      <Image
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={image.imageUrl}
                        width="64"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {vehicle.make} {vehicle.model}
                  </TableCell>
                  <TableCell>
                    <Badge variant={vehicle.status === 'Sold' ? 'destructive' : vehicle.status === 'Pending' ? 'secondary' : 'default'}>
                        {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${vehicle.price.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicle.year}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Sold</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
