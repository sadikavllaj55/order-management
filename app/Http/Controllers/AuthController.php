<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->get('email'))->first();

        if ($user == null || !Hash::check($request->get('password'), $user->password)) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $token = $user->createToken($user->name . '-Auth')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);
    }


    public function logout(): JsonResponse
    {
        Auth::user()->tokens()->delete();

        return response()->json(['success' => true, 'message' => 'Successfully logged out']);
    }

    public function me(): JsonResponse
    {
        return response()->json(Auth::user());
    }
}
