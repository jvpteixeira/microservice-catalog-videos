<?php

namespace Tests\Stubs\Models;

use App\Models\Traits\UploadFiles;
use Illuminate\Database\Eloquent\Model;
use Tests\TestCase;

class UploadFilesStub extends Model
{   
    use UploadFiles;

    protected function uploadDir()
    {
        return "1";
    }
}
