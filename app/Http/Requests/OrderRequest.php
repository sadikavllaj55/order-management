<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // allow the request
    }

    public function rules(): array
    {
        $orderId = $this->route('order')?->id;
        $validStatusIds = array_keys(config('order.statuses'));

        return [
            'customer_id'  => ['required', 'integer', 'exists:customers,id'],
            'total_amount' => [$orderId ? 'sometimes' : 'required', 'numeric', 'min:0'],
            'status' => [
                $orderId ? 'sometimes' : 'required',
                Rule::in(array_keys(config('order.statuses')))
            ],       ];
    }

    public function messages(): array
    {
        return [
            'customer_id.required' => 'Customer is required.',
            'customer_id.exists'   => 'Selected customer does not exist.',
            'total_amount.required'=> 'Total amount is required.',
            'total_amount.numeric' => 'Total amount must be a number.',
            'status.required'      => 'Order status is required.',
            'status.in'            => 'Status must be processing, shipped, or delivered.',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = response()->json([
            'success' => false,
            'errors'  => $validator->errors(),
        ], 422);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
