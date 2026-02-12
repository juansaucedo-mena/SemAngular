<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Dashboard (top-level leaf)
        Module::create([
            'name' => 'Dashboard',
            'order' => 1,
            'route' => '/dashboard',
        ]);

        // 2. Administracion (parent with 2-level and 3-level nesting)
        $admin = Module::create([
            'name' => 'Administracion',
            'order' => 2,
        ]);

        Module::create([
            'name' => 'Usuarios',
            'order' => 1,
            'route' => '/administracion/usuarios',
            'parent_module_id' => $admin->id,
        ]);

        Module::create([
            'name' => 'Modulos',
            'order' => 2,
            'route' => '/administracion/modulos',
            'parent_module_id' => $admin->id,
        ]);

        // 3-level: Roles y Permisos
        $rolesPermisos = Module::create([
            'name' => 'Roles y Permisos',
            'order' => 3,
            'parent_module_id' => $admin->id,
        ]);

        Module::create([
            'name' => 'Roles',
            'order' => 1,
            'route' => '/administracion/roles',
            'parent_module_id' => $rolesPermisos->id,
        ]);

        Module::create([
            'name' => 'Permisos',
            'order' => 2,
            'route' => '/administracion/permisos',
            'parent_module_id' => $rolesPermisos->id,
        ]);

        // 3. Reportes (parent with children)
        $reportes = Module::create([
            'name' => 'Reportes',
            'order' => 3,
        ]);

        Module::create([
            'name' => 'Reporte General',
            'order' => 1,
            'route' => '/reportes/general',
            'parent_module_id' => $reportes->id,
        ]);

        Module::create([
            'name' => 'Reporte Detallado',
            'order' => 2,
            'route' => '/reportes/detallado',
            'parent_module_id' => $reportes->id,
        ]);

        // 4. Configuracion (top-level leaf)
        Module::create([
            'name' => 'Configuracion',
            'order' => 4,
            'route' => '/configuracion',
        ]);

        // 5. Inactive module (should NOT appear in API response)
        Module::create([
            'name' => 'Modulo Inactivo',
            'order' => 5,
            'route' => '/inactivo',
            'active' => false,
        ]);
    }
}
