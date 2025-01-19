export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds  % 60;
    return `${minutes}min ${remainingSeconds}sec`;
}

export const getStageTimeout = (size) => {
    const timeouts = {
        SMALL : 180,
        MEDIUM : 240,
        LARGE : 300
    };
    return timeouts[size] || 180;
}

export const isStageDelayed = (timeInStage, size) => {
    return timeInStage > getStageTimeout(size);
}