<?php

namespace App\Models;

use App\Models\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Video extends Model
{
    use SoftDeletes, Uuid;
    
    const RATING_LIST = ['L','10','12','14','16','18'];

    protected $fillable = [
        'title',
        'description',
        'year_launched',
        'opened',
        'rating',
        'duration'
    ];

    protected $dates = ['deleted_at'];

    protected $casts = [
        'id' => 'string',
        'opened' => 'boolean',
        'year_launched' => 'integer',
        'duration' => 'integer'
    ];

    public $incrementing = false;

    public static function create(array $attributes = [])
    {
        try{
            \DB::beginTransaction();
            $obj = static::query()->create($attributes);
            \DB::commit();
            return  $obj;
        }catch(\Exception $e){
            if(isset($obj)){
                //TODO
            }
            \DB::rollBack();
            throw $e;
        }
    }


    public function update(array $attributes = [], array $options = [])
    {
        try{
            \DB::beginTransaction();
            $saved = parent::update($attributes,  $options);
            if($saved){
                //uploads
                //excluir os antigos
            }
            \DB::commit();
            return  $saved;
        }catch(\Exception $e){
            //excluir os arquivos de uploads
            \DB::rollBack();
            throw $e;
        }

 
    }

    public function categories(){
        return $this->belongsToMany(Category::class)->withTrashed();
    }

    public function genres(){
        return $this->belongsToMany(Genre::class)->withTrashed();
    }

}
