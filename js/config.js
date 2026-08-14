/* ========================================
   CONFIGURATION & CONSTANTS
   API Endpoints, Constants, Feature Flags
   ======================================== */

const CONFIG = {
  /* Environment */
  ENV: 'production', // 'development' or 'production'
  DEBUG: false,
  
  /* Business Information */
  BUSINESS: {
    name: 'Nanda Financial Services',
    shortName: 'Nanda Investment',
    arn: '332725',
    phone: '+91-9491227272',
    whatsapp: '919491227272', // Without +
    email: 'contact@mutualfundreview.in', // Placeholder - update when available
    address: {
      street: 'SNC-206, Road No 7, Santhoshimaa Colony',
      city: 'Secunderabad',
      state: 'Telangana',
      postal: '500056',
      country: 'India'
    },
    social: {
      linkedin: 'https://www.linkedin.com/company/108153426/',
      facebook: 'https://www.facebook.com/profile.php?id=61578995745379',
      instagram: 'https://www.instagram.com/nkc_wealth/',
      twitter: 'https://x.com/Nk_Wealthserv',
      youtube: '' // Add when available
    }
  },
  
  /* API Endpoints - Future Backend Integration */
  API: {
    BASE_URL: '',  // Set to backend URL in production
    ENDPOINTS: {
      LEADS: '/api/leads',
      PORTFOLIO_UPLOAD: '/api/portfolio/upload',
      PORTFOLIO_ANALYZE: '/api/portfolio/analyze',
      PORTFOLIO_GET: '/api/portfolio/:id',
      CONTACT: '/api/contact',
      CHAT: '/api/chat',
      NEWSLETTER: '/api/newsletter'
    },
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3
  },
  
  /* Feature Flags */
  FEATURES: {
    DARK_MODE: true,
    PORTFOLIO_UPLOAD: false, // Enable when backend ready
    AI_CHAT: false,          // Enable when AI backend ready
    NEWSLETTER: false,       // Enable when email service ready
    ANALYTICS: true,
    WHATSAPP_INTEGRATION: true
  },
  
  /* Analytics */
  ANALYTICS: {
    GOOGLE_TAG_MANAGER: 'GTM-KWLKH6NM',
    TRACK_EVENTS: true,
    TRACK_PAGE_VIEWS: true,
    TRACK_CONVERSIONS: true
  },
  
  /* WhatsApp Messages - Context-Aware */
  WHATSAPP_MESSAGES: {
    DEFAULT: 'Hi, I would like to get my mutual fund portfolio reviewed.',
    PORTFOLIO_REVIEW: 'Hi, I want help understanding my mutual fund portfolio.',
    SIP: 'Hi, I would like to review my SIP investments.',
    INSURANCE: 'Hi, I want to discuss my insurance requirements.',
    LOAN: 'Hi, I want to understand my loan options.',
    CONSULTATION: 'Hi, I want to book a consultation.',
    GENERAL: 'Hi, I have a question about mutual funds.'
  },
  
  /* Form Validation Rules */
  VALIDATION: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[6-9]\d{9}$/, // India phone (10 digits starting with 6-9)
    PORTFOLIO_VALUE_MIN: 0,
    PORTFOLIO_VALUE_MAX: 100000000 // 10 Crore
  },
  
  /* Storage Keys */
  STORAGE: {
    LEAD_DATA: 'nanda_lead_data',
    USER_PREFERENCES: 'nanda_user_prefs',
    PORTFOLIO_DRAFT: 'nanda_portfolio_draft',
    THEME_PREFERENCE: 'nanda_theme',
    LAST_VISITED: 'nanda_last_visited',
    CONSENT: 'nanda_consent'
  },
  
  /* Cookie Settings */
  COOKIES: {
    EXPIRY_DAYS: 365,
    DOMAIN: '.mutualfundreview.in',
    SECURE: true,
    SAME_SITE: 'Lax'
  },
  
  /* Timeouts */
  TIMEOUTS: {
    DEBOUNCE: 300,
    THROTTLE: 500,
    TRANSITION: 300,
    NOTIFICATION_DISPLAY: 5000 // 5 seconds
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
