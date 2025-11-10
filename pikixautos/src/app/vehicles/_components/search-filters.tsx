"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchFilters() {
  const [priceRange, setPriceRange] = useState([0, 100000]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Results</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="ford">Ford</SelectItem>
                <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                <SelectItem value="bmw">BMW</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" placeholder="e.g. Camry" />
          </div>

          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              defaultValue={priceRange}
              max={100000}
              step={1000}
              onValueChange={setPriceRange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body-type">Body Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Any Body Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="coupe">Coupe</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
           <div className="space-y-2">
            <Label>Year</Label>
            <div className="flex items-center gap-2">
                <Input placeholder="Min" type="number" />
                <span>-</span>
                <Input placeholder="Max" type="number" />
            </div>
          </div>
          
          <Button type="submit" className="w-full">Apply Filters</Button>
        </form>
      </CardContent>
    </Card>
  );
}
