<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Brew & Breathe') }} - Mental Wellness Through Coffee</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700&family=poppins:400,500,600,700" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('css/user.css') }}">

    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @else
        <script src="https://cdn.tailwindcss.com"></script>
    @endif

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Instrument Sans', 'sans-serif'],
                        display: ['Poppins', 'sans-serif']
                    },
                    colors: {
                        coffee: {
                            50: '#f9f7f4',
                            100: '#f3ede8',
                            200: '#e8ddd4',
                            300: '#dcc9bb',
                            400: '#c8a878',
                            500: '#b8944a',
                            600: '#9d7d3d',
                            700: '#7d6630',
                            800: '#6b5829',
                            900: '#4a3a1a',
                        },
                        cream: '#faf8f5',
                        warm: '#f5ede3',
                        brown: '#8b6f47',
                        darkBrown: '#2c1810',
                    }
                }
            }
        }
    </script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: #faf8f5;
            color: #2c1810;
            font-family: 'Instrument Sans', sans-serif;
            line-height: 1.6;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
        }

        /* Smooth animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-40px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .animate-fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade {
            animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-slide-left {
            animation: slideInLeft 0.8s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; opacity: 0; }
        .delay-200 { animation-delay: 0.2s; opacity: 0; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-400 { animation-delay: 0.4s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }

        /* Gradient text */
        .gradient-text {
            background: linear-gradient(135deg, #8b6f47 0%, #c8a878 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Glassmorphism cards */
        .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 111, 71, 0.1);
        }

        .glass-card:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(139, 111, 71, 0.3);
        }

        /* Premium button styles */
        .btn-primary {
            background: linear-gradient(135deg, #8b6f47 0%, #a88b63 100%);
            color: white;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 15px;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 8px 24px rgba(139, 111, 71, 0.2);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(139, 111, 71, 0.3);
        }

        .btn-secondary {
            background: white;
            color: #2c1810;
            padding: 14px 32px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 15px;
            border: 2px solid #d9d0c5;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            border-color: #8b6f47;
            background: #f5ede3;
        }

        /* Feature cards */
        .feature-card {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(139, 111, 71, 0.1);
        }

        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 48px rgba(139, 111, 71, 0.12);
            border-color: rgba(139, 111, 71, 0.3);
        }

        .feature-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #8b6f47 0%, #c8a878 100%);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-bottom: 20px;
        }

        /* Stats */
        .stat-item {
            text-align: center;
        }

        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            background: linear-gradient(135deg, #8b6f47 0%, #c8a878 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
        }

        .stat-label {
            font-weight: 600;
            color: #2c1810;
            margin-bottom: 4px;
        }

        .stat-description {
            font-size: 14px;
            color: #666;
        }

        /* Decorative elements */
        .blob {
            position: absolute;
            border-radius: 50%;
            opacity: 0.3;
            filter: blur(80px);
            pointer-events: none;
        }

        .blob-1 {
            width: 500px;
            height: 500px;
            background: linear-gradient(135deg, #8b6f47, #c8a878);
            top: -200px;
            left: -200px;
        }

        .blob-2 {
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #c8a878, #e8ddd4);
            bottom: -150px;
            right: -150px;
        }

        /* Section spacing */
        section {
            position: relative;
            z-index: 1;
        }

        .section-padding {
            padding-top: 80px;
            padding-bottom: 80px;
        }

        @media (max-width: 768px) {
            .section-padding {
                padding-top: 50px;
                padding-bottom: 50px;
            }
        }
    </style>
</head>

<body class="antialiased overflow-x-hidden">

    <!-- Background blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <!-- Navigation Header -->
    <header class="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-coffee-100">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brown to-coffee-600 flex items-center justify-center text-white font-bold text-lg">
                    ☕
                </div>
                <span class="font-bold text-xl text-darkBrown tracking-tight font-display">{{ config('app.name', 'Brew & Breathe') }}</span>
            </a>

            <!-- Navigation Links -->
            @if (Route::has('login'))
                <nav class="hidden md:flex items-center gap-8">
                    @auth
                        <a href="{{ url('/dashboard') }}" class="btn-primary">Dashboard</a>
                    @else
                        <a href="{{ route('login') }}" class="text-darkBrown hover:text-brown font-500 transition-colors">Masuk</a>
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="btn-secondary">Daftar Gratis</a>
                        @endif
                    @endauth
                </nav>

                <!-- Mobile menu -->
                <div class="md:hidden flex items-center gap-4">
                    @auth
                        <a href="{{ url('/dashboard') }}" class="btn-primary text-sm px-4 py-2">Dashboard</a>
                    @else
                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="btn-primary text-sm px-4 py-2">Daftar</a>
                        @endif
                    @endauth
                </div>
            @endif
        </div>
    </header>

    <!-- Main Content -->
    <main class="relative">

        <!-- Hero Section -->
        <section class="section-padding pt-40 pb-32 max-w-7xl mx-auto px-6">
            <div class="text-center max-w-3xl mx-auto">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coffee-100 border border-coffee-300 text-sm font-600 text-brown mb-8 animate-fade-in">
                    <span class="w-2 h-2 rounded-full bg-brown animate-pulse"></span>
                    Platform untuk Kesehatan Mental
                </div>

                <!-- Hero Heading -->
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-darkBrown leading-[1.1] mb-6 animate-fade-in delay-100">
                    Temukan Kedamaian
                    <span class="block gradient-text">di Setiap Tegukan</span>
                </h1>

                <!-- Hero Subheading -->
                <p class="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 animate-fade-in delay-200 max-w-2xl mx-auto">
                    Platform kurasi coffee shop terbaik yang dirancang khusus untuk kesehatan mental. Jelajahi ruang tenang, pantau energi sosial Anda, dan terhubung dengan komunitas yang memahami.
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="btn-primary">Mulai Perjalanan Gratis</a>
                    @endif
                    <a href="#features" class="btn-secondary">Pelajari Lebih Lanjut</a>
                </div>
            </div>

            <!-- Hero Visual -->
            <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade delay-400">
                <div class="glass-card p-8 rounded-2xl text-center">
                    <div class="text-4xl mb-3">🔇</div>
                    <h3 class="font-bold text-darkBrown mb-2">Ruang Sunyi</h3>
                    <p class="text-sm text-gray-600">Di bawah 50dB</p>
                </div>
                <div class="glass-card p-8 rounded-2xl text-center">
                    <div class="text-4xl mb-3">🔋</div>
                    <h3 class="font-bold text-darkBrown mb-2">Social Battery</h3>
                    <p class="text-sm text-gray-600">Pantau Energi Anda</p>
                </div>
                <div class="glass-card p-8 rounded-2xl text-center">
                    <div class="text-4xl mb-3">👥</div>
                    <h3 class="font-bold text-darkBrown mb-2">Komunitas</h3>
                    <p class="text-sm text-gray-600">5K+ Anggota Aktif</p>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section id="features" class="section-padding bg-warm/50">
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center max-w-2xl mx-auto mb-20">
                    <h2 class="text-4xl md:text-5xl font-bold text-darkBrown mb-6">Fitur Unggulan</h2>
                    <p class="text-lg text-gray-600">Semua yang Anda butuhkan untuk menemukan kedamaian dan produktivitas optimal</p>
                </div>

                <!-- Bento Grid Features -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="feature-card glass-card lg:col-span-2 p-8 md:p-12 min-h-[320px] flex flex-col justify-between bg-white">
                        <div>
                            <div class="feature-icon">🎯</div>
                            <h3 class="text-2xl md:text-3xl font-bold text-darkBrown mb-4">Smart Coffee Shop Discovery</h3>
                            <p class="text-gray-600 leading-relaxed">
                                Temukan kedai kopi dengan zona sunyi tertentu, tingkat kebisingan terukur, dan ramah untuk produktivitas. Kami menyeleksi setiap detail untuk kenyamanan Anda.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 2 -->
                    <div class="feature-card glass-card p-8 min-h-[320px] flex flex-col justify-between bg-white">
                        <div>
                            <div class="feature-icon">📊</div>
                            <h3 class="text-2xl font-bold text-darkBrown mb-4">Insights Real-time</h3>
                            <p class="text-gray-600 leading-relaxed">
                                Analytics lengkap tentang pola produktivitas dan preferensi tempat Anda.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 3 -->
                    <div class="feature-card glass-card p-8 min-h-[320px] flex flex-col justify-between bg-white">
                        <div>
                            <div class="feature-icon">⚡</div>
                            <h3 class="text-2xl font-bold text-darkBrown mb-4">Social Battery Tracker</h3>
                            <p class="text-gray-600 leading-relaxed">
                                Ukur kapasitas sosial harian dan dapatkan rekomendasi ruang yang sesuai.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 4 -->
                    <div class="feature-card glass-card p-8 min-h-[320px] flex flex-col justify-between bg-white">
                        <div>
                            <div class="feature-icon">👥</div>
                            <h3 class="text-2xl font-bold text-darkBrown mb-4">Community Hub</h3>
                            <p class="text-gray-600 leading-relaxed">
                                Berbagi cerita, mendapat dukungan, dan temukan teman sejati yang memahami.
                            </p>
                        </div>
                    </div>

                    <!-- Feature 5 -->
                    <div class="feature-card glass-card lg:col-span-2 p-8 md:p-12 min-h-[320px] flex flex-col justify-between bg-white">
                        <div>
                            <div class="feature-icon">🏆</div>
                            <h3 class="text-2xl md:text-3xl font-bold text-darkBrown mb-4">Komunitas Gathering & Events</h3>
                            <p class="text-gray-600 leading-relaxed">
                                Ikuti gathering komunitas, networking sessions, dan mendapat kesempatan bertemu dengan individu yang peduli kesehatan mental.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Social Proof Section -->
        <section class="section-padding max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="stat-item animate-fade-in delay-100">
                    <div class="stat-number">250+</div>
                    <p class="stat-label">Coffee Shops</p>
                    <p class="stat-description">Terpilih dan terkurasi</p>
                </div>
                <div class="stat-item animate-fade-in delay-200">
                    <div class="stat-number">5K+</div>
                    <p class="stat-label">Komunitas Aktif</p>
                    <p class="stat-description">Individu yang peduli kesehatan mental</p>
                </div>
                <div class="stat-item animate-fade-in delay-300">
                    <div class="stat-number">100%</div>
                    <p class="stat-label">Aman & Privat</p>
                    <p class="stat-description">Data terenkripsi dengan standar enterprise</p>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="section-padding bg-gradient-to-br from-brown via-coffee-600 to-darkBrown text-white">
            <div class="max-w-3xl mx-auto text-center px-6">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Siap Memulai Perjalanan Anda?</h2>
                <p class="text-xl opacity-90 mb-10">
                    Bergabunglah dengan ribuan individu yang telah menemukan keseimbangan mental. Gratis, mudah, dan tanpa komitmen.
                </p>
                @if (Route::has('register'))
                    <a href="{{ route('register') }}" class="inline-block bg-white text-brown px-10 py-4 rounded-full font-bold text-lg hover:bg-cream transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Daftar Sekarang →
                    </a>
                @endif
            </div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="bg-darkBrown text-white border-t border-coffee-800">
        <div class="max-w-7xl mx-auto px-6 py-20">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <!-- Brand -->
                <div>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-8 h-8 rounded-lg bg-coffee-600 flex items-center justify-center text-white font-bold">☕</div>
                        <span class="font-bold text-xl">{{ config('app.name', 'Brew & Breathe') }}</span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed">Platform kesehatan mental melalui coffee shop terbaik. Temukan kedamaian, bangun komunitas, tingkatkan produktivitas.</p>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="font-bold mb-6">Platform</h4>
                    <ul class="space-y-3 text-sm text-gray-300">
                        <li><a href="#" class="hover:text-white transition-colors">Jelajahi Kedai</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Komunitas</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Insights</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Gathering</a></li>
                    </ul>
                </div>

                <!-- Company -->
                <div>
                    <h4 class="font-bold mb-6">Tentang</h4>
                    <ul class="space-y-3 text-sm text-gray-300">
                        <li><a href="#" class="hover:text-white transition-colors">Tentang Kami</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Kontak</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Karir</a></li>
                    </ul>
                </div>

                <!-- Legal -->
                <div>
                    <h4 class="font-bold mb-6">Legal</h4>
                    <ul class="space-y-3 text-sm text-gray-300">
                        <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Footer -->
            <div class="border-t border-coffee-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
                <p>&copy; 2026 {{ config('app.name', 'Brew & Breathe') }}. All rights reserved.</p>
                <div class="flex items-center gap-8 mt-6 md:mt-0">
                    <a href="#" class="hover:text-white transition-colors">Twitter</a>
                    <a href="#" class="hover:text-white transition-colors">Instagram</a>
                    <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('opacity-0');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-fade-in, .animate-fade, .animate-slide-left').forEach(el => {
            observer.observe(el);
        });
    </script>

</body>
</html>
