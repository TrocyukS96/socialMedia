export const toCorrectTime = (time: string, withoutSeconds: boolean) => {
    let currentData = time.split("T")[0]
    let currentTime = time.split("T")[1].split('.')[0]
    if (withoutSeconds) {
        currentTime = currentTime.substring(0, 5)
    }
    return `${currentData} ${currentTime}`
}