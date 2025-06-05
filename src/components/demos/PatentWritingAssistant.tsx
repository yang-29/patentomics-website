'use client';

import React, { useState, useEffect } from 'react';
import { samplePatents, Patent } from '@/data/samplePatents';

interface ImprovementItemProps {
  improvement: string;
  index: number;
}

const ImprovementItem: React.FC<ImprovementItemProps> = ({ improvement, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`flex items-start transition-all duration-500 ${
      isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'
    }`}>
      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
        ✓
      </div>
      <p className="ml-3 text-white/80">{improvement}</p>
    </div>
  );
};

interface ScoreImprovementProps {
  label: string;
  before: number;
  after: number;
}

const ScoreImprovement: React.FC<ScoreImprovementProps> = ({ label, before, after }) => {
  const [currentScore, setCurrentScore] = useState(before);
  const improvement = after - before;
  const improvementPercentage = ((improvement / before) * 100).toFixed(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentScore(prev => {
          if (prev >= after) {
            clearInterval(interval);
            return after;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [after]);

  return (
    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
      <p className="text-sm text-white/60 mb-2">{label}</p>
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline">
          <span className="text-3xl font-light text-white">{currentScore}</span>
          <span className="text-lg text-white/60 ml-2">/ 100</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-green-400 font-light">+{improvementPercentage}%</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-white/40">
        {before} → {after} (+{improvement} points)
      </div>
    </div>
  );
};

const PatentWritingAssistant: React.FC = () => {
  const improvablePatents = samplePatents.filter(p => p.improvedVersion);
  const [selectedPatent, setSelectedPatent] = useState<Patent>(improvablePatents[0]);
  const [showImproved, setShowImproved] = useState(false);
  const [highlightChanges, setHighlightChanges] = useState(true);

  const getDiffHighlightedText = (original: string, improved: string) => {
    if (!highlightChanges) return improved;
    
    // Simple highlighting - in real implementation would use proper diff algorithm
    const words = improved.split(' ');
    const originalWords = original.split(' ');
    
    return words.map((word, index) => {
      if (!originalWords[index] || word !== originalWords[index]) {
        return `<span class="bg-green-400/30 px-1 rounded backdrop-blur-sm">${word}</span>`;
      }
      return word;
    }).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4">
            Patent Writing Assistant
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            See how AI can improve patent application quality and acceptance rates
          </p>
        </div>

        {/* Patent Selection */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 mb-8">
          <label className="block text-sm font-medium text-white/80 mb-3">Select a Patent to Improve</label>
          <select
            className="w-full p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300"
            value={selectedPatent.id}
            onChange={(e) => {
              setSelectedPatent(improvablePatents.find(p => p.id === e.target.value) || improvablePatents[0]);
              setShowImproved(false);
            }}
          >
            {improvablePatents.map(patent => (
              <option key={patent.id} value={patent.id} className="bg-gray-800">
                {patent.title} (Current Score: {patent.qualityScore})
              </option>
            ))}
          </select>
        </div>

        {/* Before/After Comparison */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-medium text-white mb-2">{selectedPatent.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <span>Application: {selectedPatent.applicationNumber}</span>
              <span>•</span>
              <span>Filed: {selectedPatent.filingDate}</span>
              <span>•</span>
              <span>Assignee: {selectedPatent.assignee}</span>
            </div>
          </div>

          {/* Improvement Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowImproved(!showImproved)}
              className={`px-8 py-3 rounded-2xl font-medium transition-all duration-300 backdrop-blur-sm border ${
                showImproved
                  ? 'bg-green-400/20 text-white hover:bg-green-400/30 border-green-400/40'
                  : 'bg-white/20 text-white hover:bg-white/30 animate-pulse border-white/40'
              }`}
            >
              {showImproved ? '✓ Improvements Applied' : 'Apply AI Improvements'}
            </button>
          </div>

        {/* Score Improvements */}
        {showImproved && selectedPatent.improvedVersion && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <ScoreImprovement
              label="Overall Quality"
              before={selectedPatent.qualityScore}
              after={selectedPatent.improvedVersion.qualityScore}
            />
            <ScoreImprovement
              label="Writing Quality"
              before={selectedPatent.writingQuality}
              after={selectedPatent.improvedVersion.writingQuality}
            />
            <ScoreImprovement
              label="Technology Quality"
              before={selectedPatent.technologyQuality}
              after={selectedPatent.improvedVersion.technologyQuality}
            />
          </div>
        )}

          {/* Abstract Comparison */}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-white mb-3 flex items-center">
                {showImproved ? 'Original Abstract' : 'Current Abstract'}
                {showImproved && (
                  <span className="ml-2 px-2 py-1 backdrop-blur-sm bg-white/10 text-white/60 text-xs rounded-full">Before</span>
                )}
              </h4>
              <div className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 ${
                showImproved ? 'bg-white/5 opacity-60 border-white/10' : 'bg-white/10 border-white/20'
              }`}>
                <p className="text-white/80 leading-relaxed">{selectedPatent.abstract}</p>
              </div>
            </div>

            {showImproved && selectedPatent.improvedVersion && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white flex items-center">
                    Improved Abstract
                    <span className="ml-2 px-2 py-1 backdrop-blur-sm bg-green-400/20 text-green-400 text-xs rounded-full">After</span>
                  </h4>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={highlightChanges}
                      onChange={(e) => setHighlightChanges(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="relative">
                      <div className={`block w-10 h-6 rounded-full transition-colors ${
                        highlightChanges ? 'bg-white/30' : 'bg-white/10'
                      }`} />
                      <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        highlightChanges ? 'transform translate-x-4' : ''
                      }`} />
                    </div>
                    <span className="ml-2 text-sm text-white/60">Highlight changes</span>
                  </label>
                </div>
                <div className="backdrop-blur-sm bg-green-400/10 rounded-2xl p-6 border border-green-400/20">
                  <p 
                    className="text-white/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightChanges 
                        ? getDiffHighlightedText(selectedPatent.abstract, selectedPatent.improvedVersion.abstract)
                        : selectedPatent.improvedVersion.abstract
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Improvements List */}
        {showImproved && selectedPatent.improvedVersion && (
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-medium text-white mb-6">Key Improvements Made</h3>
            <div className="space-y-4">
              {selectedPatent.improvedVersion.improvements.map((improvement, index) => (
                <ImprovementItem key={index} improvement={improvement} index={index} />
              ))}
            </div>

            <div className="mt-8 backdrop-blur-sm bg-blue-400/10 rounded-2xl p-6 border border-blue-400/20">
              <h4 className="font-medium text-blue-300 mb-4">Expected Impact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-light text-white">
                    {((selectedPatent.improvedVersion.qualityScore / selectedPatent.qualityScore - 1) * 100).toFixed(0)}%
                  </p>
                  <p className="text-sm text-white/60">Quality Increase</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-white">
                    {(0.21 * (selectedPatent.improvedVersion.qualityScore / selectedPatent.qualityScore)).toFixed(0)}%
                  </p>
                  <p className="text-sm text-white/60">Higher Acceptance Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-light text-white">
                    ${((selectedPatent.economicValue * 1.5) / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-white/60">Potential Value</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatentWritingAssistant;