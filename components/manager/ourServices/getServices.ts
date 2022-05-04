function getServices(setter: Function) {
    fetch(`/api/getOurServices`)
        .then((response) => response.json())
        .then((data) => {
            console.log("services data", data);
            setter(data.ourServices);
        });
}

export default getServices;
