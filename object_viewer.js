document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('collapseContainer');
    let currentDataHash = '';

    // Функція малювання HTML (Пункт 2d)
    function renderCollapse(data) {
        container.innerHTML = '';

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = '<p>Даних немає.</p>';
            return;
        }

        data.forEach(item => {
            // Створення структури
            const wrapper = document.createElement('div');
            wrapper.className = 'collapse-item'; // Використовуємо класи з CSS

            const btn = document.createElement('button');
            btn.className = 'collapse-btn';
            btn.textContent = item.title;

            const content = document.createElement('div');
            content.className = 'collapse-content';
            content.textContent = item.content;

            // Логіка кліку (Без jQuery/Bootstrap)
            btn.addEventListener('click', function() {
                // Перемикання видимості
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    btn.classList.remove('active');
                } else {
                    content.style.display = 'block';
                    btn.classList.add('active');
                }
            });

            wrapper.appendChild(btn);
            wrapper.appendChild(content);
            container.appendChild(wrapper);
        });
    }

    // Функція отримання даних (Пункт 2e)
    function fetchData() {
        fetch('get_data.php')
            .then(res => res.json())
            .then(data => {
                const newDataHash = JSON.stringify(data);
                // Перемальовуємо тільки якщо дані змінилися
                if (newDataHash !== currentDataHash) {
                    console.log('Дані оновлено, рендеринг...');
                    currentDataHash = newDataHash;
                    renderCollapse(data);
                }
            })
            .catch(err => console.error('Помилка завантаження:', err));
    }

    // Запуск
    fetchData();
    // Періодичний контроль (polling) кожні 5 секунд
    setInterval(fetchData, 5000);
});