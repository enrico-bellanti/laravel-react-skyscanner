<?php

namespace Database\Seeders;

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
        $json = file_get_contents('database/data/airports_short_list.json');
        $airports = json_decode($json, true);
        foreach ($airports as $airport) {
            DB::table('airports')->upsert([
                "name" => $airport['name'],
                "code" => $airport['code'],
                "lat" => $airport['lat'],
                "lng" => $airport['lon']
            ], 'id');
        }
    }
}
