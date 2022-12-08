
const setEditModal = (productId) => {
    // Get information about the product using productId
    const xhttp = new XMLHttpRequest()

    xhttp.open("GET", `http://localhost:8080/product/${productId}`, false)
    xhttp.send()

    const product = JSON.parse(xhttp.responseText)
    console.log(product)
    const {
        productName,
        id
    } = product
    
    // Filling information about the product in the form inside the modal
    document.getElementById('id').value = id
    document.getElementById('productName').value = productName

    // Setting up the action url for the product
    document.getElementById('editForm').action = `http://localhost:8080/product/${id}`

}

const deleteProduct = (id) => {
    const xhttp = new XMLHttpRequest()
    xhttp.open("DELETE", `http://localhost:8080/product/${id}`, false)
    xhttp.send()

    location.reload()
}

const loadProducts = () => {
    const xhttp = new XMLHttpRequest()

    xhttp.open('GET','http://localhost:8080/productlist', false)
    xhttp.send()
    
    const products = JSON.parse(xhttp.responseText)

    for (let product of products) {
        const x = `
                    <div class="col-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${product.productName}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${product.id}</h6>
                                <hr>
                                <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                                <button types="button" class="btn btn-success" data-bs-toggle="modal"
                                    data-bs-target="#editProductModal" onclick="setEditModal(${product.id})">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    `
        document.getElementById('product-list').innerHTML = document.getElementById('product-list').innerHTML + x
    }
}

loadProducts()