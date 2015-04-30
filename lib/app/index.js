/** @jsx element */

import {element} from 'deku'

export let propTypes = {
  'databases': {
    type: 'array',
    source: 'databases'
  }
}

export function render (component) {
  let {props,state} = component
  let rows = props.databases.map(function (db) {
    var topFive = db.topFiveQueries.map(function (q, i) {
      return (
        <td class={elapsedClassName(q.elapsed)}>
          {formatElapsed(q.elapsed)}
          <div class="popover left">
            <div class="popover-content">
              {q.query}
            </div>
            <div class="arrow"></div>
          </div>
        </td>
      )
    })
    return (
      <tr>
        <td class="dbname">{db.name}</td>
        <td class="query-count">
          <span class={countClassName(sampleLength(db))}>
            {sampleLength(db)}
          </span>
        </td>
        {topFive}
      </tr>
    )
  })
  return (
    <table class="table table-striped latest-data">
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function sampleLength(db) {
  return db.samples[db.samples.length - 1].queries.length
}

function countClassName(count) {
  var className = 'label'
  if (count >= 20) {
    className += ' label-important'
  }
  else if (count >= 10) {
    className += ' label-warning'
  }
  else {
    className += ' label-success'
  }
  return className;
}

function elapsedClassName(elapsed) {
  var className = 'Query elapsed';
  if (elapsed >= 10.0) {
    className += ' warn_long';
  }
  else if (elapsed >= 1.0) {
    className += ' warn';
  }
  else {
    className += ' short';
  }
  return className;
}

function formatElapsed(value) {
  if (!value) return '';
  var str = parseFloat(value).toFixed(2);
  if (value > 60) {
    var minutes = Math.floor(value / 60);
    var comps = (value % 60).toFixed(2).split('.');
    var seconds = comps[0].lpad('0', 2);
    var ms = comps[1];
    str = minutes + ":" + seconds + "." + ms;
  }
  return str;
}