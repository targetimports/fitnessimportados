import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { DifferentialsSection } from "@/components/DifferentialsSection";
import { ContactSection } from "@/components/ContactSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FAQSection } from "@/components/FAQSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { SocialProofSection } from "@/components/SocialProofSection";
import { ProductsSection } from "@/components/ProductsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CTAFinalSection } from "@/components/CTAFinalSection";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = () => {
  return (
    <PageTransition>
      <SEOHead
        title="Target Importadora | Especialistas em Importação da China e do Mundo"
        description="Somos especialistas em importação da China e do mundo. Consultoria, desembaraço aduaneiro e operação completa para seu negócio. Solicite um orçamento!"
        keywords={["importação da china", "importadora", "comércio exterior", "desembaraço aduaneiro", "importar produtos da china", "consultoria em importação"]}
        canonical="https://targetimportadora.com.br/"
      />
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <LoadingScreen />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />
        
        <Header />
        <main className="relative z-10 pt-24">
          <HeroSection />
          <SocialProofSection />
          <ServicesSection />
          <ProductsSection />
          <HowItWorksSection />
          <DifferentialsSection />
          <InstagramFeed />
          <ContactSection />
          <TestimonialsSection />
          <CTAFinalSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
