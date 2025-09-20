@extends('../../layouts.app')

@section('title', 'Products List')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <h1>Products</h1>
    <a href="/products/create" class="btn btn-success">Add Product</a>
</div>

<table class="table table-bordered">
    <thead class="table-light">
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
    </thead>
    <tbody id="products-table">
    <tr><td colspan="7" class="text-center">Loading...</td></tr>
    </tbody>
</table>
@push('scripts')

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    let statuses = {};

    async function loadStatuses() {
        try {
            const res = await axios.get("http://localhost:8001/api/product-statuses");
            statuses = res.data.data; // {0: "Processing", 1: "Shipped", ...}
        } catch (err) {
            console.error("Failed to load statuses", err);
            statuses = {};
        }
    }

    async function loadProducts() {
        try {
            const res = await axios.get("http://localhost:8001/api/products");
            const products = res.data.data ?? res.data; // handle both formats

            const table = document.getElementById("products-table");
            table.innerHTML = "";

            if (!products.length) {
                table.innerHTML = `<tr><td colspan="7" class="text-center">No products found</td></tr>`;
                return;
            }

            products.forEach(p => {
                const statusLabel = statuses[p.status] ?? p.status; // map number → label

                table.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.product_type?.name ?? '-'}</td>
                        <td>${p.price}</td>
                        <td>${p.stock}</td>
                        <td>${statusLabel}</td>
                        <td>
                            <a href="/products/${p.id}" class="btn btn-sm btn-primary">Edit</a>
                            <button onclick="deleteProduct(${p.id})" class="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                `;
            });
        } catch (err) {
            console.error(err);
            document.getElementById("products-table").innerHTML =
                `<tr><td colspan="7" class="text-center text-danger">Failed to load products</td></tr>`;
        }
    }

    async function deleteProduct(id) {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:8001/api/products/${id}`);
            loadProducts();
        } catch (err) {
            alert("Failed to delete product");
        }
    }

    // Load both statuses and products when page loads
    (async function init() {
        await loadStatuses();
        await loadProducts();
    })();
</script>
@endpush
@endsection
