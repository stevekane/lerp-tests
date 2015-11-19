const eases = require('eases')

module.exports.Keyframe = Keyframe
module.exports.lerpKeyframes = lerpKeyframes

function lerp(v0, v1, f) {
  return v0 * (1 - f) + v1 * f
}

function lerpAll (v0s, v1s, f) {
  var i = -1
  var results = []

  while (++i < v0s.length) {
    results.push(lerp(v0s[i], v1s[i], f)) 
  }
  return results
}

function step (v0, v1, f) {
  return 0
}

function Keyframe (type, frame, value) {
  this.type = type
  this.frame = frame
  this.value = value
}

function lerpKeyframes (kfs, f) {
  var i = kfs.length

  while (i--) if (kfs[i].frame <= f) break

  const left = kfs[i]
  const right = kfs[i+1]

  if (!right || right.frame === left.frame) return left.value

  const easingFn = eases[left.type] || step
  const tNormal = (f - left.frame) / (right.frame - left.frame)
  const tAdjusted = easingFn(tNormal)
  const lerpFn = left.value.length ? lerpAll : lerp

  return lerpFn(left.value, right.value, tAdjusted)
}
