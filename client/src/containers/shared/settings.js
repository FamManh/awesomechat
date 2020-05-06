
export const initSetting = ()=>{
    const settings = {
        sound: true
    }
    if(window){
        window.localStorage.setItem("settings", JSON.stringify(settings));
        return settings
    }
    return null;
}

export const getSetting = ()=>{
    if(!window) return null
    let settings = window.localStorage.getItem("settings");
    if(!settings) return initSetting();
    return JSON.parse(settings);
}

export const setSetting = (obj)=>{
    if (typeof obj !== "object") return;

    window.localStorage.setItem("settings", JSON.stringify(obj));
}
