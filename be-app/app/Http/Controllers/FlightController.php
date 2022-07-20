<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource by search.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listBySearch(Request $request)
    {
        $flight_list = [];
        $validated = $request->validate([
            'code_departure' => 'required|string|exists:airports,code|max:3',
            'code_arrival' => 'required|string|exists:airports,code|max:3',
        ]);

        $dep_code = $validated['code_departure'];
        $arr_code = $validated['code_arrival'];

        // NO STEPOVER
        $flight_list['STEPOVER_0'] = DB::table('flights')
            ->where($validated)
            ->select(
                'id AS id_1',
                'code_departure AS code_departure_1',
                'code_arrival AS code_arrival_1',
                'price AS price_1',
                'created_at AS created_at_1',
                'updated_at AS updated_at_1',
            )
            ->get();

        // 1 STEOVER
        $flight_list['STEPOVER_1'] = DB::table('flights AS FLT1')
            ->where('FLT1.code_departure', $dep_code)
            ->whereNot('FLT1.code_arrival', $arr_code)
            ->join('flights AS FLT2', 'FLT1.code_arrival', '=', 'FLT2.code_departure')
            ->whereNot('FLT2.code_departure', $dep_code)
            ->where('FLT2.code_arrival', $arr_code)
            ->select(
                'FLT1.id AS id_1',
                'FLT1.code_departure AS code_departure_1',
                'FLT1.code_arrival AS code_arrival_1',
                'FLT1.price AS price_1',
                'FLT1.created_at AS created_at_1',
                'FLT1.updated_at AS updated_at_1',
                'FLT2.id AS id_2',
                'FLT2.code_departure AS code_departure_2',
                'FLT2.code_arrival AS code_arrival_2',
                'FLT2.price AS price_2',
                'FLT2.created_at AS created_at_2',
                'FLT2.updated_at AS updated_at_2'
            )
            ->get();

        // 2 STEOVER
        $flight_list['STEPOVER_2'] = DB::table('flights AS FLT1')
            ->where('FLT1.code_departure', $dep_code)
            ->whereNot('FLT1.code_arrival', $arr_code)
            ->join('flights AS FLT2', 'FLT1.code_arrival', '=', 'FLT2.code_departure')
            ->whereNot('FLT2.code_departure', $dep_code)
            ->whereNot('FLT2.code_arrival', $arr_code)
            ->join('flights AS FLT3', 'FLT2.code_arrival', '=', 'FLT3.code_departure')
            ->whereNot('FLT3.code_departure', $dep_code)
            ->where('FLT3.code_arrival', $arr_code)
            ->select(
                'FLT1.id AS id_1',
                'FLT1.code_departure AS code_departure_1',
                'FLT1.code_arrival AS code_arrival_1',
                'FLT1.price AS price_1',
                'FLT1.created_at AS created_at_1',
                'FLT1.updated_at AS updated_at_1',
                'FLT2.id AS id_2',
                'FLT2.code_departure AS code_departure_2',
                'FLT2.code_arrival AS code_arrival_2',
                'FLT2.price AS price_2',
                'FLT2.created_at AS created_at_2',
                'FLT2.updated_at AS updated_at_2',
                'FLT3.id AS id_3',
                'FLT3.code_departure AS code_departure_3',
                'FLT3.code_arrival AS code_arrival_3',
                'FLT3.price AS price_3',
                'FLT3.created_at AS created_at_3',
                'FLT3.updated_at AS updated_at_3'
            )
            ->get();

        return response()->json($flight_list);
    }
}
