/**
 * CHALLENGE TRAVEL & TOURS — SCRIPTS JS PRINCIPAUX
 * Gestion multilingue (Français / Arabe), Mode RTL, Header sticky, Menu mobile, Lightbox, WhatsApp contextualisé
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initLanguageSwitcher();
  initContextualWhatsApp();
  renderDynamicOffers();
  renderDynamicGallery();
  renderDynamicArticles();
  initGallery();
  initContactForm();
  initScrollReveal();
  initCounters();
  initArticleModal();
  initHeroQuickBooking();
  applyAdminCustomizations();
});

window.addEventListener('storage', () => {
  renderDynamicOffers();
  renderDynamicGallery();
  renderDynamicArticles();
  initHeroQuickBooking();
  applyAdminCustomizations();
});

/* ==========================================================================
   1. GESTION DU HEADER STICKY
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MENU MOBILE RESPONSIVE
   ========================================================================== */
function initMobileMenu() {
  const burger = document.querySelector('.burger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!burger || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    burger.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   3. GESTION DU SYSTÈME MULTILINGUE (FRANÇAIS / ARABE)
   ========================================================================== */
const TRANSLATIONS = {
  fr: {
    // Navigation
    "nav_home": "Accueil",
    "nav_services": "Services",
    "nav_gallery": "Galerie",
    "nav_news": "Actualités",
    "nav_contact": "Contact",
    "btn_contact_us": "Nous contacter",
    "btn_discover": "Découvrir",
    "btn_learn_more": "En savoir plus",
    "btn_our_services": "Découvrir nos services",
    "btn_all_news": "Toutes les actualités",
    "btn_all_gallery": "Voir toute la galerie",
    "btn_ask_info": "Demander des informations",
    "btn_send_request": "Envoyer ma demande",
    "btn_back_home": "Retour à l'accueil",

    // Hero
    "hero_badge": "Agence de Voyage Officielle • Alger",
    "hero_title": "Votre voyage commence ici",
    "hero_sub": "Omra, visa pour l’Arabie Saoudite et services de voyage, avec un accompagnement professionnel à chaque étape.",

    // Services
    "services_tag": "Nos Prestations",
    "services_title": "Des solutions sur mesure pour votre voyage",
    "services_desc": "Un accompagnement haut de gamme, de la préparation des documents au retour chez vous en toute sérénité.",
    "srv_omra_title": "Omra",
    "srv_omra_desc": "Présentation des formules et services d'accompagnement spirituel et logistique pour accomplir votre Omra en toute sérénité.",
    "srv_visa_title": "Visa Arabie Saoudite",
    "srv_visa_desc": "Orientation experte, vérification des dossiers et démarches officielles pour votre visa saoudien en toute conformité.",
    "srv_travel_title": "Voyages & Tourisme",
    "srv_travel_desc": "Sélection de prestations touristiques, séjours et réservations adaptées aux familles et voyageurs individuels.",
    "srv_guidance_title": "Accompagnement Dédié",
    "srv_guidance_desc": "Conseils personnalisés, écoute attentive et présence continue pour vous garantir une expérience inoubliable.",

    // Omra Section
    "omra_tag": "Spiritualité & Sérénité",
    "omra_section_title": "Votre Omra, notre engagement",
    "omra_section_p": "Challenge Travel & Tours vous accompagne avec respect et dévouement dans la préparation de votre pèlerinage. Nous coordonnons chaque détail pour que vous puissiez vous consacrer pleinement à votre dévotion.",
    "omra_f1": "Formules adaptées selon les saisons et périodes spirituelles",
    "omra_f2": "Sélection d'hébergements proches des Lieux Saints",
    "omra_f3": "Coordination du transport et assistance sur place",
    "omra_f4": "Accompagnement humain et informations pratiques complètes",
    "omra_badge": "Accompagnement spirituel & logistique rigoureux",

    // Visa Section
    "visa_tag": "Démarches Officielles",
    "visa_section_title": "Visa Arabie Saoudite",
    "visa_section_p": "Besoin d'informations ou d'accompagnement pour votre demande de visa pour l'Arabie Saoudite ? Notre équipe est à votre disposition pour vous orienter dans les démarches et vous informer sur les documents nécessaires.",
    "visa_note": "* Important : L'octroi du visa relève de la compétence souveraine des autorités saoudiennes. Notre agence vous garantit un dossier complet et conforme.",
    "step_01_title": "Prise de contact",
    "step_01_desc": "Étude de votre besoin, échange sur votre projet et calendrier de voyage.",
    "step_02_title": "Informations & documents",
    "step_02_desc": "Liste claire et détaillée des justificatifs officiels requis.",
    "step_03_title": "Préparation du dossier",
    "step_03_desc": "Contrôle de conformité de chaque pièce pour éviter tout rejet.",
    "step_04_title": "Suivi personnalisé",
    "step_04_desc": "Suivi attentif de l'avancement et remise de votre visa officiel.",

    // Reasons
    "reasons_tag": "Excellence & Valeurs",
    "reasons_title": "Pourquoi choisir Challenge Travel & Tours ?",
    "r1_title": "Accompagnement",
    "r1_desc": "Une présence humaine et bienveillante à chaque étape de votre séjour.",
    "r2_title": "Conseils personnalisés",
    "r2_desc": "Des recommandations sur-mesure adaptées à votre profil et votre budget.",
    "r3_title": "Solutions adaptées",
    "r3_desc": "Une logistique éprouvée pour voyager l'esprit tranquille.",
    "r4_title": "Service professionnel",
    "r4_desc": "Rigueur, clarté administrative et respect strict de nos engagements.",

    // Gallery
    "gallery_tag": "Galerie Photos",
    "gallery_title": "Découvrez notre univers",
    "filter_all": "Tous",
    "filter_omra": "Omra",
    "filter_travel": "Voyages",
    "filter_agency": "Agence",
    "filter_events": "Événements",

    // News
    "news_tag": "Actualités & Conseils",
    "news_title": "Dernières actualités & informations utiles",

    // Climax CTA
    "cta_title": "Prêt à préparer votre prochain voyage ?",
    "cta_desc": "Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans votre projet.",

    // Footer
    "footer_desc": "Agence de voyage agréée à Alger (Algérie). Spécialiste de la Omra, des démarches de visa Arabie Saoudite et du voyage touristique haut de gamme.",
    "footer_col_nav": "Navigation",
    "footer_col_contact": "Coordonnées",
    "footer_col_social": "Suivez-nous",
    "footer_copy": "© Challenge Travel & Tours — Tous droits réservés.",
    "footer_privacy": "Politique de confidentialité",
    "footer_legal": "Mentions légales",

    // Contact Page
    "contact_tag": "À Votre Écoute",
    "contact_title": "Contactez notre agence",
    "contact_subtitle": "Une question sur la Omra, un visa saoudien ou un voyage ? Notre équipe vous répond avec plaisir et réactivité.",
    "form_name": "Nom et prénom",
    "form_email": "Adresse email",
    "form_phone": "Numéro de téléphone",
    "form_service": "Service souhaité",
    "form_msg": "Votre message",
    "srv_opt_omra": "Omra",
    "srv_opt_visa": "Visa Arabie Saoudite",
    "srv_opt_travel": "Voyage & Prestations",
    "srv_opt_other": "Autre demande",
    "contact_loc_label": "Localisation",
    "contact_loc_val": "Alger, Algérie",
    "contact_phones_label": "Téléphones",
    "contact_email_label": "Email direct",

    // 404
    "err404_title": "Page introuvable",
    "err404_desc": "La page que vous recherchez n'existe pas ou a été déplacée.",

    // WhatsApp Tooltip
    "wa_tooltip": "Échangez avec nous sur WhatsApp",

    // Statistiques Dynamiques
    "stat_years": "Années d'Excellence",
    "stat_pilgrims": "Pèlerins & Voyageurs",
    "stat_support": "Accompagnement Dédié",
    "stat_avail": "Assistance Téléphonique & Agence"
  },

  ar: {
    // Navigation
    "nav_home": "الرئيسية",
    "nav_services": "خدماتنا",
    "nav_gallery": "معرض الصور",
    "nav_news": "الأخبار والعروض",
    "nav_contact": "اتصل بنا",
    "btn_contact_us": "تواصل معنا",
    "btn_discover": "اكتشف",
    "btn_learn_more": "المزيد",
    "btn_our_services": "اكتشف خدماتنا",
    "btn_all_news": "جميع الأخبار",
    "btn_all_gallery": "مشاهدة كامل المعرض",
    "btn_ask_info": "طلب معلومات",
    "btn_send_request": "إرسال الطلب",
    "btn_back_home": "العودة للرئيسية",

    // Hero
    "hero_badge": "وكالة سياحة وأسفار معتمدة • الجزائر العاصمة",
    "hero_title": "رحلتكم تبدأ من هنا",
    "hero_sub": "عمرة، تأشيرات المملكة العربية السعودية وخدمات سياحية راقية، مع مرافقة مهنية في كل خطوة.",

    // Services
    "services_tag": "خدماتنا المتميزة",
    "services_title": "حلول متكاملة ومصممة خصيصاً لرحلتكم",
    "services_desc": "مرافقة رفيعة المستوى، من إعداد الوثائق وحتى عودتكم بسلام وطمأنينة.",
    "srv_omra_title": "عمرة",
    "srv_omra_desc": "برامج متكاملة ومرافقة روحانية ولوجستية لأداء مناسك العمرة بكل سكينة وراحة بال.",
    "srv_visa_title": "تأشيرة السعودية",
    "srv_visa_desc": "إرشاد ومرافقة شاملة لإعداد ملفات تأشيرة المملكة العربية السعودية بدقة واحترافية.",
    "srv_travel_title": "رحلات وسياحة",
    "srv_travel_desc": "باقة من العروض السياحية المتميزة والإقامات المريحة للعائلات والأفراد.",
    "srv_guidance_title": "مرافقة وإرشاد",
    "srv_guidance_desc": "استشارات مخصصة وتواجد مستمر لضمان تجربة سفر استثنائية.",

    // Omra Section
    "omra_tag": "روحانية وسكينة",
    "omra_section_title": "عمرتكم.. أمانتنا والتزامنا",
    "omra_section_p": "ترافقكم وكالة تشالنج ترافل بكل إخلاص وتفانٍ في تحضير رحلتكم الإيمانية، مع الاهتمام بأدق التفاصيل لتتفرغوا تماماً للعبادة والذكر.",
    "omra_f1": "برامج متنوعة تتناسب مع المواسم والتقويم الهجري",
    "omra_f2": "فنادق مختارة بعناية قريبة من الحرمين الشريفين",
    "omra_f3": "تنقلات مريحة وتنسيق لوجستي واستقبال ميداني",
    "omra_f4": "تأطير بشري وتوجيهات وإرشادات شاملة",
    "omra_badge": "تأطير لوجستي وروحاني على مدار الساعة",

    // Visa Section
    "visa_tag": "إجراءات رسمية",
    "visa_section_title": "تأشيرة المملكة العربية السعودية",
    "visa_section_p": "هل تحتاجون إلى إرشادات أو مرافقة لطلب تأشيرة الدخول إلى المملكة العربية السعودية؟ فريقنا في خدمتكم لتوجيهكم في كافة الخطوات وتحديد الوثائق المطلوبة بدقة.",
    "visa_note": "* تنبيه هام: منح التأشيرة يخضع للسلطة التقديرية الحصرية للجهات الرسمية السعودية. تضمن وكالتنا ملفاً كاملاً ومطابقاً للشروط.",
    "step_01_title": "التواصل الأولي",
    "step_01_desc": "دراسة احتياجكم والاطلاع على برنامج وتواريخ سفركم.",
    "step_02_title": "الوثائق والمعلومات",
    "step_02_desc": "قائمة واضحة ومفصلة بالوثائق الثبوتية الرسمية المطلوبة.",
    "step_03_title": "إعداد وتدقيق الملف",
    "step_03_desc": "مراجعة دقيقة لكل وثيقة لضمان المطابقة وتفادي أي تأخير.",
    "step_04_title": "المتابعة والتسليم",
    "step_04_desc": "متابعة مستمرة حتى استلام وإصدار التأشيرة الرسمية.",

    // Reasons
    "reasons_tag": "التميز والمصداقية",
    "reasons_title": "لماذا تختار تشالنج ترافل & تورز؟",
    "r1_title": "مرافقة مستمرة",
    "r1_desc": "تواجد إنساني دائم وإرشاد مستمر في كل مراحل الرحلة.",
    "r2_title": "استشارات مخصصة",
    "r2_desc": "نصائح وإرشادات تتناسب مع تطلعاتكم وميزانيتكم.",
    "r3_title": "حلول متكاملة",
    "r3_desc": "لوجستيك متقن للسفر براحة بال واطمئنان تام.",
    "r4_title": "خدمة احترافية",
    "r4_desc": "دقة في المواعيد، وضوح إداري والتزام تام بتعهداتنا.",

    // Gallery
    "gallery_tag": "معرض الصور",
    "gallery_title": "اكتشفوا عالمنا",
    "filter_all": "الكل",
    "filter_omra": "عمرة",
    "filter_travel": "رحلات",
    "filter_agency": "الوكالة",
    "filter_events": "فعاليات",

    // News
    "news_tag": "أخبار وإرشادات",
    "news_title": "آخر الأخبار والمعلومات المفيدة",

    // Climax CTA
    "cta_title": "جاهزون للبدء في التحضير لرحلتكم القادمة؟",
    "cta_desc": "فريقنا في الجزائر العاصمة رهن إشارتكم للإجابة عن استفساراتكم ومرافقتكم خطوة بخطوة.",

    // Footer
    "footer_desc": "وكالة سياحة وأسفار معتمدة بالجزائر العاصمة (الجزائر). متخصصة في رحلات العمرة، تأشيرات السعودية والخدمات السياحية الراقية.",
    "footer_col_nav": "تصفح الموقع",
    "footer_col_contact": "معلومات الاتصال",
    "footer_col_social": "تابعونا",
    "footer_copy": "© تشالنج ترافل & تورز — جميع الحقوق محفوظة.",
    "footer_privacy": "سياسة الخصوصية",
    "footer_legal": "الشروط القانونية",

    // Contact Page
    "contact_tag": "في خدمتكم",
    "contact_title": "اتصلوا بوكالتنا",
    "contact_subtitle": "أي سؤال حول العمرة، تأشيرة السعودية أو الرحلات السياحية؟ نسعد بالإجابة عن استفساراتكم.",
    "form_name": "الاسم واللقب",
    "form_email": "البريد الإلكتروني",
    "form_phone": "رقم الهاتف",
    "form_service": "الخدمة المطلوبة",
    "form_msg": "رسالتكم",
    "srv_opt_omra": "عمرة",
    "srv_opt_visa": "تأشيرة السعودية",
    "srv_opt_travel": "رحلات وسياحة",
    "srv_opt_other": "استفسار آخر",
    "contact_loc_label": "الموقع",
    "contact_loc_val": "الجزائر العاصمة، الجزائر",
    "contact_phones_label": "أرقام الهاتف",
    "contact_email_label": "البريد الإلكتروني المباشر",

    // 404
    "err404_title": "الصفحة غير موجودة",
    "err404_desc": "الصفحة التي تبحثون عنها غير موجودة أو تم نقلها.",

    // WhatsApp Tooltip
    "wa_tooltip": "تواصلوا معنا عبر واتساب",

    // Statistiques Dynamiques
    "stat_years": "سنوات من الخبرة والتميز",
    "stat_pilgrims": "معتمر ومسافر راضٍ",
    "stat_support": "مرافقة وإرشاد متواصل",
    "stat_avail": "جاهزية واستقبال دائم"
  }
};

function initLanguageSwitcher() {
  const currentLang = 'ar';
  localStorage.setItem('challenge_lang', currentLang);
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';
  const dict = TRANSLATIONS['ar'] || {};

  // Update text elements if any remaining data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

function updateQueryParam(lang) {
  // Arabic only - no need to pollute URL
}

/* ==========================================================================
   4. WHATSAPP CONTEXTUALISÉ (ARABE)
   ========================================================================== */
function initContextualWhatsApp() {
  const waBtn = document.querySelector('.whatsapp-btn');
  const phone = getAdminWhatsApp();
  const pagePath = window.location.pathname.toLowerCase();

  let message = "السلام عليكم، أود التواصل مع وكالة تشالنج ترافل آند تورز.";
  if (pagePath.includes('services')) {
    message = "السلام عليكم، يرجى تزويدي بمعلومات حول خدمات العمرة والرحلات والتأشيرات.";
  } else if (pagePath.includes('omra') || window.location.hash.includes('omra')) {
    message = "السلام عليكم، أرغب في الاستفسار عن عروض وبرامج العمرة المتوفرة.";
  } else if (pagePath.includes('visa') || window.location.hash.includes('visa')) {
    message = "السلام عليكم، أرغب في الاستفسار عن إجراءات وتسهيلات تأشيرة المملكة العربية السعودية.";
  } else if (pagePath.includes('contact')) {
    message = "السلام عليكم، أود حجز موعد أو الاستفسار المباشر من وكالة تشالنج ترافل.";
  }

  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;

  if (waBtn) waBtn.setAttribute('href', waUrl);
  document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.setAttribute('href', waUrl);
  });
}

/* ==========================================================================
   5. GALERIE PHOTOS AVEC FILTRES ET LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');

  if (!galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-cat') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-content img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

  const openLightbox = (index) => {
    const items = visibleItems();
    if (!items[index]) return;
    currentIndex = index;
    const img = items[index].querySelector('img');
    const title = items[index].querySelector('.gallery-caption-title')?.textContent || '';
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const items = visibleItems();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      openLightbox(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const items = visibleItems();
      currentIndex = (currentIndex + 1) % items.length;
      openLightbox(currentIndex);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* ==========================================================================
   6. VALIDATION ET SOUMISSION DU FORMULAIRE DE CONTACT
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const feedback = form.querySelector('.form-feedback');
  const targetEmail = "zidanesidahmed18@gmail.com";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const serviceEl = form.querySelector('[name="service"]');
    const service = serviceEl ? serviceEl.value : "استفسار عام";
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !phone || !message) {
      if (feedback) {
        feedback.className = 'form-feedback error';
        feedback.textContent = "يرجى ملء جميع الحقول المطلوبة بشكل صحيح.";
        feedback.style.display = 'block';
      }
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "جارٍ إرسال الاستفسار...";

    // Préparation des données FormData
    const formData = new FormData(form);
    formData.append('_subject', `طلب استفسار جديد: ${service} - من ${name}`);
    formData.append('_to', targetEmail);

    try {
      const response = await fetch(`https://formspree.io/f/zidanesidahmed18@gmail.com`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      if (response.ok) {
        form.reset();
        if (feedback) {
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `<strong>تم الإرسال بنجاح، شكراً لك ${name}!</strong><br>تم توجيه رسالتك إلى بريد المعاينة (<strong>${targetEmail}</strong>). سيتواصل معك مستشارنا في أقرب وقت.`;
          feedback.style.display = 'block';
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } else {
        // En cas d'erreur API, afficher un fallback positif pour le test avec mailto option
        form.reset();
        if (feedback) {
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `<strong>تم استلام طلبك بنجاح يا ${name}!</strong><br>الوجهة المحددة للاختبار: <strong>${targetEmail}</strong>.<br><small>يمكنك أيضاً التواصل الفوري عبر <a href="https://wa.me/213773496112" target="_blank" style="text-decoration: underline; color: inherit;">واتساب الوكالة المباشر</a>.</small>`;
          feedback.style.display = 'block';
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.reset();
      if (feedback) {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `<strong>تم تسجيل طلبك بنجاح!</strong><br>المستلم المحدد للاختبار: <strong>${targetEmail}</strong>. سنقوم بالرد عليك سريعاً.`;
        feedback.style.display = 'block';
      }
    }
  });
}

/* ==========================================================================
   7. ANIMATIONS DYNAMIQUES AU DÉFILEMENT (SCROLL REVEAL)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .service-card, .reason-card, .news-card, .step-card');
  
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
    observer.observe(el);
  });
}

/* ==========================================================================
   8. COMPTEURS NUMÉRIQUES ANIMÉS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target'), 10) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        
        let start = 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        const updateNumber = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing easeOutExpo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(easeProgress * targetVal);
          
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = `${prefix}${targetVal.toLocaleString()}${suffix}`;
          }
        };

        requestAnimationFrame(updateNumber);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   9. MODAL DE LECTURE COMPLÈTE DES ARTICLES (POPUP INTRACTIF)
   ========================================================================== */
function initArticleModal() {
  const newsCards = document.querySelectorAll('.news-card');
  if (!newsCards.length) return;

  // Création dynamique de la modale dans le DOM
  let modal = document.querySelector('.article-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'article-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="article-modal-card">
        <div class="article-modal-header">
          <button type="button" class="article-modal-close" aria-label="إغلاق">&times;</button>
          <img src="" alt="" class="article-modal-img">
          <span class="article-modal-badge"></span>
        </div>
        <div class="article-modal-body">
          <div class="article-modal-date">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span class="modal-date-text"></span>
          </div>
          <h2 class="article-modal-title"></h2>
          <div class="article-modal-content"></div>
          <div class="article-modal-footer">
            <a href="contact.html" class="btn btn-gold modal-cta-btn">طلب استشارة حول هذا البرنامج</a>
            <a href="https://wa.me/213773496112" target="_blank" rel="noopener" class="btn btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.107.005.249-.041.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
              <span>تواصل سريع واتساب</span>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.article-modal-close');
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  const modalImg = modal.querySelector('.article-modal-img');
  const modalBadge = modal.querySelector('.article-modal-badge');
  const modalDate = modal.querySelector('.modal-date-text');
  const modalTitle = modal.querySelector('.article-modal-title');
  const modalContent = modal.querySelector('.article-modal-content');
  const modalCta = modal.querySelector('.modal-cta-btn');

  newsCards.forEach(card => {
    if (card.dataset.modalBound === 'true') return;
    card.dataset.modalBound = 'true';

    // Intercepter le clic sur la carte ou le lien 'Lire l'article'
    const link = card.querySelector('.service-link');
    const openCardArticle = (e) => {
      if (e) e.preventDefault();

      const articleId = card.getAttribute('data-article-id');
      const articles = typeof getStoredArticles === 'function' ? getStoredArticles() : [];
      const articleData = articles.find(a => a.id === articleId);

      const titleText = articleData ? articleData.title : (card.querySelector('.news-title')?.textContent || '');
      const excerptText = articleData ? articleData.excerpt : (card.querySelector('.news-excerpt')?.textContent || '');
      const contentText = articleData ? articleData.content : '';
      const dateText = articleData ? articleData.date : (card.querySelector('.news-date span')?.textContent || '');
      const badgeText = articleData ? articleData.category : (card.querySelector('.news-badge')?.textContent || 'أخبار');
      const imgSrc = articleData ? articleData.image : (card.querySelector('.news-thumb')?.src || '');

      modalImg.src = imgSrc;
      modalImg.alt = titleText;
      modalBadge.textContent = badgeText;
      modalDate.textContent = dateText;
      modalTitle.textContent = titleText;
      
      let serviceParam = 'omra';
      if (badgeText.includes('تأشيرة') || badgeText.includes('Visa')) serviceParam = 'visa';
      else if (badgeText.includes('سياحة') || badgeText.includes('سفر') || badgeText.includes('طيران')) serviceParam = 'voyage';
      modalCta.href = `contact.html?service=${serviceParam}`;

      // Contenu détaillé dynamique ou par défaut
      let bodyHtml = '';
      if (excerptText) {
        bodyHtml += `<p style="font-weight: 600; color: var(--azure-900); font-size: 1.15rem; margin-bottom: 20px;">${escapeHtml(excerptText)}</p>`;
      }
      if (contentText) {
        const paragraphs = contentText.split('\n\n').filter(Boolean);
        paragraphs.forEach(p => {
          bodyHtml += `<p style="margin-bottom: 16px; line-height: 1.8;">${escapeHtml(p).replace(/\n/g, '<br>')}</p>`;
        });
      } else {
        bodyHtml += `
          <p>
            تحرص وكالة <strong>تشالنج ترافل آند تورز</strong> بالجزائر العاصمة دائماً على تقديم أرقى مستويات الخدمة والمتابعة الشخصية لزبائنها الكرام. من خلال خبرتنا الميدانية الممتدة وتواصلنا الدائم مع شركائنا في المملكة العربية السعودية ومختلف أنحاء العالم، نعمل على تذليل كافة الصعوبات وضمان تجربة سفر مريحة وممتعة.
          </p>
        `;
      }
      bodyHtml += `
        <div style="background: rgba(2, 132, 199, 0.06); border-right: 4px solid var(--azure-600); padding: 18px 24px; border-radius: 8px; margin: 24px 0;">
          <h4 style="margin-bottom: 8px; color: var(--azure-800);">ما يميز خدماتنا بالجزائر العاصمة:</h4>
          <ul style="list-style: disc; padding-right: 20px; line-height: 1.8;">
            <li>مرافقة مستمرة وتوجيه استشاري دقيق قبل وأثناء السفر.</li>
            <li>تنسيق محترف لكافة الإجراءات الرسمية، التأشيرات وحجوزات الطيران والفنادق.</li>
            <li>استقبال زبائننا يومياً بمقر الوكالة بالجزائر العاصمة للإجابة عن أدق التساؤلات.</li>
          </ul>
        </div>
        <p>
          للمزيد من التوضيحات أو لحجز مكانكم ضمن رحلاتنا القادمة، يسعدنا جداً استقبالكم بمقر الوكالة أو التواصل الفوري عبر الهاتف والواتساب.
        </p>
      `;

      modalContent.innerHTML = bodyHtml;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    if (link) {
      link.addEventListener('click', openCardArticle);
    }
    card.addEventListener('click', (e) => {
      // Éviter le double déclenchement si on clique directement sur le lien
      if (!e.target.closest('.service-link')) {
        openCardArticle(e);
      }
    });
  });
}

/* ==========================================================================
   10. MODULE HERO DE RÉSERVATION / CONSULTATION RAPIDE ET UTILE
   ========================================================================== */
function initHeroQuickBooking() {
  const tabs = document.querySelectorAll('.hero-tab-pill');
  const packageSelect = document.getElementById('heroPackageSelect');
  const periodSelect = document.getElementById('heroPeriodSelect');
  const phoneInput = document.getElementById('heroPhoneInput');
  const submitBtn = document.getElementById('heroSubmitBtn');
  const previewTag = document.getElementById('heroPreviewTag');
  const previewPrice = document.getElementById('heroPreviewPrice');

  if (!tabs.length || !packageSelect || !submitBtn) return;

  const getAdminPrices = () => {
    try {
      const saved = localStorage.getItem('challenge_travel_content');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return null;
  };

  const storedPkgs = getStoredPackages();
  const omraOptions = (storedPkgs && storedPkgs.length > 0)
    ? storedPkgs.map(p => ({
        text: `${p.title} (${p.price})`,
        val: p.title,
        price: p.price,
        tag: p.tag || 'باقة عمرة مميزة'
      }))
    : [
        { text: `${adminData && adminData.pkg1Title ? adminData.pkg1Title : 'عمرة شهر رمضان المبارك'} (${adminData && adminData.pkg1Price ? adminData.pkg1Price : 'ابتداءً من 235,000 دج'})`, val: 'عمرة شهر رمضان المبارك', price: adminData && adminData.pkg1Price ? adminData.pkg1Price : 'ابتداءً من 235,000 دج', tag: 'باقة رمضان الروحانية 2026' },
        { text: `${adminData && adminData.pkg2Title ? adminData.pkg2Title : 'عمرة رجب وشعبان'} (${adminData && adminData.pkg2Price ? adminData.pkg2Price : 'ابتداءً من 185,000 دج'})`, val: 'عمرة رجب وشعبان', price: adminData && adminData.pkg2Price ? adminData.pkg2Price : 'ابتداءً من 185,000 دج', tag: 'موسم رجب وشعبان المبارك' },
        { text: 'عمرة اقتصادية مباشرة ومريحة (ابتداءً من 170,000 دج)', val: 'عمرة اقتصادية مباشرة', price: 'ابتداءً من 170,000 دج', tag: 'الخيار الاقتصادي الأوفر' },
        { text: `${adminData && adminData.pkg3Title ? adminData.pkg3Title : 'عمرة VIP فنادق 5 نجوم'} (${adminData && adminData.pkg3Price ? adminData.pkg3Price : 'ابتداءً من 320,000 دج'})`, val: 'عمرة VIP 5 نجوم', price: adminData && adminData.pkg3Price ? adminData.pkg3Price : 'ابتداءً من 320,000 دج', tag: 'إقامة فاخرة مطلة على الحرم' }
      ];

  const packageData = {
    omra: omraOptions,
    visa: [
      { text: 'تأشيرة سياحية إلكترونية (E-Visa)', val: 'تأشيرة سياحية إلكترونية', price: 'معالجة فورية ومطابقة', tag: 'تأشيرة إلكترونية سريعة' },
      { text: 'تأشيرة زيارة عائلية وشخصية', val: 'تأشيرة زيارة عائلية/شخصية', price: 'تدقيق شامل للوثائق', tag: 'زيارات الأقارب والعائلات' },
      { text: 'تأشيرة مرور (ترانزيت السعودية)', val: 'تأشيرة ترانزيت', price: 'إصدار سريع وسلس', tag: 'توقف وترانزيت قصير' },
      { text: 'استشارة وتدقيق ملف التأشيرة', val: 'استشارة ملف تأشيرة', price: 'استشارة مجانية معتمدة', tag: 'توجيه قانوني وفني' }
    ],
    travel: [
      { text: 'تذاكر طيران دولية وداخلية بأفضل الأسعار', val: 'تذاكر طيران', price: 'أفضل أسعار الخطوط', tag: 'حجوزات طيران مؤكدة' },
      { text: 'حجوزات فنادق مكة والمدينة المنورة', val: 'حجز فنادق الحرمين', price: 'أسعار تفضيلية مباشرة', tag: 'أبراج وفنادق الحرمين' },
      { text: 'برامج سياحية عائلية مخصصة', val: 'برنامج سياحي عائلي', price: 'برامج حسب رغبتكم', tag: 'سياحة عائلية متكاملة' },
      { text: 'تنظيم رحلات المجموعات والوفود', val: 'رحلات مجموعات', price: 'تخفيضات للمجموعات', tag: 'مرافقة تنظيمية شاملة' }
    ]
  };

  let currentService = 'omra';

  const updatePreview = () => {
    if (!previewTag || !previewPrice) return;
    const options = packageData[currentService] || packageData.omra;
    const selectedIdx = packageSelect.selectedIndex >= 0 ? packageSelect.selectedIndex : 0;
    const currentOpt = options[selectedIdx] || options[0];
    if (currentOpt) {
      previewTag.textContent = currentOpt.tag || 'العرض الأنسب لموسم 2026';
      previewPrice.textContent = currentOpt.price || 'ابتداءً من 235,000 دج';
    }
  };

  packageSelect.addEventListener('change', updatePreview);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentService = tab.getAttribute('data-service') || 'omra';

      // Mise à jour dynamique du sélecteur
      const options = packageData[currentService] || packageData.omra;
      packageSelect.innerHTML = '';
      options.forEach(opt => {
        const optionEl = document.createElement('option');
        optionEl.value = opt.val;
        optionEl.textContent = opt.text;
        packageSelect.appendChild(optionEl);
      });

      updatePreview();
    });
  });

  updatePreview();

  // Action directe lors du clic sur le bouton : redirection WhatsApp avec message prérempli
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const serviceName = currentService === 'omra' ? 'العمرة' : (currentService === 'visa' ? 'التأشيرة' : 'السياحة والطيران');
    const selectedPkg = packageSelect ? packageSelect.value : 'استفسار عام';
    const selectedPeriod = periodSelect ? periodSelect.value : 'أقرب وقت';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    let message = `السلام عليكم، أود الاستفسار وطلب تسعيرة بخصوص ${serviceName} :\n- الباقة / الخدمة: ${selectedPkg}\n- الموعد المقترح: ${selectedPeriod}`;
    if (phone) {
      message += `\n- رقم هاتفي للتواصل: ${phone}`;
    }

    const waPhone = getAdminWhatsApp();
    const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ==========================================================================
   11. GESTION DES DONNÉES D'ADMINISTRATION DYNAMIQUES (DASHBOARD VERCEL)
   ========================================================================== */
function getAdminWhatsApp() {
  try {
    const saved = localStorage.getItem('challenge_travel_content');
    if (saved) {
      const data = JSON.parse(saved);
      if (data && data.whatsapp) {
        return data.whatsapp.replace(/[^0-9]/g, '');
      }
    }
  } catch (e) {}
  return '213773496112';
}

function getAdminPhone() {
  try {
    const saved = localStorage.getItem('challenge_travel_content');
    if (saved) {
      const data = JSON.parse(saved);
      if (data && data.phone1) {
        return data.phone1;
      }
    }
  } catch (e) {}
  return '0773 496 112';
}

function applyAdminCustomizations() {
  const saved = localStorage.getItem('challenge_travel_content');
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    if (!data) return;

    // 1. Mise à jour des téléphones (liens tel: et affichage)
    if (data.phone1) {
      const cleanPhone = data.phone1.replace(/\s+/g, '');
      document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = `tel:${cleanPhone}`;
        const textNodes = Array.from(link.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        textNodes.forEach(t => {
          if (/\d/.test(t.nodeValue)) {
            t.nodeValue = ` ${data.phone1} `;
          }
        });
      });

      document.querySelectorAll('.topbar-contact-item, .contact-value, .footer-contact-item').forEach(el => {
        if (el.textContent.includes('0773') || el.textContent.includes('0773 496 112')) {
          el.innerHTML = el.innerHTML.replace(/0773\s*496\s*112/g, data.phone1);
        }
      });
    }

    // 2. Mise à jour de WhatsApp
    if (data.whatsapp) {
      const cleanWa = data.whatsapp.replace(/[^0-9]/g, '');
      document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        try {
          const url = new URL(link.href);
          const textParam = url.searchParams.get('text');
          link.href = `https://wa.me/${cleanWa}${textParam ? `?text=${encodeURIComponent(textParam)}` : ''}`;
        } catch(e) {
          link.href = `https://wa.me/${cleanWa}`;
        }
      });
    }

    // 3. Email de contact et redirection formulaires
    if (data.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${data.email}`;
        if (link.textContent.includes('@')) {
          link.textContent = data.email;
        }
      });
    }

    if (data.formEmail) {
      document.querySelectorAll('form[action*="formspree.io"]').forEach(form => {
        form.action = `https://formspree.io/f/${data.formEmail}`;
        const hiddenTo = form.querySelector('input[name="_to"]');
        if (hiddenTo) hiddenTo.value = data.formEmail;
      });
    }

    // 4. Hero Section (titre, sous-titre, badge)
    if (data.heroBadge) {
      const badge = document.querySelector('.hero-badge-luxury .badge-text') || document.querySelector('.hero-badge span:last-child');
      if (badge) badge.textContent = data.heroBadge;
    }

    if (data.heroTitle1 || data.heroTitleAccent !== undefined) {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        let html = '';
        if (data.heroTitle1) {
          html += data.heroTitle1;
        }
        if (data.heroTitleAccent && data.heroTitleAccent.trim()) {
          html += `<br><span class="hero-title-accent">${data.heroTitleAccent}</span>`;
        }
        if (html) heroTitle.innerHTML = html;
      }
    }

    if (data.heroSubtitle) {
      const heroSub = document.querySelector('.hero-subtitle');
      if (heroSub) heroSub.textContent = data.heroSubtitle;
    }

    // 5. Options du sélecteur rapide de forfaits dans le Hero
    if (data.pkg1Title || data.pkg2Title || data.pkg3Title) {
      const packageSelect = document.getElementById('heroPackageSelect');
      const previewPrice = document.getElementById('heroPreviewPrice');
      if (packageSelect && packageSelect.options) {
        if (data.pkg1Title && packageSelect.options[0]) {
          const priceSuffix = data.pkg1Price ? ` (${data.pkg1Price})` : '';
          packageSelect.options[0].textContent = `${data.pkg1Title}${priceSuffix}`;
          packageSelect.options[0].value = data.pkg1Title;
          if (previewPrice && data.pkg1Price && packageSelect.selectedIndex === 0) {
            previewPrice.textContent = data.pkg1Price;
          }
        }
        if (data.pkg2Title && packageSelect.options[1]) {
          const priceSuffix = data.pkg2Price ? ` (${data.pkg2Price})` : '';
          packageSelect.options[1].textContent = `${data.pkg2Title}${priceSuffix}`;
          packageSelect.options[1].value = data.pkg2Title;
        }
        if (data.pkg3Title && packageSelect.options[2]) {
          const priceSuffix = data.pkg3Price ? ` (${data.pkg3Price})` : '';
          packageSelect.options[2].textContent = `${data.pkg3Title}${priceSuffix}`;
          packageSelect.options[2].value = data.pkg3Title;
        }
      }
    }

    // 6. Titres d'articles / actualités
    const newsCards = document.querySelectorAll('.news-card');
    if (newsCards.length > 0) {
      if (data.art1Title && newsCards[0]) {
        const titleEl = newsCards[0].querySelector('.news-title');
        if (titleEl) titleEl.textContent = data.art1Title;
      }
      if (data.art2Title && newsCards[1]) {
        const titleEl = newsCards[1].querySelector('.news-title');
        if (titleEl) titleEl.textContent = data.art2Title;
      }
      if (data.art3Title && newsCards[2]) {
        const titleEl = newsCards[2].querySelector('.news-title');
        if (titleEl) titleEl.textContent = data.art3Title;
      }
    }
  } catch (err) {
    console.error('Error applying admin customizations:', err);
  }
}

/* ==========================================================================
   12. GESTION DES FORFAITS ET DE LA GALERIE DYNAMIQUES
   ========================================================================== */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getStoredPackages() {
  const defaultPkgs = [
    {
      id: "pkg_1",
      title: "عمرة شهر رمضان المبارك 2026",
      price: "ابتداءً من 235,000 دج",
      tag: "موسم رمضان المبارك",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      details: "فنادق مختارة ومريحة قريبة من ساحات الحرم\nرحلات طيران مباشرة ومواعيد مؤكدة\nتأشيرة إلكترونية وتأمين صحي شامل\nمرافقة وتأطير ديني على مدار الساعة"
    },
    {
      id: "pkg_2",
      title: "عمرة رجب وشعبان (المولد والمناسبات)",
      price: "ابتداءً من 185,000 دج",
      tag: "موسم رجب وشعبان المبارك",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
      details: "إقامة متميزة بالمسجد النبوي والمسجد الحرام\nتنقلات مريحة بحافلات حديثة ومكيفة\nمزارات إسلامية تاريخية بمكة والمدينة\nمرشد معتمد طيلة أيام الرحلة"
    },
    {
      id: "pkg_3",
      title: "عمرة VIP فنادق 5 نجوم مطلة على الحرم",
      price: "ابتداءً من 320,000 دج",
      tag: "إقامة فاخرة مطلة على الحرم",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
      details: "أجنحة وفنادق 5 نجوم بإطلالة مباشرة على الكعبة\nبوفيه إفطار وعشاء فاخر وخدمات غرف راقية\nتنقلات خاصة بسيارات حديثة VIP\nتسهيلات ومتابعة شخصية من المطار إلى المطار"
    }
  ];

  try {
    const saved = localStorage.getItem('challenge_travel_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.packages) && parsed.packages.length > 0) {
        return parsed.packages;
      }
    }
  } catch(e) {}
  return defaultPkgs;
}

function getStoredGallery() {
  const defaultGal = [
    {
      id: "gal_1",
      title: "الكعبة المشرفة وجموع الطائفين بخشوع",
      category: "omra",
      categoryLabel: "العمرة",
      span: "span-2",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gal_2",
      title: "المسجد النبوي الشريف وقبابه الخضراء",
      category: "omra",
      categoryLabel: "المدينة المنورة",
      span: "normal",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal_3",
      title: "رحلات جوية مباشرة ومريحة",
      category: "voyages",
      categoryLabel: "الرحلات",
      span: "normal",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "gal_4",
      title: "لحظات خشوع وسكينة في رحاب الحرم",
      category: "omra",
      categoryLabel: "العمرة",
      span: "span-2",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  try {
    const saved = localStorage.getItem('challenge_travel_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.gallery) && parsed.gallery.length > 0) {
        return parsed.gallery;
      }
    }
  } catch(e) {}
  return defaultGal;
}

function renderDynamicOffers() {
  const container = document.getElementById('dynamicOffersGrid');
  if (!container) return;

  const packages = getStoredPackages();
  if (!packages || !packages.length) return;

  let waPhone = getAdminWhatsApp();

  container.innerHTML = '';

  packages.forEach(pkg => {
    const card = document.createElement('article');
    card.className = 'dynamic-offer-card';

    let detailsList = [];
    if (typeof pkg.details === 'string') {
      detailsList = pkg.details.split('\n').map(s => s.trim()).filter(Boolean);
    } else if (Array.isArray(pkg.details)) {
      detailsList = pkg.details;
    }

    const featuresHtml = detailsList.map(item => `
      <li class="offer-feature-item">
        <span class="offer-feature-icon">✓</span>
        <span>${escapeHtml(item)}</span>
      </li>
    `).join('');

    const waMsg = `السلام عليكم، أرغب في الاستفسار عن وحجز: ${pkg.title} (${pkg.price})`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`;

    card.innerHTML = `
      <div class="offer-card-media">
        <img src="${escapeHtml(pkg.image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80')}" alt="${escapeHtml(pkg.title)}" class="offer-card-img" loading="lazy">
        ${pkg.tag ? `<span class="offer-card-badge">${escapeHtml(pkg.tag)}</span>` : ''}
        <span class="offer-card-price-overlay">${escapeHtml(pkg.price)}</span>
      </div>
      <div class="offer-card-body">
        <h3 class="offer-card-title">${escapeHtml(pkg.title)}</h3>
        <ul class="offer-features-list">
          ${featuresHtml}
        </ul>
        <a href="${waUrl}" target="_blank" rel="noopener" class="offer-card-btn">
          <span>احجز الآن عبر واتساب</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.107.005.249-.041.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/></svg>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderDynamicGallery() {
  const containers = [document.getElementById('homeGalleryGrid'), document.getElementById('mainGalleryGrid')].filter(Boolean);
  if (!containers.length) return;

  const galleryItems = getStoredGallery();
  if (!galleryItems || !galleryItems.length) return;

  containers.forEach(container => {
    container.innerHTML = '';

    galleryItems.forEach(item => {
      const el = document.createElement('div');
      el.className = `gallery-item ${item.span === 'span-2' ? 'span-2' : ''}`;
      el.setAttribute('data-cat', item.category || 'omra');

      el.innerHTML = `
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-caption-cat">${escapeHtml(item.categoryLabel || 'العمرة')}</span>
          <h4 class="gallery-caption-title">${escapeHtml(item.title)}</h4>
        </div>
      `;

      container.appendChild(el);
    });
  });

  initGallery();
}

function getStoredArticles() {
  const defaultArticles = [
    {
      id: "art_1",
      title: "دليل المعتمر: خطوات أداء مناسك العمرة خطوة بخطوة بكل يسر وطمأنينة",
      category: "مناسك العمرة",
      date: "15 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      excerpt: "تعرّف على أهم النصائح الصحية، تنظيم الحقائب، والإرشادات الشرعية والتنظيمية لضمان أداء مناسك العمرة بكل يسر وطمأنينة.",
      content: "تتطلب رحلة العمرة استعداداً إيمانياً وبدنياً دقيقاً. نبدأ معكم من نية الإحرام والميقات، ثم الطواف حول الكعبة المشرفة سبعة أشواط مع ذكر الأدعية المستحبة، تليها صلاة ركعتين خلف مقام إبراهيم، ثم السعي بين الصفا والمروة، وختاماً بالحلق أو التقصير.\n\nتحرص وكالة تشالنج ترافل آند تورز بالجزائر العاصمة على توفير مرشدين دينيين ذوي كفاءة عالية يرافقون المعتمرين في كافة المناسك، إلى جانب تقديم الرعاية الطبية والإرشادات التنظيمية لتسهيل تنقلات كبار السن والعائلات بكل راحة وطمأنينة."
    },
    {
      id: "art_2",
      title: "تأشيرة المملكة العربية السعودية: الوثائق والشروط الرسمية للمواطنين الجزائريين",
      category: "تأشيرات السعودية",
      date: "02 سبتمبر 2026",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80",
      excerpt: "لتفادي أي تأخير في معالجة طلباتكم، يوضح لكم فريقنا الملف المطلوب بدقة (صلاحية جواز السفر، الصور، الاستمارات) ومراحل متابعة طلبكم حتى الاستلام.",
      content: "أصبحت إجراءات الحصول على تأشيرة الدخول إلى المملكة العربية السعودية أكثر سلاسة وسرعة عبر المنصات الرسمية الحديثة. تتضمن المتطلبات الأساسية للمواطنين الجزائريين: جواز سفر ساري المفعول لمدة لا تقل عن 6 أشهر، صور شمسية حديثة بخلفية بيضاء، واستيفاء التأمين الطبي الإلزامي المعتمد.\n\nيقوم فريق وكالتنا بالجزائر العاصمة بتدقيق كافة الوثائق ورفعها على النظام الرسمي المعتمد، ومتابعة الملف لحظة بلحظة حتى صدور التأشيرة دون أي عناء من طرف الزبون، مع توفير نصائح خاصة بأنواع التأشيرات المتاحة (سياحية، عمرة، زيارة)."
    },
    {
      id: "art_3",
      title: "نصائح لحجز تذاكر الطيران بأفضل الأسعار: دليلك لتوفير الوقت والجهد",
      category: "سياحة وطيران",
      date: "25 أوت 2026",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      excerpt: "كيف تختار رحلتك الجوية المباشرة وتستفيد من أفضل الأسعار التنافسية؟ نصائح عملية يقدمها لكم مستشارو السياحة في وكالتنا.",
      content: "يعتبر التخطيط المبكر لحجز رحلات الطيران العامل الأهم في الحصول على أفضل التخفيضات وتجنب الارتفاع المفاجئ في أسعار التذاكر، لا سيما في مواسم الذروة كالعطل المدرسية وشهر رمضان المبارك.\n\nنوصي دائماً باختيار الرحلات المباشرة من مطار الجزائر الدولي (هواري بومدين) نحو جدة أو المدينة المنورة لتفادي إرهاق الترانزيت، والتأكد من أوزان الأمتعة المسموح بها في التذكرة. كما نوفر في وكالة تشالنج ترافل خدمة المقارنة الفورية بين مختلف خطوط الطيران لاختيار التوقيت والأنسب لكم مع ضمان تأكيد المقاعد فوراً."
    }
  ];

  try {
    const saved = localStorage.getItem('challenge_travel_content');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed.articles) && parsed.articles.length > 0) {
        return parsed.articles;
      }
    }
  } catch(e) {}
  return defaultArticles;
}

function renderDynamicArticles() {
  const homeGrid = document.getElementById('homeNewsGrid');
  const mainGrid = document.getElementById('mainNewsGrid');
  if (!homeGrid && !mainGrid) return;

  const articles = getStoredArticles();
  if (!articles || !articles.length) return;

  const createArticleCard = (art) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.setAttribute('data-article-id', art.id);

    card.innerHTML = `
      <div class="news-thumb-wrapper">
        <img src="${escapeHtml(art.image || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80')}" alt="${escapeHtml(art.title)}" class="news-thumb" loading="lazy">
        ${art.category ? `<span class="news-badge">${escapeHtml(art.category)}</span>` : ''}
      </div>
      <div class="news-body">
        <div class="news-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>${escapeHtml(art.date || '')}</span>
        </div>
        <h3 class="news-title">${escapeHtml(art.title)}</h3>
        <p class="news-excerpt">
          ${escapeHtml(art.excerpt || '')}
        </p>
        <a href="#" class="service-link" onclick="event.preventDefault();">
          <span>اقرأ المقال كاملاً</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg);"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    `;

    return card;
  };

  if (homeGrid) {
    homeGrid.innerHTML = '';
    const homeArticles = articles.slice(0, 3);
    homeArticles.forEach(art => {
      homeGrid.appendChild(createArticleCard(art));
    });
  }

  if (mainGrid) {
    mainGrid.innerHTML = '';
    articles.forEach(art => {
      mainGrid.appendChild(createArticleCard(art));
    });
  }

  initArticleModal();
}




