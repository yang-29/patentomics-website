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
  const color = isAI ? '#EF4444' : '#10B981';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold" style={{ color }}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
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
          `<mark class="bg-yellow-200 px-1 rounded" title="${phrase.explanation}">$1</mark>`
        );
      }
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Detection Demo</h2>
        <p className="text-gray-600">Explore our capability to distinguish between human and AI-generated patent text</p>
      </div>

      {/* Example Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select an Example</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedExample.id}
          onChange={(e) => setSelectedExample(aiDetectionExamples.find(ex => ex.id === e.target.value) || aiDetectionExamples[0])}
        >
          {aiDetectionExamples.map(example => (
            <option key={example.id} value={example.id}>
              {example.title} ({example.aiModel})
            </option>
          ))}
        </select>
      </div>

      {/* Main Detection Interface */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedExample.title}</h3>
          <p className="text-sm text-gray-500">AI Model: {selectedExample.aiModel}</p>
        </div>

        {/* Version Toggle */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setShowingVersion('human')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                showingVersion === 'human'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Human Version
            </button>
            <button
              onClick={() => setShowingVersion('ai')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                showingVersion === 'ai'
                  ? 'bg-white text-gray-900 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              AI Version
            </button>
          </div>
        </div>

        {/* Text Display */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="prose max-w-none">
            {showingVersion === 'human' ? (
              <p className="text-gray-700 leading-relaxed">{selectedExample.humanVersion}</p>
            ) : (
              <p className="text-gray-700 leading-relaxed">
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
                  highlightingEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                  highlightingEnabled ? 'transform translate-x-6' : ''
                }`} />
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
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
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Detection Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Characteristics */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">AI-Characteristic Phrases</h4>
            <div className="space-y-3">
              {selectedExample.highlightedPhrases.filter(p => p.isAICharacteristic).map((phrase, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-1.5 mr-3" />
                  <div>
                    <span className="font-medium text-gray-900">&ldquo;{phrase.text}&rdquo;</span>
                    <p className="text-sm text-gray-600 mt-1">{phrase.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detection Metrics */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Detection Metrics</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Model Confidence</span>
                  <span className="font-bold text-gray-900">
                    {Math.max(selectedExample.humanConfidence, selectedExample.aiConfidence) * 100}%
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Detection Result</span>
                  <span className={`font-bold ${
                    selectedExample.aiConfidence > selectedExample.humanConfidence ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {selectedExample.aiConfidence > selectedExample.humanConfidence ? 'AI-Generated' : 'Human-Written'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Certainty Level</span>
                  <span className="font-bold text-gray-900">
                    {Math.abs(selectedExample.aiConfidence - selectedExample.humanConfidence) > 0.2 ? 'High' : 'Medium'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
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
  );
};

export default AIDetectionDemo;