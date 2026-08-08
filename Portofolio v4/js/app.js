/* ==========================================================================
   PORTOFOLIO V4 - REALTIME RENDER ENGINE & DATA STORE
   Key: portofolio_v4_data | Pagination: 3 items per page for all sections
   ========================================================================== */

const STORAGE_KEY = "portofolio_v4_data";

// Pagination States
let currentSkillPage = 1;
const SKILLS_PER_PAGE = 3;

let currentProjectPage = 1;
const PROJECTS_PER_PAGE = 3;

let currentExperiencePage = 1;
const EXPERIENCES_PER_PAGE = 3;

let currentEducationPage = 1;
const EDUCATION_PER_PAGE = 3;

let currentCertificationPage = 1;
const CERTIFICATIONS_PER_PAGE = 3;

let currentServicesPage = 1;
const SERVICES_PER_PAGE = 3;

// Default Portfolio Data
const DEFAULT_PORTFOLIO_DATA = {
    updatedAt: Date.now(),
    profile: {
        name: "Farah Cella",
        title: "Senior Full Stack Web Developer & UI/UX Specialist",
        heroBio: "Saya Farah Cella, seorang Full Stack Web Developer & UI/UX Specialist berdedikasi. Berfokus pada pengembangan aplikasi web modern dengan kualifikasi arsitektur kode bersih dan estetika visual tingkat tinggi.",
        tagline: "Mengubah konsep ide kompleks menjadi pengalaman digital yang intuitif, cepat, & berdampak.",
        aboutSubtitle: "Behind The Code",
        aboutTitle: "Crafting Exceptional Digital Experiences Through Clean Code & Visual Elegance.",
        about: "Saya memiliki pengalaman lebih dari 4 tahun dalam merancang dan mengembangkan sistem aplikasi web modern. Spesialisasi saya meliputi arsitektur frontend dengan React.js/Next.js, backend RESTful microservices, serta optimasi UI/UX yang elegan & responsif.",
        yearsExp: "04+",
        projectsDone: "25+",
        happyClients: "15+",
        avatar: "./assets/foto.png",
        heroBgPhoto: "./assets/foto.png",
        aboutPhoto: "./assets/foto.png",
        cvUrl: "#",
        email: "farah.cella@example.com",
        phone: "+6281234567890",
        whatsapp: "6281234567890",
        linkedin: "https://linkedin.com/in/farah-cella",
        github: "https://github.com/farah-cella",
        instagram: "https://instagram.com/farahcella"
    },
    skills: [
        {
            id: 1,
            name: "React.js & Next.js",
            category: "Frontend Architecture",
            icon: "fa-brands fa-react",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
            description: "Pengembangan aplikasi web SSR & SPA performa tinggi dengan komponen reusable & state management modern."
        },
        {
            id: 2,
            name: "Node.js & Express API",
            category: "Backend Engineering",
            icon: "fa-brands fa-node-js",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
            description: "Arsitektur RESTful & GraphQL API scalable, otentikasi JWT secure, dan integrasi microservices."
        },
        {
            id: 3,
            name: "Tailwind CSS & Vanilla CSS",
            category: "UI Design System",
            icon: "fa-solid fa-palette",
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80",
            description: "Perancangan UI/UX responsif, glassmorphism halus, animasi CSS modern, dan standar aksosibilitas WCAG."
        },
        {
            id: 4,
            name: "PostgreSQL & MongoDB",
            category: "Database Systems",
            icon: "fa-solid fa-database",
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80",
            description: "Pemodelan basis data relasional & NoSQL, query optimization, serta manajemen migrasi data."
        },
        {
            id: 5,
            name: "TypeScript & Core JS",
            category: "Core Language",
            icon: "fa-solid fa-code",
            image: "https://images.unsplash.com/photo-1516116211223-4c7142403487?w=400&q=80",
            description: "Penulisan kode berskala besar yang type-safe, maintainable, dan berkinerja tinggi."
        },
        {
            id: 6,
            name: "AWS & Docker Deployment",
            category: "Cloud & DevOps",
            icon: "fa-brands fa-aws",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
            description: "Automasi CI/CD, kontainerisasi Docker, deployment cloud AWS EC2/S3, serta monitoring sistem."
        }
    ],
    services: [
        {
            id: 1,
            num: "01",
            title: "Full Stack Web App",
            icon: "fa-solid fa-code",
            iconColor: "text-sky-600 group-hover:bg-sky-500",
            description: "Pengembangan aplikasi web modern & responsif dengan React.js & Next.js.",
            tags: ["React.js", "Next.js", "SaaS"]
        },
        {
            id: 2,
            num: "02",
            title: "UI/UX Design Systems",
            icon: "fa-solid fa-wand-magic-sparkles",
            iconColor: "text-indigo-600 group-hover:bg-indigo-500",
            description: "Perancangan antarmuka intuitif, sistem token warna, & prototipe Figma.",
            tags: ["Figma", "UI/UX", "Tokens"]
        },
        {
            id: 3,
            num: "03",
            title: "E-Commerce & SaaS",
            icon: "fa-solid fa-bag-shopping",
            iconColor: "text-emerald-600 group-hover:bg-emerald-500",
            description: "Integrasi toko online & SaaS dengan sistem pembayaran Midtrans & Stripe.",
            tags: ["Midtrans", "Stripe", "SaaS"]
        },
        {
            id: 4,
            num: "04",
            title: "RESTful & GraphQL API",
            icon: "fa-solid fa-network-wired",
            iconColor: "text-blue-600 group-hover:bg-blue-500",
            description: "Arsitektur backend microservices aman dengan Express.js & JWT auth.",
            tags: ["Node.js", "Express", "JWT"]
        },
        {
            id: 5,
            num: "05",
            title: "Database Systems",
            icon: "fa-solid fa-database",
            iconColor: "text-teal-600 group-hover:bg-teal-500",
            description: "Desain & optimasi basis data PostgreSQL relasional & NoSQL MongoDB.",
            tags: ["PostgreSQL", "MongoDB", "SQL"]
        },
        {
            id: 6,
            num: "06",
            title: "Cloud & CI/CD Pipelines",
            icon: "fa-solid fa-cloud-arrow-up",
            iconColor: "text-cyan-600 group-hover:bg-cyan-500",
            description: "Automasi deployment cloud AWS, kontainer Docker, & CI/CD pipeline.",
            tags: ["AWS Cloud", "Docker", "CI/CD"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Fintech Executive Analytics Dashboard",
            category: "Web Application",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            description: "Platform analitik keuangan real-time dengan chart interaktif, prediksi tren transaksi, dan laporan PDF terintegrasi.",
            demoUrl: "https://example.com/demo1",
            repoUrl: "https://github.com/farah-cella/fintech-dashboard",
            technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"]
        },
        {
            id: 2,
            title: "Luxura E-Commerce Storefront",
            category: "E-Commerce",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            description: "Toko online barang mewah dengan pencarian cepat, integrasi pembayaran Midtrans, dan panel pesanan admin.",
            demoUrl: "https://example.com/demo2",
            repoUrl: "https://github.com/farah-cella/luxura-store",
            technologies: ["React.js", "Node.js", "MongoDB", "Stripe API"]
        },
        {
            id: 3,
            title: "Healthcare Remote Consultation Portal",
            category: "Healthcare SaaS",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
            description: "Sistem telemedisin interaktif dengan reservasi dokter online, konsultasi video live, dan rekam medis terenkripsi.",
            demoUrl: "https://example.com/demo3",
            repoUrl: "https://github.com/farah-cella/health-portal",
            technologies: ["Vue.js", "Express.js", "WebRTC", "PostgreSQL"]
        },
        {
            id: 4,
            title: "AI Smart Content Generator",
            category: "AI Integration",
            image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&q=80",
            description: "Aplikasi SaaS generator artikel dan media sosial berbasis OpenAI API dengan manajemen tim dan export multi-format.",
            demoUrl: "https://example.com/demo4",
            repoUrl: "https://github.com/farah-cella/ai-content-generator",
            technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Prisma"]
        }
    ],
    experiences: [
        {
            id: 1,
            role: "Senior Lead Full Stack Developer",
            company: "Nexa Digital Innovations",
            period: "2024 - Sekarang",
            location: "Jakarta, Indonesia",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
            description: "Memimpin tim 6 engineer dalam membangun aplikasi SaaS enterprise. Meningkatkan performa aplikasi hingga 40% dan mengimplementasikan arsitektur CI/CD."
        },
        {
            id: 2,
            role: "Frontend Specialist & UI Engineer",
            company: "Creative Byte Studio",
            period: "2022 - 2024",
            location: "Bandung, Indonesia",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
            description: "Merancang dan membangun antarmuka web interaktif berbasis React.js dan Next.js untuk klien internasional berskala nasional dan multinasional."
        },
        {
            id: 3,
            role: "Junior Web Developer",
            company: "Tech Start Media",
            period: "2021 - 2022",
            location: "Jakarta, Indonesia",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80",
            description: "Mengembangkan portal berita berkecepatan tinggi, optimasi SEO technical, dan integrasi CMS custom."
        }
    ],
    education: [
        {
            id: 1,
            degree: "Sarjana Ilmu Komputer (S.Kom)",
            institution: "Universitas Bina Nusantara (BINUS)",
            year: "2018 - 2022",
            score: "IPK 3.88 / 4.00 • Cum Laude",
            icon: "fa-solid fa-graduation-cap",
            description: "Fokus pada Rekayasa Perangkat Lunak, Algoritma Struktur Data, dan Antarmuka Manusia-Komputer.",
            chips: ["Software Eng", "UI/UX Architecture", "Algorithms"]
        },
        {
            id: 2,
            degree: "Full Stack Web Development Intensive",
            institution: "Hacktiv8 Indonesia",
            year: "2022",
            score: "Graduated with Honors",
            icon: "fa-solid fa-laptop-code",
            description: "Program pelatihan terakreditasi mencakup MERN Stack, TDD, Agile Methodology, dan Cloud Deployment.",
            chips: ["MERN Stack", "TDD & Testing", "Agile"]
        },
        {
            id: 3,
            degree: "UI/UX & Design Systems Specialization",
            institution: "Interaction Design Foundation (IxDF)",
            year: "2023",
            score: "Top 10% Distinction",
            icon: "fa-solid fa-palette",
            description: "Spesialisasi riset pengguna, perancangan token warna, serta arsitektur sistem desain enterprise.",
            chips: ["Design Systems", "Figma Prototyping", "UX Research"]
        }
    ],
    certifications: [
        {
            id: 1,
            title: "AWS Certified Solutions Architect - Associate",
            issuer: "Amazon Web Services",
            year: "2024",
            image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
            verifyUrl: "#"
        },
        {
            id: 2,
            title: "Meta Certified Professional Front-End Developer",
            issuer: "Meta Coursera",
            year: "2023",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
            verifyUrl: "#"
        },
        {
            id: 3,
            title: "Google Professional Cloud Developer",
            issuer: "Google Cloud Certification",
            year: "2023",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
            verifyUrl: "#"
        }
    ]
};

// Global App State
let portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));

// Load Data from LocalStorage / Backup
function loadPortfolioData() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            portfolioData = { ...DEFAULT_PORTFOLIO_DATA, ...parsed };
        } else {
            savePortfolioData(DEFAULT_PORTFOLIO_DATA);
        }
    } catch (err) {
        console.error("Error loading portfolio data:", err);
    }
}

// Save Data to LocalStorage & Cloud Sync
function savePortfolioData(newData) {
    try {
        portfolioData = newData;
        portfolioData.updatedAt = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));

        if (typeof saveToJSONBinCloud === 'function') {
            saveToJSONBinCloud(portfolioData);
        }
    } catch (err) {
        console.error("Error saving portfolio data:", err);
    }
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    loadPortfolioData();
    renderAllSections();
    setupContactForm();
});

// Render All Page Sections
function renderAllSections() {
    renderProfileAndHero();
    renderServices(currentServicesPage);
    renderProjects(currentProjectPage);
    renderSkills(currentSkillPage);
    renderExperience(currentExperiencePage);
    renderEducation(currentEducationPage);
    renderCertifications(currentCertificationPage);
    renderContactDetails();
}

// --------------------------------------------------------------------------
// 1. RENDER HERO & PROFILE
// --------------------------------------------------------------------------
function renderProfileAndHero() {
    const prof = portfolioData.profile || {};

    // Names & Titles
    const nameEls = document.querySelectorAll("#hero-title-name, #hero-name-bg, #about-name, #footer-brand-name");
    nameEls.forEach(el => { if (el) el.textContent = prof.name; });

    const titleEl = document.getElementById("hero-professional-title");
    if (titleEl) titleEl.textContent = prof.title;

    const heroBioEl = document.getElementById("hero-bio-left");
    if (heroBioEl) heroBioEl.textContent = prof.heroBio;

    const taglineEl = document.getElementById("hero-tagline-text");
    if (taglineEl) taglineEl.textContent = prof.tagline;

    // Stats
    const expEl = document.getElementById("stat-years-exp");
    if (expEl) expEl.textContent = prof.yearsExp || "04+";

    const projEl = document.getElementById("stat-projects-done");
    if (projEl) projEl.textContent = prof.projectsDone || "25+";

    const clientEl = document.getElementById("stat-happy-clients");
    if (clientEl) clientEl.textContent = prof.happyClients || "15+";

    // Photos
    const heroImg = document.getElementById("hero-photo-img");
    if (heroImg && (prof.heroBgPhoto || prof.avatar)) heroImg.src = prof.heroBgPhoto || prof.avatar;

    const aboutImg = document.getElementById("about-photo-img");
    if (aboutImg && (prof.aboutPhoto || prof.avatar)) aboutImg.src = prof.aboutPhoto || prof.avatar;

    // About Text
    const aboutTitle = document.getElementById("about-title-heading");
    if (aboutTitle && prof.aboutTitle) aboutTitle.textContent = prof.aboutTitle;

    const aboutDesc = document.getElementById("about-description");
    if (aboutDesc && prof.about) aboutDesc.textContent = prof.about;
}

// --------------------------------------------------------------------------
// 2. RENDER PROJECTS (3 ITEMS PER PAGE)
// --------------------------------------------------------------------------
function renderProjects(page = 1) {
    currentProjectPage = page;
    const grid = document.getElementById("projects-grid");
    const pagination = document.getElementById("projects-pagination");
    if (!grid) return;

    const projects = portfolioData.projects || [];
    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE) || 1;
    const startIndex = (page - 1) * PROJECTS_PER_PAGE;
    const paginatedItems = projects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-muted font-medium">Belum ada proyek yang ditambahkan.</div>`;
        if (pagination) pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = paginatedItems.map(item => `
        <div class="card-v4 flex flex-col justify-between group fade-in-up">
            <div>
                <div class="project-card-img-wrapper mb-5">
                    <img src="${item.image || './assets/foto.png'}" alt="${item.title}" class="project-card-img" onerror="this.src='./assets/foto.png'">
                    <span class="badge-category absolute top-3 left-3 shadow-md">${item.category || 'Web App'}</span>
                </div>
                <h3 class="text-xl font-bold font-display text-primary mb-2 group-hover:text-blue-primary transition-colors">${item.title}</h3>
                <p class="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">${item.description || ''}</p>
                <div class="flex flex-wrap gap-1.5 mb-5">
                    ${(item.technologies || []).map(tech => `<span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <button onclick="openProjectModal(${item.id})" class="text-xs font-bold text-blue-primary hover:underline inline-flex items-center gap-1">
                    Detail Proyek <i class="fa-solid fa-arrow-right"></i>
                </button>
                <div class="flex items-center gap-2">
                    ${item.demoUrl ? `<a href="${item.demoUrl}" target="_blank" class="w-8 h-8 rounded-full bg-blue-light text-blue-primary flex items-center justify-center hover:bg-blue-primary hover:text-white transition-colors" title="Live Demo"><i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
                    ${item.repoUrl ? `<a href="${item.repoUrl}" target="_blank" class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors" title="Source Code"><i class="fa-brands fa-github text-sm"></i></a>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagination, page, totalPages, 'renderProjects');
}

// --------------------------------------------------------------------------
// 3. RENDER SKILLS (3 ITEMS PER PAGE)
// --------------------------------------------------------------------------
function renderSkills(page = 1) {
    currentSkillPage = page;
    const grid = document.getElementById("skills-container-grid");
    const pagination = document.getElementById("skills-pagination");
    if (!grid) return;

    const skills = portfolioData.skills || [];
    const totalPages = Math.ceil(skills.length / SKILLS_PER_PAGE) || 1;
    const startIndex = (page - 1) * SKILLS_PER_PAGE;
    const paginatedItems = skills.slice(startIndex, startIndex + SKILLS_PER_PAGE);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-muted font-medium">Belum ada skill yang ditambahkan.</div>`;
        if (pagination) pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = paginatedItems.map(skill => `
        <div class="card-v4 flex items-start gap-4 fade-in-up">
            <div class="skill-icon-box shrink-0">
                <i class="${skill.icon || 'fa-solid fa-code'}"></i>
            </div>
            <div class="flex-1 min-w-0">
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-primary block mb-0.5">${skill.category || 'Technology'}</span>
                <h4 class="text-lg font-bold font-display text-primary mb-1">${skill.name}</h4>
                <p class="text-secondary text-xs leading-relaxed line-clamp-2">${skill.description || ''}</p>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagination, page, totalPages, 'renderSkills');
}

// --------------------------------------------------------------------------
// 4. RENDER EXPERIENCE (3 ITEMS PER PAGE)
// --------------------------------------------------------------------------
function renderExperience(page = 1) {
    currentExperiencePage = page;
    const timeline = document.getElementById("experience-timeline");
    const pagination = document.getElementById("experience-pagination");
    if (!timeline) return;

    const exps = portfolioData.experiences || [];
    const totalPages = Math.ceil(exps.length / EXPERIENCES_PER_PAGE) || 1;
    const startIndex = (page - 1) * EXPERIENCES_PER_PAGE;
    const paginatedItems = exps.slice(startIndex, startIndex + EXPERIENCES_PER_PAGE);

    if (paginatedItems.length === 0) {
        timeline.innerHTML = `<div class="text-center py-12 text-muted font-medium">Belum ada pengalaman kerja.</div>`;
        if (pagination) pagination.innerHTML = '';
        return;
    }

    timeline.innerHTML = paginatedItems.map(exp => `
        <div class="timeline-item-v4 mb-8 fade-in-up">
            <div class="card-v4 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-6 items-center group">
                <!-- Experience Workplace Photo -->
                <div class="md:col-span-4 h-48 md:h-full min-h-[160px] rounded-2xl overflow-hidden relative shadow-sm shrink-0">
                    <img src="${exp.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'}" alt="${exp.company}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
                    <span class="absolute bottom-3 left-3 text-[10px] font-extrabold text-white bg-sky-600/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-400/30">
                        <i class="fa-solid fa-building mr-1"></i> ${exp.company}
                    </span>
                </div>

                <!-- Experience Details -->
                <div class="md:col-span-8 flex flex-col justify-between space-y-2">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                        <span class="badge-category">${exp.period || ''}</span>
                        <span class="text-xs font-semibold text-muted"><i class="fa-solid fa-location-dot mr-1"></i>${exp.location || 'Remote'}</span>
                    </div>
                    <h3 class="text-xl font-bold font-display text-primary group-hover:text-sky-600 transition-colors">${exp.role}</h3>
                    <p class="text-blue-primary font-bold text-sm mb-1">${exp.company}</p>
                    <p class="text-secondary text-sm leading-relaxed">${exp.description || ''}</p>
                </div>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagination, page, totalPages, 'renderExperience');
}

// --------------------------------------------------------------------------
// 5. RENDER EDUCATION (3 ITEMS PER PAGE)
// --------------------------------------------------------------------------
function renderEducation(page = 1) {
    currentEducationPage = page;
    const grid = document.getElementById("education-cards-grid");
    const pagination = document.getElementById("education-pagination");
    if (!grid) return;

    const edus = portfolioData.education || (DEFAULT_PORTFOLIO_DATA && DEFAULT_PORTFOLIO_DATA.education) || [];
    const totalPages = Math.ceil(edus.length / EDUCATION_PER_PAGE) || 1;
    const startIndex = (page - 1) * EDUCATION_PER_PAGE;
    const paginatedItems = edus.slice(startIndex, startIndex + EDUCATION_PER_PAGE);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-muted font-medium">Belum ada riwayat pendidikan.</div>`;
        if (pagination) pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = paginatedItems.map((edu, idx) => {
        const isNotLast = idx < paginatedItems.length - 1;
        const cardHtml = `
            <div class="edu-round-card shrink-0 group fade-in-up">
                <span class="edu-round-year-badge">${edu.year || ''}</span>

                <div class="edu-round-node-icon">
                    <i class="${edu.icon || 'fa-solid fa-graduation-cap'}"></i>
                </div>

                <h3 class="text-sm sm:text-base font-extrabold font-display text-slate-900 leading-snug mb-1 group-hover:text-sky-600 transition-colors max-w-[210px]">
                    ${edu.degree}
                </h3>

                <p class="text-[11px] font-bold text-sky-600 mb-1.5 flex items-center gap-1 justify-center max-w-[200px]">
                    <i class="fa-solid fa-school text-[10px]"></i> ${edu.institution}
                </p>

                ${edu.score ? `
                    <div class="mb-1.5">
                        <span class="edu-score-badge text-[10px] py-0.5 px-2"><i class="fa-solid fa-trophy text-[8px]"></i> ${edu.score}</span>
                    </div>
                ` : ''}

                ${(edu.chips && edu.chips.length > 0) ? `
                    <div class="flex flex-wrap gap-1 justify-center max-w-[210px]">
                        ${edu.chips.slice(0, 2).map(chip => `<span class="tech-tag text-[9px] px-1.5 py-0.5">${chip}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        const connectorHtml = isNotLast ? `
            <!-- Desktop Horizontal Line Connector -->
            <div class="hidden md:flex items-center justify-center shrink-0 w-8 lg:w-16 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full z-0 my-auto shadow-sm">
                <i class="fa-solid fa-chevron-right text-[9px] text-sky-500 bg-white rounded-full w-4 h-4 flex items-center justify-center border border-sky-200 shadow-xs"></i>
            </div>
            <!-- Mobile Vertical Line Connector -->
            <div class="md:hidden flex items-center justify-center shrink-0 w-1 h-6 bg-gradient-to-b from-sky-400 to-blue-500 rounded-full z-0 my-1">
                <i class="fa-solid fa-chevron-down text-[8px] text-sky-500 bg-white rounded-full w-3.5 h-3.5 flex items-center justify-center border border-sky-200 shadow-xs"></i>
            </div>
        ` : '';

        return cardHtml + connectorHtml;
    }).join('');

    renderPaginationControls(pagination, page, totalPages, 'renderEducation');
}

// --------------------------------------------------------------------------
// 6. RENDER CERTIFICATIONS (3 ITEMS PER PAGE)
// --------------------------------------------------------------------------
function renderCertifications(page = 1) {
    currentCertificationPage = page;
    const grid = document.getElementById("certifications-photos-grid");
    const pagination = document.getElementById("certifications-pagination");
    if (!grid) return;

    const certs = portfolioData.certifications || [];
    const totalPages = Math.ceil(certs.length / CERTIFICATIONS_PER_PAGE) || 1;
    const startIndex = (page - 1) * CERTIFICATIONS_PER_PAGE;
    const paginatedItems = certs.slice(startIndex, startIndex + CERTIFICATIONS_PER_PAGE);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-muted font-medium">Belum ada sertifikat.</div>`;
        if (pagination) pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = paginatedItems.map(cert => `
        <div class="card-v4 flex flex-col justify-between fade-in-up">
            <div>
                <div class="project-card-img-wrapper mb-4 cursor-pointer" onclick="openCertModal('${cert.image || './assets/foto.png'}', '${cert.title}')">
                    <img src="${cert.image || './assets/foto.png'}" alt="${cert.title}" class="project-card-img" onerror="this.src='./assets/foto.png'">
                </div>
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-primary block mb-1">${cert.issuer || 'Certification'} • ${cert.year || ''}</span>
                <h4 class="text-base font-bold font-display text-primary mb-2">${cert.title}</h4>
            </div>
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button onclick="openCertModal('${cert.image || './assets/foto.png'}', '${cert.title}')" class="text-xs font-bold text-blue-primary hover:underline">
                    <i class="fa-solid fa-expand mr-1"></i> Perbesar Foto
                </button>
                ${cert.verifyUrl ? `<a href="${cert.verifyUrl}" target="_blank" class="text-xs font-semibold text-muted hover:text-primary">Verifikasi ↗</a>` : ''}
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagination, page, totalPages, 'renderCertifications');
}

// --------------------------------------------------------------------------
// 7. RENDER SERVICES (3 ITEMS PER PAGE)
// --------------------------------------------------------------------------
function renderServices(page = 1) {
    currentServicesPage = page;
    const grid = document.getElementById("services-grid");
    const pagination = document.getElementById("services-pagination");
    if (!grid) return;

    const services = portfolioData.services || (DEFAULT_PORTFOLIO_DATA && DEFAULT_PORTFOLIO_DATA.services) || [];
    const totalPages = Math.ceil(services.length / SERVICES_PER_PAGE) || 1;
    const startIndex = (page - 1) * SERVICES_PER_PAGE;
    const paginatedItems = services.slice(startIndex, startIndex + SERVICES_PER_PAGE);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-8 text-muted font-medium">Belum ada layanan.</div>`;
        if (pagination) pagination.innerHTML = '';
        return;
    }

    grid.innerHTML = paginatedItems.map(item => `
        <div class="service-card-v4 group fade-in-up">
            <div class="service-card-bar"></div>
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="service-num-badge">${item.num}</span>
                    <div class="service-icon-box ${item.iconColor || 'text-sky-600 group-hover:bg-sky-500'} group-hover:text-white">
                        <i class="${item.icon}"></i>
                    </div>
                </div>
                <h3 class="text-base font-bold font-display text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    ${item.title}
                </h3>
                <p class="text-slate-500 text-xs leading-relaxed mb-4">
                    ${item.description}
                </p>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mt-auto">
                ${(item.tags || []).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagination, page, totalPages, 'renderServices');
}

// Helper: Render Pagination UI Controls
function renderPaginationControls(container, currentPage, totalPages, renderFnName) {
    if (!container) return;
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let buttonsHtml = `
        <button onclick="${renderFnName}(${currentPage - 1})" class="page-btn" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-left text-xs"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        buttonsHtml += `
            <button onclick="${renderFnName}(${i})" class="page-btn ${i === currentPage ? 'active' : ''}">
                ${i}
            </button>
        `;
    }

    buttonsHtml += `
        <button onclick="${renderFnName}(${currentPage + 1})" class="page-btn" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
    `;

    container.innerHTML = `<div class="pagination-container">${buttonsHtml}</div>`;
}

// Render Contact Info
function renderContactDetails() {
    const prof = portfolioData.profile || {};

    const emailText = document.getElementById("contact-email-text");
    const emailLink = document.getElementById("contact-email-link");
    if (emailText) emailText.textContent = prof.email || "farah.cella@example.com";
    if (emailLink) emailLink.href = `mailto:${prof.email || 'farah.cella@example.com'}`;

    const waText = document.getElementById("contact-wa-text");
    const waLink = document.getElementById("contact-wa-link");
    if (waText) waText.textContent = prof.phone || "+62 812-3456-7890";
    if (waLink) waLink.href = `https://wa.me/${(prof.whatsapp || prof.phone || '').replace(/[^0-9]/g, '')}`;

    // Social Links
    const githubs = document.querySelectorAll("#social-github, #footer-github");
    githubs.forEach(a => { if (a) a.href = prof.github || "#"; });

    const linkedin = document.querySelectorAll("#social-linkedin, #footer-linkedin");
    linkedin.forEach(a => { if (a) a.href = prof.linkedin || "#"; });

    const instagram = document.querySelectorAll("#social-instagram, #footer-instagram");
    instagram.forEach(a => { if (a) a.href = prof.instagram || "#"; });
}

// Modal Lightbox
function openProjectModal(id) {
    const project = (portfolioData.projects || []).find(p => p.id === id);
    if (!project) return;

    const modal = document.getElementById("project-modal");
    const content = document.getElementById("project-modal-content");
    if (!modal || !content) return;

    content.innerHTML = `
        <img src="${project.image || './assets/foto.png'}" alt="${project.title}" class="w-full h-64 sm:h-80 object-cover rounded-xl mb-5" onerror="this.src='./assets/foto.png'">
        <span class="badge-category mb-2 inline-block">${project.category || 'Web App'}</span>
        <h3 class="text-2xl font-bold font-display text-primary mb-3">${project.title}</h3>
        <p class="text-secondary leading-relaxed mb-5 text-sm sm:text-base">${project.description || ''}</p>
        <div class="flex flex-wrap gap-2 mb-6">
            ${(project.technologies || []).map(t => `<span class="text-xs font-semibold px-3 py-1 rounded-full bg-blue-light text-blue-primary border border-blue-border">${t}</span>`).join('')}
        </div>
        <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn-primary-blue text-xs py-2 px-4"><i class="fa-solid fa-globe"></i> Kunjungi Live Web</a>` : ''}
            ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" class="btn-secondary-white text-xs py-2 px-4"><i class="fa-brands fa-github"></i> Repository GitHub</a>` : ''}
        </div>
    `;

    modal.classList.add("active");
}

function openCertModal(imageSrc, title) {
    const modal = document.getElementById("project-modal");
    const content = document.getElementById("project-modal-content");
    if (!modal || !content) return;

    content.innerHTML = `
        <h3 class="text-xl font-bold font-display text-primary mb-4">${title}</h3>
        <img src="${imageSrc}" alt="${title}" class="w-full max-h-[70vh] object-contain rounded-xl shadow-md" onerror="this.src='./assets/foto.png'">
    `;

    modal.classList.add("active");
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    if (modal) modal.classList.remove("active");
}

// Contact Form Handler
function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contact-name").value;
        const email = document.getElementById("contact-email").value;
        const message = document.getElementById("contact-message").value;

        alert(`Terima kasih ${name}! Pesan Anda telah terkirim.\nKami akan segera menghubungi Anda di ${email}.`);
        form.reset();
    });
}
