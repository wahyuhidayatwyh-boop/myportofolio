/* ==========================================================================
   PORTOFOLIO V6 - CMS DASHBOARD ENGINE
   ========================================================================== */

const STORAGE_KEY = "PORTFOLIO_DATA_V6";
const FALLBACK_KEY = "PORTFOLIO_DATA_V5";

let cmsData = null;

document.addEventListener("DOMContentLoaded", () => {
    cmsData = loadCMSData();
    initCMSUI();
});

function loadCMSData() {
    let data = null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(FALLBACK_KEY);
        if (stored) data = JSON.parse(stored);
    } catch (e) {
        console.error("Error reading CMS storage", e);
    }

    const defaultData = typeof DEFAULT_PORTFOLIO_DATA !== "undefined" ? DEFAULT_PORTFOLIO_DATA : {};

    if (!data || typeof data !== "object") {
        data = JSON.parse(JSON.stringify(defaultData));
    } else {
        // Deep fallback merge for profile & arrays to ensure fields are never empty
        data.profile = Object.assign({}, defaultData.profile || {}, data.profile || {});
        if (!data.projects || !Array.isArray(data.projects) || data.projects.length === 0) {
            data.projects = JSON.parse(JSON.stringify(defaultData.projects || []));
        }
        if (!data.skills || !Array.isArray(data.skills) || data.skills.length === 0) {
            data.skills = JSON.parse(JSON.stringify(defaultData.skills || []));
        }
        if (!data.experiences || !Array.isArray(data.experiences) || data.experiences.length === 0) {
            data.experiences = JSON.parse(JSON.stringify(defaultData.experiences || []));
        }
        if (!data.education || !Array.isArray(data.education) || data.education.length === 0) {
            data.education = JSON.parse(JSON.stringify(defaultData.education || []));
        }
        if (!data.certifications || !Array.isArray(data.certifications) || data.certifications.length === 0) {
            data.certifications = JSON.parse(JSON.stringify(defaultData.certifications || []));
        }
    }
    return data;
}

function saveCMSData() {
    cmsData.updatedAt = Date.now();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cmsData));
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(cmsData));
        showToast("✅ Perubahan berhasil disimpan!");
    } catch (e) {
        showToast("❌ Gagal menyimpan data: " + e.message);
    }
}

function showToast(msg) {
    let toast = document.getElementById("cms-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cms-toast";
        toast.className = "fixed bottom-5 right-5 bg-slate-900 border border-white text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-2xl z-50 transition-all duration-300 transform translate-y-10 opacity-0";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.remove("translate-y-10", "opacity-0");
    setTimeout(() => {
        toast.classList.add("translate-y-10", "opacity-0");
    }, 3000);
}

function switchTab(target) {
    const tabBtns = document.querySelectorAll(".cms-tab-btn");
    const tabContents = document.querySelectorAll(".cms-tab-content");

    tabBtns.forEach(b => {
        const tab = b.getAttribute("data-tab");
        if (tab === target) {
            b.className = "cms-tab-btn active px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white flex items-center gap-2 whitespace-nowrap shadow-md cursor-pointer transition-all";
        } else {
            b.className = "cms-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all";
        }
    });

    tabContents.forEach(c => c.classList.add("hidden"));
    const targetEl = document.getElementById(`tab-${target}`);
    if (targetEl) targetEl.classList.remove("hidden");
}

window.switchTab = switchTab;

function initCMSUI() {
    // 1. Tab navigation listeners
    const tabBtns = document.querySelectorAll(".cms-tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-tab");
            if (target) switchTab(target);
        });
    });

    // 2. Render CMS Sections
    try {
        renderProfileForm();
        renderProjectsList();
        renderSkillsList();
        renderExperiencesList();
        renderEducationList();
        renderCertificationsList();
    } catch (e) {
        console.error("Error initializing CMS lists", e);
    }

    // Profile Save Buttons (All tabs)
    const saveProfileBtns = document.querySelectorAll(".save-profile-btn");
    saveProfileBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            updateProfileFromForm();
            saveCMSData();
        });
    });

    // Reset Data Button
    const resetBtn = document.getElementById("reset-data-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("Apakah Anda yakin ingin mengembalikan data ke pengaturan awal (default)? Semua perubahan akan ditimpa.")) {
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(FALLBACK_KEY);
                cmsData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
                saveCMSData();
                location.reload();
            }
        });
    }

    // Image Upload Helpers
    setupImageUpload("profile-avatar-input", (dataUrl) => { cmsData.profile.avatar = dataUrl; });
    setupImageUpload("hero-bg-photo-input", (dataUrl) => { cmsData.profile.heroBgPhoto = dataUrl; });
    setupImageUpload("about-photo-input", (dataUrl) => { cmsData.profile.aboutPhoto = dataUrl; });

    // Project & Certification Image Upload Helpers
    setupFileInput("proj-image-file", "proj-image");
    setupFileInput("cert-image-file", "cert-image");
}

function renderProfileForm() {
    const p = cmsData.profile || {};
    const d = (typeof DEFAULT_PORTFOLIO_DATA !== "undefined" && DEFAULT_PORTFOLIO_DATA.profile) ? DEFAULT_PORTFOLIO_DATA.profile : {};

    setInputValue("input-name", p.name || d.name || "Kevin");
    setInputValue("input-title", p.title || d.title || "Full Stack Web Developer & Creative Specialist");
    setInputValue("input-heroBio", p.heroBio || d.heroBio || "Halo, saya Kevin. Selamat datang di portofolio personal & showcase karya profesional saya.");
    setInputValue("input-tagline", p.tagline || d.tagline || "Menciptakan solusi digital berestetika tinggi dan performa optimal.");
    setInputValue("input-aboutSubtitle", p.aboutSubtitle || d.aboutSubtitle || "Behind The Code");
    setInputValue("input-aboutTitle", p.aboutTitle || d.aboutTitle || "Solusi Digital Berbasis Teknologi Modern & Desain Elegan.");
    setInputValue("input-about", p.about || d.about || "Saya berfokus pada pembuatan aplikasi web responsif, arsitektur kode yang bersih, dan antarmuka pengguna yang intuitif.");
    setInputValue("input-yearsExp", p.yearsExp || d.yearsExp || "04+");
    setInputValue("input-projectsDone", p.projectsDone || d.projectsDone || "25+");
    setInputValue("input-happyClients", p.happyClients || d.happyClients || "15+");
    setInputValue("input-email", p.email || d.email || "Kevin@example.com");
    setInputValue("input-phone", p.phone || d.phone || "+628123456789");
    setInputValue("input-whatsapp", p.whatsapp || d.whatsapp || "628123456789");
    setInputValue("input-cvUrl", p.cvUrl || d.cvUrl || "#");
    setInputValue("input-github", p.github || d.github || "https://github.com");
    setInputValue("input-linkedin", p.linkedin || d.linkedin || "https://linkedin.com");
    setInputValue("input-instagram", p.instagram || d.instagram || "https://instagram.com");
    setInputValue("input-servicesTitle", p.servicesTitle || d.servicesTitle || "Full Stack Web & Software Engineering");
    setInputValue("input-servicesDesc", p.servicesDesc || d.servicesDesc || "Membangun aplikasi web berperforma tinggi, skalabel, responsif, dan berestetika visual modern dengan standar arsitektur terbaik.");
    setInputValue("input-collaborateTitle", p.collaborateTitle || d.collaborateTitle || "Let's Build Your Brand Together!");
    setInputValue("input-collaborateDesc", p.collaborateDesc || d.collaborateDesc || "Punya ide proyek digital baru atau butuh pengembang profesional untuk merealisasikan visi Anda?");
}

function updateProfileFromForm() {
    cmsData.profile = cmsData.profile || {};
    cmsData.profile.name = getInputValue("input-name");
    cmsData.profile.title = getInputValue("input-title");
    cmsData.profile.heroBio = getInputValue("input-heroBio");
    cmsData.profile.tagline = getInputValue("input-tagline");
    cmsData.profile.aboutSubtitle = getInputValue("input-aboutSubtitle");
    cmsData.profile.aboutTitle = getInputValue("input-aboutTitle");
    cmsData.profile.about = getInputValue("input-about");
    cmsData.profile.yearsExp = getInputValue("input-yearsExp");
    cmsData.profile.projectsDone = getInputValue("input-projectsDone");
    cmsData.profile.happyClients = getInputValue("input-happyClients");
    cmsData.profile.email = getInputValue("input-email");
    cmsData.profile.phone = getInputValue("input-phone");
    cmsData.profile.whatsapp = getInputValue("input-whatsapp");
    cmsData.profile.cvUrl = getInputValue("input-cvUrl");
    cmsData.profile.github = getInputValue("input-github");
    cmsData.profile.linkedin = getInputValue("input-linkedin");
    cmsData.profile.instagram = getInputValue("input-instagram");
    cmsData.profile.servicesTitle = getInputValue("input-servicesTitle");
    cmsData.profile.servicesDesc = getInputValue("input-servicesDesc");
    cmsData.profile.collaborateTitle = getInputValue("input-collaborateTitle");
    cmsData.profile.collaborateDesc = getInputValue("input-collaborateDesc");
}

function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || "";
}

function getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
}

function setupImageUpload(inputId, callback) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                callback(evt.target.result);
                saveCMSData();
                showToast("📷 Foto berhasil diunggah!");
            };
            reader.readAsDataURL(file);
        }
    });
}

function setupFileInput(inputId, targetInputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                setInputValue(targetInputId, evt.target.result);
                showToast("📷 File gambar berhasil dimuat!");
            };
            reader.readAsDataURL(file);
        }
    });
}

// --------------------------------------------------------------------------
// PROJECTS CMS
// --------------------------------------------------------------------------
function renderProjectsList() {
    const container = document.getElementById("cms-projects-list");
    if (!container) return;

    const list = cmsData.projects || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-6 text-slate-500 text-xs">Belum ada proyek. Silakan tambah di atas.</div>`;
        return;
    }

    container.innerHTML = list.map((item) => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <img src="${item.image || './assets/bg-orang.png'}" class="w-16 h-16 rounded-xl object-cover border border-slate-200" alt="">
                <div>
                    <span class="bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">${item.category || 'Web Application'}</span>
                    <h4 class="font-bold text-slate-900 text-base mt-1">${item.title}</h4>
                    <p class="text-xs text-slate-500 line-clamp-1">${item.description || ''}</p>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="editProject(${item.id})" class="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold"><i class="fa-solid fa-pen mr-1"></i> Edit</button>
                <button onclick="deleteProject(${item.id})" class="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold"><i class="fa-solid fa-trash mr-1"></i> Hapus</button>
            </div>
        </div>
    `).join('');
}

function addOrUpdateProject() {
    const title = getInputValue("proj-title");
    if (!title) return alert("Judul proyek harus diisi.");

    const idInput = getInputValue("proj-id");
    const category = getInputValue("proj-category") || "Web Application";
    const desc = getInputValue("proj-desc");
    const tagsStr = getInputValue("proj-tags");
    const tags = tagsStr ? tagsStr.split(",").map(t => t.trim()).filter(Boolean) : [];
    const image = getInputValue("proj-image") || "./assets/bg-orang.png";
    const demoUrl = getInputValue("proj-demoUrl");
    const repoUrl = getInputValue("proj-repoUrl");

    cmsData.projects = cmsData.projects || [];

    if (idInput) {
        const id = parseInt(idInput);
        const idx = cmsData.projects.findIndex(p => p.id === id);
        if (idx !== -1) {
            cmsData.projects[idx] = { id, title, category, description: desc, tags, image, demoUrl, repoUrl };
        }
    } else {
        const newId = Date.now();
        cmsData.projects.unshift({ id: newId, title, category, description: desc, tags, image, demoUrl, repoUrl });
    }

    saveCMSData();
    renderProjectsList();
    clearProjectForm();
}

function editProject(id) {
    const item = (cmsData.projects || []).find(p => p.id === id);
    if (!item) return;
    setInputValue("proj-id", item.id);
    setInputValue("proj-title", item.title);
    setInputValue("proj-category", item.category);
    setInputValue("proj-desc", item.description);
    setInputValue("proj-tags", (item.tags || []).join(", "));
    setInputValue("proj-image", item.image);
    setInputValue("proj-demoUrl", item.demoUrl);
    setInputValue("proj-repoUrl", item.repoUrl);

    const formEl = document.getElementById("proj-form");
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteProject(id) {
    if (confirm("Hapus proyek ini secara permanen?")) {
        cmsData.projects = (cmsData.projects || []).filter(p => p.id !== id);
        saveCMSData();
        renderProjectsList();
    }
}

function clearProjectForm() {
    setInputValue("proj-id", "");
    setInputValue("proj-title", "");
    setInputValue("proj-category", "");
    setInputValue("proj-desc", "");
    setInputValue("proj-tags", "");
    setInputValue("proj-image", "");
    setInputValue("proj-demoUrl", "");
    setInputValue("proj-repoUrl", "");
}

window.addOrUpdateProject = addOrUpdateProject;
window.editProject = editProject;
window.deleteProject = deleteProject;
window.clearProjectForm = clearProjectForm;

// --------------------------------------------------------------------------
// SKILLS CMS
// --------------------------------------------------------------------------
function renderSkillsList() {
    const container = document.getElementById("cms-skills-list");
    if (!container) return;

    const list = cmsData.skills || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-6 text-slate-500 text-xs">Belum ada skill yang ditambahkan.</div>`;
        return;
    }

    container.innerHTML = list.map(item => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <i class="fa-solid ${item.icon || 'fa-code'}"></i>
                </div>
                <div>
                    <h5 class="font-bold text-slate-900 text-sm">${item.name}</h5>
                    <span class="text-xs text-slate-500">${item.category || 'Skill'} • ${item.level || 80}%</span>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="editSkill(${item.id})" class="px-2.5 py-1 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteSkill(${item.id})" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function addOrUpdateSkill() {
    const name = getInputValue("skill-name");
    if (!name) return alert("Nama skill harus diisi.");

    const idInput = getInputValue("skill-id");
    const level = parseInt(getInputValue("skill-level")) || 80;
    const category = getInputValue("skill-category") || "Frontend";
    const icon = getInputValue("skill-icon") || "fa-code";

    cmsData.skills = cmsData.skills || [];

    if (idInput) {
        const id = parseInt(idInput);
        const idx = cmsData.skills.findIndex(s => s.id === id);
        if (idx !== -1) {
            cmsData.skills[idx] = { id, name, level, category, icon };
        }
    } else {
        cmsData.skills.unshift({ id: Date.now(), name, level, category, icon });
    }

    saveCMSData();
    renderSkillsList();
    clearSkillForm();
}

function editSkill(id) {
    const item = (cmsData.skills || []).find(s => s.id === id);
    if (!item) return;
    setInputValue("skill-id", item.id);
    setInputValue("skill-name", item.name);
    setInputValue("skill-level", item.level);
    setInputValue("skill-category", item.category);
    setInputValue("skill-icon", item.icon);

    const formEl = document.getElementById("skill-form");
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteSkill(id) {
    if (confirm("Hapus skill keahlian ini?")) {
        cmsData.skills = (cmsData.skills || []).filter(s => s.id !== id);
        saveCMSData();
        renderSkillsList();
    }
}

function clearSkillForm() {
    setInputValue("skill-id", "");
    setInputValue("skill-name", "");
    setInputValue("skill-level", "85");
    setInputValue("skill-category", "");
    setInputValue("skill-icon", "");
}

window.addOrUpdateSkill = addOrUpdateSkill;
window.editSkill = editSkill;
window.deleteSkill = deleteSkill;
window.clearSkillForm = clearSkillForm;

// --------------------------------------------------------------------------
// EXPERIENCES CMS
// --------------------------------------------------------------------------
function renderExperiencesList() {
    const container = document.getElementById("cms-exp-list");
    if (!container) return;

    const list = cmsData.experiences || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-6 text-slate-500 text-xs">Belum ada riwayat pengalaman kerja.</div>`;
        return;
    }

    container.innerHTML = list.map(item => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <span class="bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">${item.period || ''}</span>
                <h5 class="font-bold text-slate-900 text-base mt-1">${item.role}</h5>
                <p class="text-xs text-slate-500 font-medium">${item.company || ''}</p>
                <p class="text-xs text-slate-600 mt-1 line-clamp-1">${item.description || ''}</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="editExp(${item.id})" class="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold"><i class="fa-solid fa-pen mr-1"></i> Edit</button>
                <button onclick="deleteExp(${item.id})" class="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold"><i class="fa-solid fa-trash mr-1"></i> Hapus</button>
            </div>
        </div>
    `).join('');
}

function addOrUpdateExp() {
    const role = getInputValue("exp-role");
    if (!role) return alert("Posisi/Role harus diisi.");

    const idInput = getInputValue("exp-id");
    const company = getInputValue("exp-company");
    const period = getInputValue("exp-period");
    const desc = getInputValue("exp-desc");

    cmsData.experiences = cmsData.experiences || [];

    if (idInput) {
        const id = parseInt(idInput);
        const idx = cmsData.experiences.findIndex(e => e.id === id);
        if (idx !== -1) {
            cmsData.experiences[idx] = { id, role, company, period, description: desc, skills: [] };
        }
    } else {
        cmsData.experiences.unshift({ id: Date.now(), role, company, period, description: desc, skills: [] });
    }

    saveCMSData();
    renderExperiencesList();
    clearExpForm();
}

function editExp(id) {
    const item = (cmsData.experiences || []).find(e => e.id === id);
    if (!item) return;
    setInputValue("exp-id", item.id);
    setInputValue("exp-role", item.role);
    setInputValue("exp-company", item.company);
    setInputValue("exp-period", item.period);
    setInputValue("exp-desc", item.description);

    const formEl = document.getElementById("exp-form");
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteExp(id) {
    if (confirm("Hapus riwayat pengalaman ini?")) {
        cmsData.experiences = (cmsData.experiences || []).filter(e => e.id !== id);
        saveCMSData();
        renderExperiencesList();
    }
}

function clearExpForm() {
    setInputValue("exp-id", "");
    setInputValue("exp-role", "");
    setInputValue("exp-company", "");
    setInputValue("exp-period", "");
    setInputValue("exp-desc", "");
}

window.addOrUpdateExp = addOrUpdateExp;
window.editExp = editExp;
window.deleteExp = deleteExp;
window.clearExpForm = clearExpForm;

// --------------------------------------------------------------------------
// EDUCATION & CERTIFICATIONS CMS
// --------------------------------------------------------------------------
function renderEducationList() {
    const container = document.getElementById("cms-edu-list");
    if (!container) return;

    const list = cmsData.education || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="text-center py-6 text-slate-500 text-xs">Belum ada data pendidikan.</div>`;
        return;
    }

    container.innerHTML = list.map(item => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div>
                <span class="text-slate-900 text-xs font-bold">${item.year || ''}</span>
                <h5 class="font-bold text-slate-900 text-sm">${item.degree}</h5>
                <p class="text-xs text-slate-500">${item.institution || ''}</p>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="editEdu(${item.id})" class="px-2.5 py-1 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteEdu(${item.id})" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function addOrUpdateEdu() {
    const degree = getInputValue("edu-degree");
    if (!degree) return alert("Gelar/Program harus diisi.");

    const idInput = getInputValue("edu-id");
    const inst = getInputValue("edu-inst");
    const year = getInputValue("edu-year");
    const desc = getInputValue("edu-desc");

    cmsData.education = cmsData.education || [];

    if (idInput) {
        const id = parseInt(idInput);
        const idx = cmsData.education.findIndex(e => e.id === id);
        if (idx !== -1) {
            cmsData.education[idx] = { id, degree, institution: inst, year, description: desc };
        }
    } else {
        cmsData.education.unshift({ id: Date.now(), degree, institution: inst, year, description: desc });
    }

    saveCMSData();
    renderEducationList();
    clearEduForm();
}

function editEdu(id) {
    const item = (cmsData.education || []).find(e => e.id === id);
    if (!item) return;
    setInputValue("edu-id", item.id);
    setInputValue("edu-degree", item.degree);
    setInputValue("edu-inst", item.institution);
    setInputValue("edu-year", item.year);
    setInputValue("edu-desc", item.description);

    const formEl = document.getElementById("edu-form");
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteEdu(id) {
    if (confirm("Hapus riwayat pendidikan ini?")) {
        cmsData.education = (cmsData.education || []).filter(e => e.id !== id);
        saveCMSData();
        renderEducationList();
    }
}

function clearEduForm() {
    setInputValue("edu-id", "");
    setInputValue("edu-degree", "");
    setInputValue("edu-inst", "");
    setInputValue("edu-year", "");
    setInputValue("edu-desc", "");
}

window.addOrUpdateEdu = addOrUpdateEdu;
window.editEdu = editEdu;
window.deleteEdu = deleteEdu;
window.clearEduForm = clearEduForm;

function renderCertificationsList() {
    const container = document.getElementById("cms-cert-list");
    if (!container) return;

    const list = cmsData.certifications || [];
    if (list.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-6 text-slate-500 text-xs">Belum ada sertifikasi.</div>`;
        return;
    }

    container.innerHTML = list.map(item => `
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="${item.image || './assets/bg-orang.png'}" class="w-12 h-12 rounded-xl object-cover border border-slate-200" alt="">
                <div>
                    <h5 class="font-bold text-slate-900 text-sm">${item.title}</h5>
                    <p class="text-xs text-slate-500">${item.issuer || ''} • ${item.year || ''}</p>
                </div>
            </div>
            <div class="flex items-center gap-1">
                <button onclick="editCert(${item.id})" class="px-2.5 py-1 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold"><i class="fa-solid fa-pen"></i></button>
                <button onclick="deleteCert(${item.id})" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-semibold"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function addOrUpdateCert() {
    const title = getInputValue("cert-title");
    if (!title) return alert("Nama sertifikat harus diisi.");

    const idInput = getInputValue("cert-id");
    const issuer = getInputValue("cert-issuer");
    const year = getInputValue("cert-year");
    const image = getInputValue("cert-image") || "./assets/bg-orang.png";

    cmsData.certifications = cmsData.certifications || [];

    if (idInput) {
        const id = parseInt(idInput);
        const idx = cmsData.certifications.findIndex(c => c.id === id);
        if (idx !== -1) {
            cmsData.certifications[idx] = { id, title, issuer, year, image };
        }
    } else {
        cmsData.certifications.unshift({ id: Date.now(), title, issuer, year, image });
    }

    saveCMSData();
    renderCertificationsList();
    clearCertForm();
}

function editCert(id) {
    const item = (cmsData.certifications || []).find(c => c.id === id);
    if (!item) return;
    setInputValue("cert-id", item.id);
    setInputValue("cert-title", item.title);
    setInputValue("cert-issuer", item.issuer);
    setInputValue("cert-year", item.year);
    setInputValue("cert-image", item.image);

    const formEl = document.getElementById("cert-form");
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function deleteCert(id) {
    if (confirm("Hapus sertifikat ini?")) {
        cmsData.certifications = (cmsData.certifications || []).filter(c => c.id !== id);
        saveCMSData();
        renderCertificationsList();
    }
}

function clearCertForm() {
    setInputValue("cert-id", "");
    setInputValue("cert-title", "");
    setInputValue("cert-issuer", "");
    setInputValue("cert-year", "");
    setInputValue("cert-image", "");
}

window.addOrUpdateCert = addOrUpdateCert;
window.editCert = editCert;
window.deleteCert = deleteCert;
window.clearCertForm = clearCertForm;
