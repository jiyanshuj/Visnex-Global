import React, { useEffect, useRef } from 'react';
import { Rocket, DollarSign, Building2, TrendingUp, Globe, Users, Handshake } from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
    const canvasRef = useRef(null);

    // 3D Floating Elements Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 8;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 60 + 40;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.type = Math.floor(Math.random() * 3);
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;

                if (this.type === 0) {
                    // Circle
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.strokeStyle = '#ff6b35';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                } else if (this.type === 1) {
                    // Rocket icon shape
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 107, 53, 0.2)';
                    ctx.fill();
                    ctx.strokeStyle = '#ff6b35';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else {
                    // Globe/network icon
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.strokeStyle = '#4a90e2';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2);
                    ctx.strokeStyle = '#4a90e2';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                ctx.restore();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
                {/* 3D Canvas Background */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{ mixBlendMode: 'screen' }}
                />

                {/* Floating 3D Elements */}
                <div className="absolute top-1/4 right-1/4 animate-float">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-600/20 backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
                        <Globe className="w-12 h-12 text-orange-400" />
                    </div>
                </div>

                <div className="absolute top-1/3 left-1/4 animate-float-delayed">
                    <div className="w-20 h-20 rounded-full border-2 border-blue-400/40"></div>
                </div>

                <div className="absolute bottom-1/4 right-1/3 animate-float-slow">
                    <div className="w-16 h-16 rounded-full border-2 border-orange-500/40"></div>
                </div>

                <div className="absolute bottom-1/3 left-1/3 animate-pulse-slow">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 backdrop-blur-sm"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/30 bg-white/5 backdrop-blur-sm mb-8">
                            <Rocket className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400 font-medium text-sm">AI-Powered Ecosystem Platform</span>
                        </div>

                        <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                            Where Vision Meets<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Investment</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                            Accelerate your startup journey through strategic ecosystem connections. Connect with investors, find partners, and fuel your growth with AI-powered matching.
                        </p>

                        <div className="flex gap-4">
                            <button onClick={() => setCurrentPage('startups')} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2">
                                <Rocket className="w-5 h-5" />
                                Explore Startups
                            </button>
                            <button onClick={() => setCurrentPage('investors')} className="px-8 py-4 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Find Investors
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-8 mt-16">
                            <div>
                                <div className="text-4xl font-bold text-orange-400 mb-2">15,420+</div>
                                <div className="text-gray-400 text-sm">Active Connections</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-orange-400 mb-2">$2.4B+</div>
                                <div className="text-gray-400 text-sm">Funding Facilitated</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-orange-400 mb-2">8750+</div>
                                <div className="text-gray-400 text-sm">Partnerships Formed</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-orange-400 mb-2">120+</div>
                                <div className="text-gray-400 text-sm">Countries Reached</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Choose Your Path Section */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4">Choose Your Path to Growth</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Whether you're building the next unicorn, seeking investment opportunities, or fostering innovation, Visnex Global provides the tools and connections you need.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Startups Card */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Startups</h3>
                            <p className="text-gray-300 mb-6">
                                Connect with investors, find strategic partners, and accelerate your growth through our AI-powered ecosystem.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">AI-powered investor matching</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Strategic partnership opportunities</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Growth acceleration tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Global network access</span>
                                </li>
                            </ul>
                            <button onClick={() => setCurrentPage('startups')} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                Join as Startup
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Investors Card */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <DollarSign className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Investors</h3>
                            <p className="text-gray-300 mb-6">
                                Discover high-potential startups, streamline due diligence, and build valuable portfolio connections.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Curated startup deal flow</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Advanced filtering & analytics</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Portfolio management tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Direct founder connections</span>
                                </li>
                            </ul>
                            <button onClick={() => setCurrentPage('investors')} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                Join as Investor
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Incubators Card */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Incubators</h3>
                            <p className="text-gray-300 mb-6">
                                Source quality startups, promote your programs, and engage with alumni through our comprehensive platform.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Startup sourcing pipeline</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Program promotion tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Alumni engagement platform</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Ecosystem building resources</span>
                                </li>
                            </ul>
                            <button onClick={() => setCurrentPage('investors')} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                Join as Incubator
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {/* Partnerships Card */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Handshake className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Partnerships</h3>
                            <p className="text-gray-300 mb-6">
                                Forge strategic alliances, access premium resources, and unlock growth opportunities through curated partnership marketplace.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Strategic partner matching</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Resource marketplace</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Collaboration tools & templates</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300">Success metrics & tracking</span>
                                </li>
                            </ul>
                            <button onClick={() => setCurrentPage('partnerships')} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                Explore Partnerships
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-24 bg-gray-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4">Success Stories That Inspire</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Real connections, real results. See how startups and investors are transforming their growth through our ecosystem.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Story 1 */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
                                    alt="TechFlow AI"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full">
                                    Series A
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold rounded-full">
                                    6 months
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">TechFlow AI</h3>
                                <p className="text-sm text-gray-400 mb-4">Sarah Chen • Artificial Intelligence</p>
                                <p className="text-gray-300 mb-6">
                                    Connected with Series A investors through Visnex Global' AI matching system, securing funding to scale their machine learning platform across...
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-orange-500">$12M</div>
                                        <div className="text-sm text-gray-400">Funding Raised</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Story 2 */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"
                                    alt="GreenEnergy Solutions"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full">
                                    Seed Round
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold rounded-full">
                                    3 months
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">GreenEnergy Solutions</h3>
                                <p className="text-sm text-gray-400 mb-4">Marcus Rodriguez • Clean Technology</p>
                                <p className="text-gray-300 mb-6">
                                    Found strategic manufacturing partners and secured seed funding through ecosystem connections, accelerating their solar panel...
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-orange-500">$8.5M</div>
                                        <div className="text-sm text-gray-400">Funding Raised</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Story 3 */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800"
                                    alt="HealthTech Innovations"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full">
                                    Series B
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold rounded-full">
                                    9 months
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">HealthTech Innovations</h3>
                                <p className="text-sm text-gray-400 mb-4">Dr. Emily Watson • Healthcare Technology</p>
                                <p className="text-gray-300 mb-6">
                                    Leveraged platform connections to partner with major healthcare systems and secure Series B funding for their telemedicine platform expansion.
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-orange-500">$15M</div>
                                        <div className="text-sm text-gray-400">Funding Raised</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 inline-flex items-center gap-2">
                            View All Success Stories
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Global Ecosystem Network */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4">Global Ecosystem Network</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Visualize the connections that drive innovation. Our AI-powered platform creates meaningful relationships across the startup ecosystem.
                        </p>
                    </div>

                    {/* Network Visualization */}
                    <div className="bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-800 mb-12 flex items-center justify-center" style={{ minHeight: '400px' }}>
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Central Node - removed, just empty space */}

                            {/* Orbital Ring - Startups (Orange) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-72 h-72 rounded-full border border-orange-500/20"></div>
                            </div>

                            {/* Orbital Ring - Investors (Green) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-96 h-96 rounded-full border border-green-500/20"></div>
                            </div>

                            {/* Orbital Ring - Incubators (Blue) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[28rem] h-[28rem] rounded-full border border-blue-500/20"></div>
                            </div>

                            {/* Scattered Nodes - Simple empty circles */}
                            {/* Top area nodes */}
                            <div className="absolute top-[20%] left-[15%] w-12 h-12 rounded-full border-2 border-gray-400/40"></div>
                            <div className="absolute top-[15%] left-[35%] w-8 h-8 rounded-full border-2 border-gray-400/30"></div>
                            <div className="absolute top-[18%] left-[55%] w-10 h-10 rounded-full border-2 border-gray-400/35"></div>
                            <div className="absolute top-[22%] left-[75%] w-9 h-9 rounded-full border-2 border-gray-400/32"></div>
                            <div className="absolute top-[20%] right-[12%] w-11 h-11 rounded-full border-2 border-gray-400/38"></div>

                            {/* Connection Lines SVG */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                                {/* Connecting lines between nodes - creating network effect */}
                                {/* Horizontal lines */}
                                <line x1="15%" y1="20%" x2="35%" y2="15%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3s" repeatCount="indefinite" />
                                </line>
                                <line x1="35%" y1="15%" x2="55%" y2="18%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.2s" repeatCount="indefinite" />
                                </line>
                                <line x1="55%" y1="18%" x2="75%" y2="20%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3s" repeatCount="indefinite" />
                                </line>
                                <line x1="75%" y1="20%" x2="88%" y2="22%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.1s" repeatCount="indefinite" />
                                </line>

                                {/* Vertical connections */}
                                <line x1="12%" y1="50%" x2="18%" y2="20%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.3s" repeatCount="indefinite" />
                                </line>
                                <line x1="12%" y1="50%" x2="12%" y2="80%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3s" repeatCount="indefinite" />
                                </line>
                                <line x1="28%" y1="50%" x2="30%" y2="35%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.2s" repeatCount="indefinite" />
                                </line>
                                <line x1="28%" y1="50%" x2="40%" y2="80%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.1s" repeatCount="indefinite" />
                                </line>

                                {/* Right side connections */}
                                <line x1="72%" y1="50%" x2="75%" y2="20%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3s" repeatCount="indefinite" />
                                </line>
                                <line x1="72%" y1="50%" x2="75%" y2="40%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.2s" repeatCount="indefinite" />
                                </line>
                                <line x1="88%" y1="50%" x2="88%" y2="80%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.1s" repeatCount="indefinite" />
                                </line>
                                <line x1="88%" y1="50%" x2="75%" y2="20%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.3s" repeatCount="indefinite" />
                                </line>

                                {/* Bottom connections */}
                                <line x1="18%" y1="80%" x2="40%" y2="78%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.2s" repeatCount="indefinite" />
                                </line>
                                <line x1="40%" y1="78%" x2="60%" y2="80%" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3s" repeatCount="indefinite" />
                                </line>
                                <line x1="60%" y1="80%" x2="82%" y2="80%" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.1s" repeatCount="indefinite" />
                                </line>

                                {/* Diagonal cross connections */}
                                <line x1="15%" y1="20%" x2="40%" y2="80%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.3s" repeatCount="indefinite" />
                                </line>
                                <line x1="88%" y1="22%" x2="60%" y2="80%" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.2s" repeatCount="indefinite" />
                                </line>
                                <line x1="28%" y1="50%" x2="82%" y2="80%" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.4s" repeatCount="indefinite" />
                                </line>
                                <line x1="72%" y1="50%" x2="18%" y2="80%" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" strokeDasharray="4,4">
                                    <animate attributeName="stroke-dashoffset" from="0" to="8" dur="3.1s" repeatCount="indefinite" />
                                </line>

                                {/* Orbital rings (subtle) */}
                                <circle cx="50%" cy="50%" r="36%" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                                <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
                                <circle cx="50%" cy="50%" r="56%" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                            </svg>

                            {/* Middle area nodes */}
                            <div className="absolute top-1/2 left-[12%] -translate-y-1/2 w-10 h-10 rounded-full border-2 border-gray-400/35"></div>
                            <div className="absolute top-1/2 left-[28%] -translate-y-1/2 w-9 h-9 rounded-full border-2 border-gray-400/33"></div>
                            <div className="absolute top-1/2 right-[28%] -translate-y-1/2 w-11 h-11 rounded-full border-2 border-gray-400/37"></div>
                            <div className="absolute top-1/2 right-[12%] -translate-y-1/2 w-10 h-10 rounded-full border-2 border-gray-400/36"></div>

                            {/* Bottom area nodes */}
                            <div className="absolute bottom-[20%] left-[18%] w-9 h-9 rounded-full border-2 border-gray-400/34"></div>
                            <div className="absolute bottom-[18%] left-[40%] w-10 h-10 rounded-full border-2 border-gray-400/36"></div>
                            <div className="absolute bottom-[22%] left-[60%] w-8 h-8 rounded-full border-2 border-gray-400/32"></div>
                            <div className="absolute bottom-[20%] right-[18%] w-11 h-11 rounded-full border-2 border-gray-400/38"></div>

                            {/* Additional scattered nodes */}
                            <div className="absolute top-[35%] left-[22%] w-7 h-7 rounded-full border-2 border-gray-400/28"></div>
                            <div className="absolute top-[40%] right-[25%] w-8 h-8 rounded-full border-2 border-gray-400/30"></div>
                            <div className="absolute bottom-[35%] right-[20%] w-9 h-9 rounded-full border-2 border-gray-400/33"></div>
                            <div className="absolute bottom-[30%] left-[30%] w-7 h-7 rounded-full border-2 border-gray-400/29"></div>
                        </div>
                    </div>

                    {/* Legend - Below Box */}
                    <div className="flex gap-12 justify-center mb-12">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-white text-sm font-medium">Startups</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-white text-sm font-medium">Investors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-white text-sm font-medium">Incubators</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-white text-sm font-medium">Partnerships</span>
                        </div>
                    </div>

                    {/* Network Stats */}
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-orange-400 mb-2">15,000+</div>
                            <div className="text-gray-300">Active Nodes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-orange-400 mb-2">45,000+</div>
                            <div className="text-gray-300">Connections Made</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-orange-400 mb-2">120+</div>
                            <div className="text-gray-300">Countries</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-orange-400 mb-2">98%</div>
                            <div className="text-gray-300">Match Success</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI-Powered Recommendations */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-white mb-4">AI-Powered Recommendations</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our intelligent matching system analyzes thousands of data points to suggest the most relevant connections for your growth.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-12">
                        <button onClick={() => setCurrentPage('startups')} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2">
                            <Rocket className="w-5 h-5" />
                            Startups
                        </button>
                        <button onClick={() => setCurrentPage('investors')} className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 hover:border-orange-500/50 transition-colors flex items-center gap-2">
                            <DollarSign className="w-5 h-5" />
                            Investors
                        </button>
                        <button className="px-6 py-3 bg-gray-900 border border-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-800 hover:border-orange-500/50 transition-colors flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Partnerships
                        </button>
                    </div>

                    {/* Recommendation Cards */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                            <div className="relative h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
                                    alt="FinTech Revolution"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full">
                                    94% Match
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">FinTech Revolution</h3>
                                <p className="text-gray-300 mb-4">
                                    Revolutionary blockchain-based payment platform seeking Series A funding. Strong traction with 100K+ users and partnerships with major banks.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium rounded-full">FinTech</span>
                                    <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium rounded-full">Blockchain</span>
                                    <span className="px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium rounded-full">Series A</span>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                    View Details
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/50 transition-all duration-300">
                            <div className="relative h-64">
                                <img
                                    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800"
                                    alt="EcoTech Solutions"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-full">
                                    87% Match
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-white mb-2">EcoTech Solutions</h3>
                                <p className="text-gray-300 mb-4">
                                    Sustainable technology startup developing carbon capture solutions. Seeking strategic investors and manufacturing partners.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium rounded-full">CleanTech</span>
                                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium rounded-full">Sustainability</span>
                                    <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium rounded-full">Manufacturing</span>
                                </div>
                                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2">
                                    View Details
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <button className="px-8 py-4 border-2 border-orange-500 text-orange-400 rounded-lg font-semibold hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-300 inline-flex items-center gap-2">
                            Explore All Startups
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Stay Connected to the Ecosystem</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Get weekly insights, success stories, and exclusive opportunities delivered to your inbox.
                    </p>

                    <div className="flex gap-4 max-w-2xl mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                            Subscribe
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-white/80 text-sm mt-4">
                        Join 10,000+ entrepreneurs and investors getting weekly insights.
                    </p>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-16 bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                            <div className="text-gray-400">Platform Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">SOC 2</div>
                            <div className="text-gray-400">Security Certified</div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Globe className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">120+</div>
                            <div className="text-gray-400">Countries Served</div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-3xl font-bold text-white mb-2">50K+</div>
                            <div className="text-gray-400">Active Users</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-400 font-semibold mb-6">Trusted by startups worldwide. Secured by industry standards.</p>
                        <div className="flex items-center justify-center gap-8 text-gray-500">
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">GDPR Compliant</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">ISO 27001</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">SOC 2 Type II</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-10px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(-15px); }
          66% { transform: translateY(-25px) translateX(5px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default HomePage;
