/* ========================================
   PORTFOLIO DATA MODEL
   Data Structures for Portfolio Analysis
   ========================================
   
   API-Ready structure for future backend integration.
   Defines portfolio, fund, and lead data models.
*/

const PORTFOLIO = {
  
  /**
   * Portfolio Data Structure
   * @typedef {object} PortfolioData
   * @property {string} id - Portfolio ID
   * @property {object} investor - Investor information
   * @property {array} funds - Array of mutual funds
   * @property {object} analysis - Portfolio analysis results
   * @property {object} metadata - Portfolio metadata
   */
  
  /**
   * Create new portfolio object
   * @param {object} investorInfo
   * @returns {object} Portfolio object
   */
  createPortfolio: (investorInfo = {}) => {
    return {
      id: UTILS.generateId(),
      investor: {
        name: investorInfo.name || '',
        email: investorInfo.email || '',
        phone: investorInfo.phone || '',
        dob: investorInfo.dob || null,
        panCard: investorInfo.panCard || '',
        address: investorInfo.address || {}
      },
      funds: [],
      analysis: {
        diversification: null,
        overlap: null,
        concentration: null,
        riskProfile: null,
        costAnalysis: null,
        goalAlignment: null,
        healthScore: null
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft', // draft, submitted, analyzed, completed
        source: 'web_form'
      }
    };
  },
  
  /**
   * Fund Data Structure
   * @typedef {object} Fund
   * @property {string} id - Fund ID
   * @property {string} name - Fund name
   * @property {string} type - Equity, Debt, Hybrid, etc.
   * @property {object} investment - Investment details
   */
  
  /**
   * Add fund to portfolio
   * @param {object} portfolio
   * @param {object} fundData
   * @returns {object} Updated portfolio
   */
  addFund: (portfolio, fundData) => {
    const fund = {
      id: UTILS.generateId(),
      name: fundData.name || '',
      schemeCode: fundData.schemeCode || '',
      type: fundData.type || 'Equity', // Equity, Debt, Hybrid, Index, ELSS
      category: fundData.category || '',
      plan: fundData.plan || 'Regular', // Direct, Regular
      isin: fundData.isin || '',
      investment: {
        investmentType: fundData.investmentType || 'SIP', // SIP, Lumpsum, Both
        amount: fundData.amount || 0,
        units: fundData.units || 0,
        currentValue: fundData.currentValue || 0,
        nav: fundData.nav || 0,
        purchaseDate: fundData.purchaseDate || null,
        gain: fundData.gain || 0
      },
      expenseRatio: fundData.expenseRatio || 0,
      aum: fundData.aum || 0,
      riskRating: fundData.riskRating || 3, // 1-5 scale
      fundManager: fundData.fundManager || ''
    };
    
    portfolio.funds.push(fund);
    portfolio.metadata.updatedAt = new Date().toISOString();
    return portfolio;
  },
  
  /**
   * Remove fund from portfolio
   * @param {object} portfolio
   * @param {string} fundId
   * @returns {object} Updated portfolio
   */
  removeFund: (portfolio, fundId) => {
    portfolio.funds = portfolio.funds.filter(f => f.id !== fundId);
    portfolio.metadata.updatedAt = new Date().toISOString();
    return portfolio;
  },
  
  /**
   * Calculate total portfolio value
   * @param {object} portfolio
   * @returns {number}
   */
  getTotalValue: (portfolio) => {
    return portfolio.funds.reduce((sum, fund) => sum + (fund.investment.currentValue || 0), 0);
  },
  
  /**
   * Calculate total gain
   * @param {object} portfolio
   * @returns {number}
   */
  getTotalGain: (portfolio) => {
    return portfolio.funds.reduce((sum, fund) => sum + (fund.investment.gain || 0), 0);
  },
  
  /**
   * Get portfolio by type distribution
   * @param {object} portfolio
   * @returns {object} Type distribution with percentages
   */
  getTypeDistribution: (portfolio) => {
    const types = {};
    const total = PORTFOLIO.getTotalValue(portfolio);
    
    portfolio.funds.forEach(fund => {
      if (!types[fund.type]) types[fund.type] = 0;
      types[fund.type] += fund.investment.currentValue || 0;
    });
    
    const distribution = {};
    Object.keys(types).forEach(type => {
      distribution[type] = {
        value: types[type],
        percentage: total > 0 ? ((types[type] / total) * 100).toFixed(2) : 0
      };
    });
    
    return distribution;
  },
  
  /**
   * Check for fund overlap (similar category funds)
   * @param {object} portfolio
   * @returns {array} Overlapping funds
   */
  detectOverlap: (portfolio) => {
    const overlaps = [];
    
    for (let i = 0; i < portfolio.funds.length; i++) {
      for (let j = i + 1; j < portfolio.funds.length; j++) {
        const fund1 = portfolio.funds[i];
        const fund2 = portfolio.funds[j];
        
        if (fund1.category === fund2.category && fund1.category !== '') {
          overlaps.push({
            fund1: fund1.id,
            fund2: fund2.id,
            category: fund1.category,
            overlapType: 'category'
          });
        }
      }
    }
    
    return overlaps;
  },
  
  /**
   * Calculate portfolio health metrics
   * @param {object} portfolio
   * @returns {object} Health metrics
   */
  calculateHealthMetrics: (portfolio) => {
    const metrics = {
      fundCount: portfolio.funds.length,
      diversification: 0,
      overlap: 0,
      concentration: 0,
      costAnalysis: 0,
      overallHealthScore: 0
    };
    
    const distribution = PORTFOLIO.getTypeDistribution(portfolio);
    const typeCount = Object.keys(distribution).length;
    
    // Diversification score (0-100)
    // Ideal: 3-5 fund types, 20-30 funds
    if (typeCount >= 3) {
      metrics.diversification = Math.min(100, typeCount * 20);
    } else {
      metrics.diversification = typeCount * 30;
    }
    
    // Overlap detection (0-100)
    const overlaps = PORTFOLIO.detectOverlap(portfolio);
    metrics.overlap = Math.max(0, 100 - (overlaps.length * 10));
    
    // Concentration check (0-100)
    // Check if any single fund is >30% of portfolio
    const maxConcentration = Math.max(
      ...distribution.map(d => parseFloat(d.percentage))
    );
    metrics.concentration = maxConcentration > 30 ? 50 : 100;
    
    // Cost analysis (0-100)
    // Average expense ratio should be < 1.5%
    const avgExpenseRatio = portfolio.funds.length > 0
      ? portfolio.funds.reduce((sum, f) => sum + (f.expenseRatio || 0), 0) / portfolio.funds.length
      : 0;
    metrics.costAnalysis = avgExpenseRatio < 1.5 ? 100 : Math.max(0, 100 - (avgExpenseRatio * 30));
    
    // Overall health score (average of all metrics)
    metrics.overallHealthScore = Math.round(
      (metrics.diversification + metrics.overlap + metrics.concentration + metrics.costAnalysis) / 4
    );
    
    return metrics;
  },
  
  /**
   * Save portfolio to localStorage
   * @param {object} portfolio
   */
  saveToLocal: (portfolio) => {
    UTILS.saveToStorage(CONFIG.STORAGE.PORTFOLIO_DRAFT, portfolio);
    UTILS.log('Portfolio saved to localStorage', portfolio.id);
  },
  
  /**
   * Load portfolio from localStorage
   * @returns {object|null}
   */
  loadFromLocal: () => {
    return UTILS.getFromStorage(CONFIG.STORAGE.PORTFOLIO_DRAFT);
  },
  
  /**
   * Prepare portfolio for API submission
   * @param {object} portfolio
   * @returns {object} Clean portfolio data
   */
  prepareForSubmission: (portfolio) => {
    return {
      investor: portfolio.investor,
      funds: portfolio.funds.map(f => ({
        name: f.name,
        schemeCode: f.schemeCode,
        type: f.type,
        category: f.category,
        plan: f.plan,
        investment: f.investment,
        expenseRatio: f.expenseRatio
      })),
      analysis: portfolio.analysis,
      metadata: {
        createdAt: portfolio.metadata.createdAt,
        source: portfolio.metadata.source
      }
    };
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO;
}
