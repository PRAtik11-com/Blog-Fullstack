let isAdmin = (request, response, next) => {
    if (request.User.role !== "Admin") {
        return response.status(403).json({
            message: "Access Denied"
        });
    }
    next();
}

module.exports = isAdmin;
