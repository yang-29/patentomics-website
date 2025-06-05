'use client';

import React, { useState, useEffect } from 'react';
import { samplePortfolios, portfolioTimeSeries, sectorPerformance } from '@/data/samplePatents';

export default function PatentPortfolioDemo() {
  const [selectedPortfolio, setSelectedPortfolio] = useState(samplePortfolios[0]);
  const [timeRange, setTimeRange] = useState<'1Y' | '2Y' | 'ALL'>('ALL');
  const [showComparison, setShowComparison] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  // Animate portfolio values
  useEffect(() => {
    const targets = {
      returns: selectedPortfolio.projectedReturns,
      risk: selectedPortfolio.risk,
      diversification: selectedPortfolio.diversificationScore * 100,
      quality: selectedPortfolio.averageQualityScore
    };

    const interval = setInterval(() => {
      setAnimatedValues(prev => {
        const newValues = { ...prev };
        Object.entries(targets).forEach(([key, target]) => {
          const current = prev[key] || 0;
          const diff = target - current;
          newValues[key] = current + diff * 0.1;
        });
        return newValues;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [selectedPortfolio]);

  // Filter time series data based on selected range
  const getFilteredData = () => {
    if (timeRange === '1Y') {
      return portfolioTimeSeries.slice(-12);
    } else if (timeRange === '2Y') {
      return portfolioTimeSeries;
    }
    return portfolioTimeSeries;
  };

  const chartData = getFilteredData();
  const maxValue = Math.max(...chartData.map(d => Math.max(d.value, d.benchmark)));
  const minValue = Math.min(...chartData.map(d => Math.min(d.value, d.benchmark)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4">
            Patent Portfolio Optimizer
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Build and analyze AI-optimized patent portfolios for maximum returns
          </p>
        </div>

        {/* Portfolio Selector */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-medium text-white mb-4">Select Portfolio Strategy</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {samplePortfolios.map(portfolio => (
              <button
                key={portfolio.id}
                onClick={() => setSelectedPortfolio(portfolio)}
                className={`p-4 rounded-2xl border transition-all duration-300 ${
                  selectedPortfolio.id === portfolio.id
                    ? 'backdrop-blur-xl bg-white/20 border-white/40'
                    : 'backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <h4 className="font-medium text-white mb-2">{portfolio.name}</h4>
                <p className="text-sm text-white/60 mb-3">{portfolio.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">Returns</span>
                  <span className="text-green-400 font-light">+{portfolio.projectedReturns}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-white">Performance History</h3>
                <div className="flex space-x-2">
                  {['1Y', '2Y', 'ALL'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range as '1Y' | '2Y' | 'ALL')}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        timeRange === range
                          ? 'bg-white/20 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-80">
                <svg className="w-full h-full" viewBox={`0 0 800 320`}>
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line
                      key={i}
                      x1="50"
                      y1={20 + i * 70}
                      x2="750"
                      y2={20 + i * 70}
                      stroke="rgba(255,255,255,0.1)"
                      strokeDasharray="5,5"
                    />
                  ))}

                  {/* Portfolio line */}
                  <path
                    d={`M ${chartData.map((d, i) => 
                      `${50 + (700 / (chartData.length - 1)) * i},${300 - ((d.value - minValue) / (maxValue - minValue)) * 280}`
                    ).join(' L ')}`}
                    fill="none"
                    stroke="url(#portfolioGradient)"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />

                  {/* Benchmark line */}
                  {showComparison && (
                    <path
                      d={`M ${chartData.map((d, i) => 
                        `${50 + (700 / (chartData.length - 1)) * i},${300 - ((d.benchmark - minValue) / (maxValue - minValue)) * 280}`
                      ).join(' L ')}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}

                  {/* Data points */}
                  {chartData.map((d, i) => (
                    <circle
                      key={i}
                      cx={50 + (700 / (chartData.length - 1)) * i}
                      cy={300 - ((d.value - minValue) / (maxValue - minValue)) * 280}
                      r="4"
                      fill="white"
                      className="drop-shadow-md"
                    />
                  ))}

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-white/60 w-10">
                  <span>{maxValue.toFixed(0)}</span>
                  <span>{((maxValue + minValue) / 2).toFixed(0)}</span>
                  <span>{minValue.toFixed(0)}</span>
                </div>
              </div>

              {/* Chart legend */}
              <div className="mt-4 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                  <span className="text-sm text-white/80">Portfolio Performance</span>
                </div>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="flex items-center space-x-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={showComparison}
                    onChange={() => {}}
                    className="rounded"
                  />
                  <span>Show Benchmark</span>
                </button>
              </div>
            </div>

            {/* Sector Allocation */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 mt-8">
              <h3 className="text-xl font-medium text-white mb-4">Sector Performance</h3>
              <div className="space-y-3">
                {sectorPerformance.map((sector, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white/80">{sector.sector}</span>
                      <span className="text-sm text-white/60">
                        {sector.patentCount.toLocaleString()} patents
                      </span>
                    </div>
                    <div className="h-8 backdrop-blur-sm bg-white/5 rounded-xl overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl transition-all duration-1000 flex items-center justify-end pr-3"
                        style={{ 
                          width: `${(sector.avgQuality / 100) * 100}%`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      >
                        <span className="text-xs text-white font-medium">
                          {sector.avgQuality}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Details */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-4">Portfolio Metrics</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Expected Returns</span>
                    <span className="text-2xl font-light text-green-400">
                      +{animatedValues.returns?.toFixed(1) || '0.0'}%
                    </span>
                  </div>
                  <div className="h-2 backdrop-blur-sm bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${(animatedValues.returns || 0) * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Risk Level</span>
                    <span className="text-2xl font-light text-orange-400">
                      {animatedValues.risk?.toFixed(1) || '0.0'}%
                    </span>
                  </div>
                  <div className="h-2 backdrop-blur-sm bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-400 to-red-400 rounded-full transition-all duration-1000"
                      style={{ width: `${(animatedValues.risk || 0) * 3}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Diversification</span>
                    <span className="text-2xl font-light text-blue-400">
                      {animatedValues.diversification?.toFixed(0) || '0'}%
                    </span>
                  </div>
                  <div className="h-2 backdrop-blur-sm bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-1000"
                      style={{ width: `${animatedValues.diversification || 0}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/60">Avg Quality Score</span>
                    <span className="text-2xl font-light text-purple-400">
                      {animatedValues.quality?.toFixed(0) || '0'}
                    </span>
                  </div>
                  <div className="h-2 backdrop-blur-sm bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
                      style={{ width: `${animatedValues.quality || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Technology Mix */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-4">Technology Mix</h3>
              <div className="space-y-3">
                {selectedPortfolio.technologyMix.map((tech, index) => (
                  <div key={tech.area} className="flex items-center justify-between">
                    <span className="text-sm text-white/80">Class {tech.area}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 backdrop-blur-sm bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${tech.percentage}%`,
                            transitionDelay: `${index * 100}ms`
                          }}
                        />
                      </div>
                      <span className="text-sm text-white/60 w-10 text-right">
                        {tech.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}