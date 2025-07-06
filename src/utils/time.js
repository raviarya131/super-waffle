

export function timeAgo(date) {
    let now = new Date();
    let secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) return `few seconds ago`;
    let minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} minutes ago`;
    let hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hours ago`;
    return date.toDateString()
}


export function timeAgoShort(date) {
    let now = new Date();
    let secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) return `${secondsAgo}s`;
    let minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo}m`;
    let hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo}h`;
    let daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) return `${daysAgo}d`;
    let weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) return `${weeksAgo}w`;
    let monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) return `${monthsAgo}mo`;

    return date.toDateString()
}