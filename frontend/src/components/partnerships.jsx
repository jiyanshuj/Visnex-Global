import React, { useState } from 'react';
import {
  Globe, Code, Megaphone, DollarSign, Truck, Beaker,
  TrendingUp, TrendingDown, Link2, Trophy, Clock,
  FileText, Scale, BarChart, Share2, Check, Heart,
  Filter, ArrowUpDown, Star, Play, Sparkles
} from 'lucide-react';
import partnershipsData from '../data/partnershipsData.json';

const PartnershipsPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortType, setSortType] = useState('newest');
  const [favorites, setFavorites] = useState(new Set());
  // Icon mapping
  const iconMap = {
    'globe': Globe,
    'code': Code,
    'megaphone': Megaphone,
    'dollar': DollarSign,
    'truck': Truck,
    'flask': Beaker,
    'link': Link2,
    'trophy': Trophy,
    'clock': Clock,
    'file-text': FileText,
    'scale': Scale,
    'bar-chart': BarChart,
    'share': Share2
  };

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : <Globe />;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      'orange': 'bg-orange-500',
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-500',
      'red': 'bg-red-500',
      'purple': 'bg-purple-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getIconBgColor = (color) => {
    const bgMap = {
      'orange': 'bg-orange-500/20 text-orange-400',
      'blue': 'bg-blue-500/20 text-blue-400',
      'green': 'bg-green-500/20 text-green-400',
      'yellow': 'bg-yellow-500/20 text-yellow-400',
      'red': 'bg-red-500/20 text-red-400',
      'purple': 'bg-purple-500/20 text-purple-400'
    };
    return bgMap[color] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a2332] via-[#2d3e5f] to-[#3d5a8c] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/30 bg-white/5 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium text-sm">{partnershipsData.hero.badge}</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Startup Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  Strategic Partnerships
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                {partnershipsData.hero.description}
              </p>

              <div className="flex gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Explore Partnerships
                </button>
                <button className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="bg-[#1a2845]/80 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <div className="grid grid-cols-3 gap-6">
                {partnershipsData.hero.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-4xl font-bold ${stat.color === 'orange' ? 'text-orange-400' :
                      stat.color === 'green' ? 'text-green-400' :
                        'text-blue-400'
                      } mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Categories Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Partnership Categories</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover collaboration opportunities across different partnership types and find your perfect match
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnershipsData.categories.map((category) => {
              const IconComponent = iconMap[category.icon];
              return (
                <div
                  key={category.id}
                  className={`rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer group ${category.featured
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                    : 'bg-gray-900 border border-gray-800 hover:border-orange-500/50'
                    }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${category.featured
                      ? 'bg-white/20'
                      : getIconBgColor(category.color)
                      }`}>
                      {IconComponent && <IconComponent className="w-7 h-7" />}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${category.featured
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-800 text-gray-300'
                      }`}>
                      {category.count}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold mb-3 ${category.featured ? 'text-white' : 'text-white'
                    }`}>
                    {category.name}
                  </h3>

                  <p className={`${category.featured ? 'text-white/90' : 'text-gray-400'
                    }`}>
                    {category.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Opportunities Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Active Opportunities</h2>
              <p className="text-gray-400">{partnershipsData.activeOpportunities.length} partnerships available</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setFilterOpen(!filterOpen)} className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-orange-500/50 transition-colors flex items-center gap-2 font-medium text-gray-300 hover:text-orange-400">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button onClick={() => setSortType(sortType === 'newest' ? 'popular' : 'newest')} className="px-6 py-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-orange-500/50 transition-colors flex items-center gap-2 font-medium text-gray-300 hover:text-orange-400">
                <ArrowUpDown className="w-4 h-4" />
                Sort
              </button>
            </div>
          </div>

          {partnershipsData.activeOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 p-8 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 mb-6">
              <div className="flex items-start gap-6">
                {/* Logo */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={opportunity.logo} alt={opportunity.company} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{opportunity.title}</h3>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-semibold rounded-full">
                          {opportunity.priority}
                        </span>
                      </div>
                      <p className="text-gray-400">{opportunity.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">{opportunity.matchPercentage}% match</div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {opportunity.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {opportunity.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-800">
                    <div className="flex items-start gap-2">
                      <DollarSign className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Investment:</div>
                        <div className="font-semibold text-gray-300">{opportunity.investment}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Duration:</div>
                        <div className="font-semibold text-gray-300">{opportunity.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-orange-400 mt-0.5" />
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Location:</div>
                        <div className="font-semibold text-gray-300">{opportunity.location}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={() => alert(`Applied for: ${opportunity.title}`)} className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                      Apply Now
                    </button>
                    <button onClick={() => {
                      const newFavorites = new Set(favorites);
                      if (newFavorites.has(opportunity.id)) {
                        newFavorites.delete(opportunity.id);
                      } else {
                        newFavorites.add(opportunity.id);
                      }
                      setFavorites(newFavorites);
                    }} className={`px-6 py-3 border-2 rounded-lg transition-colors ${favorites.has(opportunity.id) ? 'border-orange-500 bg-orange-500/10' : 'border-gray-800 hover:border-orange-500'}`}>
                      <Heart className={`w-5 h-5 ${favorites.has(opportunity.id) ? 'fill-orange-400 text-orange-400' : 'text-gray-400'}`} />
                    </button>
                    <button onClick={() => alert(`Shared: ${opportunity.title}`)} className="px-6 py-3 border-2 border-gray-800 rounded-lg hover:border-orange-500/50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-400 hover:text-orange-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resource Marketplace Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Resource Marketplace</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Access premium tools, services, and expertise from our trusted partner network
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipsData.resources.map((resource) => (
              <div key={resource.id} className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {resource.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Category & Price */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-full">
                      {resource.category}
                    </span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">
                        ${resource.price}
                        {resource.priceType && <span className="text-sm text-gray-500">/{resource.priceType}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">by {resource.provider}</p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{resource.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(resource.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                            }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-300">{resource.rating}</span>
                    <span className="text-sm text-gray-500">({resource.reviews} reviews)</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <span key={index} className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={() => alert(`Getting resource: ${resource.title}`)} className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                      Get Resource
                    </button>
                    <button onClick={() => {
                      const newFavorites = new Set(favorites);
                      if (newFavorites.has(resource.id)) {
                        newFavorites.delete(resource.id);
                      } else {
                        newFavorites.add(resource.id);
                      }
                      setFavorites(newFavorites);
                    }} className={`p-3 border-2 rounded-lg transition-colors ${favorites.has(resource.id) ? 'border-orange-500 bg-orange-500/10' : 'border-gray-800 hover:border-orange-500'}`}>
                      <Heart className={`w-5 h-5 ${favorites.has(resource.id) ? 'fill-orange-400 text-orange-400' : 'text-gray-400'}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Success Metrics */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">{partnershipsData.metrics.title}</h2>
            <p className="text-xl text-gray-400">{partnershipsData.metrics.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {partnershipsData.metrics.stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon];
              const isPositive = stat.trend === 'up';
              return (
                <div key={index} className="bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-800 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconBgColor(stat.color)}`}>
                      {IconComponent && <IconComponent className="w-6 h-6" />}
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'
                      }`}>
                      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Tools & Templates */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">Partnership Tools & Templates</h2>
            <p className="text-xl text-gray-400">
              Streamline your collaboration process with our comprehensive toolkit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnershipsData.tools.map((tool) => {
              const IconComponent = iconMap[tool.icon];
              return (
                <div key={tool.id} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBgColor(tool.color)}`}>
                      {IconComponent && <IconComponent className="w-8 h-8" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{tool.name}</h3>
                          <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-semibold rounded-full">
                            {tool.category}
                          </span>
                        </div>
                        {tool.popular && (
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold rounded-full">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-gray-300 mb-6">{tool.description}</p>

                      {/* Key Features */}
                      <div className="mb-6">
                        <div className="text-sm font-semibold text-gray-300 mb-3">Key Features:</div>
                        <div className="space-y-2">
                          {tool.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-400">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button onClick={() => alert(`Using tool: ${tool.name}`)} className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                          Use Tool
                        </button>
                        <button onClick={() => alert(`Previewing: ${tool.name}`)} className="px-6 py-3 border-2 border-gray-800 text-gray-300 rounded-lg font-semibold hover:border-orange-500/50 transition-colors">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipsPage;
