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

        // $per_page = $request->get('per_page', 25);
        // $sort = $request->get('sort', 'price');
        // $order = $request->get('order', 'DESC');

        $dep_code = $validated['code_departure'];
        $arr_code = $validated['code_arrival'];

        // NO STEPOVER
        // $flight_list['STEPOVER_0'] = DB::table('flights')
        //     ->where($validated)
        //     ->get();

        // 1 STEOVER
        $flight_list['STEPOVER_1'] = DB::table('flights AS FLT1')
            ->where('FLT1.code_departure', $dep_code)
            ->whereNot('FLT1.code_arrival', $arr_code)
            ->join('flights AS FLT2', 'FLT1.code_arrival', '=', 'FLT2.code_departure')
            ->where('FLT2.code_arrival', $arr_code)
            ->select('FLT1.*', 'FLT2.*')
            ->get();

        // 2 STEOVER
        // $flight_list['STEPOVER_2'] = DB::table('flights AS FLT1')
        //     ->where('FLT1.code_departure', $dep_code)
        //     ->whereNot('FLT1.code_arrival', $arr_code)
        //     ->join('flights AS FLT2', 'FLT1.code_arrival', '=', 'FLT2.code_departure')
        //     ->whereNot('FLT2.code_departure', $dep_code)
        //     ->whereNot('FLT2.code_arrival', $arr_code)
        //     ->join('flights AS FLT3', 'FLT2.code_arrival', '=', 'FLT3.code_departure')
        //     ->where('FLT3.code_arrival', $arr_code)
        //     ->get();

        dd($flight_list);


        // $flights = $query->orderBy($sort, $order)->paginate($per_page);

        // return response()->json($flights);
    }
}
