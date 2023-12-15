@extends('layouts.auth')

@section('title', 'Verify Email')
@section('content')
    <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
        <div class="col-lg-6">
            <div class="p-5">
                <div class="text-center">
                    <h4 class="h4 text-gray-900 mb-2">Verify Your Email</h4>
                    <p class="mb-4">Thanks for signing up! Before getting started, could you verify your email address by
                        clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send
                        you another.</p>
                </div>
                @if (session('status') == 'verification-link-sent')
                    <div class="alert alert-success" role="alert">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                @endif
                <form action="{{ route('verification.send') }}" method="POST">
                    @csrf
                    <button type="submit" class="btn btn-primary btn-user btn-block">Resend Verification Email</button>
                </form>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="btn btn-link btn-block">Logout</button>
                </form>
            </div>
        </div>
    </div>
@stop
