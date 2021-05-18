<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;

class genreController extends Controller
{
    private $rules = [
        'name' => 'required|max:255',
        'is_active' => 'boolean'
    ];

    public function index()
    {
        return genre::all();
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->rules);
        return genre::create($request->all());
    }

    public function show(genre $genre)
    {
        return $genre;
    }

    public function update(Request $request, genre $genre)
    {
        $this->validate($request, $this->rules);
        $genre->update($request->all());
        return $genre;
    }

    public function destroy(genre $genre)
    {
        $genre->delete();
        return response()->noContent();
    }
}
