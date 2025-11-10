"use client";

import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { PikixAutosLogo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { useAuth, useUser } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";

export function Header() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <PikixAutosLogo className="h-6 w-auto" />
          <span className="font-bold hidden sm:inline-block">PIKIX AUTOS</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {isUserLoading ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            ) : user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
