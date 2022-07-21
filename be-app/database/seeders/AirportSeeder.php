<?php

namespace Database\Seeders;

use App\Models\Airport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use File;
use Illuminate\Support\Facades\DB;

class AirportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = file_get_contents('database/data/airports.json');
        $airports = json_decode($json, true);
        $randomElms = array_rand($airports, 20);
        foreach ($randomElms as $elmKey) {
            $airport = $airports[$elmKey];
            if ($airport['name'] !== "" && $airport['code'] !== "" && $airport['lat'] !== "" && $airport['lon'] !== "") {
                Airport::updateOrCreate([
                    "name" => $airport['name'],
                    "code" => $airport['code'],
                    "lat" => $airport['lat'],
                    "lng" => $airport['lon']
                ]);
            }
        }
    }
}
