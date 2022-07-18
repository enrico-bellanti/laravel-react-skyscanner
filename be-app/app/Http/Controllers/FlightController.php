<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    /**
     * Display a listing of the resource by search.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listBySearch(Request $request)
    {
        $per_page = $request->get('per_page', 25);
        $sort = $request->get('sort', 'price');
        $order = $request->get('order', 'DESC');

        $dep_code = $request->get('code_departure');
        $arr_code = $request->get('code_arrival');

        if ($request->has('params')) {
            $users = Flight::whereLike($request->get('params'))
                ->orderBy($sort, $order)
                ->paginate($per_page);
        } else {
            $users = Flight::orderBy($sort, $order)
                ->paginate($per_page);
        }

        return response()->json($users);
    }
}
