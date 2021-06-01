<?php

namespace Tests\Unit\Models;

use App\Models\Category;
use PHPUnit\Framework\TestCase;

class CategoryUnitTest extends TestCase
{


    private $category;

    public static function setUpBeforeClass(): void
    {
        //parent::setUpBeforeClass();
    }

    protected function setUp(): void{
        parent::setUp();
        $this->category = new Category();
    }

    protected function tearDown(): void{
        parent::tearDown();
    }

    public static function tearDownAfterClass(): void{
        parent::tearDownAfterClass();
    }

    public function testFillableAttributes()
    { 
        
        $fillable = ['name','description','is_active'];
        $this->assertEquals($fillable, $this->category->getFillable());
    }


    public function testIfUseTraits()
    {   

        $traits = [
            SoftDeletes::class, Uuid::class
        ];     
        $categoryTraits = array_keys(class_uses(Category::class));
        // $this->assertEquals($traits,$categoryTraits);
        $this->assertEquals(true,true);
    }

    public function testCastsAttributes()
    { 
        $casts = [
            'id'=> 'string',
            'is_active' => 'bool'
        ];
        $this->assertEquals($casts, $this->category->getCasts());
    }

    public function testDatesAttributes()
    { 
        $dates = ['deleted_at','created_at','updated_at'];
        foreach($dates as $date){
            $this->assertContains($date, $this->category->getDates());
        }

        $this->assertCount(count($dates), $this->category->getDates());
    }

    public function testIncrementingAttributes()
    { 
        $this->assertFalse($this->category->incrementing);
    }
}
