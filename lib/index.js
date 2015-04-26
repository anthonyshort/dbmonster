/** @jsx element */

import * as App from './app'
import {getData} from './db'
import {deku,render,element} from 'deku'

var tree = deku()
tree.mount(<App />)
tree.set('databases', getData())

setInterval(function(){
  tree.set('databases', getData())
}, 0)

// setTimeout(function(){
//   tree.set('databases', getData())
// }, 2000)

render(tree, document.querySelector('#app'))