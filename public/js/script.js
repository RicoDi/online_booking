// Загрузка доступных мастеров
document.addEventListener('DOMContentLoaded', function() {
    const masterSelect = document.getElementById('Masters');

    // Функция для загрузки мастеров
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
                if (!master.idMasters || !master.Name || !master.Surname) {
                    throw new Error(`Некорректные данные мастера: ${JSON.stringify(master)}`);
                }
                const option = document.createElement('option');
                option.value = master.idMasters;
                option.textContent = `${master.Name} ${master.Surname}`;
                masterSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Ошибка при загрузке мастеров:', error);
        }
    }

    // Загрузка мастеров при загрузке страницы
    loadMasters();
});

const { sequelize, Master, Service } = require('./models');

async function loadServicesForMaster(masterId) {
  await sequelize.sync(); // Синхронизация моделей с базой данных

  const master = await Master.findByPk(masterId, {
    include: Service
  });

  if (master) {
    return master.Services;
  } else {
    return null;
  }
}

// Пример использования функции
(async () => {
  // Создание примера данных
  await sequelize.sync({ force: true }); // Пересоздание таблиц
  const master = await Master.create({ name: 'John Doe' });
  const service1 = await Service.create({ name: 'Haircut', description: 'Basic haircut' });
  const service2 = await Service.create({ name: 'Shave', description: 'Basic shave' });
  await master.addServices([service1, service2]);

  // Загрузка услуг для мастера
  const services = await loadServicesForMaster(master.id);
  if (services) {
    services.forEach(service => {
      console.log(`Service ID: ${service.id}, Name: ${service.name}`);
    });
  } else {
    console.log('Master not found or no services available.');
  }
})();



// // Обработка отправки формы
// const bookingForm = document.getElementById("bookingForm");
// if (bookingForm) {
//     bookingForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const formData = new FormData(this);
//         fetch("/php/process_form.php", {
//             method: "POST",
//             body: formData,
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(
//                         `Network response was not ok: ${response.status}`
//                     );
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 const responseMessage =
//                     document.getElementById("responseMessage");
//                 if (responseMessage) {
//                     responseMessage.textContent = data.message;
//                 }
//             })
//             .catch((error) =>
//                 console.error("Ошибка при отправке формы:", error)
//             );
//     });
// }
