// Sample shop offers data
let shopOffers = [
    {
        id: 1,
        title: "Summer Sale",
        discount: "40% Off",
        description: "Special summer discount on all items",
        status: "active",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        createdAt: "2023-10-15"
    },
    {
        id: 2,
        title: "Weekend Special",
        discount: "30% Off",
        description: "Weekend discount for families",
        status: "active",
        image: "https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        createdAt: "2023-10-10"
    },
    {
        id: 3,
        title: "Clearance Sale",
        discount: "50% Off",
        description: "Clearance sale on old stock",
        status: "active",
        image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        createdAt: "2023-10-05"
    },
    {
        id: 4,
        title: "Festival Offer",
        discount: "25% Off",
        description: "Special festival discount",
        status: "active",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        createdAt: "2023-10-01"
    }
];

// Function to display offers in the table
function displayOffersTable() {
    const tableBody = document.querySelector('#offersTable tbody');
    const offersCount = document.querySelector('.offers-count');
    
    if (shopOffers.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="no-offers">
                    <i class="fas fa-inbox"></i>
                    <p>No offers yet. Create your first offer!</p>
                </td>
            </tr>
        `;
        offersCount.textContent = '0 active offers';
        return;
    }
    
    const activeOffers = shopOffers.filter(offer => offer.status === 'active').length;
    offersCount.textContent = `${activeOffers} active offers`;
    
    tableBody.innerHTML = '';
    
    shopOffers.forEach(offer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${offer.title}</strong>
                ${offer.description ? `<br><small class="offer-description">${offer.description}</small>` : ''}
            </td>
            <td>
                <span class="offer-discount">${offer.discount}</span>
            </td>
            <td>
                <span class="status-badge status-${offer.status}">
                    ${offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-sm btn-edit" onclick="editOffer(${offer.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-sm btn-delete" onclick="deleteOffer(${offer.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to add a new offer
function addNewOffer(offerData) {
    const newOffer = {
        id: shopOffers.length > 0 ? Math.max(...shopOffers.map(o => o.id)) + 1 : 1,
        title: offerData.title,
        discount: offerData.discount,
        description: offerData.description,
        status: 'active',
        image: offerData.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    shopOffers.unshift(newOffer);
    displayOffersTable();
    
    // Show success message
    showNotification('Offer added successfully!', 'success');
}

// Function to edit an offer
function editOffer(offerId) {
    const offer = shopOffers.find(o => o.id === offerId);
    if (offer) {
        // For demo purposes, we'll just show an alert
        // In a real app, you would open a modal with a form
        alert(`Editing offer: ${offer.title}\n\nThis would open an edit form in a real application.`);
    }
}

// Function to delete an offer
function deleteOffer(offerId) {
    if (confirm('Are you sure you want to delete this offer?')) {
        shopOffers = shopOffers.filter(offer => offer.id !== offerId);
        displayOffersTable();
        showNotification('Offer deleted successfully!', 'success');
    }
}

// Function to show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Display initial offers
    displayOffersTable();
    
    // Handle offer form submission
    const offerForm = document.getElementById('offerForm');
    if (offerForm) {
        offerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('offerTitle').value;
            const discount = document.getElementById('offerDiscount').value;
            const description = document.getElementById('offerDescription').value;
            const imageFile = document.getElementById('offerImage').files[0];
            const locationUrl = document.getElementById('locationUrl').value;
            
            // Basic validation
            if (!title || !discount) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Create offer data
            const offerData = {
                title,
                discount,
                description,
                locationUrl
            };
            
            // Handle image upload (in a real app, you would upload to server)
            if (imageFile) {
                // For demo, we'll just use a placeholder
                offerData.image = URL.createObjectURL(imageFile);
            }
            
            // Add the new offer
            addNewOffer(offerData);
            
            // Reset the form
            offerForm.reset();
        });
    }
    
    // Edit shop info button
    const editShopBtn = document.getElementById('editShopBtn');
    if (editShopBtn) {
        editShopBtn.addEventListener('click', function() {
            alert('Edit Shop Info form would open here in a real application.');
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to log out?')) {
                alert('Logging out...');
                // In a real app, you would redirect to login page
                window.location.href = 'index.html';
            }
        });
    }
    
    // Image upload preview (basic implementation)
    const imageUpload = document.getElementById('offerImage');
    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                const uploadBtn = document.querySelector('.upload-btn');
                uploadBtn.innerHTML = `<i class="fas fa-check"></i> ${fileName}`;
                uploadBtn.style.borderColor = '#4CAF50';
                uploadBtn.style.background = '#E8F5E8';
            }
        });
    }
});

// Add CSS for slideIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);