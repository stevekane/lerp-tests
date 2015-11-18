const lerp = require('lerp')
const eases = require('eases')

function lerpAll (v0s, v1s, t) {
  var i = -1
  var results = []

  while (++i < v0s.length) {
    results.push(lerp(v0s[i], v1s[i], t)) 
  }
  return results
}

module.exports.KF = function KF (type, t, v) {
  this.type = type
  this.t = t
  this.v = v
}

module.exports.lerpKFs = function lerpKFs (kfs, t) {
  var i = kfs.length

  while (i--) if (kfs[i].t <= t) break

  const left = kfs[i]
  const right = kfs[i+1]

  if (!right || right.t === left.t) return left.v

  const easingFn = eases[left.type] || eases.linear
  const tNormal = (t - left.t) / (right.t - left.t)
  const tAdjusted = easingFn(tNormal)
  const lerpFn = left.v.length ? lerpAll : lerp

  return lerpFn(left.v, right.v, tAdjusted)
}
