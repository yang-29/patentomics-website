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
            stroke="#E5E7EB"
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
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{animatedScore}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-600">{label}</span>
    </div>
  );
};

const PatentQualityAnalyzer: React.FC = () => {
  const [selectedPatent, setSelectedPatent] = useState<Patent>(samplePatents[0]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparePatent, setComparePatent] = useState<Patent>(samplePatents[2]);

  const getQualityColor = (score: number) => {
    if (score >= 80) return '#10B981'; // green
    if (score >= 60) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const getQualityLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Patent Quality Analyzer Demo</h2>
        <p className="text-gray-600">Explore our AI-powered patent quality assessment capabilities</p>
      </div>

      {/* Patent Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select a Patent to Analyze</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedPatent.id}
          onChange={(e) => setSelectedPatent(samplePatents.find(p => p.id === e.target.value) || samplePatents[0])}
        >
          {samplePatents.map(patent => (
            <option key={patent.id} value={patent.id}>
              {patent.title} (Score: {patent.qualityScore})
            </option>
          ))}
        </select>
      </div>

      {/* Main Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedPatent.title}</h3>
          <p className="text-sm text-gray-500">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {(selectedPatent.acceptanceProbability * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-600">Acceptance Probability</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{selectedPatent.citationCount}</p>
            <p className="text-sm text-gray-600">Expected Citations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              ${(selectedPatent.economicValue / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-gray-600">Economic Value</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {getQualityLabel(selectedPatent.qualityScore)}
            </p>
            <p className="text-sm text-gray-600">Quality Rating</p>
          </div>
        </div>

        {/* Abstract */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-900 mb-2">Abstract</h4>
          <p className="text-gray-600 leading-relaxed">{selectedPatent.abstract}</p>
        </div>
      </div>

      {/* Comparison Tool */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Patent Comparison Tool</h3>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showComparison ? 'Hide Comparison' : 'Compare Patents'}
          </button>
        </div>

        {showComparison && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Compare with:</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={comparePatent.id}
                onChange={(e) => setComparePatent(samplePatents.find(p => p.id === e.target.value) || samplePatents[0])}
              >
                {samplePatents.filter(p => p.id !== selectedPatent.id).map(patent => (
                  <option key={patent.id} value={patent.id}>
                    {patent.title} (Score: {patent.qualityScore})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patent 1 */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">{selectedPatent.title}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall Quality</span>
                    <span className={`font-bold ${selectedPatent.qualityScore >= comparePatent.qualityScore ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPatent.qualityScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Writing Quality</span>
                    <span className={`font-bold ${selectedPatent.writingQuality >= comparePatent.writingQuality ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPatent.writingQuality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Technology Quality</span>
                    <span className={`font-bold ${selectedPatent.technologyQuality >= comparePatent.technologyQuality ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPatent.technologyQuality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Citations</span>
                    <span className={`font-bold ${selectedPatent.citationCount >= comparePatent.citationCount ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedPatent.citationCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economic Value</span>
                    <span className={`font-bold ${selectedPatent.economicValue >= comparePatent.economicValue ? 'text-green-600' : 'text-red-600'}`}>
                      ${(selectedPatent.economicValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              </div>

              {/* Patent 2 */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">{comparePatent.title}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall Quality</span>
                    <span className={`font-bold ${comparePatent.qualityScore >= selectedPatent.qualityScore ? 'text-green-600' : 'text-red-600'}`}>
                      {comparePatent.qualityScore}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Writing Quality</span>
                    <span className={`font-bold ${comparePatent.writingQuality >= selectedPatent.writingQuality ? 'text-green-600' : 'text-red-600'}`}>
                      {comparePatent.writingQuality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Technology Quality</span>
                    <span className={`font-bold ${comparePatent.technologyQuality >= selectedPatent.technologyQuality ? 'text-green-600' : 'text-red-600'}`}>
                      {comparePatent.technologyQuality}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Citations</span>
                    <span className={`font-bold ${comparePatent.citationCount >= selectedPatent.citationCount ? 'text-green-600' : 'text-red-600'}`}>
                      {comparePatent.citationCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Economic Value</span>
                    <span className={`font-bold ${comparePatent.economicValue >= selectedPatent.economicValue ? 'text-green-600' : 'text-red-600'}`}>
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
  );
};

export default PatentQualityAnalyzer;