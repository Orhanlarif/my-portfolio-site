let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
const menuOverlay = document.getElementById('menu-overlay');
const typewriterEl = document.querySelector('#typewriter');

function closeMenu() {
    navbar.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    menuOverlay.classList.toggle('active', navbar.classList.contains('active'));
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
};

menuOverlay.addEventListener('click', closeMenu);

// Mobil menüde linke tıklanınca menüyü kapat
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Dil çevirileri
const translations = {
    en: {
        'nav.cv': 'CV',
        'nav.contact': 'Contact',
        'home.greeting': "Hello, I'm Arif",
        'home.imA': "I'm a",
        'home.description': "Hello, I'm Arif. I live in Istanbul and am a 2nd-year Computer Programming student at Nişantaşı University. I have been in the software world for 2 years, dedicating the last year entirely to game development. I develop game projects using Unity and also work in web development. I bring my projects to life with my passion for learning and creating.",
        'home.contactBtn': 'Contact Me',
        'typewriter.words': ['Game Developer', 'Web Developer']
    },
    tr: {
        'nav.cv': 'CV',
        'nav.contact': 'İletişim',
        'home.greeting': "Merhaba, Ben Arif",
        'home.imA': "Ben bir",
        'home.description': "Merhaba, ben Arif. İstanbul'da yaşıyorum ve Nişantaşı Üniversitesi Bilgisayar Programcılığı 2. sınıf öğrencisiyim. 2 yıldır yazılım dünyasının içindeyim; son 1 yılımı ise tamamen oyun geliştirmeye adadım. Hem Unity ile oyun projeleri üretiyor hem de web geliştirme alanında çalışıyorum. Öğrenmeye ve üretmeye olan tutkumla projelerimi hayata geçiriyorum.",
        'home.contactBtn': 'İletişim Kur',
        'typewriter.words': ['Oyun Geliştiricisiyim', 'Web Geliştiricisiyim']
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
let typewriterWords = ['Game Developer', 'Web Developer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    document.documentElement.lang = lang === 'tr' ? 'tr' : 'en';
    
    // Typewriter kelimelerini güncelle (yeniden başlat)
    typewriterWords = translations[lang]['typewriter.words'];
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typewriterEl.textContent = '';
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

setLanguage(currentLang);

// Typewriter efekti
const typeSpeed = 80;
const deleteSpeed = 60;
const pauseAfterType = 2000;
const pauseAfterDelete = 500;

function typeWriter() {
    typewriterWords = translations[currentLang]['typewriter.words'];
    const currentWord = typewriterWords[wordIndex];
    
    if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let delay;
    if (isDeleting) {
        delay = deleteSpeed;
    } else {
        delay = typeSpeed;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        delay = pauseAfterType;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
        delay = pauseAfterDelete;
    }
    
    setTimeout(typeWriter, delay);
}

typeWriter();
