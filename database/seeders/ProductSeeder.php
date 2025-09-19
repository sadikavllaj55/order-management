<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $productTypes = DB::table('product_types')->pluck('id')->toArray();

        for ($i = 1; $i <= 40; $i++) {
            $typeId = $productTypes[array_rand($productTypes)];

            DB::table('products')->insert([
                'product_type_id' => $typeId,
                'name' => 'Product ' . $i,
                'description' => 'Description for Product ' . $i,
                'price' => rand(10, 500) + rand(0, 99)/100,
                'stock' => rand(0, 100),
                'sku' => strtoupper(Str::random(8)),
                'status' => rand(0, 1), // 0 = inactive, 1 = active
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
