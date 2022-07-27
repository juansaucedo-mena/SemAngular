<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    public function scopeParent($query)
    {
        $query->where('module_id', null)->orderBy('order', 'ASC');
    }

    public function sub()
    {
        return $this->hasMany(Module::class)->with('sub');
    }

    public static function hasChilden($modules)
    {
        foreach ($modules as $module) {
            if (count($module->sub) > 0) {
                $module->type = 'dropDown';
                self::hasChilden($module->sub);
            } else {
                $module->type = 'link';
            }
        }
        return $modules;
    }
}
