@extends('layouts.app')

@section('title', 'Add Customer')

@section('content')
    <h1>Add Customer</h1>

    <form id="create-form">
        <div class="mb-3">
            <label>First Name</label>
            <input type="text" name="first_name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Last Name</label>
            <input type="text" name="last_name" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Email</label>
            <input type="email" name="email" class="form-control" required>
        </div>
        <div class="mb-3">
            <label>Phone</label>
            <input type="text" name="phone" class="form-control">
        </div>
        <button type="submit" class="btn btn-success">Add</button>
    </form>

    <div id="message" class="mt-3"></div>

    <script>
        document.getElementById('create-form').addEventListener('submit', function(e){
            e.preventDefault();
            const formData = new FormData(this);

            fetch('/api/customers', {
                method: 'POST',
                headers: { 'Accept':'application/json', 'X-CSRF-TOKEN':'{{ csrf_token() }}' },
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    document.getElementById('message').innerText = 'Customer added!';
                    this.reset();
                })
                .catch(err => console.error(err));
        });
    </script>
@endsection
