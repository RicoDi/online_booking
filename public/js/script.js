function submiteForm() {
    let name document.getElementById ('name').value;
    let surname document.getElementById ('surname').value;
    let phone document.getElementById ('phone').value;
    let email document.getElementById ('email').value;
    let date document.getElementById('selectedDate').value;
    let time document.getElementById('selectedTime').value;
}
let user{
    name: name,
    surname: surname,
    phone: phone,
    email: email
};
let booking{
    date:selectedDate;
    time:selectedTime;
    }


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
