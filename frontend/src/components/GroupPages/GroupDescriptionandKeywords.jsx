import React from 'react'

export const GroupDescriptionandKeywords = ({group, keywordList, groupKeywords}) => {
  return (
    <>
    <div className="group-description">
        <h1>What we're about</h1>
        {!!group && group.description}
    </div>
    <div className="group-keywords">
        <h1>Related keywords</h1>
        <ul>
            {Object.keys(keywordList).length > 0 && Object.values(groupKeywords).map(gk => <li key={gk.id}>{keywordList[gk.keywordId].keyword}</li>)}
        </ul>
    </div>
    </>
  )
}
