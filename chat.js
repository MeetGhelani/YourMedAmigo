function loadModuleScripts(urls) {
    urls.forEach(url => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = url;
        document.head.appendChild(script);
    });
}

const scriptUrls = [
    'chatbot.js',
];

loadModuleScripts(scriptUrls);
