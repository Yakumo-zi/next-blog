import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function randomColor() {
    const colors = [
        "bg-rose-50",
        "bg-amber-50",
        "bg-lime-50",
        "bg-cyan-50",
        "bg-sky-50",
        "bg-violet-50",
        "bg-fuchsia-50",
        "bg-emerald-50",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};
export function formatDate(date:any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}