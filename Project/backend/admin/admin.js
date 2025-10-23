document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3000';
    const inventoryTableBody = document.getElementById('inventory-table-body');
    const addProductForm = document.getElementById('add-product-form');
    const addCategoryForm = document.getElementById('add-category-form');
    const categorySelect = document.getElementById('category');
    const categoryList = document.getElementById('category-list');

    function showToast(message, type = 'success') { /* ... same as before ... */ 
        // NOTE: The missing backticks in showToast were corrected in previous iterations, 
        // assuming the 'same as before' code is now clean.
    }

    const fetchAndRenderProducts = async () => { /* ... same as before ... */ 
        // NOTE: If this function contains a fetch call, ensure it also uses backticks.
    };
    
    const fetchAndRenderCategories = async () => {
        try {
            // CORRECTION 1: Added backticks (`) for template literal
            const response = await fetch(`${API_URL}/categories`);
            const categories = await response.json();
            
            // It's good practice to add a placeholder option first
            categorySelect.innerHTML = '<option value="" disabled selected>Select a Category</option>';
            categoryList.innerHTML = '';
            
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.name;
                option.textContent = cat.name;
                categorySelect.appendChild(option);
                
                const listItem = document.createElement('li');
                listItem.textContent = cat.name;
                categoryList.appendChild(listItem);
            });
        } catch (error) { console.error('Error fetching categories:', error); }
    };

    const handleAddProduct = async (e) => { /* ... same as before ... */ };
    const handleTableClick = async (e) => { /* ... same as before ... */ };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        const categoryNameInput = document.getElementById('new-category-name');
        const newCategoryName = categoryNameInput.value;
        if (!newCategoryName) return;
        try {
            // CORRECTION 2: Added backticks (`) for template literal
            const response = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName }),
            });
            const data = await response.json();
            if (response.ok) {
                showToast("Category added successfully!");
                addCategoryForm.reset();
                fetchAndRenderCategories();
            } else {
                showToast(data.message, "error");
            }
        } catch (error) {
            console.error('Error adding category:', error);
            showToast("Error adding category.", "error");
        }
    };

    fetchAndRenderProducts();
    fetchAndRenderCategories();
    addProductForm.addEventListener('submit', handleAddProduct);
    addCategoryForm.addEventListener('submit', handleAddCategory);
    inventoryTableBody.addEventListener('click', handleTableClick);
});