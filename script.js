/**
 * CreatorFlow Dashboard Logic
 * Senior Dev Implementation
 */

// --- State Management ---
let tasks = [
    { id: 1, text: "Script for 'Next-Gen AI' video", completed: false },
    { id: 2, text: "Design 3 Instagram Thumbnails", completed: true },
    { id: 3, text: "Reply to YouTube comments", completed: false }
];

// --- Selectors ---
const taskContainer = document.getElementById('task-container');
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const dataForm = document.getElementById('data-form');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupEventListeners();
});

// --- Functions ---

/**
 * Renders the task list to the UI
 */
function renderTasks() {
    taskContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-info">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask(${task.id})">
                <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}; 
                    color: ${task.completed ? '#9ca3af' : 'inherit'}">
                    ${task.text}
                </span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">
                <i class="ph ph-trash"></i>
            </button>
        `;
        taskContainer.appendChild(taskElement);
    });
}

/**
 * Toggles task completion status
 */
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTasks();
}

/**
 * Deletes a task
 */
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

/**
 * Adds a new task from the modal
 */
function addNewTask() {
    const input = document.getElementById('modal-task-input');
    if (input.value.trim() === '') {
        alert('Please enter a task description');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    tasks.push(newTask);
    input.value = '';
    closeModal();
    renderTasks();
    showToast('Task added successfully!');
}

/**
 * Simulation of saving data
 */
function saveContentPlan() {
    const btn = document.querySelector('.content-planner .btn-primary');
    const originalText = btn.innerText;
    
    btn.innerText = 'Saving...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = 'Saved!';
        showToast('Plan saved to cloud');
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
        }, 2000);
    }, 1000);
}

/**
 * Form Handling
 */
dataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('content-title').value;
    const views = document.getElementById('analytics-data').value;
    
    if(title && views) {
        showToast(`Data logged for: ${title}`);
        resetForm();
    }
});

function resetForm() {
    dataForm.reset();
}

/**
 * Modal Logic
 */
function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

/**
 * Utility: Show Toast Notification
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #111;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- Event Listeners ---
function setupEventListeners() {
    openModalBtn.onclick = openModal;
    closeModalBtn.onclick = closeModal;
    document.getElementById('cancel-task').onclick = closeModal;
    document.getElementById('confirm-task').onclick = addNewTask;
    
    // Close modal on outside click
    window.onclick = (event) => {
        if (event.target == modal) closeModal();
    }

    // Nav item clicking
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}
