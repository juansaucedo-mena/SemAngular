<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@sem.com',
            'password' => bcrypt('password'),
        ]);

        $this->call(ModuleSeeder::class);

        $dashboard = Module::where('name', 'Dashboard')->first();
        $reporteGeneral = Module::where('name', 'Reporte General')->first();

        $admin->favoriteModules()->attach([
            $dashboard->id,
            $reporteGeneral->id,
        ]);
    }
}
