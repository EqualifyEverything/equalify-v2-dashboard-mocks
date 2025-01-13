function toggleAllTableCheckboxes(source) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = source.checked);
    toggleEditOptions();
}

function toggleEditOptions() {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    const editOptions = document.getElementById('edit-options');
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    editOptions.style.display = anyChecked ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-navigation');
    const mainNav = document.getElementById('main-navigation');

    if (!toggleButton || !mainNav) {
        console.error('Toggle button or main navigation not found!');
        return;
    }

    toggleButton.addEventListener('click', () => {
        const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

        // Toggle visibility
        mainNav.hidden = !mainNav.hidden; // Switch between hidden and visible
        toggleButton.setAttribute('aria-expanded', !isExpanded);

        // Update button text
        toggleButton.textContent = isExpanded ? 'Show Navigation' : 'Hide Navigation';
    });
});