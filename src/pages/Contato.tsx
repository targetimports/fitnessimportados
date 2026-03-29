import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import consultingImg from "@/assets/consulting-service.jpg";

const Contato = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Contato | Target Importadora - Solicite um Orçamento"
        description="Entre em contato com a Target Importadora. Solicite um orçamento gratuito para importação da China e do mundo. Atendimento especializado via WhatsApp."
        keywords={["contato importadora", "orçamento importação", "importar da china orçamento", "whatsapp importadora"]}
        canonical="https://targetimportadora.com.br/contato"
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />
        
        <Header />
        <main className="relative z-10 pt-24">
          <PageHero
            title="Entre em Contato"
            subtitle="Fale com nossos especialistas e descubra como podemos ajudar sua empresa a importar com sucesso"
            breadcrumbs={[{ label: "Contato" }]}
            backgroundImage={consultingImg}
          />
          <ContactSection />
        </main>
        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default Contato;
