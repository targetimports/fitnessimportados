import { Header } from "@/components/Header";
import { PageHero } from "@/components/PageHero";
import { VideoSection } from "@/components/VideoSection";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { ImageGallerySection } from "@/components/ImageGallerySection";
import { BlogSection } from "@/components/BlogSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Footer } from "@/components/Footer";

import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import globalNetworkImg from "@/assets/global-network.jpg";

const Midia = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />
        
        <Header />
        <main className="relative z-10 pt-24">
          <PageHero
            title="Mídia & Conteúdo"
            subtitle="Vídeos, artigos e atualizações do mundo da importação e comércio exterior"
            breadcrumbs={[{ label: "Mídia" }]}
            backgroundImage={globalNetworkImg}
          />
          <VideoSection />
          <VideoGallerySection />
          <ImageGallerySection />
          <BlogSection />
          <InstagramFeed />
        </main>
        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default Midia;
