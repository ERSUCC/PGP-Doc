const { invoke } = window.__TAURI__.core;

let container;
let text;

async function toggleColors() {
    container.style.backgroundColor = await invoke("toggle_color", { color: window.getComputedStyle(container).backgroundColor });
    text.style.color = await invoke("toggle_color", { color: window.getComputedStyle(text).color });
}

window.addEventListener("DOMContentLoaded", () => {
    container = document.querySelector("#container");
    text = document.querySelector("#text");
});
