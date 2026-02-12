<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    protected $fillable = [
        'name',
        'order',
        'route',
        'parent_module_id',
        'active',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'order' => 'integer',
        ];
    }

    public function children(): HasMany
    {
        return $this->hasMany(Module::class, 'parent_module_id')
            ->where('active', true)
            ->orderBy('order')
            ->with('children');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'parent_module_id');
    }

    public function favoritedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
