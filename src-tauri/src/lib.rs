#[tauri::command]
fn toggle_color(color: &str) -> &str {
    if color == "rgb(50, 50, 50)" {
        return "rgb(255, 255, 255)";
    }

    return "rgb(50, 50, 50)";
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![toggle_color])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
