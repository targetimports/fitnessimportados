import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, User, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogPostBySlug, getRelatedPosts, BlogPost as BlogPostType } from "@/data/blogPosts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { ScrollReveal } from "@/components/ScrollReveal";
import { PageTransition } from "@/components/PageTransition";
import { SEOHead } from "@/components/SEOHead";
import { JsonLd } from "@/components/JsonLd";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const articleSchema = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Target Importadora",
      logo: "https://targetimportadora.com.br/favicon.png",
    },
    datePublished: post.date,
    keywords: post.keywords?.join(", "),
  } : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
            <p className="text-muted-foreground mb-8">O artigo que você procura não existe ou foi removido.</p>
            <Button onClick={() => navigate("/")} variant="gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = post.title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <PageTransition>
      <SEOHead
        title={`${post.title} | Target Importadora`}
        description={post.metaDescription}
        keywords={post.keywords}
        canonical={`https://targetimportadora.com.br/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
      />
      {articleSchema && <JsonLd data={articleSchema} />}
      <div className="min-h-screen bg-background text-foreground">
        <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          </div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
            <ScrollReveal animation="fadeUp">
              {/* Breadcrumb */}
              <Breadcrumb className="mb-6">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/#blog" className="text-muted-foreground hover:text-primary">Blog</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <span className="text-foreground">{post.category}</span>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                {post.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-4xl mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    <p className="text-xs">{post.author.role}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de leitura
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
              {/* Main Content */}
              <ScrollReveal animation="fadeUp">
                <article className="prose prose-lg prose-invert max-w-none">
                  <div 
                    className="
                      [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-foreground
                      [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-foreground
                      [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
                      [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:text-muted-foreground [&>ul>li]:mb-2
                      [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>ol>li]:text-muted-foreground [&>ol>li]:mb-2
                      [&>strong]:text-foreground [&>strong]:font-semibold
                      [&>table]:w-full [&>table]:border-collapse [&>table]:mb-6
                      [&>table>thead>tr>th]:border [&>table>thead>tr>th]:border-border [&>table>thead>tr>th]:p-3 [&>table>thead>tr>th]:bg-muted [&>table>thead>tr>th]:text-left [&>table>thead>tr>th]:font-semibold
                      [&>table>tbody>tr>td]:border [&>table>tbody>tr>td]:border-border [&>table>tbody>tr>td]:p-3 [&>table>tbody>tr>td]:text-muted-foreground
                      [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted-foreground
                    "
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/^## /gm, '<h2>')
                        .replace(/^### /gm, '<h3>')
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/<h2>([^<\n]+)/g, '</p><h2>$1</h2><p>')
                        .replace(/<h3>([^<\n]+)/g, '</p><h3>$1</h3><p>')
                        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                        .replace(/^- (.+)$/gm, '<li>$1</li>')
                        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                        .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
                        .replace(/\| ([^|]+) \|/g, '<td>$1</td>')
                        .replace(/<p><\/p>/g, '')
                    }}
                  />
                </article>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Compartilhar:
                    </span>
                    <div className="flex gap-2">
                      <motion.a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Card className="mt-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda com sua Importação?</h3>
                    <p className="text-muted-foreground mb-6">
                      Nossa equipe de especialistas está pronta para auxiliar em todas as etapas do processo.
                    </p>
                    <Button variant="gold" size="lg" asChild>
                      <Link to="/#contato">Solicitar Consultoria Gratuita</Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Sidebar */}
              <aside className="space-y-8">
                <ScrollReveal animation="fadeLeft" delay={0.2}>
                  {/* Author Card */}
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-6 text-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h4 className="font-bold text-lg">{post.author.name}</h4>
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    </CardContent>
                  </Card>

                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div>
                      <h4 className="font-bold text-lg mb-4">Artigos Relacionados</h4>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/40 transition-all group cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex gap-4">
                                  <img
                                    src={relatedPost.image}
                                    alt={relatedPost.title}
                                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                  />
                                  <div>
                                    <h5 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                      {relatedPost.title}
                                    </h5>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      {relatedPost.readTime} de leitura
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Newsletter */}
                  <Card className="bg-gradient-to-b from-primary/10 to-transparent border-primary/20">
                    <CardContent className="p-6">
                      <h4 className="font-bold text-lg mb-2">Newsletter</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Receba novidades sobre importação no seu e-mail.
                      </p>
                      <input
                        type="email"
                        placeholder="Seu e-mail"
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all mb-3"
                      />
                      <Button variant="gold" className="w-full">
                        Inscrever-se
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </aside>
            </div>
          </div>
        </section>
      </main>

        <Footer />
        
      </div>
    </PageTransition>
  );
};

export default BlogPost;
