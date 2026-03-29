export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  metaDescription: string;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "como-importar-da-china-guia-completo",
    title: "Como Importar da China em 2026: Guia Completo para Iniciantes",
    excerpt: "Descubra o passo a passo para realizar sua primeira importação da China, desde a escolha do fornecedor até a liberação alfandegária no Brasil.",
    metaDescription: "Aprenda como importar da China em 2024. Guia completo com passo a passo, documentação necessária, custos e dicas para iniciantes no comércio exterior.",
    keywords: ["importar da china", "como importar", "importação china brasil", "guia importação", "comércio exterior"],
    category: "Guias",
    tags: ["China", "Iniciantes", "Passo a Passo"],
    date: "15 Jan 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&h=600&fit=crop",
    featured: true,
    author: {
      name: "Carlos Mendes",
      role: "Especialista em Comércio Exterior",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    content: `
## Introdução à Importação da China

A China é o maior exportador mundial e oferece uma variedade incomparável de produtos a preços competitivos. Para empresas brasileiras, importar da China pode representar uma redução significativa nos custos de aquisição, chegando a **40% ou mais** em alguns setores.

Neste guia completo, vamos explorar cada etapa do processo de importação, desde a pesquisa de fornecedores até a chegada da mercadoria no Brasil.

## 1. Planejamento Inicial

Antes de iniciar qualquer operação de importação, é fundamental realizar um planejamento detalhado:

### Análise de Viabilidade
- **Pesquisa de mercado**: Entenda a demanda pelo produto no Brasil
- **Análise de custos**: Considere todos os custos envolvidos (produto, frete, impostos, despesas aduaneiras)
- **Margem de lucro**: Calcule se a operação será rentável
- **Volume mínimo**: A maioria dos fornecedores chineses exige pedidos mínimos (MOQ)

### Documentação Necessária
Para importar legalmente, sua empresa precisa:
- CNPJ ativo e regular
- Habilitação no RADAR (Registro e Rastreamento da Atuação dos Intervenientes Aduaneiros)
- Licenças específicas, dependendo do produto (ANVISA, INMETRO, etc.)

## 2. Encontrando Fornecedores Confiáveis

A escolha do fornecedor é uma das etapas mais críticas do processo.

### Plataformas Online
- **Alibaba**: A maior plataforma B2B do mundo
- **Made-in-China**: Alternativa com bons fornecedores
- **Global Sources**: Foco em eletrônicos e produtos de tecnologia

### Feiras Internacionais
A **Feira de Cantão** (Canton Fair) é a maior feira de exportação da China, realizada duas vezes por ano em Guangzhou. Participar presencialmente permite:
- Conhecer fornecedores pessoalmente
- Avaliar amostras de produtos
- Negociar preços e condições

### Verificação do Fornecedor
Antes de fechar negócio, sempre:
- Solicite amostras do produto
- Verifique certificações e licenças
- Peça referências de outros clientes
- Considere uma inspeção de fábrica

## 3. Negociação e Termos Comerciais

### Incoterms Mais Utilizados
- **FOB (Free On Board)**: O vendedor entrega a mercadoria no porto de embarque
- **CIF (Cost, Insurance and Freight)**: Inclui custo, seguro e frete até o porto de destino
- **EXW (Ex Works)**: O comprador assume todos os custos desde a fábrica

### Formas de Pagamento
- **Carta de Crédito (L/C)**: Mais segura, recomendada para primeiras operações
- **Transferência Telegráfica (T/T)**: Comum após estabelecer confiança
- **Trade Assurance**: Proteção oferecida pelo Alibaba

## 4. Logística e Transporte

### Transporte Marítimo
- **FCL (Full Container Load)**: Container completo, ideal para grandes volumes
- **LCL (Less than Container Load)**: Carga consolidada, para volumes menores

### Tempo de Trânsito
O tempo médio de trânsito marítimo da China para o Brasil varia de **35 a 45 dias**, dependendo do porto de destino.

## 5. Desembaraço Aduaneiro

O processo de liberação da mercadoria na alfândega brasileira envolve:

### Documentos Necessários
- Fatura Comercial (Commercial Invoice)
- Packing List
- Conhecimento de Embarque (Bill of Lading)
- Certificado de Origem
- Licenças de Importação (quando aplicável)

### Impostos na Importação
- **II (Imposto de Importação)**: Varia conforme NCM do produto
- **IPI**: Imposto sobre Produtos Industrializados
- **PIS/COFINS**: Contribuições federais
- **ICMS**: Imposto estadual

## Conclusão

Importar da China pode ser altamente lucrativo quando bem planejado. Contar com uma trading experiente como a Target Importadora facilita todo o processo, desde a negociação com fornecedores até a entrega final.

**Precisa de ajuda com sua importação?** Entre em contato conosco para uma consultoria gratuita.
    `,
  },
  {
    id: 2,
    slug: "beneficios-fiscais-importacao-procomex-fundap-ttd",
    title: "Benefícios Fiscais na Importação: PROCOMEX, FUNDAP e TTD",
    excerpt: "Entenda como os regimes tributários especiais podem reduzir em até 12% os custos da sua importação através de incentivos estaduais.",
    metaDescription: "Conheça os benefícios fiscais PROCOMEX, FUNDAP e TTD para importação. Saiba como reduzir impostos e economizar até 12% nos custos de importação.",
    keywords: ["benefícios fiscais importação", "PROCOMEX", "FUNDAP", "TTD", "incentivos fiscais", "redução impostos"],
    category: "Tributário",
    tags: ["Impostos", "Benefícios", "Economia"],
    date: "10 Jan 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop",
    featured: false,
    author: {
      name: "Ana Paula Silva",
      role: "Consultora Tributária",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    content: `
## O Poder dos Incentivos Fiscais na Importação

Os estados brasileiros oferecem diversos programas de incentivos fiscais para atrair operações de comércio exterior. Esses benefícios podem representar uma **economia significativa de 8% a 12%** no custo total da importação.

Vamos explorar os principais regimes tributários especiais disponíveis.

## PROCOMEX - Bahia

O **Programa de Incentivo à Atividade Portuária e de Comércio Exterior da Bahia** é um dos mais atrativos do país.

### Principais Benefícios
- **Diferimento do ICMS**: O imposto é diferido para etapas posteriores
- **Crédito presumido**: Redução efetiva da carga tributária
- **Simplificação**: Processos aduaneiros mais ágeis

### Quem Pode Utilizar
- Empresas com CNPJ ativo
- Operações realizadas pelos portos baianos
- Cadastro prévio junto à SEFAZ-BA

### Economia Estimada
O PROCOMEX pode proporcionar economia de **até 10%** no custo total da operação quando comparado a outros estados.

## FUNDAP - Espírito Santo

O **Fundo de Desenvolvimento das Atividades Portuárias** do Espírito Santo é um programa consolidado e amplamente utilizado.

### Como Funciona
1. A empresa realiza a importação pelo ES
2. O ICMS é financiado pelo estado
3. O pagamento é parcelado em condições especiais
4. Parte do valor retorna como incentivo

### Vantagens
- **Financiamento do ICMS**: Prazo estendido para pagamento
- **Baixo custo financeiro**: Juros reduzidos
- **Infraestrutura portuária**: Portos modernos e eficientes

## TTD - Santa Catarina

O **Tratamento Tributário Diferenciado** de Santa Catarina oferece condições competitivas para importadores.

### Benefícios Principais
- Crédito presumido de ICMS
- Diferimento em operações específicas
- Simplificação de obrigações acessórias

### Setores Beneficiados
- Têxtil e confecções
- Máquinas e equipamentos
- Produtos químicos
- Diversos outros segmentos

## Comparativo dos Regimes

| Aspecto | PROCOMEX (BA) | FUNDAP (ES) | TTD (SC) |
|---------|---------------|-------------|----------|
| Economia média | 8-10% | 7-9% | 6-8% |
| Complexidade | Média | Alta | Baixa |
| Tempo de aprovação | 30-60 dias | 60-90 dias | 15-30 dias |

## Como Escolher o Melhor Regime

A escolha do regime ideal depende de diversos fatores:

### Considere
- **Tipo de produto**: Alguns regimes são mais vantajosos para determinados NCMs
- **Volume de operações**: Regimes diferentes têm exigências de volume mínimo
- **Destino final**: A logística interna deve ser considerada
- **Estrutura da empresa**: Capacidade de atender às obrigações acessórias

## Conclusão

Os benefícios fiscais estaduais são ferramentas poderosas para reduzir custos de importação. A Target Importadora possui expertise na utilização desses regimes, ajudando nossos clientes a escolher a opção mais vantajosa para cada operação.

**Quer saber qual regime é melhor para sua empresa?** Solicite uma análise tributária gratuita.
    `,
  },
  {
    id: 3,
    slug: "ncm-classificacao-fiscal-produtos",
    title: "NCM: O que é e Como Classificar Corretamente seus Produtos",
    excerpt: "A classificação NCM correta é essencial para evitar multas e atrasos. Aprenda a identificar o código correto para suas mercadorias.",
    metaDescription: "Entenda o que é NCM e como classificar produtos corretamente. Guia completo sobre Nomenclatura Comum do Mercosul para importação e exportação.",
    keywords: ["NCM", "classificação fiscal", "nomenclatura comum mercosul", "código NCM", "importação"],
    category: "Legislação",
    tags: ["NCM", "Classificação", "Compliance"],
    date: "05 Jan 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop",
    featured: false,
    author: {
      name: "Roberto Almeida",
      role: "Despachante Aduaneiro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    content: `
## O que é NCM?

A **Nomenclatura Comum do Mercosul (NCM)** é um código de 8 dígitos utilizado para identificar e classificar mercadorias em operações de comércio exterior. Este código é fundamental para:

- Determinar alíquotas de impostos
- Identificar exigências regulatórias
- Controlar estatísticas de comércio exterior
- Aplicar tratamentos administrativos específicos

## Estrutura do Código NCM

O código NCM é composto por 8 dígitos, organizados da seguinte forma:

### Exemplo: 8471.30.19

| Dígitos | Significado | Exemplo |
|---------|-------------|---------|