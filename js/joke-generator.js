/* ========================================
   JOKE GENERATOR - External API Integration
   Uses Open Trivia & JokeAPI for humor
   ======================================== */

const JOKE_GENERATOR = {
  
  /* API Endpoints */
  APIs: {
    JOKE_API: 'https://official-joke-api.appspot.com/random_joke',
    PROGRAMMING_JOKES: 'https://official-joke-api.appspot.com/jokes/programming/random',
    KNOCK_KNOCK: 'https://official-joke-api.appspot.com/jokes/knock-knock/random',
    GENERAL_JOKES: 'https://official-joke-api.appspot.com/jokes/general/random',
    USELESS_FACTS: 'https://uselessfacts.jsoup.com/random.json?language=en'
  },
  
  /* Joke Cache */
  cache: {
    jokes: [],
    lastFetch: null,
    cacheExpiry: 3600000 // 1 hour
  },
  
  /**
   * Get a random joke from the API
   * @param {string} category - 'random', 'programming', 'knock-knock', 'general'
   * @returns {Promise<object>} Joke object
   */
  getJoke: async (category = 'random') => {
    try {
      let apiUrl = JOKE_GENERATOR.APIs.JOKE_API;
      
      switch(category.toLowerCase()) {
        case 'programming':
          apiUrl = JOKE_GENERATOR.APIs.PROGRAMMING_JOKES;
          break;
        case 'knock-knock':
          apiUrl = JOKE_GENERATOR.APIs.KNOCK_KNOCK;
          break;
        case 'general':
          apiUrl = JOKE_GENERATOR.APIs.GENERAL_JOKES;
          break;
        default:
          apiUrl = JOKE_GENERATOR.APIs.JOKE_API;
      }
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        setup: data.setup || 'No setup',
        punchline: data.punchline || data.delivery || 'No punchline',
        type: data.type || category,
        category: category,
        source: 'Official Joke API',
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      UTILS.error('Failed to fetch joke:', error);
      return JOKE_GENERATOR.getFallbackJoke();
    }
  },
  
  /**
   * Get a useless fact (for variety)
   * @returns {Promise<object>} Fact object
   */
  getUselessFact: async () => {
    try {
      const response = await fetch(JOKE_GENERATOR.APIs.USELESS_FACTS);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        text: data.text || 'No fact available',
        type: 'fact',
        source: 'Useless Facts API',
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      UTILS.error('Failed to fetch fact:', error);
      return JOKE_GENERATOR.getFallbackFact();
    }
  },
  
  /**
   * Get multiple jokes at once
   * @param {number} count - Number of jokes to fetch
   * @param {string} category - Joke category
   * @returns {Promise<array>} Array of jokes
   */
  getMultipleJokes: async (count = 5, category = 'random') => {
    const jokes = [];
    
    for (let i = 0; i < count; i++) {
      const joke = await JOKE_GENERATOR.getJoke(category);
      jokes.push(joke);
      
      // Add slight delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return jokes;
  },
  
  /**
   * Fallback jokes for when API is unavailable
   * @returns {object} Random fallback joke
   */
  getFallbackJoke: () => {
    const fallbackJokes = [
      {
        setup: "Why did the mutual fund manager go to the bank?",
        punchline: "Because they wanted to check their portfolio performance!",
        type: 'general',
        category: 'finance',
        source: 'Fallback Jokes'
      },
      {
        setup: "Why do investors never get bored?",
        punchline: "Because there's always a bull or bear market to keep them entertained!",
        type: 'general',
        category: 'finance',
        source: 'Fallback Jokes'
      },
      {
        setup: "What's a diversified portfolio like?",
        punchline: "A good joke - it needs the right mix to land well!",
        type: 'general',
        category: 'finance',
        source: 'Fallback Jokes'
      },
      {
        setup: "Why did the stock go to therapy?",
        punchline: "It had too many emotional ups and downs!",
        type: 'general',
        category: 'finance',
        source: 'Fallback Jokes'
      },
      {
        setup: "How many investors does it take to change a light bulb?",
        punchline: "Three - one to change it, and two to discuss how much better the old one was!",
        type: 'general',
        category: 'finance',
        source: 'Fallback Jokes'
      },
      {
        setup: "Why don't mutual funds ever win at poker?",
        punchline: "Because they always show their holdings!",
        type: 'general',
        category: 'finance',
        source: 'Fallback Jokes'
      }
    ];
    
    const randomJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
    return {
      ...randomJoke,
      timestamp: new Date().toISOString()
    };
  },
  
  /**
   * Fallback facts for when API is unavailable
   * @returns {object} Random fallback fact
   */
  getFallbackFact: () => {
    const fallbackFacts = [
      { text: "Did you know? Compound interest is often called the 8th wonder of the world!" },
      { text: "Fun fact: The average investor checks their portfolio more than 5 times a day!" },
      { text: "Interesting: Diversification can reduce portfolio risk by up to 60%!" },
      { text: "Did you know? SIP (Systematic Investment Plan) can help create wealth through discipline!" },
      { text: "Fact: Mutual funds were first introduced in India in 1963!" },
      { text: "Interesting: The best time to invest was yesterday, the second best time is today!" }
    ];
    
    const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
    return {
      ...randomFact,
      type: 'fact',
      source: 'Fallback Facts',
      timestamp: new Date().toISOString()
    };
  },
  
  /**
   * Display joke in a UI element
   * @param {HTMLElement} container - Container element
   * @param {object} joke - Joke object
   */
  displayJoke: (container, joke) => {
    if (!container) return;
    
    const html = `
      <div class="joke-display" style="animation: fadeIn var(--transition-base);">
        <div class="joke-setup" style="font-size: var(--text-lg); font-weight: var(--fw-semibold); color: var(--primary); margin-bottom: var(--space-md);">
          ${joke.setup}
        </div>
        <div class="joke-punchline" style="font-size: var(--text-lg); color: var(--text-dark); margin-bottom: var(--space-lg); padding-top: var(--space-md); border-top: 2px solid var(--border-light);">
          ${joke.punchline}
        </div>
        <div class="joke-meta" style="font-size: var(--text-xs); color: var(--text-light);">
          <span style="display: inline-block; background: var(--primary-light); padding: 4px 12px; border-radius: var(--radius-full); margin-right: var(--space-sm);">${joke.category || joke.type}</span>
          <span>${joke.source}</span>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Display fact in a UI element
   * @param {HTMLElement} container - Container element
   * @param {object} fact - Fact object
   */
  displayFact: (container, fact) => {
    if (!container) return;
    
    const html = `
      <div class="fact-display" style="animation: fadeIn var(--transition-base);">
        <div class="fact-text" style="font-size: var(--text-base); color: var(--text-dark); margin-bottom: var(--space-lg); padding: var(--space-lg); background: var(--bg-light); border-radius: var(--radius-md); border-left: 4px solid var(--secondary);">
          💡 ${fact.text}
        </div>
        <div class="fact-meta" style="font-size: var(--text-xs); color: var(--text-light);">
          <span>${fact.source}</span>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  },
  
  /**
   * Create joke widget HTML
   * @param {string} containerId - ID of container element
   * @returns {string} Widget HTML
   */
  createWidget: (containerId = 'joke-widget') => {
    return `
      <div id="${containerId}" style="background: var(--bg-light); padding: var(--space-xl); border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
        <h3 style="color: var(--accent); margin-top: 0;">😂 Daily Laugh Break</h3>
        
        <div id="joke-content" style="min-height: 100px; margin: var(--space-lg) 0;">
          <div style="text-align: center; color: var(--text-light);">
            Loading joke...
          </div>
        </div>
        
        <div style="display: flex; gap: var(--space-md); flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="JOKE_GENERATOR.loadAndDisplay('random')">Random Joke</button>
          <button class="btn btn-primary btn-sm" onclick="JOKE_GENERATOR.loadAndDisplay('programming')">Programming</button>
          <button class="btn btn-primary btn-sm" onclick="JOKE_GENERATOR.loadAndDisplay('knock-knock')">Knock Knock</button>
          <button class="btn btn-primary btn-sm" onclick="JOKE_GENERATOR.loadAndDisplay('fact')">Fun Fact</button>
        </div>
        
        <div style="margin-top: var(--space-md); font-size: var(--text-xs); color: var(--text-light); text-align: center;">
          Powered by Official Joke API
        </div>
      </div>
    `;
  },
  
  /**
   * Load and display joke/fact
   * @param {string} type - 'random', 'programming', 'knock-knock', 'general', 'fact'
   */
  loadAndDisplay: async (type = 'random') => {
    const container = UTILS.query('#joke-content');
    if (!container) return;
    
    // Show loading state
    container.innerHTML = `<div style="text-align: center; color: var(--text-light);">Loading ${type}...</div>`;
    
    try {
      if (type === 'fact') {
        const fact = await JOKE_GENERATOR.getUselessFact();
        JOKE_GENERATOR.displayFact(container, fact);
        ANALYTICS.trackEvent('joke_generator_fact_displayed', { type: 'fact' });
      } else {
        const joke = await JOKE_GENERATOR.getJoke(type);
        JOKE_GENERATOR.displayJoke(container, joke);
        ANALYTICS.trackEvent('joke_generator_joke_displayed', { type });
      }
    } catch (error) {
      UTILS.error('Failed to load joke/fact:', error);
      container.innerHTML = `<div style="text-align: center; color: var(--error);">Failed to load. Please try again!</div>`;
    }
  },
  
  /**
   * Initialize widget on page load
   * @param {string} containerId - ID of container
   */
  init: async (containerId = 'joke-widget') => {
    const container = UTILS.$(containerId);
    if (!container) {
      UTILS.log('Joke widget container not found');
      return;
    }
    
    // Insert widget HTML
    container.innerHTML = JOKE_GENERATOR.createWidget(containerId);
    
    // Load initial joke
    await JOKE_GENERATOR.loadAndDisplay('random');
  },
  
  /**
   * Share joke on WhatsApp
   * @param {object} joke - Joke object
   */
  shareOnWhatsApp: (joke) => {
    const message = `😂 Check this out!\n\n${joke.setup}\n\n${joke.punchline}\n\nFrom: ${joke.source}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    ANALYTICS.trackEvent('joke_shared_whatsapp', { type: joke.type });
  },
  
  /**
   * Copy joke to clipboard
   * @param {object} joke - Joke object
   */
  copyToClipboard: (joke) => {
    const text = `${joke.setup}\n\n${joke.punchline}`;
    navigator.clipboard.writeText(text).then(() => {
      UTILS.log('Joke copied to clipboard');
      ANALYTICS.trackEvent('joke_copied_clipboard', { type: joke.type });
    }).catch(err => {
      UTILS.error('Failed to copy:', err);
    });
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JOKE_GENERATOR;
}
