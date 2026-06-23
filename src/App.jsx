import React, { useEffect, useState } from "react";

// Projeto institucional do Instituto Montcare.
// Estrutura e documentação organizadas por Matheu Silva.

// Navegação principal compartilhada entre header, menu mobile e rodapé.
const navItems = [
  { label: "Home", href: "#home" },
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Blog", href: "#" },
  { label: "FAQ", href: "#duvidas" },
];

// Conteúdo comercial da home: procedimentos destacados.
const procedures = [
  {
    title: "Reabilitação Ortopédica",
    description: "Recuperação funcional com acompanhamento preciso e foco em mobilidade.",
  },
  {
    title: "Artrodeses",
    description: "Estabilidade articular com indicação criteriosa e abordagem segura.",
  },
  {
    title: "Infiltrações",
    description: "Controle da dor e da inflamação com técnicas direcionadas ao quadro clínico.",
  },
  {
    title: "Cirurgias Minimamente Invasivas",
    description: "Procedimentos modernos para mais precisão, conforto e recuperação otimizada.",
  },
];

const healthcareSolutions = [
  {
    title: "Cirurgias Minimamente Invasivas",
    category: "Saúde da Coluna",
    icon: "/01_saude_da_coluna/01_cirurgias_minimamente_invasivas.svg",
    hrefTitle: "Cirurgias Minimamente Invasivas",
  },
  {
    title: "Infiltrações",
    category: "Saúde da Coluna",
    icon: "/01_saude_da_coluna/02_infiltracoes.svg",
    hrefTitle: "Infiltrações",
  },
  {
    title: "Bloqueios",
    category: "Saúde da Coluna",
    icon: "/01_saude_da_coluna/03_bloqueios.svg",
  },
  {
    title: "Artrodeses",
    subtitle: "(Estabilização)",
    category: "Saúde da Coluna",
    icon: "/01_saude_da_coluna/04_artrodeses_estabilizacao.svg",
    hrefTitle: "Artrodeses",
  },
  {
    title: "Tratamento de Escoliose",
    category: "Saúde da Coluna",
    icon: "/01_saude_da_coluna/05_tratamento_de_escoliose.svg",
  },
  {
    title: "Reabilitação Ortopédica",
    category: "Reabilitação e Performance",
    icon: "/02_reabilitacao_e_performance/01_reabilitacao_ortopedica.svg",
    hrefTitle: "Reabilitação Ortopédica",
  },
  {
    title: "Fisioterapia",
    category: "Reabilitação e Performance",
    icon: "/02_reabilitacao_e_performance/02_fisioterapia.svg",
  },
  {
    title: "Osteopatia",
    category: "Reabilitação e Performance",
    icon: "/02_reabilitacao_e_performance/03_osteopatia.svg",
  },
  {
    title: "Treinamento Funcional",
    category: "Reabilitação e Performance",
    icon: "/02_reabilitacao_e_performance/04_treinamento_funcional.svg",
  },
  {
    title: "Recuperação do Movimento",
    category: "Reabilitação e Performance",
    icon: "/02_reabilitacao_e_performance/05_recuperacao_do_movimento.svg",
  },
  {
    title: "Mastologia",
    category: "Saúde da Mulher",
    icon: "/03_saude_da_mulher/01_mastologia.svg",
  },
  {
    title: "Reconstrução Mamária",
    category: "Saúde da Mulher",
    icon: "/03_saude_da_mulher/02_reconstrucao_mamaria.svg",
  },
  {
    title: "Estética Mamária",
    category: "Saúde da Mulher",
    icon: "/03_saude_da_mulher/03_estetica_mamaria.svg",
  },
  {
    title: "Cuidado Humanizado",
    category: "Saúde da Mulher",
    icon: "/03_saude_da_mulher/04_cuidado_humanizado.svg",
  },
  {
    title: "Saúde Mamária",
    category: "Saúde da Mulher",
    icon: "/03_saude_da_mulher/05_saude_mamaria.svg",
  },
  {
    title: "Nutrição Esportiva",
    category: "Metabolismo e Nutrição",
    icon: "/04_metabolismo_e_nutricao/01_nutricao_esportiva.svg",
  },
  {
    title: "Controle de Peso",
    category: "Metabolismo e Nutrição",
    icon: "/04_metabolismo_e_nutricao/02_controle_de_peso.svg",
  },
  {
    title: "Performance",
    category: "Metabolismo e Nutrição",
    icon: "/04_metabolismo_e_nutricao/03_performance.svg",
  },
  {
    title: "Composição Corporal",
    category: "Metabolismo e Nutrição",
    icon: "/04_metabolismo_e_nutricao/04_composicao_corporal.svg",
  },
  {
    title: "Atendimento Clínico Individualizado",
    category: "Metabolismo e Nutrição",
    icon: "/04_metabolismo_e_nutricao/05_atendimento_clinico_individualizado.svg",
  },
  {
    title: "Cirurgia de Quadril",
    category: "Ortopedia de Especialidade",
    icon: "/05_ortopedia_de_especialidade/01_cirurgia_de_quadril.svg",
  },
  {
    title: "Traumatologia Geral",
    category: "Ortopedia de Especialidade",
    icon: "/05_ortopedia_de_especialidade/02_traumatologia_geral.svg",
  },
  {
    title: "Lesões Articulares",
    category: "Ortopedia de Especialidade",
    icon: "/05_ortopedia_de_especialidade/03_lesoes_articulares.svg",
  },
  {
    title: "Avaliação Ortopédica",
    category: "Ortopedia de Especialidade",
    icon: "/05_ortopedia_de_especialidade/04_avaliacao_ortopedica.svg",
  },
  {
    title: "Precisão em Lesões",
    category: "Ortopedia de Especialidade",
    icon: "/05_ortopedia_de_especialidade/05_precisao_em_lesoes.svg",
  },
  {
    title: "Avaliação Clínica Criteriosa",
    category: "Cuidado Infectológico",
    icon: "/06_cuidado_infectologico/01_avaliacao_clinica_orientada.svg",
  },
  {
    title: "Tratamento de Infecções",
    category: "Cuidado Infectológico",
    icon: "/06_cuidado_infectologico/02_tratamento_de_infeccoes.svg",
  },
  {
    title: "Acompanhamento Preventivo",
    category: "Cuidado Infectológico",
    icon: "/06_cuidado_infectologico/03_acompanhamento_preventivo.svg",
  },
  {
    title: "Seguimento Clínico",
    category: "Cuidado Infectológico",
    icon: "/06_cuidado_infectologico/04_seguimento_clinico.svg",
  },
  {
    title: "Prevenção de Infecções",
    category: "Cuidado Infectológico",
    icon: "/06_cuidado_infectologico/05_prevencao_de_infeccoes.svg",
  },
];

const healthcareSolutionGroups = healthcareSolutions.reduce((groups, solution) => {
  const group = groups.find((item) => item.category === solution.category);

  if (group) {
    group.items.push(solution);
    return groups;
  }

  return [...groups, { category: solution.category, items: [solution] }];
}, []);

// Especialidades médicas exibidas na home.
const specialties = [
  {
    title: "Ortopedia Cirúrgica",
    icon: "/icones/01_ortopedia-cirurgica.webp",
    description: "Procedimentos ortopédicos com estrutura moderna e foco em recuperação segura.",
  },
  {
    title: "Coluna",
    icon: "/icones/02_coluna.webp",
    description: "Tratamento especializado para dores, limitações e alterações da coluna vertebral.",
  },
  {
    title: "Ombro",
    icon: "/icones/03_ombro.webp",
    description: "Cuidado para lesões, dores e instabilidades que afetam a mobilidade.",
  },
  {
    title: "Joelho",
    icon: "/icones/04_joelho.webp",
    description: "Avaliação e tratamento para dores, desgastes e traumas esportivos.",
  },
  {
    title: "Quadril",
    icon: "/icones/05_quadril.webp",
    description: "Condutas clínicas e cirúrgicas voltadas ao movimento e alívio da dor.",
  },
  {
    title: "Mão",
    icon: "/icones/06_mao.webp",
    description: "Soluções para alterações funcionais, compressões nervosas e lesões.",
  },
  {
    title: "Pé e Tornozelo",
    icon: "/icones/07_pe-e-tornozelo.webp",
    description: "Cuidado para dores, lesões e limitações funcionais nos pés e tornozelos.",
  },
  {
    title: "Reabilitação funcional",
    icon: "/icones/08_reabilitacao-funcional.webp",
    description: "Recuperação de mobilidade, força e autonomia no retorno às atividades.",
  },
  {
    title: "Intervenção da dor",
    icon: "/icones/09_intervencao-da-dor.webp",
    description: "Tratamentos direcionados para controle da dor e melhora da qualidade de vida.",
  },
];

// FAQ principal da home e base para SEO estruturado.
const faqItems = [
  {
    question: "O que é a medicina resolutiva oferecida pela Montcare?",
    answer:
      "É um atendimento focado na rápida resolução dos problemas ortopédicos, com ênfase em tratamentos conservadores e cirúrgicos minimamente invasivos.",
  },
  {
    question: "Preciso de plano de saúde para ser atendido?",
    answer: "Não. A Montcare atende pacientes particulares, oferecendo agilidade e menos burocracia.",
  },
  {
    question: "A clínica só realiza cirurgias?",
    answer:
      "Não. Embora tenha estrutura cirúrgica moderna, 80% dos tratamentos são conservadores, priorizando sempre a menor intervenção.",
  },
  {
    question: "Como é feita a infiltração ortopédica?",
    answer: "A infiltração é feita com auxílio de ultrassom para maior precisão e sem dor para o paciente.",
  },
  {
    question: "Posso fazer fisioterapia mesmo sem cirurgia?",
    answer: "Sim! A fisioterapia é parte fundamental dos tratamentos conservadores e preventivos da Montcare.",
  },
  {
    question: "Como agendar minha consulta?",
    answer: "Você pode agendar via WhatsApp ou telefone direto com a nossa equipe.",
  },
];

// Prova social usada no carrossel de depoimentos.
const testimonials = [
  {
    quote:
      "Fui atendida com muita atenção desde a primeira consulta. O diagnóstico foi claro e o tratamento trouxe melhora real para minha rotina.",
    name: "M.S.",
    detail: "Paciente",
  },
  {
    quote:
      "Equipe extremamente profissional, ambiente acolhedor e um cuidado que transmite confiança em cada etapa do atendimento.",
    name: "C.R.",
    detail: "Paciente",
  },
  {
    quote:
      "Depois de muito tempo com dor, encontrei um acompanhamento sério e resolutivo. Hoje voltei a me movimentar com segurança.",
    name: "F.L.",
    detail: "Paciente",
  },
  {
    quote:
      "A consulta foi objetiva, acolhedora e muito esclarecedora. Saí com segurança no tratamento e ótimo acompanhamento.",
    name: "P.M.",
    detail: "Paciente",
  },
  {
    quote:
      "Profissionais muito preparados e atendimento excelente. Todo o processo foi conduzido com clareza e muito cuidado.",
    name: "E.T.",
    detail: "Paciente",
  },
  {
    quote:
      "Gostei muito da forma como explicaram meu caso e das opções de tratamento. O cuidado foi diferenciado do começo ao fim.",
    name: "J.P.",
    detail: "Paciente",
  },
];

// Corpo clínico exibido em carrossel.
// Algumas imagens recebem ajuste fino para manter o mesmo peso visual entre os cards.
const doctors = [
  {
    name: "Yoanna Evangelos Abbas",
    specialty: "Especialização em Nutrição Esportiva e Obesidade - USP",
    crm: "CRM 392744",
    image: "/time/1.webp",
    summary:
      "Atendimento voltado ao cuidado nutricional feminino, com abordagem clínica individualizada e foco em saúde, performance e qualidade de vida.",
  },
  {
    name: "Gustavo Bisson",
    specialty: "Ortopedia",
    crm: "CRM 151542SP | RQE 69072",
    image: "/time/2.webp",
    summary:
      "Cirurgia de coluna vertebral com foco em diagnóstico preciso, segurança terapêutica e cuidado humanizado.",
  },
  {
    name: "Danilo Lira Gianuzzi",
    specialty: "Ortopedia | Cirurgia da Coluna Vertebral",
    crm: "CRM 161.906/SP | RQE 128.977",
    image: "/time/3.webp",
    summary:
      "Médico sócio, ortopedista e cirurgião de coluna, com fellowship pelo IAMSPE, formação em cirurgia minimamente invasiva pela USP Ribeirão Preto e atuação em casos de alta complexidade.",
  },
  {
    name: "Bruno Tadeu de Oliveira",
    specialty: "Fisioterapia - Osteopatia",
    crm: "CREFITO 200467",
    image: "/time/4.webp",
    summary:
      "Reabilitação ortopédica com foco em funcionalidade, controle da dor e recuperação do movimento com abordagem individualizada.",
  },
  {
    name: "Guilherme Spaziani",
    specialty: "Infectologista",
    crm: "CRM 141775 | RQE 84306",
    image: "/time/5.webp",
    summary:
      "Atendimento especializado em infectologia, com avaliação criteriosa, orientação segura e acompanhamento clínico individualizado.",
  },
  {
    name: "Ocilmar Junior",
    specialty: "Ortopedia e Traumatologia",
    crm: "CRM 121989 | RQE 59433",
    image: "/time/6.webp",
    summary:
      "Cirurgia de quadril com abordagem especializada, foco em precisão técnica e melhora da qualidade de vida.",
  },
  {
    name: "Greice Cristina Tarabay Bisson",
    specialty: "Mastologista",
    crm: "CRM 157503SP | RQE 73078",
    image: "/time/7.webp",
    summary:
      "Cirurgia, reconstrução e estética mamária com atendimento especializado, cuidado humanizado e foco em segurança clínica.",
  },
];

// Conteúdo das páginas internas de procedimentos.
const rehabBenefits = [
  "Recuperação da função articular e muscular",
  "Redução de dor e rigidez",
  "Melhora do equilíbrio e coordenação",
  "Prevenção de recidivas e compensações",
  "Reintegração funcional às atividades da vida diária",
];

const rehabHighlights = [
  "Avaliação médica individualizada após trauma, cirurgia ou dor persistente",
  "Plano terapêutico com metas funcionais claras e acompanhamento contínuo",
  "Conduta focada em recuperar movimento, autonomia e segurança nas atividades",
];

const rehabJourney = [
  {
    step: "01",
    title: "Agendamento da consulta",
    description: "Registro do histórico e direcionamento inicial para entender sua necessidade funcional.",
  },
  {
    step: "02",
    title: "Avaliação médica personalizada",
    description: "Exame clínico detalhado, análise do quadro e definição dos objetivos da reabilitação.",
  },
  {
    step: "03",
    title: "Elaboração do plano terapêutico",
    description: "Conduta individualizada com foco em mobilidade, força, controle da dor e segurança.",
  },
  {
    step: "04",
    title: "Acompanhamento contínuo",
    description: "Evolução monitorada com ajustes progressivos conforme a resposta do paciente.",
  },
];

const rehabFaqItems = [
  {
    question: "A reabilitação funciona para mim?",
    answer:
      "O programa pode ser indicado para quadros pós-cirúrgicos, lesões ortopédicas, dores persistentes, perda de mobilidade e limitações funcionais. A confirmação acontece após avaliação médica individualizada.",
  },
  {
    question: "Quanto tempo dura o processo de reabilitação?",
    answer:
      "O tempo varia conforme o diagnóstico, a gravidade do quadro e a resposta clínica de cada paciente. Após a avaliação, definimos metas e uma estimativa de progressão segura.",
  },
  {
    question: "Existe necessidade de cirurgia para iniciar a reabilitação?",
    answer:
      "Não. Muitos pacientes iniciam a reabilitação sem cirurgia, com foco em controle da dor, ganho de mobilidade, fortalecimento e prevenção de piora funcional.",
  },
  {
    question: "Terei alta clínica?",
    answer:
      "Sim. O acompanhamento é conduzido com objetivos funcionais claros, e a alta é considerada quando há recuperação adequada, estabilidade clínica e retorno seguro às atividades.",
  },
  {
    question: "Qual é o custo da reabilitação?",
    answer:
      "O investimento depende da avaliação do caso e da estrutura do plano terapêutico. A equipe orienta os detalhes de atendimento e valores após o primeiro contato.",
  },
];

const arthrodesisBenefits = [
  "Estabilização da coluna em níveis comprometidos",
  "Redução de dor associada à instabilidade ou degeneração discal",
  "Melhora do alinhamento e da proteção de estruturas nervosas",
  "Recuperação funcional com planejamento seguro e individualizado",
];

const arthrodesisHighlights = [
  "Planejamento cirúrgico preciso conforme o nível e a causa da instabilidade",
  "Técnicas modernas com foco em menor agressão tecidual e mais segurança",
  "Acompanhamento pós-operatório estruturado para retorno funcional progressivo",
];

const arthrodesisJourney = [
  {
    step: "01",
    title: "Agendamento da consulta",
    description: "Registro do histórico, sintomas e limitações para direcionar a avaliação especializada.",
  },
  {
    step: "02",
    title: "Avaliação médica personalizada",
    description: "Exame clínico e análise de exames de imagem para definir a necessidade cirúrgica.",
  },
  {
    step: "03",
    title: "Realização da artrodese",
    description: "Ato cirúrgico planejado com foco em estabilidade, alinhamento e proteção neural.",
  },
  {
    step: "04",
    title: "Acompanhamento pós-operatório",
    description: "Evolução monitorada com controle da dor, orientação funcional e reabilitação.",
  },
];

const arthrodesisFaqItems = [
  {
    question: "Artrodese da coluna simplesmente é dor?",
    answer:
      "Não. A artrodese é indicada quando há instabilidade, deformidades, degeneração avançada ou compressões que exigem estabilização estrutural da coluna para melhor controle da dor e proteção funcional.",
  },
  {
    question: "A cirurgia é comum?",
    answer:
      "É um procedimento consagrado na cirurgia de coluna, especialmente em casos selecionados com critério. A indicação depende da avaliação clínica, dos sintomas e dos exames de imagem.",
  },
  {
    question: "A artrodese limita os movimentos?",
    answer:
      "A cirurgia estabiliza segmentos específicos da coluna. O objetivo é reduzir dor e instabilidade preservando ao máximo a funcionalidade global do paciente.",
  },
  {
    question: "Qual é o tempo de recuperação?",
    answer:
      "A recuperação varia conforme o número de níveis tratados, a técnica utilizada e a resposta individual. O pós-operatório é acompanhado de perto para evolução segura e progressiva.",
  },
];

const infiltrationBenefits = [
  "Redução local da dor e da inflamação",
  "Melhora da mobilidade e da função articular",
  "Alívio direcionado em áreas com sobrecarga ou irritação",
  "Possibilidade de acelerar retorno às atividades com orientação adequada",
];

const infiltrationHighlights = [
  "Avaliação criteriosa para definir indicação, alvo anatômico e melhor abordagem",
  "Procedimento realizado com técnica precisa e foco em segurança clínica",
  "Acompanhamento pós-procedimento para orientar evolução, resposta e próximos passos",
];

const infiltrationJourney = [
  {
    step: "01",
    title: "Agendamento da consulta",
    description: "Registro do histórico, sintomas e região dolorosa para avaliação especializada.",
  },
  {
    step: "02",
    title: "Avaliação médica personalizada",
    description: "Definição diagnóstica, análise da origem da dor e indicação da infiltração quando apropriado.",
  },
  {
    step: "03",
    title: "Realização do procedimento",
    description: "Aplicação com técnica direcionada para controle local da dor e da inflamação.",
  },
  {
    step: "04",
    title: "Acompanhamento pós-procedimento",
    description: "Monitoramento da resposta clínica, orientação funcional e ajustes de conduta.",
  },
];

const infiltrationFaqItems = [
  {
    question: "O procedimento de infiltração dói?",
    answer:
      "Pode haver desconforto leve e momentâneo durante a aplicação, mas o procedimento é feito com técnica cuidadosa para tornar a experiência mais tolerável e segura.",
  },
  {
    question: "A infiltração substitui a fisioterapia ou a cirurgia?",
    answer:
      "Não necessariamente. A infiltração é uma ferramenta terapêutica que pode fazer parte de um plano mais amplo, associado a reabilitação, fortalecimento ou outras abordagens.",
  },
  {
    question: "Existem riscos ou efeitos colaterais?",
    answer:
      "Como qualquer procedimento médico, há riscos pontuais, mas eles são reduzidos quando a indicação é correta e a aplicação é realizada com técnica adequada e acompanhamento especializado.",
  },
  {
    question: "A infiltração oferece alívio imediato?",
    answer:
      "Alguns pacientes percebem melhora rápida, enquanto outros evoluem de forma gradual. A resposta depende do quadro, da substância utilizada e do objetivo terapêutico definido na avaliação.",
  },
];

const minimallyInvasiveBenefits = [
  "Menor agressão aos tecidos ao redor da área tratada",
  "Recuperação mais rápida em casos selecionados",
  "Redução de dor pós-operatória e menor impacto funcional inicial",
  "Possibilidade de retorno mais precoce às atividades do dia a dia",
];

const minimallyInvasiveHighlights = [
  "Indicação cirúrgica criteriosa baseada em exame clínico e imagem",
  "Planejamento técnico focado em precisão, segurança e preservação tecidual",
  "Seguimento pós-operatório com orientação individualizada para evolução funcional",
];

const minimallyInvasiveJourney = [
  {
    step: "01",
    title: "Agendamento da consulta",
    description: "Registro do quadro, sintomas e exames prévios para avaliação especializada.",
  },
  {
    step: "02",
    title: "Avaliação médica personalizada",
    description: "Definição diagnóstica e análise da melhor técnica cirúrgica para o caso.",
  },
  {
    step: "03",
    title: "Realização do procedimento",
    description: "Cirurgia com abordagem minimamente invasiva e foco em precisão terapêutica.",
  },
  {
    step: "04",
    title: "Acompanhamento pós-operatório",
    description: "Controle da evolução, da dor e do retorno funcional de forma individualizada.",
  },
];

const minimallyInvasiveFaqItems = [
  {
    question: "A cirurgia dói muito?",
    answer:
      "O procedimento pode causar desconforto no pós-operatório, mas técnicas minimamente invasivas costumam reduzir a agressão local e favorecer uma recuperação mais confortável em casos bem indicados.",
  },
  {
    question: "Quanto tempo leva a recuperação?",
    answer:
      "O tempo varia conforme o tipo de cirurgia, a região tratada e a resposta de cada paciente. Em muitos casos, a recuperação funcional tende a ser mais rápida do que em abordagens convencionais.",
  },
  {
    question: "Ficam cicatrizes visíveis?",
    answer:
      "As incisões tendem a ser menores, o que geralmente resulta em cicatrizes mais discretas, sempre considerando as particularidades do procedimento e do processo de cicatrização.",
  },
  {
    question: "Os resultados são definitivos?",
    answer:
      "Os resultados dependem do diagnóstico, da técnica empregada, da resposta biológica e do seguimento adequado. A cirurgia é planejada para resolver o problema com o máximo de segurança possível.",
  },
  {
    question: "Qual valor da cirurgia?",
    answer:
      "Os custos dependem do tipo de procedimento, da complexidade do caso e da estrutura necessária. A equipe orienta os detalhes após a avaliação médica inicial.",
  },
];

const PHONE_HREF = "tel:+551133842525";
const WHATSAPP_HREF = "https://api.whatsapp.com/send?phone=551133842525";
const CLINIC_NAME = "Instituto Montcare";
const CLINIC_PHONE = "+55 11 3384-2525";
const CLINIC_EMAIL = "institutomontcare@gmail.com";
const CLINIC_ADDRESS = "Av Moaci, 395, 14 andar - Sala 145";
const CLINIC_LOCALITY = "São Paulo";
const CLINIC_REGION = "SP";
const CLINIC_COUNTRY = "BR";
const DEFAULT_SHARE_IMAGE = "/logo-small.webp";
const RAW_APP_BASE_URL = import.meta.env.BASE_URL || "/";
const APP_BASE_URL =
  RAW_APP_BASE_URL === "/" || RAW_APP_BASE_URL === "./" ? "" : RAW_APP_BASE_URL.replace(/\/+$/, "");

// Resolve assets levando em conta ambientes com subpasta ou build estático.
const withBase = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return APP_BASE_URL ? `${APP_BASE_URL}${normalizedPath}` : normalizedPath;
};

const getHomeHref = () => (APP_BASE_URL ? `${APP_BASE_URL}/` : "/");

const toHash = (value) => `#${value.toLowerCase().replaceAll(" ", "-")}`;

// Gera links internos consistentes para home e páginas filhas.
const getSectionHref = (sectionId, isInnerPage = false) =>
  `${isInnerPage ? getHomeHref() : ""}#${sectionId}`;

const getPageHref = (slug) => `${getHomeHref()}${slug}/`;

const procedurePageSlugByTitle = {
  "Reabilitação Ortopédica": "reabilitacao-ortopedica",
  Artrodeses: "artrodeses",
  "Infiltrações": "infiltracoes",
  "Cirurgias Minimamente Invasivas": "cirurgias-minimamente-invasivas",
};

const getProcedureHref = (title) => {
  const page = procedurePageSlugByTitle[title];

  if (page) {
    return getPageHref(page);
  }

  return `#${title.toLowerCase().replaceAll(" ", "-")}`;
};

// Metadados dinâmicos usados por SEO, compartilhamento e schema.org.
export const pageMeta = {
  home: {
    title: "Instituto Montcare | Excelência em Ortopedia",
    description:
      "Instituto Montcare é um centro de excelência em ortopedia com medicina resolutiva, estrutura moderna e cuidado multidisciplinar.",
    path: getHomeHref(),
    serviceName: "Excelência em ortopedia",
    seoContent: {
      eyebrow: "Resumo para pacientes",
      title: "O que é o Instituto Montcare?",
      paragraphs: [
        "O Instituto Montcare é um centro de excelência em ortopedia, especializado em oferecer soluções para os problemas ortopédicos de seus pacientes.",
        "A atuação integra reabilitação funcional, cuidado multidisciplinar, procedimentos menos invasivos e suporte contínuo desde o diagnóstico até o pós-tratamento.",
      ],
      answers: [
        {
          question: "Onde o Instituto Montcare atende?",
          answer:
            "O atendimento acontece em São Paulo, na Av Moaci, 395, 14 andar - Sala 145.",
        },
        {
          question: "Quando procurar atendimento ortopédico?",
          answer:
            "Procure avaliação quando houver dor, limitação física, perda de mobilidade ou necessidade de orientação sobre tratamentos conservadores e cirúrgicos.",
        },
        {
          question: "Quais são os diferenciais da clínica?",
          answer:
            "A Montcare oferece tratamento resolutivo e humanizado, atendimento rápido fora dos planos de saúde e apoio psicológico no processo de recuperação.",
        },
      ],
    },
    faq: faqItems,
  },
  "reabilitacao-ortopedica": {
    title: "Reabilitação Ortopédica | Instituto Montcare",
    description:
      "Avaliação e reabilitação ortopédica com foco em recuperação de movimento, autonomia, controle da dor e retorno seguro às atividades.",
    path: getPageHref("reabilitacao-ortopedica"),
    serviceName: "Reabilitação ortopédica",
    seoContent: {
      eyebrow: "Resumo do tratamento",
      title: "Para que serve a reabilitação ortopédica?",
      paragraphs: [
        "A reabilitação ortopédica auxilia pacientes com dores persistentes, lesões, limitações funcionais ou recuperação pós-cirúrgica.",
        "O plano é individualizado e acompanha metas de controle da dor, ganho de mobilidade, fortalecimento e retorno seguro às atividades.",
      ],
      answers: [
        {
          question: "Como funciona o processo?",
          answer:
            "O processo passa por agendamento, avaliação médica personalizada, elaboração do plano terapêutico e acompanhamento contínuo da evolução.",
        },
        {
          question: "Quais benefícios podem ser esperados?",
          answer:
            "A reabilitação pode favorecer recuperação da função articular e muscular, redução de dor e rigidez, melhora de equilíbrio e prevenção de recidivas.",
        },
      ],
    },
    faq: rehabFaqItems,
  },
  artrodeses: {
    title: "Artrodese da Coluna | Instituto Montcare",
    description:
      "Artrodese da coluna com avaliação especializada, planejamento cirúrgico preciso e foco em estabilidade, alinhamento e recuperação funcional.",
    path: getPageHref("artrodeses"),
    serviceName: "Artrodese da coluna",
    seoContent: {
      eyebrow: "Resumo do procedimento",
      title: "O que é artrodese da coluna?",
      paragraphs: [
        "A artrodese da coluna é uma cirurgia indicada em casos selecionados de instabilidade, deformidade, degeneração avançada ou compressões que exigem estabilização estrutural.",
        "No Instituto Montcare, a indicação considera avaliação clínica, exames e planejamento para reduzir dor, proteger estruturas nervosas e favorecer recuperação segura.",
      ],
      answers: [
        {
          question: "Quando a artrodese pode ser indicada?",
          answer:
            "A indicação depende dos sintomas, exames de imagem, instabilidade, deformidade, degeneração e impacto funcional de cada paciente.",
        },
        {
          question: "Qual é o objetivo da cirurgia?",
          answer:
            "O objetivo é estabilizar segmentos específicos da coluna, reduzir dor associada à instabilidade e permitir retorno funcional progressivo.",
        },
      ],
    },
    faq: arthrodesisFaqItems,
  },
  infiltracoes: {
    title: "Infiltrações Ortopédicas | Instituto Montcare",
    description:
      "Infiltrações ortopédicas para controle da dor e da inflamação, com indicação individualizada e acompanhamento especializado.",
    path: getPageHref("infiltracoes"),
    serviceName: "Infiltrações ortopédicas",
    seoContent: {
      eyebrow: "Resumo do procedimento",
      title: "Para que servem as infiltrações ortopédicas?",
      paragraphs: [
        "As infiltrações ortopédicas podem auxiliar no controle da dor e da inflamação em articulações, tendões ou coluna, sempre após avaliação médica.",
        "A decisão considera a origem da dor, intensidade dos sintomas, região acometida e objetivos terapêuticos do paciente.",
      ],
      answers: [
        {
          question: "Quando a infiltração pode ser indicada?",
          answer:
            "A indicação acontece quando a avaliação clínica identifica benefício possível para controle local de dor ou inflamação.",
        },
        {
          question: "O procedimento substitui acompanhamento médico?",
          answer:
            "Não. A infiltração faz parte de uma estratégia terapêutica e precisa de acompanhamento para avaliar resposta e próximos passos.",
        },
      ],
    },
    faq: infiltrationFaqItems,
  },
  "cirurgias-minimamente-invasivas": {
    title: "Cirurgias Minimamente Invasivas | Instituto Montcare",
    description:
      "Cirurgias minimamente invasivas com foco em precisão, menor agressão tecidual e recuperação funcional orientada por avaliação especializada.",
    path: getPageHref("cirurgias-minimamente-invasivas"),
    serviceName: "Cirurgias minimamente invasivas",
    seoContent: {
      eyebrow: "Resumo do procedimento",
      title: "O que são cirurgias minimamente invasivas?",
      paragraphs: [
        "Cirurgias minimamente invasivas utilizam abordagens modernas para tratar quadros ortopédicos com menor agressão tecidual, pequenas incisões e planejamento técnico individualizado.",
        "Cada procedimento é indicado conforme diagnóstico, biomecânica da lesão, limitações funcionais e expectativas do paciente.",
      ],
      answers: [
        {
          question: "Todo caso pode ser minimamente invasivo?",
          answer:
            "Não. A indicação depende do diagnóstico, exames, limitações funcionais e avaliação médica individualizada.",
        },
        {
          question: "Qual é o foco da técnica?",
          answer:
            "O foco é tratar com precisão, reduzir agressões desnecessárias quando possível e favorecer recuperação funcional orientada.",
        },
      ],
    },
    faq: minimallyInvasiveFaqItems,
  },
};

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function ensureLink(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

// Monta o conjunto de dados estruturados para melhorar indexação e rich results.
export function buildStructuredData(meta, siteOrigin) {
  const origin = siteOrigin || (typeof window !== "undefined" ? window.location.origin : "https://institutomontcare.com.br");
  const clinicId = `${origin}/#clinic`;
  const websiteId = `${origin}/#website`;
  const webpageId = `${origin}/#webpage`;
  const pagePath = meta?.path || getHomeHref();
  const pageUrl = `${origin}${pagePath}`;
  const areaServed = ["São Paulo", "Moema", "Indianópolis", "Zona Sul de São Paulo"].map((name) => ({
    "@type": "Place",
    name,
  }));
  const knowsAbout = [
    "Ortopedia resolutiva",
    "Cirurgia da coluna",
    "Reabilitação ortopédica",
    "Artrodese da coluna",
    "Infiltrações ortopédicas",
    "Cirurgias minimamente invasivas",
    "Mastologia",
    "Reconstrução mamária",
    "Nutrição esportiva",
    "Cuidado infectológico",
    "Osteopatia",
    "Cirurgia de Quadril",
  ];
  const medicalSpecialties = ["Orthopedic", "Physiotherapy", "PlasticSurgery", "InfectiousDisease"];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: CLINIC_NAME,
    url: origin,
    logo: `${origin}${withBase(DEFAULT_SHARE_IMAGE).replace(/^\./, "")}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CLINIC_PHONE,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: CLINIC_NAME,
    url: origin,
    image: `${origin}${withBase(DEFAULT_SHARE_IMAGE).replace(/^\./, "")}`,
    logo: `${origin}${withBase(DEFAULT_SHARE_IMAGE).replace(/^\./, "")}`,
    telephone: CLINIC_PHONE,
    email: CLINIC_EMAIL,
    priceRange: "$$",
    medicalSpecialty: medicalSpecialties,
    areaServed,
    knowsAbout,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC_ADDRESS,
      addressLocality: CLINIC_LOCALITY,
      addressRegion: CLINIC_REGION,
      addressCountry: CLINIC_COUNTRY,
    },
    employee: [
      {
        "@type": "Person",
        name: "Danilo Lira Gianuzzi",
        jobTitle: "Ortopedista e Cirurgião de Coluna",
        identifier: "CRM 161.906/SP",
      },
      {
        "@type": "Person",
        name: "Gustavo Bisson",
        jobTitle: "Ortopedista e Cirurgião de Coluna",
        identifier: "CRM 151542SP",
      },
      {
        "@type": "Person",
        name: "Greice Cristina Tarabay Bisson",
        jobTitle: "Mastologista",
        identifier: "CRM 157503SP",
      },
      {
        "@type": "Person",
        name: "Yoanna Evangelos Abbas",
        jobTitle: "Especialista em Nutrição Esportiva e Obesidade",
        identifier: "CRM 392744",
      },
      {
        "@type": "Person",
        name: "Guilherme Spaziani",
        jobTitle: "Infectologista",
        identifier: "CRM 141775",
      },
      {
        "@type": "Person",
        name: "Ocilmar Junior",
        jobTitle: "Ortopedista e Traumatologista",
        identifier: "CRM 121989",
      },
      {
        "@type": "Person",
        name: "Bruno Tadeu de Oliveira",
        jobTitle: "Fisioterapeuta e Osteopata",
        identifier: "CREFITO 200467",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: CLINIC_NAME,
    url: origin,
    inLanguage: "pt-BR",
    publisher: { "@id": clinicId },
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    name: meta?.title || pageMeta.home.title,
    description: meta?.description || pageMeta.home.description,
    url: pageUrl,
    inLanguage: "pt-BR",
    isPartOf: { "@id": websiteId },
    about: { "@id": clinicId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${origin}${withBase(DEFAULT_SHARE_IMAGE).replace(/^\./, "")}`,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".about-text-block p", ".faq-item", ".doctor-card"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (meta.faq || faqItems).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [organizationSchema, clinicSchema, websiteSchema, webpageSchema, faqSchema];
}

function SeoContentBlock({ meta }) {
  if (!meta?.seoContent) {
    return null;
  }

  const { seoContent } = meta;
  const titleId = `${meta.path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"}-seo-title`;

  return (
    <section className="seo-content-section" aria-labelledby={titleId}>
      <div className="seo-content-shell">
        <span className="seo-content-eyebrow">{seoContent.eyebrow}</span>
        <h2 id={titleId}>{seoContent.title}</h2>

        {seoContent.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="seo-answer-grid">
          {seoContent.answers.map((item) => (
            <article key={item.question} className="seo-answer-card">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Header global com navegação desktop, dropdown de procedimentos e drawer mobile.
function Header({ isInnerPage = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle("body-mobile-menu-open", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("body-mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`navbar${isInnerPage ? " navbar-solid" : ""}`}>
        <a className="brand" href={isInnerPage ? getHomeHref() : "#home"} aria-label="Logo da empresa">
        <img
          className="brand-logo"
          src={withBase("/logo-small.webp")}
          alt="Logo da empresa"
          width="205"
          height="64"
          decoding="async"
          fetchpriority="high"
        />
      </a>

      <button
        type="button"
        className={`mobile-menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`mobile-menu-backdrop${isMobileMenuOpen ? " is-open" : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <nav className="nav-menu-desktop" aria-label="Navegação principal">
        {navItems.slice(0, 2).map((item) => (
          <a
            key={item.label}
            href={item.label === "Home" ? (isInnerPage ? getHomeHref() : item.href) : item.href === "#" ? item.href : getSectionHref(item.href.replace(/^#/, ""), isInnerPage)}
            className="nav-link"
          >
            {item.label}
          </a>
        ))}

        <div className="nav-dropdown">
          <a
            href={isInnerPage ? `${getHomeHref()}#procedimentos` : "#procedimentos"}
            className="nav-link nav-link-with-caret"
          >
            <span>Soluções</span>
            <span className="nav-caret" aria-hidden="true" />
          </a>

          <div className="dropdown-menu">
            {procedures.map((item) => (
              <a key={item.title} href={getProcedureHref(item.title, isInnerPage)} className="dropdown-link">
                {item.title}
              </a>
            ))}
          </div>
        </div>

        {navItems.slice(2).map((item) => (
          <a
            key={item.label}
            href={item.href === "#" ? item.href : getSectionHref(item.href.replace(/^#/, ""), isInnerPage)}
            className="nav-link"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <nav
        className={`mobile-drawer${isMobileMenuOpen ? " mobile-drawer-open" : ""}`}
        aria-label="Navegação mobile"
      >
        <a
          href={isInnerPage ? getHomeHref() : "#home"}
          className="mobile-drawer-link"
          onClick={closeMobileMenu}
        >
          Home
        </a>
        <a
          href={getSectionHref("quem-somos", isInnerPage)}
          className="mobile-drawer-link"
          onClick={closeMobileMenu}
        >
          Quem somos
        </a>
        <a href="#" className="mobile-drawer-link" onClick={closeMobileMenu}>
          Blog
        </a>

        <div className="mobile-drawer-group">
          <span className="mobile-drawer-label">Soluções</span>
          {procedures.map((item) => (
            <a
              key={item.title}
              href={getProcedureHref(item.title, isInnerPage)}
              className="mobile-drawer-sublink"
              onClick={closeMobileMenu}
            >
              {item.title}
            </a>
          ))}
        </div>

        <a
          href={getSectionHref("duvidas", isInnerPage)}
          className="mobile-drawer-link"
          onClick={closeMobileMenu}
        >
          FAQ
        </a>
        <a
          className="contact-button contact-button-mobile"
          href={PHONE_HREF}
          onClick={closeMobileMenu}
        >
          <span>Ligar</span>
          <span className="contact-arrow" aria-hidden="true" />
        </a>
      </nav>

      <a className="contact-button contact-button-desktop" href={PHONE_HREF}>
        <span>Ligar</span>
        <span className="contact-arrow" aria-hidden="true" />
      </a>
    </header>
  );
}

function FooterIcon({ type }) {
  const paths = {
    phone: (
      <path d="M7.2 4.6c.3-.3.8-.4 1.2-.2l2.1 1c.5.2.7.8.5 1.3l-.7 1.6c.8 1.4 2 2.6 3.4 3.4l1.6-.7c.5-.2 1.1 0 1.3.5l1 2.1c.2.4.1.9-.2 1.2l-1.1 1.1c-.6.6-1.5.8-2.3.5C9.9 15.1 6.9 12.1 5.6 8c-.3-.8-.1-1.7.5-2.3l1.1-1.1Z" />
    ),
    mail: (
      <>
        <path d="M4.8 6.5h14.4v11H4.8v-11Z" />
        <path d="m5.2 7.1 6.8 5.3 6.8-5.3" />
      </>
    ),
    location: (
      <>
        <path d="M12 20s6-5.1 6-10a6 6 0 0 0-12 0c0 4.9 6 10 6 10Z" />
        <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
      </>
    ),
  };

  return (
    <span className="footer-contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        {paths[type]}
      </svg>
    </span>
  );
}

// Rodapé institucional com contatos, navegação e crédito do projeto.
function FloatingWhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar no WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16 3.2c-7 0-12.7 5.6-12.7 12.5 0 2.2.6 4.3 1.7 6.2l-1.8 6.9 7.1-1.8c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.6 12.7-12.5S23 3.2 16 3.2Zm0 23c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.2 1.1 1.1-4.1-.3-.4c-1-1.6-1.6-3.5-1.6-5.4 0-5.6 4.7-10.2 10.4-10.2s10.4 4.6 10.4 10.2S21.7 26.2 16 26.2Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4Z" />
      </svg>
    </a>
  );
}

function Footer({ isInnerPage = false }) {
  return (
    <footer className="site-footer" id="agendamento">
      <div className="footer-shell">
        <div className="footer-brand" data-footer-reveal>
          <span className="footer-kicker">Instituto Montcare</span>
          <img
            className="footer-logo"
            src={withBase("/logo-small.webp")}
            alt="Instituto Montcare"
            width="205"
            height="64"
            loading="lazy"
            decoding="async"
          />
          <p className="footer-summary">
            Ortopedia resolutiva com atendimento humanizado, estrutura moderna e foco em cuidado
            real para mais mobilidade e qualidade de vida.
          </p>
          <p className="footer-legal">
            Responsável Técnico:
            <br />
            Dr. Gustavo Bisson | CRM 151542 SP
          </p>
        </div>

        <div className="footer-contact" data-footer-reveal>
          <h3>Atendimento</h3>

          <a href={PHONE_HREF} className="footer-contact-item">
            <FooterIcon type="phone" />
            <span>
              <strong>(11) 3384-2525</strong>
              <small>Atendimento por telefone</small>
            </span>
          </a>

          <a href={`mailto:${CLINIC_EMAIL}`} className="footer-contact-item">
            <FooterIcon type="mail" />
            <span>
              <strong>{CLINIC_EMAIL}</strong>
              <small>Contato por e-mail</small>
            </span>
          </a>

          <div className="footer-contact-item">
            <FooterIcon type="location" />
            <span>
              <strong>{CLINIC_ADDRESS}</strong>
              <small>Endereço de atendimento</small>
            </span>
          </div>
        </div>

        <nav className="footer-nav" aria-label="Navegação do rodapé" data-footer-reveal>
          <h3>Navegação</h3>
          <a href={isInnerPage ? getHomeHref() : "#home"}>Home</a>
          <a href={getSectionHref("quem-somos", isInnerPage)}>Quem somos</a>
          <a href="#">Blog</a>
          <a href={getSectionHref("procedimentos", isInnerPage)}>Soluções</a>
          <a href={getSectionHref("duvidas", isInnerPage)}>FAQ</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <span data-footer-credit-reveal>Desenvolvido por </span>
        <a
          href="https://www.corpad.com.br"
          target="_blank"
          rel="noreferrer"
          className="footer-credit-link"
          aria-label="Site da Corpad"
          data-footer-credit-reveal
        >
          <img
            src={withBase("/logodev.webp")}
            alt="Corpad"
            className="footer-credit-logo"
            width="112"
            height="32"
            loading="lazy"
            decoding="async"
          />
        </a>
      </div>
      <FloatingWhatsAppButton />
    </footer>
  );
}

// Home institucional com hero, autoridade clínica, corpo médico e seções de conversão.
function HomePage() {
  return (
    <div className="page-shell">
      <Header />

      <main className="hero-section" id="home">
        <picture className="hero-media" aria-hidden="true">
          <source srcSet={withBase("/bg-hero-mobile.webp")} media="(max-width: 760px)" />
          <img
            src={withBase("/bg-hero.webp")}
            alt=""
            width="1920"
            height="1080"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-overlay">
          <section className="hero-content">
            <h1 className="hero-title">
              Cuidado ortopédico de excelência para te dar mais qualidade de vida.
            </h1>
            <p className="hero-subtitle">Medicina resolutiva: foco em resultados.</p>
          </section>
        </div>
      </main>

      <section className="about-section" id="quem-somos">
        <div className="about-shell">
          <div className="about-copy" data-reveal>
            <span className="section-eyebrow">INSTITUTO MONTCARE</span>
            <h2 className="section-title">QUEM SOMOS</h2>

            <div className="about-text-block">
              <p>
                O Instituto Montcare é um centro de excelência em ortopedia, especializado em oferecer
                soluções para os problemas ortopédicos de seus pacientes. O local conta com uma
                estrutura moderna voltada para procedimentos cirúrgicos e tratamentos menos invasivos.
              </p>

              <p>
                A missão do Instituto é atuar como uma retaguarda para o paciente ortopédico,
                oferecendo suporte integral desde o diagnóstico até o pós-tratamento. Acreditamos que
                cada paciente merece não apenas um tratamento técnico, mas também acolhimento emocional
                e acompanhamento psicológico, fundamentais no enfrentamento de dores e limitações
                físicas.
              </p>
            </div>

            <div className="about-text-block about-text-block-secondary">
              <p>
                O Instituto Montcare integra especialidades que vão desde a reabilitação funcional até
                o atendimento psico-nutricional, criando um cuidado multidisciplinar alinhado ao
                tratamento ortopédico. Nosso compromisso é proporcionar um atendimento ágil, para acesso
                rápido e direto às melhores opções de tratamento, sem burocracia.
              </p>

              <p>
                O Montcare trabalha sob o conceito de “medicina resolutiva”, onde o paciente é o centro
                de toda atenção. O objetivo é claro: o paciente entra com dor e sai com opções de
                tratamento, acolhimento, respeito e suporte contínuo para o bem-estar físico e emocional.
              </p>

              <p className="about-highlight">
                Aqui, você encontra uma equipe altamente qualificada, ambiente acolhedor e atendimento
                dedicado a cuidar do seu corpo e da sua mente.
              </p>
              <p className="about-highlight">
                Diretor Técnico<br />
                Gustavo Bisson | CRM 151542SP<br />
                Ortopedia e Traumatologia | RQE 69072
              </p>
            </div>

            <a className="about-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agende sua consulta
            </a>
          </div>

          <div className="about-media" data-reveal>
            <div className="about-image-frame">
              <img
                className="about-image"
                src={withBase("/sobre-optimized.webp")}
                alt="Diretores do Instituto Montcare"
                width="495"
                height="660"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="procedures-section" id="procedimentos">
        <div className="procedures-shell">
          <h2 className="procedures-title" data-reveal>PROCEDIMENTOS</h2>

          <div className="procedure-grid">
            {procedures.map((item) => (
              <article key={item.title} className="procedure-item" data-reveal>
                <div className="procedure-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={getProcedureHref(item.title)}>VER MAIS →</a>
                </div>
              </article>
            ))}
          </div>

          <a className="procedures-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer" data-reveal>
            Agende sua consulta
          </a>
        </div>
      </section>

      <section className="specialties-section">
        <div className="specialties-shell">
          <span className="specialties-eyebrow" data-reveal>DIFERENCIAIS</span>
          <h2 className="specialties-title" data-reveal>Conheça alguns dos diferenciais Montcare:</h2>
          <div className="specialties-grid">
            {[
              "Tratamento resolutivo e humanizado.",
              "Atendimento rápido, fora dos planos de saúde.",
              "Apoio psicológico no processo de recuperação.",
            ].map((item, index) => (
              <article key={item} className="specialty-card" data-reveal>
                <span className="specialty-index" aria-hidden="true">{index + 1}</span>
                <div className="specialty-card-line" aria-hidden="true" />
                <h3>{item}</h3>
              </article>
            ))}
          </div>
          <a className="specialties-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer" data-reveal>
            Agende sua consulta
          </a>
        </div>
      </section>

      <section className="specialties-section">
        <div className="specialties-shell">
          <span className="specialties-eyebrow" data-reveal>ATUAÇÃO ESPECIALIZADA</span>
          <h2 className="specialties-title" data-reveal>ESPECIALIDADES</h2>
          <p className="specialties-description" data-reveal>
            Áreas de atuação com abordagem precisa, visão integrada e foco em devolver conforto,
            movimento e qualidade de vida.
          </p>

          <div className="specialties-grid">
            {specialties.map((specialty, index) => (
              <article key={specialty.title} className="specialty-card" data-reveal>
                <span className="specialty-index" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="specialty-icon-frame" aria-hidden="true">
                  <img
                    className="specialty-icon"
                    src={withBase(specialty.icon)}
                    alt=""
                    width="180"
                    height="180"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="specialty-card-line" aria-hidden="true" />
                <h3>{specialty.title}</h3>
                <p>{specialty.description}</p>
              </article>
            ))}
          </div>

          <a className="specialties-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer" data-reveal>
            Agende sua consulta
          </a>
        </div>
      </section>

      <section className="team-section">
        <div className="team-shell">
          <div className="team-header" data-reveal>
            <span className="team-eyebrow">CORPO CLÍNICO</span>
            <h2 className="team-title">Cuidado completo para cada paciente</h2>
            <p className="team-description">
              Um corpo clínico diversificado permite cuidar do paciente como um todo, integrando
              diferentes especialidades e níveis de tratamento. O acompanhamento pode começar em
              uma fisioterapia simples e evoluir, quando necessário, para cirurgias complexas como
              artrodeses, discectomias e outros procedimentos ortopédicos especializados.
            </p>
          </div>

          <div className="team-carousel" data-reveal>
            <div className="team-track">
              {[...doctors, ...doctors].map((doctor, index) => (
                <article key={`${doctor.name}-${doctor.image}-${index}`} className="doctor-card">
                  <img
                    className="doctor-photo"
                    src={withBase(doctor.image)}
                    alt={doctor.name}
                    width="230"
                    height="185"
                    loading="lazy"
                    decoding="async"
                    style={doctor.imageStyle}
                  />

                  <div className="doctor-card-body">
                    <h3>{doctor.name}</h3>
                    <p className="doctor-role">{doctor.specialty}</p>
                    <span className="doctor-crm">{doctor.crm}</span>
                    <div className="doctor-divider" aria-hidden="true" />
                    <p className="doctor-summary">{doctor.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section" id="duvidas">
        <div className="faq-shell">
          <div className="faq-copy">
            <h2 className="faq-title" data-reveal>PERGUNTAS FREQUENTES</h2>

            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} className="faq-item" open={index === 0} data-reveal>
                  <summary className="faq-question">
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {index === 0 ? "-" : "+"}
                    </span>
                  </summary>
                  <p className="faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>

            <a className="faq-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer" data-reveal>
              Agende sua consulta
            </a>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-shell">
          <div className="testimonials-header" data-reveal>
            <span className="testimonials-eyebrow">EXPERIÊNCIA DOS PACIENTES</span>
            <h2 className="testimonials-title">Depoimentos</h2>
            <p className="testimonials-description">
              Relatos de pacientes que encontraram acolhimento, clareza no diagnóstico e um cuidado
              ortopédico voltado a resultados reais.
            </p>
          </div>

          <div className="testimonials-carousel" data-reveal>
            <div className="testimonials-track">
              {[...testimonials, ...testimonials].map((item, index) => (
                <article key={`${item.name}-${index}`} className="testimonial-card">
                  <div className="testimonial-rating" aria-label="5 estrelas">
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                  </div>

                  <p className="testimonial-quote">"{item.quote}"</p>

                  <div className="testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.detail}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SeoContentBlock meta={pageMeta.home} />
      <Footer />
    </div>
  );
}

// Página interna de reabilitação ortopédica.
function RehabPage() {
  return (
    <div className="rehab-page-shell">
      <Header isInnerPage />

      <main className="rehab-hero">
        <div className="rehab-hero-overlay">
          <section className="rehab-hero-content">
            <span className="rehab-eyebrow">REABILITAÇÃO ORTOPÉDICA</span>
            <h1>
              Reabilitação Ortopédica com foco na recuperação de movimento e autonomia
            </h1>
            <p>
              Avaliação médica individualizada para reabilitação após lesões ortopédicas,
              cirurgias ou disfunções articulares.
            </p>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </section>
        </div>
      </main>

      <section className="rehab-story-section">
        <div className="rehab-story-shell">
          <div className="rehab-story-copy">
            <h2>Perder mobilidade afeta mais do que o corpo, compromete sua rotina.</h2>
            <p>
              Seja após um trauma, cirurgia ou por limitações progressivas, a dificuldade em
              realizar movimentos compromete a independência e a qualidade de vida. Dores crônicas,
              rigidez articular e desequilíbrios musculares podem evoluir sem tratamento adequado,
              impactando atividades simples como caminhar, levantar ou carregar objetos.
            </p>
            <p>
              A reabilitação funcional busca restaurar o equilíbrio do sistema
              musculoesquelético, reduzir compensações e devolver confiança para o retorno
              progressivo às atividades.
            </p>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame rehab-photo-frame-compact">
              <img src={withBase("/reb/2_3.webp")} alt="Paciente com limitação de mobilidade em avaliação ortopédica" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-plan-section">
        <div className="rehab-plan-shell">
          <div className="rehab-plan-copy">
            <h2>Reabilitação estruturada com acompanhamento médico e foco funcional</h2>
            <p>
              No Instituto Montcare, a reabilitação funcional é conduzida a partir de uma avaliação
              ortopédica criteriosa. O plano é estruturado de forma personalizada, combinando
              técnicas de fortalecimento, mobilidade, propriocepção e controle da dor.
            </p>
            <p>
              O acompanhamento é constante, com foco em progressão gradual, prevenção de recidivas
              e retorno seguro às atividades do dia a dia.
            </p>

            <div className="rehab-highlight-list">
              {rehabHighlights.map((item) => (
                <div key={item} className="rehab-highlight-item">
                  <span className="rehab-highlight-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="rehab-benefits">
              <h3>Benefícios esperados:</h3>

              <ul>
                {rehabBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame">
              <img src={withBase("/reb/1_3.webp")} alt="Atendimento de reabilitação ortopédica" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-process-section">
        <div className="rehab-process-shell">
          <div className="rehab-process-header">
            <span className="rehab-section-kicker">COMO FUNCIONA</span>
            <h2>Como funciona</h2>
          </div>

          <div className="rehab-process-grid">
            {rehabJourney.map((item) => (
              <article key={item.step} className="rehab-process-card">
                <span className="rehab-process-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <a className="rehab-process-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
            Agendar minha avaliação
          </a>
        </div>
      </section>

      <section className="rehab-about-section">
        <div className="rehab-about-shell">
          <div className="rehab-about-copy">
            <span className="rehab-section-kicker">SOBRE O INSTITUTO</span>
            <h2>Sobre o Instituto Montcare</h2>
            <p>
              Somos referência em ortopedia resolutiva, com uma atuação centrada em diagnóstico
              preciso, estratégia terapêutica individualizada e acompanhamento próximo ao paciente.
            </p>
            <p>
              Em cada etapa da reabilitação, buscamos mais do que aliviar sintomas: nosso objetivo é
              recuperar função, devolver autonomia e conduzir o retorno seguro às atividades da vida
              diária.
            </p>

            <div className="rehab-doctor-quote">
              <strong>Dr. Gustavo Bisson</strong>
              <span>Responsável técnico e acompanhamento clínico especializado</span>
              <p>
                A proposta do Instituto Montcare é tratar cada caso com clareza clínica, metas
                funcionais realistas e evolução monitorada, para que o paciente retome movimento com
                segurança e confiança.
              </p>
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-about-media">
            <div className="rehab-about-photo-frame">
              <img src={withBase("/time/2.webp")} alt="Dr. Gustavo Bisson" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-faq-section">
        <div className="rehab-faq-shell">
          <div className="rehab-faq-copy">
            <span className="rehab-section-kicker">PERGUNTAS FREQUENTES</span>
            <h2>Perguntas frequentes</h2>

            <div className="rehab-faq-list">
              {rehabFaqItems.map((item, index) => (
                <details key={item.question} className="rehab-faq-item" open={index === 0}>
                  <summary className="rehab-faq-question">
                    <span>{item.question}</span>
                    <span className="rehab-faq-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="rehab-faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

        </div>
      </section>

      <SeoContentBlock meta={pageMeta["reabilitacao-ortopedica"]} />
      <Footer isInnerPage />
    </div>
  );
}

// Página interna de artrodese.
function ArthrodesisPage() {
  return (
    <div className="rehab-page-shell">
      <Header isInnerPage />

      <main className="rehab-hero art-hero">
        <div className="rehab-hero-overlay">
          <section className="rehab-hero-content">
            <span className="rehab-eyebrow">ARTRODESES</span>
            <h1>Artrodese da coluna: estabilidade para quadros complexos e dor crônica</h1>
            <p>
              Cirurgia com foco na fixação e alinhamento da coluna vertebral em casos de
              instabilidade, deformidades ou desgaste avançado.
            </p>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </section>
        </div>
      </main>

      <section className="rehab-story-section">
        <div className="rehab-story-shell">
          <div className="rehab-story-copy">
            <h2>Dores crônicas e instabilidade na coluna podem afetar sua qualidade de vida e autonomia</h2>
            <p>
              Instabilidades vertebrais, artroses severas, deformidades estruturais e desgaste de
              discos podem comprometer sustentação, equilíbrio e conforto funcional. Quando a coluna
              perde estabilidade, a dor tende a se tornar persistente e limitante.
            </p>
            <p>
              Em quadros com comprometimento mecânico ou neurológico relevante, a artrodese pode ser
              uma alternativa para restaurar alinhamento, proteger estruturas nervosas e devolver mais
              segurança ao movimento.
            </p>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame rehab-photo-frame-compact">
              <img src={withBase("/artrod/1_2.webp")} alt="Dor e desconforto na região da coluna" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-plan-section">
        <div className="rehab-plan-shell">
          <div className="rehab-plan-copy">
            <h2>Soluções cirúrgicas modernas com técnicas de baixa agressividade</h2>
            <p>
              A artrodese vertebral pode ser realizada para promover a fusão de duas ou mais vértebras,
              reduzindo micromovimentos dolorosos e oferecendo estabilidade à coluna. O planejamento é
              individualizado, com definição da técnica e dos níveis tratados conforme cada caso.
            </p>
            <p>
              No Instituto Montcare, a indicação cirúrgica é feita com critério, baseada em exame,
              sintomas e imagem, sempre buscando segurança, alinhamento e melhor perspectiva funcional
              no longo prazo.
            </p>

            <div className="rehab-highlight-list">
              {arthrodesisHighlights.map((item) => (
                <div key={item} className="rehab-highlight-item">
                  <span className="rehab-highlight-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="rehab-benefits">
              <h3>Benefícios esperados:</h3>

              <ul>
                {arthrodesisBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame">
              <img src={withBase("/artrod/2_1.webp")} alt="Imagem médica da coluna para planejamento de artrodese" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-process-section">
        <div className="rehab-process-shell">
          <div className="rehab-process-header">
            <span className="rehab-section-kicker">COMO FUNCIONA</span>
            <h2>Como funciona</h2>
          </div>

          <div className="rehab-process-grid">
            {arthrodesisJourney.map((item) => (
              <article key={item.step} className="rehab-process-card">
                <span className="rehab-process-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <a className="rehab-process-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
            Agendar minha avaliação
          </a>
        </div>
      </section>

      <section className="rehab-about-section">
        <div className="rehab-about-shell">
          <div className="rehab-about-copy">
            <span className="rehab-section-kicker">SOBRE O INSTITUTO</span>
            <h2>Sobre o Instituto Montcare</h2>
            <p>
              Somos referência em cirurgia de coluna com abordagem resolutiva, avaliação criteriosa e
              decisão clínica orientada por evidência e experiência cirúrgica.
            </p>
            <p>
              Nossa proposta é indicar procedimentos apenas quando realmente necessários, com
              planejamento individualizado, condução técnica precisa e seguimento próximo em todas as
              etapas do tratamento.
            </p>

            <div className="rehab-doctor-quote">
              <strong>Dr. Gustavo Bisson</strong>
              <span>Cirurgia da coluna com avaliação especializada</span>
              <p>
                Cada indicação de artrodese deve ser cuidadosamente construída. O foco é estabilizar a
                coluna quando necessário, aliviar dor relevante e preservar a melhor funcionalidade
                possível para o paciente.
              </p>
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-about-media">
            <div className="rehab-about-photo-frame">
              <img src={withBase("/time/2.webp")} alt="Dr. Gustavo Bisson" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-faq-section">
        <div className="rehab-faq-shell">
          <div className="rehab-faq-copy">
            <span className="rehab-section-kicker">PERGUNTAS FREQUENTES</span>
            <h2>Perguntas frequentes</h2>

            <div className="rehab-faq-list">
              {arthrodesisFaqItems.map((item, index) => (
                <details key={item.question} className="rehab-faq-item" open={index === 0}>
                  <summary className="rehab-faq-question">
                    <span>{item.question}</span>
                    <span className="rehab-faq-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="rehab-faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

        </div>
      </section>

      <SeoContentBlock meta={pageMeta.artrodeses} />
      <Footer isInnerPage />
    </div>
  );
}

// Página interna de infiltrações.
function InfiltrationsPage() {
  return (
    <div className="rehab-page-shell">
      <Header isInnerPage />

      <main className="rehab-hero infil-hero">
        <div className="rehab-hero-overlay">
          <section className="rehab-hero-content">
            <span className="rehab-eyebrow">INFILTRAÇÕES</span>
            <h1>Infiltrações ortopédicas com foco em alívio da dor e ganho funcional</h1>
            <p>
              Procedimento direcionado para controle da dor e da inflamação em articulações,
              tendões e estruturas periarticulares com indicação individualizada.
            </p>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </section>
        </div>
      </main>

      <section className="rehab-story-section">
        <div className="rehab-story-shell">
          <div className="rehab-story-copy">
            <h2>A dor articular limita sua vida no dia a dia?</h2>
            <p>
              Dores em articulações e inflamações localizadas, mesmo em menor intensidade, podem
              limitar tarefas simples, prejudicar movimento e reduzir qualidade de vida. Em muitos
              casos, o desconforto persiste mesmo com medidas iniciais.
            </p>
            <p>
              Quando há indicação médica, a infiltração pode ser uma alternativa para atuar
              diretamente na área afetada e ajudar no controle da dor com ação local.
            </p>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame rehab-photo-frame-compact">
              <img src={withBase("/inf/1_2.webp")} alt="Dor articular e limitação funcional no dia a dia" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-plan-section">
        <div className="rehab-plan-shell">
          <div className="rehab-plan-copy">
            <h2>Infiltrações e acompanhamento especializado podem trazer bons resultados</h2>
            <p>
              No Instituto Montcare, as infiltrações são realizadas com acompanhamento especializado
              e indicação individualizada, após avaliação clínica detalhada. O procedimento pode ser
              uma possibilidade de suporte no manejo da dor e da inflamação em diferentes condições
              ortopédicas.
            </p>
            <p>
              A decisão considera o diagnóstico, a intensidade dos sintomas, a região acometida e os
              objetivos terapêuticos do paciente, sempre com foco em funcionalidade e segurança.
            </p>

            <div className="rehab-highlight-list">
              {infiltrationHighlights.map((item) => (
                <div key={item} className="rehab-highlight-item">
                  <span className="rehab-highlight-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="rehab-benefits">
              <h3>Benefícios esperados:</h3>

              <ul>
                {infiltrationBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame">
              <img src={withBase("/inf/2_2.webp")} alt="Procedimento ortopédico com foco em infiltração e dor articular" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-process-section">
        <div className="rehab-process-shell">
          <div className="rehab-process-header">
            <span className="rehab-section-kicker">COMO FUNCIONA</span>
            <h2>Como funciona</h2>
          </div>

          <div className="rehab-process-grid">
            {infiltrationJourney.map((item) => (
              <article key={item.step} className="rehab-process-card">
                <span className="rehab-process-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <a className="rehab-process-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
            Agendar minha avaliação
          </a>
        </div>
      </section>

      <section className="rehab-about-section">
        <div className="rehab-about-shell">
          <div className="rehab-about-copy">
            <span className="rehab-section-kicker">SOBRE O INSTITUTO</span>
            <h2>Sobre o Instituto Montcare</h2>
            <p>
              Nossa atuação combina ortopedia resolutiva, avaliação clínica cuidadosa e indicação
              terapêutica individualizada, sempre com foco em alívio real de sintomas e preservação
              funcional.
            </p>
            <p>
              Em procedimentos como infiltrações, a decisão é sempre construída com critério para que
              o paciente tenha clareza sobre benefícios, limites e melhor estratégia para o seu caso.
            </p>

            <div className="rehab-doctor-quote">
              <strong>Dr. Gustavo Bisson</strong>
              <span>Avaliação ortopédica e conduta terapêutica especializada</span>
              <p>
                A infiltração precisa ter objetivo clínico claro. Mais do que aplicar um procedimento,
                buscamos entender a origem da dor e indicar a melhor conduta para cada paciente.
              </p>
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-about-media">
            <div className="rehab-about-photo-frame">
              <img src={withBase("/time/2.webp")} alt="Dr. Gustavo Bisson" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-faq-section">
        <div className="rehab-faq-shell">
          <div className="rehab-faq-copy">
            <span className="rehab-section-kicker">PERGUNTAS FREQUENTES</span>
            <h2>Perguntas frequentes</h2>

            <div className="rehab-faq-list">
              {infiltrationFaqItems.map((item, index) => (
                <details key={item.question} className="rehab-faq-item" open={index === 0}>
                  <summary className="rehab-faq-question">
                    <span>{item.question}</span>
                    <span className="rehab-faq-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="rehab-faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

        </div>
      </section>

      <SeoContentBlock meta={pageMeta.infiltracoes} />
      <Footer isInnerPage />
    </div>
  );
}

// Página interna de cirurgias minimamente invasivas.
function MinimallyInvasivePage() {
  return (
    <div className="rehab-page-shell">
      <Header isInnerPage />

      <main className="rehab-hero mini-hero">
        <div className="rehab-hero-overlay">
          <section className="rehab-hero-content">
            <span className="rehab-eyebrow">CIRURGIAS MINIMAMENTE INVASIVAS</span>
            <h1>Cirurgias minimamente invasivas com foco em precisão e recuperação funcional</h1>
            <p>
              Abordagens cirúrgicas modernas para tratar diferentes quadros ortopédicos com menor
              agressão tecidual, quando bem indicadas.
            </p>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </section>
        </div>
      </main>

      <section className="rehab-story-section">
        <div className="rehab-story-shell">
          <div className="rehab-story-copy">
            <h2>Quando o tratamento conservador não é mais suficiente, a técnica cirúrgica adequada faz diferença.</h2>
            <p>
              Alguns quadros ortopédicos, como lesões articulares, desgastes estruturais e
              compressões persistentes, podem exigir tratamento cirúrgico para restaurar função e
              controlar sintomas com mais efetividade.
            </p>
            <p>
              Nas cirurgias minimamente invasivas, pequenas incisões, precisão instrumental e menor
              manipulação de estruturas ao redor podem contribuir para recuperação mais rápida e
              melhor conforto no pós-operatório, em casos selecionados.
            </p>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame rehab-photo-frame-compact">
              <img src={withBase("/Ciru/1_1.webp")} alt="Representação de cirurgia minimamente invasiva" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-plan-section">
        <div className="rehab-plan-shell">
          <div className="rehab-plan-copy">
            <h2>Soluções cirúrgicas modernas com técnicas de baixa agressividade</h2>
            <p>
              Utilizamos recursos modernos de planejamento e execução para selecionar abordagens
              cirúrgicas menos invasivas quando há benefício clínico real. Essas técnicas buscam
              preservar tecidos, reduzir trauma local e permitir reabilitação mais eficiente.
            </p>
            <p>
              Cada procedimento é indicado de forma individualizada, considerando diagnóstico,
              biomecânica da lesão, limitações funcionais e expectativas do paciente, sempre com foco
              em segurança e resultado.
            </p>

            <div className="rehab-highlight-list">
              {minimallyInvasiveHighlights.map((item) => (
                <div key={item} className="rehab-highlight-item">
                  <span className="rehab-highlight-dot" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="rehab-benefits">
              <h3>Benefícios esperados:</h3>

              <ul>
                {minimallyInvasiveBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <a className="rehab-primary-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-plan-media">
            <div className="rehab-photo-frame">
              <img src={withBase("/Ciru/2_1.webp")} alt="Equipe em procedimento cirúrgico ortopédico" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-process-section">
        <div className="rehab-process-shell">
          <div className="rehab-process-header">
            <span className="rehab-section-kicker">COMO FUNCIONA</span>
            <h2>Como funciona</h2>
          </div>

          <div className="rehab-process-grid">
            {minimallyInvasiveJourney.map((item) => (
              <article key={item.step} className="rehab-process-card">
                <span className="rehab-process-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <a className="rehab-process-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
            Agendar minha avaliação
          </a>
        </div>
      </section>

      <section className="rehab-about-section">
        <div className="rehab-about-shell">
          <div className="rehab-about-copy">
            <span className="rehab-section-kicker">SOBRE O INSTITUTO</span>
            <h2>Sobre o Instituto Montcare</h2>
            <p>
              O Instituto Montcare trabalha com visão moderna de ortopedia cirúrgica, unindo
              avaliação técnica rigorosa, indicação responsável e condutas orientadas para resultado
              funcional real.
            </p>
            <p>
              Em cirurgias minimamente invasivas, nosso foco é oferecer estratégia terapêutica precisa,
              com equilíbrio entre tecnologia, segurança e recuperação progressiva.
            </p>

            <div className="rehab-doctor-quote">
              <strong>Dr. Gustavo Bisson</strong>
              <span>Planejamento cirúrgico e cuidado ortopédico especializado</span>
              <p>
                A técnica certa precisa estar a serviço da necessidade do paciente. O objetivo é
                tratar com precisão, minimizar agressões desnecessárias e favorecer uma boa evolução
                pós-operatória.
              </p>
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

          <div className="rehab-about-media">
            <div className="rehab-about-photo-frame">
              <img src={withBase("/time/2.webp")} alt="Dr. Gustavo Bisson" />
            </div>
          </div>
        </div>
      </section>

      <section className="rehab-faq-section">
        <div className="rehab-faq-shell">
          <div className="rehab-faq-copy">
            <span className="rehab-section-kicker">PERGUNTAS FREQUENTES</span>
            <h2>Perguntas frequentes</h2>

            <div className="rehab-faq-list">
              {minimallyInvasiveFaqItems.map((item, index) => (
                <details key={item.question} className="rehab-faq-item" open={index === 0}>
                  <summary className="rehab-faq-question">
                    <span>{item.question}</span>
                    <span className="rehab-faq-icon" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="rehab-faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>

            <a className="rehab-inline-button" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
              Agendar minha avaliação
            </a>
          </div>

        </div>
      </section>

      <SeoContentBlock meta={pageMeta["cirurgias-minimamente-invasivas"]} />
      <Footer isInnerPage />
    </div>
  );
}

// Roteamento leve por query string/pathname e hidratação dos metadados da página atual.
export const staticRoutes = [
  { key: "home", path: "/" },
  { key: "reabilitacao-ortopedica", path: "/reabilitacao-ortopedica/" },
  { key: "artrodeses", path: "/artrodeses/" },
  { key: "infiltracoes", path: "/infiltracoes/" },
  { key: "cirurgias-minimamente-invasivas", path: "/cirurgias-minimamente-invasivas/" },
];

function App({ initialPage } = {}) {
  const hasWindow = typeof window !== "undefined";
  const pathname = hasWindow ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
  const searchParams = hasWindow ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const page = initialPage || searchParams.get("page");
  const isRehabPage = page === "reabilitacao-ortopedica" || pathname.endsWith("/reabilitacao-ortopedica");
  const isArthrodesisPage = page === "artrodeses" || pathname.endsWith("/artrodeses");
  const isInfiltrationPage = page === "infiltracoes" || pathname.endsWith("/infiltracoes");
  const isMinimallyInvasivePage =
    page === "cirurgias-minimamente-invasivas" || pathname.endsWith("/cirurgias-minimamente-invasivas");
  const currentMetaKey =
    page ||
    (isRehabPage
      ? "reabilitacao-ortopedica"
      : isArthrodesisPage
        ? "artrodeses"
        : isInfiltrationPage
          ? "infiltracoes"
          : isMinimallyInvasivePage
            ? "cirurgias-minimamente-invasivas"
            : "home");

  useEffect(() => {
    const meta = pageMeta[currentMetaKey] || pageMeta.home;
    const canonicalUrl = `${window.location.origin}${meta.path}`;
    const shareImageUrl = `${window.location.origin}${withBase(DEFAULT_SHARE_IMAGE).replace(/^\./, "")}`;

    document.title = meta.title;

    ensureMeta('meta[name="description"]', { name: "description", content: meta.description });
    ensureMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-image-preview:large" });
    ensureMeta('meta[name="googlebot"]', {
      name: "googlebot",
      content: "index, follow, max-image-preview:large",
    });
    document.head.querySelector('meta[name="keywords"]')?.remove();
    ensureMeta('meta[name="geo.region"]', { name: "geo.region", content: "BR-SP" });
    ensureMeta('meta[name="geo.placename"]', {
      name: "geo.placename",
      content: `${CLINIC_LOCALITY}, ${CLINIC_REGION}`,
    });
    ensureMeta('meta[name="author"]', { name: "author", content: CLINIC_NAME });
    ensureMeta('meta[name="language"]', { name: "language", content: "pt-BR" });
    ensureMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    ensureMeta('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
    ensureMeta('meta[property="og:site_name"]', { property: "og:site_name", content: CLINIC_NAME });
    ensureMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
    });
    ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    ensureMeta('meta[property="og:image"]', { property: "og:image", content: shareImageUrl });
    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: meta.description,
    });
    ensureMeta('meta[name="twitter:image"]', { name: "twitter:image", content: shareImageUrl });

    ensureLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    let schemaScript = document.head.querySelector('#structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("id", "structured-data");
      schemaScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(buildStructuredData(meta)).replace(/</g, "\\u003c");
  }, [currentMetaKey]);

  useEffect(() => {
    const animatedSelectors = [
      ".hero-content > *",
      ".about-copy",
      ".about-media",
      ".team-header",
      ".team-carousel",
      ".procedures-title",
      ".solution-card",
      ".procedures-button",
      ".specialties-eyebrow",
      ".specialties-title",
      ".specialties-description",
      ".specialty-card",
      ".specialties-button",
      ".faq-title",
      ".faq-item",
      ".faq-button",
      ".testimonials-header",
      ".testimonials-carousel",
      ".testimonial-card",
      ".rehab-hero-content > *",
      ".rehab-story-copy",
      ".rehab-plan-copy",
      ".rehab-plan-media",
      ".rehab-process-header",
      ".rehab-process-card",
      ".rehab-about-copy",
      ".rehab-about-media",
      ".rehab-faq-copy",
    ];

    const revealElements = Array.from(new Set(document.querySelectorAll("[data-reveal], " + animatedSelectors.join(","))));
    const footerElements = Array.from(document.querySelectorAll("[data-footer-reveal], [data-footer-credit-reveal]"));
    const elements = [...revealElements, ...footerElements];

    revealElements.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 65}ms`);
    });

    footerElements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${index * 90}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -12% 0px" },
    );

    let firstFrameId = 0;
    let secondFrameId = 0;

    firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(() => {
        elements.forEach((element) => observer.observe(element));
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
      observer.disconnect();
      revealElements.forEach((element) => {
        element.classList.remove("reveal-item", "is-visible");
        element.style.removeProperty("--reveal-delay");
      });
      footerElements.forEach((element) => {
        element.classList.remove("is-visible");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [currentMetaKey]);

  if (isRehabPage) {
    return <RehabPage />;
  }

  if (isArthrodesisPage) {
    return <ArthrodesisPage />;
  }

  if (isInfiltrationPage) {
    return <InfiltrationsPage />;
  }

  if (isMinimallyInvasivePage) {
    return <MinimallyInvasivePage />;
  }

  return <HomePage />;
}

export default App;
