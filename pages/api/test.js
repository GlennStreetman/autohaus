const test = async (req, res) => {
    try {
        console.log(req)
    } catch (err) {
        console.log("/POST test Error:", err);
        res.status(400).json({ msg: "denied" });
    }
};

export default test;
