    const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const confirmTaskBtn = document.getElementById('confirm-task');
const taskInput = document.getElementById('modal-task-input');
const taskContainer = document.getElementById('task-container');

// Modal Open
openModalBtn.onclick = function() {
    modal.classList.add('active');
};

// Modal Close
closeModalBtn.onclick = function() {
    modal.classList.remove('active');
};

// Task add logic
confirmTaskBtn.onclick = function() {
    if (taskInput.value.trim() !== "") {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <div class="task-info">
                <i class="ph ph-circle"></i>
                <span>${taskInput.value}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">
                <i class="ph ph-trash"></i>
            </button>
        `;
        taskContainer.appendChild(div);
        taskInput.value = "";
        modal.classList.remove('active');
    } else {
        alert("Pehle task likhein!");
    }
};

// Form Reset
function resetForm() {
    document.getElementById('data-form').reset();
}

    
