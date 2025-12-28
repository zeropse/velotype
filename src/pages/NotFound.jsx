import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconHome,
  IconArrowLeft,
  IconAlertTriangle,
} from "@tabler/icons-react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Velotype";
  }, []);

  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4">
      <div className="w-full max-w-xl">
        <Card className="border-border/60 bg-card/60 shadow-xl">
          <CardContent className="p-8 sm:p-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <IconAlertTriangle
                className="h-6 w-6 text-destructive"
                stroke={1.75}
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Error 404
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Page not found
            </h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              The page you are trying to access does not exist, was removed, or
              is temporarily unavailable.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <IconHome className="h-4 w-4" />
                  Go to homepage
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 cursor-pointer"
                onClick={() => window.history.back()}
              >
                <IconArrowLeft className="h-4 w-4" />
                Go back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
