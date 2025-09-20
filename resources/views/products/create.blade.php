@extends('layouts.app')

@section('title', 'Create Product')

@section('content')
    <div class="container mt-4">
        <h2>Add New Product</h2>

        <form id="createProductForm">
            <div class="mb-3">
                <label class="form-label">Product Name</label>
                <input type="text" class="form-control" id="name" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Price ($)</label>
                <input type="number" class="form-control" id="price" step="0.01" required>
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="description" rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn-success">Save</button>
            <a href="/products" class="btn btn-secondary">Cancel</a>
        </form>
    </div>

    <script>
        document.getElementById("createProductForm").addEventListener("submit", async function(e) {
            e.preventDefault();

            let data = {
                name: document.getElementById("name").value,
                price: document.getElementById("price").value,
                description: document.getElementById("description").value
            };

            try {
                let response = await fetch("http://localhost:8001/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("Product created successfully!");
                    window.location.href = "/products";
                } else {
                    let error = await response.json();
                    alert("Error: " + (error.message || "Failed to create product"));
                }
            } catch (err) {
                console.error("Error creating product:", err);
                alert("Something went wrong!");
            }
        });
    </script>
@endsection
