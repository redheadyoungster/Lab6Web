document.addEventListener('DOMContentLoaded', function() {
    const propertiesContainer = document.getElementById('propertiesContainer');
    const addPropertyBtn = document.getElementById('addPropertyBtn');
    const objectForm = document.getElementById('objectForm');
    const messageDiv = document.getElementById('message');
    const saveObjectBtn = document.getElementById('saveObjectBtn');

    // Функція додавання рядка для Collapse
    function addCollapseItem(title = '', content = '') {
        const fieldDiv = document.createElement('div');
        fieldDiv.classList.add('property-field');
        fieldDiv.innerHTML = `
            <input type="text" placeholder="Заголовок" class="collapse-title" value="${title}" required>
            <input type="text" placeholder="Вміст (текст)" class="collapse-content" value="${content}" required>
            <button type="button" class="remove-prop-btn">🗑️</button>
        `;

        fieldDiv.querySelector('.remove-prop-btn').addEventListener('click', function() {
            propertiesContainer.removeChild(fieldDiv);
        });
        propertiesContainer.appendChild(fieldDiv);
    }

    // Додаємо один елемент за замовчуванням
    addCollapseItem('Приклад заголовка', 'Приклад тексту всередині');

    addPropertyBtn.addEventListener('click', () => addCollapseItem());

    // Збереження (асинхронно)
    objectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveObjectBtn.disabled = true;
        messageDiv.textContent = 'Збереження...';

        const dataToSave = [];
        const items = document.querySelectorAll('.property-field');

        items.forEach(item => {
            const t = item.querySelector('.collapse-title').value.trim();
            const c = item.querySelector('.collapse-content').value.trim();
            if (t && c) dataToSave.push({ title: t, content: c });
        });

        fetch('save_data.php', {
            method: 'POST',
            body: JSON.stringify(dataToSave),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                messageDiv.textContent = data.success ? '✅ Збережено!' : '❌ Помилка сервера';
            })
            .catch(err => messageDiv.textContent = '❌ Помилка запиту')
            .finally(() => saveObjectBtn.disabled = false);
    });
});