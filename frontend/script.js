// Инициализация Flatpickr
flatpickr("#date-picker", {
    enableTime: false,
    dateFormat: "Y-m-d",
});

// Загрузка мастеров
document.addEventListener('DOMContentLoaded', () => {
    fetch('/php/get_options.php?type=masters')
        .then(response => response.json())
        .then(data => {
            const masterSelect = document.getElementById('dropdown_master');
            data.masters.forEach(master => {
                const option = document.createElement('option');
                option.value = master.id;
                option.textContent = master.name;
                masterSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Ошибка:', error));
});

// Загрузка услуг на основе выбранного мастера
document.getElementById('dropdown_master').addEventListener('change', function() {
    const masterId = this.value;
    if (masterId) {
        fetch(`/php/get_options.php?type=services&master_id=${masterId}`)
            .then(response => response.json())
            .then(data => {
                const serviceSelect = document.getElementById('dropdown_service');
                serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';
                data.services.forEach(service => {
                    const option = document.createElement('option');
                    option.value = service.id;
                    option.textContent = service.name;
                    serviceSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Ошибка:', error));
    }
});

// Обработка отправки формы
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    fetch('/php/process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').textContent = data.message;
    })
    .catch(error => console.error('Ошибка:', error));
});