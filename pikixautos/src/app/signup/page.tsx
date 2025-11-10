"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth, initiateEmailSignUp, setDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import { useFirestore } from "@/firebase";


const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Non-blocking call to create user
      initiateEmailSignUp(auth, values.email, values.password);

      // We can't get the user immediately, so we listen for auth state changes.
      // For this simple case, we'll assume success and create the user doc
      // with a placeholder ID, which isn't ideal. A better approach involves
      // server-side handling or more complex client-side listeners.
      
      // A truly robust solution would be to use a server-side function (like a Firebase Function) 
      // triggered on user creation to create the Firestore document.
      // This is a client-side approximation for simplicity.
      
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const userRef = doc(firestore, "users", user.uid);
          const userData = {
            id: user.uid,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            registrationDate: new Date().toISOString(),
          };
          setDocumentNonBlocking(userRef, userData, { merge: true });
          
          toast({
            title: "Account Created",
            description: "Welcome! You are now logged in.",
          });
          router.push("/dashboard");

          unsubscribe(); // Clean up the listener
        }
      });

    } catch (error: any) {
      console.error("Sign Up Error:", error);
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>Join PIKIX AUTOS to find your next vehicle.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </Form>
             <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline hover:text-primary">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
