<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('app.name', 'Brew & Breathe') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
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
                        fontFamily: { sans: ['Instrument Sans', 'sans-serif'] },
                        colors: {
                            espresso: '#0f0e0d',
                            mocha: '#1a1816',
                            latte: '#c6a88b',
                            sage: '#8a9b83'
                        }
                    }
                }
            }
        </script>

        <style>
            body {
                background-color: #0f0e0d;
                color: #f4f4f5;
                font-family: 'Instrument Sans', sans-serif;
            }

            .noise-bg {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
            }

            .hero-gradient {
                background: linear-gradient(135deg, rgba(198, 168, 139, 0.1), transparent);
                pointer-events: none;
            }

            .feature-card-hover:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
            }

            .icon-box {
                width: 48px;
                height: 48px;
                border-radius: 12px;
                background: rgba(198, 168, 139, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .stat-number {
                font-size: 2.5rem;
                font-weight: 700;
                background: linear-gradient(135deg, #c6a88b, #ddbfa3);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .scroll-smooth {
                scroll-behavior: smooth;
            }

            /* Fade in animation */
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

            .animate-fade-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }

            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-400 { animation-delay: 0.4s; }
        </style>
    </head>

    <body class="antialiased min-h-screen relative overflow-x-hidden noise-bg selection:bg-latte selection:text-espresso scroll-smooth">

        <!-- Decorative Background Elements -->
        <div class="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-latte/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div class="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] bg-sage/5 blur-[100px] rounded-full pointer-events-none"></div>

        <!-- Navigation Header -->
        <header class="fixed top-0 w-full z-50 border-b border-white/5 bg-espresso/60 backdrop-blur-xl">
            <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <!-- Logo -->
                <a href="/" class="flex items-center gap-3 group">
                    <div class="h-8 w-8 rounded-lg bg-mocha border border-white/10 flex items-center justify-center group-hover:border-latte/50 transition-all">
                        <div class="h-2 w-2 bg-latte rounded-full"></div>
                    </div>
                    <span class="font-bold tracking-wide text-lg text-white">{{ config('app.name', 'Brew & Breathe') }}</span>
                </a>

                <!-- Navigation Links -->
                @if (Route::has('login'))
                    <nav class="flex items-center gap-6">
                        @auth
                            <a href="{{ url('/dashboard') }}" class="px-5 py-2.5 rounded-full bg-latte text-espresso font-semibold text-sm hover:bg-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                Dashboard
                            </a>
                        @else
                            <a href="{{ route('login') }}" class="text-sm font-medium text-white/60 hover:text-white transition-colors">Masuk</a>
                            @if (Route::has('register'))
                                <a href="{{ route('register') }}" class="px-5 py-2.5 rounded-full border border-white/10 bg-mocha text-white text-sm font-medium hover:border-latte/50 transition-all hidden sm:block">Gabung</a>
                            @endif
                        @endauth
                    </nav>
                @endif
            </div>
        </header>

        <!-- Main Content -->
        <main class="relative z-10 pt-40 pb-32 max-w-7xl mx-auto px-6">

            <!-- Hero Section -->
            <section class="text-center flex flex-col items-center mb-32 hero-gradient">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sage/30 bg-sage/10 text-xs font-medium text-sage mb-8 animate-fade-in">
                    <span class="w-1.5 h-1.5 rounded-full bg-sage animate-pulse-soft"></span>
                    Ruang aman untuk pikiran bisingmu
                </div>

                <!-- Hero Heading -->
                <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl leading-[1.1] mb-6 animate-fade-in delay-100">
                    Redakan bising dunia.
                    <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-latte via-latte to-latte/60">
                        Temukan ruang tenangmu.
                    </span>
                </h1>

                <!-- Hero Subheading -->
                <p class="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mb-12 animate-fade-in delay-200">
                    Platform kurasi coffee shop hening yang dirancang khusus untuk kesehatan mental. Cari sudut sunyi, pantau baterai sosialmu, dan nikmati kopi dengan damai bersama komunitas yang memahami.
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32 animate-fade-in delay-300">
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="px-8 py-3.5 rounded-full bg-latte text-espresso font-semibold text-base hover:bg-white transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 w-full sm:w-auto text-center">
                            Mulai Perjalanan
                        </a>
                    @endif
                    <a href="#features" class="px-8 py-3.5 rounded-full border border-white/10 bg-mocha/50 text-white font-semibold text-base hover:border-white/30 transition-all backdrop-blur-sm w-full sm:w-auto text-center">
                        Pelajari Lebih Lanjut
                    </a>
                </div>
            </section>

            <!-- Features Section -->
            <section id="features" class="mb-32">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Fitur Unggulan</h2>
                    <p class="text-white/40 max-w-xl mx-auto">Platform lengkap untuk menemukan kedamaian mental dan ruang yang sempurna untuk produktivitas.</p>
                </div>

                <!-- Features Grid - Asymmetrical Bento Layout -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    <!-- Feature 1: Quiet Spaces (Large) -->
                    <div class="md:col-span-1 lg:col-span-2 rounded-2xl border border-white/5 bg-mocha/50 p-8 md:p-10 backdrop-blur-md min-h-[300px] flex flex-col justify-between feature-card-hover transition-all">
                        <div>
                            <div class="icon-box mb-6">🔇</div>
                            <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">Quiet Spaces</h3>
                            <p class="text-white/50 text-base leading-relaxed max-w-md">
                                Kami menyeleksi kedai kopi dengan zona sunyi khusus, tingkat bising di bawah 50dB, dan ramah untuk produktivitas serta ketenangan pikiran.
                            </p>
                        </div>
                        <div class="flex items-end justify-between pt-6 border-t border-white/5">
                            <span class="text-xs text-latte tracking-widest uppercase font-mono">01 / Mencari Ketenangan</span>
                            <div class="stat-number">50dB</div>
                        </div>
                    </div>

                    <!-- Feature 2: Social Battery (Medium) -->
                    <div class="md:col-span-1 lg:col-span-1 rounded-2xl border border-white/5 bg-mocha/50 p-8 backdrop-blur-md min-h-[300px] flex flex-col justify-between feature-card-hover transition-all">
                        <div>
                            <div class="icon-box mb-6">🔋</div>
                            <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Social Battery</h3>
                            <p class="text-white/50 text-sm leading-relaxed">
                                Ukur kapasitas energi sosial harian dan dapatkan rekomendasi ruang yang tepat.
                            </p>
                        </div>
                        <div class="flex items-end justify-between pt-6 border-t border-white/5">
                            <span class="text-xs text-sage tracking-widest uppercase font-mono">02 / Cerdas</span>
                        </div>
                    </div>

                    <!-- Feature 3: Community Hub (Medium) -->
                    <div class="md:col-span-1 lg:col-span-1 rounded-2xl border border-white/5 bg-mocha/50 p-8 backdrop-blur-md min-h-[300px] flex flex-col justify-between feature-card-hover transition-all">
                        <div>
                            <div class="icon-box mb-6">👥</div>
                            <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Community</h3>
                            <p class="text-white/50 text-sm leading-relaxed">
                                Terhubung dengan komunitas yang memahami, berbagi pengalaman, dan saling mendukung.
                            </p>
                        </div>
                        <div class="flex items-end justify-between pt-6 border-t border-white/5">
                            <span class="text-xs text-latte tracking-widest uppercase font-mono">03 / Bersama</span>
                        </div>
                    </div>

                    <!-- Feature 4: Insights & Analytics (Large) -->
                    <div class="md:col-span-2 lg:col-span-2 rounded-2xl border border-white/5 bg-mocha/50 p-8 md:p-10 backdrop-blur-md min-h-[300px] flex flex-col justify-between feature-card-hover transition-all">
                        <div>
                            <div class="icon-box mb-6">📊</div>
                            <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">Insights & Analytics</h3>
                            <p class="text-white/50 text-base leading-relaxed max-w-lg">
                                Pantau pola produktivitas, analisis preferensi tempat, dan temukan space trending yang sesuai dengan gaya hidup sehat mental.
                            </p>
                        </div>
                        <div class="flex items-end justify-between pt-6 border-t border-white/5">
                            <span class="text-xs text-sage tracking-widest uppercase font-mono">04 / Pemahaman Diri</span>
                        </div>
                    </div>

                </div>
            </section>

            <!-- Social Proof Section -->
            <section class="mb-32">
                <div class="rounded-2xl border border-white/5 bg-mocha/30 backdrop-blur-md p-12 md:p-16">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                        <!-- Stat 1 -->
                        <div class="text-center md:text-left flex flex-col items-center md:items-start gap-3">
                            <div class="stat-number">250+</div>
                            <div>
                                <p class="text-white font-semibold">Coffee Shops</p>
                                <p class="text-white/40 text-sm">Pilihan terkurasi untuk ketenangan</p>
                            </div>
                        </div>

                        <!-- Stat 2 -->
                        <div class="text-center md:text-left flex flex-col items-center md:items-start gap-3">
                            <div class="stat-number">5K+</div>
                            <div>
                                <p class="text-white font-semibold">Komunitas</p>
                                <p class="text-white/40 text-sm">Individu yang peduli kesehatan mental</p>
                            </div>
                        </div>

                        <!-- Stat 3 -->
                        <div class="text-center md:text-left flex flex-col items-center md:items-start gap-3">
                            <div class="stat-number">100%</div>
                            <div>
                                <p class="text-white font-semibold">Aman & Privat</p>
                                <p class="text-white/40 text-sm">Data Anda terlindungi dengan enkripsi</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <!-- Final CTA Section -->
            <section class="text-center mb-32">
                <div class="max-w-2xl mx-auto">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
                        Siap Menemukan <span class="text-latte">Ruang Tenang</span>-mu?
                    </h2>
                    <p class="text-white/50 text-lg mb-8">
                        Bergabung dengan ribuan individu yang telah menemukan keseimbangan mental mereka. Mulai perjalanan sekarang, gratis.
                    </p>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="inline-block px-10 py-4 rounded-full bg-latte text-espresso font-bold text-base md:text-lg hover:bg-white transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                            Daftar Sekarang
                        </a>
                    @endif
                </div>
            </section>

        </main>

        <!-- Footer -->
        <footer class="border-t border-white/5 bg-mocha/40 backdrop-blur-md mt-24">
            <div class="max-w-7xl mx-auto px-6 py-16">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <!-- Brand -->
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                            <div class="h-6 w-6 rounded-lg bg-mocha border border-white/10 flex items-center justify-center">
                                <div class="h-1.5 w-1.5 bg-latte rounded-full"></div>
                            </div>
                            <span class="font-bold text-white">{{ config('app.name', 'Brew & Breathe') }}</span>
                        </div>
                        <p class="text-white/40 text-sm">Platform untuk menemukan ketenangan dan kesehatan mental melalui coffee shop terbaik.</p>
                    </div>

                    <!-- Links 1 -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Platform</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Jelajahi Kedai</a></li>
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Komunitas</a></li>
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Insights</a></li>
                        </ul>
                    </div>

                    <!-- Links 2 -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Tentang</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Tentang Kami</a></li>
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Blog</a></li>
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Kontak</a></li>
                        </ul>
                    </div>

                    <!-- Links 3 -->
                    <div>
                        <h4 class="text-white font-semibold mb-4">Legal</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" class="text-white/40 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
                        </ul>
                    </div>

                </div>

                <!-- Bottom Footer -->
                <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
                    <p>&copy; 2026 {{ config('app.name', 'Brew & Breathe') }}. Semua hak dilindungi.</p>
                    <div class="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" class="hover:text-white transition-colors">Twitter</a>
                        <a href="#" class="hover:text-white transition-colors">Instagram</a>
                        <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>

    </body>
</html>
