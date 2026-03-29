import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 text-8xl font-bold text-gradient-gold">404</h1>
          <p className="mb-2 text-2xl font-semibold">Página não encontrada</p>
          <p className="mb-8 text-muted-foreground max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button variant="gold" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Voltar para Home
            </Link>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
