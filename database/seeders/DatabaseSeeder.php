<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Roles banana
        $adminRole    = Role::create(['name' => 'admin']);
        $customerRole = Role::create(['name' => 'customer']);
        $staffRole    = Role::create(['name' => 'staff']);

        // Admin user
        $admin = User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@sparkwash.com',
            'password' => Hash::make('password'),
        ]);
        $admin->assignRole($adminRole);

        // Staff user
        $staff = User::create([
            'name'     => 'Staff Member',
            'email'    => 'staff@sparkwash.com',
            'password' => Hash::make('password'),
        ]);
        $staff->assignRole($staffRole);

        // Customer user
        $customer = User::create([
            'name'     => 'Demo Customer',
            'email'    => 'customer@sparkwash.com',
            'password' => Hash::make('password'),
        ]);
        $customer->assignRole($customerRole);

        // Services banana
        Service::insert([
            [
                'name'         => 'Basic Wash',
                'slug'         => 'basic-wash',
                'description'  => 'Exterior wash with soap and water rinse.',
                'price'        => 9.99,
                'duration_mins'=> 20,
                'features'     => json_encode(['Exterior Wash', 'Water Rinse', 'Air Dry']),
                'is_active'    => true,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'Premium Wash',
                'slug'         => 'premium-wash',
                'description'  => 'Full exterior and interior cleaning.',
                'price'        => 19.99,
                'duration_mins'=> 45,
                'features'     => json_encode(['Exterior Wash', 'Interior Vacuum', 'Dashboard Wipe', 'Window Clean']),
                'is_active'    => true,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'name'         => 'Deluxe Detail',
                'slug'         => 'deluxe-detail',
                'description'  => 'Complete detailing inside and out.',
                'price'        => 39.99,
                'duration_mins'=> 90,
                'features'     => json_encode(['Full Detail', 'Wax Polish', 'Tire Shine', 'Leather Condition', 'Engine Clean']),
                'is_active'    => true,
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ]);
    }
}