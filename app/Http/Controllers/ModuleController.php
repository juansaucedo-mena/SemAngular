<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

/**
 *
 * Notas: Los modulos solo soportan 3 niveles. Por lo que siempre module_id como máximo puede tener valor 2
 */
class ModuleController extends Controller
{
    public function get()
    {
        $modules = Module::parent()
//            ->select('name', 'tooltip', 'icon')
            ->get();
//        return $modules;
        return Module::hasChilden($modules);
    }
}
