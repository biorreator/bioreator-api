const alcoholMOLs = 131
// const heightDiff = 0.25
// const gravity = 9.8

function densityToBrix (density) {
  const specificGravity = density / 1000
  const brix = (((182.4601 * specificGravity - 775.6821) * specificGravity + 1262.7794) * specificGravity - 669.5622)
  return brix.toFixed(1)
}

function actualGLDegree (lastDensity, actualDensity) {
  const GLDegree = (lastDensity / 1000 - actualDensity / 1000) * alcoholMOLs
  return GLDegree.toFixed(1)
}

// function densityByPressureDiff (pressureA, pressureB) {
//   const delta = Math.abs(pressureB - pressureA)
//   const density = delta / (heightDiff * gravity)
//   return density
// }

export { densityToBrix, actualGLDegree }
