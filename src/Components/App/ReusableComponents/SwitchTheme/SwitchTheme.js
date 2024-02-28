const lightTheme = [
    '--body-bg: #F4F7FD',
    '--sidebar-bg: white',
    '--sidebar-switch-box: #F4F7FD',
    '--sidebar-button-hover-bg: rgba(99, 95, 199, 0.1)',
    '--sidebar-border-color: #E4EBFA',
    '--dialog-bg-color: white',
    '--dialog-popup-bg: white',
    '--dialog-popup-box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25)',
    '--dialog-input-text-color: #000112',
    '--dialog-input-bg-color: white',
    '--dialog-placeholder-text-color: rgba(0, 1, 18, 0.25)',
    '--dialog-add-button: rgba(99, 95, 199, 0.1)',
    '--dialog-hover-add-button: rgba(99, 95, 199, 0.25)',
    '--dialog-title-text-color: #000112',
    '--dialog-label-text-color: #828FA3',
    '--dialog-check-box-bg-color: #F4F7FD',
    '--dialog-check-box-square-bg: white',
    '--task-box-bg-color: white',
    '--task-title-color: #000112',
    '--add-new-column-button-bg: linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)',
    '--header-bg-color: white',
    '--header-title-text-color: #000112',
    '--header-border-color: #E4EBFA',
]

const darkTheme = [
    '--body-bg: #20212C',
    '--sidebar-bg: #2B2C37',
    '--sidebar-switch-box: #20212C',
    '--sidebar-button-hover-bg: white',
    '--sidebar-border-color: #3E3F4E',
    '--dialog-bg-color: #2B2C37',
    '--dialog-popup-bg: #20212C',
    '--dialog-popup-box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25)',
    '--dialog-input-text-color: white',
    '--dialog-input-bg-color: #2B2C37',
    '--dialog-placeholder-text-color: rgba(255, 255, 255, 0.25)',
    '--dialog-add-button: white',
    '--dialog-hover-add-button: white',
    '--dialog-title-text-color: white',
    '--dialog-label-text-color: white',
    '--dialog-check-box-bg-color: #20212C',
    '--dialog-check-box-square-bg: #20212C',
    '--task-box-bg-color: #2B2C37',
    '--task-title-color: white',
    '--add-new-column-button-bg: linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)',
    '--header-bg-color: #2B2C37',
    '--header-title-text-color: white',    
    '--header-add-task-hover-button: #A8A4FF',
    '--header-border-color: #3E3F4E',
]


export default function SwitchTheme(turnSwitch){
    const root = document.getElementsByTagName("html")[0];
    let theme;

    if(turnSwitch)
        theme = darkTheme
    else
        theme = lightTheme;

    root.style.cssText += theme.join(";");                              //cssText lets you re-assign the values of css variables
}