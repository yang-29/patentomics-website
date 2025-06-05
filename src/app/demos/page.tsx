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
  }
];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Demos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our AI-powered patent analysis capabilities through interactive demonstrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={demo.route}
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="text-5xl mb-4">{demo.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {demo.title}
                </h3>
                <p className="text-gray-600 mb-4">{demo.description}</p>
                
                <div className="space-y-2">
                  {demo.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About These Demos</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              These interactive demonstrations showcase the capabilities of our patentomics research. 
              Each demo uses pre-processed data and examples from our extensive analysis of over 2.3 million patents 
              spanning from 2004 to 2023.
            </p>
            <p className="mt-4">
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