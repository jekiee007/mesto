export class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      username: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
    this._profileId = userData._id;
    this._avatar.src = userData.avatar;
  }

  getUserId() {
    return this._profileId;
  }
}
