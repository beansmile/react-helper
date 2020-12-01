# react-helper
react-router 和 antd、antd-mobile 相关的封装组件

## CModal(antd/modal)
|参数|说明|类型|默认值|
|---|----|----|------|
|trigger|modal 的控制开关，可以接受一个react元素或者方法|React.ReactNode or (modalStore: ModalStore) => any|-|
|modalStore|组件内置 modalStore 控制 modal 的行为，可以通过传入新的 modalStore 来覆盖行为|ModalStore|ModalStore|
|render|render 会代替 children的位置|(modalStore: ModalStore) => any|-|
|onOk|点击确定按钮时，调用的方法，等待方法前按钮会保持loding状态，之后modal会消失(return false 时不消失)，支持返回 promise|Function|-|
|其他|其他参数和antd/modal保持一致|


## ModalStore
|属性|说明|类型|默认值|
|---|----|----|------|
|visible|对话框是否可见|boolean|false|
|confirmLoading|确定按钮 loading|boolean|false|
|showModal|展示对话框|-|-|
|hideModal|隐藏对话框|-|-|


## ObserverTable(antd/table)
兼容 mobx，并且对 columns 属性进行改进

### Column
columns 可以用对象写法, { dataIndex1: attr， dataIndex2: attr } 的形式，
可以是 { dataIndex: title }, 也可以是 { dataIndex: obj },
obj 支持下列参数

|属性|说明|类型|默认值|
|---|----|----|------|
|width|列宽度|number|string\|number|100|
|type|value 的类型，根据类型自动加上默认的 render|'boolean' or 'data' or 'datatime'|-|
|其他|其他参数和 antd/table 的 column 保持一致|


## FormGroup(antd/form)
|属性|说明|类型|默认值|
|---|----|----|------|
|data|表单数据默认值的集合|object|-|
|form|经 Form.create() 包装过的组件会自带 this.props.form 属性|object|-|
|其他|其他参数和 antd/form 保持一致|

## FormRow(antd/form-item)
Form.Item 和 form.getFieldDecorator(id, options) 的结合组件，简化 rc-form 的使用
通过接收父元素 FormGroup 的 data，自动设置当前表单控件的默认值

|属性|说明|类型|默认值|
|---|----|----|------|
|id|必填输入控件唯一标志。支持嵌套式的写法。|string|-|
|required|是否必填, 会影响 form-item 的样式和 rc-form 的校验|boolean|true|
|message|错误信息|string|有 label 的情况下为 `无效的${label}`|
|options|https://ant.design/components/form-cn/#this.props.form.getFieldDecorator(id,-options)|object|-|
|rule|options.rules 的单数形式，options.rules没有的情况下，rule 会变成 options.rules|https://ant.design/components/form-cn/#校验规则|-|
|其他|其他参数和 antd/form-item 保持一致|
