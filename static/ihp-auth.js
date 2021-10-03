async function initAuth() {
    const user = await fetch('/api/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET',
            credentials: 'include'
        }).then(response => response.json());

    window.currentUser = user;
    return user;
}

async function getCurrentUser() {
    if (window.currentUser) {
        return window.currentUser;
    }

    const user = await initAuth();
    if (!user) {
        window.location = '/NewSession';
    }

    return user;
}

async function getCurrentUserId() {
    return getCurrentUser().then(user => user.id);
}

function logout() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/DeleteSession';

    const method = document.createElement('input');
    method.type = 'hidden';
    method.name = '_method'
    method.value = 'DELETE';

    form.appendChild(method);

    document.body.appendChild(form);
    form.submit();
}