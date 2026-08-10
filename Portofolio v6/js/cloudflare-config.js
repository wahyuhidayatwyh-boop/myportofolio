/* ==========================================================================
   PORTOFOLIO V6 - DEPLOYMENT & CONFIGURATION ENGINE
   ========================================================================== */

const CLOUDFLARE_CONFIG = {
    API_ENABLED: false,
    API_URL: "",
    KV_NAMESPACE_ID: "",
    ENVIRONMENT: "standalone_local"
};

function syncToCloudflareKV(data) {
    return Promise.resolve({ success: true, offline: true });
}
