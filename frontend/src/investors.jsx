import React, { useState, useMemo } from 'react';
import { Search, MapPin, DollarSign, Building2, Users, TrendingUp, Clock, Calendar, Award, Eye, Info, Rocket } from 'lucide-react';
import investorsData from './investorsData.json';

const InvestorsPage = () => {
    const [activeTab, setActiveTab] = useState('investors');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedInvestmentRange, setSelectedInvestmentRange] = useState('all');
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedStages, setSelectedStages] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('All Locations');
    const [sortBy, setSortBy] = useState('relevance');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    // Get current data based on active tab
    const currentData = activeTab === 'investors' ? investorsData.investors : investorsData.incubators;

    // Filter data
    const filteredData = useMemo(() => {
        let results = [...currentData];

        // Search filter
        if (searchQuery) {
            results = results.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.focusIndustries || item.focusAreas)?.some(industry =>
                    industry.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        // Type filter
        if (selectedType !== 'all') {
            if (selectedType === 'investor') {
                results = results.filter(item => item.type === 'Venture Capital');
            } else if (selectedType === 'incubator') {
                results = results.filter(item => item.type === 'Accelerator');
            }
        }

        // Industry filter
        if (selectedIndustries.length > 0 && activeTab === 'investors') {
            results = results.filter(item =>
                item.focusIndustries.some(industry => selectedIndustries.includes(industry))
            );
        }

        // Stage filter
        if (selectedStages.length > 0 && activeTab === 'investors') {
            results = results.filter(item =>
                item.investmentStages.some(stage => selectedStages.includes(stage))
            );
        }

        // Location filter
        if (selectedLocation !== 'All Locations') {
            results = results.filter(item =>
                item.location.includes(selectedLocation)
            );
        }

        // Sort
        switch (sortBy) {
            case 'relevance':
                // Keep default order
                break;
            case 'portfolio-size':
                results.sort((a, b) => (b.portfolioCompanies || b.alumni || 0) - (a.portfolioCompanies || a.alumni || 0));
                break;
            case 'active-deals':
                results.sort((a, b) => (b.activeDeals || 0) - (a.activeDeals || 0));
                break;
            case 'recently-joined':
                // Keep default order for recently joined
                break;
            default:
                break;
        }

        return results;
    }, [currentData, searchQuery, selectedType, selectedIndustries, selectedStages, selectedLocation, sortBy, activeTab]);

    const toggleIndustry = (industry) => {
        setSelectedIndustries(prev =>
            prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]
        );
    };

    const toggleStage = (stage) => {
        setSelectedStages(prev =>
            prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
        );
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setSelectedInvestmentRange('all');
        setSelectedIndustries([]);
        setSelectedStages([]);
        setSelectedLocation('All Locations');
    };

    return (
        <div className="min-h-screen bg-black pt-20">
            {/* Header */}
            <div className="bg-gray-900/50 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-5xl font-bold text-white mb-4">Investor Network</h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Connect with world-class investors and incubators ready to fuel your startup's growth journey
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-6">
                        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-orange-500/30 rounded-lg flex items-center justify-center">
                                    <Users className="w-5 h-5 text-orange-400" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{investorsData.stats.activeInvestors.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">Active Investors</div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-500/30 rounded-lg flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{investorsData.stats.incubators}</div>
                            <div className="text-sm text-gray-400">Incubators</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-green-500/30 rounded-lg flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{investorsData.stats.fundingFacilitated}</div>
                            <div className="text-sm text-gray-400">Funding Facilitated</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-500/30 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{investorsData.stats.activeConnections.toLocaleString()}</div>
                            <div className="text-sm text-gray-400">Active Connections</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="bg-gray-900/80 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search investors, incubators, or industries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setShowSortDropdown(!showSortDropdown)}
                                className="px-6 py-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap text-white"
                            >
                                <span className="text-gray-300">Sort by:</span>
                                <span className="font-medium text-white">
                                    {sortBy === 'relevance' && 'Relevance'}
                                    {sortBy === 'portfolio-size' && 'Portfolio Size'}
                                    {sortBy === 'active-deals' && 'Active Deals'}
                                    {sortBy === 'recently-joined' && 'Recently Joined'}
                                </span>
                                <svg className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {showSortDropdown && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800 py-2 z-10">
                                    {['relevance', 'portfolio-size', 'active-deals', 'recently-joined'].map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setShowSortDropdown(false);
                                            }}
                                            className={`w-full px-4 py-2 text-left hover:bg-orange-500/20 transition-colors ${sortBy === option ? 'bg-orange-500/30 text-orange-400' : 'text-gray-300'
                                                }`}
                                        >
                                            {option === 'relevance' && 'Relevance'}
                                            {option === 'portfolio-size' && 'Portfolio Size'}
                                            {option === 'active-deals' && 'Active Deals'}
                                            {option === 'recently-joined' && 'Recently Joined'}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Filters</h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-orange-400 hover:text-orange-300 text-sm font-medium flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Clear
                                </button>
                            </div>

                            {/* Type Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-white mb-4">Type</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={selectedType === 'all'}
                                            onChange={() => setSelectedType('all')}
                                            className="w-4 h-4 text-orange-600 border-gray-600 focus:ring-orange-500"
                                        />
                                        <span className="ml-3 text-gray-300 group-hover:text-orange-400 transition-colors">All</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={selectedType === 'investor'}
                                            onChange={() => setSelectedType('investor')}
                                            className="w-4 h-4 text-orange-600 border-gray-600 focus:ring-orange-500"
                                        />
                                        <span className="ml-3 text-gray-300 group-hover:text-orange-400 transition-colors">Investor</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="type"
                                            checked={selectedType === 'incubator'}
                                            onChange={() => setSelectedType('incubator')}
                                            className="w-4 h-4 text-orange-600 border-gray-600 focus:ring-orange-500"
                                        />
                                        <span className="ml-3 text-gray-300 group-hover:text-orange-400 transition-colors">Incubator</span>
                                    </label>
                                </div>
                            </div>

                            {/* Investment Range Filter */}
                            {activeTab === 'investors' && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-white mb-4">Investment Range</h3>
                                    <select
                                        value={selectedInvestmentRange}
                                        onChange={(e) => setSelectedInvestmentRange(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="all">All Ranges</option>
                                        {investorsData.filters.investmentRanges.map((range) => (
                                            <option key={range.name} value={range.name}>{range.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Industries Filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-white mb-4">Industries</h3>
                                <div className="space-y-3 max-h-48 overflow-y-auto">
                                    {investorsData.filters.industries.map((industry) => (
                                        <label key={industry} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedIndustries.includes(industry)}
                                                onChange={() => toggleIndustry(industry)}
                                                className="w-4 h-4 text-orange-600 border-gray-600 rounded focus:ring-orange-500"
                                            />
                                            <span className="ml-3 text-gray-300 group-hover:text-orange-400 transition-colors">{industry}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Investment Stage Filter */}
                            {activeTab === 'investors' && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-white mb-4">Investment Stage</h3>
                                    <div className="space-y-3">
                                        {investorsData.filters.investmentStages.map((stage) => (
                                            <label key={stage} className="flex items-center cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStages.includes(stage)}
                                                    onChange={() => toggleStage(stage)}
                                                    className="w-4 h-4 text-orange-600 border-gray-600 rounded focus:ring-orange-500"
                                                />
                                                <span className="ml-3 text-gray-300 group-hover:text-orange-400 transition-colors">{stage}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Location Filter */}
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-4">Location</h3>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                                        className="w-full px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors flex items-center justify-between bg-gray-800/30 text-gray-300"
                                    >
                                        <span>{selectedLocation}</span>
                                        <svg className={`w-4 h-4 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {showLocationDropdown && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-xl border border-gray-800 py-2 z-10 max-h-64 overflow-y-auto">
                                            {investorsData.filters.locations.map((location) => (
                                                <button
                                                    key={location}
                                                    onClick={() => {
                                                        setSelectedLocation(location);
                                                        setShowLocationDropdown(false);
                                                    }}
                                                    className={`w-full px-4 py-2 text-left hover:bg-orange-500/20 transition-colors ${selectedLocation === location ? 'bg-orange-500/30 text-orange-400' : 'text-gray-300'
                                                        }`}
                                                >
                                                    {location}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Tabs */}
                        <div className="flex gap-4 mb-6">
                            <button
                                onClick={() => setActiveTab('investors')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'investors'
                                    ? 'bg-gray-900/50 text-orange-400 shadow-md border-2 border-orange-500/30'
                                    : 'bg-gray-900/30 text-gray-300 hover:bg-gray-900/50 border-2 border-transparent'
                                    }`}
                            >
                                <Users className="w-5 h-5" />
                                Investors ({investorsData.investors.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('incubators')}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'incubators'
                                    ? 'bg-gray-900/50 text-orange-400 shadow-md border-2 border-orange-500/30'
                                    : 'bg-gray-900/30 text-gray-300 hover:bg-gray-900/50 border-2 border-transparent'
                                    }`}
                            >
                                <Building2 className="w-5 h-5" />
                                Incubators ({investorsData.incubators.length})
                            </button>
                        </div>

                        {/* Results Count */}
                        <p className="text-gray-400 mb-6">
                            Showing <span className="font-semibold text-gray-200">{filteredData.length}</span> results
                        </p>

                        {/* Investors Grid */}
                        {activeTab === 'investors' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredData.map((investor) => (
                                    <div
                                        key={investor.id}
                                        className="bg-gray-900/50 rounded-xl shadow-sm border border-gray-800 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 p-6"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={investor.logo} alt={investor.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-white">{investor.name}</h3>
                                                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs font-semibold rounded-full flex-shrink-0 border border-green-800/50">
                                                        {investor.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-2">{investor.type}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    <span>{investor.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Investment Range */}
                                        <div className="mb-4 pb-4 border-b border-gray-800">
                                            <div className="flex items-start gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <span className="text-gray-400">Investment Range:</span>
                                                    <div className="font-semibold text-white">{investor.investmentRange.min} - {investor.investmentRange.max}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Focus Industries */}
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-white mb-2">Focus Industries:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {investor.focusIndustries.map((industry, index) => (
                                                    <span key={index} className="px-3 py-1 bg-orange-900/30 text-orange-300 text-xs font-medium rounded-full border border-orange-800/50">
                                                        {industry}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Investment Stage */}
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-white mb-2">Investment Stage:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {investor.investmentStages.map((stage, index) => (
                                                    <span key={index} className="px-3 py-1 bg-blue-900/30 text-blue-300 text-xs font-medium rounded-full border border-blue-800/50">
                                                        {stage}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-800">
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Portfolio Companies</div>
                                                <div className="text-2xl font-bold text-white">{investor.portfolioCompanies}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 mb-1">Active Deals</div>
                                                <div className="text-2xl font-bold text-orange-400">{investor.activeDeals}</div>
                                            </div>
                                        </div>

                                        {/* Thesis */}
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-white mb-2">Investment Thesis:</div>
                                            <p className="text-sm text-gray-400 line-clamp-3">{investor.investmentThesis}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                                <Users className="w-4 h-4" />
                                                Connect
                                            </button>
                                            <button className="p-2.5 border-2 border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Incubators Grid */}
                        {activeTab === 'incubators' && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredData.map((incubator) => (
                                    <div
                                        key={incubator.id}
                                        className="bg-gray-900/50 rounded-xl shadow-sm border border-gray-800 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={incubator.image}
                                                alt={incubator.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h3 className="text-2xl font-bold text-white mb-1">{incubator.name}</h3>
                                                <div className="flex items-center gap-2 text-white/90 text-sm">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{incubator.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {/* Stats Row */}
                                            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-800">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 mb-1">
                                                        <Clock className="w-4 h-4 text-orange-500" />
                                                    </div>
                                                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                                                    <div className="text-sm font-bold text-white">{incubator.duration}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 mb-1">
                                                        <TrendingUp className="w-4 h-4 text-blue-500" />
                                                    </div>
                                                    <div className="text-xs text-gray-500 mb-1">Equity</div>
                                                    <div className="text-sm font-bold text-white">{incubator.equity}</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-1 mb-1">
                                                        <DollarSign className="w-4 h-4 text-green-500" />
                                                    </div>
                                                    <div className="text-xs text-gray-500 mb-1">Funding</div>
                                                    <div className="text-sm font-bold text-white">{incubator.funding}</div>
                                                </div>
                                            </div>

                                            {/* Focus Areas */}
                                            <div className="mb-4">
                                                <div className="text-sm font-semibold text-white mb-2">Focus Areas:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {incubator.focusAreas.map((area, index) => (
                                                        <span key={index} className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs font-medium rounded-full border border-gray-700">
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Performance Stats */}
                                            <div className="grid grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Batch Size</div>
                                                    <div className="text-xl font-bold text-white">{incubator.batchSize}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Success Rate</div>
                                                    <div className="text-xl font-bold text-green-400">{incubator.successRate}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1">Alumni</div>
                                                    <div className="text-xl font-bold text-white">{incubator.alumni}</div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-3">{incubator.description}</p>

                                            {/* Actions */}
                                            <div className="flex gap-3">
                                                <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                                    <Rocket className="w-4 h-4" />
                                                    Apply Now
                                                </button>
                                                <button className="p-2.5 border-2 border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                                                    <Info className="w-5 h-5 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {filteredData.length === 0 && (
                            <div className="text-center py-16 bg-gray-900/50 rounded-xl border border-gray-800">
                                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                                    <Search className="w-10 h-10 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                                <button
                                    onClick={clearFilters}
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

export default InvestorsPage;
