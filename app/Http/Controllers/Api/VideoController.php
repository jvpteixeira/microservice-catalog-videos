<?php

namespace App\Http\Controllers\Api;

use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends BasicCrudController
{
    private $rules;

    public function __construct()
    {
        
    }

    protected function model()
    {
        return \App\Models\Video::class;
    }

    protected function rulesStore()
    {
        
    }

    protected function rulesUpdate()
    {
        
    }
}
