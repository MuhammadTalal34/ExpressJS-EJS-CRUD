document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

// async function deleteUser(userId) {
//     try {
//         const response = await fetch(`/users/${userId}`, {
//             method: 'DELETE'
//         });
//         if (!response.ok) throw new Error('Network response was not ok.');
//         const result = await response.json();
//         console.log('User deleted:', result);
//         fetchUsers(); // Re-fetch users to update the list
//     } catch (error) {
//         console.error('Error deleting user:', error);
//     }
// }

async function fetchUsers() {
    try {
        const response = await fetch('/users');
        if (!response.ok) throw new Error('Network response was not ok.');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}


function displayUsers(users) {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user._id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}
