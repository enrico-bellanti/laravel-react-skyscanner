<?php

namespace Database\Factories;

use App\Models\Airport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Flight>
 */
class FlightFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $codes = Airport::inRandomOrder()->limit(2)->pluck('code')->toArray();
        return [
            "code_departure" => $codes[0],
            "code_arrival" => $codes[1],
            "price" => rand(500, 100000) / 100,
        ];
    }
}
