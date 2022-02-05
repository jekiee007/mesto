export class UserInfo {
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    return {
      username: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(name, link) {
    console.log(name, link);
    this._name.textContent = name;
    this._job.textContent = link;
  }
}
