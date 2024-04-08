const User = require("../models/User");

exports.homePage = async(req, res, next) => {
    try {
        const user = req.session.user;

        if (!req.session.logged_in) {
            res.redirect("/login");
        }

        res.render('homepage', { logged_in: req.session.logged_in, user });
    } catch (e) {
        console.error(e);
        return next(e);
    };
}

exports.registerGet = async(req, res, next) => {
    try {
        res.render("register");
    } catch (e) {
        console.error(e);
        return next(e);
    };
}

exports.registerPost = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isValidEmail = email.match(/.+@.+\..+/);
        if (!isValidEmail) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }

        const isValidPassword = password.length >= 8;
        if (!isValidPassword) {
            res.status(400).json({ message: "Password must be at least 8 characters long" });
            return;
        }

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            res.status(409).json({ message: "User already exists" });
            return;
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            res.status(409).json({ message: "Email already exists" });
            return;
        }


        const user = await User.create({ username, email, password });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user = user.id;
            res.redirect("/");
        });
    } catch (e) {
        console.error(e);
        return res.json(`Error: ${e.message}`);
    };
};

exports.loginGet = async (req, res, next) => {
    try {
        res.render("login");
    } catch (e) {
        console.error(e);
        return next(e);
    };
};

exports.loginPost = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { 
            username }
         });

        if (!user) {
            res.status(401).json({ message: "Invalid username" });
            return;
        }

        const valid = await user.checkPassword(password);

        if (!valid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user = user.id;
            res.redirect("/");
        });
    }
    catch (e) {
        console.error(e);
        return res.json(e.message);
    }
};

/* exports.loginPost = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User
            .findOne({ email: email })
            .exec();
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }
        const valid = await user.checkPassword(password);
        if (!valid) {
            return res.status(401).send("Invalid email or password");
        }
        req.session.logged_in = true;
        req.session.user_id = user.id;
        res.status(204).end();
    }
    catch (e) {
        console.error(e);
        return next(e);
    };
}; */

exports.logoutGet = async(req, res, next) => {
    try {
        req.session.destroy(() => {
            res.redirect("/");
        });
    } catch (e) {
        console.error(e);
        return next(e);
    };
};

exports.logoutPost = async(req, res, next) => {
    try {
        req.session.destroy(() => {
            res.redirect("/");
        });
    } catch (e) {
        console.error(e);
        return next(e);
    };
};