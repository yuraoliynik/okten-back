module.exports = {
    EMAIL: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'),
    PASSWORD: new RegExp(/^(?=.*[a-zA-Zа-яА-Я])(?=.*[0-9]).{8,}/)
};
