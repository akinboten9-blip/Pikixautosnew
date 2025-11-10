"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  make: z.string().min(2, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear() + 1),
  mileage: z.coerce.number().min(0),
  bodyType: z.string().min(2, "Body type is required"),
  engine: z.string().min(2, "Engine details are required"),
  transmission: z.string(),
  exteriorColor: z.string().min(2, "Exterior color is required"),
  interiorColor: z.string().min(2, "Interior color is required"),
  features: z.string().min(2, "At least one feature is required"),
  description: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof formSchema>;

export function AddVehicleDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        year: new Date().getFullYear(),
        mileage: 0,
        transmission: "Automatic"
    },
  });

  function onSubmit(data: VehicleFormValues) {
    console.log(data);
    // Here you would typically call a server action to save the vehicle
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Vehicle</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Fill in the details for the new vehicle listing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-6">
            <div className="grid grid-cols-2 gap-4">
                <FormField name="make" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Make</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="model" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Model</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <FormField name="year" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Year</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="mileage" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Mileage</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField name="bodyType" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Body Type</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="engine" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Engine</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField name="transmission" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Automatic">Automatic</SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
                 <FormField name="exteriorColor" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Exterior Color</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField name="interiorColor" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Interior Color</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField name="features" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Features (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
            <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea rows={5} {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            
            <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit">Add Vehicle</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
