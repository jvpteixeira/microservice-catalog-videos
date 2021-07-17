<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Http\Controllers\Api\BasicCrudController;
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

    public function testIfFindOrFailFetchModel(){
        $category = CategoryStub::create(['name' => 'test_name', 'description' => 'test_description']);

        $reflectionClass = new \ReflectionClass(BasicCrudController::class);
        $reflectionMethod = $reflectionClass->getMethod('findOrFail');
        $reflectionMethod->setAccessible(true);

        $result = $reflectionMethod->invokeArgs($this->controllerCategory,[$category->id]);
        $this->assertInstanceOf(CategoryStub::class,$result);

    }

    public function testShow(){
        $category = CategoryStub::create(['name'=> 'test_name','description' => 'test_description']);
        $result = $this->controllerCategory->show($category->id);
        $this->assertEquals($result->toArray(), CategoryStub::find(1)->toArray());
    }

    
    public function testUpdate(){
        $category = CategoryStub::create(['name'=> 'test_name','description' => 'test_description']);
        $request = \Mockery::mock(Request::class, [
            "all" => ['name' => 'test_changed','description' => 'test_description_changed']
        ]);
        
        $result = $this->controllerCategory->update($request,$category->id);
        $this->assertEquals($result->toArray(), CategoryStub::find(1)->toArray());
    }

    public function testDestroy(){
        $category = CategoryStub::create(['name'=> 'test_name','description' => 'test_description']);
        $response = $this->controllerCategory->destroy($category->id);
        $this->createTestResponse($response)
            ->assertStatus(204);
        $this->assertCount(0,CategoryStub::all());
  
    }

    // /*
    // * @expectedException \Illuminate\Database\Eloquent\ModelNotFoundException
    // */
    // public function testIfFindOrFailThrowExceptionWhenIdInvalid(){

    //     $reflectionClass = new \ReflectionClass(BasicCrudController::class);
    //     $reflectionMethod = $reflectionClass->getMethod('findOrFail');
    //     $reflectionMethod->setAccessible(true);

    //     $result = $reflectionMethod->invokeArgs($this->controllerCategory,[0]);

    // }
}
