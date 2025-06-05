export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="font-bold text-2xl text-gray-900 dark:text-white">
              Patentomics
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#research" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Research</a>
              <a href="#findings" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Findings</a>
              <a href="#tools" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Tools</a>
              <a href="#paper" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Paper</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Understanding Innovation Quality and Success<br />
            <span className="text-blue-600 dark:text-blue-400">with Large-Language Models</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Unstructured textual information is important for understanding innovation but challenging to study. 
            This research develops deep-learning predictive models incorporating ChatGPT textual embeddings 
            to access intricate information about patent quality, achieving 42% R-squared in predicting patent value.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#paper" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Read the Paper
            </a>
            <a href="#tools" className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg font-medium transition-colors">
              Explore Tools
            </a>
          </div>
        </div>

        {/* Key Findings */}
        <section id="findings" className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Key Research Findings
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">42%</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">R-squared Score</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our deep learning models achieve 42% R-squared in predicting patent value using ChatGPT embeddings.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">6.6%</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Annual Returns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Long-short portfolio based on AI-predicted patent quality generates 6.6% yearly abnormal returns.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">10pp</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Improvement</h3>
              <p className="text-gray-600 dark:text-gray-300">
                10 percentage point improvement in identifying the worst and best patent applications.
              </p>
            </div>
          </div>
        </section>

        {/* Research Overview */}
        <section id="research" className="mt-24">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Research Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  First study to systematically apply large language models to patent quality prediction, 
                  decomposing quality into writing and technological components.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Methodology</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Deep learning models incorporating ChatGPT textual embeddings analyze patent applications 
                  to predict success and economic value, providing new insights into innovation quality.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Impact</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Provides tools for enhanced corporate patenting policy, particularly benefiting smaller firms 
                  through AI-assisted patent application improvement.
                </p>
                
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Applications</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Novel patent valuation measure complementing existing methods, with applications in 
                  portfolio construction, innovation assessment, and policy analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="mt-24 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Author</h2>
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Stephen Yang</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Pace Academy</p>
            <a href="mailto:stephen.yang25@paceacademy.org" 
               className="text-blue-600 dark:text-blue-400 hover:underline">
              stephen.yang25@paceacademy.org
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
