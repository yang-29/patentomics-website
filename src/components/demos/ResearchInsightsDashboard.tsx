'use client';

import React, { useState, useEffect } from 'react';
import { researchMetrics, innovationTrends, sectorPerformance } from '@/data/samplePatents';

export default function ResearchInsightsDashboard() {
  const [selectedMetric, setSelectedMetric] = useState<'performance' | 'economic' | 'detection'>('performance');
  const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: string]: number }>({});
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Animate numbers on mount
  useEffect(() => {
    const targets = {
      rSquared: researchMetrics.modelPerformance.rSquared * 100,
      accuracy: researchMetrics.modelPerformance.accuracy * 100,
      returns: researchMetrics.economicImpact.abnormalReturns,
      sharpe: researchMetrics.economicImpact.sharpeRatio,
      totalPatents: researchMetrics.dataScale.totalPatents,
      gpt4Accuracy: researchMetrics.aiDetection.gpt4Accuracy * 100
    };

    const interval = setInterval(() => {
      setAnimatedNumbers(prev => {
        const newValues = { ...prev };
        Object.entries(targets).forEach(([key, target]) => {
          const current = prev[key] || 0;
          const diff = target - current;
          if (key === 'totalPatents') {
            newValues[key] = current + diff * 0.05;
          } else {
            newValues[key] = current + diff * 0.1;
          }
        });
        return newValues;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Calculate chart dimensions
  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 40;
  const dataWidth = chartWidth - padding * 2;
  const dataHeight = chartHeight - padding * 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4">
            Research Insights Dashboard
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore key findings and performance metrics from our patent quality research
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="text-sm text-white/60 mb-2">Model R²</div>
            <div className="text-3xl font-light text-white mb-1">
              {animatedNumbers.rSquared?.toFixed(0) || '0'}%
            </div>
            <div className="text-xs text-green-400">+10pp vs baseline</div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="text-sm text-white/60 mb-2">Annual Returns</div>
            <div className="text-3xl font-light text-white mb-1">
              {animatedNumbers.returns?.toFixed(1) || '0.0'}%
            </div>
            <div className="text-xs text-green-400">Alpha generation</div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="text-sm text-white/60 mb-2">Patents Analyzed</div>
            <div className="text-3xl font-light text-white mb-1">
              {(animatedNumbers.totalPatents / 1000000)?.toFixed(1) || '0.0'}M
            </div>
            <div className="text-xs text-blue-400">2004-2023 dataset</div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="text-sm text-white/60 mb-2">AI Detection</div>
            <div className="text-3xl font-light text-white mb-1">
              {animatedNumbers.gpt4Accuracy?.toFixed(0) || '0'}%
            </div>
            <div className="text-xs text-purple-400">GPT-4 accuracy</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Innovation Trends Chart */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-6">AI-Generated Patent Trends</h3>
              
              <div className="relative">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
                  {/* Grid lines */}
                  {[0, 25, 50, 75, 100].map(percent => (
                    <g key={percent}>
                      <line
                        x1={padding}
                        y1={padding + (dataHeight * (100 - percent) / 100)}
                        x2={chartWidth - padding}
                        y2={padding + (dataHeight * (100 - percent) / 100)}
                        stroke="rgba(255,255,255,0.1)"
                        strokeDasharray="3,3"
                      />
                      <text
                        x={padding - 10}
                        y={padding + (dataHeight * (100 - percent) / 100) + 5}
                        fill="rgba(255,255,255,0.5)"
                        fontSize="12"
                        textAnchor="end"
                      >
                        {percent}%
                      </text>
                    </g>
                  ))}

                  {/* AI Generated Area */}
                  <path
                    d={`
                      M ${padding},${chartHeight - padding}
                      ${innovationTrends.map((d, i) => 
                        `L ${padding + (i * dataWidth / (innovationTrends.length - 1))},${padding + dataHeight - (d.aiGenerated * dataHeight / 100)}`
                      ).join(' ')}
                      L ${chartWidth - padding},${chartHeight - padding}
                      Z
                    `}
                    fill="url(#aiGradient)"
                    opacity="0.8"
                  />

                  {/* Human Written Area */}
                  <path
                    d={`
                      M ${padding},${padding}
                      ${innovationTrends.map((d, i) => 
                        `L ${padding + (i * dataWidth / (innovationTrends.length - 1))},${padding + (d.aiGenerated * dataHeight / 100)}`
                      ).join(' ')}
                      L ${chartWidth - padding},${padding}
                      Z
                    `}
                    fill="url(#humanGradient)"
                    opacity="0.6"
                  />

                  {/* Data points and hover areas */}
                  {innovationTrends.map((d, i) => {
                    const x = padding + (i * dataWidth / (innovationTrends.length - 1));
                    const yAI = padding + dataHeight - (d.aiGenerated * dataHeight / 100);
                    
                    return (
                      <g key={d.year}>
                        <rect
                          x={x - 20}
                          y={padding}
                          width={40}
                          height={dataHeight}
                          fill="transparent"
                          onMouseEnter={() => setHoveredYear(d.year)}
                          onMouseLeave={() => setHoveredYear(null)}
                          style={{ cursor: 'pointer' }}
                        />
                        
                        {hoveredYear === d.year && (
                          <>
                            <line
                              x1={x}
                              y1={padding}
                              x2={x}
                              y2={chartHeight - padding}
                              stroke="rgba(255,255,255,0.3)"
                            />
                            <rect
                              x={x - 60}
                              y={yAI - 60}
                              width={120}
                              height={50}
                              fill="rgba(0,0,0,0.8)"
                              rx="8"
                            />
                            <text x={x} y={yAI - 35} fill="white" fontSize="14" textAnchor="middle">
                              {d.year}
                            </text>
                            <text x={x} y={yAI - 20} fill="rgba(147,197,253,1)" fontSize="12" textAnchor="middle">
                              AI: {d.aiGenerated.toFixed(1)}%
                            </text>
                          </>
                        )}
                        
                        <circle
                          cx={x}
                          cy={yAI}
                          r="4"
                          fill="white"
                          className="drop-shadow-md"
                        />
                      </g>
                    );
                  })}

                  {/* Year labels */}
                  {innovationTrends.map((d, i) => (
                    <text
                      key={d.year}
                      x={padding + (i * dataWidth / (innovationTrends.length - 1))}
                      y={chartHeight - padding + 20}
                      fill="rgba(255,255,255,0.6)"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {d.year}
                    </text>
                  ))}

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="aiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="humanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-b from-blue-400 to-blue-600"></div>
                    <span className="text-sm text-white/80">AI-Generated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-b from-green-300 to-green-500"></div>
                    <span className="text-sm text-white/80">Human-Written</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Performance Metrics */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 mt-8">
              <h3 className="text-xl font-medium text-white mb-4">Model Performance Comparison</h3>
              
              <div className="flex space-x-2 mb-6">
                {['performance', 'economic', 'detection'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric as any)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedMetric === metric
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedMetric === 'performance' && (
                  <>
                    <MetricCard label="R-Squared" value={researchMetrics.modelPerformance.rSquared} format="percent" />
                    <MetricCard label="Accuracy" value={researchMetrics.modelPerformance.accuracy} format="percent" />
                    <MetricCard label="Precision" value={researchMetrics.modelPerformance.precision} format="percent" />
                    <MetricCard label="Recall" value={researchMetrics.modelPerformance.recall} format="percent" />
                  </>
                )}
                {selectedMetric === 'economic' && (
                  <>
                    <MetricCard label="Annual Returns" value={researchMetrics.economicImpact.abnormalReturns} format="percent"/>
                    <MetricCard label="Sharpe Ratio" value={researchMetrics.economicImpact.sharpeRatio} format="decimal" />
                    <MetricCard label="Alpha" value={researchMetrics.economicImpact.alphaGeneration} format="percent" />
                    <MetricCard label="Portfolio Size" value={3} format="number" suffix=" strategies" />
                  </>
                )}
                {selectedMetric === 'detection' && (
                  <>
                    <MetricCard label="GPT-3.5 Detection" value={researchMetrics.aiDetection.gpt35Accuracy} format="percent" />
                    <MetricCard label="GPT-4 Detection" value={researchMetrics.aiDetection.gpt4Accuracy} format="percent" />
                    <MetricCard label="Human Baseline" value={researchMetrics.aiDetection.humanBaselineAccuracy} format="percent" />
                    <MetricCard label="Improvement" value={0.16} format="percent" suffix="pp" />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* Key Insights */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-4">Key Research Insights</h3>
              <div className="space-y-4">
                <InsightItem
                  icon="🧠"
                  title="AI Writing Detection"
                  description="ChatGPT embeddings can identify AI-generated patent text with 92% accuracy"
                />
                <InsightItem
                  icon="📈"
                  title="Predictive Power"
                  description="42% R-squared in predicting patent acceptance and economic value"
                />
                <InsightItem
                  icon="💰"
                  title="Market Impact"
                  description="6.6% annual abnormal returns from AI-optimized patent portfolios"
                />
                <InsightItem
                  icon="🚀"
                  title="Growing Trend"
                  description="AI-generated patents increased from 2.3% to 31.5% (2018-2024)"
                />
              </div>
            </div>

            {/* Data Scale */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-4">Research Scale</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Time Period</span>
                  <span className="text-white font-light">{researchMetrics.dataScale.timeRange}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total Patents</span>
                  <span className="text-white font-light">
                    {(researchMetrics.dataScale.totalPatents / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Training Set</span>
                  <span className="text-white font-light">
                    {(researchMetrics.dataScale.trainingSize / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Embedding Dims</span>
                  <span className="text-white font-light">
                    {researchMetrics.dataScale.embeddingDimension}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function MetricCard({ label, value, format, suffix = '' }: {
  label: string;
  value: number;
  format: 'percent' | 'decimal' | 'number';
  suffix?: string;
}) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const target = format === 'percent' ? value * 100 : value;
    const interval = setInterval(() => {
      setAnimated(prev => {
        const diff = target - prev;
        return prev + diff * 0.1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [value, format]);

  return (
    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4">
      <div className="text-sm text-white/60 mb-1">{label}</div>
      <div className="text-2xl font-light text-white">
        {format === 'percent' ? `${animated.toFixed(0)}%` : 
         format === 'decimal' ? animated.toFixed(2) : 
         animated.toFixed(0)}
        {suffix}
      </div>
    </div>
  );
}

function InsightItem({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex space-x-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="font-medium text-white mb-1">{title}</div>
        <div className="text-sm text-white/60 leading-relaxed">{description}</div>
      </div>
    </div>
  );
}