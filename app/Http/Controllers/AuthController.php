<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login']]);
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->input('username'), 'password' => $request->input('password')])) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;
            return $this->arrayToken($token);
        } else {
            return Response::json(['error' => 'Unauthorized'], 401);
        }
    }

    public function me()
    {
        return Auth::guard()->user() ?? abort(401);
    }

    public function signout(Request $request)
    {
        return $request->user()->currentAccessToken()->delete();
    }

    protected function arrayToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => now()->addCenturies(1),
            'user' => Auth::guard()->user(),
        ];
    }
}
