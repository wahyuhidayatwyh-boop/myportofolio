/* ==========================================================================
   PORTOFOLIO V6 - EXECUTIVE CREATIX DESIGN ENGINE
   ========================================================================== */

const DB_VERSION = "v6.0_executive_white_card";
const STORAGE_KEY = "PORTFOLIO_DATA_V6";
const FALLBACK_STORAGE_KEY = "PORTFOLIO_DATA_V5";

// Pagination State (3 items per page)
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

// Default Dataset - Exactly matching Portofolio v5 / v3 Data Structure
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
            period: "2023 - Sekarang",
            description: "Memimpin tim pengembang dalam membangun platform SaaS modern, mengoptimalkan arsitektur frontend, dan menerapkan CI/CD pipeline.",
            skills: ["React", "Next.js", "Node.js", "System Architecture"]
        },
        {
            id: 2,
            role: "Senior Frontend Engineer",
            company: "Tech Innovators Inc",
            period: "2021 - 2023",
            description: "Mengembangkan antarmuka aplikasi web kompleks berbasis mikro-frontend, meningkatkan performa sistem hingga 40%.",
            skills: ["TypeScript", "TailwindCSS", "State Management"]
        },
        {
            id: 3,
            role: "UI/UX & Web Developer",
            company: "Digital Solution Lab",
            period: "2020 - 2021",
            description: "Merancang wireframe, desainer UI/UX interaktif, serta mengimplementasikan landing page responsif tinggi.",
            skills: ["Figma", "HTML5/CSS3", "JavaScript"]
        }
    ],
    education: [
        {
            id: 1,
            degree: "Sarjana Komputer (S.Kom) - Teknik Informatika",
            institution: "Universitas Teknologi Indonesia",
            year: "2018 - 2022",
            description: "Lulus dengan predikat Cum Laude. Berfokus pada Rekayasa Perangkat Lunak & Kecerdasan Buatan."
        },
        {
            id: 2,
            degree: "Full Stack Web Development Certification",
            institution: "Global Tech Academy",
            year: "2022",
            description: "Program pelatihan intensif Full Stack MERN Development (MongoDB, Express, React, Node.js)."
        }
    ],
    certifications: [
        {
            id: 1,
            title: "AWS Certified Developer - Associate",
            issuer: "Amazon Web Services",
            year: "2023",
            image: "./assets/bg-orang.png"
        },
        {
            id: 2,
            title: "Professional Scrum Master (PSM I)",
            issuer: "Scrum.org",
            year: "2023",
            image: "./assets/bg-orang.png"
        },
        {
            id: 3,
            title: "Meta Front-End Developer Specialization",
            issuer: "Meta / Coursera",
            year: "2022",
            image: "./assets/bg-orang.png"
        }
    ]
};

// Data Store Loader
function getPortfolioData() {
    try {
        const storedV6 = localStorage.getItem(STORAGE_KEY);
        if (storedV6) return JSON.parse(storedV6);

        const storedV5 = localStorage.getItem(FALLBACK_STORAGE_KEY);
        if (storedV5) {
            const data = JSON.parse(storedV5);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return data;
        }
    } catch (e) {
        console.error("Error reading localStorage", e);
    }
    return DEFAULT_PORTFOLIO_DATA;
}

// Global active data object
let appData = getPortfolioData();

// App Initialization
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderProfile();
    renderStats();
    renderProjects();
    renderSkills();
    renderExperiences();
    renderEducation();
    renderCertifications();
    renderContactInfo();
    initContactForm();
    initBackToTop();
});

// 1. Navigation & Dropdown Controls
function initNavigation() {
    const toggleBtn = document.getElementById("desktop-nav-toggle");
    const dropdown = document.getElementById("desktop-nav-dropdown");
    const chevron = document.getElementById("desktop-nav-chevron");

    if (toggleBtn && dropdown) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
            if (chevron) chevron.classList.toggle("rotate-180");
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
                dropdown.classList.add("hidden");
                if (chevron) chevron.classList.remove("rotate-180");
            }
        });
    }

    // Active Link ScrollSpy Handler with Manual Click Lock
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll('.nav-link-mockup, .nav-bottom-item, .nav-dropdown-item');
    let isManualClick = false;
    let manualClickTimer = null;

    function updateActiveNavState() {
        if (isManualClick) return; // Prevent scroll animation from overriding active state on click

        let currentSectionId = "home";
        const scrollPosition = window.scrollY + (window.innerHeight * 0.35);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navAnchors.forEach(anchor => {
            const href = anchor.getAttribute("href");
            if (href === `#${currentSectionId}`) {
                anchor.classList.add("active");
            } else {
                anchor.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavState);
    updateActiveNavState();

    // Smooth scroll for all internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    if (dropdown) dropdown.classList.add("hidden");

                    // 1. Immediately switch active pill state to target link
                    navAnchors.forEach(a => {
                        if (a.getAttribute('href') === targetId) {
                            a.classList.add('active');
                        } else {
                            a.classList.remove('active');
                        }
                    });

                    // 2. Lock scrollspy for 850ms during smooth scroll movement
                    isManualClick = true;
                    clearTimeout(manualClickTimer);
                    manualClickTimer = setTimeout(() => {
                        isManualClick = false;
                        updateActiveNavState();
                    }, 850);

                    // 3. Scroll to target element smoothly
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// 2. Render Profile & Hero Section
function renderProfile() {
    const p = appData.profile;
    if (!p) return;

    // Header & Hero elements
    setText("brand-logo-name", p.name || "Kevin");
    setText("hero-title-name", p.name || "Kevin");
    setText("hero-title-role", p.title || "Full Stack Web Developer & Creative Specialist");
    setText("hero-bio-left", p.heroBio || p.about || "");
    setText("hero-tagline-right", p.tagline || "");

    // Hero background photo overlay
    const heroSection = document.getElementById("home");
    if (heroSection) {
        const bgImg = p.heroBgPhoto || p.avatar || "./assets/bg-orang.png";
        heroSection.style.backgroundImage = `linear-gradient(135deg, rgba(12, 13, 16, 0.72), rgba(12, 13, 16, 0.88)), url('${bgImg}')`;
        heroSection.style.backgroundSize = "cover";
        heroSection.style.backgroundPosition = "center";
    }

    // About section elements
    setText("about-subtitle-tag", p.aboutSubtitle || "Behind The Code");
    setText("about-title-heading", p.aboutTitle || "Solusi Digital Berbasis Teknologi Modern & Desain Elegan.");
    setText("about-description", p.about || "");
    
    const aboutPhoto = document.getElementById("about-photo");
    if (aboutPhoto) aboutPhoto.src = p.aboutPhoto || p.avatar || "./assets/bg-orang.png";

    // Overview Showcase Cards
    setText("overview-services-title", p.servicesTitle || "Full Stack Web & Software Engineering");
    setText("overview-services-desc", p.servicesDesc || "Membangun aplikasi web berperforma tinggi, skalabel, responsif, dan berestetika visual modern dengan standar arsitektur terbaik.");
    setText("overview-collaborate-title", p.collaborateTitle || "Let's Build Your Brand Together!");
    setText("overview-collaborate-desc", p.collaborateDesc || "Punya ide proyek digital baru atau butuh pengembang profesional untuk merealisasikan visi Anda?");

    const skillsUl = document.getElementById("overview-skills-list");
    if (skillsUl && appData.skills && appData.skills.length > 0) {
        skillsUl.innerHTML = appData.skills.slice(0, 7).map(s => `<li class="flex items-center gap-2"><span class="text-slate-900 text-base">•</span> ${s.name}</li>`).join('');
    }

    // CV Download Button
    const cvBtn = document.getElementById("hero-cv-btn");
    if (cvBtn) cvBtn.href = p.cvUrl || "#";

    // Footer brand name
    setText("footer-brand-name", p.name || "Kevin");
    setText("footer-copyright-text", `© ${new Date().getFullYear()} ${p.name || "Kevin"}. All rights reserved.`);
}

// Helper to set text strictly
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

// 3. Render Metric Stats
function renderStats() {
    const p = appData.profile;
    if (!p) return;
    setText("stat-years-exp", p.yearsExp || "04+");
    setText("stat-projects-done", p.projectsDone || "25+");
    setText("stat-happy-clients", p.happyClients || "15+");
}

// 4. Render Projects (Paginated - 3 items per page)
function renderProjects() {
    const container = document.getElementById("projects-grid");
    const pagContainer = document.getElementById("projects-pagination");
    if (!container) return;

    const list = appData.projects || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">Belum ada proyek yang ditambahkan.</div>`;
        if (pagContainer) pagContainer.innerHTML = "";
        return;
    }

    const totalPages = Math.ceil(list.length / PROJECTS_PER_PAGE);
    if (currentProjectPage > totalPages) currentProjectPage = totalPages;
    if (currentProjectPage < 1) currentProjectPage = 1;

    const startIdx = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    const paginatedItems = list.slice(startIdx, startIdx + PROJECTS_PER_PAGE);

    container.innerHTML = paginatedItems.map(item => `
        <div class="project-card group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div class="relative overflow-hidden aspect-video bg-slate-100">
                <img src="${item.image || './assets/bg-orang.png'}" 
                     onerror="this.onerror=null;this.src='./assets/bg-orang.png'" 
                     alt="${item.title}" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <span class="absolute top-3 left-3 bg-[#111317] text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-md">
                    ${item.category || 'Project'}
                </span>
            </div>
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-black transition-colors">
                        ${item.title}
                    </h3>
                    <p class="text-slate-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                        ${item.description}
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${(item.tags || []).map(tag => `<span class="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded-md">${tag}</span>`).join('')}
                    </div>
                    <div class="flex items-center gap-3 pt-2 border-t border-slate-100">
                        <button onclick="openProjectModal(${item.id})" class="btn-project-detail flex-1 py-2.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-black transition-all text-center flex items-center justify-center gap-1.5">
                            <i class="fa-solid fa-eye"></i> Detail Proyek
                        </button>
                        ${item.demoUrl ? `<a href="${item.demoUrl}" target="_blank" class="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:text-black hover:border-slate-900 transition-colors"><i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagContainer, currentProjectPage, totalPages, (p) => {
        currentProjectPage = p;
        renderProjects();
    });
}

// 5. Render Skills (Paginated - 3 items per page)
function renderSkills() {
    const container = document.getElementById("skills-container-grid");
    const pagContainer = document.getElementById("skills-pagination");
    if (!container) return;

    const list = appData.skills || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">Belum ada skill yang ditambahkan.</div>`;
        if (pagContainer) pagContainer.innerHTML = "";
        return;
    }

    const totalPages = Math.ceil(list.length / SKILLS_PER_PAGE);
    if (currentSkillPage > totalPages) currentSkillPage = totalPages;
    if (currentSkillPage < 1) currentSkillPage = 1;

    const startIdx = (currentSkillPage - 1) * SKILLS_PER_PAGE;
    const paginatedItems = list.slice(startIdx, startIdx + SKILLS_PER_PAGE);

    container.innerHTML = paginatedItems.map(item => `
        <div class="skill-card bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:border-slate-900 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
                        <i class="fa-solid ${item.icon || 'fa-code'}"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 text-base">${item.name}</h4>
                        <span class="text-xs text-slate-500 uppercase tracking-wider font-semibold">${item.category || 'Development'}</span>
                    </div>
                </div>
                <span class="font-display font-extrabold text-slate-900 text-lg">${item.level}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div class="bg-slate-900 h-full rounded-full transition-all duration-1000" style="width: ${item.level}%"></div>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagContainer, currentSkillPage, totalPages, (p) => {
        currentSkillPage = p;
        renderSkills();
    });
}

// 6. Render Experiences (Paginated - 3 items per page)
function renderExperiences() {
    const container = document.getElementById("experience-timeline");
    const pagContainer = document.getElementById("experience-pagination");
    if (!container) return;

    const list = appData.experiences || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-slate-400">Belum ada pengalaman yang ditambahkan.</div>`;
        if (pagContainer) pagContainer.innerHTML = "";
        return;
    }

    const totalPages = Math.ceil(list.length / EXPERIENCES_PER_PAGE);
    if (currentExperiencePage > totalPages) currentExperiencePage = totalPages;
    if (currentExperiencePage < 1) currentExperiencePage = 1;

    const startIdx = (currentExperiencePage - 1) * EXPERIENCES_PER_PAGE;
    const paginatedItems = list.slice(startIdx, startIdx + EXPERIENCES_PER_PAGE);

    container.innerHTML = paginatedItems.map(item => `
        <div class="relative pl-8 sm:pl-10 border-l-2 border-slate-900 space-y-2 pb-8 last:pb-0">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-900 ring-4 ring-slate-200"></div>
            <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg">
                <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 class="text-xl font-bold text-slate-900">${item.role}</h3>
                    <span class="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">${item.period}</span>
                </div>
                <div class="text-sm font-semibold text-slate-500 mb-3"><i class="fa-solid fa-building text-slate-900 mr-1"></i> ${item.company}</div>
                <p class="text-slate-600 text-sm leading-relaxed mb-4">${item.description}</p>
                ${item.skills ? `
                    <div class="flex flex-wrap gap-1.5">
                        ${item.skills.map(sk => `<span class="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md">${sk}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagContainer, currentExperiencePage, totalPages, (p) => {
        currentExperiencePage = p;
        renderExperiences();
    });
}

// 7. Render Education (Paginated - 3 items per page)
function renderEducation() {
    const container = document.getElementById("education-cards-grid");
    const pagContainer = document.getElementById("education-pagination");
    if (!container) return;

    const list = appData.education || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">Belum ada riwayat pendidikan.</div>`;
        if (pagContainer) pagContainer.innerHTML = "";
        return;
    }

    const totalPages = Math.ceil(list.length / EDUCATION_PER_PAGE);
    if (currentEducationPage > totalPages) currentEducationPage = totalPages;
    if (currentEducationPage < 1) currentEducationPage = 1;

    const startIdx = (currentEducationPage - 1) * EDUCATION_PER_PAGE;
    const paginatedItems = list.slice(startIdx, startIdx + EDUCATION_PER_PAGE);

    container.innerHTML = paginatedItems.map(item => `
        <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg hover:border-slate-900 transition-all flex flex-col justify-between">
            <div class="space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                    <span class="text-xs font-bold text-slate-900 uppercase tracking-wider">${item.year}</span>
                    <h3 class="text-lg font-bold text-slate-900 mt-1">${item.degree}</h3>
                    <p class="text-xs font-semibold text-slate-500 mt-0.5">${item.institution}</p>
                </div>
                <p class="text-slate-600 text-xs leading-relaxed mt-2">${item.description}</p>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagContainer, currentEducationPage, totalPages, (p) => {
        currentEducationPage = p;
        renderEducation();
    });
}

// 8. Render Certifications (Paginated - 3 items per page)
function renderCertifications() {
    const container = document.getElementById("certifications-photos-grid");
    const pagContainer = document.getElementById("certifications-pagination");
    if (!container) return;

    const list = appData.certifications || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">Belum ada sertifikasi.</div>`;
        if (pagContainer) pagContainer.innerHTML = "";
        return;
    }

    const totalPages = Math.ceil(list.length / CERTIFICATIONS_PER_PAGE);
    if (currentCertificationPage > totalPages) currentCertificationPage = totalPages;
    if (currentCertificationPage < 1) currentCertificationPage = 1;

    const startIdx = (currentCertificationPage - 1) * CERTIFICATIONS_PER_PAGE;
    const paginatedItems = list.slice(startIdx, startIdx + CERTIFICATIONS_PER_PAGE);

    container.innerHTML = paginatedItems.map(item => `
        <div class="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
            <div class="relative overflow-hidden aspect-video bg-slate-100">
                <img src="${item.image || './assets/bg-orang.png'}" 
                     onerror="this.onerror=null;this.src='./assets/bg-orang.png'" 
                     alt="${item.title}" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            </div>
            <div class="p-5 space-y-1">
                <span class="text-[11px] font-bold text-slate-900 uppercase tracking-wider">${item.issuer} • ${item.year}</span>
                <h4 class="font-bold text-slate-900 text-base">${item.title}</h4>
            </div>
        </div>
    `).join('');

    renderPaginationControls(pagContainer, currentCertificationPage, totalPages, (p) => {
        currentCertificationPage = p;
        renderCertifications();
    });
}

// Shared Pagination Controls Generator
function renderPaginationControls(container, currentPage, totalPages, callback) {
    if (!container) return;
    if (totalPages <= 1) {
        container.innerHTML = "";
        return;
    }

    let buttonsHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        buttonsHtml += `
            <button onclick="window._changePage_${container.id}(${i})" class="w-8 h-8 rounded-full text-xs font-extrabold transition-all ${i === currentPage ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
                ${i}
            </button>
        `;
    }

    window[`_changePage_${container.id}`] = (page) => callback(page);

    container.innerHTML = `
        <div class="flex items-center justify-center gap-2 mt-8">
            <button onclick="window._changePage_${container.id}(${currentPage - 1})" ${currentPage === 1 ? 'disabled class="opacity-40 cursor-not-allowed"' : ''} class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs hover:bg-slate-200">
                <i class="fa-solid fa-chevron-left"></i>
            </button>
            ${buttonsHtml}
            <button onclick="window._changePage_${container.id}(${currentPage + 1})" ${currentPage === totalPages ? 'disabled class="opacity-40 cursor-not-allowed"' : ''} class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-xs hover:bg-slate-200">
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    `;
}

// 9. Contact Links & Info Rendering
function renderContactInfo() {
    const p = appData.profile;
    if (!p) return;

    const emailLink = document.getElementById("contact-email-link");
    const emailText = document.getElementById("contact-email-text");
    if (emailLink && emailText) {
        emailText.textContent = p.email || "email@example.com";
        emailLink.href = `mailto:${p.email || "email@example.com"}`;
    }

    const waLink = document.getElementById("contact-wa-link");
    const waText = document.getElementById("contact-wa-text");
    if (waLink && waText) {
        waText.textContent = p.phone || p.whatsapp || "+62 812-3456-789";
        const cleanWa = (p.whatsapp || p.phone || "").replace(/[^0-9]/g, "");
        waLink.href = `https://wa.me/${cleanWa}`;
    }

    // Social links
    setHref("social-github", p.github);
    setHref("social-linkedin", p.linkedin);
    setHref("social-instagram", p.instagram);
    setHref("footer-github", p.github);
    setHref("footer-linkedin", p.linkedin);
    setHref("footer-instagram", p.instagram);
}

function setHref(id, url) {
    const el = document.getElementById(id);
    if (el) el.href = url || "#";
}

// 10. Contact Form Handler
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contact-name").value;
        const email = document.getElementById("contact-email").value;
        const message = document.getElementById("contact-message").value;

        alert(`Terima kasih ${name}! Pesan Anda telah terkirim:\n"${message}"`);
        form.reset();
    });
}

// 11. Modal Lightbox Detail for Projects
function openProjectModal(id) {
    const modal = document.getElementById("project-modal");
    const content = document.getElementById("project-modal-content");
    if (!modal || !content) return;

    const project = (appData.projects || []).find(p => p.id === id);
    if (!project) return;

    content.innerHTML = `
        <div class="space-y-6">
            <div class="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900">
                <img src="${project.image || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-full h-full object-cover" alt="${project.title}">
            </div>
            <div>
                <span class="bg-white text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase">${project.category || 'Project'}</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-3">${project.title}</h2>
                <p class="text-slate-300 text-sm leading-relaxed mt-3">${project.description}</p>
            </div>
            <div class="flex flex-wrap gap-2">
                ${(project.tags || []).map(t => `<span class="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-lg">${t}</span>`).join('')}
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-slate-800">
                ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn-lime-pill flex-1 justify-center text-xs uppercase font-extrabold"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>` : ''}
                ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" class="btn-dark-pill flex-1 justify-center text-xs uppercase font-extrabold"><i class="fa-brands fa-github"></i> Repository</a>` : ''}
            </div>
        </div>
    `;

    modal.classList.add("active");
}

function closeProjectModal() {
    const modal = document.getElementById("project-modal");
    if (modal) modal.classList.remove("active");
}

window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

// 12. Back to top button
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
