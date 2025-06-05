import ResearchInsightsDashboard from '@/components/demos/ResearchInsightsDashboard';
import Link from 'next/link';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link 
              href="/demos"
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Demos
            </Link>
            <Link 
              href="/"
              className="text-white/80 hover:text-white transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
      
      <ResearchInsightsDashboard />
    </div>
  );
}