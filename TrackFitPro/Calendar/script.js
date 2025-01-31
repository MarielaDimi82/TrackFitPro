document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    let tasks = {};

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNameElement = document.getElementById('monthName');
    monthNameElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    function createCalendar() {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = `Day ${i}`;

            if (i < today.getDate()) {
                if (tasks[i]) {
                    dayElement.classList.add('completed');
                } else {
                    dayElement.classList.add('missed');
                }
            } else if (i === currentDay) {
                dayElement.classList.add('current');
                dayElement.addEventListener('click', () => addTask(dayElement, i));
            } else {
                dayElement.classList.add('future');
            }

            calendar.appendChild(dayElement);
        }
    }

    function addTask(dayElement, dayNumber) {
        if (dayElement.querySelector('.task-input')) return;

        const input = document.createElement('input');
        input.classList.add('task-input');
        input.placeholder = 'What did you do today?';

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.style.display = 'block';
        saveButton.style.margin = '10px auto';
        saveButton.style.padding = '5px 10px';
        saveButton.style.cursor = 'pointer';

        dayElement.appendChild(input);
        dayElement.appendChild(saveButton);

        saveButton.addEventListener('click', () => {
            const taskText = input.value.trim();
            if (taskText) {
                dayElement.innerHTML = `<div class="task-text">Tasks: ${taskText}</div>`;
                dayElement.classList.remove('current');
                dayElement.classList.add('completed');
                tasks[dayNumber] = taskText;
            }
        });
    }

    createCalendar();

    function updatePastDays() {
        const days = document.querySelectorAll('.calendar-day');
        days.forEach((dayElement, index) => {
            const dayNumber = index + 1;
            if (dayNumber < currentDay) {
                if (tasks[dayNumber]) {
                    dayElement.classList.remove('missed');
                    dayElement.classList.add('completed');
                } else {
                    dayElement.classList.add('missed');
                }
            }
        });
    }

    updatePastDays();
});
