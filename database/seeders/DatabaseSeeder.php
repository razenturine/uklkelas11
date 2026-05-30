<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CoffeeShop;
use App\Models\Kecamatan;
use App\Models\CoffeeShopReview;
use App\Models\Komunitas;
use App\Models\CommunityMember;
use App\Models\CommunityPost;
use App\Models\CommunityComment;
use App\Models\GatheringRequest;
use App\Models\LoginLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     *
     * TEST ACCOUNTS FOR QUICK LOGIN:
     * ===========================
     * Admin:  admin@dailycoffee.com / admin123
     * User 1: user1@example.com / password
     * User 2: user2@example.com / password
     *
     * This creates minimal test data for quick dashboard testing.
     * Adjust the loop counts below to seed more data if needed.
     */
    public function run(): void
    {
        // Create Kecamatan
        $kecamatan = [
            ['name' => 'Tegalsari'],
            ['name' => 'Krembangan'],
            ['name' => 'Semampir'],
            ['name' => 'Bubutan'],
            ['name' => 'Genteng'],
            ['name' => 'Simokerto'],
            ['name' => 'Putat Jaya'],
            ['name' => 'Wonokromo'],
            ['name' => 'Sawahan'],
            ['name' => 'Kenjeran'],
        ];

        foreach ($kecamatan as $k) {
            Kecamatan::create($k);
        }

        // Create Users - Minimal test setup
        $adminUser = User::create([
            'name' => 'Admin Dashboard',
            'email' => 'admin@dailycoffee.com',
            'username' => 'admin',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'bio' => 'Platform administrator untuk Brew & Breathe',
        ]);

        $regularUsers = [];
        for ($i = 1; $i <= 2; $i++) {
            $user = User::create([
                'name' => "Coffee Enthusiast $i",
                'email' => "user$i@example.com",
                'username' => "user$i",
                'password' => bcrypt('password'),
                'role' => 'user',
                'bio' => "Pecinta kopi dan pengguna komunitas Brew & Breathe",
            ]);
            $regularUsers[] = $user;
        }

        $allUsers = array_merge([$adminUser], $regularUsers);

        // Create Coffee Shops with Image URLs
        $coffeeShops = [];
        $coffeeNames = [
            ['Brew Haven', 'Tegalsari', 'Jl. Urip Sumoharjo No. 123', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
            ['Serenity Café', 'Krembangan', 'Jl. Pemuda No. 456', 'https://images.unsplash.com/photo-1553531889-e6cf89e18b47?w=400'],
            ['Coffee Hub', 'Semampir', 'Jl. Kalilembang No. 789', 'https://images.unsplash.com/photo-1497636577773-f900e46b6721?w=400'],
            ['The Quiet Corner', 'Bubutan', 'Jl. Basuki Rahmat No. 321', 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400'],
            ['Mind & Coffee', 'Genteng', 'Jl. Tunjungan No. 654', 'https://images.unsplash.com/photo-1442512595331-e89e6ead111a?w=400'],
            ['Bean Scene', 'Simokerto', 'Jl. Gubernur Suryo No. 987', 'https://images.unsplash.com/photo-1559056169-641ef0c8ec21?w=400'],
            ['Café Mindfulness', 'Putat Jaya', 'Jl. Darmawangsa No. 111', 'https://images.unsplash.com/photo-1521017603022-fada9986d824?w=400'],
            ['Espresso Express', 'Wonokromo', 'Jl. Raya Darmo No. 222', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
            ['Zen Brew', 'Sawahan', 'Jl. Ketintang No. 333', 'https://images.unsplash.com/photo-1493559671911-586f282eaece?w=400'],
            ['Coffee Oasis', 'Kenjeran', 'Jl. Pantai Cemara No. 444', 'https://images.unsplash.com/photo-1505778276668-16b3ce4b9900?w=400'],
            ['Urban Roast', 'Tegalsari', 'Jl. Dr. Sutomo No. 555', 'https://images.unsplash.com/photo-1541123603104-852fc5d408fa?w=400'],
            ['The Cozy Cup', 'Krembangan', 'Jl. Embong Malang No. 666', 'https://images.unsplash.com/photo-1511537190424-f06d546fdf4e?w=400'],
            ['Silence Café', 'Semampir', 'Jl. Rajawali No. 777', 'https://images.unsplash.com/photo-1445066601471-821f11d9c5d6?w=400'],
            ['Mental Brew', 'Bubutan', 'Jl. Gadjah Mada No. 888', 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=400'],
            ['Peaceful Pour', 'Genteng', 'Jl. Diponegoro No. 999', 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'],
            ['Brew & Breathe', 'Simokerto', 'Jl. Pemuda No. 1010', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400'],
            ['Coffee Sanctuary', 'Putat Jaya', 'Jl. Sunset Blvd No. 1111', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400'],
            ['The Daily Grind', 'Wonokromo', 'Jl. Ngagel No. 1212', 'https://images.unsplash.com/photo-1491566182143-4a39ffc38b1c?w=400'],
            ['Mindful Moments', 'Sawahan', 'Jl. Raya Lontar No. 1313', 'https://images.unsplash.com/photo-1487700492018-f78ec6d27ebf?w=400'],
            ['Spirit Brew', 'Kenjeran', 'Jl. Siur Laya No. 1414', 'https://images.unsplash.com/photo-1503765917141-f3753a1d7764?w=400'],
        ];

        foreach ($coffeeNames as [$name, $kecamatanName, $alamat, $imageUrl]) {
            $kec = Kecamatan::where('name', $kecamatanName)->first();
            $coffeeShops[] = CoffeeShop::create([
                'nama' => $name,
                'daerah' => 'Surabaya',
                'kecamatan' => $kecamatanName,
                'kecamatan_id' => $kec->id,
                'alamat' => $alamat,
                'jam_buka' => '07:00',
                'jam_tutup' => '22:00',
                'harga_min' => 15000,
                'harga_max' => 85000,
                'rating' => rand(35, 50) / 10,
                'deskripsi' => "Kedai kopi $name menyediakan suasana tenang dan nyaman untuk bekerja atau bersantai. Dilengkapi dengan WiFi gratis dan tempat parkir yang luas.",
                'image_url' => $imageUrl,
            ]);
        }

        // Create Coffee Shop Reviews
        for ($i = 0; $i < 30; $i++) {
            CoffeeShopReview::create([
                'user_id' => $regularUsers[rand(0, 7)]->id,
                'coffee_shop_id' => $coffeeShops[rand(0, 19)]->id,
                'rating' => rand(3, 5),
                'review' => 'Tempat yang bagus untuk bekerja dengan suasana yang tenang dan kopi yang enak.',
            ]);
        }

        // Create Communities
        $komunitas = [];
        $komunitas[] = Komunitas::create([
            'nama_komunitas' => 'Kopi & Kesehatan Mental',
            'domisili' => 'Surabaya',
            'ketua' => 'Budi Santoso',
            'deskripsi' => 'Komunitas penggemar kopi yang peduli kesehatan mental',
            'tanggal_dibentuk' => now()->subMonths(6),
            'jumlah_anggota' => 45,
            'kontak' => '081234567890',
            'status' => 'aktif',
        ]);

        $komunitas[] = Komunitas::create([
            'nama_komunitas' => 'Coffee Lovers Network',
            'domisili' => 'Surabaya',
            'ketua' => 'Siti Rahma',
            'deskripsi' => 'Jaringan pecinta kopi di Surabaya',
            'tanggal_dibentuk' => now()->subMonths(8),
            'jumlah_anggota' => 62,
            'kontak' => '082345678901',
            'status' => 'aktif',
        ]);

        $komunitas[] = Komunitas::create([
            'nama_komunitas' => 'Serenity Circle',
            'domisili' => 'Surabaya',
            'ketua' => 'Ahmad Wijaya',
            'deskripsi' => 'Komunitas untuk menemukan kedamaian melalui kopi',
            'tanggal_dibentuk' => now()->subMonths(4),
            'jumlah_anggota' => 38,
            'kontak' => '083456789012',
            'status' => 'aktif',
        ]);

        // Create Community Members
        foreach ($komunitas as $k) {
            // Add some users to communities with varied roles
            foreach ($regularUsers as $idx => $user) {
                if ($idx < 5) {
                    $role = $idx === 0 ? 'leader' : 'member';
                    CommunityMember::create([
                        'community_id' => $k->id,
                        'user_id' => $user->id,
                        'role' => $role,
                        'joined_at' => now()->subDays(rand(1, 180)),
                    ]);
                }
            }
        }

        // Create Community Posts
        foreach ($komunitas as $k) {
            for ($i = 0; $i < 5; $i++) {
                $post = CommunityPost::create([
                    'community_id' => $k->id,
                    'user_id' => $regularUsers[rand(0, 4)]->id,
                    'content' => "Postingan menarik tentang perjalanan kopi dan kesehatan mental. Berbagi pengalaman dan tips untuk menemukan kedamaian di setiap cangkir.",
                ]);

                // Add comments to posts
                for ($j = 0; $j < 3; $j++) {
                    CommunityComment::create([
                        'post_id' => $post->id,
                        'user_id' => $regularUsers[rand(0, 4)]->id,
                        'comment' => 'Komentar yang bagus dan menginspirasi tentang pengalaman bersama komunitas kita.',
                    ]);
                }
            }
        }

        // Create Gathering Requests
        for ($i = 0; $i < 10; $i++) {
            GatheringRequest::create([
                'community_id' => $komunitas[rand(0, 2)]->id,
                'coffee_shop_id' => $coffeeShops[rand(0, 19)]->id,
                'requested_by' => $regularUsers[rand(0, 4)]->id,
                'title' => 'Coffee Gathering ' . ($i + 1),
                'description' => 'Acara gathering komunitas kopi dan kesehatan mental',
                'event_date' => now()->addDays(rand(1, 60)),
                'status' => ['pending', 'approved', 'rejected'][rand(0, 2)],
            ]);
        }

        // Create Login Logs
        for ($i = 0; $i < 50; $i++) {
            LoginLog::create([
                'user_id' => $allUsers[rand(0, count($allUsers) - 1)]->id,
                'ip_address' => '192.168.' . rand(0, 255) . '.' . rand(0, 255),
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'login_at' => now()->subDays(rand(0, 30)),
            ]);
        }
    }
}
