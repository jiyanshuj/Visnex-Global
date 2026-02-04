import React, { useState } from 'react';
import { Search, Calculator, FileText, Book, Users, Calendar, ClipboardCheck, Rocket, TrendingUp, Scale, DollarSign, BarChart3, Download, ArrowRight, Clock, User, Star } from 'lucide-react';

const GrowthTools = ({ setCurrentPage }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterSections = {
    all: ['calculators', 'templates', 'guides', 'mentors', 'events', 'assessments'],
    calculators: ['calculators'],
    templates: ['templates'],
    guides: ['guides'],
    mentorship: ['mentors'],
    events: ['events'],
    assessments: ['assessments']
  };

  const isVisible = (sectionName) => {
    return filterSections[activeFilter]?.includes(sectionName) || false;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-950 to-black text-white py-20 px-4 border-b border-orange-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.05),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Rocket className="text-orange-500 mr-3" size={28} />
            <span className="text-orange-500 font-semibold text-lg">Accelerate Your Growth Journey</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Growth Tools & Resources
          </h1>

          <p className="text-xl text-center max-w-4xl mx-auto text-gray-400 leading-relaxed">
            Access comprehensive calculators, templates, and expert guidance to accelerate your startup's growth trajectory. From financial planning to strategic partnerships, everything you need is here.
          </p>
        </div>

        {/* Category Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 relative z-10">
          <CategoryCard
            icon={<Calculator size={36} />}
            title="Calculators"
            count="12 Resources"
          />
          <CategoryCard
            icon={<FileText size={36} />}
            title="Templates"
            count="45 Resources"
          />
          <CategoryCard
            icon={<Book size={36} />}
            title="Guides"
            count="28 Resources"
          />
          <CategoryCard
            icon={<Users size={36} />}
            title="Mentorship"
            count="15 Resources"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-950 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<FileText />} number="100+" label="Total Resources" />
            <StatCard icon={<Users />} number="50+" label="Active Mentors" />
            <StatCard icon={<Calendar />} number="25+" label="Monthly Events" />
            <StatCard icon={<Rocket />} number="200+" label="Success Stories" />
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b bg-black sticky top-20 z-40 border-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'all' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <Search size={18} />
              All Resources
            </button>
            <button
              onClick={() => setActiveFilter('calculators')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'calculators' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <Calculator size={18} />
              Calculators
            </button>
            <button
              onClick={() => setActiveFilter('templates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'templates' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <FileText size={18} />
              Templates
            </button>
            <button
              onClick={() => setActiveFilter('guides')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'guides' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <Book size={18} />
              Guides
            </button>
            <button
              onClick={() => setActiveFilter('mentorship')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'mentorship' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <Users size={18} />
              Mentorship
            </button>
            <button
              onClick={() => setActiveFilter('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'events' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <Calendar size={18} />
              Events
            </button>
            <button
              onClick={() => setActiveFilter('assessments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${activeFilter === 'assessments' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-900'
                }`}
            >
              <ClipboardCheck size={18} />
              Assessments
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-black">
        {/* Calculators & Tools */}
        {isVisible('calculators') && (
          <Section title="Calculators & Tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CalculatorCard
                icon={<Calculator />}
                title="Startup Valuation Calculator"
                description="Estimate your startup's current valuation using multiple methodologies and market comparables."
                popular
              />
              <CalculatorCard
                icon={<BarChart3 />}
                title="Runway Calculator"
                description="Calculate how long your current funding will last based on burn rate and revenue projections."
                popular
              />
              <CalculatorCard
                icon={<Scale />}
                title="Equity Distribution Tool"
                description="Plan fair equity distribution among founders, employees, and investors with vesting schedules."
              />
              <CalculatorCard
                icon={<DollarSign />}
                title="CAC & LTV Calculator"
                description="Measure customer acquisition cost and lifetime value to optimize your growth strategy."
                popular
              />
            </div>
          </Section>
        )}

        {/* Templates & Documents */}
        {isVisible('templates') && (
          <Section title="Templates & Documents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TemplateCard
                title="Investor Pitch Deck Template"
                description="Professional pitch deck template with proven structure used by..."
                downloads="15,420"
                type="PPTX"
              />
              <TemplateCard
                title="Financial Model Template"
                description="Comprehensive 3-year financial projection model with revenue,..."
                downloads="12,350"
                type="XLSX"
              />
              <TemplateCard
                title="Business Plan Template"
                description="Complete business plan framework covering market analysis, strateg..."
                downloads="18,900"
                type="DOCX"
              />
              <TemplateCard
                title="OKR Planning Template"
                description="Objectives and Key Results framework to align your team and..."
                downloads="9,870"
                type="XLSX"
              />
            </div>
          </Section>
        )}

        {/* Expert Guides */}
        {isVisible('guides') && (
          <Section title="Expert Guides">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GuideCard
                image="/api/placeholder/400/250"
                category="Funding"
                title="Complete Guide to Seed Funding"
                description="Everything you need to know about raising your first round of funding..."
                author="Sarah Chen"
                readTime="15 min read"
              />
              <GuideCard
                image="/api/placeholder/400/250"
                category="Team Building"
                title="Building a High-Performance Team"
                description="Proven strategies for recruiting, onboarding, and retaining top tale..."
                author="Michael Rodriguez"
                readTime="12 min read"
              />
              <GuideCard
                image="/api/placeholder/400/250"
                category="Product"
                title="Product-Market Fit Framework"
                description="Step-by-step methodology to validate your product idea and..."
                author="Emily Watson"
                readTime="18 min read"
              />
              <GuideCard
                image="/api/placeholder/400/250"
                category="Operations"
                title="Scaling Your Startup Operations"
                description="Operational best practices and systems to scale from 10 to 100+..."
                author="David Kim"
                readTime="20 min read"
              />
            </div>
          </Section>
        )}

        {/* Connect with Mentors */}
        {isVisible('mentors') && (
          <Section title="Connect with Mentors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MentorCard
                name="Jennifer Martinez"
                title="Former VP of Product at TechCorp"
                expertise={["Product Strategy", "User Experience", "Growth Hacking"]}
                sessions="127"
                rating="4.9"
              />
              <MentorCard
                name="Robert Thompson"
                title="Serial Entrepreneur & Angel Investor"
                expertise={["Fundraising", "Business Model", "Market Strategy"]}
                sessions="203"
                rating="5"
              />
              <MentorCard
                name="Priya Sharma"
                title="Head of Engineering at StartupX"
                expertise={["Technical Architecture", "Team Building", "Agile Development"]}
                sessions="89"
                rating="4.8"
              />
              <MentorCard
                name="Marcus Johnson"
                title="CMO & Growth Advisor"
                expertise={["Digital Marketing", "Brand Strategy", "Customer Acquisition"]}
                sessions="156"
                rating="4.9"
              />
            </div>
          </Section>
        )}

        {/* Upcoming Events */}
        {isVisible('events') && (
          <Section title="Upcoming Events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <EventCard
                date="Jan 25, 2026"
                time="2:00 PM EST • 90 min"
                type="Webinar"
                title="Mastering Investor Pitches"
                description="Learn how to craft and deliver compelling pitches that capture..."
                speaker="Alex Rivera"
                registered="342"
              />
              <EventCard
                date="Jan 28, 2026"
                time="11:00 AM EST • 2 hours"
                type="Workshop"
                title="Building Scalable Tech Infrastructure"
                description="Technical workshop on architecting systems that grow with your start..."
                speaker="Dr. Lisa Chen"
                registered="156"
              />
              <EventCard
                date="Feb 2, 2026"
                time="3:00 PM EST • 60 min"
                type="Webinar"
                title="Growth Marketing Strategies 2026"
                description="Latest growth hacking techniques and marketing channels that are..."
                speaker="Tom Anderson"
                registered="489"
              />
              <EventCard
                date="Feb 5, 2026"
                time="1:00 PM EST • 75 min"
                type="AMA"
                title="Legal Essentials for Startups"
                description="Navigate incorporation, contracts, IP protection, and compliance wit..."
                speaker="Sarah Williams, Esq."
                registered="267"
              />
            </div>
          </Section>
        )}

        {/* Self-Assessment Tools */}
        {isVisible('assessments') && (
          <Section title="Self-Assessment Tools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AssessmentCard
                category="General"
                title="Startup Readiness Assessment"
                description="Evaluate your startup's readiness across product, market, team, an..."
                questions="25"
                duration="15 min"
                completed="3420"
              />
              <AssessmentCard
                category="Funding"
                title="Investor Compatibility Quiz"
                description="Discover which types of investors align best with your startup stage,..."
                questions="18"
                duration="10 min"
                completed="2890"
              />
              <AssessmentCard
                category="Product"
                title="Product-Market Fit Scorecard"
                description="Measure your current product-market fit and identify areas for..."
                questions="30"
                duration="20 min"
                completed="4150"
              />
              <AssessmentCard
                category="Strategy"
                title="Growth Stage Diagnostic"
                description="Determine your startup's current growth stage and get customized..."
                questions="22"
                duration="12 min"
                completed="1980"
              />
            </div>
          </Section>
        )}
        <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-red-500">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Rocket className="mr-2" size={20} />
              <span className="text-white font-semibold">Ready to Accelerate?</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Thousands of Growing Startups
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Access exclusive resources, connect with expert mentors, and accelerate your growth journey with Visnex Global.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-orange-500 font-bold px-8 py-4 rounded-lg hover:bg-gray-900 transition-all flex items-center justify-center group">
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button onClick={() => setCurrentPage('success-stories')} className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-all">
                View Success Stories
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Component Definitions

const CategoryCard = ({ icon, title, count }) => (
  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30 hover:border-orange-500 transition-all cursor-pointer hover:scale-105">
    <div className="text-orange-500 mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{count}</p>
  </div>
);

const StatCard = ({ icon, number, label }) => (
  <div className="bg-gray-900 rounded-2xl p-6 text-center border border-orange-500/20 hover:border-orange-500/40 transition-all">
    <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
      {icon}
    </div>
    <div className="text-3xl font-bold text-white mb-2">{number}</div>
    <div className="text-gray-400">{label}</div>
  </div>
);

const Section = ({ title, children }) => (
  <section className="mb-16">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <button className="text-orange-500 font-semibold flex items-center hover:text-orange-400 transition-colors">
        View All
        <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
    {children}
  </section>
);

const CalculatorCard = ({ icon, title, description, popular }) => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer group relative">
    {popular && (
      <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
        Popular
      </div>
    )}
    <div className="bg-orange-500/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 mb-6 text-sm leading-relaxed">{description}</p>
    <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
      Use Calculator
    </button>
  </div>
);

const TemplateCard = ({ title, description, downloads, type }) => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer group">
    <div className="flex items-start justify-between mb-4">
      <div className="bg-gray-800 p-3 rounded-lg">
        <FileText className="text-orange-500" size={24} />
      </div>
      <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded">
        {type}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <Download size={16} className="mr-2" />
      {downloads} downloads
    </div>
    <button className="w-full border-2 border-orange-500 text-orange-500 font-bold py-3 rounded-lg hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center">
      <Download size={18} className="mr-2" />
      Download Template
    </button>
  </div>
);

const GuideCard = ({ image, category, title, description, author, readTime }) => (
  <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer group">
    <div className="relative h-48 bg-gray-800 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-4 left-4">
        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>By {author}</span>
        <span className="flex items-center">
          <Clock size={14} className="mr-1" />
          {readTime}
        </span>
      </div>
      <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
        <Book size={18} className="mr-2" />
        Read Guide
      </button>
    </div>
  </div>
);

const MentorCard = ({ name, title, expertise, sessions, rating }) => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-16 h-16 bg-gray-800 rounded-full flex-shrink-0"></div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      {expertise.map((skill, idx) => (
        <span key={idx} className="inline-block bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-2">
          {skill}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
      <span className="flex items-center">
        <Users size={16} className="mr-1" />
        {sessions} sessions
      </span>
      <span className="flex items-center font-semibold">
        <Star size={16} className="mr-1 text-yellow-500 fill-yellow-500" />
        {rating}
      </span>
    </div>
    <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors">
      Connect with Mentor
    </button>
  </div>
);

const EventCard = ({ date, time, type, title, description, speaker, registered }) => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center text-sm text-gray-400">
        <Calendar size={16} className="mr-2 text-orange-500" />
        {date}
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${type === 'Webinar' ? 'bg-orange-500/20 text-orange-400' :
          type === 'Workshop' ? 'bg-purple-500/20 text-purple-400' :
            'bg-blue-500/20 text-blue-400'
        }`}>
        {type}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
    <div className="space-y-2 text-sm text-gray-400 mb-4">
      <div className="flex items-center">
        <Clock size={14} className="mr-2" />
        {time}
      </div>
      <div className="flex items-center">
        <User size={14} className="mr-2" />
        Speaker: {speaker}
      </div>
      <div className="flex items-center">
        <Users size={14} className="mr-2" />
        {registered} registered
      </div>
    </div>
    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
      Register for Event
    </button>
  </div>
);

const AssessmentCard = ({ category, title, description, questions, duration, completed }) => (
  <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all cursor-pointer">
    <div className="flex items-start justify-between mb-4">
      <div className="bg-green-500/10 p-3 rounded-lg">
        <ClipboardCheck className="text-green-500" size={24} />
      </div>
      <span className="bg-gray-800 text-gray-300 text-xs font-semibold px-3 py-1 rounded">
        {category}
      </span>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{questions}</div>
        <div className="text-xs text-gray-400">Questions</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{duration}</div>
        <div className="text-xs text-gray-400">Duration</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-white">{completed}</div>
        <div className="text-xs text-gray-400">Completed</div>
      </div>
    </div>
    <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
      <TrendingUp size={18} className="mr-2" />
      Start Assessment
    </button>
  </div>
);

export default GrowthTools;
