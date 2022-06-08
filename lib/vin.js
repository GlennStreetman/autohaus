export function vinLengthText(yearText) {
    const year = parseInt(yearText);
    if (!year || year <= 1930) {
        return "";
    } else if (year > 1930 && year <= 1958) {
        return "5 Character";
    } else if (year > 1958 && year < 1968) {
        return "6 Character";
    } else if (year === 1968) {
        return "8 Character";
    } else if (year === 1969) {
        return "9 Character";
    } else if (year > 1969 && year < 1981) {
        return "10 Character";
    } else if (year > 1980) {
        return "17 Character";
    } else {
        return "";
    }
}

export function testVin(year) {
    if (year > 1930 && year <= 1958) {
        return 5;
    } else if (year > 1958 && year < 1968) {
        return 6;
    } else if (year === 1968) {
        return 8;
    } else if (year === 1969) {
        return 9;
    } else if (year > 1969 && year < 1981) {
        return 10;
    } else if (year > 1980) {
        return 17;
    } else {
        return 17;
    }
}

export function formatVin(vin, year) {
    if (year && parseInt(year) >= 1981) {
        let formattedVin = vin.toUpperCase();
        console.log;
        formattedVin = formattedVin.replaceAll("Q", "0");
        formattedVin = formattedVin.replaceAll("O", "0");
        formattedVin = formattedVin.replaceAll("I", "1");
        return formattedVin.slice(0, 17);
    } else {
        return vin.toUpperCase();
    }
}
