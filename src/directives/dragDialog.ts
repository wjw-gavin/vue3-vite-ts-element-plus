const dragDialog = {
  install(app) {
    app.directive('drag-dialog', {
      mounted(el: any) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header') as HTMLElement
        const dragDom = el.querySelector('.el-dialog') as HTMLElement
        dialogHeaderEl.style.cursor = 'move'
        dragDom.style.cssText += ';top:0px;'

        const getStyle = (function () {
          return (dom, attr) => getComputedStyle(dom, null)[attr]
        })()

        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop

          const dragDomWidth = dragDom.offsetWidth
          const dragDomHeight = dragDom.offsetHeight

          const screenWidth = document.body.clientWidth
          const screenHeight = document.body.clientHeight

          const minDragDomLeft = dragDom.offsetLeft
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

          const minDragDomTop = dragDom.offsetTop
          const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

          // 获取到的值带px 正则匹配替换
          let styL = getStyle(dragDom, 'left')
          let styT = getStyle(dragDom, 'top')

          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100) + ''
            styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100) + ''
          } else {
            styL = +styL.replace(/\px/g, '') + ''
            styT = +styT.replace(/\px/g, '') + ''
          }

          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX
            let top = e.clientY - disY

            // 边界处理
            if (-left > minDragDomLeft) {
              left = -minDragDomLeft
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft
            }

            if (-top > minDragDomTop) {
              top = -minDragDomTop
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + Number(styL)}px;top:${top + Number(styT)}px;`
          }

          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    })
  }
}
export default dragDialog
