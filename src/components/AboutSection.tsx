import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Award, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import teamMeeting from "@/assets/team-meeting.jpg";

const highlights = [
  "Mais de 10 anos de experiência no mercado",
  "Equipe especializada em comércio exterior",
  "Parcerias com os melhores fornecedores",
  "Atendimento personalizado e consultivo",
  "Processos seguros e transparentes",
  "Tecnologia de ponta no acompanhamento",
];

const achievements = [
  { icon: Award, value: "10+", label: "Anos de Experiência" },
  { icon: Users, value: "300+", label: "Clientes Satisfeitos" },
  { icon: TrendingUp, value: "98%", label: "Taxa de Sucesso" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const scrollToContact = () => {
    const element = document.querySelector("#contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sobre" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="w-full h-full bg-gradient-to-l from-gold to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{ y: imageY }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src={teamMeeting} 
                    alt="Equipe Target Importadora em reunião estratégica" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="absolute inset-0 border-2 border-gold/20 rounded-2xl" />
              </div>

              {/* Floating Achievement Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-card border border-gold/30 rounded-xl p-4 shadow-gold"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient-gold">500+</div>
                    <div className="text-xs text-muted-foreground">Importações</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ y: contentY }}
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Sobre Nós
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Seu Parceiro{" "}
              <span className="text-gradient-gold">Estratégico</span> em
              Importação
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              A Target Importadora nasceu com a missão de simplificar o processo
              de importação para empresas brasileiras. Com uma equipe
              especializada e parcerias globais, transformamos a complexidade do
              comércio exterior em oportunidades de crescimento para seu negócio.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Achievement Stats */}
            <div className="flex gap-8 mb-8 pb-8 border-b border-border">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient-gold">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
