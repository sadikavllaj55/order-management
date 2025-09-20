@extends('layouts.app')

@section('title', 'Edit Customer')

@section('content')
    <!-- resources/views/customers/edit.blade.php -->
    <div class="max-w-md mx-auto mt-10">
        <h1 class="text-2xl font-bold mb-4">Edit Customer</h1>

        <form id="editCustomerForm" class="space-y-3">
            <input type="hidden" id="customer_id">

            <input
                type="text"
                id="first_name"
                placeholder="First Name"
                class="border p-2 w-full"
            />

            <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                class="border p-2 w-full"
            />

            <input
                type="email"
                id="email"
                placeholder="Email"
                class="border p-2 w-full"
            />

            <input
                type="text"
                id="phone"
                placeholder="Phone"
                class="border p-2 w-full"
            />

            <textarea
                id="address"
                placeholder="Address"
                class="border p-2 w-full"
            ></textarea>

            <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Save Changes
            </button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        const customerId = window.location.pathname.split("/")[2];

        // Load customer data
        async function loadCustomer() {
            try {
                const res = await axios.get(`http://localhost:8001/api/customers/${customerId}`);
                const c = res.data;

                document.getElementById("customer_id").value = c.id;
                document.getElementById("first_name").value = c.first_name;
                document.getElementById("last_name").value = c.last_name;
                document.getElementById("email").value = c.email;
                document.getElementById("phone").value = c.phone;
                document.getElementById("address").value = c.address ?? "";
            } catch (err) {
                console.error("Error loading customer:", err);
                alert("Failed to load customer.");
            }
        }

        // Submit updates
        document.getElementById("editCustomerForm").addEventListener("submit", async function(e) {
            e.preventDefault();

            const data = {
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: document.getElementById("address").value
            };

            try {
                const res = await axios.put(`http://localhost:8001/api/customers/${customerId}`, data);
                alert("Customer updated successfully!");
                window.location.href = "/customers";
            } catch (err) {
                console.error("Error updating customer:", err);
                alert("Failed to update customer");
            }
        });

        loadCustomer();
    </script>

@endsection
