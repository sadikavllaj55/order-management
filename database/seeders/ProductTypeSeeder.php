<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypeSeeder extends Seeder
{
    public function run()
    {
        $types = [
            ['name' => 'Electronics', 'description' => 'Electronic items and gadgets'],
            ['name' => 'Clothing', 'description' => 'Apparel and garments'],
            ['name' => 'Books', 'description' => 'Books and printed materials'],
            ['name' => 'Furniture', 'description' => 'Home and office furniture'],
            ['name' => 'Toys', 'description' => 'Toys and games for children'],
        ];

        foreach ($types as $type) {
            DB::table('product_types')->insert($type);
        }
    }
}
