use serde::Serialize;

#[derive(Serialize)]
enum PGPDErrorType {
    // TODO: enumerate types of errors
}

#[derive(Serialize)]
struct PGPDError {
    error_type: PGPDErrorType,
    message: String,
}

#[tauri::command]
fn new_document() -> Result<(), PGPDError> {
    // TODO: create new document

    Ok(())
}

#[tauri::command]
fn open_document(_path: &str) -> Result<(), PGPDError> {
    // TODO: open document at provided path

    Ok(())
}

#[tauri::command]
fn save_document() -> Result<(), PGPDError> {
    // TODO: save current document

    Ok(())
}

#[tauri::command]
fn save_document_as(_path: &str) -> Result<(), PGPDError> {
    // TODO: save current document to provided path

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            new_document,
            open_document,
            save_document,
            save_document_as
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
