/* ==========================================================================
   PORTOFOLIO V4 - ADMIN CMS CONTROLLER ENGINE
   ========================================================================== */

const CMS_PIN = "admin123";
let activeTab = "profile";
let editingItemId = null;

document.addEventListener("DOMContentLoaded", () => {
    initCMSAuth();
});

// --------------------------------------------------------------------------
// 1. PIN AUTHENTICATION
// --------------------------------------------------------------------------
function initCMSAuth() {
    const pinForm = document.getElementById("cms-pin-form");
    if (!pinForm) return;

    // Check if session active
    if (sessionStorage.getItem("cms_authenticated") === "true") {
        showDashboard();
    }

    pinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const pinInput = document.getElementById("cms-pin-input").value;
        if (pinInput === CMS_PIN || pinInput === "123456" || pinInput === "admin") {
            sessionStorage.setItem("cms_authenticated", "true");
            showDashboard();
        } else {
            alert("❌ PIN Keamanan Salah! (Default: admin123)");
        }
    });
}

function showDashboard() {
    const pinScreen = document.getElementById("cms-pin-screen");
    const dashboard = document.getElementById("cms-admin-dashboard");
    if (pinScreen) pinScreen.classList.add("hidden");
    if (dashboard) dashboard.classList.remove("hidden");

    loadPortfolioData();
    switchAdminTab(activeTab);
}

function lockAdminCMS() {
    sessionStorage.removeItem("cms_authenticated");
    location.reload();
}

function toggleAdminMobileMenu() {
    const sidebar = document.getElementById("admin-sidebar");
    if (sidebar) sidebar.classList.toggle("hidden");
}

// --------------------------------------------------------------------------
// 2. TAB NAVIGATION & SWITCHING
// --------------------------------------------------------------------------
function switchAdminTab(tabName) {
    activeTab = tabName;
    
    // Highlight sidebar buttons
    const btns = document.querySelectorAll(".admin-tab-btn");
    btns.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const titleEl = document.getElementById("admin-active-title");
    const contentArea = document.getElementById("admin-content-area");
    if (!contentArea) return;

    switch (tabName) {
        case "profile":
            if (titleEl) titleEl.textContent = "Manajemen Profil & Hero Section";
            renderProfileTab(contentArea);
            break;
        case "services":
            if (titleEl) titleEl.textContent = "Manajemen Layanan & Services";
            renderServicesTab(contentArea);
            break;
        case "projects":
            if (titleEl) titleEl.textContent = "Manajemen Proyek Karya";
            renderProjectsTab(contentArea);
            break;
        case "skills":
            if (titleEl) titleEl.textContent = "Manajemen Skills & Keahlian";
            renderSkillsTab(contentArea);
            break;
        case "experience":
            if (titleEl) titleEl.textContent = "Manajemen Jejak Karir";
            renderExperienceTab(contentArea);
            break;
        case "education":
            if (titleEl) titleEl.textContent = "Manajemen Pendidikan";
            renderEducationTab(contentArea);
            break;
        case "certifications":
            if (titleEl) titleEl.textContent = "Manajemen Sertifikat & Piagam";
            renderCertificationsTab(contentArea);
            break;
        case "settings":
            if (titleEl) titleEl.textContent = "Backup, Restore & Reset Data";
            renderSettingsTab(contentArea);
            break;
        default:
            renderProfileTab(contentArea);
    }
}

// Helper Toast Notification
function showToast(msg = "Perubahan Berhasil Disimpan!") {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-2xl border border-sky-500/40 flex items-center gap-3 animate-bounce";
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-sky-400 text-base"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

// Local File Upload Helper (FileReader Base64)
function handleLocalFileUpload(fileInput, targetInputId, previewImgId = null) {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file foto terlalu besar. Maksimal 5MB.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Data = e.target.result;
        const targetInput = document.getElementById(targetInputId);
        if (targetInput) {
            targetInput.value = base64Data;
            targetInput.dispatchEvent(new Event('input'));
        }

        if (previewImgId) {
            const previewImg = document.getElementById(previewImgId);
            if (previewImg) previewImg.src = base64Data;
        }

        showToast("Foto dari komputer berhasil diunggah!");
    };
    reader.readAsDataURL(file);
}

// --------------------------------------------------------------------------
// 3. PROFILE TAB
// --------------------------------------------------------------------------
function renderProfileTab(container) {
    const prof = portfolioData.profile || {};
    container.innerHTML = `
        <form onsubmit="saveProfileForm(event)" class="space-y-6 max-w-4xl fade-in-up">
            <div class="admin-card space-y-4">
                <h3 class="text-lg font-bold font-display text-primary border-b pb-3 border-slate-200">Informasi Utama Profil</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="form-label">Nama Lengkap</label>
                        <input type="text" id="input-name" class="form-input" value="${prof.name || ''}" required>
                    </div>
                    <div>
                        <label class="form-label">Judul Profesional / Specialization</label>
                        <input type="text" id="input-title" class="form-input" value="${prof.title || ''}" required>
                    </div>
                </div>

                <div>
                    <label class="form-label">Hero Bio Ringkas</label>
                    <textarea id="input-hero-bio" class="form-input" rows="3" required>${prof.heroBio || ''}</textarea>
                </div>

                <div>
                    <label class="form-label">Hero Tagline</label>
                    <input type="text" id="input-tagline" class="form-input" value="${prof.tagline || ''}">
                </div>
            </div>

            <div class="admin-card space-y-4">
                <h3 class="text-lg font-bold font-display text-primary border-b pb-3 border-slate-200">Statistik Hero Baseline</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label class="form-label">Tahun Pengalaman</label>
                        <input type="text" id="input-exp-stat" class="form-input" value="${prof.yearsExp || '04+'}">
                    </div>
                    <div>
                        <label class="form-label">Proyek Selesai</label>
                        <input type="text" id="input-proj-stat" class="form-input" value="${prof.projectsDone || '25+'}">
                    </div>
                    <div>
                        <label class="form-label">Klien Puas</label>
                        <input type="text" id="input-clients-stat" class="form-input" value="${prof.happyClients || '15+'}">
                    </div>
                </div>
            </div>

            <div class="admin-card space-y-4">
                <h3 class="text-lg font-bold font-display text-primary border-b pb-3 border-slate-200">Manajemen Foto & Cutout Profile</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Hero Cutout Photo -->
                    <div class="space-y-2">
                        <label class="form-label">Foto Utama Hero Cutout</label>
                        <div class="flex items-center gap-3">
                            <img id="preview-hero-photo" src="${prof.heroBgPhoto || prof.avatar || './assets/foto.png'}" class="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0" onerror="this.src='./assets/foto.png'">
                            <div class="flex-1 space-y-2">
                                <input type="text" id="input-hero-photo" class="form-input text-xs" value="${prof.heroBgPhoto || prof.avatar || ''}" placeholder="URL Gambar atau Upload File Lokal">
                                <label class="btn-secondary-white text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                                    <i class="fa-solid fa-folder-open text-sky-600"></i> Upload Foto Lokal
                                    <input type="file" accept="image/*" class="hidden" onchange="handleLocalFileUpload(this, 'input-hero-photo', 'preview-hero-photo')">
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- About Banner Photo -->
                    <div class="space-y-2">
                        <label class="form-label">Foto Banner About Me</label>
                        <div class="flex items-center gap-3">
                            <img id="preview-about-photo" src="${prof.aboutPhoto || prof.avatar || './assets/foto.png'}" class="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0" onerror="this.src='./assets/foto.png'">
                            <div class="flex-1 space-y-2">
                                <input type="text" id="input-about-photo" class="form-input text-xs" value="${prof.aboutPhoto || prof.avatar || ''}" placeholder="URL Gambar atau Upload File Lokal">
                                <label class="btn-secondary-white text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                                    <i class="fa-solid fa-folder-open text-sky-600"></i> Upload Foto Lokal
                                    <input type="file" accept="image/*" class="hidden" onchange="handleLocalFileUpload(this, 'input-about-photo', 'preview-about-photo')">
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="admin-card space-y-4">
                <h3 class="text-lg font-bold font-display text-primary border-b pb-3 border-slate-200">Section About Me</h3>
                <div>
                    <label class="form-label">Judul Heading About</label>
                    <input type="text" id="input-about-title" class="form-input" value="${prof.aboutTitle || ''}">
                </div>
                <div>
                    <label class="form-label">Deskripsi Lengkap About Me</label>
                    <textarea id="input-about-desc" class="form-input" rows="4">${prof.about || ''}</textarea>
                </div>
            </div>

            <div class="admin-card space-y-4">
                <h3 class="text-lg font-bold font-display text-primary border-b pb-3 border-slate-200">Kontak & Media Sosial</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="form-label">Email Direct</label>
                        <input type="email" id="input-email" class="form-input" value="${prof.email || ''}">
                    </div>
                    <div>
                        <label class="form-label">Nomor HP / Telepon</label>
                        <input type="text" id="input-phone" class="form-input" value="${prof.phone || ''}">
                    </div>
                    <div>
                        <label class="form-label">WhatsApp (cth: 6281234567890)</label>
                        <input type="text" id="input-wa" class="form-input" value="${prof.whatsapp || ''}">
                    </div>
                    <div>
                        <label class="form-label">GitHub URL</label>
                        <input type="url" id="input-github" class="form-input" value="${prof.github || ''}">
                    </div>
                    <div>
                        <label class="form-label">LinkedIn URL</label>
                        <input type="url" id="input-linkedin" class="form-input" value="${prof.linkedin || ''}">
                    </div>
                    <div>
                        <label class="form-label">Instagram URL</label>
                        <input type="url" id="input-instagram" class="form-input" value="${prof.instagram || ''}">
                    </div>
                </div>
            </div>

            <button type="submit" class="btn-primary-blue shadow-lg">
                <i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan Profil
            </button>
        </form>
    `;
}

function saveProfileForm(e) {
    e.preventDefault();
    portfolioData.profile.name = document.getElementById("input-name").value;
    portfolioData.profile.title = document.getElementById("input-title").value;
    portfolioData.profile.heroBio = document.getElementById("input-hero-bio").value;
    portfolioData.profile.tagline = document.getElementById("input-tagline").value;
    portfolioData.profile.yearsExp = document.getElementById("input-exp-stat").value;
    portfolioData.profile.projectsDone = document.getElementById("input-proj-stat").value;
    portfolioData.profile.happyClients = document.getElementById("input-clients-stat").value;
    portfolioData.profile.aboutTitle = document.getElementById("input-about-title").value;
    portfolioData.profile.about = document.getElementById("input-about-desc").value;

    if (document.getElementById("input-hero-photo")) {
        portfolioData.profile.heroBgPhoto = document.getElementById("input-hero-photo").value;
        portfolioData.profile.avatar = document.getElementById("input-hero-photo").value;
    }
    if (document.getElementById("input-about-photo")) {
        portfolioData.profile.aboutPhoto = document.getElementById("input-about-photo").value;
    }

    portfolioData.profile.email = document.getElementById("input-email").value;
    portfolioData.profile.phone = document.getElementById("input-phone").value;
    portfolioData.profile.whatsapp = document.getElementById("input-wa").value;
    portfolioData.profile.github = document.getElementById("input-github").value;
    portfolioData.profile.linkedin = document.getElementById("input-linkedin").value;
    portfolioData.profile.instagram = document.getElementById("input-instagram").value;

    savePortfolioData(portfolioData);
    showToast("Profil berhasil diperbarui!");
}

// --------------------------------------------------------------------------
// 3.5. SERVICES TAB
// --------------------------------------------------------------------------
function renderServicesTab(container) {
    const services = portfolioData.services || [];
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl fade-in-up">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl font-bold font-display text-primary">Daftar Layanan & Services (${services.length})</h3>
                <button onclick="openServiceEditModal()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-plus"></i> Tambah Layanan Baru
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${services.map(s => `
                    <div class="admin-card flex flex-col justify-between gap-4">
                        <div>
                            <div class="flex items-center justify-between gap-2 mb-2">
                                <span class="text-xs font-extrabold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                                    No. ${s.num || '01'}
                                </span>
                                <div class="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sky-600 font-bold">
                                    <i class="${s.icon || 'fa-solid fa-code'}"></i>
                                </div>
                            </div>
                            <h4 class="font-bold text-lg font-display text-primary mb-1">${s.title}</h4>
                            <p class="text-xs text-muted leading-relaxed mb-3">${s.description || ''}</p>
                            <div class="flex flex-wrap gap-1">
                                ${(s.tags || []).map(t => `<span class="tech-tag text-[10px] px-2 py-0.5">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto">
                            <button onclick="openServiceEditModal(${s.id})" class="text-xs font-bold text-blue-primary bg-blue-light hover:bg-blue-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                            <button onclick="deleteServiceItem(${s.id})" class="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openServiceEditModal(id = null) {
    editingItemId = id;
    const item = id ? (portfolioData.services || []).find(s => s.id === id) : {};

    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
        <div class="modal-box">
            <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">&times;</button>
            <h3 class="text-xl font-bold font-display text-primary mb-4">${id ? 'Edit Layanan' : 'Tambah Layanan Baru'}</h3>
            <form onsubmit="saveServiceItem(event)" class="space-y-4">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="form-label">Nomor Urut (cth: 01)</label>
                        <input type="text" id="edit-serv-num" class="form-input" value="${item.num || '01'}" required>
                    </div>
                    <div>
                        <label class="form-label">Icon FontAwesome Class</label>
                        <input type="text" id="edit-serv-icon" class="form-input" value="${item.icon || 'fa-solid fa-code'}" placeholder="fa-solid fa-code" required>
                    </div>
                </div>
                <div>
                    <label class="form-label">Judul Layanan</label>
                    <input type="text" id="edit-serv-title" class="form-input" value="${item.title || ''}" required>
                </div>
                <div>
                    <label class="form-label">Deskripsi Layanan</label>
                    <textarea id="edit-serv-desc" class="form-input" rows="3" required>${item.description || ''}</textarea>
                </div>
                <div>
                    <label class="form-label">Tags / Keahlian (pisahkan koma)</label>
                    <input type="text" id="edit-serv-tags" class="form-input" value="${(item.tags || []).join(', ')}" placeholder="React.js, Next.js, SaaS">
                </div>
                <button type="submit" class="btn-primary-blue w-full justify-center text-xs py-3 mt-4">
                    <i class="fa-solid fa-floppy-disk"></i> Simpan Layanan
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveServiceItem(e) {
    e.preventDefault();
    const num = document.getElementById("edit-serv-num").value;
    const icon = document.getElementById("edit-serv-icon").value;
    const title = document.getElementById("edit-serv-title").value;
    const description = document.getElementById("edit-serv-desc").value;
    const tagsRaw = document.getElementById("edit-serv-tags").value;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

    if (editingItemId) {
        const index = portfolioData.services.findIndex(s => s.id === editingItemId);
        if (index !== -1) {
            portfolioData.services[index] = { ...portfolioData.services[index], num, icon, title, description, tags };
        }
    } else {
        portfolioData.services.push({ id: Date.now(), num, icon, title, description, tags });
    }

    savePortfolioData(portfolioData);
    document.querySelector(".modal-overlay").remove();
    switchAdminTab("services");
    if (typeof renderServices === 'function') renderServices(currentServicesPage);
    showToast("Layanan berhasil disimpan!");
}

function deleteServiceItem(id) {
    if (confirm("Hapus layanan ini?")) {
        portfolioData.services = portfolioData.services.filter(s => s.id !== id);
        savePortfolioData(portfolioData);
        switchAdminTab("services");
        if (typeof renderServices === 'function') renderServices(currentServicesPage);
        showToast("Layanan telah dihapus.");
    }
}

// --------------------------------------------------------------------------
// 4. PROJECTS TAB
// --------------------------------------------------------------------------
function renderProjectsTab(container) {
    const projects = portfolioData.projects || [];
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl fade-in-up">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl font-bold font-display text-primary">Daftar Proyek Karya (${projects.length})</h3>
                <button onclick="openProjectEditModal()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-plus"></i> Tambah Proyek Baru
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${projects.map(p => `
                    <div class="admin-card flex flex-col justify-between">
                        <div>
                            <img src="${p.image || './assets/foto.png'}" class="w-full h-40 object-cover rounded-lg mb-3" onerror="this.src='./assets/foto.png'">
                            <span class="badge-category mb-1 inline-block">${p.category || 'Web App'}</span>
                            <h4 class="font-bold text-lg font-display text-primary">${p.title}</h4>
                            <p class="text-xs text-muted line-clamp-2 my-2">${p.description || ''}</p>
                        </div>
                        <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 mt-3">
                            <button onclick="openProjectEditModal(${p.id})" class="text-xs font-bold text-blue-primary bg-blue-light hover:bg-blue-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteProjectItem(${p.id})" class="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openProjectEditModal(id = null) {
    editingItemId = id;
    const project = id ? (portfolioData.projects || []).find(p => p.id === id) : {};

    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
        <div class="modal-box">
            <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">&times;</button>
            <h3 class="text-xl font-bold font-display text-primary mb-4">${id ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
            <form onsubmit="saveProjectItem(event)" class="space-y-4">
                <div>
                    <label class="form-label">Judul Proyek</label>
                    <input type="text" id="edit-p-title" class="form-input" value="${project.title || ''}" required>
                </div>
                <div>
                    <label class="form-label">Kategori Proyek</label>
                    <input type="text" id="edit-p-category" class="form-input" value="${project.category || 'Web Application'}" required>
                </div>
                <div>
                    <label class="form-label">Foto / Gambar Showcase Proyek</label>
                    <div class="flex items-center gap-3">
                        <img id="preview-project-photo" src="${project.image || './assets/foto.png'}" class="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0" onerror="this.src='./assets/foto.png'">
                        <div class="flex-1 space-y-1.5">
                            <input type="text" id="edit-p-image" class="form-input text-xs" value="${project.image || ''}" placeholder="URL Gambar atau Upload File Lokal">
                            <label class="btn-secondary-white text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                                <i class="fa-solid fa-folder-open text-sky-600"></i> Upload Foto dari Komputer
                                <input type="file" accept="image/*" class="hidden" onchange="handleLocalFileUpload(this, 'edit-p-image', 'preview-project-photo')">
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="form-label">Deskripsi Proyek</label>
                    <textarea id="edit-p-desc" class="form-input" rows="3" required>${project.description || ''}</textarea>
                </div>
                <div>
                    <label class="form-label">Teknologi (pisahkan dengan koma)</label>
                    <input type="text" id="edit-p-tech" class="form-input" value="${(project.technologies || []).join(', ')}">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="form-label">Live Demo URL</label>
                        <input type="text" id="edit-p-demo" class="form-input" value="${project.demoUrl || ''}">
                    </div>
                    <div>
                        <label class="form-label">Repository GitHub URL</label>
                        <input type="text" id="edit-p-repo" class="form-input" value="${project.repoUrl || ''}">
                    </div>
                </div>
                <button type="submit" class="btn-primary-blue w-full justify-center text-xs py-3 mt-4">
                    <i class="fa-solid fa-floppy-disk"></i> Simpan Proyek
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveProjectItem(e) {
    e.preventDefault();
    const title = document.getElementById("edit-p-title").value;
    const category = document.getElementById("edit-p-category").value;
    const image = document.getElementById("edit-p-image").value;
    const description = document.getElementById("edit-p-desc").value;
    const techRaw = document.getElementById("edit-p-tech").value;
    const demoUrl = document.getElementById("edit-p-demo").value;
    const repoUrl = document.getElementById("edit-p-repo").value;

    const technologies = techRaw.split(',').map(t => t.trim()).filter(Boolean);

    if (editingItemId) {
        const index = portfolioData.projects.findIndex(p => p.id === editingItemId);
        if (index !== -1) {
            portfolioData.projects[index] = {
                ...portfolioData.projects[index],
                title, category, image, description, technologies, demoUrl, repoUrl
            };
        }
    } else {
        const newId = Date.now();
        portfolioData.projects.unshift({
            id: newId, title, category, image, description, technologies, demoUrl, repoUrl
        });
    }

    savePortfolioData(portfolioData);
    document.querySelector(".modal-overlay").remove();
    switchAdminTab("projects");
    showToast("Proyek berhasil disimpan!");
}

function deleteProjectItem(id) {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
        portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
        savePortfolioData(portfolioData);
        switchAdminTab("projects");
        showToast("Proyek telah dihapus.");
    }
}

// --------------------------------------------------------------------------
// 5. SKILLS TAB
// --------------------------------------------------------------------------
function renderSkillsTab(container) {
    const skills = portfolioData.skills || [];
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl fade-in-up">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl font-bold font-display text-primary">Daftar Keahlian & Skills (${skills.length})</h3>
                <button onclick="openSkillEditModal()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-plus"></i> Tambah Skill Baru
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${skills.map(s => `
                    <div class="admin-card flex items-start gap-4">
                        <div class="skill-icon-box shrink-0">
                            <i class="${s.icon || 'fa-solid fa-code'}"></i>
                        </div>
                        <div class="flex-1 min-w-0">
                            <span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-primary block">${s.category || 'Technology'}</span>
                            <h4 class="font-bold text-base font-display text-primary">${s.name}</h4>
                            <p class="text-xs text-muted line-clamp-2 my-1">${s.description || ''}</p>
                            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                                <button onclick="openSkillEditModal(${s.id})" class="text-xs font-bold text-blue-primary hover:underline">Edit</button>
                                <span class="text-slate-300">•</span>
                                <button onclick="deleteSkillItem(${s.id})" class="text-xs font-bold text-red-600 hover:underline">Hapus</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openSkillEditModal(id = null) {
    editingItemId = id;
    const skill = id ? (portfolioData.skills || []).find(s => s.id === id) : {};

    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
        <div class="modal-box">
            <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">&times;</button>
            <h3 class="text-xl font-bold font-display text-primary mb-4">${id ? 'Edit Skill' : 'Tambah Skill Baru'}</h3>
            <form onsubmit="saveSkillItem(event)" class="space-y-4">
                <div>
                    <label class="form-label">Nama Skill / Teknologi</label>
                    <input type="text" id="edit-s-name" class="form-input" value="${skill.name || ''}" required>
                </div>
                <div>
                    <label class="form-label">Kategori</label>
                    <input type="text" id="edit-s-cat" class="form-input" value="${skill.category || 'Frontend Architecture'}" required>
                </div>
                <div>
                    <label class="form-label">Icon FontAwesome Class</label>
                    <input type="text" id="edit-s-icon" class="form-input" value="${skill.icon || 'fa-solid fa-code'}" placeholder="fa-brands fa-react">
                </div>
                <div>
                    <label class="form-label">Deskripsi Singkat</label>
                    <textarea id="edit-s-desc" class="form-input" rows="2" required>${skill.description || ''}</textarea>
                </div>
                <button type="submit" class="btn-primary-blue w-full justify-center text-xs py-3 mt-4">
                    <i class="fa-solid fa-floppy-disk"></i> Simpan Skill
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveSkillItem(e) {
    e.preventDefault();
    const name = document.getElementById("edit-s-name").value;
    const category = document.getElementById("edit-s-cat").value;
    const icon = document.getElementById("edit-s-icon").value;
    const description = document.getElementById("edit-s-desc").value;

    if (editingItemId) {
        const index = portfolioData.skills.findIndex(s => s.id === editingItemId);
        if (index !== -1) {
            portfolioData.skills[index] = { ...portfolioData.skills[index], name, category, icon, description };
        }
    } else {
        portfolioData.skills.unshift({ id: Date.now(), name, category, icon, description });
    }

    savePortfolioData(portfolioData);
    document.querySelector(".modal-overlay").remove();
    switchAdminTab("skills");
    showToast("Skill berhasil disimpan!");
}

function deleteSkillItem(id) {
    if (confirm("Hapus skill ini?")) {
        portfolioData.skills = portfolioData.skills.filter(s => s.id !== id);
        savePortfolioData(portfolioData);
        switchAdminTab("skills");
        showToast("Skill telah dihapus.");
    }
}

// --------------------------------------------------------------------------
// 6. EXPERIENCE TAB
// --------------------------------------------------------------------------
function renderExperienceTab(container) {
    const exps = portfolioData.experiences || [];
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl fade-in-up">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl font-bold font-display text-primary">Jejak Karir & Pengalaman (${exps.length})</h3>
                <button onclick="openExperienceEditModal()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-plus"></i> Tambah Karir Baru
                </button>
            </div>

            <div class="space-y-4">
                ${exps.map(e => `
                    <div class="admin-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <span class="badge-category mb-1 inline-block">${e.period || ''}</span>
                            <h4 class="font-bold text-lg font-display text-primary">${e.role}</h4>
                            <p class="text-sm font-bold text-blue-primary">${e.company} • <span class="text-xs font-normal text-muted">${e.location || 'Remote'}</span></p>
                            <p class="text-xs text-muted mt-2">${e.description || ''}</p>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button onclick="openExperienceEditModal(${e.id})" class="text-xs font-bold text-blue-primary bg-blue-light hover:bg-blue-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                            <button onclick="deleteExperienceItem(${e.id})" class="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openExperienceEditModal(id = null) {
    editingItemId = id;
    const exp = id ? (portfolioData.experiences || []).find(e => e.id === id) : {};

    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
        <div class="modal-box">
            <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">&times;</button>
            <h3 class="text-xl font-bold font-display text-primary mb-4">${id ? 'Edit Karir' : 'Tambah Karir Baru'}</h3>
            <form onsubmit="saveExperienceItem(event)" class="space-y-4">
                <div>
                    <label class="form-label">Posisi / Role</label>
                    <input type="text" id="edit-exp-role" class="form-input" value="${exp.role || ''}" required>
                </div>
                <div>
                    <label class="form-label">Nama Perusahaan / Organisasi</label>
                    <input type="text" id="edit-exp-company" class="form-input" value="${exp.company || ''}" required>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="form-label">Periode Waktu</label>
                        <input type="text" id="edit-exp-period" class="form-input" value="${exp.period || '2023 - Sekarang'}" required>
                    </div>
                    <div>
                        <label class="form-label">Lokasi</label>
                        <input type="text" id="edit-exp-loc" class="form-input" value="${exp.location || 'Jakarta, Indonesia'}">
                    </div>
                </div>
                <div>
                    <label class="form-label">Foto Tempat Kerja / Perusahaan</label>
                    <div class="flex items-center gap-3">
                        <img id="preview-exp-photo" src="${exp.image || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'}" class="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0">
                        <div class="flex-1 space-y-1.5">
                            <input type="text" id="edit-exp-image" class="form-input text-xs" value="${exp.image || ''}" placeholder="URL Gambar atau Upload File Lokal">
                            <label class="btn-secondary-white text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                                <i class="fa-solid fa-folder-open text-sky-600"></i> Upload Foto dari Komputer
                                <input type="file" accept="image/*" class="hidden" onchange="handleLocalFileUpload(this, 'edit-exp-image', 'preview-exp-photo')">
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="form-label">Deskripsi Pekerjaan</label>
                    <textarea id="edit-exp-desc" class="form-input" rows="3" required>${exp.description || ''}</textarea>
                </div>
                <button type="submit" class="btn-primary-blue w-full justify-center text-xs py-3 mt-4">
                    <i class="fa-solid fa-floppy-disk"></i> Simpan Karir
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveExperienceItem(e) {
    e.preventDefault();
    const role = document.getElementById("edit-exp-role").value;
    const company = document.getElementById("edit-exp-company").value;
    const period = document.getElementById("edit-exp-period").value;
    const location = document.getElementById("edit-exp-loc").value;
    const image = document.getElementById("edit-exp-image").value;
    const description = document.getElementById("edit-exp-desc").value;

    if (editingItemId) {
        const index = portfolioData.experiences.findIndex(e => e.id === editingItemId);
        if (index !== -1) {
            portfolioData.experiences[index] = { ...portfolioData.experiences[index], role, company, period, location, image, description };
        }
    } else {
        portfolioData.experiences.unshift({ id: Date.now(), role, company, period, location, image, description });
    }

    savePortfolioData(portfolioData);
    document.querySelector(".modal-overlay").remove();
    switchAdminTab("experience");
    showToast("Riwayat karir disimpan!");
}

function deleteExperienceItem(id) {
    if (confirm("Hapus riwayat karir ini?")) {
        portfolioData.experiences = portfolioData.experiences.filter(e => e.id !== id);
        savePortfolioData(portfolioData);
        switchAdminTab("experience");
        showToast("Riwayat karir dihapus.");
    }
}

// --------------------------------------------------------------------------
// 7. EDUCATION TAB
// --------------------------------------------------------------------------
function renderEducationTab(container) {
    const edus = portfolioData.education || [];
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl fade-in-up">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl font-bold font-display text-primary">Riwayat Pendidikan (${edus.length})</h3>
                <button onclick="openEducationEditModal()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-plus"></i> Tambah Pendidikan
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${edus.map(edu => `
                    <div class="admin-card flex flex-col justify-between">
                        <div>
                            <span class="badge-category mb-1 inline-block">${edu.year || ''}</span>
                            <h4 class="font-bold text-lg font-display text-primary">${edu.degree}</h4>
                            <p class="text-sm font-semibold text-blue-primary mb-2">${edu.institution}</p>
                            <p class="text-xs text-muted mb-2">${edu.description || ''}</p>
                        </div>
                        <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                            <button onclick="openEducationEditModal(${edu.id})" class="text-xs font-bold text-blue-primary hover:underline">Edit</button>
                            <span class="text-slate-300">•</span>
                            <button onclick="deleteEducationItem(${edu.id})" class="text-xs font-bold text-red-600 hover:underline">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openEducationEditModal(id = null) {
    editingItemId = id;
    const edu = id ? (portfolioData.education || []).find(e => e.id === id) : {};

    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
        <div class="modal-box">
            <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">&times;</button>
            <h3 class="text-xl font-bold font-display text-primary mb-4">${id ? 'Edit Pendidikan' : 'Tambah Pendidikan Baru'}</h3>
            <form onsubmit="saveEducationItem(event)" class="space-y-4">
                <div>
                    <label class="form-label">Gelar / Program</label>
                    <input type="text" id="edit-edu-degree" class="form-input" value="${edu.degree || ''}" required>
                </div>
                <div>
                    <label class="form-label">Institusi / Universitas</label>
                    <input type="text" id="edit-edu-inst" class="form-input" value="${edu.institution || ''}" required>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="form-label">Tahun</label>
                        <input type="text" id="edit-edu-year" class="form-input" value="${edu.year || '2018 - 2022'}" required>
                    </div>
                    <div>
                        <label class="form-label">Nilai / Nilai Akhir (IPK)</label>
                        <input type="text" id="edit-edu-score" class="form-input" value="${edu.score || ''}">
                    </div>
                </div>
                <div>
                    <label class="form-label">Deskripsi Singkat</label>
                    <textarea id="edit-edu-desc" class="form-input" rows="2">${edu.description || ''}</textarea>
                </div>
                <button type="submit" class="btn-primary-blue w-full justify-center text-xs py-3 mt-4">
                    <i class="fa-solid fa-floppy-disk"></i> Simpan Pendidikan
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveEducationItem(e) {
    e.preventDefault();
    const degree = document.getElementById("edit-edu-degree").value;
    const institution = document.getElementById("edit-edu-inst").value;
    const year = document.getElementById("edit-edu-year").value;
    const score = document.getElementById("edit-edu-score").value;
    const description = document.getElementById("edit-edu-desc").value;

    if (editingItemId) {
        const index = portfolioData.education.findIndex(e => e.id === editingItemId);
        if (index !== -1) {
            portfolioData.education[index] = { ...portfolioData.education[index], degree, institution, year, score, description };
        }
    } else {
        portfolioData.education.unshift({ id: Date.now(), degree, institution, year, score, description });
    }

    savePortfolioData(portfolioData);
    document.querySelector(".modal-overlay").remove();
    switchAdminTab("education");
    showToast("Riwayat pendidikan disimpan!");
}

function deleteEducationItem(id) {
    if (confirm("Hapus pendidikan ini?")) {
        portfolioData.education = portfolioData.education.filter(e => e.id !== id);
        savePortfolioData(portfolioData);
        switchAdminTab("education");
        showToast("Pendidikan dihapus.");
    }
}

// --------------------------------------------------------------------------
// 8. CERTIFICATIONS TAB
// --------------------------------------------------------------------------
function renderCertificationsTab(container) {
    const certs = portfolioData.certifications || [];
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl fade-in-up">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-xl font-bold font-display text-primary">Sertifikat & Piagam (${certs.length})</h3>
                <button onclick="openCertEditModal()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-plus"></i> Tambah Sertifikat Baru
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${certs.map(c => `
                    <div class="admin-card flex flex-col justify-between">
                        <div>
                            <img src="${c.image || './assets/foto.png'}" class="w-full h-36 object-cover rounded-lg mb-3" onerror="this.src='./assets/foto.png'">
                            <span class="badge-category mb-1 inline-block">${c.issuer || 'Issuer'}</span>
                            <h4 class="font-bold text-base font-display text-primary">${c.title}</h4>
                            <p class="text-xs text-muted mt-1">Tahun: ${c.year || ''}</p>
                        </div>
                        <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 mt-3">
                            <button onclick="openCertEditModal(${c.id})" class="text-xs font-bold text-blue-primary hover:underline">Edit</button>
                            <span class="text-slate-300">•</span>
                            <button onclick="deleteCertItem(${c.id})" class="text-xs font-bold text-red-600 hover:underline">Hapus</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function openCertEditModal(id = null) {
    editingItemId = id;
    const cert = id ? (portfolioData.certifications || []).find(c => c.id === id) : {};

    const modal = document.createElement("div");
    modal.className = "modal-overlay active";
    modal.innerHTML = `
        <div class="modal-box">
            <button onclick="this.closest('.modal-overlay').remove()" class="modal-close-btn">&times;</button>
            <h3 class="text-xl font-bold font-display text-primary mb-4">${id ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}</h3>
            <form onsubmit="saveCertItem(event)" class="space-y-4">
                <div>
                    <label class="form-label">Nama Sertifikat / Penghargaan</label>
                    <input type="text" id="edit-c-title" class="form-input" value="${cert.title || ''}" required>
                </div>
                <div>
                    <label class="form-label">Penerbit / Penerbit Sertifikat</label>
                    <input type="text" id="edit-c-issuer" class="form-input" value="${cert.issuer || ''}" required>
                </div>
                <div>
                    <label class="form-label">Tahun Terbit</label>
                    <input type="text" id="edit-c-year" class="form-input" value="${cert.year || '2024'}" required>
                </div>
                <div>
                    <label class="form-label">Foto / Gambar Sertifikat</label>
                    <div class="flex items-center gap-3">
                        <img id="preview-cert-photo" src="${cert.image || './assets/foto.png'}" class="w-16 h-12 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0" onerror="this.src='./assets/foto.png'">
                        <div class="flex-1 space-y-1.5">
                            <input type="text" id="edit-c-image" class="form-input text-xs" value="${cert.image || ''}" placeholder="URL Gambar atau Upload File Lokal">
                            <label class="btn-secondary-white text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5 shadow-xs">
                                <i class="fa-solid fa-folder-open text-sky-600"></i> Upload Foto dari Komputer
                                <input type="file" accept="image/*" class="hidden" onchange="handleLocalFileUpload(this, 'edit-c-image', 'preview-cert-photo')">
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <label class="form-label">URL Verifikasi Resmi (Opsional)</label>
                    <input type="text" id="edit-c-url" class="form-input" value="${cert.verifyUrl || ''}">
                </div>
                <button type="submit" class="btn-primary-blue w-full justify-center text-xs py-3 mt-4">
                    <i class="fa-solid fa-floppy-disk"></i> Simpan Sertifikat
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function saveCertItem(e) {
    e.preventDefault();
    const title = document.getElementById("edit-c-title").value;
    const issuer = document.getElementById("edit-c-issuer").value;
    const year = document.getElementById("edit-c-year").value;
    const image = document.getElementById("edit-c-image").value;
    const verifyUrl = document.getElementById("edit-c-url").value;

    if (editingItemId) {
        const index = portfolioData.certifications.findIndex(c => c.id === editingItemId);
        if (index !== -1) {
            portfolioData.certifications[index] = { ...portfolioData.certifications[index], title, issuer, year, image, verifyUrl };
        }
    } else {
        portfolioData.certifications.unshift({ id: Date.now(), title, issuer, year, image, verifyUrl });
    }

    savePortfolioData(portfolioData);
    document.querySelector(".modal-overlay").remove();
    switchAdminTab("certifications");
    showToast("Sertifikat disimpan!");
}

function deleteCertItem(id) {
    if (confirm("Hapus sertifikat ini?")) {
        portfolioData.certifications = portfolioData.certifications.filter(c => c.id !== id);
        savePortfolioData(portfolioData);
        switchAdminTab("certifications");
        showToast("Sertifikat telah dihapus.");
    }
}

// --------------------------------------------------------------------------
// 9. SETTINGS TAB
// --------------------------------------------------------------------------
function renderSettingsTab(container) {
    container.innerHTML = `
        <div class="space-y-6 max-w-3xl fade-in-up">
            <div class="admin-card space-y-4">
                <h3 class="text-lg font-bold font-display text-primary border-b pb-3">Export / Backup Data</h3>
                <p class="text-xs text-muted">Unduh seluruh isi data portofolio (Profile, Projects, Skills, Experience, Education) sebagai file JSON.</p>
                <button onclick="exportDataJSON()" class="btn-primary-blue text-xs py-2.5 px-4 shadow-md">
                    <i class="fa-solid fa-download"></i> Unduh Backup JSON
                </button>
            </div>

            <div class="admin-card space-y-4 border-red-200">
                <h3 class="text-lg font-bold font-display text-red-600 border-b pb-3 border-red-100">Reset Data Default</h3>
                <p class="text-xs text-muted">Kembalikan seluruh data portofolio ke settingan data awal (Default Template).</p>
                <button onclick="resetDataDefault()" class="btn-secondary-white text-xs py-2.5 px-4 border-red-200 text-red-600 hover:bg-red-600 hover:text-white">
                    <i class="fa-solid fa-rotate-left"></i> Reset ke Data Bawaan
                </button>
            </div>
        </div>
    `;
}

function exportDataJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portofolio_v4_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function resetDataDefault() {
    if (confirm("⚠️ Yakin ingin mengembalikan seluruh data ke kondisi awal? Data yang belum di-backup akan terhapus.")) {
        savePortfolioData(DEFAULT_PORTFOLIO_DATA);
        location.reload();
    }
}
