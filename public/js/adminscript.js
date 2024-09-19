// Функция для получения мастеров с сервера
async function loadMasters() {
    try {
        const response = await fetch('/api/masters');
        const data = await response.json();
        const mastersBody = document.getElementById('mastersBody');

        // Очищаем таблицу перед добавлением новых данных
        mastersBody.innerHTML = '';

        // Добавляем мастеров в таблицу
        data.masters.forEach(master => {
            const name = master.Name|| 'Не указано';
            const surname = master.Surname || 'Не указано';
            const phone = master.Phone || 'Не указано';
            const email = master.Email || 'Не указано';
            const services = master.services || 'Не указано';

            const row = `<tr>
                <td>${name}</td>
                <td>${surname}</td>
                <td>${phone}</td>
                <td>${email}</td>
                <td>${services}</td>
                <td>
                    <button onclick="editMaster(${master.Id})">Редактировать</button>
                    <button onclick="deleteMaster(${master.Id})">Удалить</button>
                </td>
            </tr>`;
            mastersBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Ошибка при загрузке мастеров:', error);
    }
}

// Фильтр поиска по мастерам
function filterMasters() {
    const input = document.getElementById('search');
    const filter = input.value.toLowerCase();
    const rows = document.querySelectorAll('#mastersBody tr');

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const surname = row.cells[1].textContent.toLowerCase();
        const phone = row.cells[2].textContent.toLowerCase();
        if (name.includes(filter) || surname.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Сортировка таблицы мастеров
function sortTable(columnIndex) {
    const table = document.getElementById('mastersTable');
    const rows = Array.from(table.rows).slice(1);
    const isAscending = table.rows[0].cells[columnIndex].getAttribute('data-order') === 'asc';
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent;
        const cellB = rowB.cells[columnIndex].textContent;
        return isAscending ? cellB.localeCompare(cellA) : cellA.localeCompare(cellB);
    });
    table.rows[0].cells[columnIndex].setAttribute('data-order', isAscending ? 'desc' : 'asc');
    rows.forEach(row => table.tBodies[0].appendChild(row));
}

// Открыть форму добавления мастера
function openAddMasterForm() {
    document.getElementById('masterForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Добавить мастера';
    document.getElementById('masterFormData').reset();
    document.getElementById('saveMasterButton').onclick = saveMaster;
}

// Открыть форму для редактирования мастера
async function editMaster(id) {
    document.getElementById('masterForm').style.display = 'block';
    document.getElementById('formTitle').textContent = 'Редактировать мастера';

    try {
        const response = await fetch(`/api/masters/${id}`);
        const master = await response.json();
        document.getElementById('masterId').value = master.id;
        document.getElementById('name').value = master.Name;
        document.getElementById('surname').value = master.Surname;
        document.getElementById('phone').value = master.Phone;
        document.getElementById('email').value = master.Email;
        document.getElementById('saveMasterButton').onclick = () => saveMaster(id);
    } catch (error) {
        console.error('Ошибка при загрузке мастера:', error);
    }
}

// Сохранение мастера (добавление или обновление)
async function saveMaster(id = null) {
    const master = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        phone: document.getElementById('phone').value,
    };
    const url = id ? `/api/masters/${id}` : '/api/masters';
    const method = id ? 'PUT' : 'POST';

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(master)
        });
        closeMasterForm();
        loadMasters();
    } catch (error) {
        console.error('Ошибка при сохранении мастера:', error);
    }
}

// Удаление мастера
async function deleteMaster(id) {
    try {
        await fetch(`/api/masters/${id}`, { method: 'DELETE' });
        loadMasters();
    } catch (error) {
        console.error('Ошибка при удалении мастера:', error);
    }
}

// Закрытие формы
function closeMasterForm() {
    document.getElementById('masterForm').style.display = 'none';
}


// Загрузка мастеров при загрузке страницы
window.onload = loadMasters;
