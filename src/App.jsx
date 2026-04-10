import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, Star, UserCircle2, Diamond, Crown,
  QrCode, Share2, Copy, X, Check,
  Rocket, Code2, Play, PlusSquare, UserPlus, Gift, ChevronDown
} from 'lucide-react';

// ==========================================
// ⚙️ НАСТРОЙКИ КОНТЕНТА (МЕНЯТЬ ТЕКСТ, ФОТО И ССЫЛКИ ТОЛЬКО ЗДЕСЬ!)
// ==========================================
const CONTENT = {
  // 🇷🇺 РУССКИЙ ЯЗЫК
  ru: {
    creator: {
      bgImage: '/bg-creator.jpg',
      avatar: '/avatar-creator.jpg', 
      audioGreeting: '/greeting.mp3', // 🔊 Ссылка на ваш аудиофайл
      badge: 'DESIGN & CODE',
      name1: 'ЕЛЕНА',
      name2: 'СОТНИКОВА',
      role: 'Premium Web',
      status: 'Digital Creator',
      quote1: 'Не просто визитка,',
      quote2: 'а ваш главный цифровой актив...',
      websiteText: 'Подробнее...',
      websiteLink: 'https://nice-app.ru',
      actionText: 'ЗАКАЗАТЬ СВОЙ DIGITAL-МИР',
      actionLink: 'https://t.me/elenlime?text=Елена, привет! Хочу заказать свой digital-мир.',
    },
    leadMagnet: {
      title: 'SECRET OFFER',
      description: 'Скидка 15% на разработку любого тарифа: NANO, PRO или ULTRA. Нажмите кнопку, чтобы перейти в Telegram и забрать скидку.',
      buttonText: 'ЗАБРАТЬ ПРОМОКОД',
      promoCode: 'ELEN-TECH-15%',
      link: 'https://t.me/elenlime?text=Елена, привет! У меня есть промокод ELEN-TECH-15%. Хочу обсудить создание цифровой визитки.',
    },
    easterEgg: {
      title: 'ВЫ НАШЛИ ПАСХАЛКУ! 👑',
      desc: 'Только тсс! Вы раскрыли секрет этого digital-мира. Забирайте ваш персональный промокод на 30%:',
      promo: 'BOSS-30',
      btn: 'ИСПОЛЬЗОВАТЬ СКИДКУ',
      link: 'https://t.me/elenlime?text=Елена, привет! Я нашел пасхалку и хочу использовать промокод BOSS-30!'
    },
    scratch: {
      text: 'Сотри меня'
    },
    contact: {
      phone: '+79995051277',
      email: 'limetut@gmail.com',
      company: 'Premium Web',
      title: 'Digital Creator & Developer',
      website: 'https://nice-app.ru'
    },
    tooltips: {
      pwa: 'Устанавливается в обход App Store',
      ultra: 'Эксклюзивные 3D-эффекты и частицы'
    },
    views: {
      profile: {
        title: 'Моя философия',
        desc: 'Я создаю не просто сайты, а премиальные digital-миры. Ваша цифровая визитка — это статус, который продает ваши услуги еще до того, как вы заговорите. Уникальные анимации, PWA-приложения и 100% WOW-эффект.'
      },
      nano: {
        title: 'Nano визитка',
        desc: 'Элегантный старт для вашего бренда. Идеально выверенная база, стильные анимации, адаптивность и мгновенная загрузка. Один платеж — и она ваша навсегда.'
      },
      pro: {
        title: 'Архитектура Pro',
        desc: 'Premium-шаблон из моей базы с полной адаптацией под вас. Мини-апп в TG/VK + веб-версия (PWA). Поддомен в подарок и запуск «под ключ» всего за 3-5 дней.'
      },
      ultra: {
        title: 'Эксклюзив Ultra',
        desc: 'Уникальный цифровой код вашего бизнеса. Разработка индивидуальной структуры, сложнейшие 3D-сцены, эффекты стекла и частиц. Решение для тех, кто не терпит компромиссов.'
      },
      tech: {
        title: 'Под капотом',
        desc: 'Каждая визитка — это шедевр кода. Работает без VPN, устанавливается на экран телефона как приложение, не требует абонентской платы. Легко делиться через QR или ссылку.'
      },
      reviewsTitle: 'Отзывы',
      reviews: [
        { name: 'Виктория', date: '21.03.2026', text: '"Забыла про конструкторы как про страшный сон. Очень плавно, стильно, вайб передается на 100%"' },
        { name: 'Алексей', date: '20.03.2026', text: '"Дизайн просто космос. Клиенты теперь не хотят уходить из моей мини-апп. Конверсия выросла вдвое!"' },
        { name: 'Мария', date: '01.04.2026', text: '"Елена — мастер своего дела. Все продумано до мелочей: от визуала до анимаций."' }
      ]
    },
    storytelling: {
      stats: [
        { num: 50, suffix: '+', label: 'Реализованных миров' },
        { num: 100, suffix: '%', label: 'Конверсия в восторг' }
      ],
      comparison: {
        title: 'Эволюция статуса',
        before: 'Обычная визитка',
        after: 'Premium Digital-мир'
      },
      timeline: {
        title: 'Путь к результату',
        steps: [
          { title: 'Бриф', desc: 'Глубокая распаковка ваших смыслов и задач.' },
          { title: 'Концепт', desc: 'Разработка уникального премиального визуала.' },
          { title: 'Магия кода', desc: 'Создание интерактивных WOW-анимаций.' },
          { title: 'Запуск', desc: 'Передача готового инструмента вам в руки.' }
        ]
      },
      techStack: {
        title: 'Premium Технологии',
        items: [
          { icon: 'react', name: 'React', desc: 'Молниеносная скорость работы без перезагрузок.' },
          { icon: 'tailwind', name: 'UI / UX', desc: 'Идеальный и дорогой визуал на любых экранах.' },
          { icon: 'lucide', name: 'Анимации', desc: 'Плавность в 60 FPS для WOW-эффекта.' },
          { icon: 'lock', name: 'PWA App', desc: 'Работает без VPN, ставится на экран телефона.' }
        ]
      },
      faq: {
        title: 'Частые вопросы',
        items: [
          { q: 'Нужно ли платить абонентскую плату?', a: 'Нет, вы оплачиваете разработку один раз. Визитка навсегда остается вашей без скрытых платежей.' },
          { q: 'Как установить визитку на телефон?', a: 'Через меню браузера "Поделиться -> На экран Домой". Это занимает ровно 5 секунд.' },
          { q: 'Можно ли менять информацию потом?', a: 'Да, в тарифах Pro и Ultra предусмотрена удобная система обновления данных.' }
        ]
      }
    },
    ui: {
      shareTitle: 'Поделиться визиткой',
      shareDesc: 'Дайте отсканировать QR-код или отправьте ссылку напрямую.',
      shareText: 'Привет! Вот моя визитка с контактами:',
      copy: 'Копировать',
      copied: 'Скопировано!',
      send: 'Отправить',
      installTitle: 'Установить приложение',
      installDesc: 'Добавьте визитку на экран «Домой», чтобы открывать её в один клик без браузера.',
      installStep1_1: 'Нажмите кнопку ',
      installStep1_2: '«Поделиться»',
      installStep1_3: 'в меню браузера (обычно внизу).',
      installStep2_1: 'Выберите ',
      installStep2_2: '«На экран "Домой"»',
      installStep2_3: 'в появившемся списке.',
      done: 'Готово',
      saveContact: 'Сохранено с цифровой визитки'
    }
  },

  // 🇬🇧 АНГЛИЙСКИЙ ЯЗЫК
  en: {
    creator: {
      bgImage: '/bg-creator.jpg',
      avatar: '/avatar-creator.jpg', 
      audioGreeting: '/greeting.mp3', // 🔊 Ссылка на ваш аудиофайл
      badge: 'DESIGN & CODE',
      name1: 'ELENA',
      name2: 'SOTNIKOVA',
      role: 'Premium Web',
      status: 'Digital Creator',
      quote1: 'Not just a business card,',
      quote2: 'but your main digital asset...',
      websiteText: 'Learn more...',
      websiteLink: 'https://nice-app.ru',
      actionText: 'ORDER YOUR DIGITAL WORLD',
      actionLink: 'https://t.me/elenlime?text=Hi Elena! I want to order my digital world.',
    },
    leadMagnet: {
      title: 'SECRET OFFER',
      description: '15% discount on any tariff: NANO, PRO, or ULTRA. Click the button to go to Telegram and claim your discount.',
      buttonText: 'CLAIM PROMO CODE',
      promoCode: 'ELEN-TECH-15%',
      link: 'https://t.me/elenlime?text=Hi Elena! I have the promo code ELEN-TECH-15%. I want to discuss creating a digital business card.',
    },
    easterEgg: {
      title: 'YOU FOUND AN EASTER EGG! 👑',
      desc: 'Hush! You unlocked the secret of this digital world. Grab your personal 30% discount code:',
      promo: 'BOSS-30',
      btn: 'USE DISCOUNT',
      link: 'https://t.me/elenlime?text=Hi Elena! I found the easter egg and want to use the BOSS-30 code!'
    },
    scratch: {
      text: 'Scratch me'
    },
    contact: {
      phone: '+79995051277',
      email: 'limetut@gmail.com',
      company: 'Premium Web',
      title: 'Digital Creator & Developer',
      website: 'https://nice-app.ru'
    },
    tooltips: {
      pwa: 'Installs bypassing App Store',
      ultra: 'Exclusive 3D effects and particles'
    },
    views: {
      profile: {
        title: 'My Philosophy',
        desc: 'I create not just websites, but premium digital worlds. Your digital business card is a status that sells your services before you even speak. Unique animations, PWA apps, and a 100% WOW effect.'
      },
      nano: {
        title: 'Nano Card',
        desc: 'An elegant start for your brand. A perfectly balanced base, stylish animations, responsive design, and instant loading. One payment — and it\'s yours forever.'
      },
      pro: {
        title: 'Architecture Pro',
        desc: 'A premium template from my base fully adapted for you. TG/VK mini-app + web version (PWA). A free subdomain and a turnkey launch in just 3-5 days.'
      },
      ultra: {
        title: 'Exclusive Ultra',
        desc: 'The unique digital code of your business. Custom structure development, complex 3D scenes, glass and particle effects. A solution for those who accept no compromises.'
      },
      tech: {
        title: 'Under the Hood',
        desc: 'Every business card is a masterpiece of code. Works without VPN, installs on your phone screen as an app, requires no subscription fee. Easy to share via QR or link.'
      },
      reviewsTitle: 'Reviews',
      reviews: [
        { name: 'Victoria', date: '21.03.2026', text: '"Forgot about website builders like a bad dream. Very smooth, stylish, the vibe is conveyed 100%"' },
        { name: 'Alexey', date: '20.03.2026', text: '"The design is just cosmic. Clients now don\'t want to leave my mini-app. Conversions have doubled!"' },
        { name: 'Maria', date: '01.04.2026', text: '"Elena is a master of her craft. Everything is thought out to the smallest detail: from visuals to animations."' }
      ]
    },
    storytelling: {
      stats: [
        { num: 50, suffix: '+', label: 'Digital Worlds Created' },
        { num: 100, suffix: '%', label: 'Conversion to Delight' }
      ],
      comparison: {
        title: 'Status Evolution',
        before: 'Standard Card',
        after: 'Premium Digital World'
      },
      timeline: {
        title: 'Path to Result',
        steps: [
          { title: 'Brief', desc: 'Deep unpacking of your meanings and goals.' },
          { title: 'Concept', desc: 'Developing a unique premium visual.' },
          { title: 'Code Magic', desc: 'Creating interactive WOW animations.' },
          { title: 'Launch', desc: 'Handing over the finished tool to you.' }
        ]
      },
      techStack: {
        title: 'Premium Tech',
        items: [
          { icon: 'react', name: 'React', desc: 'Lightning-fast performance.' },
          { icon: 'tailwind', name: 'UI / UX', desc: 'Perfect visuals on any screen.' },
          { icon: 'lucide', name: 'Animations', desc: 'Smooth 60 FPS for WOW effect.' },
          { icon: 'lock', name: 'PWA app', desc: 'Works without VPN, installs on screen.' }
        ]
      },
      faq: {
        title: 'FAQ',
        items: [
          { q: 'Is there a monthly subscription fee?', a: 'No, you pay once for development. The card is yours forever with no hidden fees.' },
          { q: 'How to install the card on a phone?', a: 'Via the browser menu "Share -> Add to Home Screen". It takes exactly 5 seconds.' },
          { q: 'Can I change the information later?', a: 'Yes, Pro and Ultra plans include a convenient data update system.' }
        ]
      }
    },
    ui: {
      shareTitle: 'Share Contact',
      shareDesc: 'Let them scan the QR code or send the link directly.',
      shareText: 'Hi! Here is my digital business card:',
      copy: 'Copy',
      copied: 'Copied!',
      send: 'Send',
      installTitle: 'Install App',
      installDesc: 'Add the business card to your Home Screen for one-click access without a browser.',
      installStep1_1: 'Tap the ',
      installStep1_2: 'Share',
      installStep1_3: ' button in your browser menu (usually at the bottom).',
      installStep2_1: 'Select ',
      installStep2_2: '"Add to Home Screen"',
      installStep2_3: ' from the list.',
      done: 'Done',
      saveContact: 'Saved from digital business card'
    }
  },

  // 📊 АНАЛИТИКА (Общая для всех языков)
  analytics: {
    yandexMetricaId: '108395630', 
  }
};

// --- Глобальные стили для сложных анимаций (вставляем прямо в компонент) ---
const globalStyles = `
  :root {
    --card-h: calc(min(22rem, 50vh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(22rem, 50vh) * 1.5);
    }
  }
  html, body {
    background-color: #000000;
    overscroll-behavior: none;
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overscroll-behavior: contain;
  }
  
  /* Кастомный элегантный скроллбар (Chrome) */
  .custom-scroll::-webkit-scrollbar { width: 4px; }
  .custom-scroll::-webkit-scrollbar-track { background: transparent; }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

  /* Эффект матового стекла Liquid Chrome (Glassmorphism) */
  .glass-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
  }

  /* Анимация переливания жидкого металла */
  @keyframes liquid-chrome {
    0%, 100% { transform: scale(1) translate(0, 0) rotate(0deg); }
    33% { transform: scale(1.1) translate(5%, 5%) rotate(5deg); }
    66% { transform: scale(0.9) translate(-5%, -5%) rotate(-5deg); }
  }

  /* Горизонтальный скролл отзывов */
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  
  /* === ГЛИЧ ЭФФЕКТ ДЛЯ ПАСХАЛКИ === */
  @keyframes glitch-anim {
    0% { transform: translate(0) }
    20% { transform: translate(-8px, 8px) }
    40% { transform: translate(-8px, -8px) }
    60% { transform: translate(8px, 8px) }
    80% { transform: translate(8px, -8px) }
    100% { transform: translate(0) }
  }
  .glitch-active {
    animation: glitch-anim 0.15s infinite;
    filter: hue-rotate(90deg) contrast(200%) invert(20%) saturate(200%);
  }

  @keyframes scroll-left {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll-left 15s linear infinite;
  }
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  /* === АНИМАЦИИ ДЛЯ ЭФФЕКТА СГОРАЮЩЕЙ БУМАГИ === */
  @keyframes burn-mask-reveal {
    0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
    100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
  }
  
  @keyframes burn-fire-scan {
    0% { background-position: 100% 0%; opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { background-position: 0% 100%; opacity: 0; }
  }
  
  .smooth-mask-wipe {
    -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
    mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
    -webkit-mask-size: 300% 300%;
    mask-size: 300% 300%;
    -webkit-mask-position: 100% 0%;
    mask-position: 100% 0%;
    animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    will-change: mask-position, -webkit-mask-position;
  }
  
  .burn-fire-edge {
    background: 
      linear-gradient(224deg, 
        transparent 48.5%, 
        rgba(20, 5, 0, 0.95) 49%, 
        var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, 
        var(--burn-c2, rgba(250, 150, 0, 1)) 50%, 
        var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%,
        transparent 51%
      ),
      linear-gradient(226deg, 
        transparent 48.5%, 
        rgba(20, 5, 0, 0.95) 49%, 
        var(--burn-c1, rgba(220, 38, 38, 0.9)) 49.5%, 
        var(--burn-c2, rgba(250, 150, 0, 1)) 50%, 
        var(--burn-c3, rgba(255, 220, 50, 0.8)) 50.2%,
        transparent 51%
      );
    background-size: 300% 300%;
    background-position: 100% 0%;
    mix-blend-mode: normal;
    filter: drop-shadow(0 0 8px var(--burn-c2, rgba(250, 100, 0, 0.8))) blur(0.5px);
    animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    will-change: background-position, opacity;
  }
  
  /* === АНИМАЦИИ ФОНА === */
  @keyframes esoteric-slow-drift-1 {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes esoteric-slow-drift-2 {
    0%   { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  
  /* === АНИМАЦИЯ ЭКВАЛАЙЗЕРА ДЛЯ АУДИО === */
  @keyframes equalize {
    0%, 100% { height: 4px; }
    50% { height: 16px; }
  }
  .audio-bar {
    width: 3px;
    background-color: #ffffff;
    border-radius: 2px;
    animation: equalize 1s infinite ease-in-out;
  }

  /* === ИНТЕРАКТИВНЫЙ ШЛЕЙФ === */
  @keyframes trail-fade {
    0% { opacity: 0.8; transform: scale(1) translate(-50%, -50%); }
    100% { opacity: 0; transform: scale(0.1) translate(-50%, -50%); }
  }
  .trail-particle {
    position: fixed;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    width: 8px;
    height: 8px;
    animation: trail-fade 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    z-index: 9999;
  }
`;

// ==========================================
// ИНТЕРАКТИВНЫЙ СКРЕТЧ-СЛОЙ (ВАУ ЭФФЕКТ)
// ==========================================
const ScratchCard = ({ children, text }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Создаем серебристую "фольгу"
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#e4e4e7'); // светлый хром
    gradient.addColorStop(0.5, '#71717a'); // темный металл
    gradient.addColorStop(1, '#e4e4e7');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Текст поверх
    ctx.font = 'bold 24px Montserrat, sans-serif';
    ctx.fillStyle = '#18181b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Режим "стирания"
    ctx.globalCompositeOperation = 'destination-out';
  }, [text, isScratched]);

  const handlePointerDown = (e) => { isDrawing.current = true; scratch(e); };
  const handlePointerUp = () => { isDrawing.current = false; checkScratched(); };
  const handlePointerMove = (e) => {
    if (e.cancelable) e.preventDefault(); // Блокируем скролл во время стирания
    if (isDrawing.current) scratch(e);
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clearPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) clearPixels++;
    }
    // Если стерто больше 40%, открываем полностью
    if (clearPixels / (canvas.width * canvas.height) > 0.4) {
      setIsScratched(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([30, 30]);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden select-none">
      {children}
      {!isScratched && (
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none z-50 transition-opacity duration-1000"
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onTouchMove={handlePointerMove}
        />
      )}
    </div>
  );
};

// ==========================================
// МАГНИТНАЯ КНОПКА (ВАУ ЭФФЕКТ)
// ==========================================
const MagneticWrapper = ({ children, className, onClick }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.3; // Сила притяжения
    const y = (e.clientY - (top + height / 2)) * 0.3;
    setPos({ x, y });
  };
  return (
    <div 
      className={className} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => setPos({x: 0, y: 0})} 
      onClick={onClick}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.15s ease-out' }}
    >
       {children}
    </div>
  );
};

// ==========================================
// ПУЛЬСИРУЮЩИЙ ТУЛТИП (ВАУ ЭФФЕКТ)
// ==========================================
const TooltipDot = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
      <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl text-[10px] text-white z-50 animate-in fade-in zoom-in shadow-2xl text-center">
          {text}
        </div>
      )}
    </div>
  );
};

// ==========================================
// ЭФФЕКТ ПЕЧАТАЮЩЕЙСЯ МАШИНКИ (ВАУ ЭФФЕКТ)
// ==========================================
const TypewriterHeader = ({ text, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ob = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); ob.disconnect(); }
    });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    if (isVisible) {
      const int = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(int);
      }, 30);
      return () => clearInterval(int);
    }
  }, [isVisible, text]);

  return (
    <h3 ref={ref} className={className}>
      {displayedText}
      <span className="animate-pulse font-light text-white opacity-60">|</span>
    </h3>
  );
};

// ==========================================
// 🪄 КОМПОНЕНТ ЭФФЕКТА СГОРАНИЯ
// ==========================================
const HACKER_CHARS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

const BurnRevealImage = ({ src, className, style, imgClassName = "", burnColor = "chrome", startBurn = true }) => {
  const themes = {
    default: { c1: 'rgba(220, 38, 38, 0.9)', c2: 'rgba(250, 150, 0, 1)', c3: 'rgba(255, 220, 50, 0.8)' },
    wine: { c1: 'rgba(88, 11, 37, 0.9)', c2: 'rgba(159, 18, 57, 1)', c3: 'rgba(225, 29, 72, 0.8)' },
    chrome: { c1: 'rgba(100, 100, 100, 0.9)', c2: 'rgba(200, 200, 200, 1)', c3: 'rgba(255, 255, 255, 0.9)' } 
  };
  const t = themes[burnColor] || themes.chrome;

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      <div 
        className={`absolute inset-0 bg-cover bg-center rounded-[2.5rem] ${imgClassName} ${startBurn ? 'smooth-mask-wipe' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      {startBurn && (
        <div 
          className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
          style={{ '--burn-c1': t.c1, '--burn-c2': t.c2, '--burn-c3': t.c3 }}
        />
      )}
    </div>
  );
};

// ==========================================
// СТОРИТЕЛЛИНГ БЛОКИ (НОВЫЕ КОМПОНЕНТЫ)
// ==========================================

const AnimatedCounter = ({ end, suffix, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = end / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="glass-card flex flex-col items-center justify-center p-5 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)]"></div>
      <span className="text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-white font-bold tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10">
        {count}{suffix}
      </span>
      <span className="text-[9px] text-zinc-400 uppercase tracking-widest mt-2 text-center font-medium leading-relaxed relative z-10">
        {label}
      </span>
    </div>
  );
};

const BeforeAfterSlider = ({ texts }) => {
  const [sliderVal, setSliderVal] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setSliderVal(percent);
  };

  return (
    <div 
      ref={containerRef}
      className="glass-card relative w-full h-32 sm:h-40 rounded-2xl overflow-hidden select-none touch-none"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-10 border border-white/10 rounded mb-2 opacity-30"></div>
        <span className="text-zinc-500 font-serif text-sm tracking-widest">{texts.before}</span>
      </div>
      
      <div 
        className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex flex-col items-center justify-center border-r border-white/30 shadow-[2px_0_20px_rgba(255,255,255,0.15)]"
        style={{ clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_60%)]"></div>
        <Crown className="w-6 h-6 text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <span className="text-white font-serif text-sm tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] relative z-10">{texts.after}</span>
      </div>
      
      <input 
        type="range" min="0" max="100" value={sliderVal} 
        onChange={(e)=>setSliderVal(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
      
      <div className="absolute top-0 bottom-0 w-[1.5px] bg-white/80 pointer-events-none z-10" style={{ left: `${sliderVal}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-black border border-white/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)]">
           <div className="flex gap-0.5">
             <div className="w-[1.5px] h-3 bg-zinc-300 rounded-full"></div>
             <div className="w-[1.5px] h-3 bg-zinc-300 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ProcessTimeline = ({ steps }) => {
  return (
    <div className="flex flex-col gap-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-white/50 before:via-white/10 before:to-transparent">
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-5 relative group animate-in slide-in-from-bottom-4 duration-700 fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
          <div className="w-10 h-10 rounded-full bg-black/80 border border-white/20 group-hover:border-white/80 flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500">
            <span className="text-zinc-400 font-serif text-sm font-bold group-hover:text-white transition-colors">{idx + 1}</span>
          </div>
          <div className="pt-1.5 pb-2">
            <h4 className="text-white font-bold text-[12px] tracking-widest uppercase mb-1.5">{step.title}</h4>
            <p className="text-zinc-400 text-[10px] leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const TechStack = ({ items, pwaTooltipText }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const ICONS = { react: Code2, tailwind: Diamond, lucide: Star, lock: Crown };
  
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, idx) => {
        const Icon = ICONS[item.icon] || Code2;
        const isActive = activeIndex === idx;
        const isPWA = item.icon === 'lock';

        return (
          <div 
            key={idx} 
            onMouseEnter={() => setActiveIndex(idx)}
            onMouseLeave={() => setActiveIndex(null)}
            onClick={() => setActiveIndex(isActive ? null : idx)}
            className={`glass-card p-4 rounded-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center relative ${isActive ? 'bg-white/[0.05] border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-105 z-10' : 'hover:border-white/30 hover:bg-white/[0.02] z-0'}`}
          >
            <div className="flex items-center justify-center mb-2">
              <Icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-zinc-500'}`} />
              {isPWA && <TooltipDot text={pwaTooltipText} />}
            </div>
            <h4 className="text-white text-[11px] font-bold tracking-wider mb-1">{item.name}</h4>
            <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-24 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
              <p className="text-zinc-400 text-[9px] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FAQAccordion = ({ items }) => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className={`glass-card transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'bg-white/[0.03] border-white/20' : ''}`}>
            <button 
              onClick={() => setOpenIdx(isOpen ? null : idx)} 
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <span className={`text-[11px] font-medium tracking-wide pr-4 transition-colors ${isOpen ? 'text-white' : 'text-zinc-400'}`}>{item.q}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white/10' : 'bg-white/5'}`}>
                <ChevronDown className={`w-3 h-3 ${isOpen ? 'text-white' : 'text-zinc-500'}`} />
              </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="px-4 pb-4 text-[10px] text-zinc-400 leading-relaxed border-t border-white/10 pt-3 mt-1">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ==========================================
// ОСНОВНАЯ КАРТОЧКА С ЛЕНДИНГОМ
// ==========================================
const CreatorCard = ({ lang, isOpen, onClose, onEasterEgg }) => {
  const [isNameRevealed, setIsNameRevealed] = useState(false);
  const [hackerName1, setHackerName1] = useState(() => CONTENT[lang].creator.name1.replace(/./g, () => HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)]));
  const [hackerName2, setHackerName2] = useState(() => CONTENT[lang].creator.name2.replace(/./g, () => HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)]));
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isUltraVisible, setIsUltraVisible] = useState(false);
  const [crownClicks, setCrownClicks] = useState(0);
  
  const scrollContainerRef = useRef(null);
  const ultraRef = useRef(null);

  useEffect(() => {
    let iteration = 0;
    const target1 = CONTENT[lang].creator.name1;
    const target2 = CONTENT[lang].creator.name2;
    const maxLen = Math.max(target1.length, target2.length);
    setIsNameRevealed(false);
    const intervalMs = 40;
    const totalSteps = 1000 / intervalMs; 
    const step = maxLen / totalSteps;

    const interval = setInterval(() => {
      setHackerName1(target1.split("").map((letter, index) => {
        if (index < iteration) return target1[index];
        return HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)];
      }).join(""));

      setHackerName2(target2.split("").map((letter, index) => {
        if (index < iteration) return target2[index];
        return HACKER_CHARS[Math.floor(Math.random() * HACKER_CHARS.length)];
      }).join(""));

      if (iteration >= maxLen) {
        clearInterval(interval);
        setIsNameRevealed(true);
      }
      iteration += step;
    }, intervalMs);

    return () => clearInterval(interval);
  }, [lang]);

  // Логика скролла (Прогресс-бар и Параллакс)
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
    e.target.style.setProperty('--scroll-y', `${scrollTop}px`);
  };

  // Смена цвета при доходе до ULTRA
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsUltraVisible(entry.isIntersecting);
    }, { threshold: 0.5 });
    if (ultraRef.current) observer.observe(ultraRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePromoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = CONTENT[lang].leadMagnet.link;
  };

  // ПАСХАЛКА
  const handleCrownClick = (e) => {
    e.stopPropagation();
    const newClicks = crownClicks + 1;
    setCrownClicks(newClicks);
    if (newClicks >= 3) {
      setCrownClicks(0);
      if (onEasterEgg) onEasterEgg();
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. ЗАКРЫТОЕ СОСТОЯНИЕ (ЛИЦЕВАЯ СТОРОНА) - LIQUID CHROME */}
      {/* ========================================================================= */}
      <div className={`absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.05)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(255,255,255,0.1)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100 scale-100'}`}>
        
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950"></div>
        <div className="absolute -inset-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/20 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-600/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/80 via-[15%] to-transparent to-[30%] pointer-events-none z-0 rounded-[2.5rem]"></div>

        <BurnRevealImage src={CONTENT[lang].creator.bgImage} className="grayscale-[0.3]" burnColor="chrome" startBurn={isNameRevealed} />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div onClick={handleCrownClick} className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 cursor-pointer active:scale-95 transition-transform">
              <Crown className="w-4 h-4 text-white" />
              <span className="text-xs font-serif tracking-widest uppercase text-white/90">{CONTENT[lang].creator.badge}</span>
            </div>
            <Code2 className="w-8 h-8 text-zinc-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
          </div>

          <div className="text-center pb-2">
            <h2 className="text-3xl sm:text-4xl leading-tight font-serif font-light mb-2 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-white to-zinc-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {hackerName1}
              <br />
              {hackerName2}
            </h2>
            <div className="flex flex-col items-center gap-3 mt-3">
              <p className="font-serif text-[11px] text-zinc-300 italic tracking-wider max-w-[80%] mx-auto">
                "{CONTENT[lang].creator.quote1} {CONTENT[lang].creator.quote2}"
              </p>
              <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-100">{CONTENT[lang].creator.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ОТКРЫТОЕ СОСТОЯНИЕ (СКРОЛЛ-ЛЕНДИНГ) - LIQUID CHROME */}
      {/* ========================================================================= */}
      <div className={`absolute inset-0 w-full h-full rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col text-white transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isUltraVisible ? 'bg-zinc-950 border-white/40' : 'bg-black border-white/10'} border ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        
        {/* ПРОГРЕСС БАР СВЕРХУ */}
        <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-zinc-600 via-zinc-300 to-white z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>

        {/* ФОН (Медленные орбиты и Аура) */}
        <div className="absolute -top-[20%] -left-[20%] w-[160%] aspect-square rounded-full border border-white/5 border-dashed pointer-events-none transition-colors duration-1000" style={{ animation: 'esoteric-slow-drift-1 90s linear infinite', transformOrigin: '45% 55%', borderColor: isUltraVisible ? 'rgba(255,255,255,0.2)' : '' }}></div>
        <div className="absolute -bottom-[30%] -right-[30%] w-[140%] aspect-square rounded-full border-[1.5px] border-white/5 pointer-events-none transition-colors duration-1000" style={{ animation: 'esoteric-slow-drift-2 100s linear infinite', transformOrigin: '55% 45%', borderColor: isUltraVisible ? 'rgba(255,255,255,0.1)' : '' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full blur-[50px] pointer-events-none transition-colors duration-1000 ${isUltraVisible ? 'bg-white/10' : 'bg-white/5'}`}></div>

        {/* === ПЛАВАЮЩАЯ ШАПКА === */}
        <div className={`shrink-0 pt-8 pb-4 px-6 flex justify-between items-center relative z-20 transition-colors duration-1000 ${isUltraVisible ? 'bg-gradient-to-b from-zinc-950 to-transparent' : 'bg-gradient-to-b from-black to-transparent'}`}>
          <div className="flex items-center gap-3">
            <div className="glass-card px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              <Crown className={`w-3.5 h-3.5 transition-colors duration-1000 ${isUltraVisible ? 'text-white' : 'text-zinc-300'}`} />
              <span className="text-[10px] font-serif tracking-widest uppercase text-white/90">{CONTENT[lang].creator.badge}</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* === СКРОЛЛ-КОНТЕНТ === */}
        <div 
          className="flex-1 overflow-y-auto custom-scroll px-6 pb-28 relative z-10 flex flex-col gap-10"
          onScroll={handleScroll}
          ref={scrollContainerRef}
        >
          {/* ПАРАЛЛАКС ЗАГОЛОВОК НА ФОНЕ */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-[20vw] font-black text-white/[0.03] pointer-events-none z-0 select-none tracking-tighter" style={{ transform: 'translate(-50%, calc(var(--scroll-y, 0px) * 0.4))' }}>
            PREMIUM
          </div>
          
          {/* 1. ФИЛОСОФИЯ */}
          <div className="flex flex-col items-center text-center mt-2 animate-in slide-in-from-bottom-4 duration-700 fade-in delay-100 relative z-10">
            <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <UserCircle2 className="w-6 h-6 text-white" />
            </div>
            <TypewriterHeader text={CONTENT[lang].views.profile.title} className="text-2xl font-serif font-light text-white/90 tracking-wider mb-4" />
            <p className="font-serif text-[12px] text-zinc-300 leading-relaxed glass-card p-5 rounded-2xl w-full mb-5">
              {CONTENT[lang].views.profile.desc}
            </p>
            <MagneticWrapper onClick={() => window.open(CONTENT[lang].creator.websiteLink, '_blank')} className="cursor-pointer">
              <div className="bg-white/5 border border-white/10 hover:border-white/20 text-white/90 text-[10px] uppercase tracking-[0.2em] py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
                <Globe className="w-4 h-4 text-white group-hover:animate-pulse" />
                {CONTENT[lang].creator.websiteText}
              </div>
            </MagneticWrapper>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* БЛОК: СТАТИСТИКА (Счетчики) */}
          <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-700 fade-in delay-200 relative z-10">
            {CONTENT[lang].storytelling.stats.map((stat, idx) => (
              <AnimatedCounter key={idx} end={stat.num} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* БЛОК: СРАВНЕНИЕ (Было/Стало) */}
          <div className="flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-700 fade-in delay-200 relative z-10">
            <TypewriterHeader text={CONTENT[lang].storytelling.comparison.title} className="text-xl font-serif font-light text-white/90 tracking-wider mb-6" />
            <BeforeAfterSlider texts={CONTENT[lang].storytelling.comparison} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* БЛОК: ПУТЬ КЛИЕНТА (Таймлайн) */}
          <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-700 fade-in delay-200 relative z-10">
            <TypewriterHeader text={CONTENT[lang].storytelling.timeline.title} className="text-xl font-serif font-light text-white/90 tracking-wider mb-6 text-center" />
            <ProcessTimeline steps={CONTENT[lang].storytelling.timeline.steps} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* 2. ТАРИФЫ */}
          <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-700 fade-in delay-[300ms] relative z-10">
            {/* Nano */}
            <div className="glass-card p-5 rounded-2xl flex flex-col transition-all hover:bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  <Diamond className="w-4 h-4 text-zinc-400" />
                </div>
                <h3 className="text-lg font-serif font-light text-white/90 tracking-wider">{CONTENT[lang].views.nano.title}</h3>
              </div>
              <p className="font-serif text-[11px] text-zinc-400 leading-relaxed pl-11">{CONTENT[lang].views.nano.desc}</p>
            </div>
            
            {/* Pro */}
            <div className="glass-card p-5 rounded-2xl flex flex-col transition-all hover:bg-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  <Rocket className="w-4 h-4 text-zinc-400" />
                </div>
                <h3 className="text-lg font-serif font-light text-white/90 tracking-wider">{CONTENT[lang].views.pro.title}</h3>
              </div>
              <p className="font-serif text-[11px] text-zinc-400 leading-relaxed pl-11">{CONTENT[lang].views.pro.desc}</p>
            </div>
            
            {/* Ultra (Триггер смены цвета) */}
            <div ref={ultraRef} className="p-1 rounded-2xl bg-gradient-to-r from-zinc-500/40 via-white/60 to-zinc-500/40 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <div className="bg-zinc-950/90 backdrop-blur-xl p-5 rounded-xl border border-white/20 flex flex-col transition-all hover:bg-black">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-serif font-light text-white tracking-wider">{CONTENT[lang].views.ultra.title}</h3>
                    <TooltipDot text={CONTENT[lang].tooltips.ultra} />
                  </div>
                </div>
                <p className="font-serif text-[11px] text-zinc-300 leading-relaxed pl-11">{CONTENT[lang].views.ultra.desc}</p>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* 3. ТЕХНОЛОГИИ */}
          <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-700 fade-in delay-[400ms] relative z-10">
            <TypewriterHeader text={CONTENT[lang].storytelling.techStack.title} className="text-xl font-serif font-light text-white/90 tracking-wider mb-6 text-center" />
            <TechStack items={CONTENT[lang].storytelling.techStack.items} pwaTooltipText={CONTENT[lang].tooltips.pwa} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* БЛОК: FAQ (Аккордеон) */}
          <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-700 fade-in delay-[500ms] relative z-10">
            <TypewriterHeader text={CONTENT[lang].storytelling.faq.title} className="text-xl font-serif font-light text-white/90 tracking-wider mb-6 text-center" />
            <FAQAccordion items={CONTENT[lang].storytelling.faq.items} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* 4. ЛИД-МАГНИТ С ИНТЕРАКТИВНЫМ СКРЕТЧ-СЛОЕМ */}
          <div className="flex flex-col items-center text-center animate-in slide-in-from-bottom-4 duration-700 fade-in delay-[600ms] relative z-10">
            <div className="w-14 h-14 rounded-full glass-card flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              <Gift className="w-7 h-7 text-white animate-bounce" />
            </div>
            <TypewriterHeader text={CONTENT[lang].leadMagnet.title} className="text-2xl font-serif font-light text-white/90 tracking-wider mb-3" />
            
            <ScratchCard text={CONTENT[lang].scratch.text}>
              <div className="glass-card p-5 w-full flex flex-col items-center">
                <p className="font-serif text-[12px] text-zinc-300 leading-relaxed w-full mb-6">
                  {CONTENT[lang].leadMagnet.description}
                </p>
                <MagneticWrapper onClick={handlePromoClick} className="w-full max-w-[280px] cursor-pointer">
                  <div className="bg-gradient-to-r from-zinc-200 to-white hover:from-white hover:to-zinc-100 text-black text-[11px] font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white group active:scale-95">
                    <Crown className="w-4 h-4 mr-2 text-zinc-800 group-hover:scale-110 transition-transform" />
                    {CONTENT[lang].leadMagnet.buttonText}
                  </div>
                </MagneticWrapper>
              </div>
            </ScratchCard>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10"></div>

          {/* 5. ОТЗЫВЫ (БЕСКОНЕЧНЫЙ ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ) */}
          <div className="flex flex-col animate-in slide-in-from-bottom-4 duration-700 fade-in delay-[700ms] relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6 shrink-0">
              <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Star className="w-5 h-5 text-white" />
              </div>
              <TypewriterHeader text={CONTENT[lang].views.reviewsTitle} className="text-2xl font-serif font-light text-white/90 tracking-wider" />
            </div>
            
            <div className="overflow-hidden w-full relative pb-4">
              <div className="flex w-max animate-marquee space-x-4 hover:[animation-play-state:paused]">
                {[...CONTENT[lang].views.reviews, ...CONTENT[lang].views.reviews].map((review, idx) => (
                  <div key={idx} className="glass-card p-5 rounded-2xl w-[280px] shrink-0 whitespace-normal shadow-lg cursor-grab active:cursor-grabbing">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-white/90 font-medium">{review.name}</span>
                        {review.date && <span className="text-[10px] text-white/50">{review.date}</span>}
                      </div>
                      <div className="flex gap-1">
                        <Star className="w-3 h-3 fill-white text-white" />
                        <Star className="w-3 h-3 fill-white text-white" />
                        <Star className="w-3 h-3 fill-white text-white" />
                        <Star className="w-3 h-3 fill-white text-white" />
                        <Star className="w-3 h-3 fill-white text-white" />
                      </div>
                    </div>
                    <p className="font-serif text-[12px] text-zinc-300 leading-relaxed italic">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
              {/* Тени по краям для красоты */}
              <div className={`absolute top-0 bottom-0 left-0 w-8 transition-colors duration-1000 z-10 pointer-events-none ${isUltraVisible ? 'bg-gradient-to-r from-zinc-950 to-transparent' : 'bg-gradient-to-r from-black to-transparent'}`}></div>
              <div className={`absolute top-0 bottom-0 right-0 w-8 transition-colors duration-1000 z-10 pointer-events-none ${isUltraVisible ? 'bg-gradient-to-l from-zinc-950 to-transparent' : 'bg-gradient-to-l from-black to-transparent'}`}></div>
            </div>
            
            {/* ФИКСИРОВАННАЯ КНОПКА (В самом конце скролла) */}
            <div className="flex flex-col items-center mt-6">
              <MagneticWrapper onClick={() => window.location.href = CONTENT[lang].creator.actionLink} className="w-full cursor-pointer">
                <div className="w-full glass-card text-white font-serif text-[11px] sm:text-[12px] uppercase tracking-[0.15em] py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all shadow-[0_0_25px_rgba(255,255,255,0.1)] border border-white/20 group active:scale-95">
                  <Crown className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  {CONTENT[lang].creator.actionText} →
                </div>
              </MagneticWrapper>
            </div>
          </div>
        </div>

        {/* Плавное затемнение сверху и снизу для красивого скролла */}
        <div className={`absolute bottom-0 left-0 w-full h-12 transition-colors duration-1000 z-10 pointer-events-none ${isUltraVisible ? 'bg-gradient-to-t from-zinc-950 to-transparent' : 'bg-gradient-to-t from-black to-transparent'}`}></div>
      </div>
    </>
  );
};

// ==========================================
// ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
// ==========================================

const App = () => {
  const [lang, setLang] = useState('ru'); // Состояние текущего языка
  const [isOpen, setIsOpen] = useState(false); // Новое состояние: открыт ли лендинг
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false); // Состояние для модального окна
  const [showPwaPrompt, setShowPwaPrompt] = useState(false); // Состояние для iOS плашки PWA
  const [copied, setCopied] = useState(false);       // Состояние для копирования ссылки
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Состояние аудио
  const [trail, setTrail] = useState([]); // Состояние для искристого шлейфа
  const [audioScale, setAudioScale] = useState(1); // Состояние масштаба от аудио-эквалайзера
  
  // Easter Egg States
  const [isGlitching, setIsGlitching] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null); // Реф для аудио контекста
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const reqRef = useRef(null);
  const audioRef = useRef(null); // Надежный реф для HTML5 аудио
  const isFlippingRef = useRef(false); // Реф для блокировки наклона во время открытия

  // Инициализация Яндекс.Метрики
  useEffect(() => {
    const ymId = CONTENT.analytics.yandexMetricaId;
    if (!ymId) return;

    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym(ymId, "init", {
         clickmap:true,
         trackLinks:true,
         accurateTrackBounce:true,
         webvisor:true
    });
  }, []);

  const toggleGreetingAudio = (e) => {
    e.stopPropagation(); 
    
    const audio = audioRef.current;
    if (!audio) return;
    
    if (audio.paused) {
      audio.volume = 1.0;
      audio.muted = false;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
           // Подключаем Web Audio API для эквалайзера фона
           if (!audioCtxRef.current) {
             const AudioContext = window.AudioContext || window.webkitAudioContext;
             audioCtxRef.current = new AudioContext();
           }
           if (audioCtxRef.current.state === 'suspended') {
             audioCtxRef.current.resume();
           }
           if (!analyserRef.current) {
             analyserRef.current = audioCtxRef.current.createAnalyser();
             analyserRef.current.fftSize = 256;
           }
           if (!sourceRef.current) {
             try {
               sourceRef.current = audioCtxRef.current.createMediaElementSource(audio);
               sourceRef.current.connect(analyserRef.current);
               analyserRef.current.connect(audioCtxRef.current.destination);
             } catch(e) { console.warn("Audio Context init blocked"); }
           }
        }).catch(err => {
          console.warn("Safari blocked play, applying fallback:", err);
          audio.load();
          audio.play().catch(e => console.error("Fatal audio error:", e));
        });
      }
    } else {
      audio.pause();
    }
  };

  // Эквалайзер (Пульсация фона под голос)
  useEffect(() => {
    const updatePulse = () => {
      if (!analyserRef.current || !isAudioPlaying) return;
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      // Считаем среднюю громкость частот
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const scale = 1 + (avg / 255) * 0.3; // Увеличиваем сферы до 30%
      setAudioScale(scale);
      reqRef.current = requestAnimationFrame(updatePulse);
    };

    if (isAudioPlaying) {
      updatePulse();
    } else {
      setAudioScale(1);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    }
    return () => { if (reqRef.current) cancelAnimationFrame(reqRef.current); };
  }, [isAudioPlaying]);

  // Глобальный параллакс фона (Живые сферы Chrome)
  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  // Динамическая генерация PWA manifest.json
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const manifest = {
        name: `${CONTENT[lang].creator.name1} ${CONTENT[lang].creator.name2} | ${CONTENT[lang].creator.role}`,
        short_name: "Визитка",
        start_url: window.location.pathname,
        display: "standalone",
        background_color: "#000000",
        theme_color: "#ffffff",
        icons: [{
          src: CONTENT[lang].creator.avatar || "https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=PWA",
          sizes: "192x192",
          type: "image/png"
        }]
      };
      const stringManifest = JSON.stringify(manifest);
      const blob = new Blob([stringManifest], { type: 'application/json' });
      const manifestURL = URL.createObjectURL(blob);
      let link = document.querySelector('link[rel="manifest"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'manifest';
        document.head.appendChild(link);
      }
      link.href = manifestURL;
    }
  }, [lang]);

  // Магнитный 3D наклон за курсором/пальцем (Работает только когда карточка закрыта)
  const handlePointerMove = (e) => {
    if (isOpen || isFlippingRef.current || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current || isOpen) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  // ПАСХАЛКА - Активация
  const triggerEasterEgg = () => {
    setIsGlitching(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 50, 100]);
    setTimeout(() => {
      setIsGlitching(false);
      setShowEasterEgg(true);
    }, 800);
  };

  // КИНЕМАТОГРАФИЧЕСКОЕ ОТКРЫТИЕ
  const handleOpen = () => {
    if (isOpen || isGlitching) return;
    
    playFlipSound();
    isFlippingRef.current = true;
    
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    setTimeout(() => { isFlippingRef.current = false; }, 1000);

    const newSparks = Array.from({ length: 35 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
      const distance = 80 + Math.random() * 100;
      return {
        id: Date.now() + i,
        tx: Math.cos(angle) * distance + 'px',
        ty: Math.sin(angle) * distance + 'px',
        wx1: (Math.random() - 0.5) * 100 + 'px',
        wy1: (Math.random() - 0.5) * 100 + 'px',
        wx2: (Math.random() - 0.5) * 200 + 'px',
        wy2: (Math.random() - 0.5) * 200 + 'px',
        wx3: (Math.random() - 0.5) * 300 + 'px',
        wy3: (Math.random() - 0.5) * 300 + 'px',
        wt: (20 + Math.random() * 20) + 's',
        size: Math.random() * 2.5 + 1.5 + 'px',
      };
    });
    setSparks(newSparks);

    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([30, 30, 40]); 
    setIsOpen(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
    setSparks([]); 
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20); 
  };

  const getGlowColor = () => 'rgba(255,255,255,0.2)';
  const getModalTheme = () => ({ bg: 'rgba(25,25,25,0.4)', border: 'rgba(255,255,255,0.15)', icon: 'text-white' });

  // Функции для шаринга
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: CONTENT[lang].ui.shareTitle,
          text: CONTENT[lang].ui.shareText,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const getBase64Image = async (imgUrl) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); 
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return null;
    }
  };

  const handleDownloadVCard = async () => {
    let photoBase64 = null;
    let photoStr = "";
    const photoUrl = '/bg-creator.jpg';
    
    try {
      photoBase64 = await getBase64Image(photoUrl);
      if (photoBase64) {
        const foldedBase64 = photoBase64.match(/.{1,75}/g).join('\r\n ');
        photoStr = `PHOTO;TYPE=JPEG;ENCODING=b:\r\n ${foldedBase64}`;
      }
    } catch (e) {}

    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${CONTENT[lang].creator.name1} ${CONTENT[lang].creator.name2}`,
      `N:${CONTENT[lang].creator.name2};${CONTENT[lang].creator.name1};;;`,
      `ORG:${CONTENT[lang].contact.company}`,
      `TITLE:${CONTENT[lang].contact.title}`,
      `TEL;TYPE=CELL:${CONTENT[lang].contact.phone}`,
      `EMAIL;TYPE=WORK:${CONTENT[lang].contact.email}`,
      `URL:${CONTENT[lang].contact.website}`,
      photoStr,
      `NOTE:${CONTENT[lang].ui.saveContact}`,
      "END:VCARD"
    ].filter(Boolean).join("\r\n"); 

    const fileName = `${CONTENT[lang].creator.name1}_${CONTENT[lang].creator.name2}.vcf`;
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const isTelegram = /Telegram/i.test(navigator.userAgent || navigator.vendor || window.opera);

    if (isIOS && isTelegram) {
      window.location.href = 'data:text/vcard;charset=utf-8,' + encodeURIComponent(vcard);
      return;
    }

    const mimeType = isAndroid ? 'text/x-vcard;charset=utf-8' : 'text/vcard;charset=utf-8';
    const blob = new Blob([vcard], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    if (!isAndroid) {
      link.setAttribute('download', fileName);
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => window.URL.revokeObjectURL(url), 500);
  };

  return (
    <div className={`fixed inset-0 w-full h-full bg-neutral-950 flex flex-col font-sans select-none transition-all duration-500 overflow-hidden justify-center items-center p-4 sm:p-8 ${isGlitching ? 'glitch-active' : ''}`}>
      <style>{globalStyles}</style>

      {/* Интерактивный шлейф */}
      {trail.map(p => (
        <div key={p.id} className="trail-particle" style={{ left: p.x, top: p.y }} />
      ))}

      {/* Фоновое свечение приложения - Имитация жидкого металла, ПУЛЬСИРУЕТ ОТ АУДИО */}
      <div className="absolute top-0 left-0 w-[150%] aspect-square rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_50%)] blur-[60px] mix-blend-screen pointer-events-none" style={{ animation: 'liquid-chrome 20s ease-in-out infinite alternate', transform: `scale(${audioScale})`, transition: 'transform 0.1s linear' }}></div>
      <div 
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-zinc-500/10 rounded-full blur-[120px] pointer-events-none ease-out"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px) scale(${audioScale})`, transition: 'transform 0.1s linear' }}
      ></div>
      <div 
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none ease-out"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px) scale(${audioScale})`, transition: 'transform 0.1s linear' }}
      ></div>

      {/* КОНТЕЙНЕР ВИЗИТКИ (Адаптивный размер в зависимости от isOpen) */}
      <div className="w-full flex justify-center relative z-40 items-center">
        <div 
          ref={cardRef}
          className={`relative z-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'w-full h-full sm:max-w-[480px] sm:h-[90vh] sm:rounded-[2.5rem]' : 'w-full aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none'}`}
          style={{ 
            perspective: '1500px', 
            maxWidth: isOpen ? '100%' : 'min(22rem, 85vw, 55vh)',
            transform: isOpen ? 'translateY(0) scale(1) rotateX(0) rotateY(0)' : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
          }}
          onClick={!isOpen ? handleOpen : undefined}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {/* Искры (Magic Dust - Chrome) */}
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx, '--ty': spark.ty, '--wx1': spark.wx1, '--wy1': spark.wy1,
                '--wx2': spark.wx2, '--wy2': spark.wy2, '--wx3': spark.wx3, '--wy3': spark.wy3,
                '--wt': spark.wt, width: spark.size, height: spark.size,
                left: '50%', top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          {/* Обертка */}
          <div className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative">
            <div className="relative w-full h-full card-preserve-3d">
              
              {/* Дополнительное мощное свечение для мобилок (Только когда закрыто) */}
              {!isOpen && (
                <div 
                  className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                  style={{ boxShadow: `0 0 60px ${getGlowColor()}` }} 
                />
              )}

              {/* ПЕРЕДАЕМ ВЫБРАННЫЙ ЯЗЫК В КАРТОЧКУ И ФУНКЦИЮ ПАСХАЛКИ */}
              <CreatorCard lang={lang} isOpen={isOpen} onClose={handleClose} onEasterEgg={triggerEasterEgg} />

              {/* === ЭФФЕКТЫ СВЕЧЕНИЯ И БЛИКОВ (ЖИДКОЕ СТЕКЛО) === */}
              {/* Блик виден только на закрытой карточке */}
              {!isOpen && (
                <div 
                  className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                  style={{
                    background: `
                      radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0) 60%),
                      linear-gradient(${glare.x + glare.y}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)
                    `,
                    boxShadow: `
                      inset ${rotate.y}px ${-rotate.x}px 20px rgba(255, 255, 255, 0.4),
                      inset ${-rotate.y * 1.5}px ${rotate.x * 1.5}px 40px rgba(255, 255, 255, 0.15)
                    `,
                    mixBlendMode: 'overlay',
                    opacity: glare.opacity ? Math.max(0.4, glare.opacity) : 0,
                    zIndex: 50,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* === ПАНЕЛЬ С КНОПКАМИ (Центрированная внизу, на десктопе опущена ниже) === */}
      <div className="fixed bottom-10 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-6">

        {/* СКРЫТЫЙ HTML5 АУДИО ПЛЕЕР */}
        <audio
          ref={audioRef}
          src={CONTENT[lang].creator.audioGreeting}
          preload="auto"
          playsInline
          onPlay={() => setIsAudioPlaying(true)}
          onPause={() => setIsAudioPlaying(false)}
          onEnded={() => setIsAudioPlaying(false)}
          style={{ display: 'none' }}
        />

        {/* КНОПКА ГОЛОСОВОГО ПРИВЕТСТВИЯ */}
        <button
          type="button"
          onClick={toggleGreetingAudio}
          className={`active:scale-90 rounded-full backdrop-blur-md border transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10 ${isAudioPlaying ? 'bg-white/20 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 border-white/10 text-white/60 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}
          aria-label="Голосовое приветствие"
        >
          {isAudioPlaying ? (
            <div className="flex items-end justify-center gap-[3px] w-full h-4">
              <div className="audio-bar" style={{ animationDelay: '0.0s' }}></div>
              <div className="audio-bar" style={{ animationDelay: '0.3s', height: '12px' }}></div>
              <div className="audio-bar" style={{ animationDelay: '0.6s', height: '16px' }}></div>
              <div className="audio-bar" style={{ animationDelay: '0.2s', height: '10px' }}></div>
            </div>
          ) : (
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform ml-0.5" />
          )}
        </button>

        {/* НОВАЯ КНОПКА: СМЕНА ЯЗЫКА (RU/EN) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            setLang(prev => prev === 'ru' ? 'en' : 'ru');
          }}
          className="active:scale-90 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10"
        >
          <span className="font-bold text-[11px] tracking-wider transition-transform group-hover:scale-110">
            {lang === 'ru' ? 'EN' : 'RU'}
          </span>
        </button>

        {/* КНОПКА ПОДЕЛИТЬСЯ */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            setShowShare(true);
          }}
          className="active:scale-90 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10"
        >
          <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* КНОПКА СОХРАНИТЬ КОНТАКТ (vCard) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            handleDownloadVCard();
          }}
          className="active:scale-90 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white/90 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300 group touch-manipulation flex items-center justify-center w-10 h-10"
        >
          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border" 
            style={{ backgroundColor: getModalTheme().bg, borderColor: getModalTheme().border }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => {
                setShowShare(false);
                setShowPwaPrompt(true);
              }}
              className={`w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center mb-4 border transition-colors group cursor-pointer active:scale-95 ${getModalTheme().icon.replace('text', 'border').replace('400', '500/30')}`}
            >
              <QrCode className={`w-6 h-6 group-hover:scale-110 transition-transform ${getModalTheme().icon}`} />
            </button>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{CONTENT[lang].ui.shareTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">{CONTENT[lang].ui.shareDesc}</p>
            
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : CONTENT[lang].creator.websiteLink)}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? CONTENT[lang].ui.copied : CONTENT[lang].ui.copy}
              </button>
              <button 
                onClick={handleShare}
                className={`flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm`}
              >
                <Share2 className="w-4 h-4" />
                {CONTENT[lang].ui.send}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО ПАСХАЛКИ */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowEasterEgg(false)}
        >
          <div 
            className="backdrop-blur-3xl bg-black/80 rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-[0_0_50px_rgba(255,255,255,0.2)] border border-white/30 animate-in zoom-in-95 duration-500" 
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1)_0%,_transparent_60%)] pointer-events-none rounded-[2.5rem]"></div>
            <button 
              onClick={() => setShowEasterEgg(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse">
              <Crown className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide text-center uppercase">{CONTENT[lang].easterEgg.title}</h3>
            <p className="text-sm text-white/70 text-center mb-6 leading-relaxed px-2">{CONTENT[lang].easterEgg.desc}</p>
            
            <div className="bg-white/10 p-4 rounded-xl mb-6 border border-white/20 w-full text-center">
              <span className="text-2xl font-mono tracking-widest text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                {CONTENT[lang].easterEgg.promo}
              </span>
            </div>

            <a 
              href={CONTENT[lang].easterEgg.link}
              className="w-full bg-gradient-to-r from-zinc-200 to-white hover:from-white hover:to-zinc-100 text-black text-[11px] font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center transition-all shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white active:scale-95"
            >
              {CONTENT[lang].easterEgg.btn}
            </a>
          </div>
        </div>
      )}

      {/* МОДАЛЬНОЕ ОКНО PWA */}
      {showPwaPrompt && (
        <div 
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
          onClick={() => setShowPwaPrompt(false)}
        >
          <div 
            className="w-full max-w-sm bg-black sm:rounded-3xl rounded-t-3xl p-6 pb-10 sm:pb-6 flex flex-col items-center relative animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 border-t sm:border border-white/10 shadow-[0_-10px_40px_rgba(255,255,255,0.05)]"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-6 sm:hidden"></div>
            
            <button 
              onClick={() => setShowPwaPrompt(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5 hidden sm:block"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black p-0.5 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-5">
               <div className="w-full h-full bg-black/80 backdrop-blur-md rounded-[14px] flex items-center justify-center border border-white/10">
                 <Crown className="w-8 h-8 text-white" />
               </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 text-center tracking-wide">{CONTENT[lang].ui.installTitle}</h3>
            <p className="text-sm text-white/60 text-center mb-8 leading-relaxed">
              {CONTENT[lang].ui.installDesc}
            </p>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-5 mb-8 shadow-inner">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                   <Share2 className="w-4 h-4 text-white" />
                 </div>
                 <p className="text-sm text-white/80 leading-snug">
                   {CONTENT[lang].ui.installStep1_1}<b>{CONTENT[lang].ui.installStep1_2}</b><br/>{CONTENT[lang].ui.installStep1_3}
                 </p>
               </div>
               <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                   <PlusSquare className="w-4 h-4 text-white" />
                 </div>
                 <p className="text-sm text-white/80 leading-snug">
                   {CONTENT[lang].ui.installStep2_1}<b className="text-white">{CONTENT[lang].ui.installStep2_2}</b><br/>{CONTENT[lang].ui.installStep2_3}
                 </p>
               </div>
            </div>

            <button 
              onClick={() => setShowPwaPrompt(false)}
              className="w-full bg-gradient-to-r from-zinc-200 to-white text-black font-bold py-4 px-4 rounded-2xl transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95"
            >
              {CONTENT[lang].ui.done}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;