const editor = document.getElementById('editor');

if (localStorage.getItem('text_editor_value')) {
    editor.value = localStorage.getItem('text_editor_value');
}

editor.addEventListener('input', () => {
    localStorage.setItem('text_editor_value', editor.value);
});

const clearButton = document.createElement('button');
clearButton.textContent = 'Очистить содержимое';
clearButton.type = 'button';
clearButton.style.marginTop = '10px';
clearButton.style.cursor = 'pointer';

editor.parentElement.appendChild(clearButton);

clearButton.addEventListener('click', () => {
    editor.value = '';
    localStorage.removeItem('text_editor_value');
});