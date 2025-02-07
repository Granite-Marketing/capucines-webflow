function controlScripts(control) {
  if (!control) return;

  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const devMode = urlParams.get('devMode');
    if (devMode === 'true') {
      const devScript = document.createElement('script');
      devScript.setAttribute('defer', '');
      devScript.setAttribute('src', 'http://localhost:3000/index.js');
      document.body.append(devScript);
    } else {
      const liveScript = document.createElement('script');
      liveScript.setAttribute('defer', '');
      liveScript.setAttribute(
        'src',
        'https://cdn.jsdelivr.net/npm/@granite-marketing/editoria@1.0.4/dist/index.js'
      );
      document.body.append(liveScript);
    }
  });
}
