<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| INERTIA ROUTES (SKENA OVERHAUL)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Auth', ['type' => 'login']);
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Auth', ['type' => 'register']);
})->name('register');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->name('admin');

// Note: I replaced the old web.php since the user instructed:
// "Yes, just write placeholder Inertia routes in routes/web.php that return these React views using the mock data. 
// We will scaffold the actual database, models, and controllers later."
