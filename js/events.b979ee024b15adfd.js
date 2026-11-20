(function () {
  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(font);

  const whatsappButton = document.querySelector('[aria-controls="whatsapp-float-card"]');
  const whatsappCard = document.getElementById('whatsapp-float-card');
  if (whatsappButton && whatsappCard) {
    const closeWhatsApp = () => {
      whatsappCard.classList.add('is-hidden');
      whatsappCard.classList.remove('is-open');
      whatsappButton.setAttribute('aria-expanded', 'false');
    };
    const toggleWhatsApp = () => {
      const isOpen = whatsappCard.classList.toggle('is-open');
      whatsappCard.classList.toggle('is-hidden', !isOpen);
      whatsappButton.setAttribute('aria-expanded', String(isOpen));
    };
    closeWhatsApp();
    whatsappButton.addEventListener('click', toggleWhatsApp);
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.fixed.right-4')) closeWhatsApp();
    });
  }

  const revealItems = document.querySelectorAll('[class*="translate-y-6"], .journey > li, article, footer');
  const reveal = (item) => item.classList.add('mb-reveal');
  revealItems.forEach(reveal);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.mb-reveal').forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll('.mb-reveal').forEach((item) => item.classList.add('is-visible'));
  }

  const headlineHighlights = [
    ['O cliente já está pesquisando.', 'O cliente já está <span class="mb-highlight">pesquisando.</span>'],
    ['O que podemos construir para sua empresa', 'O que podemos <span class="mb-highlight">construir para sua empresa</span>'],
    ['O que já construímos', 'O que nós já <span class="mb-highlight">construímos</span>✅'],
    ['Uma solução não precisa ser complicada para ser inteligente.', 'Uma solução não precisa ser <span class="mb-highlight">complicada</span> para ser inteligente.'],
    ['Do problema à solução.', 'Do problema <span class="mb-highlight">à solução.</span>'],
    ['Feito para empresas que querem acompanhar a forma como os negócios funcionam hoje.', 'Feito para empresas que querem acompanhar a forma como os negócios <span class="mb-highlight">funcionam hoje.</span>'],
    ['Sua empresa evoluiu. Sua presença digital também deveria acompanhar.', 'Sua empresa evoluiu. Sua presença digital também <span class="mb-highlight">deveria acompanhar.</span>'],
    ['Tecnologia aplicada ao que realmente importa.', 'Tecnologia aplicada ao que <span class="mb-highlight">realmente importa.</span>']
  ];
  document.querySelectorAll('h2').forEach((headline) => {
    const match = headlineHighlights.find(([plain]) => headline.textContent.trim() === plain);
    if (match && !headline.querySelector('.mb-highlight')) headline.innerHTML = match[1];
  });
  const sectionByHeading = (text, className) => {
    const title = Array.from(document.querySelectorAll('h2')).find((el) => el.textContent.includes(text));
    if (title) title.closest('section')?.classList.add(className);
  };
  sectionByHeading('O cliente já está', 'behavior-section');
  sectionByHeading('Do problema', 'process-section');
  sectionByHeading('Tecnologia aplicada', 'philosophy-section');
  sectionByHeading('O que podemos construir', 'solutions-section');

  const projects = [
    ['01', 'BANDA', 'Banda de música', 'https://bandablacksp.com.br/'],
    ['02', 'CLÍNICA ODONTOLÓGICA', 'Clínica odontológica', 'https://instituto-reabilita.pages.dev/'],
    ['03', 'PANIFICADORA', 'Panificadora', 'https://panificiorealemicom.com.br/'],
    ['04', 'LOJA DE ROUPAS', 'Loja de roupas', 'https://screenshot-to-site-018.lovable.app/'],
    ['05', 'ACADEMIA', 'Academia', 'https://screenshot-to-pixel-perfect-0670.lovable.app/'],
    ['06', 'JOALHERIA', 'Joalheria', 'https://lucianatavaresjoias.com.br/'],
    ['07', 'INFOPRODUTO FITNESS', 'Infoproduto fitness', 'https://cozinha-salada-pratica.lovable.app/']
  ];
  const heading = Array.from(document.querySelectorAll('h2')).find((el) => el.textContent.includes('O que já construímos'));
  const section = heading && heading.closest('section');
  if (!section) return;
  section.classList.add('portfolio-live');
  section.innerHTML = `<div class="container-page"><div class="portfolio-heading"><div><p class="mb-5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground"><span class="inline-block size-2.5 rounded-[3px] bg-neon"></span>Portfólio</p><h2 class="max-w-3xl text-3xl font-bold md:text-4xl">O que nós já <span class="mb-highlight">construímos</span>✅</h2></div><p>Projetos reais que entregamos para negócios diferentes. Escolha um projeto e navegue pela experiência.</p></div><div class="portfolio-swipe-hint" aria-hidden="true"><span>↔</span> Arraste para ver outros projetos</div><div class="portfolio-tabs" role="tablist" aria-label="Projetos do portfólio">${projects.map((project,index)=>`<button class="portfolio-tab${index===0?' is-active':''}" type="button" role="tab" aria-selected="${index===0}" data-project="${index}"><span>${project[0]}</span>${project[1]}</button>`).join('')}</div><div class="portfolio-viewer"><div class="portfolio-viewer-top"><span class="portfolio-status"><i></i> Projeto em funcionamento</span><a class="portfolio-open" href="${projects[0][3]}" target="_blank" rel="noopener">Abrir site completo ↗</a></div><div class="portfolio-frame-wrap"><iframe title="Projeto Black SP" src="${projects[0][3]}" loading="lazy"></iframe><div class="portfolio-fallback">Alguns sites podem bloquear visualização incorporada.<br><a href="${projects[0][3]}" target="_blank" rel="noopener">Abrir este projeto em uma nova aba ↗</a></div></div></div></div>`;
  const centeredTags = new Set(['O comportamento mudou','Estrutura, não ferramenta','Soluções','Portfólio','Como pensamos','Processo','Reconexão','Filosofia']);
  document.querySelectorAll('main p').forEach((paragraph) => {
    if (centeredTags.has(paragraph.textContent.trim())) paragraph.classList.add('mb-section-tag');
  });
  const solutionGradients = [
    'linear-gradient(145deg, #111f3d 0%, #1c4f9a 58%, #284fbb 100%)',
    'linear-gradient(215deg, #10213f 0%, #245a9e 55%, #17316c 100%)',
    'linear-gradient(165deg, #152a55 0%, #234b91 55%, #12244e 100%)',
    'linear-gradient(325deg, #101d3b 0%, #285daa 55%, #1a326e 100%)'
  ];
  document.querySelectorAll('.solutions-section article').forEach((card, index) => {
    card.style.setProperty('background', solutionGradients[index] || solutionGradients[0], 'important');
    card.style.setProperty('color', '#f5f7ff', 'important');
    const icon = card.querySelector('svg');
    if (icon) {
      icon.style.setProperty('color', '#b9ff39', 'important');
      icon.style.setProperty('stroke', '#b9ff39', 'important');
    }
    const iconBox = card.firstElementChild;
    if (iconBox) iconBox.style.setProperty('margin-inline', 'auto', 'important');
  });
  const iframe = section.querySelector('iframe');
  const openLink = section.querySelector('.portfolio-open');
  const fallback = section.querySelector('.portfolio-fallback');
  section.querySelectorAll('.portfolio-tab').forEach((tab) => tab.addEventListener('click', () => {
    const project = projects[Number(tab.dataset.project)];
    section.querySelectorAll('.portfolio-tab').forEach((item) => { item.classList.remove('is-active'); item.setAttribute('aria-selected','false'); });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected','true');
    iframe.src = project[3];
    iframe.title = `Projeto ${project[1]}`;
    openLink.href = project[3];
    fallback.querySelector('a').href = project[3];
  }));

  const directorSection = document.createElement('section');
  directorSection.className = 'director-section bg-navy text-white';
  directorSection.setAttribute('aria-labelledby', 'director-title');
  directorSection.innerHTML = `<div class="container-page"><div class="director-layout"><div class="director-visual"><div class="director-photo-glow"></div><img class="director-photo" src="images/foto-diretor.png" alt="Bruno Quetro, fundador e diretor da Meu Business" loading="lazy"><div class="director-photo-fallback">FOTO DO<br>DIRETOR</div></div><div class="director-copy"><p class="director-eyebrow"><span></span> QUEM ESTÁ POR TRÁS DA MEU BUSINESS</p><h2 id="director-title">Por trás de cada projeto, existe uma visão: <span class="mb-highlight">Bruno Quetro.</span></h2><p class="director-role">Fundador e diretor da Meu Business</p><div class="director-body"><p>Acredito que a tecnologia precisa trabalhar a favor dos negócios, não o contrário.</p><p>Foi com essa visão que criei dentro de 5 anos no mercado digital, sendo especialista em vendas online e criação de estruturas digitais, que nasceu a Meu Business: desenvolver soluções digitais que ajudem empresas a se posicionarem melhor, fortalecerem sua presença na internet e o que mais importa: <strong>VENDER MUITO MAIS!🔥</strong></p><p>À frente da operação, acompanho de perto cada projeto, unindo estratégia, experiência, tecnologia e criatividade para transformar necessidades reais em soluções funcionais.</p><p>Meu compromisso é fazer com que cada projeto tenha um propósito: gerar valor para o negócio que está por trás dele.</p></div></div></div></div>`;
  section.insertAdjacentElement('afterend', directorSection);
  const directorImage = directorSection.querySelector('.director-photo');
  directorImage?.addEventListener('error', () => directorSection.classList.add('is-missing'));
})();
