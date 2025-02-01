import React from 'react'

const ArticleItem = ({data: {title, url}}) => {
  return (
    <li ><a href={url} target='_blank' rel='noopener noreferrer'>{title}</a></li>
  )
}

export default ArticleItem