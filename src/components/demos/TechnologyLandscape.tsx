'use client';

import React, { useState, useEffect, useRef } from 'react';
import { technologyNodes } from '@/data/samplePatents';

interface AnimatedNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  patents: number;
  growth: number;
  connections: string[];
  animatedSize: number;
  targetSize: number;
  pulsePhase: number;
}

export default function TechnologyLandscape() {
  const [selectedNode, setSelectedNode] = useState<typeof technologyNodes[0] | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<AnimatedNode[]>([]);

  // Initialize nodes with animation properties
  useEffect(() => {
    nodesRef.current = technologyNodes.map(node => ({
      ...node,
      animatedSize: 0,
      targetSize: node.size,
      pulsePhase: Math.random() * Math.PI * 2
    }));
  }, []);

  // Animation loop for smooth interactions
  useEffect(() => {
    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodesRef.current.forEach(node => {
        node.connections.forEach(targetId => {
          const target = nodesRef.current.find(n => n.id === targetId);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            
            // Create curved connection
            const midX = (node.x + target.x) / 2;
            const midY = (node.y + target.y) / 2;
            const curve = 20;
            
            ctx.quadraticCurveTo(
              midX + curve,
              midY - curve,
              target.x,
              target.y
            );
            
            ctx.strokeStyle = hoveredNode === node.id || hoveredNode === targetId 
              ? 'rgba(147, 197, 253, 0.6)' 
              : 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = hoveredNode === node.id || hoveredNode === targetId ? 2 : 1;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodesRef.current.forEach((node, index) => {
        // Animate size
        if (node.animatedSize < node.targetSize) {
          node.animatedSize += (node.targetSize - node.animatedSize) * 0.1;
        }

        // Pulse effect
        node.pulsePhase += 0.02;
        const pulse = Math.sin(node.pulsePhase) * 2;
        const size = node.animatedSize + (hoveredNode === node.id ? pulse : 0);

        // Draw node shadow (glow effect)
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size + 20
        );
        gradient.addColorStop(0, `rgba(147, 197, 253, ${node.growth > 0.5 ? 0.3 : 0.2})`);
        gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size + 20, 0, Math.PI * 2);
        ctx.fill();

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        
        // Glass effect gradient
        const nodeGradient = ctx.createRadialGradient(
          node.x - size/3, node.y - size/3, 0,
          node.x, node.y, size
        );
        
        if (node.growth > 0.5) {
          nodeGradient.addColorStop(0, 'rgba(134, 239, 172, 0.9)');
          nodeGradient.addColorStop(1, 'rgba(59, 130, 246, 0.7)');
        } else if (node.growth > 0.3) {
          nodeGradient.addColorStop(0, 'rgba(147, 197, 253, 0.9)');
          nodeGradient.addColorStop(1, 'rgba(99, 102, 241, 0.7)');
        } else {
          nodeGradient.addColorStop(0, 'rgba(253, 164, 175, 0.9)');
          nodeGradient.addColorStop(1, 'rgba(244, 114, 182, 0.7)');
        }
        
        ctx.fillStyle = nodeGradient;
        ctx.fill();
        
        // Glass rim
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw label on hover
        if (hoveredNode === node.id || selectedNode?.id === node.id) {
          ctx.font = '12px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + size + 20);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hoveredNode, selectedNode]);

  // Handle canvas interactions
  const handleCanvasMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = false;
    nodesRef.current.forEach(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (distance < node.size) {
        setHoveredNode(node.id);
        found = true;
      }
    });

    if (!found) {
      setHoveredNode(null);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    nodesRef.current.forEach(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (distance < node.size) {
        setSelectedNode(node);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-4">
            Technology Landscape Explorer
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Visualize patent clusters and innovation trends across technology domains
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Canvas */}
          <div className="lg:col-span-2">
            <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full rounded-2xl cursor-pointer"
                onMouseMove={handleCanvasMove}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={handleCanvasClick}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
              {/* Legend */}
              <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                  <span className="text-white/80">High Growth (&gt;50%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                  <span className="text-white/80">Medium Growth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-pink-500"></div>
                  <span className="text-white/80">Low Growth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Panel */}
          <div className="space-y-4">
            {selectedNode ? (
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
                <h3 className="text-2xl font-medium text-white mb-4">{selectedNode.label}</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Patent Count</div>
                    <div className="text-2xl font-light text-white">
                      {selectedNode.patents.toLocaleString()}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-white/60 mb-1">Growth Rate</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-light text-white">
                        {(selectedNode.growth * 100).toFixed(0)}%
                      </div>
                      <svg className={`w-5 h-5 ${selectedNode.growth > 0.5 ? 'text-green-400' : selectedNode.growth > 0.3 ? 'text-blue-400' : 'text-pink-400'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-white/60 mb-2">Connected Technologies</div>
                    <div className="space-y-2">
                      {selectedNode.connections.map(conn => {
                        const connNode = technologyNodes.find(n => n.id === conn);
                        return connNode ? (
                          <div key={conn} className="backdrop-blur-sm bg-white/5 rounded-xl px-3 py-2 text-sm text-white/80">
                            {connNode.label}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-medium text-white mb-2">Select a Technology</h3>
                <p className="text-white/60">
                  Click on any node in the visualization to see detailed information about that technology area.
                </p>
              </div>
            )}

            {/* Stats Overview */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-medium text-white mb-4">Overview Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Total Patents</span>
                  <span className="text-white font-light">
                    {technologyNodes.reduce((sum, node) => sum + node.patents, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Technology Areas</span>
                  <span className="text-white font-light">{technologyNodes.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Avg Growth Rate</span>
                  <span className="text-white font-light">
                    {(technologyNodes.reduce((sum, node) => sum + node.growth, 0) / technologyNodes.length * 100).toFixed(0)}%
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