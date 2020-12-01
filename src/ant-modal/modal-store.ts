import { StoreHelper, observable, action } from 'mobx-multiple-store'
import { randomString } from '../random'

export default class ModalStore extends StoreHelper {
  static get(key = randomString()) {
    return this.findOrCreate(key)
  }

  static showModal(key) {
    return this.findOrCreate(key).showModal()
  }

  static hideModal(key) {
    return this.findOrCreate(key).hideModal()
  }

  onOk: Function
  onCancel: Function

  @observable visible = false
  @observable confirmLoading = false

  @action.bound
  showModal() {
    this.visible = true
  }

  @action.bound
  hideModal() {
    this.visible = false
  }
}
