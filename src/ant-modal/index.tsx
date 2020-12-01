import * as React from 'react'
import { Modal, Drawer } from 'antd'
import { ModalProps } from 'antd/lib/modal/Modal'
import { DrawerProps } from 'antd/lib/drawer'
import { observer } from 'mobx-react'
import { asyncAction } from 'mobx-multiple-store'
import autoBind from 'core-decorators/lib/autobind'
import ModalStore from './modal-store'

@observer
export default class CModal extends React.Component {
  static defaultProps = {
    destroyOnClose: true,
    onOk: () => void 0,
    onCancel: () => void 0,
    onClose: () => void 0,
  }

  static keyCode = void 0

  props: ModalProps & DrawerProps & {
    trigger: React.ReactElement<any> | ((modalStore: ModalStore) => React.ReactNode) | any
    modalStore?: ModalStore
    children?: any
    render?: (modalStore: ModalStore) => any
    useDrawer?: boolean
  }

  modalStore: ModalStore = this.getStore()

  getStore() {
    const modalStore = this.props.modalStore || ModalStore.get()
    modalStore.onOk = this.onOk
    modalStore.onCancel = this.onCancel
    return modalStore
  }

  @asyncAction
  * onOk(event) {
    this.modalStore.confirmLoading = true
    try {
      const result = yield this.props.onOk(event)
      if (result !== false) this.modalStore.hideModal()
    } finally {
      this.modalStore.confirmLoading = false
    }
  }

  @autoBind
  showModal(e) {
    // a 标签处理
    if (e.target.href) {
      // ctrl + 点击时，不弹出 modal，按浏览器默认行为处理。否则，阻止默认行为。
      if (CModal.keyCode !== 91) {
        e.preventDefault()
        this.modalStore.showModal()
      }
    } else {
      this.modalStore.showModal()
    }
  }

  @autoBind
  onCancel(e) {
    this.props.onCancel(e)
    this.props.onClose(e)
    this.modalStore.hideModal()
  }

  componentWillUnmount() {
    ModalStore.instanceList.delete(this.modalStore.instanceKey)
  }

  render() {
    const { trigger, children, render, useDrawer, ...props } = this.props
    const { visible, confirmLoading } = this.modalStore
    const Container = useDrawer ? Drawer : Modal
    return (
      <React.Fragment>
        {
          React.isValidElement(trigger) ? React.cloneElement(trigger, { onClick: this.showModal } as any) : trigger(this.modalStore)
        }
        <Container
          visible={visible} confirmLoading={confirmLoading}
          {...props} onOk={this.onOk} onCancel={this.onCancel} onClose={this.onCancel}
        >
          {
            render ? render(this.modalStore) : children
          }
        </Container>
      </React.Fragment>
    )
  }
}

document.addEventListener('keydown', e => {
  CModal.keyCode = e.keyCode
})

document.addEventListener('keyup', () => {
  CModal.keyCode = void 0
})
