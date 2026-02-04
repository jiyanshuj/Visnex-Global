import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, MapPin, Clock, Users, Calendar, BarChart3, Grid3x3, List, Check } from 'lucide-react';
import startupsData from '../data/startupsData.json';

const StartupsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedFundingStages, setSelectedFundingStages] = useState([]);
    const [sortBy, setSortBy] = useState('most-relevant');
    const [viewMode, setViewMode] = useState('grid');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Filter startups based on search and filters
    const filteredStartups = useMemo(() => {
        let results = [...startupsData.startups];

        // Search filter
        if (searchQuery) {
            results = results.filter(startup =>
                startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                startup.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Industry filter
        if (selectedIndustries.length > 0) {
            results = results.filter(startup =>
                selectedIndustries.includes(startup.industry)
            );
        }

        // Funding stage filter
        if (selectedFundingStages.length > 0) {
            results = results.filter(startup =>
                selectedFundingStages.includes(startup.fundingStage)
            );
        }

        // Sort
        switch (sortBy) {
            case 'most-relevant':
                results.sort((a, b) => b.matchPercentage - a.matchPercentage);
                break;
            case 'newest-first':
                results.sort((a, b) => b.founded - a.founded);
                break;
            case 'highest-funding':
                results.sort((a, b) => {
                    const aFunding = parseFloat(a.funding.replace(/[$M]/g, ''));
                    const bFunding = parseFloat(b.funding.replace(/[$M]/g, ''));
                    return bFunding - aFunding;
                });
                break;
            case 'fastest-growing':
                results.sort((a, b) => {
                    const aGrowth = parseFloat(a.growth.replace(/[+%]/g, ''));
                    const bGrowth = parseFloat(b.growth.replace(/[+%]/g, ''));
                    return bGrowth - aGrowth;
                });
                break;
            case 'a-to-z':
                results.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return results;
    }, [searchQuery, selectedIndustries, selectedFundingStages, sortBy]);

    const toggleIndustry = (industry) => {
        setSelectedIndustries(prev =>
            prev.includes(industry)
                ? prev.filter(i => i !== industry)
                : [...prev, industry]
        );
    };

    const toggleFundingStage = (stage) => {
        setSelectedFundingStages(prev =>
            prev.includes(stage)
                ? prev.filter(s => s !== stage)
                : [...prev, stage]
        );
    };

    const getSortLabel = () => {
        switch (sortBy) {
            case 'most-relevant': return 'Most Relevant';
            case 'newest-first': return 'Newest First';
            case 'highest-funding': return 'Highest Funding';
            case 'fastest-growing': return 'Fastest Growing';
            case 'a-to-z': return 'A to Z';
            default: return 'Most Relevant';
        }
    };

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Header */}
            <div className="bg-gray-900/50 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Startup Discovery Center</h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Explore {startupsData.startups.length} innovative startups ready to transform industries
                    </p>

                    {/* Search Bar */}
                    <div className="relative">
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search startups by name, industry, or technology..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400"
                                />
                            </div>
                            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                                Search
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-3 text-sm text-gray-400">
                            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                            <span>AI-powered search with natural language processing</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-80 flex-shrink-0">
                        <div className="bg-gray-900/50 rounded-xl shadow-sm border border-gray-800 p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-xl font-bold text-white">Filters</h2>
                            </div>

                            {/* Industry Filter */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-white mb-4">Industry</h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                                    {startupsData.filters.industries.map((industry) => (
                                        <label key={industry.name} className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIndustries.includes(industry.name)}
                                                    onChange={() => toggleIndustry(industry.name)}
                                                    className="w-4 h-4 text-orange-600 border-gray-600 bg-gray-800 rounded focus:ring-orange-500"
                                                />
                                                <span className="text-gray-300 group-hover:text-orange-500 transition-colors">
                                                    {industry.name}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">{industry.count}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Funding Stage Filter */}
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-4">Funding Stage</h3>
                                <div className="space-y-3">
                                    {startupsData.filters.fundingStages.map((stage) => (
                                        <label key={stage.name} className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFundingStages.includes(stage.name)}
                                                    onChange={() => toggleFundingStage(stage.name)}
                                                    className="w-4 h-4 text-orange-600 border-gray-600 bg-gray-800 rounded focus:ring-orange-500"
                                                />
                                                <span className="text-gray-300 group-hover:text-orange-500 transition-colors">
                                                    {stage.name}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">{stage.count}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Startups Grid */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-300">
                                Showing <span className="font-semibold text-white">{filteredStartups.length}</span> startups
                            </p>

                            <div className="flex items-center gap-4">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                                        </svg>
                                        <span className="text-gray-300 font-medium">Sort: {getSortLabel()}</span>
                                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {showSortDropdown && (
                                        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-10">
                                            {[
                                                { value: 'most-relevant', label: 'Most Relevant', icon: TrendingUp },
                                                { value: 'newest-first', label: 'Newest First', icon: Clock },
                                                { value: 'highest-funding', label: 'Highest Funding', icon: BarChart3 },
                                                { value: 'fastest-growing', label: 'Fastest Growing', icon: TrendingUp },
                                                { value: 'a-to-z', label: 'A to Z', icon: List }
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setShowSortDropdown(false);
                                                    }}
                                                    className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center gap-3 ${sortBy === option.value ? 'bg-gray-700 text-orange-500' : 'text-gray-300'
                                                        }`}
                                                >
                                                    <option.icon className="w-4 h-4" />
                                                    <span>{option.label}</span>
                                                    {sortBy === option.value && (
                                                        <Check className="w-4 h-4 ml-auto text-orange-500" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* View Toggle */}
                                <div className="flex gap-2 bg-gray-800 border border-gray-700 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                                    >
                                        <Grid3x3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Startups Grid/List */}
                        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
                            {filteredStartups.map((startup) => (
                                <div
                                    key={startup.id}
                                    className="bg-gray-900/50 rounded-xl shadow-sm border border-gray-800 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden group"
                                >
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0 overflow-hidden border border-orange-500/30">
                                                <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
                                                        {startup.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <div className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold rounded-full whitespace-nowrap">
                                                            {startup.matchPercentage}% Match
                                                        </div>
                                                        <button className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
                                                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm mb-3">{startup.tagline}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        <span>{startup.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span>Active {startup.lastActive}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                            {startup.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${startup.fundingStage === 'Series A' || startup.fundingStage === 'Series B'
                                                ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
                                                : startup.fundingStage === 'Seed'
                                                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                                    : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                                                }`}>
                                                {startup.fundingStage}
                                            </span>
                                            <span className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 text-xs font-semibold rounded-full">
                                                {startup.industry}
                                            </span>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-gray-800">
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Funding</div>
                                                <div className="text-sm font-bold text-white">{startup.funding}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Team</div>
                                                <div className="text-sm font-bold text-white">{startup.teamSize}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Founded</div>
                                                <div className="text-sm font-bold text-white">{startup.founded}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Growth</div>
                                                <div className="text-sm font-bold text-green-400">{startup.growth}</div>
                                            </div>
                                        </div>

                                        {/* Founding Team */}
                                        <div className="mb-4">
                                            <div className="text-xs text-gray-500 mb-2">Founding Team</div>
                                            <div className="flex -space-x-2">
                                                {startup.foundingTeam.map((avatar, index) => (
                                                    <img
                                                        key={index}
                                                        src={avatar}
                                                        alt={`Team member ${index + 1}`}
                                                        className="w-8 h-8 rounded-full border-2 border-gray-900"
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {startup.tags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="px-2.5 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                            {startup.tags.length > 3 && (
                                                <span className="px-2.5 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                                                    +{startup.tags.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                                </svg>
                                                Connect
                                            </button>
                                            <button className="px-4 py-2.5 border-2 border-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredStartups.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No startups found</h3>
                                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedIndustries([]);
                                        setSelectedFundingStages([]);
                                    }}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartupsPage;
