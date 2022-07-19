<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code_departure',
        'code_arrival',
        'price'
    ];

    public function arrivalAirport()
    {
        return $this->belongsTo(Airport::class, 'code_arrival', 'code');
    }

    public function departureAirport()
    {
        return $this->belongsTo(Airport::class, 'code_departure', 'code');
    }

    public function arrivalFlights()
    {
        return $this->hasMany($this, 'code_arrival', 'code_departure');
    }

    public function getFlightsWithStopOver($arrival)
    {
        return $this->arrivalFlights()->whereCodeDeparture($arrival)->get();
    }
}
