<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = [
            [
                'id' => 1,
                'name' => 'Catálogo',
                'tooltip' => 'Catálogo',
                'order' => 1,
                'active' => 1,
                'state' => 'catalogo',
                'angular-route' => 'catologo',
                'icon' => 'folder',
                'module_id' => NULL,
                'created_at' => '2022-06-24 21:20:44.0',
                'updated_at' => '2022-06-24 21:20:47.0',
            ],
            [
                'id' => 2,
                'name' => 'Insumos',
                'tooltip' => 'Insumos',
                'order' => 1,
                'active' => 1,
                'state' => 'insumos',
                'angular-route' => 'catalogo/insumos',
                'icon' => 'menu',
                'module_id' => 1,
                'created_at' => '2022-06-24 21:21:11.0',
                'updated_at' => '2022-06-24 21:21:13.0',
            ],
            [
                'id' => 3,
                'name' => 'Unidades de medida',
                'tooltip' => 'U.M.',
                'order' => 1,
                'active' => 1,
                'state' => 'um',
                'angular-route' => 'catalogo/insumos/um',
                'icon' => 'menu',
                'module_id' => 2,
                'created_at' => '2022-06-24 21:21:11.0',
                'updated_at' => '2022-06-24 21:21:13.0',
            ],
        ];
        Module::insert($modules);
    }
}
