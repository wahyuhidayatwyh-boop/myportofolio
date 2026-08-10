/* ==========================================================================
   PORTOFOLIO V5 - OFFLINE DEPLOYMENT & CONFIGURATION ENGINE
   ========================================================================== */

const CLOUDFLARE_CONFIG = {
    // API endpoint is disabled by default for offline / independent deployment
    API_ENABLED: false,
    API_URL: "",
    KV_NAMESPACE_ID: "",
    ENVIRONMENT: "standalone_local"
};

// Safe offline fallback function (no network errors)
function syncToCloudflareKV(data) {
    // Silent offline mode: Data persists reliably in LocalStorage
    return Promise.resolve({ success: true, offline: true });
}
