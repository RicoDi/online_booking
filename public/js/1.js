        document.addEventListener("DOMContentLoaded", function() {
            // Функция для получения данных через AJAX
            fetch('get_options.php')
                .then(response => response.json())
                .then(data => {
                    const dropdown = document.getElementById('dropdown');
                    
                    // Очищаем текущие опции
                    dropdown.innerHTML = '';

                    // Добавляем новые опции из базы данных
                    data.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option.id;
                        opt.textContent = option.option_name;
                        dropdown.appendChild(opt);
                    });
                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                });
        });