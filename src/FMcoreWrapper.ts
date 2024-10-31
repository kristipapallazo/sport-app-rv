const scriptUrls = [
  `${process.env.REACT_APP_FMCORE_URL}main.js`,
  `${process.env.REACT_APP_FMCORE_URL}vendors.js`,
  `${process.env.REACT_APP_FMCORE_URL}runtime.js`,
];
const loadScripts = (urls: any[]) => {
  const loadScript = (url: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = url.includes("main") ? reject : resolve;
      document.head.appendChild(script);
    });
  };
  const promises = urls.map((url) => loadScript(url));
  return Promise.all(promises);
};

const loadFMcore = () => loadScripts(scriptUrls).catch((e) => console.error("Error loading scripts:", e));
export default loadFMcore;
