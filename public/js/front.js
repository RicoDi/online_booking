let currentPage = 1;
const totalPages = 4;

//Обновляет кнопки прогресса в зависимости от текущей страницы.
//Проходит по всем страницам и добавляет или удаляет класс 'active'
//для соответствующего элемента кнопки прогресса.
function updateProgress() {
    for (let i = 1; i <= totalPages; i++) {
        const progressBtn = document.getElementById(`progress${i}`);
      if (i <= currentPage) {
        progressBtn.classList.add('active');
      } else {
        progressBtn.classList.remove('active');
      }
    }
  }

function updateButtons() {
    // Отключаем кнопку "Назад" на первой странице
    
    const nextBtn = document.getElementById("nextBtn");
  if (currentPage === totalPages) {
    nextBtn.textContent = "Підтверджую";  // Меняем текст кнопки на "Submit"
    nextBtn.setAttribute("type", "submit");  // Меняем тип кнопки на "submit"
  } else {
    nextBtn.textContent = "Далі";  // Меняем текст кнопки на "Next"
    nextBtn.setAttribute("type", "button");  // Меняем тип кнопки на "button"
  }
}
  

//Механизм переключения страниц 
function showPage(page) {
    console.log("showPage" + page);  
    for(let i = 1; i<=totalPages; i++){
        const PageElement = document.getElementById(`page${i}`);
        if (i===page) {
            PageElement.classList.add('active');
            PageElement.classList.remove('hide');
        } else{
            PageElement.classList.add('hide');
            PageElement.classList.remove('active');
        }
    }
    updateProgress();
    updateButtons();
}

document.getElementById("backBtn").addEventListener("click", function(){
    if (currentPage > 1){
        currentPage--;
        showPage(currentPage);
    }
});
document.getElementById("nextBtn").addEventListener("click", function(){
    console.log("nextBtn");  
    if (currentPage < totalPages) {
    currentPage++;

    showPage(currentPage);
}
});
// Начальное отображение первой страницы
showPage(currentPage);



document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const booking_date = document.getElementById('date').value;

    const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, booking_date }),
    });

    const result = await response.json();
    document.getElementById('responseMessage').innerText = result.message;
});

// Инициализация Flatpickr
flatpickr("#date-picker", {
  enableTime: false,
  dateFormat: "Y-m-d",
});