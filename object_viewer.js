document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('collapseContainer');
    let currentDataHash = '';

    function renderCollapse(data) {
        container.innerHTML = '';

        if (!Array.isArray(data) || data.length === 0) {
            container.innerHTML = '<p style="padding:10px;">Даних поки немає.</p>';
            return;
        }

        data.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'my-collapse-item';

            const btn = document.createElement('button');
            btn.className = 'my-collapse-btn';
            btn.textContent = item.title;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'my-collapse-content';

            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'my-collapse-body';
            bodyDiv.textContent = item.content;

            contentDiv.appendChild(bodyDiv);
            wrapper.appendChild(btn);
            wrapper.appendChild(contentDiv);

            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                if (contentDiv.style.maxHeight) {
                    contentDiv.style.maxHeight = null;
                } else {
                    contentDiv.style.maxHeight = contentDiv.scrollHeight + "px";
                }
            });

            container.appendChild(wrapper);
        });
    }

    function fetchData() {
        fetch('get_data.php?t=' + new Date().getTime())
            .then(res => res.json())
            .then(data => {
                const newDataHash = JSON.stringify(data);

                if (newDataHash !== currentDataHash) {
                    console.log('🔄 Дані оновлено на сервері. Перемальовую...');
                    currentDataHash = newDataHash;
                    renderCollapse(data);
                }
            })
            .catch(err => console.error('Помилка з\'єднання:', err));
    }

    fetchData();

    setInterval(fetchData, 3000);
});