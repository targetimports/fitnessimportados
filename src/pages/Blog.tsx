import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Filter, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PageTransition } from "@/components/PageTransition";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { VideoSection } from "@/components/VideoSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { ImageGallerySection } from "@/components/ImageGallerySection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogPosts, BlogPost as BlogPostType } from "@/data/blogPosts";
import globalNetworkImg from "@/assets/global-network.jpg";

const POSTS_PER_PAGE = 6;

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    blogPosts.forEach((post) => {
      categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
    });
    return Object.entries(categoryCount).map(([name, count]) => ({ name, count }));
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0];

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all";

  return (
    <PageTransition>
      <SEOHead
        title="Blog & Mídia | Target Importadora - Notícias sobre Importação"
        description="Artigos, guias e notícias sobre importação da China, comércio exterior, logística e desembaraço aduaneiro. Mantenha-se atualizado com a Target Importadora."
        keywords={["blog importação", "notícias comércio exterior", "guia importação china", "artigos importação"]}
        canonical="https://targetimportadora.com.br/blog"
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingParticles count={25} className="fixed z-0 opacity-60" />

        <Header />
        <main className="relative z-10 pt-24">
          <PageHero
            title="Blog & Mídia"
            subtitle="Artigos, vídeos, galeria e novidades sobre importação e comércio exterior"
            breadcrumbs={[{ label: "Blog & Mídia" }]}
            backgroundImage={globalNetworkImg}
          />

          {/* Vídeo Institucional */}
          <VideoSection />

          {/* Instagram Feed */}
          <InstagramFeed />

          {/* Galeria de Imagens */}
          <ImageGallerySection />

          {/* Blog Posts Section */}
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <ScrollReveal animation="fadeUp" className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Artigos & <span className="text-gradient-gold">Notícias</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Conteúdos exclusivos sobre importação e comércio exterior
                </p>
              </ScrollReveal>

              {/* Featured Post */}
              <ScrollReveal animation="fadeUp">
                <Link to={`/blog/${featuredPost.slug}`}>
                  <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-gold/50 transition-all group mb-12">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-auto overflow-hidden">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <Badge className="absolute top-4 left-4 bg-gold text-primary-foreground">
                          Em Destaque
                        </Badge>
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <Badge variant="outline" className="w-fit mb-4 border-gold/50 text-gold">
                          {featuredPost.category}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-gold transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar artigos..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50 focus:border-gold"
                  />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full md:w-48 bg-secondary/50 border-border/50">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border z-50">
                      <SelectItem value="all">Todas ({blogPosts.length})</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name} ({cat.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4 mr-1" />
                      Limpar
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {filteredPosts.length} {filteredPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
              </p>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              {paginatedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedPosts.map((post, index) => (
                      <ScrollReveal key={post.id} animation="fadeUp" delay={index * 0.1}>
                        <Link to={`/blog/${post.slug}`}>
                          <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-gold/50 transition-all group">
                            <div className="relative h-48 overflow-hidden">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <Badge className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm">{post.category}</Badge>
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-gold transition-colors">{post.title}</h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-12">
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="border-border/50">Anterior</Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className={page === currentPage ? "bg-gold hover:bg-gold/90 text-primary-foreground" : "border-border/50"}>{page}</Button>
                      ))}
                      <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="border-border/50">Próximo</Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-2xl font-semibold mb-4">Nenhum artigo encontrado</p>
                  <p className="text-muted-foreground mb-8">Tente ajustar os filtros ou buscar por outro termo.</p>
                  <Button variant="gold" onClick={clearFilters}>Ver todos os artigos</Button>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Blog;
