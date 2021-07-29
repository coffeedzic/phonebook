const contentHeightHelper = () => {
  let clientHeight = document.getElementById('root').offsetHeight
  let headerHeight = document.getElementById('header').offsetHeight
  let footerHeight = document.getElementById('footer').offsetHeight
  let landingHeight = (clientHeight - headerHeight - footerHeight)
  document.getElementById('root').style.setProperty('--content-height', landingHeight + 'px')
  
  window.addEventListener('resize', () => {
    let clientHeight = document.getElementById('root').offsetHeight
    let headerHeight = document.getElementById('header').offsetHeight
    let footerHeight = document.getElementById('footer').offsetHeight
    let landingHeight = (clientHeight - headerHeight - footerHeight)
    document.getElementById('root').style.setProperty('--content-height', landingHeight + 'px')
  })
}

export default contentHeightHelper