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

        $collection = collect([]);

        $query = DB::table('flights AS FLT1')
            ->where('FLT1.code_departure', $dep_code);

        $step_overs = 2;

        for ($i = 0; $i <= $step_overs; $i++) {
            $nf = ($i + 1);

            if ($i === 0) {
                $query_cloned = clone $query;
                $query_selected_raw = $this->getSelectQueryRaw($nf);
                $query_result = $query_cloned->where("FLT$nf.code_arrival", $arr_code)
                    ->select($query_selected_raw)->get()->toArray();
                $query->whereNot("FLT$nf.code_arrival", $arr_code);
                $collection->push($query_result);
            } else {
                $query_cloned = clone $query;
                $query_selected_raw = $this->getSelectQueryRaw($nf);
                $query_result = $query_cloned
                    ->join("flights AS FLT$nf", "FLT$i.code_arrival", "=", "FLT$nf.code_departure")
                    ->whereNot("FLT$nf.code_departure", $dep_code)
                    ->where("FLT$nf.code_arrival", $arr_code)
                    ->select($query_selected_raw)
                    ->get()->toArray();
                $collection->push($query_result);
                $query
                    ->join("flights AS FLT$nf", "FLT$i.code_arrival", "=", "FLT$nf.code_departure")
                    ->whereNot("FLT$nf.code_departure", $dep_code)
                    ->whereNot("FLT$nf.code_arrival", $arr_code);
            }
        }
        $travels = $this->setOrderStepoversList($collection->flatten(1)->toArray());

        $paginated = collect($travels)->paginate(15)->toArray();

        //remove string keys to not get an obj when transfor in json
        $data = array_values($paginated['data']);
        $paginated['data'] = $data;

        return response()->json($paginated);
    }

    protected function getSelectQueryRaw($index)
    {
        $selected = [];
        for ($i = 0; $i < $index; $i++) {
            $nf = ($i + 1);
            $selected[] = "FLT$nf.id AS id_$nf";
            $selected[] = "FLT$nf.code_departure AS code_departure_$nf";
            $selected[] = "FLT$nf.code_arrival AS code_arrival_$nf";
            $selected[] = "FLT$nf.price AS price_$nf";
        }
        return $selected;
    }

    //refactor query results
    protected function setOrderStepoversList($list)
    {
        $newList = [];

        foreach ($list as $item) {
            $currentObj = [];
            $c = 1;

            while (isset($item->{"id_$c"})) {
                $currentObj[] = [
                    "id" => $item->{"id_$c"},
                    "code_departure" => $item->{"code_departure_$c"},
                    "code_arrival" => $item->{"code_arrival_$c"},
                    "price" => $item->{"price_$c"}
                ];
                $c++;
            }
            $newList[] = $currentObj;
        }
        return $newList;
    }
}
