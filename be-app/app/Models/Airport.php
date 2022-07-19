<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'code',
        'lat',
        'lng',
    ];

    public function arrivalFlights()
    {
        return $this->hasMany(Flight::class, 'code', 'code_arrival');
    }

    public function departureFlights()
    {
        return $this->hasMany(Flight::class, 'code', 'code_departure');
    }
}
