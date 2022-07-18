<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;
use Exception;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource by search.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listBySearch(Request $request)
    {
        $validated = $request->validate([
            'code_departure' => 'required|string|exists:airports,code|max:3',
            'code_arrival' => 'required|string|exists:airports,code|max:3',
        ]);

        $per_page = $request->get('per_page', 25);
        $sort = $request->get('sort', 'price');
        $order = $request->get('order', 'DESC');

        $dep_code = $validated['code_departure'];
        $arr_code = $validated['code_arrival'];

        $query = Flight::orderBy($sort, $order);

        $query->where($validated);

        $flights = $query->paginate($per_page);

        return response()->json($flights);
    }
}
