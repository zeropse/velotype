import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/style/ModeToggle";
import { IconKeyboard, IconInfoCircle, IconHistory } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <IconKeyboard className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Velotype
            </span>
            <span className="text-[11px] text-muted-foreground/70">
              accelerate your typing skills
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="px-3 text-xs font-medium text-muted-foreground hover:text-primary"
          >
            <Link to="/history" className="inline-flex items-center gap-1.5">
              <IconHistory className="h-3.5 w-3.5" />
              <span>History</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs font-medium text-muted-foreground hover:text-primary px-3"
          >
            <Link to="/about" className="inline-flex items-center gap-1.5">
              <IconInfoCircle className="h-3.5 w-3.5" />
              <span>About</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
