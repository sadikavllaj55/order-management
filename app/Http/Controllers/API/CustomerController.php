<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Http\Requests\CustomerRequest;

class CustomerController extends Controller
{
    public function index()
    {
        return response()->json(Customer::all());
    }

    public function store(CustomerRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();

        $customer = Customer::create($data);

        return response()->json($customer, 201);
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return response()->json($customer);
    }

    public function update(CustomerRequest $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        $customer->update($data);

        return response()->json($customer);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->deleted_by = Auth::id();
        $customer->save();
        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
