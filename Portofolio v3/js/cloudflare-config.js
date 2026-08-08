/* ==========================================================================
   CLOUDFLARE WORKERS & KV STORAGE CONFIGURATION
   ========================================================================== */

// Tempelkan URL Cloudflare Worker Anda di bawah ini setelah membuat Worker di Cloudflare Dashboard
// Contoh: "https://portfolio-api.nama-subdomain.workers.dev"
const CLOUDFLARE_WORKER_URL = "https://jova-portfolio-api.hellomyportofolio.workers.dev"; 

/**
 * Mengambil data portofolio terbaru dari Cloudflare KV Database
 */
async function fetchCloudflarePortfolioData() {
    if (!CLOUDFLARE_WORKER_URL || CLOUDFLARE_WORKER_URL.trim() === "") {
        return null;
    }
    try {
        const response = await fetch(CLOUDFLARE_WORKER_URL, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) return null;
        const cloudData = await response.json();
        if (cloudData && (cloudData.profile || cloudData.skills)) {
            // Update LocalStorage dengan data terbaru dari Cloudflare
            localStorage.setItem('destina_portfolio_db', JSON.stringify(cloudData));
            updateStorageBadgeUI("Cloudflare KV Active");
            return cloudData;
        }
    } catch (err) {
        console.warn("Gagal terhubung ke Cloudflare KV, beralih ke LocalStorage:", err);
    }
    return null;
}

/**
 * Menyimpan data portofolio dari Admin CMS secara real-time ke Cloudflare KV Database
 */
async function syncToCloudflareKV(data) {
    if (!CLOUDFLARE_WORKER_URL || CLOUDFLARE_WORKER_URL.trim() === "") {
        return false;
    }
    try {
        updateStorageBadgeUI("Syncing to Cloudflare...", true);
        const response = await fetch(CLOUDFLARE_WORKER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            updateStorageBadgeUI("Cloudflare Sync Complete");
            if (typeof showToast === 'function') {
                showToast("Data tersimpan & tersinkron ke Cloudflare Database!", "success");
            }
            return true;
        }
    } catch (err) {
        console.error("Gagal menyimpan ke Cloudflare KV:", err);
        updateStorageBadgeUI("Cloudflare Sync Error");
    }
    return false;
}

/**
 * Helper untuk memperbarui badge status penyimpanan di Admin Dashboard
 */
function updateStorageBadgeUI(text, isSyncing = false) {
    const badge = document.getElementById('storage-status-badge');
    if (!badge) return;
    
    if (isSyncing) {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span> ${text}`;
        badge.className = "text-[11px] sm:text-xs font-bold text-amber-600 bg-amber-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-amber-500/20 flex items-center gap-1.5";
    } else if (CLOUDFLARE_WORKER_URL && CLOUDFLARE_WORKER_URL.trim() !== "") {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ${text}`;
        badge.className = "text-[11px] sm:text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5";
    } else {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> LocalStorage Mode`;
        badge.className = "text-[11px] sm:text-xs font-bold text-blue-600 bg-blue-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-blue-500/20 flex items-center gap-1.5";
    }
}
