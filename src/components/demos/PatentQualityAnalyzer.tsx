'use client';

import React, { useState, useEffect } from 'react';
import { samplePatents, Patent } from '@/data/samplePatents';

interface QualityGaugeProps {
  score: number;
  label: string;
  maxScore?: number;
  color?: string;
}

const QualityGauge: React.FC<QualityGaugeProps> = ({ score, label, maxScore = 100, color = '#3B82F6' }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (animatedScore / maxScore) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            className="transition-all duration-1000 ease-out drop-shadow-lg"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-light text-white">{animatedScore}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-white/80">{label}</span>
    </div>
  );
};

const PatentQualityAnalyzer: React.FC = () => {
  const [selectedPatent, setSelectedPatent] = useState<Patent>(samplePatents[0]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparePatent, setComparePatent] = useState<Patent>(samplePatents[2]);

  const getQualityColor = (score: number) => {
    if (score >= 80) return '#86EFAC'; // green
    if (score >= 60) return '#93C5FD'; // blue
    return '#FCA5A5'; // red
  };

  const getQualityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4">
            Patent Quality Analyzer
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore our AI-powered patent quality assessment capabilities
          </p>
        </div>

        {/* Patent Selection */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 mb-8">
          <label className="block text-sm font-medium text-white/80 mb-3">Select a Patent to Analyze</label>
          <select
            className="w-full p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300"
            value={selectedPatent.id}
            onChange={(e) => setSelectedPatent(samplePatents.find(p => p.id === e.target.value) || samplePatents[0])}
          >
            {samplePatents.map(patent => (
              <option key={patent.id} value={patent.id} className="bg-gray-800">
                {patent.title} (Score: {patent.qualityScore})
              </option>
            ))}
          </select>
        </div>

        {/* Main Analysis */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-medium text-white mb-2">{selectedPatent.title}</h3>
            <p className="text-sm text-white/60">
              Application: {selectedPatent.applicationNumber} | Filed: {selectedPatent.filingDate} | 
              Class: {selectedPatent.technologyClass} | Assignee: {selectedPatent.assignee}
            </p>
          </div>

        {/* Quality Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <QualityGauge
            score={selectedPatent.qualityScore}
            label="Overall Quality"
            color={getQualityColor(selectedPatent.qualityScore)}
          />
          <QualityGauge
            score={selectedPatent.writingQuality}
            label="Writing Quality"
            color={getQualityColor(selectedPatent.writingQuality)}
          />
          <QualityGauge
            score={selectedPatent.technologyQuality}
            label="Technology Quality"
            color={getQualityColor(selectedPatent.technologyQuality)}
          />
        </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
              <p className="text-2xl font-light text-white">
                {(selectedPatent.acceptanceProbability * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-white/60 mt-1">Acceptance Probability</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
              <p className="text-2xl font-light text-white">{selectedPatent.citationCount}</p>
              <p className="text-sm text-white/60 mt-1">Expected Citations</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
              <p className="text-2xl font-light text-white">
                ${(selectedPatent.economicValue / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-white/60 mt-1">Economic Value</p>
            </div>
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 transform hover:scale-105 transition-all duration-300">
              <p className="text-2xl font-light text-white">
                {getQualityLabel(selectedPatent.qualityScore)}
              </p>
              <p className="text-sm text-white/60 mt-1">Quality Rating</p>
            </div>
          </div>

          {/* Abstract */}
          <div className="mt-8">
            <h4 className="font-medium text-white mb-3">Abstract</h4>
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
              <p className="text-white/80 leading-relaxed">{selectedPatent.abstract}</p>
            </div>
          </div>
        </div>

        {/* Comparison Tool */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-medium text-white">Patent Comparison Tool</h3>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-6 py-3 backdrop-blur-sm bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all duration-300 border border-white/20"
            >
              {showComparison ? 'Hide Comparison' : 'Compare Patents'}
            </button>
          </div>

        {showComparison && (
          <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/80 mb-3">Compare with:</label>
                <select
                  className="w-full p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300"
                  value={comparePatent.id}
                  onChange={(e) => setComparePatent(samplePatents.find(p => p.id === e.target.value) || samplePatents[0])}
                >
                  {samplePatents.filter(p => p.id !== selectedPatent.id).map(patent => (
                    <option key={patent.id} value={patent.id} className="bg-gray-800">
                      {patent.title} (Score: {patent.qualityScore})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patent 1 */}
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="font-medium text-white mb-4">{selectedPatent.title}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Overall Quality</span>
                      <span className={`font-light ${selectedPatent.qualityScore >= comparePatent.qualityScore ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedPatent.qualityScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Writing Quality</span>
                      <span className={`font-light ${selectedPatent.writingQuality >= comparePatent.writingQuality ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedPatent.writingQuality}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Technology Quality</span>
                      <span className={`font-light ${selectedPatent.technologyQuality >= comparePatent.technologyQuality ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedPatent.technologyQuality}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Citations</span>
                      <span className={`font-light ${selectedPatent.citationCount >= comparePatent.citationCount ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedPatent.citationCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Economic Value</span>
                      <span className={`font-light ${selectedPatent.economicValue >= comparePatent.economicValue ? 'text-green-400' : 'text-red-400'}`}>
                        ${(selectedPatent.economicValue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patent 2 */}
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="font-medium text-white mb-4">{comparePatent.title}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Overall Quality</span>
                      <span className={`font-light ${comparePatent.qualityScore >= selectedPatent.qualityScore ? 'text-green-400' : 'text-red-400'}`}>
                        {comparePatent.qualityScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Writing Quality</span>
                      <span className={`font-light ${comparePatent.writingQuality >= selectedPatent.writingQuality ? 'text-green-400' : 'text-red-400'}`}>
                        {comparePatent.writingQuality}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Technology Quality</span>
                      <span className={`font-light ${comparePatent.technologyQuality >= selectedPatent.technologyQuality ? 'text-green-400' : 'text-red-400'}`}>
                        {comparePatent.technologyQuality}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Citations</span>
                      <span className={`font-light ${comparePatent.citationCount >= selectedPatent.citationCount ? 'text-green-400' : 'text-red-400'}`}>
                        {comparePatent.citationCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Economic Value</span>
                      <span className={`font-light ${comparePatent.economicValue >= selectedPatent.economicValue ? 'text-green-400' : 'text-red-400'}`}>
                        ${(comparePatent.economicValue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatentQualityAnalyzer;