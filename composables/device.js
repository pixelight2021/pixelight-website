export const DEVICE_SIZE = {
    XS: 360,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
    XXXL: 1920
}

export function getDeviceSize() {
    if(process.client) return window.screen.availWidth
}
