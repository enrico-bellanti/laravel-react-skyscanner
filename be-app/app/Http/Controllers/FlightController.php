<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $validated = $request->validate([
            'code_departure' => 'required|string|exists:airports,code|max:3',
            'code_arrival' => 'required|string|exists:airports,code|max:3',
        ]);

        $dep_code = $validated['code_departure'];
        $arr_code = $validated['code_arrival'];

        // NO STEPOVER
        $no_stepover = DB::table('flights')
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
        $one_stepover = DB::table('flights AS FLT1')
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
        $three_stepover = DB::table('flights AS FLT1')
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


        $result = array_merge(
            $this->reorderStepoversList($no_stepover),
            $this->reorderStepoversList($one_stepover),
            $this->reorderStepoversList($three_stepover)
        );

        return response()->json($result);
    }

    protected function reorderStepoversList($list)
    {
        $newList = [];

        foreach ($list as $item) {
            $currentObj = [];
            if (isset($item->id_1)) {
                $currentObj[] = [
                    "id" => $item->id_1,
                    "code_departure" => $item->code_departure_1,
                    "code_arrival" => $item->code_arrival_1,
                    "price" => $item->price_1
                ];
            }
            if (isset($item->id_2)) {
                $currentObj[] = [
                    "id" => $item->id_2,
                    "code_departure" => $item->code_departure_2,
                    "code_arrival" => $item->code_arrival_2,
                    "price" => $item->price_2
                ];
            }
            if (isset($item->id_3)) {
                $currentObj[] = [
                    "id" => $item->id_3,
                    "code_departure" => $item->code_departure_3,
                    "code_arrival" => $item->code_arrival_3,
                    "price" => $item->price_3
                ];
            }
            $newList[] = $currentObj;
        }
        return $newList;
    }
}
