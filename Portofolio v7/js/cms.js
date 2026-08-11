/* ==========================================================================
   PORTOFOLIO V7 - VISUAL CMS DASHBOARD ENGINE (FULL CRUD BINDER)
   ========================================================================== */

var CMS_STORAGE_KEY = "PORTFOLIO_DATA_V7";
var CMS_FALLBACK_KEY_V6 = "PORTFOLIO_DATA_V6";

let cmsData = null;

function toggleMobileCMSMenu(show) {
    const drawer = document.getElementById("mobile-cms-drawer");
    if (!drawer) return;
    if (show === true) {
        drawer.classList.remove("hidden");
        drawer.style.display = "flex";
    } else if (show === false) {
        drawer.classList.add("hidden");
        drawer.style.display = "none";
    } else {
        const isHidden = drawer.classList.contains("hidden") || drawer.style.display === "none";
        if (isHidden) {
            drawer.classList.remove("hidden");
            drawer.style.display = "flex";
        } else {
            drawer.classList.add("hidden");
            drawer.style.display = "none";
        }
    }
}
window.toggleMobileCMSMenu = toggleMobileCMSMenu;

function switchTab(target) {
    if (!target) return;

    // 1. Update Buttons Active State
    const allTabBtns = document.querySelectorAll(".cms-sidebar-btn, .cms-mobile-menu-btn");
    allTabBtns.forEach(b => {
        const tab = b.getAttribute("data-tab");
        const isMobile = b.classList.contains("cms-mobile-menu-btn");
        if (tab === target) {
            b.classList.add("active", "bg-[#ff3b00]", "text-white");
            b.classList.remove("text-slate-300", "text-slate-200", "bg-white/10");
        } else {
            b.classList.remove("active", "bg-[#ff3b00]", "text-white");
            if (isMobile) {
                b.classList.add("text-slate-200", "bg-white/10");
            } else {
                b.classList.add("text-slate-300");
            }
        }
    });

    // 2. Hide All Tab Content Containers
    const tabContents = document.querySelectorAll(".cms-tab-content");
    tabContents.forEach(c => {
        c.classList.add("hidden");
        c.style.display = "none";
    });

    // 3. Show Target Tab Container
    const targetEl = document.getElementById(`tab-${target}`);
    if (targetEl) {
        targetEl.classList.remove("hidden");
        targetEl.style.display = "block";
    }

    // 4. Update Header Titles
    const activeBtn = document.querySelector(`.cms-sidebar-btn[data-tab="${target}"]`) || document.querySelector(`.cms-mobile-menu-btn[data-tab="${target}"]`);
    if (activeBtn) {
        const sectionText = activeBtn.innerText.trim();
        const titleEl = document.getElementById("active-tab-title");
        if (titleEl) titleEl.textContent = sectionText;
        
        const mobileBadge = document.getElementById("mobile-active-section-name");
        if (mobileBadge) mobileBadge.textContent = sectionText;
    }

    // 5. Auto Close Mobile Drawer & Scroll Window Top
    toggleMobileCMSMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.switchTab = switchTab;

document.addEventListener("DOMContentLoaded", () => {
    cmsData = loadCMSData();
    initCMSUI();
});

function loadCMSData() {
    let data = null;
    try {
        const stored = localStorage.getItem(CMS_STORAGE_KEY) || localStorage.getItem(CMS_FALLBACK_KEY_V6);
        if (stored) data = JSON.parse(stored);
    } catch (e) {
        console.error("Error reading CMS storage", e);
    }

    const defaultData = typeof DEFAULT_PORTFOLIO_DATA !== "undefined" ? DEFAULT_PORTFOLIO_DATA : {};

    if (!data || typeof data !== "object") {
        data = JSON.parse(JSON.stringify(defaultData));
    } else {
        data.profile = Object.assign({}, defaultData.profile || {}, data.profile || {});
        if (!data.projects || !Array.isArray(data.projects)) data.projects = JSON.parse(JSON.stringify(defaultData.projects || []));
        if (!data.skills || !Array.isArray(data.skills)) data.skills = JSON.parse(JSON.stringify(defaultData.skills || []));
        if (!data.experiences || !Array.isArray(data.experiences)) data.experiences = JSON.parse(JSON.stringify(defaultData.experiences || []));
        if (!data.education || !Array.isArray(data.education)) data.education = JSON.parse(JSON.stringify(defaultData.education || []));
        if (!data.certifications || !Array.isArray(data.certifications)) data.certifications = JSON.parse(JSON.stringify(defaultData.certifications || []));
    }
    return data;
}

function saveCMSData() {
    cmsData.updatedAt = Date.now();
    try {
        localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cmsData));
        localStorage.setItem(CMS_FALLBACK_KEY_V6, JSON.stringify(cmsData));
        showToast("✅ Perubahan berhasil disimpan ke Website!");
    } catch (e) {
        showToast("❌ Gagal menyimpan data: " + e.message);
    }
}

function showToast(msg) {
    let toast = document.getElementById("cms-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cms-toast";
        toast.className = "fixed bottom-5 right-5 bg-[#120204] border border-[#ff3b00]/40 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-2xl z-50 transition-all duration-300 transform translate-y-10 opacity-0 flex items-center gap-2";
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.remove("translate-y-10", "opacity-0");
    setTimeout(() => {
        toast.classList.add("translate-y-10", "opacity-0");
    }, 3000);
}

function toggleMobileCMSMenu(show) {
    const drawer = document.getElementById("mobile-cms-drawer");
    if (!drawer) return;
    if (show === true) {
        drawer.classList.remove("hidden");
        drawer.style.display = "flex";
    } else if (show === false) {
        drawer.classList.add("hidden");
        drawer.style.display = "none";
    } else {
        const isHidden = drawer.classList.contains("hidden") || drawer.style.display === "none";
        if (isHidden) {
            drawer.classList.remove("hidden");
            drawer.style.display = "flex";
        } else {
            drawer.classList.add("hidden");
            drawer.style.display = "none";
        }
    }
}
window.toggleMobileCMSMenu = toggleMobileCMSMenu;

function switchTab(target) {
    if (!target) return;

    // 1. Update Buttons Active State
    const allTabBtns = document.querySelectorAll(".cms-sidebar-btn, .cms-mobile-menu-btn");
    allTabBtns.forEach(b => {
        const tab = b.getAttribute("data-tab");
        const isMobile = b.classList.contains("cms-mobile-menu-btn");
        if (tab === target) {
            b.classList.add("active", "bg-[#ff3b00]", "text-white");
            b.classList.remove("text-slate-300", "text-slate-200", "bg-white/10");
        } else {
            b.classList.remove("active", "bg-[#ff3b00]", "text-white");
            if (isMobile) {
                b.classList.add("text-slate-200", "bg-white/10");
            } else {
                b.classList.add("text-slate-300");
            }
        }
    });

    // 2. Hide All Tab Content Containers
    const tabContents = document.querySelectorAll(".cms-tab-content");
    tabContents.forEach(c => {
        c.classList.add("hidden");
        c.style.display = "none";
    });

    // 3. Show Target Tab Container
    const targetEl = document.getElementById(`tab-${target}`);
    if (targetEl) {
        targetEl.classList.remove("hidden");
        targetEl.style.display = "block";
    }

    // 4. Update Header Titles
    const activeBtn = document.querySelector(`.cms-sidebar-btn[data-tab="${target}"]`) || document.querySelector(`.cms-mobile-menu-btn[data-tab="${target}"]`);
    if (activeBtn) {
        const sectionText = activeBtn.innerText.trim();
        const titleEl = document.getElementById("active-tab-title");
        if (titleEl) titleEl.textContent = sectionText;
        
        const mobileBadge = document.getElementById("mobile-active-section-name");
        if (mobileBadge) mobileBadge.textContent = sectionText;
    }

    // 5. Auto Close Mobile Drawer & Scroll Window Top
    toggleMobileCMSMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.switchTab = switchTab;

function initCMSUI() {
    // Fail-Proof Global Event Delegation for data-tab clicks
    document.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-tab]");
        if (btn) {
            e.preventDefault();
            const target = btn.getAttribute("data-tab");
            if (target) {
                switchTab(target);
            }
        }
    });

    try {
        renderProfileForm();
        renderProjectsList();
        renderSkillsList();
        renderExperiencesList();
        renderEducationList();
        renderCertificationsList();
    } catch (e) {
        console.error("Error rendering CMS items", e);
    }

    const saveProfileBtns = document.querySelectorAll(".save-profile-btn");
    saveProfileBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            updateProfileFromForm();
            saveCMSData();
        });
    });

    const resetBtn = document.getElementById("reset-data-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("Apakah Anda yakin ingin mengembalikan data ke pengaturan awal (default)? Semua perubahan akan ditimpa.")) {
                localStorage.removeItem(CMS_STORAGE_KEY);
                localStorage.removeItem(CMS_FALLBACK_KEY_V6);
                cmsData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
                saveCMSData();
                location.reload();
            }
        });
    }

    // Bind Image Uploaders for All Photos on Website
    setupImageUpload("hero-bg-photo-input", (dataUrl) => { cmsData.profile.heroBgPhoto = dataUrl; cmsData.profile.avatar = dataUrl; });
    setupImageUpload("about-photo-input", (dataUrl) => { cmsData.profile.aboutPhoto = dataUrl; });
    
    setupImageUpload("overview-photo-1-input", (dataUrl) => { cmsData.profile.overviewPhoto1 = dataUrl; });
    setupImageUpload("overview-photo-2-input", (dataUrl) => { cmsData.profile.overviewPhoto2 = dataUrl; });
    setupImageUpload("overview-photo-3-input", (dataUrl) => { cmsData.profile.overviewPhoto3 = dataUrl; });

    setupImageUpload("service1-img-input", (dataUrl) => { cmsData.profile.service1Image = dataUrl; });
    setupImageUpload("service2-img-input", (dataUrl) => { cmsData.profile.service2Image = dataUrl; });
    setupImageUpload("service3-img-input", (dataUrl) => { cmsData.profile.service3Image = dataUrl; });
    setupImageUpload("service4-img-input", (dataUrl) => { cmsData.profile.service4Image = dataUrl; });

    setupImageUpload("impact-card1-img-input", (dataUrl) => { cmsData.profile.impactCard1Image = dataUrl; });
    setupImageUpload("impact-card3-img-input", (dataUrl) => { cmsData.profile.impactCard3Image = dataUrl; });

    setupFileInput("proj-image-file", "proj-image");
    setupFileInput("cert-image-file", "cert-image");
}

function renderProfileForm() {
    const p = cmsData.profile || {};
    setInputValue("input-name", p.name);
    setInputValue("input-title", p.title);
    setInputValue("input-heroTitleLine1", p.heroTitleLine1);
    setInputValue("input-heroTitleLine2", p.heroTitleLine2);
    setInputValue("input-heroTitleLine3", p.heroTitleLine3);
    setInputValue("input-heroBio", p.heroBio);
    setInputValue("input-statMetricVal", p.statMetricVal);
    setInputValue("input-statMetricLbl", p.statMetricLbl);
    setInputValue("input-heroTag1", p.heroTag1);
    setInputValue("input-heroTag2", p.heroTag2);
    setInputValue("input-heroTag3", p.heroTag3);

    setInputValue("input-overviewBadge", p.overviewBadge);
    setInputValue("input-overviewTitle", p.overviewTitle);
    setInputValue("input-overviewDesc", p.overviewDesc);

    setInputValue("input-servicesHeaderTitle", p.servicesHeaderTitle);
    setInputValue("input-servicesHeaderDesc", p.servicesHeaderDesc);
    setInputValue("input-service1Title", p.service1Title);
    setInputValue("input-service1Desc", p.service1Desc);
    setInputValue("input-service2Title", p.service2Title);
    setInputValue("input-service2Desc", p.service2Desc);
    setInputValue("input-service3Title", p.service3Title);
    setInputValue("input-service3Desc", p.service3Desc);
    setInputValue("input-service4Title", p.service4Title);
    setInputValue("input-service4Desc", p.service4Desc);

    setInputValue("input-impactTitle", p.impactTitle);
    setInputValue("input-impactCard1Desc", p.impactCard1Desc);
    setInputValue("input-impactCard2Title", p.impactCard2Title);
    setInputValue("input-impactCard3Btn", p.impactCard3Btn);

    setInputValue("input-aboutSubtitle", p.aboutSubtitle);
    setInputValue("input-aboutTitle", p.aboutTitle);
    setInputValue("input-about", p.about);
    setInputValue("input-yearsExp", p.yearsExp);
    setInputValue("input-projectsDone", p.projectsDone);
    setInputValue("input-happyClients", p.happyClients);

    setInputValue("input-email", p.email);
    setInputValue("input-phone", p.phone);
    setInputValue("input-whatsapp", p.whatsapp);
    setInputValue("input-cvUrl", p.cvUrl);
    setInputValue("input-github", p.github);
    setInputValue("input-linkedin", p.linkedin);
    setInputValue("input-instagram", p.instagram);
}

function updateProfileFromForm() {
    cmsData.profile = cmsData.profile || {};
    cmsData.profile.name = getInputValue("input-name");
    cmsData.profile.title = getInputValue("input-title");
    cmsData.profile.heroTitleLine1 = getInputValue("input-heroTitleLine1");
    cmsData.profile.heroTitleLine2 = getInputValue("input-heroTitleLine2");
    cmsData.profile.heroTitleLine3 = getInputValue("input-heroTitleLine3");
    cmsData.profile.heroBio = getInputValue("input-heroBio");
    cmsData.profile.statMetricVal = getInputValue("input-statMetricVal");
    cmsData.profile.statMetricLbl = getInputValue("input-statMetricLbl");
    cmsData.profile.heroTag1 = getInputValue("input-[#heroTag1]");
    cmsData.profile.heroTag2 = getInputValue("input-heroTag2");
    cmsData.profile.heroTag3 = getInputValue("input-heroTag3");

    cmsData.profile.overviewBadge = getInputValue("input-overviewBadge");
    cmsData.profile.overviewTitle = getInputValue("input-overviewTitle");
    cmsData.profile.overviewDesc = getInputValue("input-overviewDesc");

    cmsData.profile.servicesHeaderTitle = getInputValue("input-servicesHeaderTitle");
    cmsData.profile.servicesHeaderDesc = getInputValue("input-servicesHeaderDesc");
    cmsData.profile.service1Title = getInputValue("input-service1Title");
    cmsData.profile.service1Desc = getInputValue("input-service1Desc");
    cmsData.profile.service2Title = getInputValue("input-service2Title");
    cmsData.profile.service2Desc = getInputValue("input-service2Desc");
    cmsData.profile.service3Title = getInputValue("input-service3Title");
    cmsData.profile.service3Desc = getInputValue("input-service3Desc");
    cmsData.profile.service4Title = getInputValue("input-service4Title");
    cmsData.profile.service4Desc = getInputValue("input-service4Desc");

    cmsData.profile.impactTitle = getInputValue("input-impactTitle");
    cmsData.profile.impactCard1Desc = getInputValue("input-impactCard1Desc");
    cmsData.profile.impactCard2Title = getInputValue("input-impactCard2Title");
    cmsData.profile.impactCard3Btn = getInputValue("input-impactCard3Btn");

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
                showToast("📷 Foto berhasil diunggah & diperbarui!");
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
                showToast("📷 File gambar dimuat!");
            };
            reader.readAsDataURL(file);
        }
    });
}

// --------------------------------------------------------------------------
// PROJECTS CRUD
// --------------------------------------------------------------------------
function renderProjectsList() {
    const list = document.getElementById("cms-projects-list");
    if (!list) return;

    list.innerHTML = (cmsData.projects || []).map(p => `
        <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div class="flex items-center gap-3">
                <img src="${p.image || './assets/foto.png'}" class="w-12 h-12 rounded-xl object-cover border border-slate-300" onerror="this.src='./assets/foto.png'">
                <div>
                    <h4 class="text-sm font-extrabold text-slate-900">${escapeHtml(p.title)}</h4>
                    <span class="text-xs text-slate-500 font-semibold">${escapeHtml(p.category)}</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="editProject(${p.id})" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-all">Edit</button>
                <button type="button" onclick="deleteProject(${p.id})" class="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200 transition-all">Hapus</button>
            </div>
        </div>
    `).join("");
}

window.openProjectModal = function() {
    setInputValue("proj-id", "");
    setInputValue("proj-title", "");
    setInputValue("proj-category", "Web Application");
    setInputValue("proj-tags", "React, TailwindCSS");
    setInputValue("proj-image", "./assets/foto.png");
    setInputValue("proj-description", "");
    setInputValue("proj-demoUrl", "");
    setInputValue("proj-repoUrl", "");
    document.getElementById("project-modal").classList.remove("hidden");
};

window.closeProjectModal = function() {
    document.getElementById("project-modal").classList.add("hidden");
};

window.editProject = function(id) {
    const p = cmsData.projects.find(item => item.id === id);
    if (!p) return;

    setInputValue("proj-id", p.id);
    setInputValue("proj-title", p.title);
    setInputValue("proj-category", p.category);
    setInputValue("proj-tags", (p.tags || []).join(", "));
    setInputValue("proj-image", p.image || "./assets/foto.png");
    setInputValue("proj-description", p.description);
    setInputValue("proj-demoUrl", p.demoUrl);
    setInputValue("proj-repoUrl", p.repoUrl);

    document.getElementById("project-modal").classList.remove("hidden");
};

window.saveProjectForm = function() {
    const id = getInputValue("proj-id");
    const title = getInputValue("proj-title");
    const category = getInputValue("proj-category");
    const tagsStr = getInputValue("proj-tags");
    const image = getInputValue("proj-image") || "./assets/foto.png";
    const description = getInputValue("proj-description");
    const demoUrl = getInputValue("proj-demoUrl");
    const repoUrl = getInputValue("proj-repoUrl");

    if (!title) {
        alert("Judul proyek tidak boleh kosong!");
        return;
    }

    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);

    if (id) {
        const index = cmsData.projects.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            cmsData.projects[index] = { id: parseInt(id), title, category, tags, image, description, demoUrl, repoUrl };
        }
    } else {
        const newId = Date.now();
        cmsData.projects.push({ id: newId, title, category, tags, image, description, demoUrl, repoUrl });
    }

    saveCMSData();
    renderProjectsList();
    closeProjectModal();
};

window.deleteProject = function(id) {
    if (confirm("Hapus proyek ini?")) {
        cmsData.projects = cmsData.projects.filter(p => p.id !== id);
        saveCMSData();
        renderProjectsList();
    }
};

// --------------------------------------------------------------------------
// SKILLS CRUD
// --------------------------------------------------------------------------
function renderSkillsList() {
    const list = document.getElementById("cms-skills-list");
    if (!list) return;

    list.innerHTML = (cmsData.skills || []).map(s => `
        <div class="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
                <h4 class="text-sm font-extrabold text-slate-900">${escapeHtml(s.name)}</h4>
                <span class="text-xs text-slate-500 font-semibold">${s.level}% • ${escapeHtml(s.category)}</span>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="editSkill(${s.id})" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black">Edit</button>
                <button type="button" onclick="deleteSkill(${s.id})" class="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200">Hapus</button>
            </div>
        </div>
    `).join("");
}

window.openSkillModal = function() {
    setInputValue("skill-id", "");
    setInputValue("skill-name", "");
    setInputValue("skill-level", "85");
    setInputValue("skill-category", "Frontend");
    setInputValue("skill-icon", "fa-code");
    document.getElementById("skill-modal").classList.remove("hidden");
};

window.closeSkillModal = function() {
    document.getElementById("skill-modal").classList.add("hidden");
};

window.editSkill = function(id) {
    const s = cmsData.skills.find(item => item.id === id);
    if (!s) return;

    setInputValue("skill-id", s.id);
    setInputValue("skill-name", s.name);
    setInputValue("skill-level", s.level);
    setInputValue("skill-category", s.category);
    setInputValue("skill-icon", s.icon);

    document.getElementById("skill-modal").classList.remove("hidden");
};

window.saveSkillForm = function() {
    const id = getInputValue("skill-id");
    const name = getInputValue("skill-name");
    const level = parseInt(getInputValue("skill-level")) || 80;
    const category = getInputValue("skill-category");
    const icon = getInputValue("skill-icon") || "fa-code";

    if (!name) {
        alert("Nama keahlian wajib diisi!");
        return;
    }

    if (id) {
        const index = cmsData.skills.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            cmsData.skills[index] = { id: parseInt(id), name, level, category, icon };
        }
    } else {
        const newId = Date.now();
        cmsData.skills.push({ id: newId, name, level, category, icon });
    }

    saveCMSData();
    renderSkillsList();
    closeSkillModal();
};

window.deleteSkill = function(id) {
    if (confirm("Hapus keahlian ini?")) {
        cmsData.skills = cmsData.skills.filter(s => s.id !== id);
        saveCMSData();
        renderSkillsList();
    }
};

// --------------------------------------------------------------------------
// EXPERIENCES CRUD
// --------------------------------------------------------------------------
function renderExperiencesList() {
    const list = document.getElementById("cms-experiences-list");
    if (!list) return;

    list.innerHTML = (cmsData.experiences || []).map(e => `
        <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
                <h4 class="text-sm font-extrabold text-slate-900">${escapeHtml(e.role)}</h4>
                <span class="text-xs text-slate-500 font-semibold">${escapeHtml(e.company)} (${escapeHtml(e.period)})</span>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="editExp(${e.id})" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black">Edit</button>
                <button type="button" onclick="deleteExp(${e.id})" class="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200">Hapus</button>
            </div>
        </div>
    `).join("");
}

window.openExpModal = function() {
    setInputValue("exp-id", "");
    setInputValue("exp-role", "");
    setInputValue("exp-company", "");
    setInputValue("exp-period", "2023 - Sekarang");
    setInputValue("exp-description", "");
    setInputValue("exp-skills", "React, Node.js");
    document.getElementById("exp-modal").classList.remove("hidden");
};
window.closeExpModal = function() { document.getElementById("exp-modal").classList.add("hidden"); };

window.editExp = function(id) {
    const e = cmsData.experiences.find(item => item.id === id);
    if (!e) return;
    setInputValue("exp-id", e.id);
    setInputValue("exp-role", e.role);
    setInputValue("exp-company", e.company);
    setInputValue("exp-period", e.period);
    setInputValue("exp-description", e.description);
    setInputValue("exp-skills", (e.skills || []).join(", "));
    document.getElementById("exp-modal").classList.remove("hidden");
};

window.saveExpForm = function() {
    const id = getInputValue("exp-id");
    const role = getInputValue("exp-role");
    const company = getInputValue("exp-company");
    const period = getInputValue("exp-period");
    const description = getInputValue("exp-description");
    const skillsStr = getInputValue("exp-skills");
    if (!role) { alert("Posisi Karir wajib diisi!"); return; }

    const skills = skillsStr.split(",").map(s => s.trim()).filter(Boolean);

    if (id) {
        const index = cmsData.experiences.findIndex(item => item.id === parseInt(id));
        if (index !== -1) cmsData.experiences[index] = { id: parseInt(id), role, company, period, description, skills };
    } else {
        cmsData.experiences.push({ id: Date.now(), role, company, period, description, skills });
    }
    saveCMSData();
    renderExperiencesList();
    closeExpModal();
};
window.deleteExp = function(id) {
    if (confirm("Hapus pengalaman ini?")) {
        cmsData.experiences = cmsData.experiences.filter(e => e.id !== id);
        saveCMSData();
        renderExperiencesList();
    }
};

// --------------------------------------------------------------------------
// EDUCATION CRUD
// --------------------------------------------------------------------------
function renderEducationList() {
    const list = document.getElementById("cms-education-list");
    if (!list) return;

    list.innerHTML = (cmsData.education || []).map(edu => `
        <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
                <h4 class="text-sm font-extrabold text-slate-900">${escapeHtml(edu.degree)}</h4>
                <span class="text-xs text-slate-500 font-semibold">${escapeHtml(edu.institution)} (${escapeHtml(edu.year)})</span>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="editEdu(${edu.id})" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black">Edit</button>
                <button type="button" onclick="deleteEdu(${edu.id})" class="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200">Hapus</button>
            </div>
        </div>
    `).join("");
}

window.openEduModal = function() {
    setInputValue("edu-id", "");
    setInputValue("edu-degree", "");
    setInputValue("edu-institution", "");
    setInputValue("edu-year", "2022");
    setInputValue("edu-description", "");
    document.getElementById("edu-modal").classList.remove("hidden");
};
window.closeEduModal = function() { document.getElementById("edu-modal").classList.add("hidden"); };

window.editEdu = function(id) {
    const item = cmsData.education.find(i => i.id === id);
    if (!item) return;
    setInputValue("edu-id", item.id);
    setInputValue("edu-degree", item.degree);
    setInputValue("edu-institution", item.institution);
    setInputValue("edu-year", item.year);
    setInputValue("edu-description", item.description);
    document.getElementById("edu-modal").classList.remove("hidden");
};

window.saveEduForm = function() {
    const id = getInputValue("edu-id");
    const degree = getInputValue("edu-degree");
    const institution = getInputValue("edu-institution");
    const year = getInputValue("edu-year");
    const description = getInputValue("edu-description");
    if (!degree) { alert("Gelar/Program Pendidikan wajib diisi!"); return; }

    if (id) {
        const index = cmsData.education.findIndex(i => i.id === parseInt(id));
        if (index !== -1) cmsData.education[index] = { id: parseInt(id), degree, institution, year, description };
    } else {
        cmsData.education.push({ id: Date.now(), degree, institution, year, description });
    }
    saveCMSData();
    renderEducationList();
    closeEduModal();
};
window.deleteEdu = function(id) {
    if (confirm("Hapus pendidikan ini?")) {
        cmsData.education = cmsData.education.filter(i => i.id !== id);
        saveCMSData();
        renderEducationList();
    }
};

// --------------------------------------------------------------------------
// CERTIFICATIONS CRUD
// --------------------------------------------------------------------------
function renderCertificationsList() {
    const list = document.getElementById("cms-certifications-list");
    if (!list) return;

    list.innerHTML = (cmsData.certifications || []).map(c => `
        <div class="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div class="flex items-center gap-3">
                <img src="${c.image || './assets/foto.png'}" class="w-12 h-12 rounded-xl object-cover border border-slate-300" onerror="this.src='./assets/foto.png'">
                <div>
                    <h4 class="text-sm font-extrabold text-slate-900">${escapeHtml(c.title)}</h4>
                    <span class="text-xs text-slate-500 font-semibold">${escapeHtml(c.issuer)} (${escapeHtml(c.year)})</span>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" onclick="editCert(${c.id})" class="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black">Edit</button>
                <button type="button" onclick="deleteCert(${c.id})" class="px-3 py-1.5 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200">Hapus</button>
            </div>
        </div>
    `).join("");
}

window.openCertModal = function() {
    setInputValue("cert-id", "");
    setInputValue("cert-title", "");
    setInputValue("cert-issuer", "");
    setInputValue("cert-year", "2023");
    setInputValue("cert-image", "./assets/foto.png");
    document.getElementById("cert-modal").classList.remove("hidden");
};
window.closeCertModal = function() { document.getElementById("cert-modal").classList.add("hidden"); };

window.editCert = function(id) {
    const c = cmsData.certifications.find(item => item.id === id);
    if (!c) return;
    setInputValue("cert-id", c.id);
    setInputValue("cert-title", c.title);
    setInputValue("cert-issuer", c.issuer);
    setInputValue("cert-year", c.year);
    setInputValue("cert-image", c.image || "./assets/foto.png");
    document.getElementById("cert-modal").classList.remove("hidden");
};

window.saveCertForm = function() {
    const id = getInputValue("cert-id");
    const title = getInputValue("cert-title");
    const issuer = getInputValue("cert-issuer");
    const year = getInputValue("cert-year");
    const image = getInputValue("cert-image") || "./assets/foto.png";
    if (!title) { alert("Nama Sertifikat wajib diisi!"); return; }

    if (id) {
        const index = cmsData.certifications.findIndex(i => i.id === parseInt(i));
        if (index !== -1) cmsData.certifications[index] = { id: parseInt(id), title, issuer, year, image };
    } else {
        cmsData.certifications.push({ id: Date.now(), title, issuer, year, image });
    }
    saveCMSData();
    renderCertificationsList();
    closeCertModal();
};
window.deleteCert = function(id) {
    if (confirm("Hapus sertifikat ini?")) {
        cmsData.certifications = cmsData.certifications.filter(c => c.id !== id);
        saveCMSData();
        renderCertificationsList();
    }
};

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
