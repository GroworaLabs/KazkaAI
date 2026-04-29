export type Locale = "en" | "uk";

export interface Translations {
  brandName: string;
  nav: {
    myStories: string;
    premium: string;
    pricing: string;
    signIn: string;
  };
  form: {
    childName: string;
    childNamePlaceholder: string;
    childNameError: string;
    age: string;
    ageError: string;
    ageSuffix: (n: number) => string;
    theme: string;
    themeError: string;
    generate: string;
    generating: string;
    premiumOptions: string;
    premiumLockHint: string;
    length: string;
    lengths: { short: string; standard: string; long: string };
    mood: string;
    moods: { bedtime: string; adventure: string; funny: string; educational: string };
    occasion: string;
    occasionHint: string;
    occasions: { none: string; birthday: string; firstday: string; darkfear: string; newsibling: string };
    value: string;
    valueHint: string;
    values: { none: string; courage: string; kindness: string; sharing: string; honesty: string; friendship: string };
    friendName: string;
    friendNamePlaceholder: string;
    friendNameHint: string;
  };
  display: {
    storyFor: (name: string) => string;
    yourStory: string;
    theme: string;
    writing: string;
    done: string;
    copy: string;
    copied: string;
    share: string;
    downloadPdf: string;
    pdfPremium: string;
    newStory: string;
    errorGeneric: string;
    tryAgain: string;
    limitTitle: string;
    limitGuestMsg: string;
    limitUserMsg: string;
    register: string;
    guestSaveCta: string;
    guestSaveDesc: string;
  };
  home: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroSub: string;
    howItWorksTitle: string;
    howItWorksSub: string;
    steps: Array<{ title: string; desc: string }>;
    previewSectionTitle: string;
    previewFor: string;
    previewTheme: string;
    previewText: string;
    getForFree: string;
    testimonialsSectionTitle: string;
    storiesCreated: string;
    pricingTitle: string;
    pricingSubtitle: string;
    faqTitle: string;
    faq: Array<{ q: string; a: string }>;
    ctaTitle: string;
    ctaSub: string;
    ctaButton: string;
    registerTitle: string;
    registerSub: string;
    registerGoogle: string;
    registerEmail: string;
    registerClose: string;
    pricingTiers: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      plan: "FREE" | "PREMIUM";
      highlighted: boolean;
      cta: string;
      features: string[];
    }>;
  };
  pricingPage: {
    badge: string;
    title: string;
    subtitle: string;
    mostPopular: string;
    compareHeaders: { feature: string; free: string; premium: string };
    compareRows: Array<{ feature: string; free: string; premium: string }>;
    guarantee: string;
    pricingTiers: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      plan: "FREE" | "PREMIUM";
      highlighted: boolean;
      cta: string;
      features: string[];
    }>;
  };
  dashboard: {
    title: string;
    account: string;
    noStories: string;
    storiesCount: (n: number) => string;
    premium: string;
    free: string;
    storiesUsed: (n: number) => string;
    upgradeSuccess: string;
    allStories: string;
    upgradeCta: string;
    newStory: string;
    emptyTitle: string;
    emptyDesc: string;
    createFirst: string;
    prev: string;
    next: string;
  };
  card: {
    shareTitle: string;
    downloadPdf: string;
    shareText: (name: string, theme: string, url: string) => string;
  };
  footer: {
    tagline: string;
    product: string;
    support: string;
    legal: string;
    links: { home: string; pricing: string; myStories: string; contact: string; privacy: string; terms: string };
    rights: string;
    madeFor: string;
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
  comingSoon: string;
}

export const translations: Record<Locale, Translations> = {
  en: {
    brandName: "KazkaAI",
    nav: {
      myStories: "My Stories",
      premium: "Premium",
      pricing: "Pricing",
      signIn: "Sign In",
    },
    form: {
      childName: "Child's Name",
      childNamePlaceholder: "Emma, Lucas…",
      childNameError: "Enter the child's name",
      age: "Age",
      ageError: "Enter age",
      ageSuffix: (n) => n === 1 ? "year" : "years",
      theme: "Story Theme",
      themeError: "Choose a theme",
      generate: "Create Story",
      generating: "Writing story…",
      premiumOptions: "Customise story",
      premiumLockHint: "Sign in to unlock",
      length: "Length",
      lengths: { short: "Short", standard: "Standard", long: "Long" },
      mood: "Mood",
      moods: { bedtime: "Bedtime", adventure: "Adventure", funny: "Funny", educational: "Educational" },
      occasion: "Occasion",
      occasionHint: "What's the story for?",
      occasions: { none: "Just for fun", birthday: "🎂 Birthday", firstday: "🎒 First day", darkfear: "🌙 Fear of dark", newsibling: "👶 New sibling" },
      value: "Lesson",
      valueHint: "What should the story teach?",
      values: { none: "No focus", courage: "🦁 Courage", kindness: "💛 Kindness", sharing: "🤝 Sharing", honesty: "✨ Honesty", friendship: "🫂 Friendship" },
      friendName: "Friend in the story",
      friendNamePlaceholder: "Friend's name (optional)",
      friendNameHint: "A real friend or sibling will appear as a character",
    },
    display: {
      storyFor: (name) => `A Story for ${name}`,
      yourStory: "Your Story",
      theme: "Theme",
      writing: "Writing…",
      done: "done",
      copy: "Copy",
      copied: "Copied",
      share: "Share",
      downloadPdf: "Download PDF",
      pdfPremium: "PDF — Premium",
      newStory: "New Story",
      errorGeneric: "Something went wrong",
      tryAgain: "Try Again",
      limitTitle: "That's enough stories for today",
      limitGuestMsg: "Sign up for free and get 1 story per day. Or upgrade to Premium for unlimited access.",
      limitUserMsg: "You've used your free story for today. Premium gives unlimited access.",
      register: "Sign Up",
      guestSaveCta: "Sign up — it's free",
      guestSaveDesc: "Create a free account to save this story and generate more.",
    },
    home: {
      badge: "Personalized stories in English",
      heroTitle1: "A story where",
      heroTitle2: "your child",
      heroTitle3: "is the hero",
      heroSub: "Enter a name, age and theme — get a unique story in 10 seconds.",
      howItWorksTitle: "Three Steps to a Story",
      howItWorksSub: "Simpler than it sounds",
      steps: [
        { title: "Fill the form", desc: "Child's name, age and favourite theme — takes 30 seconds" },
        { title: "AI writes the story", desc: "In 10 seconds — a unique story where your child is the hero" },
        { title: "Read aloud", desc: "Share with family or download as a beautiful PDF" },
      ],
      previewSectionTitle: "See what it looks like",
      previewFor: "A Story for Olivia",
      previewTheme: "Theme: unicorn",
      previewText: `Once upon a time there was a girl named Olivia, who had just turned five years old. She lived on the edge of an enchanted forest where silver moonbeams flickered between the trees.\n\nOne evening Olivia heard a soft whinny outside her window. She looked out and saw a little unicorn with a rose-coloured mane, tangled in the branches of the raspberry bush…`,
      getForFree: "Get for free",
      testimonialsSectionTitle: "What Parents Say",
      storiesCreated: "Over 12,000 stories already created",
      pricingTitle: "Simple Pricing",
      pricingSubtitle: "Start for free.",
      faqTitle: "FAQ",
      faq: [
        { q: "What language are stories written in?", a: "English exclusively, with correct grammar and natural language." },
        { q: "Is the content safe for children?", a: "Yes. Only kind stories without scary scenes — configured specifically for children." },
        { q: "How much does it cost?", a: "Completely free. Sign up and get unlimited personalised stories." },
        { q: "Can I download the story?", a: "Yes — sign in and download any story as a beautifully formatted PDF." },
      ],
      ctaTitle: "Give your child a special story today",
      ctaSub: "First story — free. No credit card required.",
      ctaButton: "Create Story",
      registerTitle: "Sign up for free",
      registerSub: "Get 1 story per day at no cost",
      registerGoogle: "Continue with Google",
      registerEmail: "Continue with email",
      registerClose: "Close",
      pricingTiers: [
        {
          name: "Free", price: "$0", period: "", description: "Perfect to get started",
          plan: "FREE", highlighted: false, cta: "Start for free",
          features: ["1 story per day", "All themes & characters", "Copy & share", "Save 10 stories"],
        },
        {
          name: "Premium", price: "$3.99", period: "month", description: "Unlimited stories for the family",
          plan: "PREMIUM", highlighted: true, cta: "Try Premium",
          features: ["Unlimited stories", "PDF download", "Priority generation", "Save all stories", "24/7 support"],
        },
      ],
    },
    pricingPage: {
      badge: "Simple choice",
      title: "Simple Pricing",
      subtitle: "Start for free. Upgrade to Premium whenever you want. Cancel at any time.",
      mostPopular: "Most Popular",
      compareHeaders: { feature: "Feature", free: "Free", premium: "Premium" },
      compareRows: [
        { feature: "Stories per day", free: "1", premium: "Unlimited" },
        { feature: "Saved stories", free: "10", premium: "Unlimited" },
        { feature: "PDF download", free: "—", premium: "✓" },
        { feature: "Priority queue", free: "—", premium: "✓" },
        { feature: "All themes", free: "✓", premium: "✓" },
        { feature: "Story sharing", free: "✓", premium: "✓" },
      ],
      guarantee: "Cancel in one click · No hidden fees · Secure payment via Stripe",
      pricingTiers: [
        {
          name: "Free", price: "$0", period: "", description: "Try KazkaAI for free",
          plan: "FREE", highlighted: false, cta: "Start for free",
          features: ["1 story per day", "All 12 themes & characters", "Copy & share", "Save 10 stories", "Unique story link"],
        },
        {
          name: "Premium", price: "$3.99", period: "month", description: "Unlimited stories for your family",
          plan: "PREMIUM", highlighted: true, cta: "Try Premium",
          features: [
            "Unlimited stories",
            "Beautiful PDF download",
            "Priority generation (faster)",
            "Save all stories forever",
            "24/7 support",
            "Early access to new features",
          ],
        },
      ],
    },
    dashboard: {
      title: "My Stories",
      account: "Your account",
      noStories: "No stories yet — create your first!",
      storiesCount: (n) => `${n} ${n === 1 ? "story" : "stories"} saved`,
      premium: "Premium",
      free: "Free",
      storiesUsed: (n) => `${n}/1 stories today`,
      upgradeSuccess: "Congratulations! You've successfully upgraded to Premium. You can now create unlimited stories!",
      allStories: "All Stories",
      upgradeCta: "Premium",
      newStory: "New Story",
      emptyTitle: "No stories yet",
      emptyDesc: "Create your first personalised story for your child",
      createFirst: "Create First Story",
      prev: "← Back",
      next: "Next →",
    },
    card: {
      shareTitle: "Share",
      downloadPdf: "Download PDF",
      shareText: (name, theme, url) =>
        `I just created a story for ${name} about ${theme}! Try it for your child: ${url}`,
    },
    footer: {
      tagline: "Personalised stories for children in English.",
      product: "Product",
      support: "Support",
      legal: "Legal",
      links: { home: "Home", pricing: "Pricing", myStories: "My Stories", contact: "Contact", privacy: "Privacy", terms: "Terms" },
      rights: "All rights reserved.",
      madeFor: "Made for children everywhere",
    },
    notFound: {
      title: "Page not found",
      message: "Looks like this page got lost in the enchanted forest.",
      backHome: "Back to home",
    },
    comingSoon: "Coming soon",
  },

  uk: {
    brandName: "КазкоAI",
    nav: {
      myStories: "Мої казки",
      premium: "Преміум",
      pricing: "Ціни",
      signIn: "Увійти",
    },
    form: {
      childName: "Ім'я дитини",
      childNamePlaceholder: "Соломія, Дем'ян…",
      childNameError: "Введіть ім'я дитини",
      age: "Вік",
      ageError: "Введіть вік",
      ageSuffix: (n) => n === 1 ? "рік" : n <= 4 ? "роки" : "років",
      theme: "Тема казки",
      themeError: "Оберіть тему",
      generate: "Створити казку",
      generating: "Пишемо казку…",
      premiumOptions: "Налаштування казки",
      premiumLockHint: "Увійдіть, щоб розблокувати",
      length: "Довжина",
      lengths: { short: "Коротка", standard: "Стандарт", long: "Довга" },
      mood: "Настрій",
      moods: { bedtime: "На ніч", adventure: "Пригода", funny: "Смішна", educational: "Повчальна" },
      occasion: "Привід",
      occasionHint: "Для чого ця казка?",
      occasions: { none: "Просто так", birthday: "🎂 День народження", firstday: "🎒 Перший день", darkfear: "🌙 Страх темряви", newsibling: "👶 Молодший братик/сестричка" },
      value: "Урок",
      valueHint: "Що має донести казка?",
      values: { none: "Без акценту", courage: "🦁 Сміливість", kindness: "💛 Доброта", sharing: "🤝 Ділитись", honesty: "✨ Чесність", friendship: "🫂 Дружба" },
      friendName: "Друг у казці",
      friendNamePlaceholder: "Ім'я друга (необов'язково)",
      friendNameHint: "Реальний друг або братик/сестричка з'явиться у сюжеті",
    },
    display: {
      storyFor: (name) => `Казка для ${name}`,
      yourStory: "Ваша казка",
      theme: "Тема",
      writing: "Пишемо…",
      done: "готово",
      copy: "Копіювати",
      copied: "Скопійовано",
      share: "Поділитись",
      downloadPdf: "Завантажити PDF",
      pdfPremium: "PDF — Преміум",
      newStory: "Нова казка",
      errorGeneric: "Щось пішло не так",
      tryAgain: "Спробувати знову",
      limitTitle: "На сьогодні вже досить казок",
      limitGuestMsg: "Зареєструйтесь безкоштовно і отримайте 1 казку щодня. Або перейдіть на Преміум для необмеженого доступу.",
      limitUserMsg: "Ви вже використали свою безкоштовну казку на сьогодні. Преміум дає необмежений доступ.",
      register: "Зареєструватись",
      guestSaveCta: "Зареєструватись — безкоштовно",
      guestSaveDesc: "Створіть акаунт, щоб зберегти цю казку та генерувати більше.",
    },
    home: {
      badge: "Персональні казки українською",
      heroTitle1: "Казка, де",
      heroTitle2: "ваша дитина",
      heroTitle3: "— головний герой",
      heroSub: "Введіть ім'я, вік і тему — і за 10 секунд отримайте унікальну казку.",
      howItWorksTitle: "Три кроки до казки",
      howItWorksSub: "Простіше, ніж здається",
      steps: [
        { title: "Заповніть форму", desc: "Ім'я дитини, вік та улюблена тема — займе 30 секунд" },
        { title: "ШІ пише казку", desc: "За 10 секунд — унікальна казка, де ваша дитина головний герой" },
        { title: "Читайте вголос", desc: "Діліться з родиною або завантажуйте у красивий PDF" },
      ],
      previewSectionTitle: "Ось як виглядає результат",
      previewFor: "Казка для Соломії",
      previewTheme: "Тема: єдиноріг",
      previewText: `Жила-була дівчинка на ім'я Соломія, якій щойно виповнилося п'ять років. Вона мешкала на краю чарівного лісу, де між деревами мерехтіли срібні промені місяця.\n\nОдного вечора Соломія почула тихеньке іржання за вікном. Вона визирнула і побачила маленького єдинорога з рожевою гривою, який заплутався у гілках малинника…`,
      getForFree: "Отримати безкоштовно",
      testimonialsSectionTitle: "Що кажуть батьки",
      storiesCreated: "Понад 12 000 казок вже створено",
      pricingTitle: "Прості ціни",
      pricingSubtitle: "Починайте безкоштовно.",
      faqTitle: "Часті запитання",
      faq: [
        { q: "Якою мовою створюються казки?", a: "Виключно українською з правильною граматикою та живою мовою." },
        { q: "Чи безпечний контент для дітей?", a: "Так. Тільки добрі казки без страшних сцен — налаштовано спеціально для дітей." },
        { q: "Скільки це коштує?", a: "Безкоштовно. Зареєструйтесь і отримайте необмежену кількість казок." },
        { q: "Чи можна завантажити казку?", a: "Так — увійдіть і завантажуйте будь-яку казку у красивому PDF-форматі." },
      ],
      ctaTitle: "Подаруйте дитині особливу казку сьогодні",
      ctaSub: "Перша казка — безкоштовно. Без кредитної картки.",
      ctaButton: "Створити казку",
      registerTitle: "Зареєструйтесь безкоштовно",
      registerSub: "Отримайте 1 казку щодня безкоштовно",
      registerGoogle: "Увійти через Google",
      registerEmail: "Увійти через email",
      registerClose: "Закрити",
      pricingTiers: [
        {
          name: "Безкоштовно", price: "$0", period: "", description: "Ідеально для знайомства",
          plan: "FREE", highlighted: false, cta: "Почати безкоштовно",
          features: ["1 казка на день", "Всі теми та персонажі", "Копіювання та поширення", "Збереження 10 казок"],
        },
        {
          name: "Преміум", price: "$3.99", period: "місяць", description: "Необмежені казки для сім'ї",
          plan: "PREMIUM", highlighted: true, cta: "Спробувати Преміум",
          features: ["Необмежена кількість казок", "Завантаження PDF", "Пріоритетна генерація", "Збереження всіх казок", "Підтримка 24/7"],
        },
      ],
    },
    pricingPage: {
      badge: "Простий вибір",
      title: "Прості ціни",
      subtitle: "Починайте безкоштовно. Переходьте на Преміум коли захочете. Скасуйте в будь-який момент.",
      mostPopular: "Найпопулярніший",
      compareHeaders: { feature: "Функція", free: "Безкоштовно", premium: "Преміум" },
      compareRows: [
        { feature: "Казки на день", free: "1", premium: "Необмежено" },
        { feature: "Збережених казок", free: "10", premium: "Необмежено" },
        { feature: "Завантаження PDF", free: "—", premium: "✓" },
        { feature: "Пріоритетна черга", free: "—", premium: "✓" },
        { feature: "Всі теми", free: "✓", premium: "✓" },
        { feature: "Поширення казок", free: "✓", premium: "✓" },
      ],
      guarantee: "Скасування в один клік · Без прихованих платежів · Захищений платіж через Stripe",
      pricingTiers: [
        {
          name: "Безкоштовно", price: "$0", period: "", description: "Для знайомства з КазкоAI",
          plan: "FREE", highlighted: false, cta: "Почати безкоштовно",
          features: ["1 казка на день", "Всі 12 тем і персонажів", "Копіювання та поширення", "Збереження 10 казок", "Унікальне посилання для казки"],
        },
        {
          name: "Преміум", price: "$3.99", period: "місяць", description: "Необмежені казки для вашої родини",
          plan: "PREMIUM", highlighted: true, cta: "Спробувати Преміум",
          features: [
            "Необмежена кількість казок",
            "Завантаження PDF з красивим оформленням",
            "Пріоритетна генерація (швидше)",
            "Збереження всіх казок навічно",
            "Підтримка 24/7",
            "Ранній доступ до нових функцій",
          ],
        },
      ],
    },
    dashboard: {
      title: "Мої казки",
      account: "Ваш акаунт",
      noStories: "Поки казок немає — створіть першу!",
      storiesCount: (n) => `${n} казк${n === 1 ? "а" : n <= 4 ? "и" : ""} збережено`,
      premium: "Преміум",
      free: "Безкоштовно",
      storiesUsed: (n) => `${n}/1 казок сьогодні`,
      upgradeSuccess: "Вітаємо! Ви успішно перейшли на Преміум. Тепер ви можете створювати необмежену кількість казок!",
      allStories: "Всі казки",
      upgradeCta: "Преміум",
      newStory: "Нова казка",
      emptyTitle: "Ще немає казок",
      emptyDesc: "Створіть першу персональну казку для вашої дитини",
      createFirst: "Створити першу казку",
      prev: "← Назад",
      next: "Далі →",
    },
    card: {
      shareTitle: "Поділитись",
      downloadPdf: "Завантажити PDF",
      shareText: (name, theme, url) =>
        `Я щойно створила казку для ${name} про ${theme}! Спробуй і для своєї дитини: ${url}`,
    },
    footer: {
      tagline: "Персональні казки для дітей українською мовою.",
      product: "Продукт",
      support: "Підтримка",
      legal: "Правове",
      links: { home: "Головна", pricing: "Ціни", myStories: "Мої казки", contact: "Контакти", privacy: "Конфіденційність", terms: "Умови" },
      rights: "Всі права захищені.",
      madeFor: "Зроблено для українських дітей",
    },
    notFound: {
      title: "Сторінку не знайдено",
      message: "Схоже, ця сторінка загубилась у чарівному лісі.",
      backHome: "На головну",
    },
    comingSoon: "Скоро",
  },
};
