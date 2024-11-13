<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $guarded = [];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function scopeFilter($query,$filters)
    {
        if(isset($filters['category'])){
           return $query->whereHas("category",function($catQuery) use($filters){
                $catQuery->where("name",$filters['category']);
            });
        }
    }
}
