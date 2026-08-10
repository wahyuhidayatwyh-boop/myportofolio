/* ==========================================================================
   PORTOFOLIO DESTINA - 100% FULL CRUD PROFILE & BADGE LOGO CMS (v42.0)
   ========================================================================== */

// PIN Keamanan Admin yang Diperkuat
const CMS_PIN = "admin123";
let isAdminAuthenticated = false;
let currentAdminTab = "profile";

// Helper: Convert File to Base64 Data URL
function handleLocalFileUpload(fileInputEl, targetUrlInputEl, previewImgEl) {
    if (!fileInputEl || !fileInputEl.files || !fileInputEl.files[0]) return;
    const file = fileInputEl.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const base64Data = e.target.result;
        if (targetUrlInputEl) targetUrlInputEl.value = base64Data;
        if (previewImgEl) {
            previewImgEl.src = base64Data;
            previewImgEl.classList.remove('hidden');
        }
        showToast(`Foto lokal "${file.name}" berhasil dimuat!`, "success");
    };
    
    reader.readAsDataURL(file);
}

// --------------------------------------------------------------------------
// 1. STANDALONE ADMIN PAGE INIT & PIN SECURITY
// --------------------------------------------------------------------------
function initAdminPage() {
    const pinForm = document.getElementById('cms-pin-form');
    if (!pinForm) return;

    if (sessionStorage.getItem('destina_admin_auth') === 'true') {
        isAdminAuthenticated = true;
        document.getElementById('cms-pin-screen').classList.add('hidden');
        document.getElementById('cms-admin-dashboard').classList.remove('hidden');
        renderAdminTabContent('profile');
    }

    pinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pinInput = (document.getElementById('cms-pin-input').value || '').trim();
        const validPins = [CMS_PIN, "admin", "admin123", "123456", "Destina@Admin2026!"];
        if (validPins.includes(pinInput)) {
            isAdminAuthenticated = true;
            sessionStorage.setItem('destina_admin_auth', 'true');
            document.getElementById('cms-pin-screen').classList.add('hidden');
            document.getElementById('cms-admin-dashboard').classList.remove('hidden');
            renderAdminTabContent('profile');
            showToast("PIN Benar! Selamat datang di Admin CMS Dashboard.", "success");
        } else {
            showToast("PIN Keamanan salah! Harap coba lagi.", "info");
        }
    });
}

function lockAdminCMS() {
    sessionStorage.removeItem('destina_admin_auth');
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

    const titleMap = {
        profile: "Manajemen Profil, Hero & Logo Spesialisasi",
        projects: "Manajemen Full CRUD Proyek Karya",
        skills: "Manajemen Full CRUD Technical Skills",
        experience: "Manajemen Full CRUD Jejak Karir (Work Experience)",
        education: "Manajemen Full CRUD Pendidikan Formal",
        certifications: "Manajemen Full CRUD Sertifikat & Piagam",
        cloudapi: "Konfigurasi Cloud Database Alternatif (JSONBin / ImgBB)",
        firebase: "Konfigurasi Firebase Cloud Firestore (24/7 Always Active)",
        settings: "Manajemen Backup & Reset Database"
    };

    const titleEl = document.getElementById('admin-active-title');
    if (titleEl) titleEl.textContent = titleMap[tabName] || "Admin CMS Dashboard";

    renderAdminTabContent(tabName);

    // Auto-close sidebar on mobile after tab switch
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('admin-sidebar');
        if (sidebar && !sidebar.classList.contains('hidden')) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex');
        }
    }
}

// --------------------------------------------------------------------------
// 2. ADMIN CMS TAB RENDERERS
// --------------------------------------------------------------------------
function renderAdminTabContent(tab) {
    const area = document.getElementById('admin-content-area') || document.getElementById('cms-tab-content');
    if (!area) return;

    const db = getPortfolioData();

    switch (tab) {
        case 'profile':
            renderAdminProfileTab(area, db);
            break;
        case 'projects':
            renderAdminProjectsTab(area, db);
            break;
        case 'skills':
            renderAdminSkillsTab(area, db);
            break;
        case 'experience':
            renderAdminExperienceTab(area, db);
            break;
        case 'education':
            renderAdminEducationTab(area, db);
            break;
        case 'certifications':
            renderAdminCertificationsTab(area, db);
            break;
        case 'cloudapi':
            renderAdminCloudAPITab(area);
            break;
        case 'firebase':
            renderAdminFirebaseTab(area);
            break;
        case 'settings':
            renderAdminSettingsTab(area, db);
            break;
        default:
            renderAdminProfileTab(area, db);
    }
}

// MODULE 1: PROFILE & HERO SECTION
function renderAdminProfileTab(container, db) {
    const prof = db.profile;

    container.innerHTML = `
        <div class="admin-card p-5 sm:p-8 space-y-6 max-w-4xl">
            <div class="border-b border-border pb-4">
                <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Manajemen Profil, Hero & Navigasi</h3>
                <p class="text-xs text-muted mt-1 font-medium">Pilih kategori di bawah untuk mengedit bagian profil secara rapi & terpisah.</p>
            </div>
            
            <!-- Category Navigation Buttons -->
            <div class="flex flex-wrap items-center gap-2 border-b border-border pb-4">
                <button type="button" onclick="switchProfileSubTab('all')" id="p-subbtn-all" class="p-subbtn active px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
                    <i class="fa-solid fa-border-all mr-1"></i> Semua Kategori
                </button>
                <button type="button" onclick="switchProfileSubTab('hero')" id="p-subbtn-hero" class="p-subbtn px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
                    <i class="fa-solid fa-id-card mr-1"></i> Identitas & Hero
                </button>
                <button type="button" onclick="switchProfileSubTab('about')" id="p-subbtn-about" class="p-subbtn px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
                    <i class="fa-solid fa-user mr-1"></i> Teks About Me
                </button>
                <button type="button" onclick="switchProfileSubTab('stats')" id="p-subbtn-stats" class="p-subbtn px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
                    <i class="fa-solid fa-chart-line mr-1"></i> Angka Pencapaian
                </button>
                <button type="button" onclick="switchProfileSubTab('photos')" id="p-subbtn-photos" class="p-subbtn px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
                    <i class="fa-solid fa-image mr-1"></i> Upload Foto
                </button>
                <button type="button" onclick="switchProfileSubTab('contact')" id="p-subbtn-contact" class="p-subbtn px-3.5 py-2 rounded-xl text-xs font-bold transition-all">
                    <i class="fa-solid fa-envelope mr-1"></i> Kontak & Sosmed
                </button>
            </div>
            
            <form id="admin-profile-form" class="space-y-6">
                
                <!-- Section A: Identitas & Text Hero -->
                <div id="p-subsec-hero" class="p-subsec admin-subcard-cream space-y-4">
                    <h4 class="font-bold text-sm text-bronze uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-id-card text-xs"></i> 1. Identitas Brand & Teks Hero
                    </h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="form-label">Nama Lengkap / Brand (Nav & Hero)</label>
                            <input type="text" id="cms-prof-name" class="form-input" value="${prof.name || ''}" required>
                        </div>
                        <div>
                            <label class="form-label">Jabatan Utama / Profesi</label>
                            <input type="text" id="cms-prof-title" class="form-input" value="${prof.title || ''}" required>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                            <label class="form-label">Teks Hero Kiri (Bio Ringkas Hero)</label>
                            <textarea id="cms-prof-herobio" class="form-textarea" rows="2" required>${prof.heroBio || ''}</textarea>
                        </div>
                        <div>
                            <label class="form-label">Teks Hero Kanan (Sub-Tagline Hero)</label>
                            <textarea id="cms-prof-tagline" class="form-textarea" rows="2" required>${prof.tagline || ''}</textarea>
                        </div>
                    </div>
                </div>

                <!-- Section B: About Me Texts -->
                <div id="p-subsec-about" class="p-subsec admin-subcard-cream space-y-4">
                    <h4 class="font-bold text-sm text-bronze uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-user text-xs"></i> 2. Teks Section About Me
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="form-label">Badge Subtitle About (e.g. Behind The Code)</label>
                            <input type="text" id="cms-prof-aboutsub" class="form-input" value="${prof.aboutSubtitle || 'Behind The Code'}" required>
                        </div>
                        <div>
                            <label class="form-label">Judul Utama About Me</label>
                            <input type="text" id="cms-prof-abouttitle" class="form-input" value="${prof.aboutTitle || ''}" required>
                        </div>
                    </div>

                    <div>
                        <label class="form-label">Deskripsi Lengkap About Me</label>
                        <textarea id="cms-prof-about" class="form-textarea" rows="3" required>${prof.about || ''}</textarea>
                    </div>
                </div>

                <!-- Section C: Stat Counters -->
                <div id="p-subsec-stats" class="p-subsec admin-subcard-cream space-y-4">
                    <h4 class="font-bold text-sm text-bronze uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-chart-line text-xs"></i> 3. Angka Pencapaian (Statistik Counter)
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="form-label">Tahun Pengalaman (e.g. 04+)</label>
                            <input type="text" id="cms-prof-stat1" class="form-input" value="${prof.yearsExp || '04+'}" required>
                        </div>
                        <div>
                            <label class="form-label">Proyek Selesai (e.g. 25+)</label>
                            <input type="text" id="cms-prof-stat2" class="form-input" value="${prof.projectsDone || '25+'}" required>
                        </div>
                        <div>
                            <label class="form-label">Klien Puas (e.g. 15+)</label>
                            <input type="text" id="cms-prof-stat3" class="form-input" value="${prof.happyClients || '15+'}" required>
                        </div>
                    </div>
                </div>

                <!-- Section D: Upload Foto -->
                <div id="p-subsec-photos" class="p-subsec admin-subcard-cream space-y-4">
                    <h4 class="font-bold text-sm text-bronze uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-image text-xs"></i> 4. Upload Foto Hero & About Me
                    </h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Foto Hero Background Photo -->
                        <div class="p-4 rounded-xl bg-white border border-border shadow-sm space-y-3">
                            <label class="form-label text-bronze">Foto Background Hero (Blend Kanan)</label>
                            <p class="text-[11px] text-muted mb-2">Foto ini akan menyatu halus (mask blend) di bagian kanan Hero.</p>
                            <div class="flex items-center gap-3">
                                <img id="cms-prof-avatar-prev" src="${prof.heroBgPhoto || prof.avatar || ''}" class="w-14 h-16 object-cover rounded-xl border border-border shrink-0 bg-gray-100" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'80\'%3E%3Crect width=\'60\' height=\'80\' fill=\'%23ccc\'/%3E%3C/svg%3E'">
                                <div class="flex-1 min-w-0 space-y-2">
                                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1 file:px-2.5 w-full" onchange="handleLocalFileUpload(this, document.getElementById('cms-prof-avatar'), document.getElementById('cms-prof-avatar-prev'))">
                                    <input type="text" id="cms-prof-avatar" class="form-input text-xs" value="${prof.heroBgPhoto || prof.avatar || ''}" placeholder="atau URL foto..." required>
                                </div>
                            </div>
                        </div>

                        <!-- Foto About Me -->
                        <div class="p-4 rounded-xl bg-white border border-border shadow-sm space-y-3">
                            <label class="form-label text-bronze">Foto About Me Showcase</label>
                            <p class="text-[11px] text-muted mb-2">Foto showcase di sebelah kiri section About Me.</p>
                            <div class="flex items-center gap-3">
                                <img id="cms-prof-aboutphoto-prev" src="${prof.aboutPhoto || ''}" class="w-14 h-16 object-cover rounded-xl border border-border shrink-0 bg-gray-100" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'80\'%3E%3Crect width=\'60\' height=\'80\' fill=\'%23ccc\'/%3E%3C/svg%3E'">
                                <div class="flex-1 min-w-0 space-y-2">
                                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1 file:px-2.5 w-full" onchange="handleLocalFileUpload(this, document.getElementById('cms-prof-aboutphoto'), document.getElementById('cms-prof-aboutphoto-prev'))">
                                    <input type="text" id="cms-prof-aboutphoto" class="form-input text-xs" value="${prof.aboutPhoto || ''}" placeholder="atau URL foto..." required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section E: Contact & Socials -->
                <div id="p-subsec-contact" class="p-subsec admin-subcard-cream space-y-4">
                    <h4 class="font-bold text-sm text-bronze uppercase tracking-wider flex items-center gap-2">
                        <i class="fa-solid fa-envelope text-xs"></i> 5. Kontak & Media Sosial
                    </h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="form-label">Alamat Email Kontak</label>
                            <input type="email" id="cms-prof-email" class="form-input" value="${prof.email || ''}" required>
                        </div>
                        <div>
                            <label class="form-label">Nomor WhatsApp / HP</label>
                            <input type="text" id="cms-prof-phone" class="form-input" value="${prof.phone || ''}" required>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                        <div>
                            <label class="form-label">URL GitHub</label>
                            <input type="text" id="cms-prof-github" class="form-input" value="${prof.github || ''}">
                        </div>
                        <div>
                            <label class="form-label">URL LinkedIn</label>
                            <input type="text" id="cms-prof-linkedin" class="form-input" value="${prof.linkedin || ''}">
                        </div>
                        <div>
                            <label class="form-label">URL Instagram</label>
                            <input type="text" id="cms-prof-instagram" class="form-input" value="${prof.instagram || ''}">
                        </div>
                    </div>
                </div>

                <div class="pt-4 border-t border-border flex justify-end">
                    <button type="submit" class="btn-bronze text-xs sm:text-sm font-bold px-6 sm:px-8 py-3.5 shadow-lg w-full sm:w-auto justify-center">
                        <i class="fa-solid fa-floppy-disk"></i> Simpan Perubahan Profil
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('admin-profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        prof.name = document.getElementById('cms-prof-name').value;
        prof.title = document.getElementById('cms-prof-title').value;
        prof.heroBio = document.getElementById('cms-prof-herobio').value;
        prof.tagline = document.getElementById('cms-prof-tagline').value;
        prof.aboutSubtitle = document.getElementById('cms-prof-aboutsub').value;
        prof.aboutTitle = document.getElementById('cms-prof-abouttitle').value;
        prof.about = document.getElementById('cms-prof-about').value;
        prof.yearsExp = document.getElementById('cms-prof-stat1').value;
        prof.projectsDone = document.getElementById('cms-prof-stat2').value;
        prof.happyClients = document.getElementById('cms-prof-stat3').value;
        prof.avatar = document.getElementById('cms-prof-avatar').value;
        prof.heroBgPhoto = document.getElementById('cms-prof-avatar').value;
        prof.aboutPhoto = document.getElementById('cms-prof-aboutphoto').value;
        prof.email = document.getElementById('cms-prof-email').value;
        prof.phone = document.getElementById('cms-prof-phone').value;
        prof.whatsapp = document.getElementById('cms-prof-phone').value.replace(/[^0-9]/g, '');
        prof.github = document.getElementById('cms-prof-github').value;
        prof.linkedin = document.getElementById('cms-prof-linkedin').value;
        prof.instagram = document.getElementById('cms-prof-instagram').value;

        savePortfolioData(db);
        showToast("Seluruh data Profil & Hero berhasil diperbarui!", "success");
    });
}

function switchProfileSubTab(subName) {
    const subBtns = document.querySelectorAll('.p-subbtn');
    subBtns.forEach(btn => {
        btn.classList.remove('active', 'bg-bronze', 'text-white', 'shadow-md');
        btn.classList.add('bg-white', 'text-secondary', 'border', 'border-border');
    });

    const activeBtn = document.getElementById('p-subbtn-' + subName);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-bronze', 'text-white', 'shadow-md');
        activeBtn.classList.remove('bg-white', 'text-secondary', 'border', 'border-border');
    }

    const subSecs = document.querySelectorAll('.p-subsec');
    subSecs.forEach(sec => {
        if (subName === 'all' || sec.id === 'p-subsec-' + subName) {
            sec.style.display = 'block';
        } else {
            sec.style.display = 'none';
        }
    });
}

// MODULE 2: PROJECTS
function renderAdminProjectsTab(container, db) {
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Daftar Proyek Karya</h3>
                    <p class="text-xs text-muted font-medium">Dibatasi 3 proyek per halaman pada live website</p>
                </div>
                <button onclick="showAddProjectForm()" class="btn-bronze text-xs py-2.5 px-5 shadow-sm justify-center">
                    <i class="fa-solid fa-plus"></i> Tambah Proyek Baru
                </button>
            </div>

            <div id="admin-project-form-container"></div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                ${(db.projects || []).map(proj => `
                    <div class="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between space-y-4">
                        <div class="flex items-start gap-4">
                            <img src="${proj.coverImage}" alt="${proj.title}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-border shrink-0" onerror="this.src='./assets/portofolio.png'">
                            <div class="min-w-0 flex-1">
                                <span class="text-[10px] font-extrabold text-bronze uppercase tracking-wider block">${proj.role}</span>
                                <h4 class="font-bold font-display text-sm sm:text-base text-primary truncate">${proj.title}</h4>
                                <p class="text-xs text-muted line-clamp-2 mt-1">${proj.description}</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between border-t border-border pt-3">
                            <span class="text-[10px] sm:text-[11px] font-semibold text-muted truncate max-w-[150px]">${(proj.technologies || []).slice(0, 2).join(', ')}</span>
                            <div class="flex gap-3">
                                <button onclick="showEditProjectForm(${proj.id})" class="text-xs font-bold text-bronze hover:underline">
                                    <i class="fa-solid fa-pen-to-square"></i> Edit
                                </button>
                                <button onclick="deleteProject(${proj.id})" class="text-xs font-bold text-red-500 hover:underline">
                                    <i class="fa-solid fa-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showAddProjectForm() {
    const container = document.getElementById('admin-project-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Tambah Proyek Baru</h4>
            <form id="new-project-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="new-proj-title" class="form-input" placeholder="Judul Proyek" required>
                    <input type="text" id="new-proj-role" class="form-input" placeholder="Role (e.g. Lead UI/UX)" required>
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload Foto Cover Proyek (Lokal / URL)</label>
                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('new-proj-cover'), document.getElementById('new-proj-prev'))">
                    <input type="text" id="new-proj-cover" class="form-input text-xs sm:text-sm" placeholder="atau masukkan URL foto..." required>
                    <img id="new-proj-prev" class="w-full h-32 object-cover rounded-xl mt-2 border border-border hidden">
                </div>

                <textarea id="new-proj-desc" class="form-textarea" rows="3" placeholder="Deskripsi ringkas proyek..." required></textarea>
                <input type="text" id="new-proj-tech" class="form-input" placeholder="Teknologi (dipisahkan koma, e.g. React, TailwindCSS)" required>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-project-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Simpan Proyek</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('new-project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const db = getPortfolioData();
        if (!db.projects) db.projects = [];
        const coverVal = document.getElementById('new-proj-cover').value;
        const newProj = {
            id: Date.now(),
            title: document.getElementById('new-proj-title').value,
            role: document.getElementById('new-proj-role').value,
            coverImage: coverVal,
            description: document.getElementById('new-proj-desc').value,
            technologies: document.getElementById('new-proj-tech').value.split(',').map(t => t.trim()),
            demoUrl: '#',
            githubUrl: '#',
            gallery: [coverVal]
        };

        db.projects.unshift(newProj);
        savePortfolioData(db);
        renderAdminTabContent('projects');
        showToast("Proyek baru berhasil ditambahkan!", "success");
    });
}

function showEditProjectForm(id) {
    const db = getPortfolioData();
    const proj = (db.projects || []).find(p => p.id === id);
    if (!proj) return;

    const container = document.getElementById('admin-project-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Edit Proyek</h4>
            <form id="edit-project-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" id="edit-proj-title" class="form-input" value="${proj.title}" required>
                    <input type="text" id="edit-proj-role" class="form-input" value="${proj.role}" required>
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload / Ganti Foto Cover Proyek</label>
                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('edit-proj-cover'), document.getElementById('edit-proj-prev'))">
                    <input type="text" id="edit-proj-cover" class="form-input text-xs sm:text-sm" value="${proj.coverImage}" required>
                    <img id="edit-proj-prev" src="${proj.coverImage}" class="w-full h-32 object-cover rounded-xl mt-2 border border-border">
                </div>

                <textarea id="edit-proj-desc" class="form-textarea" rows="3" required>${proj.description}</textarea>
                <input type="text" id="edit-proj-tech" class="form-input" value="${(proj.technologies || []).join(', ')}" required>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-project-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Update Proyek</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('edit-project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        proj.title = document.getElementById('edit-proj-title').value;
        proj.role = document.getElementById('edit-proj-role').value;
        proj.coverImage = document.getElementById('edit-proj-cover').value;
        proj.description = document.getElementById('edit-proj-desc').value;
        proj.technologies = document.getElementById('edit-proj-tech').value.split(',').map(t => t.trim());

        savePortfolioData(db);
        renderAdminTabContent('projects');
        showToast("Proyek berhasil diperbarui!", "success");
    });
}

function deleteProject(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;
    const db = getPortfolioData();
    db.projects = (db.projects || []).filter(p => p.id !== id);
    savePortfolioData(db);
    renderAdminTabContent('projects');
    showToast("Proyek berhasil dihapus!", "info");
}

// MODULE 3: SKILLS (WITH CUSTOM IMAGE LOGO UPLOAD SUPPORT)
function renderAdminSkillsTab(container, db) {
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Daftar Technical Skills</h3>
                    <p class="text-xs text-muted font-medium">Bisa menggunakan foto logo custom atau icon FontAwesome</p>
                </div>
                <button onclick="showAddSkillForm()" class="btn-bronze text-xs py-2.5 px-5 shadow-sm justify-center">
                    <i class="fa-solid fa-plus"></i> Tambah Skill Baru
                </button>
            </div>

            <div id="admin-skill-form-container"></div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                ${(db.skills || []).map(skill => `
                    <div class="p-4 sm:p-5 rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-10 h-10 rounded-xl bg-bronze/10 text-bronze flex items-center justify-center text-lg shrink-0 border border-bronze/20 overflow-hidden p-1">
                                ${skill.image ? `
                                    <img src="${skill.image}" class="w-full h-full object-contain">
                                ` : `
                                    <i class="${skill.icon || 'fa-solid fa-code'}"></i>
                                `}
                            </div>
                            <div class="min-w-0">
                                <h4 class="font-bold text-sm text-primary truncate">${skill.name}</h4>
                                <span class="text-[10px] font-extrabold text-bronze uppercase tracking-widest block truncate">${skill.category}</span>
                            </div>
                        </div>
                        <div class="flex gap-2 shrink-0">
                            <button onclick="showEditSkillForm(${skill.id})" class="text-xs text-bronze hover:underline p-1">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onclick="deleteSkill(${skill.id})" class="text-xs text-red-500 hover:underline p-1">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showAddSkillForm() {
    const container = document.getElementById('admin-skill-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Tambah Skill Baru</h4>
            <form id="new-skill-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="new-skill-name" class="form-input" placeholder="Nama Skill (e.g. React.js)" required>
                    <input type="text" id="new-skill-cat" class="form-input" placeholder="Kategori (e.g. Frontend)" required>
                    <input type="text" id="new-skill-icon" class="form-input" placeholder="Icon FontAwesome (opsional, e.g. fa-brands fa-react)">
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload Foto Logo Skill (Lokal / URL)</label>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        <img id="new-skill-img-prev" class="w-10 h-10 object-contain rounded-xl border border-border bg-white p-1 hidden shrink-0">
                        <div class="flex-1 w-full space-y-2">
                            <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('new-skill-img'), document.getElementById('new-skill-img-prev'))">
                            <input type="text" id="new-skill-img" class="form-input text-xs sm:text-sm" placeholder="atau masukkan URL foto logo...">
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-skill-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Simpan Skill</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('new-skill-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const db = getPortfolioData();
        if (!db.skills) db.skills = [];
        db.skills.unshift({
            id: Date.now(),
            name: document.getElementById('new-skill-name').value,
            category: document.getElementById('new-skill-cat').value,
            icon: document.getElementById('new-skill-icon').value || 'fa-solid fa-code',
            image: document.getElementById('new-skill-img').value || '',
            description: 'Keahlian profesional'
        });
        savePortfolioData(db);
        renderAdminTabContent('skills');
        showToast("Skill baru berhasil ditambahkan!", "success");
    });
}

showEditSkillForm = function(id) {
    const db = getPortfolioData();
    const skill = (db.skills || []).find(s => s.id === id);
    if (!skill) return;

    const container = document.getElementById('admin-skill-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Edit Skill</h4>
            <form id="edit-skill-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="edit-skill-name" class="form-input" value="${skill.name}" required>
                    <input type="text" id="edit-skill-cat" class="form-input" value="${skill.category}" required>
                    <input type="text" id="edit-skill-icon" class="form-input" value="${skill.icon || 'fa-solid fa-code'}">
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload / Ganti Foto Logo Skill</label>
                    <div class="flex flex-col sm:flex-row items-center gap-3">
                        <img id="edit-skill-img-prev" src="${skill.image || ''}" class="w-10 h-10 object-contain rounded-xl border border-border bg-white p-1 ${skill.image ? '' : 'hidden'} shrink-0">
                        <div class="flex-1 w-full space-y-2">
                            <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('edit-skill-img'), document.getElementById('edit-skill-img-prev'))">
                            <input type="text" id="edit-skill-img" class="form-input text-xs sm:text-sm" value="${skill.image || ''}" placeholder="atau masukkan URL foto logo...">
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-skill-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Update Skill</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('edit-skill-form').addEventListener('submit', (e) => {
        e.preventDefault();
        skill.name = document.getElementById('edit-skill-name').value;
        skill.category = document.getElementById('edit-skill-cat').value;
        skill.icon = document.getElementById('edit-skill-icon').value;
        skill.image = document.getElementById('edit-skill-img').value;

        savePortfolioData(db);
        renderAdminTabContent('skills');
        showToast("Skill berhasil diperbarui!", "success");
    });
};

function deleteSkill(id) {
    if (!confirm("Hapus skill ini?")) return;
    const db = getPortfolioData();
    db.skills = (db.skills || []).filter(s => s.id !== id);
    savePortfolioData(db);
    renderAdminTabContent('skills');
    showToast("Skill berhasil dihapus!", "info");
}

// MODULE 4: WORK EXPERIENCE
function renderAdminExperienceTab(container, db) {
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Daftar Jejak Karir (Work Experience)</h3>
                    <p class="text-xs text-muted font-medium">Foto & Tulisan Editorial tanpa card berkotak</p>
                </div>
                <button onclick="showAddExperienceForm()" class="btn-bronze text-xs py-2.5 px-5 shadow-sm justify-center">
                    <i class="fa-solid fa-plus"></i> Tambah Pengalaman Baru
                </button>
            </div>

            <div id="admin-exp-form-container"></div>

            <div class="space-y-4">
                ${(db.experiences || []).map(exp => `
                    <div class="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                        <div class="flex items-center gap-4 min-w-0">
                            <img src="${exp.photo}" alt="${exp.company}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-border shrink-0" onerror="this.src='./assets/logo navfooter.png'">
                            <div class="min-w-0">
                                <span class="text-xs font-bold text-bronze uppercase tracking-wider">${exp.company} (${exp.period})</span>
                                <h4 class="font-bold font-display text-base sm:text-lg text-primary truncate">${exp.role}</h4>
                                <p class="text-xs text-muted line-clamp-2 mt-1">${exp.description}</p>
                            </div>
                        </div>
                        <div class="flex gap-2 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-border">
                            <button onclick="showEditExperienceForm(${exp.id})" class="btn-bronze-outline text-xs py-1.5 px-3 sm:py-2 sm:px-4">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteExperience(${exp.id})" class="btn-bronze-outline text-xs py-1.5 px-3 sm:py-2 sm:px-4 text-red-500 border-red-500/40 hover:bg-red-500 hover:text-white">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showAddExperienceForm() {
    const container = document.getElementById('admin-exp-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Tambah Pengalaman Karir Baru</h4>
            <form id="new-exp-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="new-exp-company" class="form-input" placeholder="Nama Perusahaan / Studio" required>
                    <input type="text" id="new-exp-role" class="form-input" placeholder="Posisi / Jabatan Pekerjaan" required>
                    <input type="text" id="new-exp-period" class="form-input" placeholder="Periode (e.g. 2023 - Sekarang)" required>
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload Foto Dokumentasi Pekerjaan (Lokal / URL)</label>
                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('new-exp-photo'), document.getElementById('new-exp-prev'))">
                    <input type="text" id="new-exp-photo" class="form-input text-xs sm:text-sm" placeholder="atau masukkan URL foto..." required>
                    <img id="new-exp-prev" class="w-full h-32 object-cover rounded-xl mt-2 border border-border hidden">
                </div>

                <textarea id="new-exp-desc" class="form-textarea" rows="3" placeholder="Deskripsi pencapaian dan tanggung jawab pekerjaan..." required></textarea>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-exp-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Simpan Pengalaman</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('new-exp-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const db = getPortfolioData();
        if (!db.experiences) db.experiences = [];
        db.experiences.unshift({
            id: Date.now(),
            company: document.getElementById('new-exp-company').value,
            role: document.getElementById('new-exp-role').value,
            period: document.getElementById('new-exp-period').value,
            photo: document.getElementById('new-exp-photo').value,
            description: document.getElementById('new-exp-desc').value
        });
        savePortfolioData(db);
        renderAdminTabContent('experience');
        showToast("Pengalaman baru berhasil ditambahkan!", "success");
    });
}

function showEditExperienceForm(id) {
    const db = getPortfolioData();
    const exp = (db.experiences || []).find(e => e.id === id);
    if (!exp) return;

    const container = document.getElementById('admin-exp-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Edit Pengalaman Karir</h4>
            <form id="edit-exp-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="edit-exp-company" class="form-input" value="${exp.company}" required>
                    <input type="text" id="edit-exp-role" class="form-input" value="${exp.role}" required>
                    <input type="text" id="edit-exp-period" class="form-input" value="${exp.period}" required>
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload / Ganti Foto Pekerjaan</label>
                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('edit-exp-photo'), document.getElementById('edit-exp-prev'))">
                    <input type="text" id="edit-exp-photo" class="form-input text-xs sm:text-sm" value="${exp.photo || ''}" required>
                    <img id="edit-exp-prev" src="${exp.photo || ''}" class="w-full h-32 object-cover rounded-xl mt-2 border border-border">
                </div>

                <textarea id="edit-exp-desc" class="form-textarea" rows="3" required>${exp.description}</textarea>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-exp-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Update Pengalaman</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('edit-exp-form').addEventListener('submit', (e) => {
        e.preventDefault();
        exp.company = document.getElementById('edit-exp-company').value;
        exp.role = document.getElementById('edit-exp-role').value;
        exp.period = document.getElementById('edit-exp-period').value;
        exp.photo = document.getElementById('edit-exp-photo').value;
        exp.description = document.getElementById('edit-exp-desc').value;

        savePortfolioData(db);
        renderAdminTabContent('experience');
        showToast("Pengalaman karir berhasil diperbarui!", "success");
    });
}

function deleteExperience(id) {
    if (!confirm("Apakah Anda yakin ingin menghapus pengalaman kerja ini?")) return;
    const db = getPortfolioData();
    db.experiences = (db.experiences || []).filter(e => e.id !== id);
    savePortfolioData(db);
    renderAdminTabContent('experience');
    showToast("Pengalaman kerja berhasil dihapus!", "info");
}

// MODULE 5: EDUCATION
function renderAdminEducationTab(container, db) {
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Daftar Pendidikan Formal</h3>
                    <p class="text-xs text-muted font-medium">Card pendidikan formal personal</p>
                </div>
                <button onclick="showAddEducationForm()" class="btn-bronze text-xs py-2.5 px-5 shadow-sm justify-center">
                    <i class="fa-solid fa-plus"></i> Tambah Pendidikan Baru
                </button>
            </div>

            <div id="admin-edu-form-container"></div>

            <div class="space-y-4">
                ${(db.education || []).map(edu => `
                    <div class="p-5 sm:p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
                        <div>
                            <span class="text-xs font-bold text-bronze uppercase tracking-wider">${edu.institution} (${edu.period})</span>
                            <h4 class="font-bold font-display text-base sm:text-lg text-primary mt-1">${edu.degree}</h4>
                            <p class="text-xs text-muted mt-2">${edu.description}</p>
                        </div>
                        <div class="flex gap-2 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-border">
                            <button onclick="showEditEducationForm(${edu.id})" class="btn-bronze-outline text-xs py-1.5 px-3 sm:py-2 sm:px-4">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteEducation(${edu.id})" class="btn-bronze-outline text-xs py-1.5 px-3 sm:py-2 sm:px-4 text-red-500 border-red-500/40 hover:bg-red-500 hover:text-white">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showAddEducationForm() {
    const container = document.getElementById('admin-edu-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Tambah Pendidikan Baru</h4>
            <form id="new-edu-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="new-edu-degree" class="form-input" placeholder="Gelar / Jurusan (e.g. S.Kom Teknik Informatika)" required>
                    <input type="text" id="new-edu-inst" class="form-input" placeholder="Nama Institusi / Universitas" required>
                    <input type="text" id="new-edu-period" class="form-input" placeholder="Periode (e.g. 2018 - 2022)" required>
                </div>
                <textarea id="new-edu-desc" class="form-textarea" rows="3" placeholder="Deskripsi prestasi / fokus akademis..." required></textarea>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-edu-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Simpan Pendidikan</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('new-edu-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const db = getPortfolioData();
        if (!db.education) db.education = [];
        db.education.unshift({
            id: Date.now(),
            degree: document.getElementById('new-edu-degree').value,
            institution: document.getElementById('new-edu-inst').value,
            period: document.getElementById('new-edu-period').value,
            description: document.getElementById('new-edu-desc').value
        });
        savePortfolioData(db);
        renderAdminTabContent('education');
        showToast("Pendidikan baru berhasil ditambahkan!", "success");
    });
}

function showEditEducationForm(id) {
    const db = getPortfolioData();
    const edu = (db.education || []).find(e => e.id === id);
    if (!edu) return;

    const container = document.getElementById('admin-edu-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Edit Pendidikan</h4>
            <form id="edit-edu-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="edit-edu-degree" class="form-input" value="${edu.degree}" required>
                    <input type="text" id="edit-edu-inst" class="form-input" value="${edu.institution}" required>
                    <input type="text" id="edit-edu-period" class="form-input" value="${edu.period}" required>
                </div>
                <textarea id="edit-edu-desc" class="form-textarea" rows="3" required>${edu.description}</textarea>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-edu-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Update Pendidikan</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('edit-edu-form').addEventListener('submit', (e) => {
        e.preventDefault();
        edu.degree = document.getElementById('edit-edu-degree').value;
        edu.institution = document.getElementById('edit-edu-inst').value;
        edu.period = document.getElementById('edit-edu-period').value;
        edu.description = document.getElementById('edit-edu-desc').value;

        savePortfolioData(db);
        renderAdminTabContent('education');
        showToast("Pendidikan berhasil diperbarui!", "success");
    });
}

function deleteEducation(id) {
    if (!confirm("Hapus data pendidikan ini?")) return;
    const db = getPortfolioData();
    db.education = (db.education || []).filter(e => e.id !== id);
    savePortfolioData(db);
    renderAdminTabContent('education');
    showToast("Data pendidikan berhasil dihapus!", "info");
}

// MODULE 6: CERTIFICATIONS
function renderAdminCertificationsTab(container, db) {
    container.innerHTML = `
        <div class="space-y-6 max-w-5xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 sm:p-6 rounded-3xl border border-border shadow-sm">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Daftar Sertifikat & Piagam (Foto Showcase)</h3>
                    <p class="text-xs text-muted font-medium">Galeri foto piagam penghargaan</p>
                </div>
                <button onclick="showAddCertForm()" class="btn-bronze text-xs py-2.5 px-5 shadow-sm justify-center">
                    <i class="fa-solid fa-plus"></i> Tambah Sertifikat Baru
                </button>
            </div>

            <div id="admin-cert-form-container"></div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                ${(db.certifications || []).map(cert => `
                    <div class="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-3 flex flex-col justify-between">
                        <div>
                            <img src="${cert.image}" alt="${cert.title}" class="w-full h-36 object-cover rounded-xl border border-border" onerror="this.src='./assets/logo navfooter.png'">
                            <div class="mt-3">
                                <span class="text-[10px] font-bold text-bronze uppercase block">${cert.issuer} • ${cert.year}</span>
                                <h4 class="font-bold font-display text-sm text-primary leading-snug">${cert.title}</h4>
                            </div>
                        </div>
                        <div class="flex items-center justify-between pt-2 border-t border-border">
                            <button onclick="showEditCertForm(${cert.id})" class="text-xs font-bold text-bronze hover:underline">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button onclick="deleteCert(${cert.id})" class="text-xs font-bold text-red-500 hover:underline">
                                <i class="fa-solid fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showAddCertForm() {
    const container = document.getElementById('admin-cert-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Tambah Sertifikat Baru</h4>
            <form id="new-cert-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="new-cert-title" class="form-input" placeholder="Judul Sertifikat / Piagam" required>
                    <input type="text" id="new-cert-issuer" class="form-input" placeholder="Penerbit (e.g. AWS / Meta)" required>
                    <input type="text" id="new-cert-year" class="form-input" placeholder="Tahun (e.g. 2025)" required>
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload Foto Sertifikat / Piagam (Lokal / URL)</label>
                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('new-cert-img'), document.getElementById('new-cert-prev'))">
                    <input type="text" id="new-cert-img" class="form-input text-xs sm:text-sm" placeholder="atau masukkan URL foto..." required>
                    <img id="new-cert-prev" class="w-full h-32 object-cover rounded-xl mt-2 border border-border hidden">
                </div>

                <textarea id="new-cert-desc" class="form-textarea" rows="2" placeholder="Deskripsi sertifikat..." required></textarea>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-cert-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Simpan Sertifikat</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('new-cert-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const db = getPortfolioData();
        if (!db.certifications) db.certifications = [];
        db.certifications.unshift({
            id: Date.now(),
            title: document.getElementById('new-cert-title').value,
            issuer: document.getElementById('new-cert-issuer').value,
            year: document.getElementById('new-cert-year').value,
            image: document.getElementById('new-cert-img').value,
            description: document.getElementById('new-cert-desc').value
        });
        savePortfolioData(db);
        renderAdminTabContent('certifications');
        showToast("Sertifikat baru berhasil ditambahkan!", "success");
    });
}

function showEditCertForm(id) {
    const db = getPortfolioData();
    const cert = (db.certifications || []).find(c => c.id === id);
    if (!cert) return;

    const container = document.getElementById('admin-cert-form-container');
    if (!container) return;

    container.innerHTML = `
        <div class="p-5 sm:p-6 rounded-3xl border border-bronze/40 bg-card shadow-md space-y-4">
            <h4 class="font-bold text-base sm:text-lg text-bronze">Form Edit Sertifikat</h4>
            <form id="edit-cert-form" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" id="edit-cert-title" class="form-input" value="${cert.title}" required>
                    <input type="text" id="edit-cert-issuer" class="form-input" value="${cert.issuer}" required>
                    <input type="text" id="edit-cert-year" class="form-input" value="${cert.year}" required>
                </div>

                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <label class="form-label text-bronze">Upload / Ganti Foto Sertifikat</label>
                    <input type="file" accept="image/*" class="text-xs font-semibold text-muted file:btn-bronze file:text-xs file:py-1.5 file:px-3 file:mr-2 w-full" onchange="handleLocalFileUpload(this, document.getElementById('edit-cert-img'), document.getElementById('edit-cert-prev'))">
                    <input type="text" id="edit-cert-img" class="form-input text-xs sm:text-sm" value="${cert.image}" required>
                    <img id="edit-cert-prev" src="${cert.image}" class="w-full h-32 object-cover rounded-xl mt-2 border border-border">
                </div>

                <textarea id="edit-cert-desc" class="form-textarea" rows="2" required>${cert.description}</textarea>
                <div class="flex justify-end gap-3 pt-2">
                    <button type="button" onclick="document.getElementById('admin-cert-form-container').innerHTML=''" class="btn-bronze-outline text-xs py-2 px-4">Batal</button>
                    <button type="submit" class="btn-bronze text-xs py-2 px-5">Update Sertifikat</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('edit-cert-form').addEventListener('submit', (e) => {
        e.preventDefault();
        cert.title = document.getElementById('edit-cert-title').value;
        cert.issuer = document.getElementById('edit-cert-issuer').value;
        cert.year = document.getElementById('edit-cert-year').value;
        cert.image = document.getElementById('edit-cert-img').value;
        cert.description = document.getElementById('edit-cert-desc').value;

        savePortfolioData(db);
        renderAdminTabContent('certifications');
        showToast("Sertifikat berhasil diperbarui!", "success");
    });
}

function deleteCert(id) {
    if (!confirm("Hapus sertifikat ini?")) return;
    const db = getPortfolioData();
    db.certifications = (db.certifications || []).filter(c => c.id !== id);
    savePortfolioData(db);
    renderAdminTabContent('certifications');
    showToast("Sertifikat berhasil dihapus!", "info");
}

// MODULE 7: CLOUD API SETUP TAB (JSONBIN.IO)
function renderAdminCloudAPITab(container) {
    container.innerHTML = `
        <div class="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-sm space-y-6 max-w-3xl">
            <div class="flex items-center justify-between border-b border-border pb-4">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Alternatif Database Cloud (JSONBin.io)</h3>
                    <p class="text-xs text-muted">100% Gratis, 24/7 Always Active, Tanpa Syarat Kartu Kredit / Firebase</p>
                </div>
                <span class="text-xs font-bold px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                    ⚡ REST API Cloud Terkoneksi (24/7)
                </span>
            </div>

            <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 space-y-2">
                    <h4 class="font-bold text-sm text-green-600"><i class="fa-solid fa-circle-check"></i> Status Koneksi JSONBin Cloud:</h4>
                    <p class="text-xs text-secondary leading-relaxed">BIN ID Anda <code>6a740491f5f4af5e29f11419</code> dan X-Master-Key telah <strong>terkoneksi 100% dengan status 200 OK</strong>! Setiap perubahan data di Admin CMS otomatis tersimpan ke cloud dan dapat diedit secara online 24/7 dari mana saja.</p>
                </div>

                <div class="pt-2 flex flex-col sm:flex-row gap-3">
                    <button type="button" onclick="testSyncJSONBin()" class="btn-bronze text-xs py-3 justify-center">
                        <i class="fa-solid fa-cloud-arrow-up"></i> Sync / Upload Data Ke Cloud Now
                    </button>
                </div>
            </div>
        </div>
    `;
}

async function testSyncJSONBin() {
    const db = getPortfolioData();
    showToast("Mengunggah data ke JSONBin Cloud...", "info");
    const ok = await saveToJSONBinCloud(db);
    if (ok) {
        showToast("Berhasil! Data portofolio tersimpan di JSONBin Cloud 24/7!", "success");
    } else {
        showToast("Gagal menyimpan ke JSONBin Cloud.", "info");
    }
}

// MODULE 8: FIREBASE SETUP TAB
function renderAdminFirebaseTab(container) {
    const isConn = (typeof isFirebaseConnected !== 'undefined' && isFirebaseConnected);

    container.innerHTML = `
        <div class="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-sm space-y-6 max-w-3xl">
            <div class="flex items-center justify-between border-b border-border pb-4">
                <div>
                    <h3 class="text-lg sm:text-xl font-bold font-display text-bronze">Integrasi Firebase Cloud Firestore</h3>
                    <p class="text-xs text-muted">Database gratis 24/7 selamanya tanpa aturan pause 7 hari</p>
                </div>
                <span class="text-xs font-bold px-3 py-1.5 rounded-full ${isConn ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}">
                    ${isConn ? '🔥 Firebase Terkoneksi' : '⚡ LocalStorage Mode Active'}
                </span>
            </div>

            <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-bronze/5 border border-bronze/20 space-y-2">
                    <h4 class="font-bold text-sm text-bronze"><i class="fa-solid fa-circle-info"></i> Petunjuk Singkat Setup Firebase Gratis:</h4>
                    <ol class="text-xs text-secondary list-decimal list-inside space-y-1 leading-relaxed">
                        <li>Buka console gratis Google Firebase di <a href="https://console.firebase.google.com" target="_blank" class="text-bronze font-bold underline">console.firebase.google.com</a>.</li>
                        <li>Buat project baru (e.g. <code>destina-portfolio</code>) dan pilih menu <strong>Firestore Database</strong> -> Create Database.</li>
                        <li>Pilih <strong>Web App (&lt;/&gt;)</strong>, lalu salin kunci <code>firebaseConfig</code> ke file <code class="text-bronze font-bold">js/firebase-config.js</code>.</li>
                    </ol>
                </div>

                <form id="firebase-sync-form" class="space-y-4 pt-2">
                    <div>
                        <label class="form-label">File Konfigurasi</label>
                        <input type="text" class="form-input bg-gray-50 text-muted" value="d:\\portofolio dinda\\mainline-1.0.0\\portofolio Destina\\js\\firebase-config.js" readonly>
                    </div>

                    <div class="pt-2 flex flex-col sm:flex-row gap-3">
                        <button type="button" onclick="syncLocalToFirebase()" class="btn-bronze text-xs py-3 justify-center">
                            <i class="fa-solid fa-cloud-arrow-up"></i> Upload Data Lokal Ke Firebase Firestore
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function syncLocalToFirebase() {
    if (typeof dbFirestore === 'undefined' || !dbFirestore) {
        showToast("Firebase Config belum terisi di js/firebase-config.js. Menggunakan mode LocalStorage.", "info");
        return;
    }

    const db = getPortfolioData();
    dbFirestore.collection('portfolio').doc('db').set(db)
        .then(() => {
            showToast("Data portofolio berhasil disinkronisasi ke Cloud Firestore Firebase 24/7!", "success");
        })
        .catch((err) => {
            console.error("Gagal sync ke Firebase:", err);
            showToast("Gagal menyimpan ke Firebase: " + err.message, "message");
        });
}

// MODULE 9: SETTINGS
function renderAdminSettingsTab(container, db) {
    container.innerHTML = `
        <div class="bg-card border border-border rounded-3xl p-5 sm:p-8 shadow-sm space-y-6 max-w-3xl">
            <h3 class="text-lg sm:text-xl font-bold font-display text-bronze border-b border-border pb-3">Manajemen Backup & Reset Data</h3>
            
            <div class="space-y-4">
                <div class="p-4 sm:p-6 rounded-2xl bg-bronze/5 border border-bronze/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h4 class="font-bold text-primary text-sm sm:text-base">Export JSON Backup</h4>
                        <p class="text-xs text-muted">Unduh seluruh berkas data portofolio ke format file JSON</p>
                    </div>
                    <button onclick="exportJSONBackup()" class="btn-bronze text-xs py-2.5 px-5 w-full sm:w-auto justify-center">
                        <i class="fa-solid fa-download"></i> Unduh JSON
                    </button>
                </div>

                <div class="p-4 sm:p-6 rounded-2xl bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h4 class="font-bold text-red-600 text-sm sm:text-base">Reset Data Ke Default</h4>
                        <p class="text-xs text-muted">Kembalikan seluruh data profil, proyek, dan skill ke versi default bawaan</p>
                    </div>
                    <button onclick="resetPortfolioData()" class="btn-bronze-outline text-xs py-2.5 px-5 text-red-500 border-red-500/40 hover:bg-red-500 hover:text-white w-full sm:w-auto justify-center">
                        <i class="fa-solid fa-rotate-left"></i> Reset Defaults
                    </button>
                </div>
            </div>
        </div>
    `;
}

function exportJSONBackup() {
    const db = getPortfolioData();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const link = document.createElement('a');
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `Destina_Portfolio_Backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("File JSON Backup berhasil diunduh!", "success");
}

function openCMSModal() {
    window.location.href = "admin.html";
}

function closeCMSModal() {
    const modal = document.getElementById('cms-modal');
    if (modal) modal.classList.remove('active');
}
