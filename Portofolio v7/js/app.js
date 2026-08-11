/* ==========================================================================
   PORTOFOLIO V7 - FULL DYNAMIC DATA ENGINE (ALL TEXT & PHOTOS CRUD-ABLE)
   ========================================================================== */

const DB_VERSION = "v7.0_full_crud";
const STORAGE_KEY = "PORTFOLIO_DATA_V7";
const FALLBACK_STORAGE_KEY_V6 = "PORTFOLIO_DATA_V6";
const FALLBACK_STORAGE_KEY_V5 = "PORTFOLIO_DATA_V5";

// Pagination State (3 items per page)
let currentSkillPage = 1;
const SKILLS_PER_PAGE = 3;

let currentProjectPage = 1;
const PROJECTS_PER_PAGE = 3;
let activeProjectCategory = "All";

let currentExperiencePage = 1;
const EXPERIENCES_PER_PAGE = 3;

let currentEducationPage = 1;
const EDUCATION_PER_PAGE = 3;

let currentCertificationPage = 1;
const CERTIFICATIONS_PER_PAGE = 3;

// Full Dynamic Dataset Schema (All text & photos configurable)
const DEFAULT_PORTFOLIO_DATA = {
    updatedAt: Date.now(),
    profile: {
        name: "Kevin",
        title: "Full Stack Developer & Creative Director",
        heroTitleLine1: "PENGEMBANG",
        heroTitleLine2: "WEB & DESAIN",
        heroTitleLine3: "PERSONAL",
        heroBio: "Saya membangun aplikasi web modern, arsitektur software berperforma tinggi, dan sistem visual berestetika tinggi.",
        tagline: "Menghadirkan Solusi Digital Berbasis Teknologi Modern & Desain Elegan",
        statMetricVal: "85%",
        statMetricLbl: "Efisiensi & Performansi",
        heroTag1: "STRATEGI WEB",
        heroTag2: "FULL STACK",
        heroTag3: "ARSIEKSI KREATIF",
        heroBgPhoto: "./assets/foto1.png",
        avatar: "./assets/foto1.png",

        // Overview Section Text & Photos
        overviewBadge: "MASA DEPAN DIGITAL",
        overviewTitle: "DESAIN MODERN MEMBUAT SISTEM WEB THAT MENDEFINISIKAN STANDAR DIGITAL",
        overviewDesc: "Saya merancang dan mengembangkan solusi digital yang membedakan produk Anda di pasar, menggabungkan identitas visual, strategi sistem, dan arsitektur kode bersih dalam satu ekosistem yang terintegrasi.",
        overviewPhoto1: "./assets/foto.png",
        overviewPhoto2: "./assets/foto.png",
        overviewPhoto3: "./assets/foto.png",

        // Services Section Text & Photos
        servicesHeaderTitle: "SEMUA YANG ANDA BUTUHKAN UNTUK BERKEMBANG",
        servicesHeaderDesc: "Menyediakan layanan strategi web, identitas visual UI/UX, dan pengembangan sistem software dari perencanaan awal hingga eksekusi nyata yang terukur.",
        service1Title: "Strategi Web & Aplikasi",
        service1Desc: "Perancangan arsitektur dan visi teknologi untuk keunggulan produk digital.",
        service1Image: "./assets/foto.png",
        service2Title: "Identitas Visual & UI/UX",
        service2Desc: "Menciptakan antarmuka pengguna interaktif dan sistem desain konsisten.",
        service2Image: "./assets/foto.png",
        service3Title: "Arsitektur Software",
        service3Desc: "Mengarahkan integrasi API, database, dan cloud server berkinerja tinggi.",
        service3Image: "./assets/foto.png",
        service4Title: "Pengembangan Full Stack",
        service4Desc: "Pembangunan aplikasi web dari titik awal hingga tahap produksi tanpa batas.",
        service4Image: "./assets/foto.png",

        // Impact Statements Text & Photos
        impactTitle: "MENGUBAH IDE MENJADI KARYA NYATA DARI VISI HINGGA PELUNCURAN — DAMPAK YANG BERTAHAN LAMA",
        impactCard1Desc: "Simbol visual & arsitektur kode yang berdampak dari inti hingga detail akhir.",
        impactCard1Image: "./assets/foto.png",
        impactCard2Title: "Jelajahi portofolio proyek dan studi kasus terkini",
        impactCard3Btn: "JELAJAHI SEKARANG",
        impactCard3Image: "./assets/foto.png",

        // About Section Text & Photos
        aboutSubtitle: "Behind The Code & Design",
        aboutTitle: "Mengubah Ide Menjadi Karya Visual & Sistem Kode Berdampak Tinggi.",
        about: "Saya berfokus pada pengembangan aplikasi web responsif, arsitektur kode yang bersih, integrasi API berskala besar, serta perancangan antarmuka pengguna yang intuitif.",
        aboutPhoto: "./assets/foto.png",

        // Stats Numbers
        yearsExp: "04+",
        projectsDone: "25+",
        happyClients: "15+",

        // Contact & Links
        cvUrl: "#",
        email: "kevin.creative@example.com",
        phone: "+628123456789",
        whatsapp: "628123456789",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com"
    },
    projects: [
        {
            id: 1,
            title: "Fintech Ecosystem & Analytics Dashboard",
            category: "Web Application",
            tags: ["React", "TypeScript", "TailwindCSS"],
            image: "./assets/foto.png",
            description: "Platform analitik keuangan modern dengan visualisasi data transaksi real-time, arsitektur responsif, dan antarmuka dark mode.",
            demoUrl: "https://example.com/demo1",
            repoUrl: "https://github.com/example/demo1"
        },
        {
            id: 2,
            title: "Creatix AI Content & Visual Studio",
            category: "SaaS Platform",
            tags: ["Next.js", "Node.js", "AI Integration"],
            image: "./assets/foto.png",
            description: "Aplikasi berbasis kecerdasan buatan untuk membantu desainer dan pembuat konten menghasilkan aset visual secara efisien.",
            demoUrl: "https://example.com/demo2",
            repoUrl: "https://github.com/example/demo2"
        },
        {
            id: 3,
            title: "Luxe E-Commerce Storefront",
            category: "E-Commerce",
            tags: ["Full Stack", "Stripe API", "Animation"],
            image: "./assets/foto.png",
            description: "Toko online performa tinggi untuk brand fashion eksklusif dengan sistem checkout instan dan animasi interaktif.",
            demoUrl: "https://example.com/demo3",
            repoUrl: "https://github.com/example/demo3"
        },
        {
            id: 4,
            title: "Healthcare Telemedicine Mobile & Web App",
            category: "Mobile App & Web",
            tags: ["UI/UX", "React Native", "WebRTC"],
            image: "./assets/foto.png",
            description: "Aplikasi layanan kesehatan untuk janji temu dokter online, konsultasi video, dan manajemen rekam medis digital.",
            demoUrl: "https://example.com/demo4",
            repoUrl: "https://github.com/example/demo4"
        }
    ],
    skills: [
        { id: 1, name: "Frontend Development (React/Next.js)", level: 95, category: "Frontend", icon: "fa-code" },
        { id: 2, name: "Backend APIs & Node.js Architecture", level: 90, category: "Backend", icon: "fa-server" },
        { id: 3, name: "UI/UX & Modern Design Systems", level: 88, category: "Design", icon: "fa-palette" },
        { id: 4, name: "Database Architecture & Optimization", level: 85, category: "Database", icon: "fa-database" },
        { id: 5, name: "Cloud & DevOps (Vercel/Docker/AWS)", level: 82, category: "DevOps", icon: "fa-cloud" }
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
            description: "Mengembangkan antarmuka aplikasi web berbasis mikro-frontend, meningkatkan performa pengolahan data hingga 40%.",
            skills: ["TypeScript", "TailwindCSS", "State Management"]
        },
        {
            id: 3,
            role: "UI/UX & Web Developer",
            company: "Digital Solution Lab",
            period: "2020 - 2021",
            description: "Merancang wireframe, antarmuka pengguna interaktif, serta mengimplementasikan landing page berestetika tinggi.",
            skills: ["Figma", "HTML5/CSS3", "JavaScript"]
        }
    ],
    education: [
        {
            id: 1,
            degree: "Sarjana Komputer (S.Kom) - Teknik Informatika",
            institution: "Universitas Teknologi Indonesia",
            year: "2018 - 2022",
            description: "Lulus dengan predikat Cum Laude. Berfokus pada Rekayasa Perangkat Lunak & Systems Architecture."
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
            image: "./assets/foto.png"
        },
        {
            id: 2,
            title: "Professional Scrum Master (PSM I)",
            issuer: "Scrum.org",
            year: "2023",
            image: "./assets/foto.png"
        },
        {
            id: 3,
            title: "Meta Front-End Developer Specialization",
            issuer: "Meta / Coursera",
            year: "2022",
            image: "./assets/foto.png"
        }
    ]
};

// Data Store Loader
function getPortfolioData() {
    try {
        const storedV7 = localStorage.getItem(STORAGE_KEY);
        if (storedV7) return JSON.parse(storedV7);

        const storedV6 = localStorage.getItem(FALLBACK_STORAGE_KEY_V6);
        if (storedV6) {
            const data = JSON.parse(storedV6);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return data;
        }

        const storedV5 = localStorage.getItem(FALLBACK_STORAGE_KEY_V5);
        if (storedV5) {
            const data = JSON.parse(storedV5);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return data;
        }
    } catch (e) {
        console.error("Error loading portfolio data", e);
    }
    return DEFAULT_PORTFOLIO_DATA;
}

let appData = getPortfolioData();

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderProfile();
    renderStats();
    renderOverviewCards();
    renderServicesSection();
    renderImpactSection();
    renderProjects();
    renderSkills();
    renderExperiences();
    renderEducation();
    renderCertifications();
    renderContactInfo();
    initContactForm();
});

// Navigation & Mobile Toggle & Floating Bottom Scrollspy
function initNavigation() {
    const toggleBtn = document.getElementById("mobile-nav-toggle");
    const dropdown = document.getElementById("mobile-nav-dropdown");

    if (toggleBtn && dropdown) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
                dropdown.classList.add("hidden");
            }
        });
    }

    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-link, .nav-bottom-item, .mobile-dropdown-item");

    // Instant click/tap handler for mobile bottom links
    navAnchors.forEach(anchor => {
        anchor.addEventListener("click", () => {
            const href = anchor.getAttribute("href");
            if (!href || !href.startsWith("#")) return;
            
            navAnchors.forEach(a => {
                if (a.getAttribute("href") === href) {
                    a.classList.add("active");
                } else {
                    a.classList.remove("active");
                }
            });
        });
    });

    // Auto-scrollspy listener
    window.addEventListener("scroll", () => {
        let currentId = "home";
        const scrollPos = window.scrollY + 220;

        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
                currentId = sec.getAttribute("id");
            }
        });

        navAnchors.forEach(anchor => {
            const href = anchor.getAttribute("href");
            if (href === `#${currentId}`) {
                anchor.classList.add("active");
            } else {
                anchor.classList.remove("active");
            }
        });
    }, { passive: true });
}

// 1. Profile Render (Hero Section)
function renderProfile() {
    const p = appData.profile || {};
    
    setTextContent("brand-name", p.name || "Kevin");
    setTextContent("hero-bio", p.heroBio || "");
    setTextContent("hero-role", p.title || "Full Stack Developer & Creative Director");
    
    setTextContent("hero-title-1", p.heroTitleLine1 || "PENGEMBANG");
    setTextContent("hero-title-2", p.heroTitleLine2 || "WEB & DESAIN");
    setTextContent("hero-title-3", p.heroTitleLine3 || "PERSONAL");

    setTextContent("stat-metric-val", p.statMetricVal || "85%");
    setTextContent("stat-metric-lbl", p.statMetricLbl || "Efisiensi & Performansi");

    setTextContent("hero-tag-1", p.heroTag1 || "STRATEGI WEB");
    setTextContent("hero-tag-2", p.heroTag2 || "FULL STACK");
    setTextContent("hero-tag-3", p.heroTag3 || "ARSIEKSI KREATIF");

    const heroImg = document.getElementById("hero-main-photo");
    if (heroImg && p.heroBgPhoto) {
        heroImg.src = p.heroBgPhoto;
    }

    // About section
    setTextContent("about-subtitle", p.aboutSubtitle || "Behind The Code & Design");
    setTextContent("about-title", p.aboutTitle || "Mengubah Ide Menjadi Karya Visual.");
    setTextContent("about-desc", p.about || "");

    const aboutImg = document.getElementById("about-photo");
    if (aboutImg && p.aboutPhoto) {
        aboutImg.src = p.aboutPhoto;
    }
}

// 2. Stats Bar
function renderStats() {
    const p = appData.profile || {};
    setTextContent("stat-years", p.yearsExp || "04+");
    setTextContent("stat-projects", p.projectsDone || "25+");
    setTextContent("stat-clients", p.happyClients || "15+");
}

// 3. Overview Cards & Photos
function renderOverviewCards() {
    const p = appData.profile || {};
    const skills = appData.skills || [];

    setTextContent("overview-badge", p.overviewBadge || "MASA DEPAN DIGITAL");
    setTextContent("overview-title-text", p.overviewTitle || "DESAIN MODERN MEMBUAT SISTEM WEB THAT MENDEFINISIKAN STANDAR DIGITAL");
    setTextContent("overview-desc-text", p.overviewDesc || "");

    setImageSrc("overview-photo-1", p.overviewPhoto1 || "./assets/foto.png");
    setImageSrc("overview-photo-2", p.overviewPhoto2 || "./assets/foto.png");
    setImageSrc("overview-photo-3", p.overviewPhoto3 || "./assets/foto.png");

    const listEl = document.getElementById("overview-skills-list");
    if (listEl) {
        const topSkills = skills.slice(0, 7);
        listEl.innerHTML = topSkills.map(s => `
            <li class="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-100 pb-1.5">
                <span class="flex items-center gap-2"><i class="fa-solid fa-asterisk text-[9px] text-[#ff3b00]"></i> ${escapeHtml(s.name)}</span>
                <span class="text-[10px] text-slate-400 font-extrabold">${s.level}%</span>
            </li>
        `).join("");
    }
}

// 4. Services Section Text & Photos
function renderServicesSection() {
    const p = appData.profile || {};

    setTextContent("services-header-title", p.servicesHeaderTitle || "SEMUA YANG ANDA BUTUHKAN UNTUK BERKEMBANG");
    setTextContent("services-header-desc", p.servicesHeaderDesc || "");

    setTextContent("service-1-title", p.service1Title || "Strategi Web & Aplikasi");
    setTextContent("service-1-desc", p.service1Desc || "");
    setImageSrc("service-1-img", p.service1Image || "./assets/foto.png");

    setTextContent("service-2-title", p.service2Title || "Identitas Visual & UI/UX");
    setTextContent("service-2-desc", p.service2Desc || "");
    setImageSrc("service-2-img", p.service2Image || "./assets/foto.png");

    setTextContent("service-3-title", p.service3Title || "Arsitektur Software");
    setTextContent("service-3-desc", p.service3Desc || "");
    setImageSrc("service-3-img", p.service3Image || "./assets/foto.png");

    setTextContent("service-4-title", p.service4Title || "Pengembangan Full Stack");
    setTextContent("service-4-desc", p.service4Desc || "");
    setImageSrc("service-4-img", p.service4Image || "./assets/foto.png");
}

// 5. Impact Section Text & Photos
function renderImpactSection() {
    const p = appData.profile || {};

    setTextContent("impact-title-text", p.impactTitle || "MENGUBAH IDE MENJADI KARYA NYATA...");
    setTextContent("impact-card1-desc", p.impactCard1Desc || "");
    setImageSrc("impact-card1-img", p.impactCard1Image || "./assets/foto.png");

    setTextContent("impact-card2-title", p.impactCard2Title || "");
    setTextContent("impact-card3-btn", p.impactCard3Btn || "JELAJAHI SEKARANG");
    setImageSrc("impact-card3-img", p.impactCard3Image || "./assets/foto.png");
}

// 6. Projects Section
function renderProjects() {
    const container = document.getElementById("projects-grid");
    const pagContainer = document.getElementById("projects-pagination");
    if (!container) return;

    const allProjects = appData.projects || [];
    let filtered = allProjects;

    if (activeProjectCategory !== "All" && activeProjectCategory !== "Semua") {
        filtered = allProjects.filter(p => p.category === activeProjectCategory);
    }

    const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE) || 1;
    if (currentProjectPage > totalPages) currentProjectPage = totalPages;

    const startIndex = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

    if (paginated.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400 text-sm font-semibold">Tidak ada proyek dalam kategori ini.</div>`;
    } else {
        container.innerHTML = paginated.map((proj, idx) => {
            // Apply creative asymmetrical studio heights per card
            let heightClass = "h-[350px] self-end";
            let highlightClass = "";
            
            if (idx % 3 === 1) {
                // Center Focal Hero Card (Taller & Highlighted)
                heightClass = "h-[420px] self-center";
                highlightClass = "border-2 border-[#ff3b00]/60 shadow-2xl scale-[1.02] z-10";
            } else if (idx % 3 === 2) {
                // Right Card (Medium height)
                heightClass = "h-[375px] self-start";
            }

            return `
                <div class="project-agency-card group ${heightClass} ${highlightClass}">
                    <!-- Full Studio Canvas Background Image -->
                    <img src="${escapeHtml(proj.image || './assets/foto.png')}" alt="${escapeHtml(proj.title)}" class="project-bg-img" onerror="this.src='./assets/foto.png'">
                    
                    <!-- Dark Red/Black Gradient Overlay -->
                    <div class="project-card-overlay"></div>

                    <!-- Top Left Pill Badge -->
                    <div class="absolute top-5 left-5 z-10">
                        <span class="project-tag-pill">${escapeHtml(proj.category || 'PROYEK')}</span>
                    </div>

                    <!-- Bottom Title, Description & Action Links -->
                    <div class="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
                        <div></div>
                        <div class="space-y-2.5">
                            <div class="flex flex-wrap gap-1.5 mb-1">
                                ${(proj.tags || []).map(t => `<span class="bg-white/10 backdrop-blur-md text-white border border-white/20 text-[9px] font-bold px-2.5 py-0.5 rounded-full">${escapeHtml(t)}</span>`).join('')}
                            </div>

                            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-1">
                                <h3 class="font-agency-thin text-sm sm:text-base text-white font-light uppercase leading-snug tracking-[-0.02em] group-hover:text-[#ff3b00] transition-colors">
                                    ${escapeHtml(proj.title)}
                                </h3>
                                <p class="text-[10px] text-slate-300 leading-snug font-medium line-clamp-2 shrink-0 max-w-[160px]">
                                    ${escapeHtml(proj.description || '')}
                                </p>
                            </div>

                            <div class="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                                ${proj.demoUrl ? `<a href="${escapeHtml(proj.demoUrl)}" target="_blank" class="text-xs font-bold text-[#ff3b00] hover:underline inline-flex items-center gap-1">Live Demo <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>` : '<span></span>'}
                                ${proj.repoUrl ? `<a href="${escapeHtml(proj.repoUrl)}" target="_blank" class="text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1"><i class="fa-brands fa-github text-sm"></i> Kode Repo</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    if (pagContainer) {
        renderPagination(pagContainer, totalPages, currentProjectPage, (page) => {
            currentProjectPage = page;
            renderProjects();
        });
    }
}

// Category filter trigger
window.filterProjects = function(cat) {
    activeProjectCategory = cat;
    currentProjectPage = 1;
    
    document.querySelectorAll(".project-filter-btn").forEach(btn => {
        if (btn.getAttribute("data-cat") === cat) {
            btn.className = "project-filter-btn px-4 py-2 rounded-full text-xs font-extrabold bg-[#120204] text-[#ff3b00] border border-[#ff3b00]/40 shadow-sm";
        } else {
            btn.className = "project-filter-btn px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all";
        }
    });
    renderProjects();
};

// 7. Skills Grid (3 Columns, Middle Card Larger & Highlighted)
function renderSkills() {
    const container = document.getElementById("skills-container");
    const pagContainer = document.getElementById("skills-pagination");
    if (!container) return;

    const skills = appData.skills || [];
    const totalPages = Math.ceil(skills.length / SKILLS_PER_PAGE) || 1;
    if (currentSkillPage > totalPages) currentSkillPage = totalPages;

    const startIndex = (currentSkillPage - 1) * SKILLS_PER_PAGE;
    const paginated = skills.slice(startIndex, startIndex + SKILLS_PER_PAGE);

    if (paginated.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400 text-sm font-semibold">Belum ada data keahlian.</div>`;
        return;
    }

    container.innerHTML = paginated.map((s, idx) => {
        const itemNumber = String(startIndex + idx + 1).padStart(2, '0');
        const isMiddle = idx % 3 === 1;

        // Dynamic Asymmetrical Styles (Middle Card Larger & Highlighted)
        const cardStyle = isMiddle
            ? "bg-white text-slate-900 border-2 border-[#ff3b00] shadow-2xl scale-105 z-10 p-7 sm:p-8 rounded-[32px] min-h-[340px]"
            : "bg-[#141416] text-white border border-[#ff3b00]/30 shadow-xl p-6 sm:p-7 rounded-[28px] min-h-[280px] self-center";

        const iconBg = isMiddle
            ? "bg-[#120204] text-[#ff3b00] border border-[#ff3b00]/30"
            : "bg-white/10 text-white border border-white/20";

        const categoryColor = "text-[#ff3b00]";
        const titleColor = isMiddle ? "text-slate-900" : "text-white";
        const barTrackBg = isMiddle ? "bg-slate-100" : "bg-white/10";

        return `
            <div class="group relative ${cardStyle} hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between overflow-hidden">
                <!-- Large Agency Watermark Number -->
                <span class="absolute top-4 right-6 font-agency-thin text-5xl sm:text-6xl ${isMiddle ? 'text-slate-200' : 'text-white/10'} group-hover:text-[#ff3b00]/20 transition-colors pointer-events-none select-none font-light">
                    ${itemNumber}
                </span>

                <div class="relative z-10 space-y-4">
                    <!-- Top Icon & Category Badge -->
                    <div class="flex items-center justify-between">
                        <div class="w-11 h-11 rounded-2xl ${iconBg} flex items-center justify-center text-lg shadow-md">
                            <i class="fa-solid ${s.icon || 'fa-code'}"></i>
                        </div>
                        <span class="text-[10px] font-extrabold ${categoryColor} bg-rose-50/20 border border-[#ff3b00]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                            ${escapeHtml(s.category || 'Tech')}
                        </span>
                    </div>

                    <!-- Title & Level -->
                    <div>
                        <span class="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                            KEAHLIAN UTAMA
                        </span>
                        <h4 class="font-agency-thin ${titleColor} font-light text-lg sm:text-xl uppercase leading-snug tracking-[-0.02em] group-hover:text-[#ff3b00] transition-colors">
                            ${escapeHtml(s.name)}
                        </h4>
                    </div>
                </div>

                <!-- Skill Level Progress Bar -->
                <div class="relative z-10 pt-4 space-y-1.5 border-t ${isMiddle ? 'border-slate-100' : 'border-white/10'}">
                    <div class="flex items-center justify-between text-xs font-bold">
                        <span class="text-[10px] uppercase tracking-wider ${isMiddle ? 'text-slate-500' : 'text-slate-400'}">Tingkat Penguasaan</span>
                        <span class="text-xs font-extrabold text-[#ff3b00]">${s.level}%</span>
                    </div>
                    <div class="w-full ${barTrackBg} rounded-full h-2.5 overflow-hidden p-0.5">
                        <div class="skill-bar-inner h-full rounded-full" style="width: ${s.level}%"></div>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    if (pagContainer) {
        renderPagination(pagContainer, totalPages, currentSkillPage, (page) => {
            currentSkillPage = page;
            renderSkills();
        });
    }
}

// 8. Experiences Timeline (Creative 2-Column Left-Right Alternating Layout)
function renderExperiences() {
    const container = document.getElementById("experience-timeline");
    const pagContainer = document.getElementById("experience-pagination");
    if (!container) return;

    const exps = appData.experiences || [];
    const totalPages = Math.ceil(exps.length / EXPERIENCES_PER_PAGE) || 1;
    if (currentExperiencePage > totalPages) currentExperiencePage = totalPages;

    const startIndex = (currentExperiencePage - 1) * EXPERIENCES_PER_PAGE;
    const paginated = exps.slice(startIndex, startIndex + EXPERIENCES_PER_PAGE);

    if (paginated.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-slate-400 text-sm font-semibold">Belum ada data pengalaman karir.</div>`;
        return;
    }

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            ${paginated.map((exp, idx) => {
                const itemNumber = String(startIndex + idx + 1).padStart(2, '0');
                const isEven = idx % 2 === 1;

                // Left (Odd) vs Right (Even) Staggered Styling
                const cardStyle = isEven
                    ? "bg-white text-slate-900 border-2 border-[#ff3b00] shadow-2xl rounded-[32px] p-7 sm:p-9 md:translate-y-10 z-10"
                    : "bg-[#141416] text-white border border-[#ff3b00]/30 shadow-xl rounded-[32px] p-7 sm:p-9 md:-translate-y-2";

                const watermarkColor = isEven ? "text-slate-200 group-hover:text-[#ff3b00]/20" : "text-white/10 group-hover:text-[#ff3b00]/20";
                const roleColor = isEven ? "text-slate-900 group-hover:text-[#ff3b00]" : "text-white group-hover:text-[#ff3b00]";
                const descColor = isEven ? "text-slate-600" : "text-slate-300";
                const companyColor = isEven ? "text-slate-500" : "text-slate-400";
                const periodBadge = isEven ? "bg-[#120204] text-[#ff3b00] border border-[#ff3b00]/40" : "bg-[#ff3b00] text-white shadow-md";
                const pillBg = isEven ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-white/10 text-slate-200 border-white/15";

                return `
                    <div class="group relative ${cardStyle} hover:-translate-y-3 transition-all duration-500 overflow-hidden">
                        <!-- Watermark Number -->
                        <span class="absolute top-4 right-6 font-agency-thin text-6xl sm:text-7xl ${watermarkColor} transition-colors pointer-events-none select-none font-light">
                            ${itemNumber}
                        </span>

                        <div class="relative z-10 space-y-4">
                            <!-- Period & Company Header -->
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <span class="${periodBadge} text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest">
                                    ${escapeHtml(exp.period)}
                                </span>
                                <span class="text-xs font-extrabold ${companyColor} flex items-center gap-1.5">
                                    <i class="fa-solid fa-asterisk text-[#ff3b00] text-[10px]"></i> ${escapeHtml(exp.company)}
                                </span>
                            </div>

                            <!-- Role Title -->
                            <h3 class="font-agency-thin text-xl sm:text-2xl ${roleColor} font-light uppercase leading-snug tracking-[-0.03em] transition-colors">
                                ${escapeHtml(exp.role)}
                            </h3>

                            <!-- Description -->
                            <p class="text-xs sm:text-sm ${descColor} leading-relaxed font-normal">
                                ${escapeHtml(exp.description || '')}
                            </p>

                            <!-- Tech Stack Pills -->
                            ${exp.skills && exp.skills.length > 0 ? `
                                <div class="flex flex-wrap gap-2 pt-3 border-t border-slate-200/20">
                                    ${exp.skills.map(sk => `
                                        <span class="${pillBg} border text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <i class="fa-solid fa-bolt text-[#ff3b00] text-[8px]"></i> ${escapeHtml(sk)}
                                        </span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;

    if (pagContainer) {
        renderPagination(pagContainer, totalPages, currentExperiencePage, (page) => {
            currentExperiencePage = page;
            renderExperiences();
        });
    }
}

// 9. Education Cards
function renderEducation() {
    const container = document.getElementById("education-cards-grid");
    const pagContainer = document.getElementById("education-pagination");
    if (!container) return;

    const edu = appData.education || [];
    const totalPages = Math.ceil(edu.length / EDUCATION_PER_PAGE) || 1;
    if (currentEducationPage > totalPages) currentEducationPage = totalPages;

    const startIndex = (currentEducationPage - 1) * EDUCATION_PER_PAGE;
    const paginated = edu.slice(startIndex, startIndex + EDUCATION_PER_PAGE);

    container.innerHTML = paginated.map(item => `
        <div class="card-light flex flex-col justify-between space-y-4">
            <div class="space-y-2">
                <div class="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-base font-bold">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <span class="text-[10px] font-extrabold text-[#ff3b00] uppercase tracking-wider block">${escapeHtml(item.year)}</span>
                <h4 class="font-agency-thin text-slate-900 text-base leading-snug font-light">${escapeHtml(item.degree)}</h4>
                <p class="text-xs font-bold text-slate-500">${escapeHtml(item.institution)}</p>
                <p class="text-xs text-slate-600 leading-relaxed pt-1">${escapeHtml(item.description || '')}</p>
            </div>
        </div>
    `).join("");

    if (pagContainer) {
        renderPagination(pagContainer, totalPages, currentEducationPage, (page) => {
            currentEducationPage = page;
            renderEducation();
        });
    }
}

// 10. Certification Cards
function renderCertifications() {
    const container = document.getElementById("certifications-photos-grid");
    const pagContainer = document.getElementById("certifications-pagination");
    if (!container) return;

    const certs = appData.certifications || [];
    const totalPages = Math.ceil(certs.length / CERTIFICATIONS_PER_PAGE) || 1;
    if (currentCertificationPage > totalPages) currentCertificationPage = totalPages;

    const startIndex = (currentCertificationPage - 1) * CERTIFICATIONS_PER_PAGE;
    const paginated = certs.slice(startIndex, startIndex + CERTIFICATIONS_PER_PAGE);

    container.innerHTML = paginated.map(c => `
        <div class="card-light overflow-hidden p-0 flex flex-col justify-between">
            <div class="h-44 overflow-hidden relative">
                <img src="${escapeHtml(c.image || './assets/foto.png')}" alt="${escapeHtml(c.title)}" class="w-full h-full object-cover" onerror="this.src='./assets/foto.png'">
                <span class="absolute top-3 right-3 bg-[#120204] text-[#ff3b00] border border-[#ff3b00]/30 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">${escapeHtml(c.year)}</span>
            </div>
            <div class="p-5 space-y-2">
                <h4 class="font-agency-thin text-slate-900 text-sm leading-snug font-light">${escapeHtml(c.title)}</h4>
                <p class="text-xs font-semibold text-slate-500">${escapeHtml(c.issuer)}</p>
            </div>
        </div>
    `).join("");

    if (pagContainer) {
        renderPagination(pagContainer, totalPages, currentCertificationPage, (page) => {
            currentCertificationPage = page;
            renderCertifications();
        });
    }
}

// 11. Contact Info & Social Links
function renderContactInfo() {
    const p = appData.profile || {};

    const emailText = document.getElementById("contact-email-text");
    const emailLink = document.getElementById("contact-email-link");
    if (emailText && emailLink) {
        emailText.textContent = p.email || "kevin@example.com";
        emailLink.href = `mailto:${p.email || 'kevin@example.com'}`;
    }

    const waText = document.getElementById("contact-wa-text");
    const waLink = document.getElementById("contact-wa-link");
    if (waText && waLink) {
        const phoneClean = (p.whatsapp || p.phone || "628123456789").replace(/[^0-9]/g, '');
        waText.textContent = `Chat WhatsApp (${p.phone || '+628123456789'})`;
        waLink.href = `https://wa.me/${phoneClean}?text=Halo%20${encodeURIComponent(p.name || 'Kevin')},%20saya%20tertarik%20berdiskusi%20proyek.`;
    }

    setHref("social-github", p.github || "#");
    setHref("social-linkedin", p.linkedin || "#");
    setHref("social-instagram", p.instagram || "#");
    setHref("footer-github", p.github || "#");
    setHref("footer-linkedin", p.linkedin || "#");
    setHref("footer-instagram", p.instagram || "#");
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contact-name").value;
        const email = document.getElementById("contact-email").value;
        const message = document.getElementById("contact-message").value;
        const p = appData.profile || {};

        const phoneClean = (p.whatsapp || p.phone || "628123456789").replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(`Halo ${p.name || 'Kevin'},\n\nNama: ${name}\nEmail: ${email}\n\nPesan: ${message}`)}`;
        
        window.open(waUrl, "_blank");
        alert("Pesan Anda telah disiapkan! Mengalihkan ke WhatsApp...");
        form.reset();
    });
}

function setTextContent(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}
function setImageSrc(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src;
}
function setHref(id, url) {
    const el = document.getElementById(id);
    if (el) el.href = url;
}
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderPagination(container, totalPages, currentPage, onPageClick) {
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = `
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <div class="flex items-center gap-2">
                <button type="button" 
                    class="pagination-btn nav-btn ${currentPage === 1 ? 'disabled' : ''}" 
                    ${currentPage === 1 ? 'disabled' : ''} 
                    onclick="window.triggerPageClick('${container.id}', ${currentPage - 1})">
                    <i class="fa-solid fa-chevron-left text-[10px]"></i>
                </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        html += `
            <button type="button" 
                class="pagination-btn ${isActive ? 'active' : ''}" 
                onclick="window.triggerPageClick('${container.id}', ${i})">
                ${i}
            </button>
        `;
    }

    html += `
                <button type="button" 
                    class="pagination-btn nav-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                    ${currentPage === totalPages ? 'disabled' : ''} 
                    onclick="window.triggerPageClick('${container.id}', ${currentPage + 1})">
                    <i class="fa-solid fa-chevron-right text-[10px]"></i>
                </button>
            </div>

            <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest hidden sm:inline-block">
                Halaman ${currentPage} dari ${totalPages}
            </span>
        </div>
    `;

    container.innerHTML = html;

    window.triggerPageClick = function(contId, page) {
        if (contId === container.id && page >= 1 && page <= totalPages) {
            onPageClick(page);
        }
    };
}
