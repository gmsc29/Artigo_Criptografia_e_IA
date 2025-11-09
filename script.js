// Preferências de tema (persistência em localStorage)
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if(saved === 'light' || (!saved && prefersLight)) root.classList.add('light');
  document.getElementById('themeToggle').addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
})();

// Botão imprimir
document.getElementById('printBtn').addEventListener('click', () => window.print());

// Barra de progresso de leitura
const progress = document.getElementById('progress');
const onScroll = () => {
  const h = document.body.scrollHeight - innerHeight;
  const p = Math.max(0, Math.min(1, scrollY / h));
  progress.style.transform = `scaleX(${p})`;
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Sumário automático (TOC) e Scrollspy
const toc = document.getElementById('tocList');
const headings = Array.from(document.querySelectorAll('#conteudo h2'));
headings.forEach(h => {
  const id = h.parentElement.id || h.id;
  const a = document.createElement('a');
  a.href = `#${id}`;
  a.textContent = h.textContent.replace(/\s*#\s*$/, '');
  toc.appendChild(a);
});
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    const id = e.target.id;
    const link = toc.querySelector(`a[href="#${id}"]`);
    if(link){ if(e.isIntersecting) link.classList.add('active'); else link.classList.remove('active'); }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] });
document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));

// Copiar citação (ABNT simples)
document.getElementById('copyCitation').addEventListener('click', async () => {
  const year = new Date().getFullYear();
  const text = `CARVALHO, Gabriel Matheus Soares de. Como a Criptografia Protege Nossos Dados na Era da Inteligência Artificial. ${year}. Disponível em: <página do autor>. Acesso em: ${new Date().toLocaleDateString('pt-BR')}.`;
  try { await navigator.clipboard.writeText(text); alert('Citação copiada! Cole onde precisar.'); } catch { alert('Não foi possível copiar automaticamente.'); }
});

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
