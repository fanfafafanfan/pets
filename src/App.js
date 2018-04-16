import React from 'react'

class App extends React.Component{
  render(){
    let boss = '李云龙'
    return(
      <div>
        <h2>独立团，{boss}</h2>
       <Team></Team>
      </div>
    )
  }
}

class Team extends React.Component{
  render(){
    let boss = '哈哈哈'
    return <h3>Team leader {boss}</h3>
  }
}

export default App