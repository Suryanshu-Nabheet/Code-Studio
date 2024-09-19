require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.22.3/min/vs' } });

require(['vs/editor/editor.main'], function () {
    // Create editor instances
    var htmlEditor = monaco.editor.create(document.getElementById('html-editor'), {
        value: '<!-- Start coding HTML here -->',
        language: 'html',
        theme: 'vs-dark',
        fontSize: 16,
        fontFamily: 'Courier New',
    });

    var cssEditor = monaco.editor.create(document.getElementById('css-editor'), {
        value: '/* Start coding CSS here */',
        language: 'css',
        theme: 'vs-dark',
        fontSize: 16,
        fontFamily: 'Courier New',
    });

    var jsEditor = monaco.editor.create(document.getElementById('js-editor'), {
        value: '// Start coding JavaScript here',
        language: 'javascript',
        theme: 'vs-dark',
        fontSize: 16,
        fontFamily: 'Courier New',
    });

    // Keep track of which editor is active
    var currentEditor = htmlEditor;

    // Function to switch between tabs/editors
    function openTab(language) {
        document.querySelectorAll('.editor').forEach(e => e.style.display = 'none');
        switch (language) {
            case 'html':
                document.getElementById('html-editor').style.display = 'block';
                currentEditor = htmlEditor;
                break;
            case 'css':
                document.getElementById('css-editor').style.display = 'block';
                currentEditor = cssEditor;
                break;
            case 'js':
                document.getElementById('js-editor').style.display = 'block';
                currentEditor = jsEditor;
                break;
        }
        currentEditor.layout(); // Adjust layout
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        document.querySelector(`.tab-button[onclick="openTab('${language}')"]`).classList.add('active');
    }

    // Initially show HTML editor
    openTab('html');

    // Function to run the code
    function runCode() {
        const htmlCode = htmlEditor.getValue();
        const cssCode = `<style>${cssEditor.getValue()}</style>`;
        const jsCode = `<script>${jsEditor.getValue()}<\/script>`;
        const previewFrame = document.getElementById('preview-frame').contentWindow.document;

        previewFrame.open();
        previewFrame.write(htmlCode + cssCode + jsCode);
        previewFrame.close();
    }

    document.getElementById('run').addEventListener('click', runCode);

    // Toggle Terminal
    document.getElementById('toggle-terminal').addEventListener('click', function () {
        const terminal = document.getElementById('terminal');
        terminal.style.display = terminal.style.display === 'block' ? 'none' : 'block';
    });

    // Settings Modal
    const modal = document.getElementById('settings-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const applySettings = document.getElementById('apply-settings');

    document.querySelector('.settings-button').onclick = function () {
        modal.style.display = 'block';
    }

    closeModal.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    applySettings.onclick = function () {
        const fontSize = parseInt(document.getElementById('font-size').value);
        const fontFamily = document.getElementById('font-family').value;
        const theme = document.getElementById('theme').value;

        [htmlEditor, cssEditor, jsEditor].forEach(editor => {
            editor.updateOptions({ fontSize, fontFamily });
        });
        monaco.editor.setTheme(theme);

        modal.style.display = 'none';
    }

    // AI Generate Code button
    document.querySelector('.ai-generate-button').addEventListener('click', () => {
        alert('AI code generation feature is not yet implemented.');
    });

    // GitHub Upload button
    document.querySelector('.upload-github').addEventListener('click', () => {
        alert('GitHub upload feature is not yet implemented.');
    });
});
