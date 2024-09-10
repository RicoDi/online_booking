// Инициализация Flatpickr
flatpickr("#date-picker", {
    enableTime: false,
    dateFormat: "Y-m-d",
});

// Загрузка мастеров
document.addEventListener('DOMContentLoaded', () => {
    fetch('/php/get_options.php?type=masters')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const masterSelect = document.getElementById('dropdown_master');
            if (masterSelect) {
                data.masters.forEach(master => {
                    const option = document.createElement('option');
                    option.value = master.id;
                    option.textContent = master.name;
                    masterSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Ошибка при загрузке мастеров:', error));
});

// Загрузка услуг на основе выбранного мастера
const masterSelect = document.getElementById('dropdown_master');
if (masterSelect) {
    masterSelect.addEventListener('change', function() {
        const masterId = this.value;
        if (masterId) {
            fetch(`/php/get_options.php?type=services&master_id=${masterId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const serviceSelect = document.getElementById('dropdown_service');
                    if (serviceSelect) {
                        serviceSelect.innerHTML = '<option value="">Выберите услугу</option>';
                        data.services.forEach(service => {
                            const option = document.createElement('option');
                            option.value = service.id;
                            option.textContent = service.name;
                            serviceSelect.appendChild(option);
                        });
                    }
                })
                .catch(error => console.error('Ошибка при загрузке услуг:', error));
        }
    });
}

// Обработка отправки формы
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        fetch('/php/process_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const responseMessage = document.getElementById('responseMessage');
            if (responseMessage) {
                responseMessage.textContent = data.message;
            }
        })
        .catch(error => console.error('Ошибка при отправке формы:', error));
    });
}
