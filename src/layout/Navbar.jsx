import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/style/ModeToggle";
import { IconKeyboard, IconRefresh, IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4">
      <Link to="/">
        <div className="flex items-center">
          <IconKeyboard className="mr-2 h-6 w-6" /> Velotype
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <Button>
          <IconRefresh className="h-4 w-4" />
          Reset
        </Button>
        <Button asChild>
          <Link to="/about">
            <IconInfoCircle className="h-4 w-4" />
            About
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </nav>
  );
}
