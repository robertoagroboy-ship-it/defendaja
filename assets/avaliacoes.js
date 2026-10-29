import { a as React } from './gsap-oimCi6AB_v7.js';

const h = React.createElement;

function Stars({ value, example }) {
  return h('div', {
    className: 'dj-review-stars', role: 'img',
    'aria-label': `${example ? 'Nota ilustrativa' : 'Avaliação'}: ${value} de 5 estrelas`,
  }, Array.from({ length: 5 }, (_, index) => h('svg', {
    key: index, viewBox: '0 0 24 24', width: 17, height: 17,
    fill: index < value ? 'currentColor' : 'none', stroke: 'currentColor',
    strokeWidth: 1.5, 'aria-hidden': true,
  }, h('path', { d: 'm12 3 2.78 5.63L21 9.54l-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.93 1.06-6.2L3 9.54l6.22-.91Z' }))));
}

function ReviewCard({ review, index, total }) {
  const example = review.exemplo === true;
  const numericRating = Number(review.nota);
  const rating = Number.isFinite(numericRating) && numericRating > 0
    ? Math.max(1, Math.min(5, Math.round(numericRating))) : null;
  const initials = review.nome.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('');
  const [photoFailed, setPhotoFailed] = React.useState(false);
  return h('li', {
    className: 'dj-review-card',
    'aria-label': `Avaliação ${index + 1} de ${total}${example ? ', exemplo ilustrativo' : ''}`,
  },
    h('div', { className: 'dj-review-top' },
      rating && h(Stars, { value: rating, example }),
      h('span', { className: 'dj-review-quote', 'aria-hidden': true }, '“')),
    h('blockquote', { className: 'dj-review-text' }, h('p', null, review.texto)),
    h('div', { className: 'dj-review-person' },
      h('span', { className: `dj-review-avatar dj-review-avatar-${index % 5}`, 'aria-hidden': true },
        review.foto && !photoFailed ? h('img', {
          src: new URL('../' + review.foto, import.meta.url).href, alt: '',
          width: 72, height: 72, loading: 'lazy', decoding: 'async',
          onError: () => setPhotoFailed(true),
        }) : initials),
      h('div', null,
        h('p', { className: 'dj-review-name' }, review.nome),
        h('p', { className: 'dj-review-detail' }, example ? (review.foto ? 'Foto gerada por IA · Exemplo ilustrativo' : 'Exemplo ilustrativo')
          : [review.ano ? `Atendimento em ${review.ano}` : '', review.foto_ilustrativa ? 'Foto ilustrativa' : ''].filter(Boolean).join(' · ')))),
    review.servico && h('p', { className: 'dj-review-service' },
      h('span', { className: 'dj-review-service-label' }, 'Serviço'), review.servico));
}

export function DjProva() {
  const [reviews, setReviews] = React.useState([]);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [position, setPosition] = React.useState({ index: 0, visible: 1, start: true, end: false });
  const listRef = React.useRef(null);

  React.useEffect(() => {
    const controller = new AbortController();
    fetch(new URL('../depoimentos.json', import.meta.url), { cache: 'no-store', signal: controller.signal })
      .then(response => response.ok ? response.json() : [])
      .then(data => {
        if (Array.isArray(data)) setReviews(data.filter(review => review
          && typeof review.nome === 'string' && review.nome.trim()
          && typeof review.texto === 'string' && review.texto.trim()));
      }).catch(() => {});
    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const update = () => {
      const first = list.firstElementChild;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const step = first.getBoundingClientRect().width + gap;
      const left = Math.max(0, list.scrollLeft);
      const max = Math.max(0, list.scrollWidth - list.clientWidth);
      const next = {
        index: Math.min(reviews.length - 1, Math.round(left / step)),
        visible: Math.max(1, Math.round((list.clientWidth + gap) / step)),
        start: left < 3, end: left >= max - 3,
      };
      setPosition(previous => Object.keys(next).every(key => next[key] === previous[key]) ? previous : next);
    };
    update();
    list.addEventListener('scroll', update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(list);
    return () => { list.removeEventListener('scroll', update); resize.disconnect(); };
  }, [reviews.length]);

  function move(direction) {
    const list = listRef.current;
    if (!list || !list.firstElementChild) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const step = list.firstElementChild.getBoundingClientRect().width + gap;
    const max = Math.max(0, list.scrollWidth - list.clientWidth);
    let target = Math.round(list.scrollLeft / step) * step + direction * step;
    list.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: reducedMotion ? 'instant' : 'smooth' });
  }

  const hasExamples = reviews.some(review => review.exemplo === true);
  const stats = [['+10 mil', 'Clientes atendidos'], ['+23 mil', 'Casos analisados'], ['[ANO]', 'Atuando desde']];
  return h('section', { className: 'dj-prova px-4 py-16 sm:px-6 sm:py-20', 'aria-labelledby': 'prova-titulo' },
    h('div', { className: 'mx-auto max-w-6xl' },
      h('p', { className: 'dj-eyebrow' }, 'Resultados e clientes'),
      h('h2', { id: 'prova-titulo', className: 'text-3xl font-bold sm:text-4xl' },
        'Nossos números ', h('span', { className: 'text-gold' }, 'e nossos clientes')),
      h('ul', { className: 'dj-stats' }, stats.map(([value, label]) => h('li', { key: label, className: 'dj-stat' },
        h('span', { className: 'dj-stat-v' }, value), h('span', { className: 'dj-stat-l' }, label)))),
      reviews.length > 0 && h('div', {
        className: 'dj-reviews', role: 'region',
        'aria-roledescription': 'carrossel', 'aria-labelledby': 'avaliacoes-titulo',
      },
        h('div', { className: 'dj-reviews-heading' },
          h('div', null,
            h('p', { className: 'dj-reviews-eyebrow' }, 'Avaliações de clientes'),
            h('h3', { id: 'avaliacoes-titulo', className: 'dj-reviews-title' },
              'O que dizem sobre', h('span', null, 'o nosso atendimento.'))),
          h('p', { className: 'dj-reviews-intro' }, 'Atenção para ouvir. Clareza para orientar. Cuidado para acompanhar cada etapa.')),
        hasExamples && h('p', { className: 'dj-reviews-notice', id: 'avaliacoes-aviso' },
          h('strong', null, 'Depoimentos ilustrativos. '),
          'Nomes, fotos, textos e notas são exemplos fictícios. Substitua por avaliações reais autorizadas antes de publicar.'),
        h('ul', {
          ref: listRef, className: 'dj-reviews-list', tabIndex: 0,
          'aria-label': 'Lista de avaliações', 'aria-describedby': hasExamples ? 'avaliacoes-aviso' : undefined,
          'aria-live': 'off',
          onKeyDown: event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
            } else if (event.key === 'Home' || event.key === 'End') {
              event.preventDefault();
              event.currentTarget.scrollTo({ left: event.key === 'Home' ? 0 : event.currentTarget.scrollWidth, behavior: reducedMotion ? 'instant' : 'smooth' });
            }
          },
        }, reviews.map((review, index) => h(ReviewCard, { key: `${review.nome}-${index}`, review, index, total: reviews.length }))),
        h('div', { className: 'dj-reviews-footer' },
          reviews.length > 1 && h('div', { className: 'dj-reviews-controls' },
            h('button', { type: 'button', className: 'dj-review-arrow', disabled: position.start, 'aria-label': 'Avaliação anterior', onClick: () => move(-1) },
              h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, 'aria-hidden': true }, h('path', { d: 'm14 6-6 6 6 6' }))),
            h('button', { type: 'button', className: 'dj-review-arrow', disabled: position.end, 'aria-label': 'Próxima avaliação', onClick: () => move(1) },
              h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, 'aria-hidden': true }, h('path', { d: 'm10 6 6 6-6 6' }))))))));
}
