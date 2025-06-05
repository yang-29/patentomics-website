import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen gradient-mesh overflow-hidden">
      {/* Navigation */}
      <nav className="glass fixed top-4 left-1/2 transform -translate-x-1/2 z-50 rounded-2xl px-8 py-3 w-[90%] max-w-4xl">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl text-white text-shadow">
            Patentomics
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#research" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Research</a>
            <a href="#findings" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Findings</a>
            <Link href="/demos" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Demos</Link>
            <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4482536" className="text-white/80 hover:text-white transition-colors text-sm font-medium">Paper</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-light text-white mb-8 text-shadow leading-tight">
            Understanding Innovation Quality<br />
            <span className="font-medium bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              with Large-Language Models
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Unstructured textual information is important for understanding innovation but challenging to study. 
            This research develops deep-learning predictive models incorporating ChatGPT textual embeddings.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4482536" target="_blank" rel="noopener noreferrer" className="card-glass hover:shadow-glass-lg text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105">
              Read the Paper
            </a>
            <Link href="/demos" className="glass hover:shadow-glass-lg border-white/20 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105">
              Interactive Demos
            </Link>
          </div>
        </div>

        {/* Key Findings */}
        <section id="findings" className="mb-24">
          <h2 className="text-4xl font-light text-center text-white mb-16 text-shadow">
            Key Research Findings
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-glass rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 animate-float">
              <div className="text-4xl font-light text-blue-200 mb-4">42%</div>
              <h3 className="text-xl font-medium text-white mb-4">R-squared Score</h3>
              <p className="text-white/70 leading-relaxed">
                Our deep learning models achieve 42% R-squared in predicting patent value using ChatGPT embeddings.
              </p>
            </div>
            
            <div className="card-glass rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 animate-float" style={{animationDelay: '0.5s'}}>
              <div className="text-4xl font-light text-green-200 mb-4">6.6%</div>
              <h3 className="text-xl font-medium text-white mb-4">Annual Returns</h3>
              <p className="text-white/70 leading-relaxed">
                Long-short portfolio based on AI-predicted patent quality generates 6.6% yearly abnormal returns.
              </p>
            </div>
            
            <div className="card-glass rounded-3xl p-8 transform hover:scale-105 transition-all duration-300 animate-float" style={{animationDelay: '1s'}}>
              <div className="text-4xl font-light text-purple-200 mb-4">10pp</div>
              <h3 className="text-xl font-medium text-white mb-4">Improvement</h3>
              <p className="text-white/70 leading-relaxed">
                10 percentage point improvement in identifying the worst and best patent applications.
              </p>
            </div>
          </div>
        </section>

        {/* Research Overview */}
        <section id="research" className="mb-24">
          <div className="card-glass rounded-3xl p-12 transform hover:scale-[1.02] transition-all duration-500">
            <h2 className="text-4xl font-light text-white mb-12 text-center">Research Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Innovation
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    First study to systematically apply large language models to patent quality prediction, 
                    decomposing quality into writing and technological components.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Methodology
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Deep learning models incorporating ChatGPT textual embeddings analyze patent applications 
                    to predict success and economic value, providing new insights into innovation quality.
                  </p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Impact
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Provides tools for enhanced corporate patenting policy, particularly benefiting smaller firms 
                    through AI-assisted patent application improvement.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Applications
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Novel patent valuation measure complementing existing methods, with applications in 
                    portfolio construction, innovation assessment, and policy analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="text-center">
          <div className="card-glass rounded-3xl p-12 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
            <h2 className="text-3xl font-light text-white mb-6">Author</h2>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-medium">
              SY
            </div>
            <h3 className="text-2xl font-medium text-white mb-2">Stephen Yang</h3>
            <p className="text-white/70 mb-6 text-lg">Pace Academy</p>
            <a href="mailto:stephen.yang25@paceacademy.org" 
               className="inline-flex items-center glass hover:shadow-glass px-6 py-3 rounded-2xl text-white/80 hover:text-white transition-all duration-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              stephen.yang25@paceacademy.org
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
