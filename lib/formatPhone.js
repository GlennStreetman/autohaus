function addDashes(f) {
    if (f && typeof f === "string") {
        const raw = f.replace(/\D/g, "");
        // const raw = f.replace(/\D[^\.]/g, "");
        let formatPhone;
        if (raw.length > 6) formatPhone = raw.slice(0, 3) + "-" + raw.slice(3, 6) + "-" + raw.slice(6);
        if (raw.length <= 6) formatPhone = raw.slice(0, 3) + "-" + raw.slice(3, 6);
        if (raw.length <= 3) formatPhone = formatPhone = raw;
        return formatPhone;
    } else {
        return "";
    }
}

export function stripPhone(f) {
    if (f && typeof f === "string") {
        let strippedPhone = f.replace(/\D/g, "");
        strippedPhone = strippedPhone.slice(0, 10);
        return strippedPhone;
    } else {
        return "";
    }
}

export default addDashes;
