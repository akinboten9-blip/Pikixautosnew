import { PikixAutosLogo } from "@/components/icons/logo";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <PikixAutosLogo className="h-6 w-auto text-primary" />
            <span className="font-bold">PIKIX AUTOS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PIKIX AUTOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
