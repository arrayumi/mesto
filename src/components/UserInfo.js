export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector)
    }


    getUserInfo() {
        return { name: this._name.textContent, about: this._about.textContent }
    }

    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setUserAvatar({avatar}) {
        this._avatar.src = avatar;
    }
}