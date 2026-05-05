<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BookingResource\Pages;
use App\Models\Booking;
use App\Models\Service;
use App\Models\User;
use App\Models\Vehicle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BookingResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';

    protected static ?string $navigationLabel = 'Bookings';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Customer')
                    ->options(User::role('customer')->pluck('name', 'id'))
                    ->searchable()
                    ->required(),

                Forms\Components\Select::make('service_id')
                    ->label('Service')
                    ->options(Service::pluck('name', 'id'))
                    ->searchable()
                    ->required(),

                Forms\Components\Select::make('vehicle_id')
                    ->label('Vehicle')
                    ->options(Vehicle::all()->mapWithKeys(fn($v) => [$v->id => $v->plate_no . ' - ' . $v->make . ' ' . $v->model]))
                    ->searchable()
                    ->required(),

                Forms\Components\Select::make('staff_id')
                    ->label('Assign Staff')
                    ->options(User::role('staff')->pluck('name', 'id'))
                    ->searchable()
                    ->nullable(),

                Forms\Components\TextInput::make('booking_ref')
                    ->label('Booking Reference')
                    ->required()
                    ->maxLength(255),

                Forms\Components\DateTimePicker::make('scheduled_at')
                    ->label('Scheduled Date & Time')
                    ->required(),

                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending'   => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('total_price')
                    ->label('Total Price ($)')
                    ->required()
                    ->default(0.00),

                Forms\Components\Textarea::make('notes')
                    ->label('Notes')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('booking_ref')
                    ->label('Booking Ref')
                    ->searchable(),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Customer')
                    ->sortable(),

                Tables\Columns\TextColumn::make('service.name')
                    ->label('Service')
                    ->sortable(),

                Tables\Columns\TextColumn::make('vehicle.plate_no')
                    ->label('Vehicle')
                    ->sortable(),

                Tables\Columns\TextColumn::make('staff.name')
                    ->label('Staff')
                    ->default('Not Assigned')
                    ->sortable(),

                Tables\Columns\TextColumn::make('scheduled_at')
                    ->label('Scheduled At')
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => 'confirmed',
                        'primary' => 'completed',
                        'danger'  => 'cancelled',
                    ]),

                Tables\Columns\TextColumn::make('total_price')
                    ->label('Price')
                    ->prefix('$')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending'   => 'Pending',
                        'confirmed' => 'Confirmed',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListBookings::route('/'),
            'create' => Pages\CreateBooking::route('/create'),
            'edit'   => Pages\EditBooking::route('/{record}/edit'),
        ];
    }
}