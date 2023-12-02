

exports.getUser = async(req, res, next) => {
    let data = "user"
    return res.status(200).send({data: data})
}