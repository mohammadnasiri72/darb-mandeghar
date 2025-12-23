// داده‌های نمونه برای محصولات
const products = [
    {
        id: 1,
        name: "محصول اول",
        price: "100,000 تومان",
        image: "./assets/images/product1.jpg",
        description: "توضیحات محصول اول"
    },
    {
        id: 2,
        name: "محصول دوم", 
        price: "200,000 تومان",
        image: "./assets/images/product2.jpg",
        description: "توضیحات محصول دوم"
    },
    {
        id: 3,
        name: "محصول سوم",
        price: "150,000 تومان", 
        image: "./assets/images/product3.jpg",
        description: "توضیحات محصول سوم"
    }
];

// تصاویر گالری
const galleryImages = [
    "./assets/images/gallery1.jpg",
    "./assets/images/gallery2.jpg", 
    "./assets/images/gallery3.jpg",
    "./assets/images/gallery4.jpg"
];

// وقتی صفحه لود شد
document.addEventListener('DOMContentLoaded', function() {
    createProductCards();
    createGallery();
    setupEventListeners();
});

// ساخت کارت محصولات
function createProductCards() {
    const productsContainer = document.getElementById('products');
    
    products.forEach(product => {
        const productHTML = `
            <div class="col-md-4">
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="text-success fw-bold">${product.price}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productHTML;
    });
}

// ساخت گالری
function createGallery() {
    const galleryContainer = document.getElementById('gallery');
    
    galleryImages.forEach(image => {
        const imageHTML = `
            <div class="col-md-3 col-6">
                <img src="${image}" class="img-fluid gallery-img" alt="گالری">
            </div>
        `;
        galleryContainer.innerHTML += imageHTML;
    });
}

// رویدادها
function setupEventListeners() {
    // دکمه سایدبار
    document.getElementById('sidebar-btn').addEventListener('click', function() {
        alert('سلام! دکمه کار می‌کند!');
    });
    
    // دکمه‌های افزودن به سبد خرید
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// افزودن به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    alert(`محصول "${product.name}" به سبد خرید اضافه شد!`);
    console.log('محصول اضافه شد:', product);
}