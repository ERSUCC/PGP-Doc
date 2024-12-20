const { invoke } = window.__TAURI__.core;
const { getCurrentWindow } = window.__TAURI__.window;
const { Menu } = window.__TAURI__.menu;
const { message, open, save } = window.__TAURI__.dialog;

const appWindow = getCurrentWindow();

document.getElementById("titlebar-minimize").addEventListener("click", () => appWindow.minimize());
document.getElementById("titlebar-maximize").addEventListener("click", () => appWindow.toggleMaximize());
document.getElementById("titlebar-close").addEventListener("click", () => appWindow.close());

document.getElementById("menu-file").addEventListener("click", () => openFileMenu());

async function handleError(error) {
    await message(error.message, { title: "Error", kind: "error" });
}

async function openFileMenu() {
    let menu = await Menu.new({
        items: [
            { text: "New Document", action: newDocument },
            { item: "Separator" },
            { text: "Open Document", action: openDocument },
            { item: "Separator" },
            { text: "Save Document", action: saveDocument },
            { text: "Save Document As", action: saveDocumentAs },
        ]
    })

    menu.popup();
}

function newDocument() {
    invoke("new_document").catch(handleError);
}

async function openDocument() {
    let file = await open({ multiple: false, directory: false });

    if (file != null) {
        invoke("open_document", { path: file }).catch(handleError);
    }
}

function saveDocument() {
    invoke("save_document").catch(handleError);
}

async function saveDocumentAs() {
    let file = await save();

    if (file != null) {
        invoke("save_document_as", { path: file }).catch(handleError);
    }
}
