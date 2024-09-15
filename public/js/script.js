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

document.addEventListener('DOMContentLoaded', function()){
    const serviceSelect = document.getElementById('Services');

    //Функция для загрузки услуг, которые предоставляет мастер
    
}



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
