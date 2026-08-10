/* ==========================================================================
   PORTOFOLIO V5 - EXACT V3 STRUCTURE WITH CREATIX DESIGN SYSTEM
   ========================================================================== */

const DB_VERSION = "v5.2_exact_v3_structure";

// Pagination State Management (EXACTLY 3 ITEMS PER PAGE FOR ALL SECTIONS)
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

// Default Dataset - Exactly matching Portofolio v3 Data Structure
const DEFAULT_PORTFOLIO_DATA = {
    updatedAt: Date.now(),
    profile: {
        name: "Kevin",
        title: "Full Stack Web Developer & Creative Specialist",
        heroBio: "Halo, saya Kevin. Selamat datang di portofolio personal & showcase karya profesional saya.",
        tagline: "Menciptakan solusi digital berestetika tinggi dan performa optimal.",
        aboutSubtitle: "Behind The Code",
        aboutTitle: "Solusi Digital Berbasis Teknologi Modern & Desain Elegan.",
        about: "Saya berfokus pada pembuatan aplikasi web responsif, arsitektur kode yang bersih, dan antarmuka pengguna yang intuitif.",
        yearsExp: "04+",
        projectsDone: "25+",
        happyClients: "15+",
        avatar: "./assets/bg-orang.png",
        heroBgPhoto: "./assets/bg-orang.png",
        aboutPhoto: "./assets/bg-orang.png",
        cvUrl: "#",
        email: "Kevin@example.com",
        phone: "+628123456789",
        whatsapp: "628123456789",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com"
    },
    projects: [
        {
            id: 1,
            title: "Fintech Ecosystem & Dashboard",
            category: "Web Application",
            tags: ["React", "TypeScript", "TailwindCSS"],
            image: "./assets/bg-orang.png",
            description: "Platform analitik keuangan modern dengan visualisasi data transaksi real-time, arsitektur responsif, dan antarmuka dark mode.",
            demoUrl: "https://example.com/demo1",
            repoUrl: "https://github.com/example/demo1"
        },
        {
            id: 2,
            title: "Creatix AI Content Studio",
            category: "SaaS Platform",
            tags: ["Next.js", "Node.js", "AI Integration"],
            image: "./assets/bg-orang.png",
            description: "Aplikasi berbasis kecerdasan buatan untuk membantu desainer dan pembuat konten menghasilkan konten visual berkualitas secara efisien.",
            demoUrl: "https://example.com/demo2",
            repoUrl: "https://github.com/example/demo2"
        },
        {
            id: 3,
            title: "Luxe E-Commerce Storefront",
            category: "E-Commerce",
            tags: ["Full Stack", "Stripe API", "Animation"],
            image: "./assets/bg-orang.png",
            description: "Toko online performa tinggi untuk brand fashion eksklusif dengan sistem checkout instan dan animasi interaktif.",
            demoUrl: "https://example.com/demo3",
            repoUrl: "https://github.com/example/demo3"
        },
        {
            id: 4,
            title: "Healthcare Telemedicine App",
            category: "Mobile App & Web",
            tags: ["UI/UX", "React Native", "WebRTC"],
            image: "./assets/bg-orang.png",
            description: "Aplikasi layanan kesehatan untuk janji temu dokter online, konsultasi video, dan manajemen rekam medis digital.",
            demoUrl: "https://example.com/demo4",
            repoUrl: "https://github.com/example/demo4"
        }
    ],
    skills: [
        { id: 1, name: "Frontend Development (React/Next)", level: 95, category: "Frontend", icon: "fa-code" },
        { id: 2, name: "Backend APIs & Node.js", level: 90, category: "Backend", icon: "fa-server" },
        { id: 3, name: "UI/UX & Design Systems", level: 88, category: "Design", icon: "fa-palette" },
        { id: 4, name: "Database Architecture", level: 85, category: "Database", icon: "fa-database" },
        { id: 5, name: "Cloud & DevOps (Vercel/Docker)", level: 80, category: "DevOps", icon: "fa-cloud" }
    ],
    experiences: [
        {
            id: 1,
            role: "Lead Full Stack Developer",
            company: "Creatix Digital Studio",
            period: "2022 - Sekarang",
            description: "Memimpin pengembangan sistem aplikasi web berskala besar, mengelola arsitektur frontend/backend, dan optimasi performa."
        },
        {
            id: 2,
            role: "Senior Frontend Engineer",
            company: "TechNova Solutions",
            period: "2020 - 2022",
            description: "Membangun komponen UI/UX responsif untuk ribuan pengguna aktif dengan arsitektur kode yang bersih dan modular."
        },
        {
            id: 3,
            role: "Web Specialist",
            company: "PixelCraft Agency",
            period: "2018 - 2020",
            description: "Merancang dan mengembangkan website portofolio, landing page, dan aplikasi interaktif untuk berbagai klien."
        }
    ],
    education: [
        {
            id: 1,
            degree: "Sarjana Komputer (S.Kom)",
            institution: "Universitas Teknologi Informatika",
            period: "2015 - 2019",
            description: "Lulus dengan predikat Pujian (Cum Laude). Fokus studi Rekayasa Perangkat Lunak & Sistem Informasi."
        },
        {
            id: 2,
            degree: "Sertifikasi UI/UX & Web Development",
            institution: "Global Digital Academy",
            period: "2021",
            description: "Program intensif pengembangan sistem desain antarmuka modern dan arsitektur aplikasi berbasis web."
        }
    ],
    certifications: [
        {
            id: 1,
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            year: "2023",
            image: "./assets/bg-orang.png"
        },
        {
            id: 2,
            title: "Meta Certified Senior Front-End Developer",
            issuer: "Meta",
            year: "2022",
            image: "./assets/bg-orang.png"
        }
    ]
};

// --------------------------------------------------------------------------
// LOCALSTORAGE DB CONTROLLER (EXACT V3 DATA MODEL)
// --------------------------------------------------------------------------
function getPortfolioData() {
    const saved = localStorage.getItem('destina_portfolio_db');
    const version = localStorage.getItem('destina_db_version');

    if (!saved || version !== DB_VERSION) {
        localStorage.setItem('destina_portfolio_db', JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        localStorage.setItem('destina_db_version', DB_VERSION);
        return DEFAULT_PORTFOLIO_DATA;
    }

    try {
        const parsed = JSON.parse(saved);
        if (!parsed.profile) parsed.profile = DEFAULT_PORTFOLIO_DATA.profile;
        if (!parsed.skills) parsed.skills = DEFAULT_PORTFOLIO_DATA.skills;
        if (!parsed.experiences) parsed.experiences = DEFAULT_PORTFOLIO_DATA.experiences;
        if (!parsed.projects) parsed.projects = DEFAULT_PORTFOLIO_DATA.projects;
        if (!parsed.education) parsed.education = DEFAULT_PORTFOLIO_DATA.education;
        if (!parsed.certifications) parsed.certifications = DEFAULT_PORTFOLIO_DATA.certifications;

        if (!parsed.profile.name || parsed.profile.name === 'Jova') parsed.profile.name = "Kevin";
        if (parsed.profile.heroBio && parsed.profile.heroBio.includes("Jova")) {
            parsed.profile.heroBio = parsed.profile.heroBio.replace(/Jova/g, "Kevin");
        }
        if (parsed.profile.email && parsed.profile.email.includes("jova@")) {
            parsed.profile.email = parsed.profile.email.replace("jova@", "kevin@");
        }

        if (!parsed.profile.avatar) parsed.profile.avatar = "./assets/bg-orang.png";
        if (!parsed.profile.heroBgPhoto) parsed.profile.heroBgPhoto = "./assets/bg-orang.png";
        if (!parsed.profile.aboutPhoto) parsed.profile.aboutPhoto = "./assets/bg-orang.png";

        localStorage.setItem('destina_portfolio_db', JSON.stringify(parsed));
        return parsed;
    } catch (e) {
        console.error("DB Parse error, resetting to clean template", e);
        localStorage.setItem('destina_portfolio_db', JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        localStorage.setItem('destina_db_version', DB_VERSION);
        return DEFAULT_PORTFOLIO_DATA;
    }
}

function savePortfolioData(data) {
    data.updatedAt = Date.now();
    localStorage.setItem('destina_portfolio_db', JSON.stringify(data));
    renderAllPortfolioSections();
}

function resetPortfolioData() {
    const cleanData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    cleanData.updatedAt = Date.now();
    localStorage.setItem('destina_portfolio_db', JSON.stringify(cleanData));
    localStorage.setItem('destina_db_version', DB_VERSION);
    currentSkillPage = 1;
    currentProjectPage = 1;
    currentExperiencePage = 1;
    currentEducationPage = 1;
    currentCertificationPage = 1;
    renderAllPortfolioSections();
    showToast("Data portofolio telah direset ke template bersih!", "info");
}

// --------------------------------------------------------------------------
// UI RENDERING ENGINE (EXACT V3 SECTIONS)
// --------------------------------------------------------------------------
function renderAllPortfolioSections() {
    const db = getPortfolioData();
    const prof = db.profile || DEFAULT_PORTFOLIO_DATA.profile;

    // Dynamic Font Family Application from Admin Settings
    if (prof.fontDisplay) {
        document.documentElement.style.setProperty('--font-display', `'${prof.fontDisplay}', sans-serif`);
    }
    if (prof.fontSans) {
        document.documentElement.style.setProperty('--font-sans', `'${prof.fontSans}', sans-serif`);
    }
    if (prof.fontScript) {
        document.documentElement.style.setProperty('--font-script', `'${prof.fontScript}', cursive, sans-serif`);
    }

    // 1. Profile Name & Branding
    const bgName = document.getElementById('hero-name-bg');
    if (bgName) bgName.textContent = (prof.name || "Kevin").toUpperCase();

    const titleName = document.getElementById('hero-title-name');
    if (titleName) titleName.textContent = prof.name || "Kevin";

    const footerBrand = document.getElementById('footer-brand-name');
    if (footerBrand) footerBrand.textContent = prof.name || "Kevin";

    const footerCopy = document.getElementById('footer-copyright-text');
    if (footerCopy) footerCopy.textContent = `© 2026 ${prof.name || 'Kevin'}. All rights reserved.`;

    // Photos
    const heroBgPhoto = document.getElementById('hero-bg-photo');
    if (heroBgPhoto) {
        heroBgPhoto.src = prof.heroBgPhoto || prof.avatar || "./assets/bg-orang.png";
    }

    const aboutPhoto = document.getElementById('about-photo');
    if (aboutPhoto) {
        aboutPhoto.src = prof.aboutPhoto || prof.avatar || "./assets/bg-orang.png";
    }

    // Hero Bio & Tagline
    const bioLeft = document.getElementById('hero-bio-left');
    if (bioLeft) bioLeft.textContent = prof.heroBio || `Halo, Saya ${prof.name || 'Kevin'}, seorang ${prof.title || 'Specialist'}.`;

    const tagRight = document.getElementById('hero-tagline-right');
    if (tagRight) tagRight.textContent = prof.tagline || "";

    // Hero Stats Counter
    const statExp = document.getElementById('stat-years-exp');
    if (statExp) statExp.textContent = prof.yearsExp || "04+";

    const statProjects = document.getElementById('stat-projects-done');
    if (statProjects) statProjects.textContent = prof.projectsDone || "25+";

    const statClients = document.getElementById('stat-happy-clients');
    if (statClients) statClients.textContent = prof.happyClients || "15+";

    // About Me Content
    const aboutSubtitle = document.getElementById('about-subtitle-tag');
    if (aboutSubtitle) aboutSubtitle.textContent = prof.aboutSubtitle || "Behind The Code";

    const aboutTitle = document.getElementById('about-title-heading');
    if (aboutTitle) aboutTitle.textContent = prof.aboutTitle || "Crafting Exceptional Digital Experiences.";

    const aboutDesc = document.getElementById('about-description');
    if (aboutDesc) aboutDesc.textContent = prof.about || "";

    // Direct Contacts & Social Links
    const emailText = document.getElementById('contact-email-text');
    if (emailText) emailText.textContent = prof.email || "";

    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) emailLink.href = `mailto:${prof.email || ''}`;

    const waText = document.getElementById('contact-wa-text');
    if (waText) waText.textContent = prof.whatsapp || prof.phone || "";

    const waLink = document.getElementById('contact-wa-link');
    if (waLink) waLink.href = `https://wa.me/${prof.whatsapp}?text=Halo%20${encodeURIComponent(prof.name)},%20saya%20tertarik%20berkolaborasi.`;

    const ghLink = document.getElementById('social-github');
    if (ghLink) ghLink.href = prof.github || "#";

    const liLink = document.getElementById('social-linkedin');
    if (liLink) liLink.href = prof.linkedin || "#";

    const igLink = document.getElementById('social-instagram');
    if (igLink) igLink.href = prof.instagram || "#";

    const ghFooter = document.getElementById('footer-github');
    if (ghFooter) ghFooter.href = prof.github || "#";

    const liFooter = document.getElementById('footer-linkedin');
    if (liFooter) liFooter.href = prof.linkedin || "#";

    const igFooter = document.getElementById('footer-instagram');
    if (igFooter) igFooter.href = prof.instagram || "#";

    // Render 5 Main Sections (3 items per page each)
    renderProjectsSection(db.projects);
    renderSkillsSection(db.skills);
    renderExperienceSection(db.experiences);
    renderEducationSection(db.education);
    renderCertificationsSection(db.certifications);
}

// --------------------------------------------------------------------------
// 1. FEATURED PROJECTS RENDERER (3 PER PAGE)
// --------------------------------------------------------------------------
function renderProjectsSection(projectsList) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    const list = projectsList || [];
    const totalPages = Math.ceil(list.length / PROJECTS_PER_PAGE) || 1;
    if (currentProjectPage > totalPages) currentProjectPage = totalPages;

    const startIndex = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    const paginatedItems = list.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 font-medium">Belum ada proyek ditambahkan.</div>`;
    } else {
        container.innerHTML = paginatedItems.map(p => `
            <div class="project-card flex flex-col justify-between">
                <div>
                    <div class="relative h-48 rounded-t-2xl overflow-hidden">
                        <img src="${p.image || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-full h-full object-cover" alt="${p.title}">
                        <span class="absolute top-4 left-4 bg-[#99f026] text-[#0b0c10] font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                            ${p.category || 'Featured'}
                        </span>
                    </div>
                    <div class="p-6 space-y-3">
                        <h3 class="text-xl font-bold font-display text-white">${p.title}</h3>
                        <p class="text-slate-300 text-sm leading-relaxed line-clamp-3">${p.description}</p>
                        <div class="flex flex-wrap gap-2 pt-2">
                            ${(p.tags || []).map(t => `<span class="bg-[#141721] border border-white/10 text-xs text-[#99f026] font-semibold px-2.5 py-1 rounded-full">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="p-6 pt-0 border-t border-white/10 mt-4 flex items-center justify-between">
                    <button onclick="openProjectModal(${p.id})" class="text-xs font-bold text-[#99f026] hover:underline flex items-center gap-1">
                        <span>Detail Proyek</span> <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                    ${p.demoUrl ? `<a href="${p.demoUrl}" target="_blank" class="text-xs font-bold text-white hover:text-[#99f026]"><i class="fa-solid fa-external-link"></i> Demo</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderPaginationControls('projects-pagination', currentProjectPage, totalPages, (page) => {
        currentProjectPage = page;
        renderProjectsSection(list);
    });
}

// --------------------------------------------------------------------------
// 2. TECHNICAL SKILLS RENDERER (3 PER PAGE)
// --------------------------------------------------------------------------
function renderSkillsSection(skillsList) {
    const container = document.getElementById('skills-container-grid');
    if (!container) return;

    const list = skillsList || [];
    const totalPages = Math.ceil(list.length / SKILLS_PER_PAGE) || 1;
    if (currentSkillPage > totalPages) currentSkillPage = totalPages;

    const startIndex = (currentSkillPage - 1) * SKILLS_PER_PAGE;
    const paginatedItems = list.slice(startIndex, startIndex + SKILLS_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 font-medium">Belum ada data keahlian.</div>`;
    } else {
        container.innerHTML = paginatedItems.map(s => `
            <div class="skill-card">
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-[#99f026]/12 border border-[#99f026]/30 text-[#99f026] flex items-center justify-center text-lg font-bold">
                            <i class="fa-solid ${s.icon || 'fa-code'}"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-white text-base">${s.name}</h4>
                            <span class="text-xs text-slate-400 font-semibold">${s.category || 'General'}</span>
                        </div>
                    </div>
                    <span class="font-display font-extrabold text-[#99f026] text-lg">${s.level}%</span>
                </div>
                <div class="skill-progress-bar">
                    <div class="skill-progress-fill" style="width: ${s.level}%;"></div>
                </div>
            </div>
        `).join('');
    }

    renderPaginationControls('skills-pagination', currentSkillPage, totalPages, (page) => {
        currentSkillPage = page;
        renderSkillsSection(list);
    });
}

// --------------------------------------------------------------------------
// 3. WORK EXPERIENCE TIMELINE (3 PER PAGE)
// --------------------------------------------------------------------------
function renderExperienceSection(expList) {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    const list = expList || [];
    const totalPages = Math.ceil(list.length / EXPERIENCES_PER_PAGE) || 1;
    if (currentExperiencePage > totalPages) currentExperiencePage = totalPages;

    const startIndex = (currentExperiencePage - 1) * EXPERIENCES_PER_PAGE;
    const paginatedItems = list.slice(startIndex, startIndex + EXPERIENCES_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-slate-500 font-medium">Belum ada pengalaman kerja.</div>`;
    } else {
        container.innerHTML = paginatedItems.map(e => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="bg-[#181b26] border border-white/10 rounded-2xl p-6 hover:border-[#99f026]/40 transition-all">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 class="text-xl font-bold font-display text-white">${e.role}</h4>
                        <span class="bg-[#99f026]/12 border border-[#99f026]/30 text-[#99f026] font-bold text-xs px-3 py-1 rounded-full w-fit">
                            ${e.period}
                        </span>
                    </div>
                    <h5 class="text-sm font-semibold text-slate-300 mb-3">${e.company}</h5>
                    <p class="text-slate-400 text-sm leading-relaxed">${e.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderPaginationControls('experience-pagination', currentExperiencePage, totalPages, (page) => {
        currentExperiencePage = page;
        renderExperienceSection(list);
    });
}

// --------------------------------------------------------------------------
// 4. EDUCATION CARDS (3 PER PAGE)
// --------------------------------------------------------------------------
function renderEducationSection(eduList) {
    const container = document.getElementById('education-cards-grid');
    if (!container) return;

    const list = eduList || [];
    const totalPages = Math.ceil(list.length / EDUCATION_PER_PAGE) || 1;
    if (currentEducationPage > totalPages) currentEducationPage = totalPages;

    const startIndex = (currentEducationPage - 1) * EDUCATION_PER_PAGE;
    const paginatedItems = list.slice(startIndex, startIndex + EDUCATION_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 font-medium">Belum ada riwayat pendidikan.</div>`;
    } else {
        container.innerHTML = paginatedItems.map(edu => `
            <div class="bg-[#181b26] border border-white/10 rounded-2xl p-6 hover:border-[#99f026]/40 transition-all space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-[#99f026] uppercase tracking-wider">${edu.period}</span>
                    <i class="fa-solid fa-graduation-cap text-[#99f026] text-xl"></i>
                </div>
                <h4 class="text-lg font-bold text-white font-display">${edu.degree}</h4>
                <p class="text-sm font-semibold text-slate-300">${edu.institution}</p>
                <p class="text-xs text-slate-400 leading-relaxed">${edu.description || ''}</p>
            </div>
        `).join('');
    }

    renderPaginationControls('education-pagination', currentEducationPage, totalPages, (page) => {
        currentEducationPage = page;
        renderEducationSection(list);
    });
}

// --------------------------------------------------------------------------
// 5. CERTIFICATIONS PHOTO SHOWCASE (3 PER PAGE)
// --------------------------------------------------------------------------
function renderCertificationsSection(certList) {
    const container = document.getElementById('certifications-photos-grid');
    if (!container) return;

    const list = certList || [];
    const totalPages = Math.ceil(list.length / CERTIFICATIONS_PER_PAGE) || 1;
    if (currentCertificationPage > totalPages) currentCertificationPage = totalPages;

    const startIndex = (currentCertificationPage - 1) * CERTIFICATIONS_PER_PAGE;
    const paginatedItems = list.slice(startIndex, startIndex + CERTIFICATIONS_PER_PAGE);

    if (paginatedItems.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-500 font-medium">Belum ada sertifikat ditambahkan.</div>`;
    } else {
        container.innerHTML = paginatedItems.map(c => `
            <div class="bg-[#181b26] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#99f026]/40 transition-all">
                <div class="h-48 overflow-hidden relative cursor-pointer" onclick="openCertImageModal('${c.image || './assets/bg-orang.png'}', '${c.title}')">
                    <img src="${c.image || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${c.title}">
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
                        <i class="fa-solid fa-expand text-xl"></i>
                    </div>
                </div>
                <div class="p-5">
                    <span class="text-[11px] font-bold text-[#99f026] uppercase tracking-wider block mb-1">${c.year || '2023'} • ${c.issuer}</span>
                    <h4 class="font-bold text-white text-base leading-snug">${c.title}</h4>
                </div>
            </div>
        `).join('');
    }

    renderPaginationControls('certifications-pagination', currentCertificationPage, totalPages, (page) => {
        currentCertificationPage = page;
        renderCertificationsSection(list);
    });
}

// --------------------------------------------------------------------------
// REUSABLE PAGINATION CONTROLS
// --------------------------------------------------------------------------
function renderPaginationControls(containerId, currentPage, totalPages, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    window[`_onPageChange_${containerId}`] = onPageChange;

    let buttonsHtml = `
        <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window['_onPageChange_${containerId}'](${currentPage - 1})">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        buttonsHtml += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window['_onPageChange_${containerId}'](${i})">
                ${i}
            </button>
        `;
    }

    buttonsHtml += `
        <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window['_onPageChange_${containerId}'](${currentPage + 1})">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;

    container.innerHTML = `<div class="pagination-wrapper">${buttonsHtml}</div>`;
}

// --------------------------------------------------------------------------
// MODAL & UTILITY ENGINE
// --------------------------------------------------------------------------
function openProjectModal(id) {
    const db = getPortfolioData();
    const proj = (db.projects || []).find(p => p.id === id);
    if (!proj) return;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');

    content.innerHTML = `
        <div class="space-y-6">
            <div class="h-64 sm:h-80 rounded-2xl overflow-hidden">
                <img src="${proj.image || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-full h-full object-cover" alt="${proj.title}">
            </div>
            <span class="bg-[#99f026] text-[#0b0c10] text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">${proj.category || 'Featured'}</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white font-display">${proj.title}</h2>
            <p class="text-slate-300 text-base leading-relaxed">${proj.description}</p>
            <div class="flex flex-wrap gap-2">
                ${(proj.tags || []).map(t => `<span class="bg-[#141721] border border-white/10 text-xs text-[#99f026] font-semibold px-3 py-1 rounded-full">${t}</span>`).join('')}
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-white/10">
                ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank" class="btn-lime-pill text-xs px-6 py-3"><i class="fa-solid fa-external-link"></i> Live Demo</a>` : ''}
                ${proj.repoUrl ? `<a href="${proj.repoUrl}" target="_blank" class="btn-dark-pill text-xs px-6 py-3"><i class="fa-brands fa-github"></i> Repository</a>` : ''}
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function openCertImageModal(imgSrc, title) {
    const modal = document.getElementById('project-modal');
    const content = document.getElementById('project-modal-content');

    content.innerHTML = `
        <div class="space-y-4 text-center">
            <h3 class="text-xl font-bold text-white font-display mb-2">${title}</h3>
            <div class="max-h-[70vh] rounded-2xl overflow-hidden border border-white/10">
                <img src="${imgSrc}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-full h-auto object-contain mx-auto" alt="${title}">
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.style.display = 'none';
}

function showToast(message, type = "success") {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'toast-box';
        document.body.appendChild(toast);
    }
    const icon = type === 'success' ? 'fa-check-circle text-[#99f026]' : 'fa-info-circle text-amber-400';
    toast.innerHTML = `<i class="fa-solid ${icon} text-lg"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderAllPortfolioSections();

    // Scroll Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            if (backToTopBtn) backToTopBtn.classList.add('visible');
        } else {
            if (backToTopBtn) backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Desktop Nav Menu Dropdown Handler
    const navToggleBtn = document.getElementById('desktop-nav-toggle');
    const navDropdown = document.getElementById('desktop-nav-dropdown');
    const navChevron = document.getElementById('desktop-nav-chevron');

    if (navToggleBtn && navDropdown) {
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !navDropdown.classList.contains('hidden');
            if (isOpen) {
                navDropdown.classList.add('hidden');
                if (navChevron) navChevron.style.transform = 'rotate(0deg)';
            } else {
                navDropdown.classList.remove('hidden');
                if (navChevron) navChevron.style.transform = 'rotate(180deg)';
            }
        });

        // Close dropdown when clicking any dropdown item
        const dropdownItems = navDropdown.querySelectorAll('.nav-dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                navDropdown.classList.add('hidden');
                if (navChevron) navChevron.style.transform = 'rotate(0deg)';
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggleBtn.contains(e.target) && !navDropdown.contains(e.target)) {
                navDropdown.classList.add('hidden');
                if (navChevron) navChevron.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Contact Form Submit Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            showToast(`Terima kasih ${name}! Pesan Anda telah berhasil terkirim.`, "success");
            contactForm.reset();
        });
    }
});
