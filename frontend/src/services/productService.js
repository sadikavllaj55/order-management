const API_URL = "http://localhost:8001/api/products"; // adjust if needed

export async function getProducts() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function getProduct(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

export async function createProduct(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateProduct(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteProduct(id) {
    return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
