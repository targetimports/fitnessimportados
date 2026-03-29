import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSection } from "@/components/ProcessSection";
import { DifferentialsSection } from "@/components/DifferentialsSection";
import { Footer } from "@/components/Footer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import teamMeetingImg from "@/assets/team-meeting.jpg";

const Sobre = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Sobre Nós | Target Importadora - Sua Parceira em Importação"
        description="Conheça a Target Importadora: especialistas em importação da China e do mundo. Nossa equipe experiente cuida de toda operação para seu negócio crescer."
        keywords={["sobre target importadora", "empresa de importação", "importadora brasil", "equipe comércio exterior"]}
        canonical="https://targetimportadora.com.br/sobre"
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />
        
        <Header />
        <main className="relative z-10 pt-24">
          <PageHero
            title="Sobre Nós"
            subtitle="Conheça a Target Importadora, sua parceira estratégica em comércio exterior com mais de uma década de experiência"
            breadcrumbs={[{ label: "Sobre Nós" }]}
            backgroundImage={teamMeetingImg}
          />
          <AboutSection />
          <ProcessSection />
          <DifferentialsSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Sobre;
