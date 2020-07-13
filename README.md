# 标题：项目名称

- 本项目使用umi@3版本构建
- 模块化项目构成, 将不同路由封装到不同层级的目录中, 具体层级可在pages中查找各个目录中的 model.ts 文件
- 全局的 model 文件在 src 的 models 目录中
- 解耦后端与前端的数据接口, 对于获取数据(GET, POST等), 后端的数据接口到前端的数据接口的转换全部在 service 层完成
- 后端与前端的接口数据结构声明在各层级模块的 data.d.ts 文件中
- 各层级模块有自己的 actionTypes, 在组件中使用 dispatch 分发 action 时务必使用 actionTypes 导出的
- 对于前端发送数据到后端(POST, PUT等), 由于 dva 底层的 redux-saga 的生成器语法对 Typescript 支持不行, 使用call 和 put 传递 payload 时无法进行类型校验. 
  因此需要开发者在组件中 dispatch action 时和在 service 中接收 payload 时严格遵循 actionTypes 规范. 细则如下
  - 在 dispatch 时用 ISomeAction 声明 action
  - 在 service 中用 ISomeAction['payload'] 声明 payload
  - 在 effect 中直接转发 payload, 不做任何不必要的变换
-


