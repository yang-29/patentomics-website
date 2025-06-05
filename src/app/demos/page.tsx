import Link from 'next/link';

const demos = [
  {
    id: 'quality-analyzer',
    title: 'Patent Quality Analyzer',
    description: 'AI-powered assessment of patent application quality with detailed scoring breakdowns',
    icon: '🎯',
    route: '/demos/quality-analyzer',
    metrics: ['42% R-squared', '89% accuracy', 'Real-time analysis']
  },
  {
    id: 'ai-detection',
    title: 'AI Detection System',
    description: 'Distinguish between human and AI-generated patent text with high confidence',
    icon: '🤖',
    route: '/demos/ai-detection',
    metrics: ['92% GPT-3.5 accuracy', '88% GPT-4 accuracy', 'Pattern analysis']
  },
  {
    id: 'writing-assistant',
    title: 'Patent Writing Assistant',
    description: 'Improve patent quality and acceptance rates with AI-powered suggestions',
    icon: '✏️',
    route: '/demos/writing-assistant',
    metrics: ['2x quality improvement', '21% higher acceptance', 'Instant feedback']
  },
  {
    id: 'technology-landscape',
    title: 'Technology Landscape Explorer',
    description: 'Visualize patent clusters and innovation trends across technology domains',
    icon: '🌐',
    route: '/demos/technology-landscape',
    metrics: ['10 tech domains', 'Real-time connections', 'Growth tracking']
  },
  {
    id: 'portfolio',
    title: 'Patent Portfolio Optimizer',
    description: 'Build and analyze AI-optimized patent portfolios for maximum returns',
    icon: '📊',
    route: '/demos/portfolio',
    metrics: ['6.6% annual returns', '1.24 Sharpe ratio', 'Risk analysis']
  },
  {
    id: 'insights',
    title: 'Research Insights Dashboard',
    description: 'Explore key findings and performance metrics from our patent quality research',
    icon: '📈',
    route: '/demos/insights',
    metrics: ['2.3M patents analyzed', 'AI trend tracking', 'Live metrics']
  }
];

export default function DemosPage() {
  return (
    <div className="min-h-screen gradient-mesh overflow-hidden">
      {/* Navigation */}
      <nav className="glass fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-2xl px-8 py-3 w-[90%] max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-white text-shadow">
            Patentomics Demos
          </div>
          <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-white mb-4 text-shadow">Interactive Demos</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Explore our AI-powered patent analysis capabilities through interactive demonstrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <Link
              key={demo.id}
              href={demo.route}
              className="group relative card-glass rounded-3xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-float"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8">
                <div className="text-5xl mb-4">{demo.icon}</div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {demo.title}
                </h3>
                <p className="text-white/70 mb-4">{demo.description}</p>
                
                <div className="space-y-2">
                  {demo.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
        </div>

        <div className="mt-16 card-glass rounded-3xl p-8">
          <h2 className="text-2xl font-light text-white mb-4">About These Demos</h2>
          <div className="text-white/70 space-y-4">
            <p>
              These interactive demonstrations showcase the capabilities of our patentomics research. 
              Each demo uses pre-processed data and examples from our extensive analysis of over 2.3 million patents 
              spanning from 2004 to 2023.
            </p>
            <p>
              Our machine learning models achieve a 42% R-squared in predicting patent quality and generate 
              6.6% abnormal returns in portfolio applications. These demos provide a glimpse into how AI 
              can revolutionize patent analysis and innovation assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}