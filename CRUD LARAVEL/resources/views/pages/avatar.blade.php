@extends('layouts.default')

@section('title', 'Avatar')
@section('content')
    <div>
        <div>
            <h1 class="h3 mb-2 text-gray-800">Avatars</h1>
            {{-- <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                For more information about DataTables, please visit the <a target="_blank"
                    href="https://datatables.net">official
                    DataTables documentation</a>.</p> --}}
        </div>

        <div class="row">
            <!-- Earnings (Monthly) Card Example -->
            <x-infocard title="Earnings (Monthly)" color="primary" value="{{ $totalKeuntunganBulanIni }} diamonds"
                icon="fas fa-dollar-sign" />

            <!-- Earnings (Annual) Card Example -->
            <x-infocard title="Earnings (Annual)" color="success" value="{{ $totalKeuntunganTahunIni }} diamonds"
                icon="fas fa-dollar-sign" />

            <!-- Earnings (Monthly) Card Example -->
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                    Tasks
                                </div>
                                <div class="row no-gutters align-items-center">
                                    <div class="col-auto">
                                        <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                            50%
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="progress progress-sm mr-2">
                                            <div class="progress-bar bg-info" role="progressbar"
                                                style="
                                                    width: 50%;
                                                "
                                                aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pending Requests Card Example -->
            <x-infocard title="Pending Requests" color="warning" value="18 requests" icon="fas fa-comments" />
        </div>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Question and Answer</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Create Avatar
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Avatar</th>
                                <th>Price</th>
                                <th>Users</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($avatars as $avatar)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>
                                        <div class="d-flex justify-content-center">
                                            <img src="{{ url($avatar->image_src) }}" alt="avatar" width="100px">
                                        </div>
                                    </td>
                                    <td>{{ $avatar->price }}</td>
                                    <td>
                                        {{-- @foreach ($avatar->users()->get() as $user)
                                            <div class="card shadow-sm mb-2">
                                                <div class="card-body">
                                                    Email: {{ $user->email }}
                                                    <br>
                                                    Diamond: {{ $user->diamonds }}
                                                    <br>
                                                    Total Points: {{ $user->total_points }}
                                                </div>
                                            </div>
                                        @endforeach --}}
                                        <p>Total: {{ $avatar->users()->count() }}</p>
                                        <p>Earnings: {{ $avatar->users()->count() * $avatar->price }} diamonds</p>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary" data-toggle="modal"
                                            data-target="#avatarEdit{{ $avatar->id }}">Edit</button>
                                        <button class="btn btn-danger" data-toggle="modal"
                                            data-target="#avatarDestroy{{ $avatar->id }}">Delete</button>
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
                <form action="{{ route('avatar.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Create Avatar</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="">Avatar</label>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="image_src" name="image_src">
                                    <label class="custom-file-label" for="image_src">Choose file</label>
                                </div>
                                @error('image_src')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="price">Price</label>
                                <input type="number" class="form-control" id="price" name="price"
                                    value="{{ old('price') }}">
                                @error('price')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {{-- End Create Modal --}}

        {{-- Edit Modal --}}
        @foreach ($avatars as $editAvatar)
            <div class="modal fade" id="avatarEdit{{ $editAvatar->id }}" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form action="{{ route('avatar.update', $editAvatar->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create Avatar</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="">Avatar</label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="image_src" name="image_src">
                                        <label class="custom-file-label" for="image_src">Choose file</label>
                                    </div>
                                    @error('image_src')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label for="price">Price</label>
                                    <input type="number" class="form-control" id="price" name="price"
                                        value="{{ $editAvatar->price }}">
                                    @error('price')
                                        <div class="alert alert-danger mt-2">
                                            {{ $message }}
                                        </div>
                                    @enderror
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        @endforeach
        {{-- End Edit Modal --}}

        {{-- Delete Modal --}}
        @foreach ($avatars as $destroyAvatar)
            <div class="modal fade" id="avatarDestroy{{ $destroyAvatar->id }}" tabindex="-1"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <form action="{{ route('avatar.destroy', $destroyAvatar->id) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Delete Avatar {{ $destroyAvatar->id }}
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <h2>Are you sure want to delete this avatar {{ $destroyAvatar->id }}?</h2>
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
        {{-- End Delete Modal --}}
        {{-- End Modals --}}
    </div>
@stop
