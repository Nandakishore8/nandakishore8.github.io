/* ========================================
   UTILITIES - Helper Functions
   Validators, Formatters, DOM Helpers
   ======================================== */

const UTILS = {
  /* ========== VALIDATION ========== */
  
  /**
   * Validate email format
   * @param {string} email
   * @returns {boolean}
   */
  isValidEmail: (email) => {
    return CONFIG.VALIDATION.EMAIL_REGEX.test(email);
  },
  
  /**
   * Validate Indian phone number
   * @param {string} phone - Phone number (10 digits)
   * @returns {boolean}
   */
  isValidPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    return CONFIG.VALIDATION.PHONE_REGEX.test(cleaned);
  },
  
  /**
   * Validate name length
   * @param {string} name
   * @returns {boolean}
   */
  isValidName: (name) => {
    const trimmed = name.trim();
    return trimmed.length >= CONFIG.VALIDATION.MIN_NAME_LENGTH &&
           trimmed.length <= CONFIG.VALIDATION.MAX_NAME_LENGTH;
  },
  
  /**
   * Validate portfolio value
   * @param {number} value
   * @returns {boolean}
   */
  isValidPortfolioValue: (value) => {
    return value >= CONFIG.VALIDATION.PORTFOLIO_VALUE_MIN &&
           value <= CONFIG.VALIDATION.PORTFOLIO_VALUE_MAX;
  },
  
  /* ========== FORMATTING ========== */
  
  /**
   * Format currency in Indian Rupees
   * @param {number} amount
   * @returns {string} Formatted currency (₹1,23,456)
   */
  formatCurrency: (amount) => {
    if (isNaN(amount)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  },
  
  /**
   * Format number with Indian number system
   * @param {number} num
   * @returns {string} Formatted number (1,23,456)
   */
  formatNumber: (num) => {
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-IN').format(num);
  },
  
  /**
   * Format date to readable format
   * @param {Date|string} date
   * @returns {string} Formatted date (14 Aug 2026)
   */
  formatDate: (date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  },
  
  /**
   * Truncate text with ellipsis
   * @param {string} text
   * @param {number} maxLength
   * @returns {string}
   */
  truncate: (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  /**
   * Convert text to slug
   * @param {string} text
   * @returns {string} URL-friendly slug
   */
  toSlug: (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },
  
  /* ========== DOM MANIPULATION ========== */
  
  /**
   * Get element by ID
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  $(id) {
    return document.getElementById(id);
  },
  
  /**
   * Query selector
   * @param {string} selector
   * @returns {HTMLElement|null}
   */
  query: (selector) => {
    return document.querySelector(selector);
  },
  
  /**
   * Query all matching elements
   * @param {string} selector
   * @returns {NodeList}
   */
  queryAll: (selector) => {
    return document.querySelectorAll(selector);
  },
  
  /**
   * Add class to element
   * @param {HTMLElement} el
   * @param {string} className
   */
  addClass: (el, className) => {
    if (el) el.classList.add(className);
  },
  
  /**
   * Remove class from element
   * @param {HTMLElement} el
   * @param {string} className
   */
  removeClass: (el, className) => {
    if (el) el.classList.remove(className);
  },
  
  /**
   * Toggle class on element
   * @param {HTMLElement} el
   * @param {string} className
   */
  toggleClass: (el, className) => {
    if (el) el.classList.toggle(className);
  },
  
  /**
   * Check if element has class
   * @param {HTMLElement} el
   * @param {string} className
   * @returns {boolean}
   */
  hasClass: (el, className) => {
    return el && el.classList.contains(className);
  },
  
  /**
   * Set element content (text/HTML)
   * @param {HTMLElement} el
   * @param {string} content
   * @param {boolean} isHTML - If true, use innerHTML; else textContent
   */
  setContent: (el, content, isHTML = false) => {
    if (el) {
      if (isHTML) {
        el.innerHTML = content;
      } else {
        el.textContent = content;
      }
    }
  },
  
  /**
   * Show element
   * @param {HTMLElement} el
   */
  show: (el) => {
    if (el) el.style.display = '';
  },
  
  /**
   * Hide element
   * @param {HTMLElement} el
   */
  hide: (el) => {
    if (el) el.style.display = 'none';
  },
  
  /**
   * Toggle element visibility
   * @param {HTMLElement} el
   */
  toggle: (el) => {
    if (el) {
      if (el.style.display === 'none') {
        UTILS.show(el);
      } else {
        UTILS.hide(el);
      }
    }
  },
  
  /* ========== EVENTS ========== */
  
  /**
   * Debounce function execution
   * @param {function} fn - Function to debounce
   * @param {number} delay - Delay in ms
   * @returns {function}
   */
  debounce: (fn, delay = CONFIG.TIMEOUTS.DEBOUNCE) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },
  
  /**
   * Throttle function execution
   * @param {function} fn - Function to throttle
   * @param {number} delay - Delay in ms
   * @returns {function}
   */
  throttle: (fn, delay = CONFIG.TIMEOUTS.THROTTLE) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        fn(...args);
      }
    };
  },
  
  /* ========== STORAGE ========== */
  
  /**
   * Save data to localStorage
   * @param {string} key
   * @param {*} value
   */
  saveToStorage: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (CONFIG.DEBUG) console.warn('LocalStorage write failed:', e);
    }
  },
  
  /**
   * Get data from localStorage
   * @param {string} key
   * @returns {*}
   */
  getFromStorage: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      if (CONFIG.DEBUG) console.warn('LocalStorage read failed:', e);
      return null;
    }
  },
  
  /**
   * Remove item from localStorage
   * @param {string} key
   */
  removeFromStorage: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      if (CONFIG.DEBUG) console.warn('LocalStorage remove failed:', e);
    }
  },
  
  /* ========== LOGGING ========== */
  
  /**
   * Log message in debug mode
   * @param {string} message
   * @param {*} data
   */
  log: (message, data = null) => {
    if (CONFIG.DEBUG) {
      if (data) {
        console.log(`[Nanda] ${message}`, data);
      } else {
        console.log(`[Nanda] ${message}`);
      }
    }
  },
  
  /**
   * Log warning
   * @param {string} message
   * @param {*} data
   */
  warn: (message, data = null) => {
    if (CONFIG.DEBUG) {
      if (data) {
        console.warn(`[Nanda] ${message}`, data);
      } else {
        console.warn(`[Nanda] ${message}`);
      }
    }
  },
  
  /**
   * Log error
   * @param {string} message
   * @param {*} data
   */
  error: (message, data = null) => {
    console.error(`[Nanda] ${message}`, data || '');
  },
  
  /* ========== MISC ========== */
  
  /**
   * Deep clone object
   * @param {object} obj
   * @returns {object}
   */
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  
  /**
   * Check if object is empty
   * @param {object} obj
   * @returns {boolean}
   */
  isEmpty: (obj) => {
    return Object.keys(obj).length === 0;
  },
  
  /**
   * Scroll to element
   * @param {string|HTMLElement} target - Element ID or element
   * @param {object} options - Scroll options
   */
  scrollTo: (target, options = {}) => {
    const element = typeof target === 'string' ? UTILS.$(target) : target;
    if (element) {
      element.scrollIntoView({
        behavior: options.behavior || 'smooth',
        block: options.block || 'start'
      });
    }
  },
  
  /**
   * Get query parameters
   * @returns {object}
   */
  getQueryParams: () => {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (let [key, value] of params) {
      result[key] = value;
    }
    return result;
  },
  
  /**
   * Generate unique ID
   * @returns {string}
   */
  generateId: () => {
    return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now();
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UTILS;
}
