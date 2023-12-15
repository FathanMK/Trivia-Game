@extends('layouts.default')

@section('title', 'Question')
@section('content')
    <div>
        <h1 class="h3 mb-2 text-gray-800">Questions and Answers</h1>
        {{-- <p class="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
            For more information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official
                DataTables documentation</a>.</p> --}}

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">Question and Answer</h6>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Create Question
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Wrong Answer 1</th>
                                <th>Wrong Answer 2</th>
                                <th>Wrong Answer 3</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($questions as $question)
                                <tr>
                                    <td>{{ $loop->iteration }}</td>
                                    <td>{{ $question->question }}</td>
                                    <td>{{ $question->answer }}</td>
                                    <td>{{ $question->wrong_answer_1 }}</td>
                                    <td>{{ $question->wrong_answer_2 }}</td>
                                    <td>{{ $question->wrong_answer_3 }}</td>
                                    <td>
                                        <button class="btn btn-primary" data-toggle="modal"
                                            data-target="#questionEdit{{ $question->id }}">Edit</button>
                                        <button class="btn btn-danger" data-toggle="modal"
                                            data-target="#questionDestroy{{ $question->id }}">Delete</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- Modals --}}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form action="{{ route('question.store') }}" method="POST">
                    @csrf
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="question" class="text-primary">Question</label>
                                <input type="text" class="form-control @error('question') is-invalid @enderror"
                                    name="question" value="{{ old('question') }}" id="question">
                                @error('question')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="answer" class="text-success">Answer</label>
                                <input type="text" class="form-control @error('answer') is-invalid @enderror"
                                    name="answer" value="{{ old('answer') }}" id="answer">
                                @error('answer')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="wrong_answer_1" class="text-danger">Wrong Answer 1</label>
                                <input type="text" class="form-control @error('wrong_answer_1') is-invalid @enderror"
                                    name="wrong_answer_1" value="{{ old('wrong_answer_1') }}" id="wrong_answer_1">
                                @error('wrong_answer_1')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="wrong_answer_2" class="text-danger">Wrong Answer 2</label>
                                <input type="text" class="form-control @error('wrong_answer_2') is-invalid @enderror"
                                    name="wrong_answer_2" value="{{ old('wrong_answer_2') }}" id="wrong_answer_2">
                                @error('wrong_answer_2')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="wrong_answer_3" class="text-danger">Wrong Answer 3</label>
                                <input type="text" class="form-control @error('wrong_answer_3') is-invalid @enderror"
                                    name="wrong_answer_3" value="{{ old('wrong_answer_3') }}" id="wrong_answer_3">
                                @error('wrong_answer_3')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-danger">Reset</button>
                            <div>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    @foreach ($questions as $editQuestion)
        <div class="modal fade" id="questionEdit{{ $editQuestion->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog">
                <form action="{{ route('question.update', $editQuestion->id) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Question</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="question" class="text-primary">Question</label>
                                <input type="text" class="form-control @error('question') is-invalid @enderror"
                                    name="question" value="{{ $editQuestion->question }}" id="question">
                                @error('question')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="answer" class="text-success">Answer</label>
                                <input type="text" class="form-control @error('answer') is-invalid @enderror"
                                    name="answer" value="{{ $editQuestion->answer }}" id="answer">
                                @error('answer')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="wrong_answer_1" class="text-danger">Wrong Answer 1</label>
                                <input type="text" class="form-control @error('wrong_answer_1') is-invalid @enderror"
                                    name="wrong_answer_1" value="{{ $editQuestion->wrong_answer_1 }}"
                                    id="wrong_answer_1">
                                @error('wrong_answer_1')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="wrong_answer_2" class="text-danger">Wrong Answer 2</label>
                                <input type="text" class="form-control @error('wrong_answer_2') is-invalid @enderror"
                                    name="wrong_answer_2" value="{{ $editQuestion->wrong_answer_2 }}"
                                    id="wrong_answer_2">
                                @error('wrong_answer_2')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                            <div class="form-group">
                                <label for="wrong_answer_3" class="text-danger">Wrong Answer 3</label>
                                <input type="text" class="form-control @error('wrong_answer_3') is-invalid @enderror"
                                    name="wrong_answer_3" value="{{ $editQuestion->wrong_answer_3 }}"
                                    id="wrong_answer_3">
                                @error('wrong_answer_3')
                                    <div class="alert alert-danger mt-2">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-danger">Reset</button>
                            <div>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    @endforeach

    @foreach ($questions as $destroyQuestion)
        <div class="modal fade" id="questionDestroy{{ $destroyQuestion->id }}" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <form action="{{ route('question.destroy', $destroyQuestion->id) }}" method="POST">
                    @csrf
                    @method('DELETE')
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Delete Question {{ $destroyQuestion->id }}
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h4>Are you sure want to delete this question?</h4>
                            <h5>{{ $destroyQuestion->question }}</h5>
                            @php
                                $answers = [$destroyQuestion->answer, $destroyQuestion->wrong_answer_1, $destroyQuestion->wrong_answer_2, $destroyQuestion->wrong_answer_3];
                                shuffle($answers); // Mengacak urutan jawaban
                            @endphp
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td
                                            class="{{ $answers[0] === $destroyQuestion->answer ? 'text-success' : 'text-danger' }}">
                                            a. {{ $answers[0] }}</td>
                                        <td
                                            class="{{ $answers[1] === $destroyQuestion->answer ? 'text-success' : 'text-danger' }}">
                                            b. {{ $answers[1] }}</td>
                                    </tr>
                                    <tr>
                                        <td
                                            class="{{ $answers[2] === $destroyQuestion->answer ? 'text-success' : 'text-danger' }}">
                                            c. {{ $answers[2] }}</td>
                                        <td
                                            class="{{ $answers[3] === $destroyQuestion->answer ? 'text-success' : 'text-danger' }}">
                                            d. {{ $answers[3] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    @endforeach
@stop
