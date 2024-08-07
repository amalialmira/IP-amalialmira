function errorHandler(err, req, res, next){
    let status = 500 || err.status
    let message = err.message || 'internal server error'
    console.log(err);
    switch (err.name){
        case 'invalid-token':
        case 'JsonWebTokenError':
            status = 403;
            message = 'un-Authenticate';
            break;
        case 'not-found':
            status = 404;
            message = 'Data not found';
            break;
        case 'access-denied':
            status = 403;
            message = 'Access denied';
            break;
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = err.errors[0].message
            break;
        case 'InvalidInput':
            status = 400
            message = 'email/password is required'
            break;
        case 'InvalidUser':
            status = 401
            message = 'invalid email/password'
            break
        case 'empty':
            status = 400
            message = 'image is required'
            break
    }

    res.status(status).json({message})
}

module.exports = errorHandler