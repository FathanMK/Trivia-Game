@extends('layouts.default')

@section('title', 'User')
@section('content')
    <div>
        <div>
            <h1 class="h3 mb-2 text-gray-800">Users</h1>
            {{-- <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
            For more information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official
                DataTables documentation</a>.</p> --}}
        </div>

        <div class="row">
            <x-infocard title="Total Users" color="primary" value="{{ $users->count() }}" icon="fas fa-users" />
            <x-infocard title="Total Diamonds" color="success" value="{{ $users->sum('diamonds') }}" icon="fas fa-coins" />
            <x-infocard title="Total Points" color="warning" value="{{ $users->sum('total_points') }}"
                icon="fas fa-trophy" />
        </div>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Users Table</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Create User
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Diamonds</th>
                                <th>Total Points</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users as $user)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center" style="gap: 10px">
                                            @foreach ($user->avatar as $avatar)
                                                @if ($user->currentAvatar()->get()[0]->id == $avatar->id)
                                                    <img src="{{ $avatar->image_src }}" alt="current avatar" width="75px"
                                                        class="rounded-circle" style="border: 5px solid #6f43c1">
                                                @else
                                                    <img src="{{ $avatar->image_src }}" alt="avatar" width="75px"
                                                        class="rounded-circle">
                                                @endif
                                            @endforeach
                                        </div>
                                    </td>
                                    <td>{{ $user->name }}</td>
                                    <td>{{ $user->email }}</td>
                                    <td>{{ $user->username }}</td>
                                    <td>{{ $user->diamonds }}</td>
                                    <td>{{ $user->total_points }}</td>
                                    <td>
                                        @if ($user->email_verified_at)
                                            <span class="badge badge-success">Admin</span>
                                        @else
                                            <span class="badge badge-primary">Member</span>
                                        @endif
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" data-toggle="modal"
                                            data-target="#userEdit{{ $user->id }}">Edit</button>
                                        <button class="btn btn-danger" data-toggle="modal"
                                            data-target="#userDestroy{{ $user->id }}">Delete</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- Modals --}}
        {{-- Create Modal --}}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form action="{{ route('user.store') }}" method="POST">
                    @csrf
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create User</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {{-- @csrf --}}
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" class="form-control form-control-user" id="exampleFirstName"
                                        placeholder="Full Name" name="name" value="{{ old('name') }}">
                                    @error('name')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control form-control-user" id="exampleUserName"
                                        placeholder="User Name" name="username" value="{{ old('username') }}">
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                    placeholder="Email Address" name="email" value="{{ old('email') }}">
                                @error('email')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="number" class="form-control form-control-user" id="diamonds"
                                        placeholder="Diamods" name="diamonds">
                                    @error('diamonds')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                                <div class="col-sm-6">
                                    <input type="number" class="form-control form-control-user" id="total_ponts"
                                        placeholder="Total Points" name="total_points">
                                    @error('total_points')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleInputPassword" placeholder="Password" name="password">
                                    @error('password')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                                <div class="col-sm-6">
                                    <input type="password" class="form-control form-control-user"
                                        id="exampleRepeatPassword" placeholder="Repeat Password"
                                        name="password_confirmation">
                                    @error('password_confirmation')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                            </div>
                            <h5>Avatars</h5>
                            <div class="d-flex justify-content-around mb-4 flex-wrap" style="width: 85%">
                                @foreach ($avatars as $avatar)
                                    <div>
                                        <input type="checkbox" id="avatar-{{ $avatar->id }}" name="avatar_choices[]"
                                            value="{{ $avatar->id }}" onclick="showSelectedAvatars(this.id)" />
                                        <label for="avatar-{{ $avatar->id }}">
                                            <img src="{{ $avatar->image_src }}" alt="avatar" width="75px"
                                                height="75px" class="rounded-circle">
                                        </label>
                                    </div>
                                @endforeach
                                @error('avatar_choices')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <h5 id="current-avatar-label" style="display: none;">Current Avatar</h5>
                            <div class="d-flex justify-content-around mb-4 flex-wrap" style="width: 85%">
                                @foreach ($avatars as $avatar)
                                    <div id="current-avatar-{{ $avatar->id }}-container" style="display: none;">
                                        <input type="radio" id="current-avatar-{{ $avatar->id }}"
                                            name="current_avatar" value="{{ $avatar->id }}" />
                                        <label for="current-avatar-{{ $avatar->id }}">
                                            <img src="{{ $avatar->image_src }}" alt="current avatar" width="75px"
                                                height="75px" class="rounded-circle">
                                        </label>
                                    </div>
                                @endforeach
                                @error('current_avatar')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {{-- End Create Modal --}}

        {{-- Edit Modal --}}
        @foreach ($users as $editUser)
            <div class="modal fade" id="userEdit{{ $editUser->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <form action="{{ route('user.update', $editUser->id) }}" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="text" class="form-control form-control-user"
                                            id="exampleFirstName" placeholder="Full Name" name="name"
                                            value="{{ $editUser->name }}">
                                        @error('name')
                                            <div class="alert alert-danger mt-2">
                                                {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="text" class="form-control form-control-user" id="exampleUserName"
                                            placeholder="User Name" name="username" value="{{ $editUser->username }}">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-user" id="exampleInputEmail"
                                        placeholder="Email Address" name="email" value="{{ $editUser->email }}">
                                    @error('email')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="number" class="form-control form-control-user" id="diamonds"
                                            placeholder="Diamods" name="diamonds" value="{{ $editUser->diamonds }}">
                                        @error('diamonds')
                                            <div class="alert alert-danger mt-2">
                                                {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="number" class="form-control form-control-user" id="total_ponts"
                                            placeholder="Total Points" name="total_points"
                                            value="{{ $editUser->total_points }}">
                                        @error('total_points')
                                            <div class="alert alert-danger mt-2">
                                                {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="Password" name="password">
                                        @error('password')
                                            <div class="alert alert-danger mt-2">
                                                {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                    <div class="col-sm-6">
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="Repeat Password"
                                            name="password_confirmation">
                                        @error('password_confirmation')
                                            <div class="alert alert-danger mt-2">
                                                {{ $message }}
                                            </div>
                                        @enderror
                                    </div>
                                </div>
                                <div class="d-flex justify-content-around mb-4 flex-wrap">
                                    @foreach ($avatars as $avatar)
                                        <div>
                                            <input type="radio" id="avatar-{{ $avatar->id }}" name="avatar_id"
                                                value="{{ $avatar->id }}" />
                                            <label for="avatar-{{ $avatar->id }}">
                                                <img src="{{ $avatar->image_src }}" alt="avatar" width="75px"
                                                    height="75px" class="rounded-circle">
                                            </label>
                                        </div>
                                    @endforeach
                                    @error('avatar_id')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        @endforeach
        {{-- End Edit Modal --}}

        {{-- Delete Modal --}}
        @foreach ($users as $destroyUser)
            <div class="modal fade" id="userDestroy{{ $destroyUser->id }}" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form action="{{ route('user.destroy', $destroyUser->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete Question {{ $destroyUser->id }}
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h3>Are you sure want to delete {{ $destroyUser->username }}?</h3>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                    </form>
                </div>
            </div>
    </div>
    @endforeach
    {{-- End Delete Modal --}}

    </div>
@stop
