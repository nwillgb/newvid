import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Film,
  BarChart2,
  Calendar,
  Share2,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-purple-600 p-1">
              <span className="text-lg font-bold text-white">OA</span>
            </div>
            <span className="text-xl font-semibold text-white">
              OasisApps.ai
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                AI-Powered Video Content
                <span className="text-purple-500"> Automation</span>
              </h1>
              <p className="text-xl text-gray-400">
                Create, schedule, and publish engaging social media videos with
                the power of AI. No editing skills required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl p-1">
                <div className="bg-gray-900 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                    alt="AI Video Generation"
                    className="w-full h-auto rounded-t-xl"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Film className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">AI Video Generator</span>
                      </div>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                        Processing
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Generating video...</span>
                        <span>75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-xl">
                <div className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">
                    Auto-publishing to social media
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#1a1a1a]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to automate your social media content creation
              workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Video Generation</h3>
              <p className="text-gray-400">
                Create professional videos with AI-generated visuals,
                voiceovers, and subtitles in minutes.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Scheduling</h3>
              <p className="text-gray-400">
                Schedule content creation and publishing to maintain a
                consistent social media presence.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Multi-Platform Publishing
              </h3>
              <p className="text-gray-400">
                Automatically publish to YouTube Shorts, TikTok, and Instagram
                Reels with a single click.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Advanced AI Integration
              </h3>
              <p className="text-gray-400">
                Leverage OpenAI, ElevenLabs, and Pikapikapika APIs for
                high-quality content generation.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
              <p className="text-gray-400">
                Track engagement and performance metrics across all your social
                media platforms.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customizable Workflows</h3>
              <p className="text-gray-400">
                Create custom content categories and rendering styles to match
                your brand identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-2xl p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Automate Your Content?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are saving time and scaling their
              social media presence with OasisApps.ai
            </p>
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#1a1a1a] py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="rounded-md bg-purple-600 p-1">
                <span className="text-lg font-bold text-white">OA</span>
              </div>
              <span className="text-xl font-semibold text-white">
                OasisApps.ai
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2023 OasisApps.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
