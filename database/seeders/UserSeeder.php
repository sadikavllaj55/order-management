<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::factory()->create([
            'name' => 'Sadik Avllaj',
            'email' => 'sadik@ordermanagement.web',
            'password' => 'password'
        ]);
    }
}
