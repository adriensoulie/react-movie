
type ThemeProps = {
    mode: string
}

export default function ThemeToggle({ mode }:ThemeProps) {

    console.log("mode", mode)

    return (
        <div>
            <span className="material-icons material-icons-outlined">
            light_mode
            </span>
        { mode === 'light' ? 
            <span className="material-icons material-icons-outlined">
                toggle_on
            </span>
            :
            <span className="material-icons material-icons-outlined">
            toggle_off
            </span>
        }
        <span className="material-icons material-icons-outlined">
        dark_mode
        </span>
        </div>
    )
}

