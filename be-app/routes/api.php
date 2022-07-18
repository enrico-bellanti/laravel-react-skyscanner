<?php

use App\Http\Controllers\AirportController;
use App\Http\Controllers\FlightController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('airports')->group(function () {
    Route::get('list', [AirportController::class, 'list']);
});

Route::prefix('flights')->group(function () {
    Route::get('search', [FlightController::class, 'listBySearch']);
});
