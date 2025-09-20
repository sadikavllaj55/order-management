@extends('layouts.app')

@section('title', 'Edit Product')

@section('content')
    <div class="container mt-5">
        <h1 class="mb-4">Edit Product</h1>

        <form id="editProductForm">
            <input type="hidden" id="product_id" name="product_id">

            <!-- Name -->
            <div class="mb-3">
                <label for="name" class="form-label">Product Name</label>
                <input type="text" id="name" name="name" class="form-control" required>
            </div>

            <!-- Product Type -->
            <div class="mb-3">
                <label for="product_type_id" class="form-label">Product Type</label>
                <select id="product_type_id" name="product_type_id" class="form-control" required></select>
            </div>

            <!-- Price -->
            <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" name="price" class="form-control" min="0" step="0.01" required>
            </div>

            <!-- Stock -->
            <div class="mb-3">
                <label for="stock" class="form-label">Stock Quantity</label>
                <input type="number" id="stock" name="stock" class="form-control" min="0" required>
            </div>

            <!-- Description -->
            <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" name="description" class="form-control"></textarea>
                <small class="text-muted">Optional: can be empty</small>
            </div>

            <!-- Status -->
            <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" name="status" class="form-control" required></select>
            </div>

            <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        const productId = window.location.pathname.split("/")[2];

        async function loadProduct() {
            try {
                const [productRes, typesRes, statusesRes] = await Promise.all([
                    axios.get(`http://localhost:8001/api/products/${productId}`),
                    axios.get(`http://localhost:8001/api/product-types`),
                    axios.get(`http://localhost:8001/api/product-statuses`)
                ]);

                const product = productRes.data;
                const types = typesRes.data;
                const statuses = statusesRes.data.data;

                // Populate fields
                document.getElementById("product_id").value = product.id;
                document.getElementById("name").value = product.name;
                document.getElementById("price").value = product.price;
                document.getElementById("stock").value = product.stock;
                document.getElementById("description").value = product.description ?? "";

                // Populate product types
                const typeSelect = document.getElementById("product_type_id");
                typeSelect.innerHTML = types.map(t =>
                    `<option value="${t.id}" ${t.id === product.product_type_id ? "selected" : ""}>${t.name}</option>`
                ).join("");

                // Populate statuses
                const statusSelect = document.getElementById("status");
                statusSelect.innerHTML = Object.entries(statuses).map(
                    ([key, label]) => `<option value="${key}" ${key == product.status ? "selected" : ""}>${label}</option>`
                ).join("");

            } catch (err) {
                console.error(err);
                alert("Failed to load product data.");
            }
        }

        // Submit updated product
        document.getElementById("editProductForm").addEventListener("submit", async function(e) {
            e.preventDefault();
            try {
                const data = {
                    name: document.getElementById("name").value,
                    product_type_id: document.getElementById("product_type_id").value,
                    price: document.getElementById("price").value,
                    stock: document.getElementById("stock").value,
                    description: document.getElementById("description").value,
                    status: document.getElementById("status").value
                };

                const res = await axios.put(`http://localhost:8001/api/products/${productId}`, data);
                alert("Product updated successfully!");
                window.location.href = "/products";
            } catch (err) {
                console.error(err);
                alert("Failed to update product.");
            }
        });

        loadProduct();
    </script>
@endsection
