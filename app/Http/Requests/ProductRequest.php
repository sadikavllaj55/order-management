<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // allow request
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'product_type_id' => ['required', 'integer', 'exists:product_types,id'],
            'name'            => [
                $productId ? 'sometimes' : 'required',
                'string',
                'max:255',
                Rule::unique('products', 'name')->ignore($productId),
            ],
            'description'     => ['nullable', 'string', 'max:1000'],
            'price'           => [
                $productId ? 'sometimes' : 'required',
                'numeric',
                'min:0'
            ],
            'stock'           => [
                $productId ? 'sometimes' : 'required',
                'integer',
                'min:0'
            ],
            'sku'             => [
                $productId ? 'sometimes' : 'required',
                'string',
                'max:100',
                Rule::unique('products', 'sku')->ignore($productId),
            ],
            'status'          => [
                $productId ? 'sometimes' : 'required',
                'in:active,inactive,out_of_stock'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'product_type_id.required' => 'Product type is required.',
            'product_type_id.integer'  => 'Product type ID must be a number.',
            'product_type_id.exists'   => 'Selected product type does not exist.',
            'name.required'            => 'Product name is required.',
            'name.unique'              => 'This product name is already in use.',
            'price.required'           => 'Price is required.',
            'price.numeric'            => 'Price must be a number.',
            'stock.required'           => 'Stock is required.',
            'stock.integer'            => 'Stock must be an integer.',
            'sku.required'             => 'SKU is required.',
            'sku.unique'               => 'This SKU is already in use.',
            'status.required'          => 'Status is required.',
            'status.in'                => 'Status must be active, inactive, or out_of_stock.',
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
