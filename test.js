const lib = require('./index')
const test = require('tape')
const Keyframe = lib.Keyframe
const lerpKeyframes = lib.lerpKeyframes

test('linear works as expected', function (t) {
  const kfs = [
    new Keyframe('linear', 0, 0),
    new Keyframe('linear', 3, 9),
  ]
  const v0 = lerpKeyframes(kfs, 0)
  const v1 = lerpKeyframes(kfs, 1)
  const v2 = lerpKeyframes(kfs, 2)
  const v3 = lerpKeyframes(kfs, 3)

  t.same(v0, 0)
  t.same(v1, 3)
  t.same(v2, 6)
  t.same(v3, 9)
  t.end()
})

test('linear works for arrays', function (t) {
  const kfs = [
    new Keyframe('linear', 0, [0, 0]),
    new Keyframe('linear', 1, [2, 2]),
    new Keyframe('linear', 3, [10, 10]),
  ]

  const v0 = lerpKeyframes(kfs, 0)
  const v1 = lerpKeyframes(kfs, 1)
  const v2 = lerpKeyframes(kfs, 2)
  const v3 = lerpKeyframes(kfs, 3)

  t.same(v1, [2, 2])
  t.same(v2, [6, 6])
  t.same(v3, [10, 10])
  t.end()
})

test('step fn works', function (t) {
  const kfs = [
    new Keyframe('step', 0, [0, 0]),
    new Keyframe('step', 1, [2, 2]),
    new Keyframe('step', 3, [10, 10]),
  ]

  const v0 = lerpKeyframes(kfs, 0)
  const v1 = lerpKeyframes(kfs, 1)
  const v2 = lerpKeyframes(kfs, 2)
  const v3 = lerpKeyframes(kfs, 3)
  const v4 = lerpKeyframes(kfs, 4)

  t.same(v0, [0, 0])
  t.same(v1, [2, 2])
  t.same(v2, [2, 2])
  t.same(v3, [10, 10])
  t.same(v4, [10, 10])
  t.end()
})
