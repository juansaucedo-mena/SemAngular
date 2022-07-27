<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MainUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = new User;
        $users->name = "Juan Saucedo";
        $users->email = 'juansaucedo.mena@gmail.com';
        $users->email_verified_at = Carbon::now();
        $users->password = Hash::make('galu123456');
        $users->save();
    }
}
