import React from 'react'
import ArticleItem from '../ArticleItem/ArticleItem'

const ArticleList = ({data}) => {
  return (
      <ul>{data.map(item => <ArticleItem key={item.objectID} data={item} />) }</ul>
  )
}

export default ArticleList