const { User, Profile } = require("../models");

exports.homePage = async(req, res, next) => {
    try {
        const logged_in = req.session.logged_in;
        
        if (!logged_in) {
            res.render("login");
        }
        
        const user = req.session.user;
        res.render('homepage', {layout: 'main', logged_in: logged_in, user: user });
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
            return res.status(400).json({ message: "Invalid email" });
        }

        const isValidPassword = password.length >= 8;
        if (!isValidPassword) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            res.res.status(409).json({ message: "Username already exists" });
        }

        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(409).json({ message: "Email already exists" });
        }


        const user = await User.create({ username, email, password });

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user = { id: user.id, username: user.username };
            res.redirect("/");
        });
    } catch (e) {
        console.error(e);
        return next(e);
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
        const user = await User.findOne({where: {username: username}});

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const validPassword = await user.checkPassword(password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid password"});
        };

        const profile = await Profile.findOne({where: {userId: user.id}});

        req.session.save(() => {
            req.session.logged_in = true;
            req.session.user = { id: user.id, username: user.username, profilePic: profile.profilePic };
            res.redirect("/");
        });
    }
    catch (e) {
        console.error(e);
        return next(e);
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
        const logged_in = req.session.logged_in;
        const user = req.session.user;

        req.session.destroy(() => {
            logged_in
            user
        });
    } catch (e) {
        console.error(e);
        return next(e);
    };
    res.redirect("/");
};

exports.logoutPost = async(req, res, next) => {
    try {
        req.session.destroy(() => {
            req.session.logged_in
            req.session.user
        });
    } catch (e) {
        console.error(e);
        return next(e);
    };
    res.redirect("/");
};