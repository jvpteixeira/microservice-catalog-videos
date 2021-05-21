<?php

namespace Tests\Feature\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Mockery;
use Tests\TestCase;
use Tests\Stubs\Models\CategoryStub;
use Tests\Stubs\Controllers\CategoryControllerStub;

use Tests\Traits\TestSaves;
use Tests\Traits\TestValidations;

class BasicCrudControllerTest extends TestCase
{  
    private $controllerCategory;
    protected function setUp(): void
    {
        parent::setUp();
        $this->controllerCategory = new CategoryControllerStub();
        CategoryStub::createTable();
    }

    protected function tearDown(): void
    {
        CategoryStub::dropTable();
        parent::tearDown();
    }

    public function testIndex()
    {
        $category = CategoryStub::create(['name' => 'test_name', 'description' => 'test_description']);
        $result = $this->controllerCategory->index()->toArray();
        $this->assertEquals([$category->toArray()], $result);
    }

    public function testInvalidationDataInStore()
    {
        $this->expectException(ValidationException::class);
        $request = \Mockery::mock(Request::class, [
            "all" => ['name' => '']
        ]);
        $this->controllerCategory->store($request);
    }

    public function testStore(){
        $request = \Mockery::mock(Request::class, [
            "all" => [
                'name' => 'test_name',
                'description' => 'description'
            ]
        ]);
        $obj = $this->controllerCategory->store($request);
        $this->assertEquals(
            CategoryStub::find(1)->toArray(),
            $obj->toArray()
        );
    }
}
