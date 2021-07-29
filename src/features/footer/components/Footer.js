import React from 'react'

import '../styles/Footer.css'

const Footer = () => {
  const renderFooterLinks = () => {
    const footerLinks = [
      {
        name: 'Github',
        url: 'https://github.com/coffeedzic'
      },
      {
        name: 'Facebook',
        url: 'https://facebook.com/edincoffeedzic'
      },
      {
        name: 'Instagram',
        url: 'https://instagram.com/edincoffeedzic'
      },
      {
        name: 'My website',
        url: 'https://coffeedzic.com'
      },
      {
        name: 'Contact',
        url: 'mailto:edin@coffeedzic.com'
      },
    ]

    return footerLinks.map((item, index) => {
      return(
        <a
          href={item.url}
          key={index} 
        >
          {item.name}
        </a>
      )
    })
  }

  return(
    <footer id="footer">
      <div className="copyright">
        Created with <span>&#10084;</span> by Edin Kahvedžić
      </div>
      <div className="footer-links">
        {renderFooterLinks()}
      </div>
    </footer>
  )
}

export default Footer