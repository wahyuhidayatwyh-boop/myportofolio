/* ==========================================================================
   PORTOFOLIO V5 - FULL IN-PAGE FORM CRUD CMS ENGINE (EXACT V3 SCHEMA)
   ========================================================================== */

const DEFAULT_CMS_PIN = "Kevin@Admin2026!Secured#";
let isAdminAuthenticated = false;
let currentAdminTab = "profile";

// Compressed Local File Upload Handler
function handleLocalFileUpload(fileInputEl, targetUrlInputEl, previewImgEl, maxDimension = 1000) {
    if (!fileInputEl || !fileInputEl.files || !fileInputEl.files[0]) return;
    const file = fileInputEl.files[0];

    showToast(`Mengompres foto "${file.name}"...`, "info");

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                } else {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);

            if (targetUrlInputEl) {
                targetUrlInputEl.value = compressedBase64;
                targetUrlInputEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (previewImgEl) {
                previewImgEl.src = compressedBase64;
                previewImgEl.classList.remove('hidden');
                previewImgEl.style.display = 'block';
            }
            showToast(`Foto "${file.name}" berhasil dimuat & dioptimasi!`, "success");
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// --------------------------------------------------------------------------
// ADMIN PIN AUTH & INIT
// --------------------------------------------------------------------------
function initAdminPage() {
    const pinForm = document.getElementById('cms-pin-form');
    if (!pinForm) return;

    if (sessionStorage.getItem('destina_v5_admin_auth') === 'true') {
        isAdminAuthenticated = true;
        document.getElementById('cms-pin-screen').classList.add('hidden');
        document.getElementById('cms-admin-dashboard').classList.remove('hidden');
        renderAdminTabContent('profile');
    }

    pinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pinInput = document.getElementById('cms-pin-input').value.trim();
        const activePin = localStorage.getItem('cms_custom_admin_pin') || DEFAULT_CMS_PIN;

        if (pinInput === activePin || pinInput === "1234" || pinInput === "Kevin@Admin2026!Secured#") {
            isAdminAuthenticated = true;
            sessionStorage.setItem('destina_v5_admin_auth', 'true');
            document.getElementById('cms-pin-screen').classList.add('hidden');
            document.getElementById('cms-admin-dashboard').classList.remove('hidden');
            renderAdminTabContent('profile');
            showToast("PIN Keamanan Benar! Selamat datang di Admin CMS Dashboard.", "success");
        } else {
            showToast("Kata Sandi Admin Salah! Coba lagi (default: 1234).", "info");
        }
    });
}

function lockAdminCMS() {
    sessionStorage.removeItem('destina_v5_admin_auth');
    isAdminAuthenticated = false;
    document.getElementById('cms-admin-dashboard').classList.add('hidden');
    document.getElementById('cms-pin-screen').classList.remove('hidden');
    showToast("Session Admin telah dikunci.", "info");
}

function switchAdminTab(tabName) {
    currentAdminTab = tabName;

    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderAdminTabContent(tabName);
}

function renderAdminTabContent(tabName) {
    const contentBox = document.getElementById('admin-tab-content');
    if (!contentBox) return;

    const db = getPortfolioData();

    if (tabName === 'profile') {
        const prof = db.profile || {};
        contentBox.innerHTML = `
            <div class="bg-[#181b26] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <h3 class="text-2xl font-bold font-display text-white border-b border-white/10 pb-4">
                    <i class="fa-solid fa-user text-[#99f026]"></i> Kelola Profil, Hero & Typografi
                </h3>
                <form id="form-admin-profile" class="space-y-5">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Nama Lengkap</label>
                            <input type="text" id="prof-name" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" value="${prof.name || ''}" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Judul Profesi / Title</label>
                            <input type="text" id="prof-title" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" value="${prof.title || ''}" required>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Hero Bio Text</label>
                            <textarea id="prof-hero-bio" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" rows="2">${prof.heroBio || ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Tagline Sub-text</label>
                            <input type="text" id="prof-tagline" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" value="${prof.tagline || ''}">
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">About Subtitle Tag</label>
                            <input type="text" id="prof-about-subtitle" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" value="${prof.aboutSubtitle || 'Behind The Code'}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-2">About Heading Title</label>
                            <input type="text" id="prof-about-title" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" value="${prof.aboutTitle || ''}">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Deskripsi Lengkap About Me</label>
                        <textarea id="prof-about-desc" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#99f026]" rows="3">${prof.about || ''}</textarea>
                    </div>

                    <!-- Counter Stats -->
                    <div class="border-t border-white/10 pt-4">
                        <h4 class="text-sm font-bold text-[#99f026] mb-3">Statistik Hero Counter</h4>
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label class="block text-[11px] text-slate-400 mb-1">Tahun Exp</label>
                                <input type="text" id="prof-stat-1" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2 text-center text-white text-sm" value="${prof.yearsExp || '04+'}">
                            </div>
                            <div>
                                <label class="block text-[11px] text-slate-400 mb-1">Proyek Selesai</label>
                                <input type="text" id="prof-stat-2" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2 text-center text-white text-sm" value="${prof.projectsDone || '25+'}">
                            </div>
                            <div>
                                <label class="block text-[11px] text-slate-400 mb-1">Klien Puas</label>
                                <input type="text" id="prof-stat-3" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2 text-center text-white text-sm" value="${prof.happyClients || '15+'}">
                            </div>
                        </div>
                    </div>

                    <!-- Contact details -->
                    <div class="border-t border-white/10 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">Email Direct</label>
                            <input type="email" id="prof-email" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm" value="${prof.email || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">No WhatsApp (e.g. 628123..)</label>
                            <input type="text" id="prof-wa" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm" value="${prof.whatsapp || ''}">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">Phone Display</label>
                            <input type="text" id="prof-phone" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm" value="${prof.phone || ''}">
                        </div>
                    </div>

                    <!-- Font Settings Selector -->
                    <div class="border-t border-white/10 pt-4">
                        <h4 class="text-sm font-bold text-[#99f026] mb-3">Pengaturan Typografi & Font Utama</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-slate-400 mb-1">Font Judul / Display</label>
                                <select id="prof-font-display" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#99f026]">
                                    <option value="Montserrat" ${prof.fontDisplay === 'Montserrat' || !prof.fontDisplay ? 'selected' : ''}>Montserrat (Signature v3)</option>
                                    <option value="Outfit" ${prof.fontDisplay === 'Outfit' ? 'selected' : ''}>Outfit</option>
                                    <option value="Plus Jakarta Sans" ${prof.fontDisplay === 'Plus Jakarta Sans' ? 'selected' : ''}>Plus Jakarta Sans</option>
                                    <option value="Poppins" ${prof.fontDisplay === 'Poppins' ? 'selected' : ''}>Poppins</option>
                                    <option value="Roboto" ${prof.fontDisplay === 'Roboto' ? 'selected' : ''}>Roboto</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-400 mb-1">Font Teks / Body</label>
                                <select id="prof-font-sans" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#99f026]">
                                    <option value="Inter" ${prof.fontSans === 'Inter' || !prof.fontSans ? 'selected' : ''}>Inter (Signature v3)</option>
                                    <option value="Plus Jakarta Sans" ${prof.fontSans === 'Plus Jakarta Sans' ? 'selected' : ''}>Plus Jakarta Sans</option>
                                    <option value="Roboto" ${prof.fontSans === 'Roboto' ? 'selected' : ''}>Roboto</option>
                                    <option value="Open Sans" ${prof.fontSans === 'Open Sans' ? 'selected' : ''}>Open Sans</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-400 mb-1">Font Tulisan Tangan / Script</label>
                                <select id="prof-font-script" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm outline-none focus:border-[#99f026]">
                                    <option value="Caveat" ${prof.fontScript === 'Caveat' || !prof.fontScript ? 'selected' : ''}>Caveat (Handwriting v3)</option>
                                    <option value="Dancing Script" ${prof.fontScript === 'Dancing Script' ? 'selected' : ''}>Dancing Script</option>
                                    <option value="Pacifico" ${prof.fontScript === 'Pacifico' ? 'selected' : ''}>Pacifico</option>
                                    <option value="Satisfy" ${prof.fontScript === 'Satisfy' ? 'selected' : ''}>Satisfy</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Photo Upload -->
                    <div class="border-t border-white/10 pt-4">
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Foto Hero / Avatar (Upload File Lokal)</label>
                        <input type="file" accept="image/*" class="mb-3 text-sm text-slate-300" onchange="handleLocalFileUpload(this, document.getElementById('prof-photo-url'), document.getElementById('prof-preview-img'))">
                        <input type="hidden" id="prof-photo-url" value="${prof.avatar || ''}">
                        <img id="prof-preview-img" src="${prof.avatar || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-28 h-28 object-cover rounded-2xl border border-[#99f026]">
                    </div>

                    <button type="submit" class="btn-lime-pill w-full justify-center py-3.5 mt-4 text-xs uppercase font-extrabold tracking-wider">
                        <i class="fa-solid fa-save"></i> Simpan Perubahan Profil & Font
                    </button>
                </form>
            </div>
        `;

        document.getElementById('form-admin-profile').addEventListener('submit', (e) => {
            e.preventDefault();
            db.profile.name = document.getElementById('prof-name').value;
            db.profile.title = document.getElementById('prof-title').value;
            db.profile.heroBio = document.getElementById('prof-hero-bio').value;
            db.profile.tagline = document.getElementById('prof-tagline').value;
            db.profile.aboutSubtitle = document.getElementById('prof-about-subtitle').value;
            db.profile.aboutTitle = document.getElementById('prof-about-title').value;
            db.profile.about = document.getElementById('prof-about-desc').value;
            db.profile.yearsExp = document.getElementById('prof-stat-1').value;
            db.profile.projectsDone = document.getElementById('prof-stat-2').value;
            db.profile.happyClients = document.getElementById('prof-stat-3').value;
            db.profile.email = document.getElementById('prof-email').value;
            db.profile.whatsapp = document.getElementById('prof-wa').value;
            db.profile.phone = document.getElementById('prof-phone').value;
            db.profile.fontDisplay = document.getElementById('prof-font-display').value;
            db.profile.fontSans = document.getElementById('prof-font-sans').value;
            db.profile.fontScript = document.getElementById('prof-font-script').value;
            db.profile.avatar = document.getElementById('prof-photo-url').value || db.profile.avatar;
            db.profile.heroBgPhoto = db.profile.avatar;
            db.profile.aboutPhoto = db.profile.avatar;

            savePortfolioData(db);
            showToast("Profil dan Pengaturan Font berhasil diperbarui!", "success");
        });

    } else if (tabName === 'projects') {
        renderAdminProjectsTab(db);
    } else if (tabName === 'skills') {
        renderAdminSkillsTab(db);
    } else if (tabName === 'experiences') {
        renderAdminExpTab(db);
    } else if (tabName === 'education') {
        renderAdminEduTab(db);
    } else if (tabName === 'certifications') {
        renderAdminCertTab(db);
    }
}

// Sub-Tab: Projects (Full In-Page Form CRUD)
function renderAdminProjectsTab(db) {
    const contentBox = document.getElementById('admin-tab-content');
    const projects = db.projects || [];

    contentBox.innerHTML = `
        <div class="space-y-6">
            <div class="bg-[#181b26] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                    <h3 class="text-2xl font-bold font-display text-white">
                        <i class="fa-solid fa-layer-group text-[#99f026]"></i> Proyek Portfolio (${projects.length})
                    </h3>
                    <p class="text-xs text-slate-400 mt-1">Kelola data proyek karya profesional yang ditampilkan pada live portfolio.</p>
                </div>
                <button onclick="showAdminProjectForm()" class="btn-lime-pill text-xs px-5 py-2.5 shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Proyek Baru
                </button>
            </div>

            <!-- Form Card -->
            <div id="admin-project-form-card" class="hidden bg-[#181b26] border border-[#99f026]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <h4 id="proj-form-title" class="text-lg font-bold text-[#99f026]">Form Tambah Proyek Baru</h4>
                    <button onclick="hideAdminProjectForm()" class="text-slate-400 hover:text-white text-sm"><i class="fa-solid fa-xmark"></i> Batal</button>
                </div>
                <form id="admin-project-form" class="space-y-4">
                    <input type="hidden" id="proj-edit-id" value="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Judul Proyek</label>
                            <input type="text" id="proj-title" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: E-Commerce Platform" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Kategori</label>
                            <input type="text" id="proj-category" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: Web Application" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Deskripsi Proyek</label>
                        <textarea id="proj-desc" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" rows="3" placeholder="Deskripsi lengkap mengenai proyek karya ini..."></textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Foto Cover Proyek (Upload File Lokal)</label>
                        <input type="file" accept="image/*" class="mb-2 text-xs text-slate-300" onchange="handleLocalFileUpload(this, document.getElementById('proj-img-url'), document.getElementById('proj-img-preview'))">
                        <input type="hidden" id="proj-img-url" value="./assets/bg-orang.png">
                        <img id="proj-img-preview" src="./assets/bg-orang.png" class="w-24 h-24 object-cover rounded-xl border border-white/10 mt-1">
                    </div>
                    <div class="flex items-center gap-3 pt-2">
                        <button type="submit" class="btn-lime-pill text-xs px-6 py-3 font-extrabold uppercase tracking-wider">
                            <i class="fa-solid fa-save"></i> Simpan Data Proyek
                        </button>
                        <button type="button" onclick="hideAdminProjectForm()" class="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white">
                            Batal
                        </button>
                    </div>
                </form>
            </div>

            <!-- List Items -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${projects.map(p => `
                    <div class="bg-[#181b26] border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-white/20 transition-all">
                        <div class="flex items-start gap-4">
                            <img src="${p.image || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0">
                            <div class="space-y-1">
                                <span class="text-[10px] font-extrabold text-[#99f026] uppercase tracking-wider">${p.category || 'Web'}</span>
                                <h4 class="font-bold text-white text-base leading-snug">${p.title}</h4>
                                <p class="text-xs text-slate-400 line-clamp-2">${p.description || ''}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-end gap-2 border-t border-white/5 pt-3">
                            <button onclick="editAdminProject(${p.id})" class="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-[#99f026] hover:border-[#99f026] transition-all">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteAdminProject(${p.id})" class="px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const form = document.getElementById('admin-project-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('proj-edit-id').value;
            const title = document.getElementById('proj-title').value;
            const cat = document.getElementById('proj-category').value;
            const desc = document.getElementById('proj-desc').value;
            const img = document.getElementById('proj-img-url').value;

            const db = getPortfolioData();
            if (editId) {
                const idx = db.projects.findIndex(p => p.id == editId);
                if (idx !== -1) {
                    db.projects[idx].title = title;
                    db.projects[idx].category = cat;
                    db.projects[idx].description = desc;
                    db.projects[idx].image = img;
                }
                showToast("Proyek berhasil diperbarui!", "success");
            } else {
                db.projects.unshift({
                    id: Date.now(),
                    title,
                    category: cat,
                    description: desc,
                    image: img || "./assets/bg-orang.png"
                });
                showToast("Proyek baru berhasil ditambahkan!", "success");
            }
            savePortfolioData(db);
            renderAdminProjectsTab(db);
        });
    }
}

function showAdminProjectForm() {
    document.getElementById('admin-project-form-card').classList.remove('hidden');
    document.getElementById('proj-form-title').textContent = "Form Tambah Proyek Baru";
    document.getElementById('proj-edit-id').value = "";
    document.getElementById('proj-title').value = "";
    document.getElementById('proj-category').value = "";
    document.getElementById('proj-desc').value = "";
    document.getElementById('proj-img-url').value = "./assets/bg-orang.png";
    document.getElementById('proj-img-preview').src = "./assets/bg-orang.png";
}

function hideAdminProjectForm() {
    document.getElementById('admin-project-form-card').classList.add('hidden');
}

function editAdminProject(id) {
    const db = getPortfolioData();
    const p = db.projects.find(x => x.id == id);
    if (!p) return;

    showAdminProjectForm();
    document.getElementById('proj-form-title').textContent = `Form Edit Proyek: ${p.title}`;
    document.getElementById('proj-edit-id').value = p.id;
    document.getElementById('proj-title').value = p.title || "";
    document.getElementById('proj-category').value = p.category || "";
    document.getElementById('proj-desc').value = p.description || "";
    document.getElementById('proj-img-url').value = p.image || "./assets/bg-orang.png";
    document.getElementById('proj-img-preview').src = p.image || "./assets/bg-orang.png";
}

function deleteAdminProject(id) {
    if (!confirm("Konfirmasi: Hapus data proyek ini?")) return;
    const db = getPortfolioData();
    db.projects = db.projects.filter(p => p.id !== id);
    savePortfolioData(db);
    renderAdminProjectsTab(db);
    showToast("Proyek telah dihapus.", "info");
}

// Sub-Tab: Skills (Full In-Page Form CRUD)
function renderAdminSkillsTab(db) {
    const contentBox = document.getElementById('admin-tab-content');
    const skills = db.skills || [];

    contentBox.innerHTML = `
        <div class="space-y-6">
            <div class="bg-[#181b26] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                    <h3 class="text-2xl font-bold font-display text-white">
                        <i class="fa-solid fa-code text-[#99f026]"></i> Technical Skills (${skills.length})
                    </h3>
                    <p class="text-xs text-slate-400 mt-1">Kelola data keahlian dan tingkat penguasaan teknologi.</p>
                </div>
                <button onclick="showAdminSkillForm()" class="btn-lime-pill text-xs px-5 py-2.5 shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Skill Baru
                </button>
            </div>

            <!-- Form Card -->
            <div id="admin-skill-form-card" class="hidden bg-[#181b26] border border-[#99f026]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <h4 id="skill-form-title" class="text-lg font-bold text-[#99f026]">Form Tambah Skill Baru</h4>
                    <button onclick="hideAdminSkillForm()" class="text-slate-400 hover:text-white text-sm"><i class="fa-solid fa-xmark"></i> Batal</button>
                </div>
                <form id="admin-skill-form" class="space-y-4">
                    <input type="hidden" id="skill-edit-id" value="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Skill / Teknologi</label>
                            <input type="text" id="skill-name" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: React.js" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Penguasaan Level (%)</label>
                            <input type="number" id="skill-level" min="1" max="100" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="misal: 90" required>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Kategori Skill</label>
                            <input type="text" id="skill-category" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Frontend / Backend / Design" value="Frontend">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Class Icon FontAwesome</label>
                            <input type="text" id="skill-icon" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="fa-brands fa-react" value="fa-solid fa-code">
                        </div>
                    </div>
                    <div class="flex items-center gap-3 pt-2">
                        <button type="submit" class="btn-lime-pill text-xs px-6 py-3 font-extrabold uppercase tracking-wider">
                            <i class="fa-solid fa-save"></i> Simpan Data Skill
                        </button>
                        <button type="button" onclick="hideAdminSkillForm()" class="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white">
                            Batal
                        </button>
                    </div>
                </form>
            </div>

            <!-- List Items -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                ${skills.map(s => `
                    <div class="bg-[#181b26] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-all">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-[#99f026]/10 text-[#99f026] border border-[#99f026]/20 flex items-center justify-center text-lg">
                                <i class="${s.icon || 'fa-solid fa-code'}"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-white text-sm">${s.name}</h4>
                                <span class="text-xs text-[#99f026] font-semibold">${s.level}% Level</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            <button onclick="editAdminSkill(${s.id})" class="p-2 text-slate-400 hover:text-[#99f026] text-xs">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onclick="deleteAdminSkill(${s.id})" class="p-2 text-red-400 hover:text-red-300 text-xs">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const form = document.getElementById('admin-skill-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('skill-edit-id').value;
            const name = document.getElementById('skill-name').value;
            const level = parseInt(document.getElementById('skill-level').value) || 85;
            const category = document.getElementById('skill-category').value || "Frontend";
            const icon = document.getElementById('skill-icon').value || "fa-solid fa-code";

            const db = getPortfolioData();
            if (editId) {
                const idx = db.skills.findIndex(s => s.id == editId);
                if (idx !== -1) {
                    db.skills[idx].name = name;
                    db.skills[idx].level = level;
                    db.skills[idx].category = category;
                    db.skills[idx].icon = icon;
                }
                showToast("Skill berhasil diperbarui!", "success");
            } else {
                db.skills.push({
                    id: Date.now(),
                    name,
                    level,
                    category,
                    icon
                });
                showToast("Skill baru berhasil ditambahkan!", "success");
            }
            savePortfolioData(db);
            renderAdminSkillsTab(db);
        });
    }
}

function showAdminSkillForm() {
    document.getElementById('admin-skill-form-card').classList.remove('hidden');
    document.getElementById('skill-form-title').textContent = "Form Tambah Skill Baru";
    document.getElementById('skill-edit-id').value = "";
    document.getElementById('skill-name').value = "";
    document.getElementById('skill-level').value = "90";
    document.getElementById('skill-category').value = "Frontend";
    document.getElementById('skill-icon').value = "fa-solid fa-code";
}

function hideAdminSkillForm() {
    document.getElementById('admin-skill-form-card').classList.add('hidden');
}

function editAdminSkill(id) {
    const db = getPortfolioData();
    const s = db.skills.find(x => x.id == id);
    if (!s) return;

    showAdminSkillForm();
    document.getElementById('skill-form-title').textContent = `Form Edit Skill: ${s.name}`;
    document.getElementById('skill-edit-id').value = s.id;
    document.getElementById('skill-name').value = s.name || "";
    document.getElementById('skill-level').value = s.level || 85;
    document.getElementById('skill-category').value = s.category || "Frontend";
    document.getElementById('skill-icon').value = s.icon || "fa-solid fa-code";
}

function deleteAdminSkill(id) {
    if (!confirm("Konfirmasi: Hapus skill ini?")) return;
    const db = getPortfolioData();
    db.skills = db.skills.filter(s => s.id !== id);
    savePortfolioData(db);
    renderAdminSkillsTab(db);
    showToast("Skill telah dihapus.", "info");
}

// Sub-Tab: Experiences (Full In-Page Form CRUD)
function renderAdminExpTab(db) {
    const contentBox = document.getElementById('admin-tab-content');
    const exps = db.experiences || [];

    contentBox.innerHTML = `
        <div class="space-y-6">
            <div class="bg-[#181b26] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                    <h3 class="text-2xl font-bold font-display text-white">
                        <i class="fa-solid fa-briefcase text-[#99f026]"></i> Pengalaman Kerja (${exps.length})
                    </h3>
                    <p class="text-xs text-slate-400 mt-1">Kelola data riwayat karir dan jejak pengalaman profesional.</p>
                </div>
                <button onclick="showAdminExpForm()" class="btn-lime-pill text-xs px-5 py-2.5 shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Pengalaman Baru
                </button>
            </div>

            <!-- Form Card -->
            <div id="admin-exp-form-card" class="hidden bg-[#181b26] border border-[#99f026]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <h4 id="exp-form-title" class="text-lg font-bold text-[#99f026]">Form Tambah Pengalaman Baru</h4>
                    <button onclick="hideAdminExpForm()" class="text-slate-400 hover:text-white text-sm"><i class="fa-solid fa-xmark"></i> Batal</button>
                </div>
                <form id="admin-exp-form" class="space-y-4">
                    <input type="hidden" id="exp-edit-id" value="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Posisi / Role Pekerjaan</label>
                            <input type="text" id="exp-role" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: Senior Full Stack Developer" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Perusahaan / Studio</label>
                            <input type="text" id="exp-company" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: Creatix Digital Studio" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Periode Kerja</label>
                        <input type="text" id="exp-period" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: 2022 - Sekarang" required>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Deskripsi & Tanggung Jawab</label>
                        <textarea id="exp-desc" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" rows="3" placeholder="Rincian pengalaman & pencapaian..."></textarea>
                    </div>
                    <div class="flex items-center gap-3 pt-2">
                        <button type="submit" class="btn-lime-pill text-xs px-6 py-3 font-extrabold uppercase tracking-wider">
                            <i class="fa-solid fa-save"></i> Simpan Data Pengalaman
                        </button>
                        <button type="button" onclick="hideAdminExpForm()" class="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white">
                            Batal
                        </button>
                    </div>
                </form>
            </div>

            <!-- List Items -->
            <div class="space-y-4">
                ${exps.map(e => `
                    <div class="bg-[#181b26] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all">
                        <div class="space-y-1">
                            <span class="text-xs font-extrabold text-[#99f026] uppercase tracking-wider">${e.company} (${e.period})</span>
                            <h4 class="font-bold text-white text-base">${e.role}</h4>
                            <p class="text-xs text-slate-400 max-w-xl">${e.description || ''}</p>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button onclick="editAdminExp(${e.id})" class="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-[#99f026] hover:border-[#99f026] transition-all">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteAdminExp(${e.id})" class="px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const form = document.getElementById('admin-exp-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('exp-edit-id').value;
            const role = document.getElementById('exp-role').value;
            const company = document.getElementById('exp-company').value;
            const period = document.getElementById('exp-period').value;
            const desc = document.getElementById('exp-desc').value;

            const db = getPortfolioData();
            if (editId) {
                const idx = db.experiences.findIndex(x => x.id == editId);
                if (idx !== -1) {
                    db.experiences[idx].role = role;
                    db.experiences[idx].company = company;
                    db.experiences[idx].period = period;
                    db.experiences[idx].description = desc;
                }
                showToast("Pengalaman kerja diperbarui!", "success");
            } else {
                db.experiences.unshift({
                    id: Date.now(),
                    role,
                    company,
                    period,
                    description: desc
                });
                showToast("Pengalaman kerja ditambahkan!", "success");
            }
            savePortfolioData(db);
            renderAdminExpTab(db);
        });
    }
}

function showAdminExpForm() {
    document.getElementById('admin-exp-form-card').classList.remove('hidden');
    document.getElementById('exp-form-title').textContent = "Form Tambah Pengalaman Baru";
    document.getElementById('exp-edit-id').value = "";
    document.getElementById('exp-role').value = "";
    document.getElementById('exp-company').value = "";
    document.getElementById('exp-period').value = "2022 - Sekarang";
    document.getElementById('exp-desc').value = "";
}

function hideAdminExpForm() {
    document.getElementById('admin-exp-form-card').classList.add('hidden');
}

function editAdminExp(id) {
    const db = getPortfolioData();
    const e = db.experiences.find(x => x.id == id);
    if (!e) return;

    showAdminExpForm();
    document.getElementById('exp-form-title').textContent = `Form Edit Pengalaman: ${e.role}`;
    document.getElementById('exp-edit-id').value = e.id;
    document.getElementById('exp-role').value = e.role || "";
    document.getElementById('exp-company').value = e.company || "";
    document.getElementById('exp-period').value = e.period || "";
    document.getElementById('exp-desc').value = e.description || "";
}

function deleteAdminExp(id) {
    if (!confirm("Konfirmasi: Hapus data pengalaman ini?")) return;
    const db = getPortfolioData();
    db.experiences = db.experiences.filter(e => e.id !== id);
    savePortfolioData(db);
    renderAdminExpTab(db);
    showToast("Pengalaman kerja telah dihapus.", "info");
}

// Sub-Tab: Education (Full In-Page Form CRUD)
function renderAdminEduTab(db) {
    const contentBox = document.getElementById('admin-tab-content');
    const edus = db.education || [];

    contentBox.innerHTML = `
        <div class="space-y-6">
            <div class="bg-[#181b26] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                    <h3 class="text-2xl font-bold font-display text-white">
                        <i class="fa-solid fa-graduation-cap text-[#99f026]"></i> Pendidikan Formal (${edus.length})
                    </h3>
                    <p class="text-xs text-slate-400 mt-1">Kelola riwayat pendidikan formal dan akademis.</p>
                </div>
                <button onclick="showAdminEduForm()" class="btn-lime-pill text-xs px-5 py-2.5 shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Pendidikan Baru
                </button>
            </div>

            <!-- Form Card -->
            <div id="admin-edu-form-card" class="hidden bg-[#181b26] border border-[#99f026]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <h4 id="edu-form-title" class="text-lg font-bold text-[#99f026]">Form Tambah Pendidikan Baru</h4>
                    <button onclick="hideAdminEduForm()" class="text-slate-400 hover:text-white text-sm"><i class="fa-solid fa-xmark"></i> Batal</button>
                </div>
                <form id="admin-edu-form" class="space-y-4">
                    <input type="hidden" id="edu-edit-id" value="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Gelar / Jenjang Pendidikan</label>
                            <input type="text" id="edu-degree" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: Sarjana Komputer (S.Kom)" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Institusi / Universitas</label>
                            <input type="text" id="edu-inst" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: Universitas Informatika" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Periode Studi</label>
                        <input type="text" id="edu-period" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: 2015 - 2019" required>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Deskripsi Studi / Keterangan</label>
                        <textarea id="edu-desc" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" rows="3" placeholder="Fokus studi, predikat kelulusan..."></textarea>
                    </div>
                    <div class="flex items-center gap-3 pt-2">
                        <button type="submit" class="btn-lime-pill text-xs px-6 py-3 font-extrabold uppercase tracking-wider">
                            <i class="fa-solid fa-save"></i> Simpan Data Pendidikan
                        </button>
                        <button type="button" onclick="hideAdminEduForm()" class="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white">
                            Batal
                        </button>
                    </div>
                </form>
            </div>

            <!-- List Items -->
            <div class="space-y-4">
                ${edus.map(edu => `
                    <div class="bg-[#181b26] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-white/20 transition-all">
                        <div class="space-y-1">
                            <span class="text-xs font-extrabold text-[#99f026] uppercase tracking-wider">${edu.institution} (${edu.period})</span>
                            <h4 class="font-bold text-white text-base">${edu.degree}</h4>
                            <p class="text-xs text-slate-400 max-w-xl">${edu.description || ''}</p>
                        </div>
                        <div class="flex items-center gap-2 shrink-0">
                            <button onclick="editAdminEdu(${edu.id})" class="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-[#99f026] hover:border-[#99f026] transition-all">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteAdminEdu(${edu.id})" class="px-3.5 py-1.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500 hover:text-white transition-all">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const form = document.getElementById('admin-edu-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('edu-edit-id').value;
            const degree = document.getElementById('edu-degree').value;
            const inst = document.getElementById('edu-inst').value;
            const period = document.getElementById('edu-period').value;
            const desc = document.getElementById('edu-desc').value;

            const db = getPortfolioData();
            if (editId) {
                const idx = db.education.findIndex(x => x.id == editId);
                if (idx !== -1) {
                    db.education[idx].degree = degree;
                    db.education[idx].institution = inst;
                    db.education[idx].period = period;
                    db.education[idx].description = desc;
                }
                showToast("Pendidikan formal diperbarui!", "success");
            } else {
                db.education.push({
                    id: Date.now(),
                    degree,
                    institution: inst,
                    period,
                    description: desc
                });
                showToast("Pendidikan formal ditambahkan!", "success");
            }
            savePortfolioData(db);
            renderAdminEduTab(db);
        });
    }
}

function showAdminEduForm() {
    document.getElementById('admin-edu-form-card').classList.remove('hidden');
    document.getElementById('edu-form-title').textContent = "Form Tambah Pendidikan Baru";
    document.getElementById('edu-edit-id').value = "";
    document.getElementById('edu-degree').value = "";
    document.getElementById('edu-inst').value = "";
    document.getElementById('edu-period').value = "2015 - 2019";
    document.getElementById('edu-desc').value = "";
}

function hideAdminEduForm() {
    document.getElementById('admin-edu-form-card').classList.add('hidden');
}

function editAdminEdu(id) {
    const db = getPortfolioData();
    const edu = db.education.find(x => x.id == id);
    if (!edu) return;

    showAdminEduForm();
    document.getElementById('edu-form-title').textContent = `Form Edit Pendidikan: ${edu.degree}`;
    document.getElementById('edu-edit-id').value = edu.id;
    document.getElementById('edu-degree').value = edu.degree || "";
    document.getElementById('edu-inst').value = edu.institution || "";
    document.getElementById('edu-period').value = edu.period || "";
    document.getElementById('edu-desc').value = edu.description || "";
}

function deleteAdminEdu(id) {
    if (!confirm("Konfirmasi: Hapus data pendidikan ini?")) return;
    const db = getPortfolioData();
    db.education = db.education.filter(e => e.id !== id);
    savePortfolioData(db);
    renderAdminEduTab(db);
    showToast("Pendidikan formal telah dihapus.", "info");
}

// Sub-Tab: Certifications (Full In-Page Form CRUD)
function renderAdminCertTab(db) {
    const contentBox = document.getElementById('admin-tab-content');
    const certs = db.certifications || [];

    contentBox.innerHTML = `
        <div class="space-y-6">
            <div class="bg-[#181b26] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                    <h3 class="text-2xl font-bold font-display text-white">
                        <i class="fa-solid fa-certificate text-[#99f026]"></i> Sertifikat & Piagam (${certs.length})
                    </h3>
                    <p class="text-xs text-slate-400 mt-1">Kelola galeri sertifikat profesional & penghargaan.</p>
                </div>
                <button onclick="showAdminCertForm()" class="btn-lime-pill text-xs px-5 py-2.5 shadow-lg">
                    <i class="fa-solid fa-plus"></i> Tambah Sertifikat Baru
                </button>
            </div>

            <!-- Form Card -->
            <div id="admin-cert-form-card" class="hidden bg-[#181b26] border border-[#99f026]/40 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
                <div class="flex items-center justify-between border-b border-white/10 pb-4">
                    <h4 id="cert-form-title" class="text-lg font-bold text-[#99f026]">Form Tambah Sertifikat Baru</h4>
                    <button onclick="hideAdminCertForm()" class="text-slate-400 hover:text-white text-sm"><i class="fa-solid fa-xmark"></i> Batal</button>
                </div>
                <form id="admin-cert-form" class="space-y-4">
                    <input type="hidden" id="cert-edit-id" value="">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Nama Sertifikat / Award</label>
                            <input type="text" id="cert-title" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: AWS Certified Solutions Architect" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Penerbit / Organization</label>
                            <input type="text" id="cert-issuer" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: Amazon Web Services" required>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Tahun Perolehan</label>
                        <input type="text" id="cert-year" class="w-full bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#99f026]" placeholder="Contoh: 2023" required>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-1">Foto Sertifikat (Upload File Lokal)</label>
                        <input type="file" accept="image/*" class="mb-2 text-xs text-slate-300" onchange="handleLocalFileUpload(this, document.getElementById('cert-img-url'), document.getElementById('cert-img-preview'))">
                        <input type="hidden" id="cert-img-url" value="./assets/bg-orang.png">
                        <img id="cert-img-preview" src="./assets/bg-orang.png" class="w-24 h-24 object-cover rounded-xl border border-white/10 mt-1">
                    </div>
                    <div class="flex items-center gap-3 pt-2">
                        <button type="submit" class="btn-lime-pill text-xs px-6 py-3 font-extrabold uppercase tracking-wider">
                            <i class="fa-solid fa-save"></i> Simpan Data Sertifikat
                        </button>
                        <button type="button" onclick="hideAdminCertForm()" class="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white">
                            Batal
                        </button>
                    </div>
                </form>
            </div>

            <!-- List Items -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${certs.map(c => `
                    <div class="bg-[#181b26] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-white/20 transition-all">
                        <div class="flex items-center gap-3">
                            <img src="${c.image || './assets/bg-orang.png'}" onerror="this.onerror=null;this.src='./assets/bg-orang.png'" class="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0">
                            <div>
                                <h4 class="font-bold text-white text-sm leading-snug">${c.title}</h4>
                                <span class="text-xs text-slate-400">${c.issuer} (${c.year})</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-1 shrink-0">
                            <button onclick="editAdminCert(${c.id})" class="p-2 text-slate-400 hover:text-[#99f026] text-xs">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteAdminCert(${c.id})" class="p-2 text-red-400 hover:text-red-300 text-xs">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const form = document.getElementById('admin-cert-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const editId = document.getElementById('cert-edit-id').value;
            const title = document.getElementById('cert-title').value;
            const issuer = document.getElementById('cert-issuer').value;
            const year = document.getElementById('cert-year').value;
            const img = document.getElementById('cert-img-url').value;

            const db = getPortfolioData();
            if (editId) {
                const idx = db.certifications.findIndex(x => x.id == editId);
                if (idx !== -1) {
                    db.certifications[idx].title = title;
                    db.certifications[idx].issuer = issuer;
                    db.certifications[idx].year = year;
                    db.certifications[idx].image = img;
                }
                showToast("Sertifikat diperbarui!", "success");
            } else {
                db.certifications.push({
                    id: Date.now(),
                    title,
                    issuer,
                    year,
                    image: img || "./assets/bg-orang.png"
                });
                showToast("Sertifikat ditambahkan!", "success");
            }
            savePortfolioData(db);
            renderAdminCertTab(db);
        });
    }
}

function showAdminCertForm() {
    document.getElementById('admin-cert-form-card').classList.remove('hidden');
    document.getElementById('cert-form-title').textContent = "Form Tambah Sertifikat Baru";
    document.getElementById('cert-edit-id').value = "";
    document.getElementById('cert-title').value = "";
    document.getElementById('cert-issuer').value = "";
    document.getElementById('cert-year').value = "2023";
    document.getElementById('cert-img-url').value = "./assets/bg-orang.png";
    document.getElementById('cert-img-preview').src = "./assets/bg-orang.png";
}

function hideAdminCertForm() {
    document.getElementById('admin-cert-form-card').classList.add('hidden');
}

function editAdminCert(id) {
    const db = getPortfolioData();
    const c = db.certifications.find(x => x.id == id);
    if (!c) return;

    showAdminCertForm();
    document.getElementById('cert-form-title').textContent = `Form Edit Sertifikat: ${c.title}`;
    document.getElementById('cert-edit-id').value = c.id;
    document.getElementById('cert-title').value = c.title || "";
    document.getElementById('cert-issuer').value = c.issuer || "";
    document.getElementById('cert-year').value = c.year || "";
    document.getElementById('cert-img-url').value = c.image || "./assets/bg-orang.png";
    document.getElementById('cert-img-preview').src = c.image || "./assets/bg-orang.png";
}

function deleteAdminCert(id) {
    if (!confirm("Konfirmasi: Hapus sertifikat ini?")) return;
    const db = getPortfolioData();
    db.certifications = db.certifications.filter(c => c.id !== id);
    savePortfolioData(db);
    renderAdminCertTab(db);
    showToast("Sertifikat telah dihapus.", "info");
}

document.addEventListener('DOMContentLoaded', () => {
    initAdminPage();
});
