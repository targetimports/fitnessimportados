import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const Obrigado = () => {
  useEffect(() => {
    // Fire Meta Pixel Lead event
    if (window.fbq) {
      window.fbq("track", "Lead");
    }
  }, []);

  return (
    <PageTransition>
      <SEOHead
        title="Obrigado | Target Importadora"
        description="Obrigado por entrar em contato com a Target Importadora. Em breve nossa equipe retornará."
        keywords={["obrigado", "contato enviado", "target importadora"]}
        canonical="https://targetimportadora.com.br/obrigado"
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />
        <Header />
        <main className="relative z-10 pt-24 flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto px-6 py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8"
            >
              <CheckCircle className="w-14 h-14 text-primary" />
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Obrigado pelo seu contato!
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4">
              Recebemos sua solicitação com sucesso.
            </p>
            <p className="text-muted-foreground mb-10">
              Nossa equipe de especialistas entrará em contato em breve para ajudá-lo
              com sua importação. Fique atento ao seu e-mail e WhatsApp!
            </p>

            <div className="flex justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Obrigado;
