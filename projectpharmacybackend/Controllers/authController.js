
let users = [];

const signUp = (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = { name, email, password };
    users.push(user);

    res.status(201).json({ message: 'User created successfully' });
};

const login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    req.session.userId = email;
    res.status(200).json({ message: 'Login successful' });
};

module.exports = {
    signUp,
    login,
};
