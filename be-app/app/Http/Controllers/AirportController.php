<?php

namespace App\Http\Controllers;

use App\Models\Airport;
use Illuminate\Http\Request;

class AirportController extends Controller
{
    /**
     * Display a listing of the resource by search.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list(Request $request)
    {
        // $per_page = $request->get('per_page', 25);
        // $sort = $request->get('sort', 'name');
        // $order = $request->get('order', 'ASC');

        // $airports = Airport::orderBy($sort, $order)->paginate($per_page);

        return response()->json(Airport::all());
    }
}
