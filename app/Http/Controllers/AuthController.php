<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;


class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $http = new Client;

        try {
            $response = $http->post(config('app.url') . '/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                    'client_secret' => env('PASSPORT_PASSWORD_CLIENT_SECRET'),
                    'username' => $request->email,
                    'password' => $request->password,
                    'scope' => '',
                ],
            ]);

            return response()->json(json_decode((string) $response->getBody(), true));

        } catch (\GuzzleHttp\Exception\BadResponseException $e) {
            if ($e->getCode() === 400 || $e->getCode() === 401) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid credentials.'
                ], 401);
            }

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.'
            ], $e->getCode());
        }
    }


    public function logout()
    {
        auth('api')->logout();

        return response()->json(['success' => true, 'message' => 'Successfully logged out']);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
