'use client';

import React, { useState } from 'react';
import { aiDetectionExamples, AIDetectionExample } from '@/data/samplePatents';

interface ConfidenceMeterProps {
  confidence: number;
  label: string;
  isAI?: boolean;
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ confidence, label, isAI = false }) => {
  const percentage = confidence * 100;
  const color = isAI ? '#FCA5A5' : '#86EFAC';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="text-sm font-light" style={{ color }}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="w-full backdrop-blur-sm bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundImage: isAI 
              ? 'linear-gradient(to right, #F87171, #EF4444)' 
              : 'linear-gradient(to right, #4ADE80, #10B981)'
          }}
        />
      </div>
    </div>
  );
};

const AIDetectionDemo: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<AIDetectionExample>(aiDetectionExamples[0]);
  const [showingVersion, setShowingVersion] = useState<'human' | 'ai'>('human');
  const [highlightingEnabled, setHighlightingEnabled] = useState(true);

  const renderTextWithHighlights = (text: string) => {
    if (!highlightingEnabled || showingVersion !== 'ai') {
      return <span>{text}</span>;
    }

    let highlightedText = text;
    selectedExample.highlightedPhrases.forEach(phrase => {
      if (phrase.isAICharacteristic) {
        const regex = new RegExp(`(${phrase.text})`, 'gi');
        highlightedText = highlightedText.replace(
          regex,
          `<mark class="bg-yellow-400/30 px-1 rounded backdrop-blur-sm" title="${phrase.explanation}">$1</mark>`
        );
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4">
            AI Detection System
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore our capability to distinguish between human and AI-generated patent text
          </p>
        </div>

        {/* Example Selection */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 mb-8">
          <label className="block text-sm font-medium text-white/80 mb-3">Select an Example</label>
          <select
            className="w-full p-4 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300"
            value={selectedExample.id}
            onChange={(e) => setSelectedExample(aiDetectionExamples.find(ex => ex.id === e.target.value) || aiDetectionExamples[0])}
          >
            {aiDetectionExamples.map(example => (
              <option key={example.id} value={example.id} className="bg-gray-800">
                {example.title} ({example.aiModel})
              </option>
            ))}
          </select>
        </div>

        {/* Main Detection Interface */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-medium text-white mb-2">{selectedExample.title}</h3>
            <p className="text-sm text-white/60">AI Model: {selectedExample.aiModel}</p>
          </div>

          {/* Version Toggle */}
          <div className="flex items-center justify-center mb-6">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-1 flex border border-white/20">
              <button
                onClick={() => setShowingVersion('human')}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  showingVersion === 'human'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Human Version
              </button>
              <button
                onClick={() => setShowingVersion('ai')}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  showingVersion === 'ai'
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                AI Version
              </button>
            </div>
          </div>

          {/* Text Display */}
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="prose max-w-none">
              {showingVersion === 'human' ? (
                <p className="text-white/80 leading-relaxed">{selectedExample.humanVersion}</p>
              ) : (
                <p className="text-white/80 leading-relaxed">
                  {renderTextWithHighlights(selectedExample.aiVersion)}
                </p>
              )}
            </div>
          </div>

          {/* Highlighting Toggle */}
          {showingVersion === 'ai' && (
            <div className="flex items-center justify-end mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highlightingEnabled}
                  onChange={(e) => setHighlightingEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div className="relative">
                  <div className={`block w-14 h-8 rounded-full transition-colors ${
                    highlightingEnabled ? 'bg-white/30' : 'bg-white/10'
                  }`} />
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                    highlightingEnabled ? 'transform translate-x-6' : ''
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium text-white/80">
                  Show AI-characteristic phrases
                </span>
              </label>
            </div>
          )}

          {/* Confidence Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConfidenceMeter
              confidence={selectedExample.humanConfidence}
              label="Human-written Confidence"
              isAI={false}
            />
            <ConfidenceMeter
              confidence={selectedExample.aiConfidence}
              label="AI-generated Confidence"
              isAI={true}
            />
          </div>
        </div>

        {/* Analysis Details */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-medium text-white mb-6">Detection Analysis</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Characteristics */}
            <div>
              <h4 className="font-medium text-white mb-4">AI-Characteristic Phrases</h4>
              <div className="space-y-3">
                {selectedExample.highlightedPhrases.filter(p => p.isAICharacteristic).map((phrase, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-1.5 mr-3" />
                    <div>
                      <span className="font-medium text-white">&ldquo;{phrase.text}&rdquo;</span>
                      <p className="text-sm text-white/60 mt-1">{phrase.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detection Metrics */}
            <div>
              <h4 className="font-medium text-white mb-4">Detection Metrics</h4>
              <div className="space-y-4">
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">Model Confidence</span>
                    <span className="font-light text-white">
                      {Math.max(selectedExample.humanConfidence, selectedExample.aiConfidence) * 100}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/60">Detection Result</span>
                    <span className={`font-light ${
                      selectedExample.aiConfidence > selectedExample.humanConfidence ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedExample.aiConfidence > selectedExample.humanConfidence ? 'AI-Generated' : 'Human-Written'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Certainty Level</span>
                    <span className="font-light text-white">
                      {Math.abs(selectedExample.aiConfidence - selectedExample.humanConfidence) > 0.2 ? 'High' : 'Medium'}
                    </span>
                  </div>
                </div>

                <div className="backdrop-blur-sm bg-blue-400/10 rounded-2xl p-4 border border-blue-400/20">
                  <p className="text-sm text-blue-300">
                    <strong>Note:</strong> This detection is based on linguistic patterns and writing styles 
                    characteristic of {selectedExample.aiModel}. Detection accuracy varies with model version 
                    and text complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDetectionDemo;