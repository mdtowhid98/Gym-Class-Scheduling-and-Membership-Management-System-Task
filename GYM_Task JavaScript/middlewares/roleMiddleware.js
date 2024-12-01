const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required.'
        });
    }
};

const isTrainer = (req, res, next) => {
    if (req.user && req.user.role === 'trainer') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Trainer role required.'
        });
    }
};

const isTrainee = (req, res, next) => {
    if (req.user && req.user.role === 'trainee') {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Trainee role required.'
        });
    }
};

module.exports = { isAdmin, isTrainer, isTrainee };