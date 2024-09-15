document.addEventListener('DOMContentLoaded', function() {
    const masterSelect = document.getElementById('Masters');

    /**
     * Функция для загрузки мастеров с сервера и обновления выпадающего списка.
     * Выполняет асинхронный запрос к API, обрабатывает ответ и обновляет DOM.
     * В случае ошибки выводит сообщение в консоль.
     */
    async function loadMasters() {
        try {
            const response = await fetch('/api/masters');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data.masters)) {
                throw new Error('Некорректный формат данных: ожидается массив мастеров');
            }

            // Очистка текущих опций
            masterSelect.innerHTML = '<option value="">Выберите мастера</option>';

            // Добавление новых опций
            data.masters.forEach(master => {
                if (!master.id || !master.name || !master.surname) {
                    throw new Error(`Некорректные данные мастера: ${JSON.stringify(master)}`);
                }
                const option = document.createElement('option');
                option.value = master.id;
                option.textContent = `${master.name} ${master.surname}`;
                masterSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Ошибка при загрузке мастеров:', error);
        }
    }

    // Загрузка мастеров при загрузке страницы
    loadMasters();
});

const masterSelect = document.getElementById("dropdown_master");
if (masterSelect) {
    masterSelect.addEventListener("change", function () {
        const masterId = this.value;
        if (masterId) {
            fetch(`/api/services?master_id=${masterId}`) // изменённый путь
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Network response was not ok: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    const serviceSelect =
                        document.getElementById("dropdown_service");
                    if (serviceSelect) {
                        serviceSelect.innerHTML =
                            '<option value="">Выберите услугу</option>';
                        if (!Array.isArray(data.services)) {
                            throw new Error(
                                "Некорректный формат данных: ожидается массив услуг"
                            );
                        }
                        data.services.forEach((service) => {
                            if (!service.id || !service.name) {
                                throw new Error(
                                    `Некорректные данные услуги: ${JSON.stringify(service)}`
                                );
                            }
                            const option = document.createElement("option");
                            option.value = service.id;
                            option.textContent = service.name;
                            serviceSelect.appendChild(option);
                        });
                    }
                })
                .catch((error) =>
                    console.error("Ошибка при загрузке услуг:", error)
                );
        }
    });
}

// Загрузка услуг на основе выбранного мастера
const masterSelectService = document.getElementById("dropdown_master");
if (masterSelectService) {
    masterSelectService.addEventListener("change", function () {
        const masterId = this.value;
        if (masterId) {
            fetch(`/api/services?master_id=${masterId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Network response was not ok: ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((data) => {
                    const serviceSelect =
                        document.getElementById("dropdown_service");
                    if (serviceSelect) {
                        serviceSelect.innerHTML =
                            '<option value="">Выберите услугу</option>';
                        if (!Array.isArray(data.services)) {
                            throw new Error(
                                "Некорректный формат данных: ожидается массив услуг"
                            );
                        }
                        data.services.forEach((service) => {
                            if (!service.id || !service.name) {
                                throw new Error(
                                    `Некорректные данные услуги: ${JSON.stringify(service)}`
                                );
                            }
                            const option = document.createElement("option");
                            option.value = service.id;
                            option.textContent = service.name;
                            serviceSelect.appendChild(option);
                        });
                    }
                })
                .catch((error) =>
                    console.error("Ошибка при загрузке услуг:", error)
                );
        }
    });
}

// Обработка отправки формы
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        fetch("/php/process_form.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Network response was not ok: ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                const responseMessage =
                    document.getElementById("responseMessage");
                if (responseMessage) {
                    responseMessage.textContent = data.message;
                }
            })
            .catch((error) =>
                console.error("Ошибка при отправке формы:", error)
            );
    });
}
