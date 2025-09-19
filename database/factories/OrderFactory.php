<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'customer_id' => Customer::inRandomOrder()->first()->id ?? Customer::factory(),
            'total'       => $this->faker->randomFloat(2, 10, 1000),
            'status'      => $this->faker->randomElement(['processing','shipped','delivered','canceled']),
            'notes'       => $this->faker->sentence(),
            'created_by'  => 1,
            'updated_by'  => null,
            'deleted_by'  => null,
        ];
    }
}
