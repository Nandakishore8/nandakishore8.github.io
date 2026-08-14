/* ========================================
   ANALYTICS - Event Tracking System
   Google Tag Manager, Custom Events
   ======================================== */

const ANALYTICS = {
  
  /**
   * Track custom event
   * @param {string} eventName - Event identifier
   * @param {object} eventData - Event data
   */
  trackEvent: (eventName, eventData = {}) => {
    if (!CONFIG.FEATURES.ANALYTICS) return;
    
    // Log in debug mode
    if (CONFIG.DEBUG) {
      console.log(`[Analytics] Event: ${eventName}`, eventData);
    }
    
    // Send to Google Tag Manager
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        event: eventName,
        timestamp: new Date().toISOString(),
        ...eventData
      });
    }
    
    // Store event in session for later analysis
    ANALYTICS.storeEvent(eventName, eventData);
  },
  
  /**
   * Track page view
   * @param {string} pageName - Page identifier
   * @param {string} pageUrl - Page URL
   */
  trackPageView: (pageName, pageUrl = window.location.pathname) => {
    if (!CONFIG.FEATURES.ANALYTICS) return;
    
    ANALYTICS.trackEvent('page_view', {
      page_name: pageName,
      page_path: pageUrl,
      page_title: document.title
    });
  },
  
  /**
   * Track conversion event
   * @param {string} conversionType - Type of conversion
   * @param {object} conversionData - Conversion details
   */
  trackConversion: (conversionType, conversionData = {}) => {
    if (!CONFIG.FEATURES.ANALYTICS) return;
    
    ANALYTICS.trackEvent('conversion', {
      conversion_type: conversionType,
      conversion_value: conversionData.value || 0,
      conversion_currency: 'INR',
      ...conversionData
    });
  },
  
  /* Portfolio Review Events */
  
  trackPortfolioReviewStarted: (data = {}) => {
    ANALYTICS.trackEvent('portfolio_review_started', data);
  },
  
  trackPortfolioReviewCompleted: (data = {}) => {
    ANALYTICS.trackConversion('portfolio_review', data);
  },
  
  trackPortfolioReviewStep: (stepNumber, stepData = {}) => {
    ANALYTICS.trackEvent('portfolio_review_step', {
      step_number: stepNumber,
      ...stepData
    });
  },
  
  /* Form Events */
  
  trackFormSubmitted: (formName, data = {}) => {
    ANALYTICS.trackConversion('form_submission', {
      form_name: formName,
      ...data
    });
  },
  
  trackFormStarted: (formName, data = {}) => {
    ANALYTICS.trackEvent('form_started', {
      form_name: formName,
      ...data
    });
  },
  
  /* CTA Events */
  
  trackCtaClicked: (ctaName, ctaPosition = '', ctaText = '') => {
    ANALYTICS.trackEvent('cta_clicked', {
      cta_name: ctaName,
      cta_position: ctaPosition,
      cta_text: ctaText
    });
  },
  
  trackWhatsAppClick: (context = '') => {
    ANALYTICS.trackConversion('whatsapp_click', {
      whatsapp_context: context
    });
  },
  
  trackPhoneClick: () => {
    ANALYTICS.trackEvent('phone_click');
  },
  
  /* Calculator Events */
  
  trackCalculatorUsed: (calculatorType, inputData = {}) => {
    ANALYTICS.trackEvent('calculator_used', {
      calculator_type: calculatorType,
      ...inputData
    });
  },
  
  /* Resource Events */
  
  trackResourceViewed: (resourceType, resourceName) => {
    ANALYTICS.trackEvent('resource_viewed', {
      resource_type: resourceType,
      resource_name: resourceName
    });
  },
  
  trackArticleRead: (articleTitle, timeOnPage = 0) => {
    ANALYTICS.trackEvent('article_read', {
      article_title: articleTitle,
      time_on_page: timeOnPage
    });
  },
  
  /* Upload Events */
  
  trackPortfolioUploadStarted: () => {
    ANALYTICS.trackEvent('portfolio_upload_started');
  },
  
  trackPortfolioUploadCompleted: (fileSize = 0) => {
    ANALYTICS.trackEvent('portfolio_upload_completed', {
      file_size: fileSize
    });
  },
  
  trackPortfolioUploadFailed: (errorMessage = '') => {
    ANALYTICS.trackEvent('portfolio_upload_failed', {
      error_message: errorMessage
    });
  },
  
  /* Session Storage */
  
  /**
   * Store event in session memory
   * @param {string} eventName
   * @param {object} eventData
   */
  storeEvent: (eventName, eventData) => {
    try {
      const sessionEvents = UTILS.getFromStorage('nanda_session_events') || [];
      sessionEvents.push({
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString()
      });
      // Keep only last 100 events
      if (sessionEvents.length > 100) {
        sessionEvents.shift();
      }
      UTILS.saveToStorage('nanda_session_events', sessionEvents);
    } catch (e) {
      UTILS.error('Failed to store event:', e);
    }
  },
  
  /**
   * Get all session events
   * @returns {array}
   */
  getSessionEvents: () => {
    return UTILS.getFromStorage('nanda_session_events') || [];
  },
  
  /**
   * Clear session events
   */
  clearSessionEvents: () => {
    UTILS.removeFromStorage('nanda_session_events');
  },
  
  /**
   * Get session summary
   * @returns {object}
   */
  getSessionSummary: () => {
    const events = ANALYTICS.getSessionEvents();
    const summary = {
      total_events: events.length,
      session_duration: 0,
      conversions: [],
      cta_clicks: 0,
      form_submissions: 0,
      last_event_time: null
    };
    
    if (events.length > 0) {
      const firstEvent = new Date(events[0].timestamp);
      const lastEvent = new Date(events[events.length - 1].timestamp);
      summary.session_duration = lastEvent - firstEvent;
      summary.last_event_time = lastEvent.toISOString();
      
      // Count specific events
      events.forEach(e => {
        if (e.event === 'conversion') summary.conversions.push(e.data);
        if (e.event === 'cta_clicked') summary.cta_clicks++;
        if (e.event === 'form_submission') summary.form_submissions++;
      });
    }
    
    return summary;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANALYTICS;
}
