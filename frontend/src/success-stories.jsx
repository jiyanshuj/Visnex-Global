import React, { useState, useMemo } from 'react';
import {
  DollarSign, TrendingUp, Users, Globe, Handshake, Search,
  Play, ArrowRight, ChevronLeft, ChevronRight, Star,
  Calendar, CheckCircle, Briefcase, Zap, Clock, Truck,
  FileText, Eye, Trophy
} from 'lucide-react';
import successStoriesData from './successStoriesData.json';

const SuccessStoriesPage = ({ setCurrentPage }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState('all');

  // Filter stories
  const filteredStories = useMemo(() => {
    return successStoriesData.stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = selectedIndustry === 'all' || story.industry === successStoriesData.filters.industries.find(i => i.value === selectedIndustry)?.label;
      const matchesStage = selectedStage === 'all' || story.stage === successStoriesData.filters.stages.find(s => s.value === selectedStage)?.label;
      const matchesAchievement = selectedAchievement === 'all' || story.achievement === successStoriesData.filters.achievements.find(a => a.value === selectedAchievement)?.label;

      return matchesSearch && matchesIndustry && matchesStage && matchesAchievement;
    });
  }, [searchQuery, selectedIndustry, selectedStage, selectedAchievement]);

  const iconMap = {
    'dollar': DollarSign,
    'trending-up': TrendingUp,
    'users': Users,
    'globe': Globe,
    'handshake': Handshake,
    'briefcase': Briefcase,
    'zap': Zap,
    'clock': Clock,
    'truck': Truck,
    'star': Star,
    'file-text': FileText,
    'eye': Eye,
    'trophy': Trophy
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % successStoriesData.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + successStoriesData.testimonials.length) % successStoriesData.testimonials.length);
  };

  const getStageColor = (stage) => {
    const colors = {
      'Seed': 'bg-green-500/20 text-green-400',
      'Series A': 'bg-blue-500/20 text-blue-400',
      'Series B': 'bg-purple-500/20 text-purple-400'
    };
    return colors[stage] || 'bg-gray-700 text-gray-300';
  };

  const getAchievementColor = (achievement) => {
    const colors = {
      'Funding Success': 'text-orange-600',
      'Partnership': 'text-orange-600',
      'Market Expansion': 'text-orange-600',
      'User Growth': 'text-orange-600'
    };
    return colors[achievement] || 'text-orange-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 via-orange-500/10 to-gray-900/50 border-y border-orange-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {successStoriesData.stats.map((stat) => {
              const IconComponent = iconMap[stat.icon];
              return (
                <div key={stat.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-orange-500/30 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/60 transition-all duration-300 backdrop-blur-sm group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500/30 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:from-orange-500/50 group-hover:to-orange-600/30 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" />}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                  <div className="flex items-center gap-1 text-sm text-orange-400 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change} {stat.period}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Testimonials */}
      <section className="py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-10 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-white">Founder Testimonials</h2>
          </div>

          <div className="relative">
            <div className="flex items-center gap-12">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 rounded-full border-4 border-white overflow-hidden shadow-2xl hover:shadow-white/50 transition-all duration-300">
                  <img
                    src={successStoriesData.testimonials[currentTestimonial].avatar}
                    alt={successStoriesData.testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {successStoriesData.testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-gray-300 mb-1">
                    {successStoriesData.testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-white/90 mb-1">
                    {successStoriesData.testimonials[currentTestimonial].company}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {[...Array(successStoriesData.testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-white text-white" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1">
                <div className="relative">
                  <svg className="w-12 h-12 text-orange-400/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-2xl text-white leading-relaxed mb-6">
                    {successStoriesData.testimonials[currentTestimonial].quote}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex gap-2">
                {successStoriesData.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${index === currentTestimonial ? 'w-8 bg-orange-500' : 'w-2 bg-white/30'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Gallery */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-orange-400 text-sm font-semibold">Real Impact Stories</span>
            </div>
            <h2 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-orange-200 to-orange-300 bg-clip-text text-transparent">Success Stories That Inspire</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Real founders, real results. Discover how startups like yours achieved remarkable growth through strategic connections on Visnestors.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-12">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search success stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {successStoriesData.filters.industries.map((industry) => (
                <option key={industry.value} value={industry.value}>
                  {industry.label} {industry.count ? `(${industry.count})` : ''}
                </option>
              ))}
            </select>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {successStoriesData.filters.stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label} {stage.count ? `(${stage.count})` : ''}
                </option>
              ))}
            </select>
            <select
              value={selectedAchievement}
              onChange={(e) => setSelectedAchievement(e.target.value)}
              className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {successStoriesData.filters.achievements.map((achievement) => (
                <option key={achievement.value} value={achievement.value}>
                  {achievement.label} {achievement.count ? `(${achievement.count})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <div key={story.id} className="group">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.company}
                      className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-700"
                    />
                    {story.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Featured Success
                      </div>
                    )}
                    {story.hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Founder info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center gap-3">
                        <img
                          src={story.founder.logo}
                          alt={story.company}
                          className="w-12 h-12 rounded-lg bg-white"
                        />
                        <div>
                          <h3 className="text-white font-bold text-lg">{story.company}</h3>
                          <p className="text-white/90 text-sm">{story.founder.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    {/* Tags */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 text-sm text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                          <Briefcase className="w-4 h-4" />
                          <span>{story.industry}</span>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStageColor(story.stage)}`}>
                          {story.stage}
                        </span>
                      </div>

                      <div className={`flex items-center gap-1 text-sm font-semibold mb-4 ${getAchievementColor(story.achievement)} bg-orange-500/10 px-3 py-1.5 rounded-lg w-fit`}>
                        <Trophy className="w-4 h-4" />
                        <span>{story.achievement}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-orange-300 transition-colors">
                        {story.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {story.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-700/50 group-hover:border-orange-500/30 transition-colors">
                        {story.metrics.map((metric, index) => {
                          const IconComponent = iconMap[metric.icon];
                          return (
                            <div key={index} className="text-center">
                              <div className="flex items-center justify-center mb-1">
                                {IconComponent && <IconComponent className="w-4 h-4 text-orange-500" />}
                              </div>
                              <div className="text-lg font-bold text-white">{metric.value}</div>
                              <div className="text-xs text-gray-400">{metric.label}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Connected: {story.timeline.connected}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-orange-400" />
                          <span>Success: {story.timeline.success}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                        Read Full Story
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Your Story CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm">{successStoriesData.submitCTA.badge}</span>
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                {successStoriesData.submitCTA.title}
              </h2>

              <p className="text-xl text-white/90 mb-8">
                {successStoriesData.submitCTA.description}
              </p>

              <div className="space-y-3 mb-8">
                {successStoriesData.submitCTA.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-orange-50 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 shadow-lg group/submit">
                Submit Your Story
                <ArrowRight className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {successStoriesData.submitCTA.stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon];
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Sparkles icon component
const Sparkles = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
  </svg>
);

export default SuccessStoriesPage;
