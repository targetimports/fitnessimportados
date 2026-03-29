import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { ServicesSection } from "@/components/ServicesSection";
import { SegmentsSection } from "@/components/SegmentsSection";
import { TaxBenefitsSection } from "@/components/TaxBenefitsSection";
import { Footer } from "@/components/Footer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import servicesLogisticsImg from "@/assets/services-logistics.jpg";

const Solucoes = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Soluções em Importação | Target Importadora - Consultoria e Logística"
        description="Conheça nossas soluções completas: consultoria em importação, desembaraço aduaneiro, logística internacional e benefícios fiscais para sua empresa."
        keywords={["soluções importação", "consultoria importação", "desembaraço aduaneiro", "logística internacional", "benefícios fiscais importação"]}
        canonical="https://targetimportadora.com.br/solucoes"
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />
        
        <Header />
        <main className="relative z-10 pt-24">
          <PageHero
            title="Nossas Soluções"
            subtitle="Serviços completos de importação, consultoria e logística para sua empresa crescer no mercado internacional"
            breadcrumbs={[{ label: "Soluções" }]}
            backgroundImage={servicesLogisticsImg}
          />
          <ServicesSection />
          <SegmentsSection />
          <TaxBenefitsSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Solucoes;
