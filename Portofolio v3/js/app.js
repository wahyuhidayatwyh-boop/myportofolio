/* ==========================================================================
   PORTOFOLIO DESTINA - REALTIME CLOUD RE-RENDER ENGINE (v45.0)
   ========================================================================== */

const DB_VERSION = "v999.0_restored_from_backup";

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

// --------------------------------------------------------------------------
// 1. COMPLETELY CLEAN DATASET TEMPLATE
// --------------------------------------------------------------------------
const DEFAULT_PORTFOLIO_DATA = {
    updatedAt: Date.now(),
    profile: {
        name: "MegaChan Cella",
        title: "Senior Full Stack Web Developer & UI/UX Specialist",
        heroBio: "Hello, I'm MegaChan Cella, a developer & UI/UX specialist based in Indonesia. I transform ideas into impactful designs and bring them to life through creative collaboration.",
        tagline: "I turn innovative ideas into designs that inspire action and drive results.",
        aboutSubtitle: "Behind The Code",
        aboutTitle: "Crafting Exceptional Digital Experiences Through Clean Code & Visual Elegance.",
        about: "Saya adalah seorang Full Stack Web Developer dan UI/UX Specialist yang berfokus pada keindahan visual yang bersih, navigasi yang intuitif, dan arsitektur kode modern. Pengalaman lebih dari 4 tahun menangani proyek berskala enterprise.",
        yearsExp: "04+",
        projectsDone: "25+",
        happyClients: "15+",
        avatar: "./assets/foto.png",
        heroBgPhoto: "./assets/foto.png",
        aboutPhoto: "./assets/foto.png",
        cvUrl: "#",
        email: "destina.natasya@example.com",
        phone: "+6281234567890",
        whatsapp: "6281234567890",
        linkedin: "https://linkedin.com/in/destina-natasya",
        github: "https://github.com/destina-natasya",
        instagram: "https://instagram.com/destinadev"
    },
    skills: [
        {
            id: 1,
            name: "React.js & Next.js",
            category: "Frontend Architecture",
            icon: "fa-brands fa-react",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
            description: "Membangun aplikasi web modern berkecepatan tinggi dengan arsitektur SSR & Component Reusability."
        },
        {
            id: 2,
            name: "Node.js & Express",
            category: "Backend Microservices",
            icon: "fa-brands fa-node-js",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
            description: "Pengembangan RESTful API scalable, otentikasi JWT secure, dan integrasi cloud."
        },
        {
            id: 3,
            name: "Tailwind CSS & UI/UX",
            category: "Visual System & Design",
            icon: "fa-solid fa-palette",
            image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&q=80",
            description: "Desain sistem antarmuka responsif, glassmorphism mewah, dan aksesibilitas standar industri."
        },
        {
            id: 4,
            name: "PostgreSQL & MongoDB",
            category: "Database Engineering",
            icon: "fa-solid fa-database",
            image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&q=80",
            description: "Perancangan skema relasional & NoSQL dengan optimasi query performa tinggi."
        },
        {
            id: 5,
            name: "TypeScript & ES6+",
            category: "Core Web Language",
            icon: "fa-solid fa-code",
            image: "https://images.unsplash.com/photo-1516116211223-4c7142403487?w=400&q=80",
            description: "Penulisan kode clean, type-safe, maintainable untuk aplikasi skala besar."
        },
        {
            id: 6,
            name: "AWS & Cloud DevOps",
            category: "Cloud Infrastructure",
            icon: "fa-brands fa-aws",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
            description: "Automasi CI/CD pipelines, Docker containerization, dan S3 Cloud deployment."
        }
    ],
    experiences: [
        {
            id: 1,
            company: "PT Tech Innovasi Nusantara",
            role: "Senior Full Stack Web Developer",
            period: "2023 - Sekarang",
            photo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
            location: "Jakarta, Indonesia",
            summary: "Memimpin tim pengembangan sistem core SaaS enterprise, mengoptimalkan kecepatan load hingga 40%, dan menangani arsitektur RESTful API skala besar."
        },
        {
            id: 2,
            company: "Creative Digital Studio",
            role: "UI/UX & Lead Frontend Specialist",
            period: "2021 - 2023",
            photo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",
            location: "Bandung, Indonesia",
            summary: "Merancang desain sistem visual untuk 15+ klien korporat, mengimplementasikan animasi mikro intuitif, dan membangun dashboard analisis real-time."
        },
        {
            id: 3,
            company: "Global Enterprise Solution",
            role: "Web Application Consultant",
            period: "2020 - 2021",
            photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
            location: "Surabaya, Indonesia",
            summary: "Mengembangkan portal e-commerce & backend e-banking dengan fokus utama pada keamanan otentikasi data dan kenyamanan navigasi pengguna."
        }
    ],
    projects: [
        {
            id: 1,
            title: "Fintech Luxury Executive Dashboard",
            role: "Full Stack Developer & Designer",
            category: "Web Application",
            coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            liveUrl: "https://example.com/fintech",
            githubUrl: "https://github.com/destina/fintech-dashboard",
            technologies: ["React.js", "Tailwind CSS", "Node.js", "Chart.js"],
            description: "Platform analytics keuangan korporat dengan visualisasi data real-time, transaksi berkecepatan tinggi, dan interface berstandar eksekutif."
        },
        {
            id: 2,
            title: "Luxury E-Commerce & Brand Showcase",
            role: "Lead Frontend Engineer",
            category: "E-Commerce",
            coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            liveUrl: "https://example.com/luxury-store",
            githubUrl: "https://github.com/destina/luxury-store",
            technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe API"],
            description: "Platform belanja online eksklusif berdesain minimalis mewah dengan integrasi payment gateway otomatis dan sistem katalog dinamis."
        },
        {
            id: 3,
            title: "AI Digital Asset Management Hub",
            role: "UI/UX & Backend Engineer",
            category: "SaaS Cloud Platform",
            coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
            liveUrl: "https://example.com/ai-asset-hub",
            githubUrl: "https://github.com/destina/ai-asset-hub",
            technologies: ["React", "Python FastAPI", "Docker", "AWS S3"],
            description: "Aplikasi cloud pengelola media digital berbasis kecerdasan buatan dengan fitur auto-tagging, pencarian gambar pintar, dan enkripsi aman."
        },
        {
            id: 4,
            title: "HealthTech Telemedicine Portal",
            role: "Full Stack Engineer",
            category: "Health Application",
            coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
            liveUrl: "https://example.com/healthtech",
            githubUrl: "https://github.com/destina/healthtech",
            technologies: ["Vue.js", "Express.js", "MongoDB", "WebRTC"],
            description: "Portal layanan kesehatan terpadu dengan konsultasi dokter langsung secara video, rekam medis digital, dan booking janji online."
        },
        {
            id: 5,
            title: "Corporate Logistics & Fleet Tracker",
            role: "Senior Developer",
            category: "Enterprise System",
            coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
            liveUrl: "https://example.com/logistics",
            githubUrl: "https://github.com/destina/logistics-tracker",
            technologies: ["Next.js", "Go Backend", "PostgreSQL", "Leaflet Maps"],
            description: "Sistem pelacak rute armada logistik skala nasional dengan pemantauan lokasi GPS real-time dan notifikasi pengiriman otomatis."
        },
        {
            id: 6,
            title: "Smart Property & Real Estate Portal",
            role: "Product Designer & Developer",
            category: "Real Estate",
            coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
            liveUrl: "https://example.com/realestate",
            githubUrl: "https://github.com/destina/smart-property",
            technologies: ["React", "Tailwind CSS", "Firebase", "3D Virtual Tour"],
            description: "Website pencarian properti mewah dengan tur 3D virtual room, kalkulator KPR interaktif, dan fitur filter lokasi presisi."
        }
    ],
    education: [
        {
            id: 1,
            degree: "S1 Teknik Informatika / Computer Science",
            institution: "Universitas Indonesia (UI)",
            year: "2016 - 2020",
            photo: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
            description: "Lulus dengan Predikat Pujian (Cum Laude). Berfokus pada Rekayasa Perangkat Lunak, Struktur Data, dan Sistem Basis Data."
        },
        {
            id: 2,
            degree: "Executive Product Design & UI/UX Masterclass",
            institution: "General Assembly Global",
            year: "2021",
            photo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80",
            description: "Sertifikasi intensif perancangan riset pengguna, pembuatan wireframe high-fidelity, dan arsitektur informasi."
        },
        {
            id: 3,
            degree: "Advanced Full Stack Software Engineering",
            institution: "Hacktiv8 Indonesia Academy",
            year: "2020",
            photo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
            description: "Program bootcamp intensif pengembangan web full stack menggunakan React, Node.js, Express, dan PostgreSQL."
        }
    ],
    certifications: [
        {
            id: 1,
            title: "AWS Certified Solutions Architect – Associate",
            issuer: "Amazon Web Services (AWS)",
            year: "2023",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
            credentialUrl: "https://aws.amazon.com"
        },
        {
            id: 2,
            title: "Meta Certified Senior Front-End Developer",
            issuer: "Meta / Coursera Professional Certificate",
            year: "2022",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
            credentialUrl: "https://coursera.org"
        },
        {
            id: 3,
            title: "Professional Scrum Master (PSM I)",
            issuer: "Scrum.org International Certification",
            year: "2022",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
            credentialUrl: "https://scrum.org"
        }
    ]
};

// --------------------------------------------------------------------------
// 2. LOCALSTORAGE PERSISTENCE LAYER WITH TIMESTAMP CONFLICT RESOLUTION
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
        // Hydrate empty arrays with DEFAULT_PORTFOLIO_DATA
        if (!parsed.skills || parsed.skills.length === 0) parsed.skills = DEFAULT_PORTFOLIO_DATA.skills;
        if (!parsed.experiences || parsed.experiences.length === 0) parsed.experiences = DEFAULT_PORTFOLIO_DATA.experiences;
        if (!parsed.projects || parsed.projects.length === 0) parsed.projects = DEFAULT_PORTFOLIO_DATA.projects;
        if (!parsed.education || parsed.education.length === 0) parsed.education = DEFAULT_PORTFOLIO_DATA.education;
        if (!parsed.certifications || parsed.certifications.length === 0) parsed.certifications = DEFAULT_PORTFOLIO_DATA.certifications;
        if (!parsed.profile) parsed.profile = DEFAULT_PORTFOLIO_DATA.profile;
        if (!parsed.updatedAt) parsed.updatedAt = Date.now();

        localStorage.setItem('destina_portfolio_db', JSON.stringify(parsed));
        return parsed;
    } catch (e) {
        console.error("Failed to parse stored portfolio DB, resetting to defaults", e);
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
// 3. UI RENDERING ENGINE
// --------------------------------------------------------------------------
function renderAllPortfolioSections() {
    const db = getPortfolioData();
    const prof = db.profile || DEFAULT_PORTFOLIO_DATA.profile;

    // 1. Footer Brand Name

    const footerBrand = document.getElementById('footer-brand-name');
    if (footerBrand) footerBrand.textContent = (prof.name || "MegaChan Cella").toUpperCase();

    const footerCopy = document.getElementById('footer-copyright-text');
    if (footerCopy) footerCopy.textContent = `© 2026 ${prof.name || 'MegaChan Cella'}. All rights reserved.`;

    // 2. Editorial Hero Section Data
    const bgName = document.getElementById('hero-name-bg');
    if (bgName) bgName.textContent = (prof.name || "MegaChan Cella").toUpperCase();

    const titleName = document.getElementById('hero-title-name');
    if (titleName) titleName.textContent = (prof.name || "MegaChan Cella").toUpperCase();

    const heroBgPhoto = document.getElementById('hero-bg-photo');
    if (heroBgPhoto) {
        const photoUrl = prof.heroBgPhoto || prof.avatar;
        if (photoUrl) {
            heroBgPhoto.src = photoUrl;
            heroBgPhoto.style.display = 'block';
        } else {
            heroBgPhoto.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23F8F4EC'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' font-weight='bold' fill='%23B45309'%3EFoto Background Hero (Upload di Admin CMS)%3C/text%3E%3C/svg%3E";
        }
    }

    const bioLeft = document.getElementById('hero-bio-left');
    if (bioLeft) bioLeft.textContent = prof.heroBio || `Halo, Saya ${prof.name || 'Destina'}, seorang ${prof.title || 'Professional Specialist'}.`;

    const taglineRight = document.getElementById('hero-tagline-right');
    if (taglineRight) taglineRight.textContent = prof.tagline || "Menciptakan solusi digital yang berorientasi pada hasil dan estetika visual modern.";

    const heroCopyTag = document.getElementById('hero-copyright-tag');
    if (heroCopyTag) heroCopyTag.textContent = `© ${prof.name || 'Destina'} 2026`;

    // 3. About Me Section Data
    const aboutSubtitle = document.getElementById('about-subtitle-tag');
    if (aboutSubtitle) aboutSubtitle.textContent = prof.aboutSubtitle || "Behind The Code";

    const aboutHeading = document.getElementById('about-title-heading');
    if (aboutHeading) aboutHeading.textContent = prof.aboutTitle || "Crafting Exceptional Digital Experiences Through Clean Code & Visual Elegance.";

    const aboutDesc = document.getElementById('about-description');
    if (aboutDesc) aboutDesc.textContent = prof.about || "Deskripsi profil Anda.";

    const aboutPhoto = document.getElementById('about-photo');
    if (aboutPhoto) {
        if (prof.aboutPhoto) {
            aboutPhoto.src = prof.aboutPhoto;
        } else {
            aboutPhoto.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='460' viewBox='0 0 500 460'%3E%3Crect width='500' height='460' fill='%23FFF2F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' font-weight='bold' fill='%23D81B60'%3EUpload Foto About Di Admin CMS%3C/text%3E%3C/svg%3E";
        }
    }

    // Stat Counters
    const stYears = document.getElementById('stat-years-exp');
    if (stYears) stYears.textContent = prof.yearsExp || "04+";

    const stProjects = document.getElementById('stat-projects-done');
    if (stProjects) stProjects.textContent = prof.projectsDone || "25+";

    const stClients = document.getElementById('stat-happy-clients');
    if (stClients) stClients.textContent = prof.happyClients || "15+";

    // 4. Contact Links & Social Links
    const emailLink = document.getElementById('contact-email-link');
    if (emailLink) {
        emailLink.href = `mailto:${prof.email || ''}`;
        document.getElementById('contact-email-text').textContent = prof.email || '';
    }

    const waPhone = prof.whatsapp || prof.phone || '';
    const waLink = document.getElementById('contact-wa-link');
    if (waLink) {
        waLink.href = `https://wa.me/${waPhone}?text=Halo,%20saya%20tertarik%20bekerjasama`;
        document.getElementById('contact-wa-text').textContent = prof.phone || '';
    }

    const gh = document.getElementById('social-github');
    if (gh) gh.href = prof.github || "#";

    const li = document.getElementById('social-linkedin');
    if (li) li.href = prof.linkedin || "#";

    const ig = document.getElementById('social-instagram');
    if (ig) ig.href = prof.instagram || "#";

    // Footer Social Links
    const fgh = document.getElementById('footer-github');
    if (fgh) fgh.href = prof.github || "#";

    const fli = document.getElementById('footer-linkedin');
    if (fli) fli.href = prof.linkedin || "#";

    const fig = document.getElementById('footer-instagram');
    if (fig) fig.href = prof.instagram || "#";

    // Render Sections with 3-items-per-page constraint
    renderSkills(db.skills || []);
    renderExperiences(db.experiences || []);
    renderProjects(db.projects || []);
    renderEducationCards(db.education || []);
    renderCertificationPhotos(db.certifications || []);
}

// HELPER: GENERATE PAGINATION HTML CONTROLS
function generatePaginationHTML(currentPage, totalPages, totalItems, sectionName, changePageFnName) {
    if (totalPages <= 1) return '';

    return `
        <div class="flex items-center justify-center gap-2 mt-8 sm:mt-12">
            <button onclick="${changePageFnName}(${currentPage - 1})" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border bg-card text-primary flex items-center justify-center hover:border-bronze hover:text-bronze transition-all ${currentPage === 1 ? 'opacity-40 pointer-events-none' : ''}">
                <i class="fa-solid fa-chevron-left text-xs sm:text-sm"></i>
            </button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                <button onclick="${changePageFnName}(${page})" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center transition-all ${currentPage === page ? 'bg-bronze text-white shadow-md' : 'border border-border bg-card text-primary hover:border-bronze'}">
                    ${page}
                </button>
            `).join('')}
            <button onclick="${changePageFnName}(${currentPage + 1})" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border bg-card text-primary flex items-center justify-center hover:border-bronze hover:text-bronze transition-all ${currentPage === totalPages ? 'opacity-40 pointer-events-none' : ''}">
                <i class="fa-solid fa-chevron-right text-xs sm:text-sm"></i>
            </button>
        </div>
        <p class="text-center text-[11px] sm:text-xs text-muted mt-3 font-medium">Menampilkan 3 dari ${totalItems} ${sectionName} (Halaman ${currentPage} dari ${totalPages})</p>
    `;
}

// 1. TECHNICAL SKILLS (SUPPORT CUSTOM IMAGE LOGOS)
function renderSkills(skills) {
    const container = document.getElementById('skills-container-grid');
    if (!container) return;

    if (!skills || skills.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center py-10 border border-dashed border-border rounded-3xl bg-card"><i class="fa-solid fa-code text-2xl text-bronze mb-2 block"></i><p class="text-xs text-muted font-semibold">Belum ada skill yang ditambahkan. Silakan isi melalui Admin CMS.</p></div>`;
        const pagContainer = document.getElementById('skills-pagination');
        if (pagContainer) pagContainer.innerHTML = '';
        return;
    }

    const totalSkills = skills.length;
    const totalPages = Math.ceil(totalSkills / SKILLS_PER_PAGE);
    if (currentSkillPage > totalPages) currentSkillPage = 1;

    const startIdx = (currentSkillPage - 1) * SKILLS_PER_PAGE;
    const paginatedSkills = skills.slice(startIdx, startIdx + SKILLS_PER_PAGE);

    container.innerHTML = paginatedSkills.map(skill => `
        <div class="creative-skill-card fade-in-up">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bronze/10 text-bronze flex items-center justify-center text-lg sm:text-xl shrink-0 border border-bronze/20 shadow-sm overflow-hidden p-1.5">
                ${skill.image ? `
                    <img src="${skill.image}" alt="${skill.name}" class="w-full h-full object-contain rounded-lg" onerror="this.outerHTML='<i class=\\'${skill.icon || 'fa-solid fa-code'}\\'></i>'">
                ` : `
                    <i class="${skill.icon || 'fa-solid fa-code'}"></i>
                `}
            </div>
            <div class="flex-1 min-w-0">
                <h3 class="font-bold font-display text-base sm:text-lg text-primary truncate">${skill.name}</h3>
                <span class="text-[10px] font-extrabold text-bronze uppercase tracking-widest block mt-0.5">${skill.category}</span>
            </div>
        </div>
    `).join('');

    const pagContainer = document.getElementById('skills-pagination');
    if (pagContainer) {
        pagContainer.innerHTML = generatePaginationHTML(currentSkillPage, totalPages, totalSkills, 'skill', 'changeSkillPage');
    }
}

function changeSkillPage(newPage) {
    const db = getPortfolioData();
    const totalPages = Math.ceil((db.skills || []).length / SKILLS_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
        currentSkillPage = newPage;
        renderSkills(db.skills || []);
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }
}

// 2. WORK EXPERIENCE
function renderExperiences(experiences) {
    const container = document.getElementById('experience-timeline');
    if (!container) return;

    if (!experiences || experiences.length === 0) {
        container.innerHTML = `<div class="text-center py-10 border border-dashed border-border rounded-3xl bg-card"><i class="fa-solid fa-briefcase text-2xl text-bronze mb-2 block"></i><p class="text-xs text-muted font-semibold">Belum ada jejak karir yang ditambahkan. Silakan isi melalui Admin CMS.</p></div>`;
        const pagContainer = document.getElementById('experience-pagination');
        if (pagContainer) pagContainer.innerHTML = '';
        return;
    }

    const totalExp = experiences.length;
    const totalPages = Math.ceil(totalExp / EXPERIENCES_PER_PAGE);
    if (currentExperiencePage > totalPages) currentExperiencePage = 1;

    const startIdx = (currentExperiencePage - 1) * EXPERIENCES_PER_PAGE;
    const paginatedExp = experiences.slice(startIdx, startIdx + EXPERIENCES_PER_PAGE);

    container.className = 'experience-editorial-container';
    container.innerHTML = paginatedExp.map((exp, idx) => {
        const isEven = idx % 2 === 1;
        const reverseClass = isEven ? 'reverse-row' : '';

        return `
            <div class="exp-editorial-row ${reverseClass} fade-in-up">
                
                <div class="exp-editorial-photo-box" onclick="openCertImageModal('${exp.photo || ''}', '${exp.role}', '${exp.company}')">
                    <img src="${exp.photo || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FDECF2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23D81B60'%3EFoto Pekerjaan%3C/text%3E%3C/svg%3E"}" alt="${exp.company}">
                    <span class="nav-pill-menu-btn absolute top-3 left-3 text-[10px] py-1 px-3 shadow-lg">${exp.period}</span>
                </div>

                <div class="exp-editorial-content-box space-y-2 sm:space-y-3">
                    <span class="text-xs font-extrabold text-bronze uppercase tracking-widest block">${exp.company}</span>
                    <h3 class="text-xl sm:text-2xl font-bold font-display text-primary leading-snug">${exp.role}</h3>
                    <p class="text-secondary text-sm leading-relaxed">${exp.description}</p>
                    <div class="pt-1">
                        <button onclick="openCertImageModal('${exp.photo || ''}', '${exp.role}', '${exp.company}')" class="inline-flex items-center gap-2 text-xs font-bold text-bronze hover:underline">
                            <i class="fa-solid fa-expand"></i> lihat Foto Dokumentasi
                        </button>
                    </div>
                </div>

            </div>
        `;
    }).join('');

    const pagContainer = document.getElementById('experience-pagination');
    if (pagContainer) {
        pagContainer.innerHTML = generatePaginationHTML(currentExperiencePage, totalPages, totalExp, 'riwayat pengalaman', 'changeExperiencePage');
    }
}

function changeExperiencePage(newPage) {
    const db = getPortfolioData();
    const totalPages = Math.ceil((db.experiences || []).length / EXPERIENCES_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
        currentExperiencePage = newPage;
        renderExperiences(db.experiences || []);
        document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
    }
}

// 3. FEATURED PROJECTS
function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    if (!projects || projects.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center py-10 border border-dashed border-border rounded-3xl bg-card"><i class="fa-solid fa-layer-group text-2xl text-bronze mb-2 block"></i><p class="text-xs text-muted font-semibold">Belum ada proyek yang ditambahkan. Silakan isi melalui Admin CMS.</p></div>`;
        const pagContainer = document.getElementById('projects-pagination');
        if (pagContainer) pagContainer.innerHTML = '';
        return;
    }

    const totalProjects = projects.length;
    const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);
    if (currentProjectPage > totalPages) currentProjectPage = 1;

    const startIdx = (currentProjectPage - 1) * PROJECTS_PER_PAGE;
    const paginatedProjects = projects.slice(startIdx, startIdx + PROJECTS_PER_PAGE);

    container.innerHTML = paginatedProjects.map(proj => `
        <div class="creative-normal-card fade-in-up" onclick="openProjectModal(${proj.id})">
            
            <div class="creative-card-img-box">
                <img src="${proj.coverImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FDECF2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23D81B60'%3ECover Proyek%3C/text%3E%3C/svg%3E"}" alt="${proj.title}">
                <span class="nav-pill-menu-btn absolute top-3 left-3 text-[10px] py-1 px-3 shadow-lg">${proj.role}</span>
            </div>

            <div class="creative-card-footer">
                <div>
                    <h3 class="font-bold font-display text-sm sm:text-base text-primary leading-snug">${proj.title}</h3>
                    <p class="text-[11px] text-muted mt-0.5 font-medium">${(proj.technologies || []).slice(0, 2).join(' • ')}</p>
                </div>
                <button class="w-8 h-8 rounded-full bg-bronze text-white flex items-center justify-center text-xs shadow-md shrink-0">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </button>
            </div>

        </div>
    `).join('');

    const pagContainer = document.getElementById('projects-pagination');
    if (pagContainer) {
        pagContainer.innerHTML = generatePaginationHTML(currentProjectPage, totalPages, totalProjects, 'proyek', 'changeProjectPage');
    }
}

function changeProjectPage(newPage) {
    const db = getPortfolioData();
    const totalPages = Math.ceil((db.projects || []).length / PROJECTS_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
        currentProjectPage = newPage;
        renderProjects(db.projects || []);
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
}

// 4. EDUCATION CARDS
function renderEducationCards(eduList) {
    const container = document.getElementById('education-cards-grid');
    if (!container) return;

    if (!eduList || eduList.length === 0) {
        container.innerHTML = `<div class="text-center py-8 border border-dashed border-border rounded-3xl bg-card"><i class="fa-solid fa-graduation-cap text-2xl text-bronze mb-2 block"></i><p class="text-xs text-muted font-semibold">Belum ada riwayat pendidikan yang ditambahkan.</p></div>`;
        const pagContainer = document.getElementById('education-pagination');
        if (pagContainer) pagContainer.innerHTML = '';
        return;
    }

    const totalEdu = eduList.length;
    const totalPages = Math.ceil(totalEdu / EDUCATION_PER_PAGE);
    if (currentEducationPage > totalPages) currentEducationPage = 1;

    const startIdx = (currentEducationPage - 1) * EDUCATION_PER_PAGE;
    const paginatedEdu = eduList.slice(startIdx, startIdx + EDUCATION_PER_PAGE);

    container.innerHTML = paginatedEdu.map(item => `
        <div class="p-5 sm:p-8 rounded-3xl border border-border bg-card fade-in-up hover:border-bronze transition-all mb-4">
            <div class="flex items-start gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-bronze/10 text-bronze flex items-center justify-center text-lg sm:text-xl shrink-0">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                    <span class="text-[10px] sm:text-xs font-bold text-bronze uppercase tracking-wider">Pendidikan Formal</span>
                    <h3 class="text-lg sm:text-xl font-bold font-display mt-1 text-primary">${item.degree}</h3>
                    <p class="text-xs font-semibold text-muted mt-1">${item.institution} • <span class="text-bronze font-bold">${item.period}</span></p>
                    <p class="text-xs sm:text-sm text-secondary mt-3 leading-relaxed">${item.description}</p>
                </div>
            </div>
        </div>
    `).join('');

    const pagContainer = document.getElementById('education-pagination');
    if (pagContainer) {
        pagContainer.innerHTML = generatePaginationHTML(currentEducationPage, totalPages, totalEdu, 'riwayat pendidikan', 'changeEducationPage');
    }
}

function changeEducationPage(newPage) {
    const db = getPortfolioData();
    const totalPages = Math.ceil((db.education || []).length / EDUCATION_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
        currentEducationPage = newPage;
        renderEducationCards(db.education || []);
        document.getElementById('education').scrollIntoView({ behavior: 'smooth' });
    }
}

// 5. CERTIFICATIONS & AWARDS PHOTOS
function renderCertificationPhotos(certList) {
    const container = document.getElementById('certifications-photos-grid');
    if (!container) return;

    if (!certList || certList.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center py-8 border border-dashed border-border rounded-3xl bg-card"><i class="fa-solid fa-award text-2xl text-bronze mb-2 block"></i><p class="text-xs text-muted font-semibold">Belum ada foto sertifikat/piagam yang ditambahkan.</p></div>`;
        const pagContainer = document.getElementById('certifications-pagination');
        if (pagContainer) pagContainer.innerHTML = '';
        return;
    }

    const totalCert = certList.length;
    const totalPages = Math.ceil(totalCert / CERTIFICATIONS_PER_PAGE);
    if (currentCertificationPage > totalPages) currentCertificationPage = 1;

    const startIdx = (currentCertificationPage - 1) * CERTIFICATIONS_PER_PAGE;
    const paginatedCert = certList.slice(startIdx, startIdx + CERTIFICATIONS_PER_PAGE);

    container.innerHTML = paginatedCert.map(cert => `
        <div class="creative-normal-card fade-in-up" onclick="openCertImageModal('${cert.image || ''}', '${cert.title}', '${cert.issuer}')">
            
            <div class="creative-card-img-box">
                <img src="${cert.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23FDECF2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' font-weight='bold' fill='%23D81B60'%3EFoto Sertifikat%3C/text%3E%3C/svg%3E"}" alt="${cert.title}">
                <span class="nav-pill-menu-btn absolute top-3 left-3 text-[10px] py-1 px-3 shadow-lg">${cert.year}</span>
            </div>

            <div class="creative-card-footer">
                <div>
                    <h3 class="font-bold font-display text-sm sm:text-base text-primary leading-snug">${cert.title}</h3>
                    <p class="text-[11px] text-muted mt-0.5 font-medium">${cert.issuer}</p>
                </div>
                <button class="w-8 h-8 rounded-full bg-bronze text-white flex items-center justify-center text-xs shadow-md shrink-0">
                    <i class="fa-solid fa-expand"></i>
                </button>
            </div>

        </div>
    `).join('');

    const pagContainer = document.getElementById('certifications-pagination');
    if (pagContainer) {
        pagContainer.innerHTML = generatePaginationHTML(currentCertificationPage, totalPages, totalCert, 'sertifikat', 'changeCertificationPage');
    }
}

function changeCertificationPage(newPage) {
    const db = getPortfolioData();
    const totalPages = Math.ceil((db.certifications || []).length / CERTIFICATIONS_PER_PAGE);
    if (newPage >= 1 && newPage <= totalPages) {
        currentCertificationPage = newPage;
        renderCertificationPhotos(db.certifications || []);
        document.getElementById('education').scrollIntoView({ behavior: 'smooth' });
    }
}

function openCertImageModal(imgUrl, title, issuer) {
    const modalBody = document.getElementById('project-modal-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="p-4 sm:p-8 text-center">
            <h2 class="text-xl sm:text-2xl font-bold font-display mb-1 text-bronze">${title}</h2>
            <p class="text-xs font-bold text-muted uppercase tracking-wider mb-4 sm:mb-6">${issuer}</p>
            <div class="rounded-2xl overflow-hidden shadow-2xl border border-border mb-4 sm:mb-6">
                <img src="${imgUrl}" alt="${title}" class="w-full max-h-[500px] object-contain bg-black/5">
            </div>
        </div>
    `;

    const overlay = document.getElementById('project-modal');
    if (overlay) overlay.classList.add('active');
}

function openProjectModal(id) {
    const db = getPortfolioData();
    const proj = (db.projects || []).find(p => p.id === id);
    if (!proj) return;

    const modalBody = document.getElementById('project-modal-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="p-5 sm:p-8">
            <div class="rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-lg border border-border">
                <img id="modal-main-img" src="${proj.coverImage}" alt="${proj.title}" class="w-full max-h-[400px] object-cover object-top">
            </div>

            ${proj.gallery && proj.gallery.length > 1 ? `
                <div class="flex gap-3 overflow-x-auto pb-3 mb-4 sm:mb-6">
                    ${proj.gallery.map(imgUrl => `
                        <img src="${imgUrl}" onclick="document.getElementById('modal-main-img').src='${imgUrl}'" class="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-bronze transition-all">
                    `).join('')}
                </div>
            ` : ''}

            <h2 class="text-2xl sm:text-3xl font-bold font-display mb-2 text-bronze">${proj.title}</h2>
            <p class="text-xs sm:text-sm font-semibold text-muted mb-4"><i class="fa-solid fa-user-tag text-bronze"></i> Role: ${proj.role}</p>
            
            <div class="flex flex-wrap gap-2 mb-6">
                ${(proj.technologies || []).map(t => `<span class="badge-tag">${t}</span>`).join('')}
            </div>

            <h4 class="font-bold text-base sm:text-lg mb-2 border-b border-gray-200 pb-2 text-primary">Deskripsi Proyek</h4>
            <p class="text-secondary text-sm leading-relaxed mb-6">${proj.description}</p>
            
            <div class="flex flex-wrap gap-3 sm:gap-4 pt-4 border-t border-gray-200">
                ${proj.demoUrl ? `<a href="${proj.demoUrl}" target="_blank" class="btn-bronze text-xs sm:text-sm"><i class="fa-solid fa-external-link"></i> Live Demo</a>` : ''}
                ${proj.githubUrl ? `<a href="${proj.githubUrl}" target="_blank" class="btn-bronze-outline text-xs sm:text-sm"><i class="fa-brands fa-github"></i> Repository GitHub</a>` : ''}
            </div>
        </div>
    `;

    const overlay = document.getElementById('project-modal');
    if (overlay) overlay.classList.add('active');
}

function closeProjectModal() {
    const overlay = document.getElementById('project-modal');
    if (overlay) overlay.classList.remove('active');
}

function initThemeEngine() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('destina_theme', 'light');
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="${type === 'success' ? 'fa-solid fa-circle-check text-green-500' : 'fa-solid fa-circle-info text-bronze'}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;

        if (!name || !email || !message) {
            showToast("Harap isi semua kolom formulir!", "info");
            return;
        }

        showToast(`Terima kasih ${name}, pesan Anda berhasil dikirim!`, "success");
        form.reset();
    });
}

function downloadCV() {
    const db = getPortfolioData();
    const cvText = `
==================================================
CV - ${(db.profile.name || "PORTOFOLIO").toUpperCase()}
${db.profile.title || ""}
Email: ${db.profile.email || ""} | Phone: ${db.profile.phone || ""}
Website: ${window.location.href}
==================================================

TENTANG SAYA
${db.profile.about || ""}

PENGALAMAN KERJA
${(db.experiences || []).map(e => `
- ${e.role} | ${e.company} (${e.period})
  ${e.description}
`).join('\n')}

PENDIDIKAN
${(db.education || []).map(e => `
- ${e.degree} (${e.institution}, ${e.period})
  ${e.description}
`).join('\n')}

SERTIFIKAT & PIAGAM
${(db.certifications || []).map(c => `
- ${c.title} (${c.issuer}, ${c.year})
  ${c.description}
`).join('\n')}
    `;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `CV_${(db.profile.name || "Portofolio").replace(/\s+/g, '_')}.txt`;
    link.click();
    showToast("File CV berhasil diunduh!", "success");
}

document.addEventListener('DOMContentLoaded', async () => {
    initThemeEngine();

    // Initial Render from LocalStorage immediately
    renderAllPortfolioSections();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
});
